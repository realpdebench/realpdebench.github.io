"""
Extract benchmark results tables from the paper LaTeX into a machine-readable JSON.

Source-of-truth policy (repo brief):
- Numbers / claims MUST come from `papers/realbench/main.tex`.

Currently supported:
- Table `\\label{tab: main table}` (RMSE, Rel L2, fRMSE, Update Ratio)
- Table `\\label{tab: other metrics}` (MAE, R^2, KE, FE)
- Table `\\label{tab:mvpe_200}` (MVPE; Cylinder only, 200-step long-horizon)
→ `docs/assets/data/benchmark_results.json`

Usage (Windows / cmd):
  python tools/extract_benchmark_results.py
"""

from __future__ import annotations

import argparse
import json
import re
from dataclasses import dataclass
from datetime import date
from pathlib import Path
from typing import Any


FLOAT_RE = re.compile(r"[-+]?\d*\.\d+")


def _latex_to_text(s: str) -> str:
    # Remove cell background macros (keep content after)
    s = re.sub(r"\\cellcolor\{[^}]*\}", "", s)

    # Unwrap simple macros that wrap text
    s = re.sub(r"\\rebuttal\{([^}]*)\}", r"\1", s)
    s = re.sub(r"\\textbf\{([^}]*)\}", r"\1", s)

    # Convert shortstack linebreaks to spaces
    s = re.sub(r"\\shortstack\{([^}]*)\}", lambda m: m.group(1).replace(r"\\", " "), s)

    # Remove TeX spacing commands
    s = s.replace(r"\,", "")

    # Drop braces and collapse whitespace
    s = s.replace("{", "").replace("}", "")
    s = s.replace(r"\\", " ")
    s = re.sub(r"\s+", " ", s).strip()
    return s


def _parse_float_cell(cell: str) -> float | None:
    """
    Extract the *value* from a table cell that may have color/formatting macros.

    Important trick:
    - We only match floats with a decimal point, which avoids picking up integers
      from macros like `gray!20` or `\\yellowcolor{7}{...}`.
    """
    cell = cell.strip()
    matches = FLOAT_RE.findall(cell)
    if not matches:
        return None
    return float(matches[-1])


def _parse_params_m(cell: str) -> float | None:
    """
    Parse the Params column (in millions). Example: `23.0\\,M` -> 23.0
    """
    v = _parse_float_cell(cell)
    if v is None:
        return None
    return float(v)


@dataclass(frozen=True)
class MainTableRow:
    dataset: str
    model: str
    params_m: float | None
    sim_rmse: float | None
    sim_rel_l2: float | None
    sim_frmse: float | None
    real_rmse: float | None
    real_rel_l2: float | None
    real_frmse: float | None
    ft_rmse: float | None
    ft_rel_l2: float | None
    ft_frmse: float | None
    update_ratio: float | None


@dataclass(frozen=True)
class OtherMetricsRow:
    dataset: str
    model: str
    sim_mae: float | None
    sim_r2: float | None
    sim_ke: float | None
    sim_fe: float | None
    real_mae: float | None
    real_r2: float | None
    real_ke: float | None
    real_fe: float | None
    ft_mae: float | None
    ft_r2: float | None
    ft_ke: float | None
    ft_fe: float | None


def _extract_main_table_block(tex: str) -> str:
    return _extract_tabular_block_by_label(tex, r"\label{tab: main table}")


def _extract_tabular_block_by_label(tex: str, label: str) -> str:
    label_idx = tex.find(label)
    if label_idx < 0:
        raise RuntimeError(f"Could not find {label} in LaTeX.")

    begin_idx = tex.rfind(r"\begin{tabular}", 0, label_idx)
    if begin_idx < 0:
        raise RuntimeError(f"Could not find \\begin{{tabular}} before label {label}.")

    end_idx = tex.find(r"\end{tabular}", begin_idx)
    if end_idx < 0:
        raise RuntimeError(f"Could not find \\end{{tabular}} for label {label}.")

    return tex[begin_idx : end_idx + len(r"\end{tabular}")]


def _extract_multirow_content(cell: str) -> str | None:
    # Examples:
    # - \multirow{12}{*}{Cylinder}
    # - \multirow{1}[20]{*}{\shortstack{Controlled \\ Cylinder}}
    m = re.search(r"\\multirow\{[^}]*\}(?:\[[^]]*\])?\{[^}]*\}\{(.+?)\}\s*$", cell)
    if m:
        return m.group(1)
    return None


def _canonical_model_name(name: str) -> str:
    t = _latex_to_text(name)
    # Normalize common variants across tables
    if t in {"UNet", "U-Net", "U-Net "}:
        return "U-Net"
    if t in {"DPOT-SFT", "DPOT-SFT ", "DPOT-S-FT"}:
        return "DPOT-S-FT"
    if t == "DPOT-L-FT":
        return "DPOT-L-FT"
    return t


def _parse_main_table_rows(tabular_block: str) -> list[MainTableRow]:
    rows: list[MainTableRow] = []
    current_dataset: str | None = None

    for raw_line in tabular_block.splitlines():
        line = raw_line.strip()

        # Dataset "header" lines are formatted as a standalone multirow cell, e.g.:
        #   \multirow{12}{*}{Cylinder}
        #   \multirow{11}{*}{\shortstack{Controlled \\ Cylinder}}
        # and the actual rows start on following lines beginning with `& ... \\`.
        if r"\multirow" in line and "&" not in line:
            m = re.search(r"\\multirow\{[^}]*\}\{[^}]*\}\{(.+?)\}\s*$", line)
            if m:
                current_dataset = _latex_to_text(m.group(1))
            else:
                # Fallback: if braces are odd, still try to sanitize text
                current_dataset = _latex_to_text(line)
            continue

        if not line.endswith(r"\\"):
            continue

        # Ignore header/formatting rows
        if (
            line.startswith(r"\toprule")
            or line.startswith(r"\midrule")
            or line.startswith(r"\bottomrule")
            or line.startswith(r"\multicolumn")
        ):
            continue

        # Remove trailing line break and comments
        line = line.split("%", 1)[0].strip()
        line = re.sub(r"\\\\\s*$", "", line).strip()

        parts = [p.strip() for p in line.split("&")]
        if len(parts) < 13:
            # Unexpected row; skip to avoid producing wrong data silently
            continue

        dataset_cell = parts[0]
        if dataset_cell:
            m = re.search(r"\\multirow\{[^}]*\}\{[^}]*\}\{(.+?)\}\s*$", dataset_cell)
            if m:
                current_dataset = _latex_to_text(m.group(1))
            else:
                # Sometimes the dataset cell may already be raw text
                current_dataset = _latex_to_text(dataset_cell)

        if not current_dataset:
            # Can't attribute this row
            continue

        model = _canonical_model_name(parts[1])

        # Skip aggregate rows (we only want actual baselines)
        if "Average" in model:
            continue

        params_m = _parse_params_m(parts[2])

        row = MainTableRow(
            dataset=current_dataset,
            model=model,
            params_m=params_m,
            sim_rmse=_parse_float_cell(parts[3]),
            sim_rel_l2=_parse_float_cell(parts[4]),
            sim_frmse=_parse_float_cell(parts[5]),
            real_rmse=_parse_float_cell(parts[6]),
            real_rel_l2=_parse_float_cell(parts[7]),
            real_frmse=_parse_float_cell(parts[8]),
            ft_rmse=_parse_float_cell(parts[9]),
            ft_rel_l2=_parse_float_cell(parts[10]),
            ft_frmse=_parse_float_cell(parts[11]),
            update_ratio=_parse_float_cell(parts[12]),
        )
        rows.append(row)

    return rows


def _parse_other_metrics_rows(tabular_block: str) -> list[OtherMetricsRow]:
    rows: list[OtherMetricsRow] = []
    current_dataset: str | None = None

    for raw_line in tabular_block.splitlines():
        line = raw_line.strip()

        # Dataset header lines are on their own line in this table, e.g.:
        #   \multirow{1}[20]{*}{Cylinder}
        # followed by rows starting with `& Baseline & ... \\`.
        if r"\multirow" in line and "&" not in line:
            content = _extract_multirow_content(line)
            current_dataset = _latex_to_text(content) if content else _latex_to_text(line)
            continue

        if not line.endswith(r"\\"):
            continue

        if (
            line.startswith(r"\toprule")
            or line.startswith(r"\midrule")
            or line.startswith(r"\bottomrule")
            or line.startswith(r"\multicolumn")
        ):
            continue

        # Remove trailing line break and comments
        line = line.split("%", 1)[0].strip()
        line = re.sub(r"\\\\\s*$", "", line).strip()

        parts = [p.strip() for p in line.split("&")]
        if len(parts) < 14:
            continue

        if not current_dataset:
            continue

        model = _canonical_model_name(parts[1])

        # Skip any aggregate rows if they ever appear
        if "Average" in model:
            continue

        rows.append(
            OtherMetricsRow(
                dataset=current_dataset,
                model=model,
                sim_mae=_parse_float_cell(parts[2]),
                sim_r2=_parse_float_cell(parts[3]),
                sim_ke=_parse_float_cell(parts[4]),
                sim_fe=_parse_float_cell(parts[5]),
                real_mae=_parse_float_cell(parts[6]),
                real_r2=_parse_float_cell(parts[7]),
                real_ke=_parse_float_cell(parts[8]),
                real_fe=_parse_float_cell(parts[9]),
                ft_mae=_parse_float_cell(parts[10]),
                ft_r2=_parse_float_cell(parts[11]),
                ft_ke=_parse_float_cell(parts[12]),
                ft_fe=_parse_float_cell(parts[13]),
            )
        )

    return rows


def _other_metrics_to_map(rows: list[OtherMetricsRow]) -> dict[tuple[str, str, str], dict[str, float | None]]:
    out: dict[tuple[str, str, str], dict[str, float | None]] = {}

    def put(dataset: str, model: str, paradigm: str, mae: float | None, r2: float | None, ke: float | None, fe: float | None) -> None:
        out[(dataset, model, paradigm)] = {"mae": mae, "r2": r2, "ke": ke, "fe": fe}

    for r in rows:
        put(r.dataset, r.model, "simulated_training", r.sim_mae, r.sim_r2, r.sim_ke, r.sim_fe)
        put(r.dataset, r.model, "real_training", r.real_mae, r.real_r2, r.real_ke, r.real_fe)
        put(r.dataset, r.model, "real_finetuning", r.ft_mae, r.ft_r2, r.ft_ke, r.ft_fe)

    return out


def _parse_mvpe_200_map(tex: str) -> dict[tuple[str, str, str], float | None]:
    """
    Parse Table \\label{tab:mvpe_200}.

    The paper reports MVPE for Cylinder (200-step) for:
    - simulated training
    - real-world finetuning
    """
    block = _extract_tabular_block_by_label(tex, r"\label{tab:mvpe_200}")
    models: list[str] = []
    out: dict[tuple[str, str, str], float | None] = {}

    for raw_line in block.splitlines():
        line = raw_line.strip()

        # Header line: a sequence of \multicolumn{1}{l}{Model}
        if r"\multicolumn" in line and "&" in line and "FNO" in line:
            cols = re.findall(r"\\multicolumn\{1\}\{l\}\{([^}]*)\}", line)
            # First cell is empty (for the row label)
            models = [_canonical_model_name(c) for c in cols if _latex_to_text(c)]
            continue

        if not line.endswith(r"\\"):
            continue

        # Data rows
        line = line.split("%", 1)[0].strip()
        line = re.sub(r"\\\\\s*$", "", line).strip()
        parts = [p.strip() for p in line.split("&")]
        if len(parts) < 2:
            continue

        row_label = _latex_to_text(parts[0]).lower()
        if row_label.startswith("simulated training"):
            paradigm = "simulated_training"
        elif row_label.startswith("real-world finetuning"):
            paradigm = "real_finetuning"
        else:
            continue

        if not models:
            raise RuntimeError("Failed to parse MVPE header models for tab:mvpe_200.")

        values = [_parse_float_cell(p) for p in parts[1 : 1 + len(models)]]
        # Dataset for this table is Cylinder by definition in the paper appendix text
        dataset = "Cylinder"
        for m, v in zip(models, values, strict=False):
            out[(dataset, m, paradigm)] = v

    return out


def _rows_to_records(
    rows: list[MainTableRow],
    other_metrics: dict[tuple[str, str, str], dict[str, float | None]],
    mvpe_200: dict[tuple[str, str, str], float | None],
) -> list[dict[str, Any]]:
    records: list[dict[str, Any]] = []

    def add_record(
        *,
        dataset: str,
        model: str,
        params_m: float | None,
        paradigm: str,
        rmse: float | None,
        rel_l2: float | None,
        frmse: float | None,
        update_ratio: float | None,
    ) -> None:
        extra = other_metrics.get((dataset, model, paradigm), {})
        mvpe = mvpe_200.get((dataset, model, paradigm))
        records.append(
            {
                "dataset": dataset,
                "model": model,
                "params_m": params_m,
                "paradigm": paradigm,
                "rmse": rmse,
                "mae": extra.get("mae"),
                "rel_l2": rel_l2,
                "r2": extra.get("r2"),
                "frmse": frmse,
                "fe": extra.get("fe"),
                "ke": extra.get("ke"),
                "mvpe": mvpe,
                "update_ratio": update_ratio,
            }
        )

    for r in rows:
        add_record(
            dataset=r.dataset,
            model=r.model,
            params_m=r.params_m,
            paradigm="simulated_training",
            rmse=r.sim_rmse,
            rel_l2=r.sim_rel_l2,
            frmse=r.sim_frmse,
            update_ratio=None,
        )
        add_record(
            dataset=r.dataset,
            model=r.model,
            params_m=r.params_m,
            paradigm="real_training",
            rmse=r.real_rmse,
            rel_l2=r.real_rel_l2,
            frmse=r.real_frmse,
            update_ratio=None,
        )
        add_record(
            dataset=r.dataset,
            model=r.model,
            params_m=r.params_m,
            paradigm="real_finetuning",
            rmse=r.ft_rmse,
            rel_l2=r.ft_rel_l2,
            frmse=r.ft_frmse,
            update_ratio=r.update_ratio,
        )

    return records


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--tex",
        default="papers/realbench/main.tex",
        help="Path to the LaTeX source-of-truth file.",
    )
    parser.add_argument(
        "--out",
        default="docs/assets/data/benchmark_results.json",
        help="Output JSON path (under docs/ for MkDocs to serve).",
    )
    args = parser.parse_args()

    tex_path = Path(args.tex)
    out_path = Path(args.out)

    tex = tex_path.read_text(encoding="utf-8")
    main_table = _extract_main_table_block(tex)
    main_rows = _parse_main_table_rows(main_table)

    other_table = _extract_tabular_block_by_label(tex, r"\label{tab: other metrics}")
    other_rows = _parse_other_metrics_rows(other_table)
    other_map = _other_metrics_to_map(other_rows)

    mvpe_200_map = _parse_mvpe_200_map(tex)

    payload = {
        "meta": {
            "source_tex": str(tex_path).replace("\\", "/"),
            "source_label": "tab: main table",
            "source_labels": ["tab: main table", "tab: other metrics", "tab:mvpe_200"],
            "extracted_at": date.today().isoformat(),
        },
        "records": _rows_to_records(main_rows, other_map, mvpe_200_map),
    }

    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    print(f"Wrote {out_path} ({len(payload['records'])} records) from {tex_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())



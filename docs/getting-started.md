# Getting Started

This page shows how to **download datasets**, **train baselines**, and **evaluate checkpoints** using the official RealPDEBench code.

## Installation

The benchmark repository is [AI4Science-WestlakeU/RealPDEBench](https://github.com/AI4Science-WestlakeU/RealPDEBench) and is packaged as the Python module `realpdebench` (requires Python ≥ 3.10).

```bash
git clone https://github.com/AI4Science-WestlakeU/RealPDEBench.git
cd RealPDEBench
pip install -e .
```

## Download datasets

RealPDEBench artifacts are hosted on Hugging Face as the dataset repo [AI4Science-WestlakeU/RealPDEBench](https://huggingface.co/datasets/AI4Science-WestlakeU/RealPDEBench).

### Scenarios (dataset names)

Use these strings for `realpdebench download --scenario ...` and in YAML configs as `dataset_name`:

- `cylinder`
- `controlled_cylinder`
- `fsi`
- `foil`
- `combustion`

### Safe default: download metadata only

This is small and is the **default** behavior:

```bash
realpdebench download --dataset-root ./data/realpdebench --scenario cylinder --what metadata
```

### Download Arrow shards (large)

For the Arrow-backed loaders (`--use_hf_dataset`), data are stored under:

```text
{dataset_root}/{scenario}/hf_dataset/{dataset_type}_{split}/...
```

Example: **simulated training** on Cylinder (train on numerical, validate on real, evaluate on real test):

```bash
realpdebench download --dataset-root ./data/realpdebench --scenario cylinder --what hf_dataset --dataset-type numerical --split train
realpdebench download --dataset-root ./data/realpdebench --scenario cylinder --what hf_dataset --dataset-type real --split val
realpdebench download --dataset-root ./data/realpdebench --scenario cylinder --what hf_dataset --dataset-type real --split test
```

!!! tip
    Use `--dry-run` to see exactly which files would be downloaded:

    ```bash
    realpdebench download --dataset-root ./data/realpdebench --scenario cylinder --what hf_dataset --dataset-type real --split test --dry-run
    ```

### Download with Python (advanced)

For more control, use `huggingface_hub.snapshot_download` with `allow_patterns` to download only specific folders:

```python
import os
from huggingface_hub import snapshot_download
from datasets import load_from_disk

repo_id = "AI4Science-WestlakeU/RealPDEBench"
os.environ["HF_HUB_DISABLE_XET"] = "1"

local_dir = snapshot_download(
    repo_id=repo_id,
    repo_type="dataset",
    allow_patterns=["fsi/**"],  # example: download only the FSI folder
    endpoint="https://hf-mirror.com",  # optional: use mirror for faster access in China
)

ds = load_from_disk(os.path.join(local_dir, "fsi", "hf_dataset", "numerical_val"))
row = ds[0]
print(row.keys())
```

!!! tip "Pattern examples"
    - `["fsi/**"]` — download only FSI scenario
    - `["cylinder/hf_dataset/**"]` — download only Cylinder Arrow datasets
    - `["*/hf_dataset/*_val/**"]` — download all validation splits

### Network tips

- **Auth / rate limits**: set env `HF_TOKEN=...` (or pass `--token`).
- **Recommended**: set env `HF_HUB_DISABLE_XET=1`.
- **HF mirror**: set env `HF_ENDPOINT` (example: `https://hf-mirror.com`) or pass `--endpoint` to `realpdebench download` for easy accessing in mainland China.

## Configure `dataset_root` (important)

Training/evaluation scripts read `dataset_root` from the YAML config (they **do not** accept `--dataset_root` as a CLI flag).

Pick a config file under `realpdebench/configs/<scenario>/...` and set:

```yaml
dataset_root: "./data/realpdebench"
```

## Train baselines

For reproducibility, we recommend using the Arrow-backed datasets:

- Add `--use_hf_dataset` to enable `datasets.load_from_disk` loading.
- Add `--hf_auto_download` to download missing artifacts automatically.

### Simulated training (train on numerical data)

```bash
python -m realpdebench.train --config configs/cylinder/fno.yaml --train_data_type numerical --use_hf_dataset
```

### Real-world training (train on real data)

```bash
python -m realpdebench.train --config configs/cylinder/fno.yaml --train_data_type real --use_hf_dataset
```

### Real-world finetuning (sim-pretrain → real finetune)

1) Pretrain on numerical data:

```bash
python -m realpdebench.train --config configs/cylinder/fno.yaml --train_data_type numerical --use_hf_dataset
```

2) Set `checkpoint_path` in the YAML to a pretrained checkpoint (saved under `results_path/.../model_XXXX.pth`), then finetune on real data:

```bash
python -m realpdebench.train --config configs/cylinder/fno.yaml --train_data_type real --is_finetune --use_hf_dataset
```

### Auto-download example (mirror)

Training flags use `--hf_endpoint` / `--hf_repo_id` (note: the **download CLI** uses `--endpoint` / `--repo-id`):

```bash
python -m realpdebench.train --config configs/fsi/fno.yaml --use_hf_dataset --hf_auto_download --hf_endpoint https://hf-mirror.com
```

## Evaluate a checkpoint

After training, pick a checkpoint file (e.g., `.../model_0400.pth`) and run:

```bash
python -m realpdebench.eval --config configs/cylinder/fno.yaml --checkpoint_path /path/to/model_XXXX.pth --train_data_type numerical --use_hf_dataset
```

!!! tip
    Make sure `--train_data_type` matches how the checkpoint was trained (`numerical` vs `real`), since evaluation uses it to build the corresponding training dataset wrapper.

## General YAML configs

RealPDEBench training/evaluation is driven by a **single YAML config file** passed via `--config`.

### Where configs live

Config files are shipped with the code under:

- `realpdebench/configs/<scenario>/*.yaml`

In examples we often pass `configs/<scenario>/<model>.yaml`. This works because `realpdebench.train` / `realpdebench.eval` will also try to resolve the path **relative to the installed package** (i.e., `realpdebench/configs/...`) if the given path does not exist.

### How YAML interacts with CLI flags (important)

The config loader is intentionally simple: it loads the YAML and **adds keys that are not already defined by argparse**.

Practical consequences:

- **CLI-only flags**: `--gpu`, `--train_data_type`, `--is_finetune`, `--use_hf_dataset`, and all `--hf_*` flags are **not taken from YAML** (putting them in YAML will have no effect).
- **Eval checkpoint path is CLI-only**: `realpdebench.eval` requires `--checkpoint_path ...` on the command line (a `checkpoint_path:` entry in YAML will be ignored by `eval`).
- **Unused keys do nothing**: if a key exists in YAML but is never read by the code path you run, it has no effect (some shipped configs contain legacy keys like `epochs`, `gamma`, `test_interval`).

### Common YAML fields (used by `realpdebench.train` / `realpdebench.eval`)

The YAML files in `realpdebench/configs/` follow a flat structure (top-level keys).

#### Experiment & output

- **`exp_name`**: experiment name used in the output folder name.
- **`results_path`**: root output directory. Training saves checkpoints under:

```text
{results_path}/{model_name}/{exp_name}_{train_data_type}_{is_finetune}/{timestamp}/model_XXXX.pth
```

- **`seed`**: random seed used by `set_seed()`.
- **`is_use_tb`**: whether to write TensorBoard logs into the same experiment folder.

#### Data loading & normalization

- **`dataset_name`**: scenario name (e.g., `cylinder`, `controlled_cylinder`, `fsi`, `foil`, `combustion`).
- **`dataset_root`**: local dataset root directory.
- **`num_workers`**: PyTorch dataloader workers.
- **`normalizer`**: `none | gaussian | range` (controls how fields are normalized in training/eval).
- **`mask_prob`**: probability for mask-training used to reduce sim→real modality mismatch.
- **`noise_scale`**: noise level added for numerical (simulated) training data (the dataset wrapper may ignore it for real data).

#### Training loop (gradient-based baselines)

- **`model_name`**: which baseline wrapper to build (e.g., `fno`, `unet`, `dpot`, ...).
- **`scheduler`**: `step | cosine`.
- **`step_size`**: only used when `scheduler: step`.
- **`num_update`**: number of training iterations.
- **`train_batch_size`**: batch size for training dataloader.
- **`test_batch_size`**: batch size for val/test dataloader.
- **`lr`**: Adam learning rate.
- **`clip_grad_norm`**: gradient clipping; set `0.` to disable.

!!! note
    **Finetuning** uses `--is_finetune` (CLI) and reads `checkpoint_path` from YAML **only** in training:
    - `realpdebench.train` will call `model.load_checkpoint(checkpoint_path, ...)` when `--is_finetune` is set.
    - Some models also use `checkpoint_path` for their own initialization (e.g., DPOT loads pretrained weights).

#### Evaluation settings

- **`N_autoregressive`**: number of autoregressive rollout steps used by `realpdebench.eval`.
- **`N_plot`**: number of qualitative examples to plot (set `0` to disable).
- **`probe_diagnostic`**, **`N_plot_probe`**: optional probe-based diagnostics (only for datasets that support it).

### Model-specific YAML fields

Each baseline defines additional YAML keys (architecture hyperparameters, diffusion sampling settings, pretrained checkpoint paths, etc.). See the per-model pages under [**Models**](models.md) for a complete list and explanation.

## Troubleshooting

- **"HF Arrow dataset not found"**: verify you have `.../{scenario}/hf_dataset/{dataset_type}_{split}/` locally, or run `realpdebench download ...` (or enable `--hf_auto_download`).
- **DNS issues**: set `HF_HUB_DISABLE_XET=1`.

## Support

- **GitHub Issues**: [Report bugs](https://github.com/AI4Science-WestlakeU/RealPDEBench/issues)
- **GitHub Discussions**: [Ask questions](https://github.com/AI4Science-WestlakeU/RealPDEBench/discussions)
- **Email**: `hupeiyan@westlake.edu.cn`, `fenghaodong@westlake.edu.cn`, `liuhongyuan@westlake.edu.cn`

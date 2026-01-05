# Models Overview

RealPDEBench benchmarks **10 baseline models** spanning classical reduced-order methods, neural operators, transformers, and foundation models.

This page summarizes **what is included** and the **shared model interface**. For detailed architecture notes and RealPDEBench-specific constraints, see the per-model pages.

## Common interface in RealPDEBench

All learning baselines implement a unified `Model` API:

- **`forward(x) -> y`**: predicts future spatiotemporal fields
- **`train_loss(input, target)`**: returns a training loss used by the benchmark training loop

**Tensor layout (shared across baselines)**:

- A dataset sample returns `(input, target)` with shapes **`[T_in, H, W, C_in]`** and **`[T_out, H, W, C_out]`**.
- After batching, the model sees \(x \in \mathbb{R}^{B \times T_\text{in} \times H \times W \times C_\text{in}}\) and must output \(y \in \mathbb{R}^{B \times T_\text{out} \times H \times W \times C_\text{out}}\).

**Practical notes**:

- Many baselines vectorize multi-step prediction and assume \(T_\text{out}\) is a multiple of \(T_\text{in}\) (often \(T_\text{out}=T_\text{in}\)).
- For partially observed real-world modalities, unmeasured channels are represented by **zero padding**; simulated training uses **mask-training** to reduce train–test mismatch.

## Baseline roster

| Family | Baseline | Key reference |
| --- | --- | --- |
| Traditional | [**DMD**](models/dmd.md) | Kutz et al., *Dynamic Mode Decomposition*, 2016 |
| Trad & CNN | [**U-Net**](models/unet.md) | Ronneberger et al., MICCAI 2015 |
| Neural Operators | [**CNO**](models/cno.md) | Raonic et al., NeurIPS 2023 |
| Neural Operators | [**DeepONet**](models/deeponet.md) | Lu et al., *Nature Machine Intelligence*, 2021 |
| Neural Operators | [**FNO**](models/fno.md) | Li et al., ICLR 2021 |
| Neural Operators | [**MWT**](models/mwt.md) | Gupta et al., NeurIPS 2021 |
| Transformers | [**GK-Transformer**](models/gk-transformer.md) | Cao, NeurIPS 2021 |
| Transformers | [**Transolver**](models/transolver.md) | Wu et al., ICML 2024 |
| Neural Operators | [**WDNO**](models/wdno.md) | Hu et al., ICLR 2025 |
| Foundation Models | [**DPOT** (DPOT-S / DPOT-L)](models/dpot.md) | Hao et al., ICML 2024 |

## Category pages

- **Traditional & CNN**: [Index →](models/trad-cnn.md)
- **Neural Operators**: [Index →](models/neural-operators.md)
- **Transformers**: [Index →](models/transformers.md)
- **Foundation Models**: [Index →](models/foundation-models.md)

## Add your own model

To implement and register a new model in the benchmark codebase, see: [Add Your Model →](models/add-your-model.md)

## Where to find results

Benchmark numbers are shown in the homepage **Results Explorer**: [Jump to Results Explorer](index.md#benchmark-results).

# Models Overview

RealPDEBench benchmarks **10 baseline models** across datasets and evaluation metrics.  
This page provides a **high-level overview**; each category has its own page with details and references.

## Traditional & CNN

Classical baselines and convolutional architectures.

- **DMD** (Dynamic Mode Decomposition) — classical reduced-order baseline
- **U-Net** — convolutional architecture for spatiotemporal fields

[Go to Trad & CNN details →](models/trad-cnn.md)

## Neural Operators

Neural operators learn mappings between function spaces (fields \(\to\) fields).

- **FNO** (Fourier Neural Operator)
- **CNO** (Convolutional Neural Operator)
- **DeepONet** (Deep Operator Network)
- **MWT** (Multi-Wavelet Transform)
- **GK-Transformer** (Galerkin Transformer)
- **Transolver** (Transformer-based Solver)
- **WDNO** (Wavelet-Decomposed Neural Operator)

[Go to Neural Operators details →](models/neural-operators.md)

## Foundation Models

Large-scale pretrained operator models.

- **DPOT** (Diffusion Pre-trained Operator Transformer)
  - **DPOT-L:** 509M parameters
  - **DPOT-S:** 30M parameters

[Go to Foundation Models details →](models/foundation-models.md)

## Performance Summary

Coming soon: comprehensive benchmark results across all datasets and metrics.

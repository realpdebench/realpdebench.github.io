# FNO (Fourier Neural Operator)

**FNO** learns an operator mapping using Fourier-domain global mixing, enabling efficient modeling of long-range interactions.

**Reference Paper**: Li et al., ICLR 2021.

```bibtex
@inproceedings{
Li2020FourierNO,
title={Fourier neural operator for parametric partial differential equations},
author={Li, Zongyi and Kovachki, Nikola and Azizzadenesheli, Kamyar and Liu, Burigede and Bhattacharya, Kaushik and Stuart, Andrew and Anandkumar, Anima},
booktitle={The Ninth International Conference on Learning Representations},
year={2021}
}
```

## RealPDEBench interface

- **Input**: `x` with shape `[B, T_in, H, W, C_in]`
- **Output**: predictions with shape `[B, T_out, H, W, C_out]`

## Implementation notes (RealPDEBench)

- The baseline appends a normalized coordinate grid `(t, x, y)` before lifting.
- It uses a vectorized reshape for multi-step outputs, which assumes \(T_\text{out}\) is a multiple of \(T_\text{in}\).
- Training uses an MSE-style objective on predicted fields.

## YAML config (RealPDEBench)

This baseline is enabled by `model_name: "fno"` in the training YAML.

### Config files

- **Cylinder**: `realpdebench/configs/cylinder/fno.yaml`
- **Controlled Cylinder**: `realpdebench/configs/controlled_cylinder/fno.yaml`
- **FSI**: `realpdebench/configs/fsi/fno.yaml`
- **Foil**: `realpdebench/configs/foil/fno.yaml`
- **Combustion**: `realpdebench/configs/combustion/fno.yaml`

!!! note
    Combustion also provides **surrogate-model** configs for `python -m realpdebench.train_surrogate`:
    `realpdebench/configs/combustion/surrogate_model/fno.yaml`.

### Model-specific keys

These keys are consumed by `realpdebench.model.load_model.load_model()` and `realpdebench.model.fno.FNO3d`.

- **`modes1`** (`int`): Number of kept Fourier modes along the first FFT dimension (upper bound \( \lfloor N/2 \rfloor + 1 \)).
- **`modes2`** (`int`): Number of kept Fourier modes along the second FFT dimension.
- **`modes3`** (`int`): Number of kept Fourier modes along the third FFT dimension.
- **`n_layers`** (`int`): Number of stacked Fourier blocks (each mixes a spectral convolution + a pointwise \(1\times1\times1\) conv).
- **`width`** (`int`): Channel width after lifting (latent feature dimension used throughout the network).

!!! tip
    The rest of the YAML fields (e.g., `dataset_root`, `mask_prob`, `num_update`, `lr`, `N_autoregressive`) are shared across baselines; see **Getting Started → Training YAML configs**.



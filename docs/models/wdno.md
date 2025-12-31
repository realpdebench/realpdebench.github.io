# WDNO (Wavelet Diffusion Neural Operator)

**WDNO** combines a diffusion model with a wavelet representation to model complex spatiotemporal dynamics, especially when abrupt changes are present.

**Reference Paper**: Hu et al., ICLR 2025.

```bibtex
@inproceedings{
hu2025wavelet,
title={Wavelet Diffusion Neural Operator},
author={Peiyan Hu and Rui Wang and Xiang Zheng and Tao Zhang and Haodong Feng and Ruiqi Feng and Long Wei and Yue Wang and Zhi-Ming Ma and Tailin Wu},
booktitle={The Thirteenth International Conference on Learning Representations},
year={2025}
}
```

## RealPDEBench interface

- **Input**: `x` with shape `[B, T_in, H, W, C_in]`
- **Output**: predictions with shape `[B, T_out, H, W, C_out]`

## Implementation notes (RealPDEBench)

- WDNO trains a diffusion model in **wavelet-coefficient space** on a concatenation of input and target information.
- Inference is performed by DDPM/DDIM-style sampling and can be slower than deterministic operator baselines due to multiple sampling steps.
- Conditioning uses wavelet coefficients derived from the input window.

## YAML config (RealPDEBench)

This baseline is enabled by `model_name: "wdno"` in the training YAML.

### Config files

- **Cylinder**: `realpdebench/configs/cylinder/wdno.yaml`
- **Controlled Cylinder**: `realpdebench/configs/controlled_cylinder/wdno.yaml`
- **FSI**: `realpdebench/configs/fsi/wdno.yaml`
- **Foil**: `realpdebench/configs/foil/wdno.yaml`
- **Combustion**: `realpdebench/configs/combustion/wdno.yaml`

### Model-specific keys

These keys are consumed by `realpdebench.model.load_model.load_model()` and `realpdebench.model.wdno.WDNO`.

- **`dim`** (`int`): Base channel width of the internal 3D U-Net used by the diffusion model.
- **`dim_mults`** (`list[int]`): Channel multipliers per resolution stage of the internal U-Net.
- **`wave_type`** (`str`): Wavelet family used for the wavelet decomposition (e.g., `"bior1.1"`).
- **`pad_mode`** (`str`): Wavelet padding mode (e.g., `"zero"`).
- **`beta_schedule`** (`str`): Diffusion beta schedule (`"linear"`, `"cosine"`, or `"sigmoid"`).
- **`sampling_timesteps`** (`int`): Number of sampling steps for inference. If smaller than the diffusion training steps, WDNO uses DDIM-style fast sampling.
- **`ddim_sampling_eta`** (`float`): DDIM sampling noise parameter (controls stochasticity during DDIM sampling).

!!! tip
    For WDNO, **`sampling_timesteps` is the main speed knob** at evaluation time: fewer steps are faster but may degrade sample quality.



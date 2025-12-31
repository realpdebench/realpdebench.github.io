# Transolver (Transformer-based Solver)

**Transolver** is a transformer solver for PDEs designed to handle general geometries with efficient global mixing.

**Reference Paper**: Wu et al., ICML 2024.

```bibtex
@inproceedings{wu2024transolver,
  title={Transolver: a fast transformer solver for PDEs on general geometries},
  author={Wu, Haixu and Luo, Huakun and Wang, Haowen and Wang, Jianmin and Long, Mingsheng},
  booktitle={Proceedings of the 41st International Conference on Machine Learning},
  pages={53681--53705},
  year={2024}
}
```

## RealPDEBench interface

In the benchmark, Transolver is configured to produce predictions that match the dataset target window:

- **Input**: `x` with shape `[B, T_in, H, W, C_in]`
- **Output**: predictions with shape `[B, T_out, H, W, C_out]`

## Implementation notes (RealPDEBench)

- The implementation tokenizes the spatiotemporal grid and applies physics-inspired attention blocks.
- In practice, this baseline is configured for dataset-specific grid sizes (`H`, `W`, `D`) and output feature dimension (`out_dim`) via YAML configs.
- The model returns per-element squared error in `train_loss()`; the benchmark training loop averages it.

## Transolver specific YAML config

This baseline is enabled by `model_name: "transolver"` in the training YAML.

!!! note
    The shipped config filename uses a legacy name: **`trainsolver.yaml`** (but it sets `model_name: "transolver"`).

### Config files

- **Cylinder**: `realpdebench/configs/cylinder/trainsolver.yaml`
- **Controlled Cylinder**: `realpdebench/configs/controlled_cylinder/trainsolver.yaml`
- **FSI**: `realpdebench/configs/fsi/trainsolver.yaml`
- **Foil**: `realpdebench/configs/foil/trainsolver.yaml`
- **Combustion**: `realpdebench/configs/combustion/trainsolver.yaml`

### Model-specific keys

These keys are consumed by `realpdebench.model.load_model.load_model()` and are passed into the Transolver library model constructor.

- **`space_dim`** (`int`): Spatial dimension used by the solver (e.g., `3` for \((t,x,y)\) or similar structured meshes).
- **`n_layers`** (`int`): Number of transformer layers.
- **`n_hidden`** (`int`): Hidden dimension of transformer tokens.
- **`n_head`** (`int`): Number of attention heads.
- **`H`** (`int`): Grid size parameter (dataset/model specific).
- **`W`** (`int`): Grid size parameter (dataset/model specific).
- **`D`** (`int`): Grid/time tokenization parameter used by the model (dataset/model specific).
- **`fun_dim`** (`int`): Additional function-feature dimension (kept as configured in YAML).
- **`out_dim`** (`int`): Output feature dimension expected by the model head.
- **`ref`** (`int`): Resolution/refinement hyperparameter used by the Transolver implementation.
- **`dropout`** (`float`): Dropout probability inside transformer blocks.
- **`act`** (`str`): Activation function name (e.g., `"gelu"`).
- **`mlp_ratio`** (`float`): MLP expansion ratio inside transformer blocks.
- **`slice_num`** (`int`): Number of slices/partitions used by the Transolver implementation.

!!! note
    Some shipped `trainsolver.yaml` configs contain `test_interval`, but the current `python -m realpdebench.train` loop does **not** read it.



# DeepONet (Deep Operator Network)

**DeepONet** approximates nonlinear operators using a **branch network** (encoding the input function) and a **trunk network** (encoding query coordinates).

**Reference Paper**: Lu et al., *Nature Machine Intelligence*, 2021.

```bibtex
@article{lu2021learning,
  title={Learning nonlinear operators via DeepONet based on the universal approximation theorem of operators},
  author={Lu, Lu and Jin, Pengzhan and Pang, Guofei and Zhang, Zhongqiang and Karniadakis, George Em},
  journal={Nature machine intelligence},
  volume={3},
  number={3},
  pages={218--229},
  year={2021},
  publisher={Nature Publishing Group UK London}
}
```

## RealPDEBench interface

- **Input**: `x` with shape `[B, T_in, H, W, C_in]`
- **Output**: predictions with shape `[B, T_out, H, W, C_out]`

## Implementation notes (RealPDEBench)

- The baseline creates a normalized `(t, x, y)` coordinate grid for the **target horizon** and queries the trunk network at those points.
- Unlike several operator baselines, DeepONet does not require \(T_\text{out}\) to be a multiple of \(T_\text{in}\) (the horizon is defined by the coordinate grid).
- Training uses an MSE-style objective on predicted fields.

## DeepONet specific YAML config

This baseline is enabled by `model_name: "deeponet"` in the training YAML.

### Config files

- **Cylinder**: `realpdebench/configs/cylinder/deeponet.yaml`
- **Controlled Cylinder**: `realpdebench/configs/controlled_cylinder/deeponet.yaml`
- **FSI**: `realpdebench/configs/fsi/deeponet.yaml`
- **Foil**: `realpdebench/configs/foil/deeponet.yaml`
- **Combustion**: `realpdebench/configs/combustion/deeponet.yaml`

### Model-specific keys

These keys are consumed by `realpdebench.model.load_model.load_model()` and `realpdebench.model.deeponet.DeepONet`.

- **`p`** (`int`): Latent basis dimension used by the branch/trunk networks (higher can increase capacity but is more expensive).
- **`dropout_rate`** (`float`): Dropout probability used inside the DeepONet MLP blocks.



# CNO (Convolutional Neural Operator)

**CNO** is a convolutional neural operator designed to learn robust operator mappings and avoid discretization artifacts.

**Reference Paper**: Raonic et al., NeurIPS 2023.

```bibtex
@article{raonic2023convolutional,
  title={Convolutional neural operators for robust and accurate learning of PDEs},
  author={Raonic, Bogdan and Molinaro, Roberto and De Ryck, Tim and Rohner, Tobias and Bartolucci, Francesca and Alaifari, Rima and Mishra, Siddhartha and de B{\'e}zenac, Emmanuel},
  journal={Advances in Neural Information Processing Systems},
  volume={36},
  pages={77187--77200},
  year={2023}
}
```

## RealPDEBench interface

- **Input**: `x` with shape `[B, T_in, H, W, C_in]`
- **Output**: predictions with shape `[B, T_out, H, W, C_out]`

## Implementation notes (RealPDEBench)

- Internally, inputs may be permuted to `[B, C, T, H, W]` for 3D convolutions and then permuted back.
- If \(T_\text{out} > T_\text{in}\), the implementation expands the output feature dimension and reshapes back into the time dimension, so it assumes \(T_\text{out}\) is a multiple of \(T_\text{in}\).
- Training uses an MSE-style objective on predicted fields.

## CNO specific YAML config

This baseline is enabled by `model_name: "cno"` in the training YAML.

### Config files

- **Cylinder**: `realpdebench/configs/cylinder/cno.yaml`
- **Controlled Cylinder**: `realpdebench/configs/controlled_cylinder/cno.yaml`
- **FSI**: `realpdebench/configs/fsi/cno.yaml`
- **Foil**: `realpdebench/configs/foil/cno.yaml`
- **Combustion**: `realpdebench/configs/combustion/cno.yaml`

### Model-specific keys

In the current reference implementation, `realpdebench.model.load_model.load_model()` constructs `realpdebench.model.cno.CNO3d` and only wires through:

- **`N_layers`** (`int`): Number of downsampling/upsampling stages (operator “depth”).

!!! note
    The `cno.yaml` files may contain many additional CNO hyperparameters (e.g., `N_res`, `cutoff_den`, `filter_size`, ...). These correspond to optional arguments of `CNO3d`, but they are **not currently passed** by the RealPDEBench `load_model()` wrapper, so changing them in YAML may have **no effect** unless the wrapper is extended.



# MWT (Multiwavelet Transform Neural Operator)

**MWT** models multi-scale structure via multiwavelet bases and efficient mixing across scales.

**Reference Paper**: Gupta et al., NeurIPS 2021.

```bibtex
@article{gupta2021multiwavelet,
  title={Multiwavelet-based operator learning for differential equations},
  author={Gupta, Gaurav and Xiao, Xiongye and Bogdan, Paul},
  journal={Advances in neural information processing systems},
  volume={34},
  pages={24048--24062},
  year={2021}
}
```

## RealPDEBench interface

- **Input**: `x` with shape `[B, T_in, H, W, C_in]`
- **Output**: predictions with shape `[B, T_out, H, W, C_out]`

## Implementation notes (RealPDEBench)

- The implementation may reorder tensors to `[B, H, W, T, C]` internally and convert back to the benchmark convention.
- Multi-step outputs use a vectorized reshape and typically assume \(T_\text{out}\) is a multiple of \(T_\text{in}\).
- Training uses an MSE-style objective on predicted fields.

## MWT specific YAML config

This baseline is enabled by `model_name: "mwt"` in the training YAML.

### Config files

- **Cylinder**: `realpdebench/configs/cylinder/mwt.yaml`
- **Controlled Cylinder**: `realpdebench/configs/controlled_cylinder/mwt.yaml`
- **FSI**: `realpdebench/configs/fsi/mwt.yaml`
- **Foil**: `realpdebench/configs/foil/mwt.yaml`
- **Combustion**: `realpdebench/configs/combustion/mwt.yaml`

### Model-specific keys

These keys are consumed by `realpdebench.model.load_model.load_model()` and `realpdebench.model.MWT_libs.models.MWT3d`.

- **`k`** (`int`): Wavelet filter size (controls the local basis size).
- **`alpha`** (`int`): Fourier filter parameter in MWT blocks (typically constrained by the time dimension).
- **`c`** (`int`): Channel expansion factor used by the wavelet mixing blocks.
- **`nCZ`** (`int`): Number of MWT "CZ" blocks (depth of the operator).
- **`L`** (`int`): Coarsest wavelet level used by the hierarchy.
- **`base`** (`str`): Wavelet basis type (e.g., `"legendre"` or `"chebyshev"`).

!!! note
    Some shipped `mwt.yaml` configs contain `test_interval`, but the current `python -m realpdebench.train` loop evaluates on a fixed cadence (`num_update / 50`) and does **not** read `test_interval`.



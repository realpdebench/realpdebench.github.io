# DMD (Dynamic Mode Decomposition)

**DMD** is a classical reduced-order modeling technique that extracts spatiotemporal coherent structures from time-series data via an SVD-based decomposition, then extrapolates dynamics using a linear evolution model.

**Reference Paper**: Kutz et al., *Dynamic Mode Decomposition: Data-Driven Modeling of Complex Systems*, 2016.

```bibtex
@book{kutz2016dynamic,
  title={Dynamic mode decomposition: data-driven modeling of complex systems},
  author={Kutz, J Nathan and Brunton, Steven L and Brunton, Bingni W and Proctor, Joshua L},
  year={2016},
  publisher={SIAM}
}
```

## RealPDEBench interface

- **Input**: `x` with shape `[B, T_in, H, W, C_in]`
- **Output**: predictions with shape `[B, T_out, H, W, C_out]` (typically `C_out == C_in` for this baseline)

## RealPDEBench usage notes

- **No training stage**: DMD is not trained with gradient descent. In the RealPDEBench paper tables, DMD occupies only the inference-only column and the training columns are left blank.
- **Main knobs**: `n_modes` (number of retained modes), `n_predict` (prediction horizon), `N_autoregressive` (rollout setting used by the benchmark).
- **Modalities**: if extra channels are zero-padded (unmeasured modalities), DMD is typically configured to use only the measured channels.

## YAML config (RealPDEBench)

DMD is enabled by `model_name: "dmd"` in the YAML. Since it is a **non-learning** baseline, the YAML mainly controls **how DMD is applied at evaluation time**.

### Config files

- **Cylinder**: `realpdebench/configs/cylinder/dmd.yaml`
- **Controlled Cylinder**: `realpdebench/configs/controlled_cylinder/dmd.yaml`
- **FSI**: `realpdebench/configs/fsi/dmd.yaml`
- **Foil**: `realpdebench/configs/foil/dmd.yaml`
- **Combustion**: `realpdebench/configs/combustion/dmd.yaml`

### Model-specific keys

These keys are consumed by `realpdebench.model.load_model.load_model()` and `realpdebench.model.dmd.DMD`.

- **`n_modes`** (`int`): Number of retained DMD modes after truncation (higher can fit more dynamics, but may overfit/noise).
- **`n_predict`** (`int`): Number of future frames predicted per DMD forward call.
- **`input_feature`** (`int`): Number of channels used by DMD from the input tensor (useful when extra channels are zero-padded/unmeasured).
- **`N_autoregressive`** (`int`): Number of autoregressive rollouts used by the benchmark evaluation loop.

!!! note
    DMD does not use gradient-based training. Keys like `lr`, `scheduler`, or `clip_grad_norm` (if present) have no effect.



# GK-Transformer (Galerkin Transformer)

The **Galerkin Transformer** is an attention-based operator learner that replaces softmax attention with a projection-based formulation.

**Reference Paper**: Cao, NeurIPS 2021.

```bibtex
@article{cao2021choose,
  title={Choose a transformer: Fourier or galerkin},
  author={Cao, Shuhao},
  journal={Advances in neural information processing systems},
  volume={34},
  pages={24924--24940},
  year={2021}
}
```

## RealPDEBench interface

- **Input**: `x` with shape `[B, T_in, H, W, C_in]`
- **Output**: predictions with shape `[B, T_out, H, W, C_out]`

## Implementation notes (RealPDEBench)

- If no coordinate grid is provided, the model constructs a normalized `(t, x, y)` grid internally.
- The regressor maps latent representations back to field space and then reshapes to the benchmark time dimension.
- Multi-step outputs assume \(T_\text{out}\) is a multiple of \(T_\text{in}\).
- Training uses an MSE-style objective on predicted fields.

## YAML config (RealPDEBench)

In RealPDEBench, GK-Transformer is implemented as the **Galerkin Transformer** baseline and is enabled by:

- `model_name: "galerkin_transformer"`

### Config files

- **Cylinder**: `realpdebench/configs/cylinder/galerkin_transformer.yaml`
- **Controlled Cylinder**: `realpdebench/configs/controlled_cylinder/galerkin_transformer.yaml`
- **FSI**: `realpdebench/configs/fsi/galerkin_transformer.yaml`
- **Foil**: `realpdebench/configs/foil/galerkin_transformer.yaml`
- **Combustion**: `realpdebench/configs/combustion/galerkin_transformer.yaml`

### Model-specific keys

These keys are passed as `**kwargs` into `realpdebench.model.galerkin_transformer.GalerkinTransformer3d`.
The wrapper also auto-fills `shape_in`, `shape_out`, `node_feats`, and `n_targets` from the dataset.

- **`pos_dim`** (`int`): Dimension of the positional encoding input to attention (when `pos` is provided / enabled).
- **`n_hidden`** (`int`): Hidden feature dimension of tokens inside the transformer.
- **`num_feat_layers`** (`int`): Number of graph feature-extractor layers when `feat_extract_type` is enabled (e.g., GCN/GAT).
- **`num_encoder_layers`** (`int`): Number of transformer encoder layers.
- **`n_head`** (`int`): Number of attention heads.
- **`dim_feedforward`** (`int`): Feed-forward hidden dimension inside each encoder layer (defaults to \(2\times n_\text{hidden}\) if unset).
- **`feat_extract_type`** (`str/null`): Optional feature extractor type before attention (commonly `null`, `"gcn"`, or `"gat"`).
- **`attention_type`** (`str`): Attention kernel type. Supported families include `"fourier"`, `"integral"`, `"local"`, `"global"`, `"cosine"`, `"galerkin"`, `"linear"`, `"softmax"`, and `"official"`.
- **`xavier_init`** (`float`): Xavier/Glorot init gain for attention projections (used in some attention types).
- **`diagonal_weight`** (`float`): Diagonal initialization weight used by some attention parameterizations.
- **`symmetric_init`** (`bool`): Whether to use symmetric initialization in attention (implementation-dependent).
- **`layer_norm`** (`bool`): Whether to apply layer normalization in encoder blocks.
- **`attn_norm`** (`bool`): Whether to normalize inside attention (often enabled when `layer_norm` is disabled).
- **`norm_eps`** (`float`): Epsilon for normalization layers (numerical stability).
- **`batch_norm`** (`bool`): Whether to use batch normalization in feed-forward blocks (implementation-dependent).
- **`return_attn_weight`** (`bool`): Whether to return/store attention weights (mainly for debugging/analysis).
- **`return_latent`** (`bool`): Whether to store intermediate latent states from encoder layers.
- **`decoder_type`** (`str`): Decoder/regressor type. In the current wrapper, common values include `"ifft2"` (spectral regressor) and `"pointwise"`.
- **`spacial_dim`** (`int`): Spatial coordinate dimension used when `spacial_fc` is enabled (`1`, `2`, or `3`).
- **`spacial_fc`** (`bool`): Whether to concatenate spatial coordinates into the feature MLPs (coordinate-aware projection).
- **`upsample_mode`** (`str`): Upsampling mode used by the optional `UpScaler` (e.g., `"interp"`).
- **`downsample_mode`** (`str`): Downsampling mode used by the optional `DownScaler` (e.g., `"interp"`).
- **`freq_dim`** (`int`): Frequency-domain hidden dimension used by the spectral regressor (`decoder_type: "ifft2"`).
- **`boundary_condition`** (`str/null`): Boundary condition handling mode (e.g., `None` / `"dirichlet"`), used by some regressor variants.
- **`num_regressor_layers`** (`int`): Number of layers in the regressor/decoder head.
- **`fourier_modes_x`** (`int`): Number of Fourier modes in the x dimension for the spectral regressor.
- **`fourier_modes_y`** (`int`): Number of Fourier modes in the y dimension for the spectral regressor.
- **`fourier_modes_t`** (`int`): Number of Fourier modes in the time dimension for the spectral regressor.
- **`regressor_activation`** (`str`): Activation function used in the regressor head (e.g., `"silu"`).
- **`downscaler_activation`** (`str`): Activation function used in the downscaler (if enabled).
- **`upscaler_activation`** (`str`): Activation function used in the upscaler (if enabled).
- **`last_activation`** (`bool`): Whether to apply an activation at the last stage of the regressor (implementation-dependent).
- **`dropout`** (`float`): Dropout probability used in attention blocks (may be overridden per sub-module).
- **`downscaler_dropout`** (`float`): Dropout probability in the downscaler (if enabled).
- **`upscaler_dropout`** (`float`): Dropout probability in the upscaler (if enabled).
- **`ffn_dropout`** (`float`): Dropout probability in the feed-forward sub-layer.
- **`encoder_dropout`** (`float`): Dropout probability used in encoder layers.
- **`decoder_dropout`** (`float`): Dropout probability used in the decoder/regressor.
- **`debug`** (`bool`): Debug flag (enables extra checks / verbose behavior in some components).



# DPOT (Auto-Regressive Denoising Operator Transformer)

**DPOT** is a pretrained operator transformer that can be finetuned to new datasets and modalities.

**Reference Paper**: Hao et al., ICML 2024.

```bibtex
@inproceedings{hao2024dpot,
  title={DPOT: Auto-Regressive Denoising Operator Transformer for Large-Scale PDE Pre-Training},
  author={Hao, Zhongkai and Su, Chang and Liu, Songming and Berner, Julius and Ying, Chengyang and Su, Hang and Anandkumar, Anima and Song, Jian and Zhu, Jun},
  booktitle={International Conference on Machine Learning},
  pages={17616--17635},
  year={2024},
  organization={PMLR}
}
```

## Variants in RealPDEBench

RealPDEBench evaluates two pretrained DPOT variants:

- **DPOT-S**: small pretrained model (≈30M)
- **DPOT-L**: large pretrained model (≈509M)

## RealPDEBench interface

- **Input**: `x` with shape `[B, T_in, H, W, C_in]`
- **Output**: predictions with shape `[B, T_out, H, W, C_out]`

## Implementation notes (RealPDEBench)

- **Resolution**: pretrained at 128×128. The wrapper resizes inputs to `img_size` via FFT-based resize (Fourier-domain zero-padding/truncation), runs DPOT, then resizes outputs back to the original resolution.
- **Channels (4-channel pretrained I/O)**:
  - If `C_in < 4`, pad to 4 channels during inference/training and slice back to dataset channels on output.
  - If the dataset has more than 4 channels, projection layers must be adapted (reinitialized) to match the dataset.
- **Long-horizon prediction**: supports single-shot prediction when `out_timesteps == T_out`, otherwise uses a sliding-window auto-regressive rollout.

## YAML config (RealPDEBench)

DPOT is enabled by `model_name: "dpot"` in the training YAML. RealPDEBench provides two **pretrained** variants with separate configs:

- **DPOT-S**: `dpot_s.yaml`
- **DPOT-L**: `dpot_l.yaml`

### Config files

- **Cylinder**
  - **DPOT-S**: `realpdebench/configs/cylinder/dpot_s.yaml`
  - **DPOT-L**: `realpdebench/configs/cylinder/dpot_l.yaml`
- **Controlled Cylinder**
  - **DPOT-S**: `realpdebench/configs/controlled_cylinder/dpot_s.yaml`
  - **DPOT-L**: `realpdebench/configs/controlled_cylinder/dpot_l.yaml`
- **FSI**
  - **DPOT-S**: `realpdebench/configs/fsi/dpot_s.yaml`
  - **DPOT-L**: `realpdebench/configs/fsi/dpot_l.yaml`
- **Foil**
  - **DPOT-S**: `realpdebench/configs/foil/dpot_s.yaml`
  - **DPOT-L**: `realpdebench/configs/foil/dpot_l.yaml`
- **Combustion**
  - **DPOT-S**: `realpdebench/configs/combustion/dpot_s.yaml`
  - **DPOT-L**: `realpdebench/configs/combustion/dpot_l.yaml`

### Model-specific keys

These keys are consumed by `realpdebench.model.load_model.load_model()` and `realpdebench.model.dpot.DPOT`.

- **`checkpoint_path`** (`str`): Path to the **pretrained DPOT checkpoint** (loaded during model construction).
- **`model_type`** (`str`): DPOT backbone type: `"dpot"` or `"dpot3d"` (selects which DPOT network class is constructed).
- **`img_size`** (`int`): Pretrained model’s native spatial resolution. The wrapper FFT-resizes inputs/outputs to/from this resolution.
- **`patch_size`** (`int`): Patch size used by the DPOT patch embedding.
- **`in_channels`** (`int`): DPOT model input channels for the pretrained backbone (commonly 4). RealPDEBench pads data channels up to this number if needed.
- **`out_channels`** (`int`): DPOT model output channels for the pretrained backbone (commonly 4). Outputs are sliced back to dataset channels after inference.
- **`in_timesteps`** (`int`): Number of input timesteps expected by DPOT (must equal the dataset’s \(T_\text{in}\) in RealPDEBench).
- **`out_timesteps`** (`int`): Number of timesteps predicted per DPOT forward call. If smaller than the dataset’s \(T_\text{out}\), the wrapper rolls out with a sliding window.
- **`embed_dim`** (`int`): Transformer embedding dimension of the pretrained DPOT backbone.
- **`depth`** (`int`): Number of transformer layers in the pretrained backbone.
- **`n_blocks`** (`int`): Number of AFNO blocks (as defined by the original DPOT implementation).
- **`modes`** (`int`): Number of spectral modes used by AFNO mixing (model-internal hyperparameter).
- **`mlp_ratio`** (`float`): MLP expansion ratio in transformer blocks.
- **`out_layer_dim`** (`int`): Hidden dimension used in the output layer (kept consistent with the checkpoint).
- **`normalize`** (`bool`): Whether DPOT uses normalization in the backbone (checkpoint-dependent).
- **`act`** (`str`): Activation function name used by the pretrained backbone (e.g., `"gelu"`).
- **`time_agg`** (`str`): Temporal aggregation strategy used by the DPOT implementation (checkpoint-dependent).
- **`n_cls`** (`int`): Number of pretraining “classes / datasets” encoded in the checkpoint; must match the checkpoint.

!!! note
    **Finetuning vs pretrained checkpoint**:
    - `checkpoint_path` above is the DPOT **pretrained weight** file required to construct the model.
    - Real-world finetuning in RealPDEBench is controlled separately by the CLI flag `--is_finetune` (and uses `checkpoint_path` to load a RealPDEBench training checkpoint for baselines that support `load_checkpoint()`).



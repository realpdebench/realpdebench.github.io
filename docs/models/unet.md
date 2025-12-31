# U-Net (3D U-Net)

RealPDEBench uses a **3D U-Net** baseline (encoder–decoder CNN with skip connections) to model spatiotemporal fields.

**Reference Paper**: Ronneberger et al., MICCAI 2015.

```bibtex
@inproceedings{ronneberger2015u,
  title={U-net: Convolutional networks for biomedical image segmentation},
  author={Ronneberger, Olaf and Fischer, Philipp and Brox, Thomas},
  booktitle={International Conference on Medical image computing and computer-assisted intervention},
  pages={234--241},
  year={2015},
  organization={Springer}
}
```

## RealPDEBench interface

- **Input**: `x` with shape `[B, T_in, H, W, C_in]`
- **Output**: predictions with shape `[B, T_out, H, W, C_out]`

## Implementation notes (RealPDEBench)

- The implementation permutes inputs to `[B, C_in, T_in, H, W]` for 3D convolutions and permutes back before returning outputs.
- If \(T_\text{out} > T_\text{in}\), the baseline repeats the input along the time axis to reach `T_out`, so it assumes \(T_\text{out}\) is a multiple of \(T_\text{in}\).
- Training uses an MSE-style objective on the predicted fields.

## YAML config (RealPDEBench)

This baseline is enabled by `model_name: "unet"` in the training YAML.

### Config files

- **Cylinder**: `realpdebench/configs/cylinder/unet.yaml`
- **Controlled Cylinder**: `realpdebench/configs/controlled_cylinder/unet.yaml`
- **FSI**: `realpdebench/configs/fsi/unet.yaml`
- **Foil**: `realpdebench/configs/foil/unet.yaml`
- **Combustion**: `realpdebench/configs/combustion/unet.yaml`

!!! note
    Combustion also provides **surrogate-model** configs for `python -m realpdebench.train_surrogate`:
    `realpdebench/configs/combustion/surrogate_model/unet.yaml`.

### Model-specific keys

These keys are consumed by `realpdebench.model.load_model.load_model()` and `realpdebench.model.unet.Unet3d`.

- **`dim_mults`** (`list[int]`): Channel multipliers per U-Net resolution stage (controls width growth across downsampling/upsampling).

!!! note
    Some shipped `unet.yaml` configs contain extra keys like `epochs`, `gamma`, or `is_resume`. In the current training entry point (`python -m realpdebench.train`), training length is controlled by `num_update`, and `epochs/gamma/is_resume` are **not used**.



# Cylinder

Wake dynamics behind a **stationary circular cylinder** measured with time-resolved PIV, paired with matched CFD simulations.

## Visualizations

<div class="rp-dataset-videos">
  <div class="rp-dataset-video-grid">
    <div class="rp-dataset-video-card">
      <div class="rp-dataset-video-title">Real-world</div>
      <video autoplay loop muted playsinline preload="metadata">
        <source src="../../assets/videos/cylinder/cylinder_real.mp4" type="video/mp4">
      </video>
    </div>
    <div class="rp-dataset-video-card">
      <div class="rp-dataset-video-title">Simulated</div>
      <video autoplay loop muted playsinline preload="metadata">
        <source src="../../assets/videos/cylinder/cylinder_sim.mp4" type="video/mp4">
      </video>
    </div>
  </div>
</div>

## Key stats

| Item | Value |
|---|---|
| `n_traj` | 92 × 2 (paired real + numerical) |
| `n_frame` | 3990 |
| \(\Delta t\) | \(2.5\times 10^{-3}\) s |
| Resolution (real) | 128×256 |
| Resolution (sim) | 64×128 |
| Modalities (real) | \(u,v\) |
| Modalities (sim) | \(u,v,p\) |
| Memory | 190.50 GB |

!!! note
    We use `n_traj = X × 2` to indicate paired trajectories: **X real-world** and **X numerical** trajectories for the same scenario.

## Physical parameters

- **Reynolds number**: 1800–12000
- **Geometry**: cylinder diameter \(D=30\) mm
- **Sampling**: 400 Hz for 20 s; after preprocessing the sequence length is `n_frame = 3990`

## HF Datasets format

This scenario is distributed as **Hugging Face Datasets (Arrow)** under `cylinder/hf_dataset/`.

### Splits

- `real_{train|val|test}`
- `numerical_{train|val|test}`

### Schema (high level)

- `sim_id` (string): trajectory identifier
- `time_id` (int): window start index
- `u` (bytes), `v` (bytes): float32 arrays encoded as bytes
- `p` (bytes; numerical only): pressure channel
- `shape_t`, `shape_h`, `shape_w` (int): shape metadata for decoding

## Eval splits & subsets

We provide two layers of splitting:

- **Dataset split (`train/val/test`)**: the standard split in `hf_dataset/*_{train|val|test}`.
- **Eval subset (`test_mode`)**: an optional filter inside `val/test` to select trajectories by parameter regime.

The subset membership is defined by JSON mapping files (downloaded as "metadata"):

- `cylinder/in_dist_test_params_real.json`
- `cylinder/out_dist_test_params_real.json`
- `cylinder/remain_params_real.json`
- `cylinder/in_dist_test_params_numerical.json`
- `cylinder/out_dist_test_params_numerical.json`
- `cylinder/remain_params_numerical.json`

How to interpret these files and `test_mode`:

- **`in_dist`**: in-distribution parameter settings (held out for evaluation).
- **`out_dist`**: out-of-distribution / boundary parameter settings (OOD generalization).
- **`seen`**: parameter settings used for training (defined by `remain_params_*`).
- **`unseen`**: parameter settings not used for training (union of `in_dist` + `out_dist`).

## Download

See [Getting Started](../getting-started.md) for full setup. Quick commands:

```bash
# Evaluation metadata (small; includes the JSON mapping files)
realpdebench download --dataset-root <DATASET_ROOT> --scenario cylinder --what metadata

# HF dataset shards (large)
realpdebench download --dataset-root <DATASET_ROOT> --scenario cylinder --what hf_dataset
```



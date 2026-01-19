# FSI (Fluid–Structure Interaction)

Vortex-induced vibration in a **tandem-cylinder** setup: flow fields measured with time-resolved PIV and paired with matched numerical simulations.

## Visualizations

<div class="rp-dataset-videos">
  <div class="rp-dataset-video-grid">
    <div class="rp-dataset-video-card">
      <div class="rp-dataset-video-title">Real-world</div>
      <video autoplay loop muted playsinline preload="metadata">
        <source src="../../assets/videos/fsi/fsi_real.mp4" type="video/mp4">
      </video>
    </div>
    <div class="rp-dataset-video-card">
      <div class="rp-dataset-video-title">Simulated</div>
      <video autoplay loop muted playsinline preload="metadata">
        <source src="../../assets/videos/fsi/fsi_sim.mp4" type="video/mp4">
      </video>
    </div>
  </div>
</div>

## Key stats

| Item | Value |
|---|---|
| `n_traj` | 51 × 2 (paired real + numerical) |
| `n_frame` | 2173 |
| \(\Delta t\) | \(2.0\times 10^{-3}\) s |
| Resolution (real) | 128×128 |
| Resolution (sim) | 128×128 |
| Modalities (real) | \(u,v\) |
| Modalities (sim) | \(u,v,p\) |
| Memory | 94.73 GB |

!!! note
    We use `n_traj = X × 2` to indicate paired trajectories: **X real-world** and **X numerical** trajectories for the same scenario.

## Physical parameters

- **Reynolds numbers**: {3272, 3545, 3955, 4091, 4636, 5045, 5318, 6682, 9068}
- **Mass ratios**: {18.2, 20.8}
- **Damping ratio**: fixed at 0.8

## HF Datasets format

This scenario is distributed as **Hugging Face Datasets (Arrow)** under `fsi/hf_dataset/` using a **lazy-slicing** architecture.

### Data organization

- `real/` — Arrow dataset containing **complete** real-world trajectories
- `numerical/` — Arrow dataset containing **complete** numerical trajectories
- `{train|val|test}_index_{real|numerical}.json` — Index files defining splits

### Schema (high level)

Each Arrow row stores one **complete trajectory** (all 2173 frames):

- `sim_id` (string): trajectory identifier (e.g., `3272_18.2_0.8_1.h5`)
- `u`, `v` (bytes): float32 arrays of shape `(2173, H, W)` — complete time series
- `p` (bytes; numerical only): float32 array `(2173, H, W)`
- `shape_t` (int): complete trajectory length (2173)
- `shape_h`, `shape_w` (int): spatial dimensions

Train/val/test splits are defined by the index JSON files, which map sample indices to `(sim_id, time_id)` pairs.

## Eval splits & subsets

We provide two layers of splitting:

- **Dataset split (`train/val/test`)**: defined by `{split}_index_{type}.json` files.
- **Eval subset (`test_mode`)**: an optional filter inside `val/test` to select trajectories by parameter regime.

The subset membership is defined by JSON mapping files (downloaded as "metadata"):

- `fsi/in_dist_test_params_real.json`
- `fsi/out_dist_test_params_real.json`
- `fsi/remain_params_real.json`
- `fsi/in_dist_test_params_numerical.json`
- `fsi/out_dist_test_params_numerical.json`
- `fsi/remain_params_numerical.json`

How to interpret these files and `test_mode`:

- **`in_dist`**: in-distribution parameter settings (held out for evaluation).
- **`out_dist`**: out-of-distribution / boundary parameter settings (OOD generalization).
- **`seen`**: parameter settings used for training (defined by `remain_params_*`).
- **`unseen`**: parameter settings not used for training (union of `in_dist` + `out_dist`).

## Download

See [Getting Started](../getting-started.md) for full setup. Quick commands:

```bash
# Evaluation metadata (small; includes the JSON mapping files)
realpdebench download --dataset-root <DATASET_ROOT> --scenario fsi --what metadata

# HF dataset shards (large)
realpdebench download --dataset-root <DATASET_ROOT> --scenario fsi --what hf_dataset
```



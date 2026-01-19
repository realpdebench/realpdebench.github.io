# Combustion

Swirl-stabilized **NH\(_3\)/CH\(_4\)/air** flames: real-world OH* chemiluminescence intensity \(I\) paired with multi-modal numerical simulations.

## Visualizations

<div class="rp-dataset-videos">
  <div class="rp-dataset-video-grid">
    <div class="rp-dataset-video-card">
      <div class="rp-dataset-video-title">Real-world</div>
      <video autoplay loop muted playsinline preload="metadata">
        <source src="../../assets/videos/combusion/combusion_real.mp4" type="video/mp4">
      </video>
    </div>
    <div class="rp-dataset-video-card">
      <div class="rp-dataset-video-title">Simulated</div>
      <video autoplay loop muted playsinline preload="metadata">
        <source src="../../assets/videos/combusion/combusion_sim.mp4" type="video/mp4">
      </video>
    </div>
  </div>
</div>

## Key stats

| Item | Value |
|---|---|
| `n_traj` | 30 × 2 (paired real + numerical) |
| `n_frame` | 2001 |
| \(\Delta t\) | \(2.5\times 10^{-4}\) s |
| Resolution (real) | 128×128 |
| Resolution (sim) | 128×128 |
| Modalities (real) | \(I\) |
| Modalities (sim) | 15-channel multi-modal tensor (see below) |
| Memory | 110.12 GB |

!!! note
    We use `n_traj = X × 2` to indicate paired trajectories: **X real-world** and **X numerical** trajectories for the same scenario.

## Physical parameters

- **Sampling**: 4000 Hz for 1 s (`n_frame = 2001`)
- **Fuel composition**: CH\(_4\) ratios {100%, 80%, 60%, 40%, 20%} (NH\(_3\) ratios {0%, 20%, 40%, 60%, 80%})
- **Equivalence ratios**: {0.75, 0.85, 0.9, 1.0, 1.05, 1.1, 1.2, 1.25, 1.3}

## Modalities

- **Real-world observed**: intensity \(I\) (OH* chemiluminescence)
- **Numerical unobserved channels (15 total)**:
  - absolute pressure
  - chemistry heat release rate
  - mole fractions: CH\(_4\), CO, CO\(_2\), H\(_2\)O, NH\(_2\), NH\(_3\), OH
  - temperature
  - \(u, v, w, p\)
  - velocity magnitude

## HF Datasets format

This scenario is distributed as **Hugging Face Datasets (Arrow)** under `combustion/hf_dataset/` using a **lazy-slicing** architecture.

### Data organization

- `real/` — Arrow dataset containing **complete** real-world trajectories
- `numerical/` — Arrow dataset containing **complete** numerical trajectories
- `{train|val|test}_index_{real|numerical}.json` — Index files defining splits
- (optional) `surrogate_train/` (download with `--include-surrogate-train`)

### Schema (high level)

Each Arrow row stores one **complete trajectory** (all 2001 frames):

- `sim_id` (string): trajectory identifier (e.g., `40NH3_1.1.h5`)
- `observed` (bytes): float32 array `(2001, H, W)` — real-world intensity \(I\) or surrogate
- `numerical` (bytes; numerical only): float32 array `(2001, H, W, 15)` — multi-channel tensor
- `numerical_channels` (int; numerical only): number of channels (15)
- `shape_t` (int): complete trajectory length (2001)
- `shape_h`, `shape_w` (int): spatial dimensions

Train/val/test splits are defined by the index JSON files, which map sample indices to `(sim_id, time_id)` pairs.

## Eval splits & subsets

We provide two layers of splitting:

- **Dataset split (`train/val/test`)**: defined by `{split}_index_{type}.json` files.
- **Eval subset (`test_mode`)**: an optional filter inside `val/test` to select trajectories by parameter regime.

The subset membership is defined by JSON mapping files (downloaded as "metadata"):

- `combustion/in_dist_test_params_real.json`
- `combustion/out_dist_test_params_real.json`
- `combustion/remain_params_real.json`
- `combustion/in_dist_test_params_numerical.json`
- `combustion/out_dist_test_params_numerical.json`
- `combustion/remain_params_numerical.json`

How to interpret these files and `test_mode`:

- **`in_dist`**: in-distribution parameter settings (held out for evaluation).
- **`out_dist`**: out-of-distribution / boundary parameter settings (OOD generalization).
- **`seen`**: parameter settings used for training (defined by `remain_params_*`).
- **`unseen`**: parameter settings not used for training (union of `in_dist` + `out_dist`).

## Download

See [Getting Started](../getting-started.md) for full setup. Quick commands:

```bash
# Evaluation metadata (small; includes the JSON mapping files)
realpdebench download --dataset-root <DATASET_ROOT> --scenario combustion --what metadata

# HF dataset shards (large)
realpdebench download --dataset-root <DATASET_ROOT> --scenario combustion --what hf_dataset
```



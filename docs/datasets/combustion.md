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

This scenario is distributed as **Hugging Face Datasets (Arrow)** under `combustion/hf_dataset/`.

### Splits

- `real_{train|val|test}`
- `numerical_{train|val|test}`
- (optional) `surrogate_train` (download with `--include-surrogate-train`)

### Schema (high level)

- `sim_id` (string): trajectory identifier
- `time_id` (int): window start index
- `observed` (bytes): float32 array encoded as bytes (real-world \(I\) or surrogate \(I\))
- `numerical` (bytes; numerical only): float32 multi-channel tensor encoded as bytes
- `numerical_channels` (int; numerical only): channel count for decoding
- `shape_t`, `shape_h`, `shape_w` (int): shape metadata for decoding

## Eval splits & subsets

We provide two layers of splitting:

- **Dataset split (`train/val/test`)**: the standard split in `hf_dataset/*_{train|val|test}`.
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



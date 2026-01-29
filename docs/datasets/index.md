# Datasets

RealPDEBench contains **5 scenarios** with **paired real-world measurements** and **matched numerical simulations**. Each scenario provides two branches:

- **Real-world (`real`)**: experimentally measured fields (often incomplete)
- **Simulated (`numerical`)**: CFD/LES fields (often includes **unmeasured modalities**, e.g. pressure)

## What "paired" means in RealPDEBench

A scenario provides two branches:

- **`real/`**: experimentally measured fields (may be incomplete)
- **`numerical/`**: simulation fields (can include additional, unmeasured modalities)

"Paired" means that the real and numerical trajectories correspond to the **same configuration** (e.g., Reynolds number, control frequency, mixture ratio), enabling sim→real transfer and modality-mismatch evaluation. Note that paired trajectories are matched by configuration, but their **initial frames are not necessarily aligned**.

## Dataset inventory

The table below summarizes dataset sizes, temporal resolution, spatial resolution, and observed modalities.

<div class="rp-table-scroll">
<table class="rp-table">
  <thead>
    <tr>
      <th>Dataset</th>
      <th><code>n_traj</code></th>
      <th><code>n_frame</code></th>
      <th>\(\Delta t\) (s)</th>
      <th>Resolution (sim)</th>
      <th>Resolution (real)</th>
      <th>Memory (GB)</th>
      <th>Modalities (sim)</th>
      <th>Modalities (real)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="cylinder/">Cylinder</a></td>
      <td>92 × 2</td>
      <td>3990</td>
      <td>\(2.5\times 10^{-3}\)</td>
      <td>64×128</td>
      <td>128×256</td>
      <td>190.50</td>
      <td>\(u,v,p\)</td>
      <td>\(u,v\)</td>
    </tr>
    <tr>
      <td><a href="controlled-cylinder/">Controlled Cylinder</a></td>
      <td>96 × 2</td>
      <td>3990</td>
      <td>\(2.5\times 10^{-3}\)</td>
      <td>64×128</td>
      <td>128×256</td>
      <td>187.08</td>
      <td>\(u,v,p\)</td>
      <td>\(u,v\)</td>
    </tr>
    <tr>
      <td><a href="fsi/">FSI</a></td>
      <td>51 × 2</td>
      <td>2173</td>
      <td>\(2.0\times 10^{-3}\)</td>
      <td>128×128</td>
      <td>128×128</td>
      <td>94.73</td>
      <td>\(u,v,p\)</td>
      <td>\(u,v\)</td>
    </tr>
    <tr>
      <td><a href="foil/">Foil</a></td>
      <td>99 × 2</td>
      <td>3990</td>
      <td>\(2.5\times 10^{-3}\)</td>
      <td>128×256</td>
      <td>128×256</td>
      <td>335.64</td>
      <td>\(u,v,p\)</td>
      <td>\(u,v\)</td>
    </tr>
    <tr>
      <td><a href="combustion/">Combustion</a></td>
      <td>30 × 2</td>
      <td>2001</td>
      <td>\(2.5\times 10^{-4}\)</td>
      <td>128×128</td>
      <td>128×128</td>
      <td>110.12</td>
      <td>multi-modal (15 channels)</td>
      <td>\(I\)</td>
    </tr>
  </tbody>
</table>
</div>

!!! note
    We use `n_traj = X × 2` to indicate **paired** trajectories: **X real-world** and **X numerical** trajectories for the same scenario.

## Windowing: `sim_id` + `time_id`

RealPDEBench evaluates forecasting on short spatiotemporal windows sampled from long trajectories:

- **Trajectory ID (`sim_id`)**: trajectory identifier string (e.g., `1800`, `1781_0.5`, `40NH3_1.1`)
- **Window start (`time_id`)**: integer time index
- **One sample**: a contiguous window `data[time_id : time_id + T]`, where \(T\) is the window length (`in_step` + `out_step`)

## Public distribution format (Hugging Face snapshot)

We distribute data as **Hugging Face Datasets (Arrow)** shards using a **lazy-slicing** architecture. Each trajectory is stored **complete** (all frames), and train/val/test splits are defined by separate **index files**. On disk, a downloaded snapshot is organized as:

```text
{dataset_root}/
  {scenario}/
    hf_dataset/
      real/                           # Arrow: complete trajectories
        data-*.arrow
        dataset_info.json
        state.json
      numerical/                      # Arrow: complete trajectories
        data-*.arrow
        dataset_info.json
        state.json
      train_index_real.json           # Index: [{"sim_id": "xxx.h5", "time_id": 0}, ...]
      val_index_real.json
      test_index_real.json
      train_index_numerical.json
      val_index_numerical.json
      test_index_numerical.json
    in_dist_test_params_real.json
    out_dist_test_params_real.json
    remain_params_real.json
    in_dist_test_params_numerical.json
    out_dist_test_params_numerical.json
    remain_params_numerical.json
```

The `*_index_*.json` files define which `(sim_id, time_id)` pairs belong to each split. The `*_test_params_*.json` files are used for `test_mode` filtering ("in_dist/out_dist/seen/unseen") during validation/testing.

## Evaluation subsets (JSON mappings)

The `*_test_params_*.json` files define evaluation subsets used by `test_mode` filters:

- **`in_dist`**: in-distribution parameter settings
- **`out_dist`**: out-of-distribution parameter settings
- **`seen`**: settings used for training (held-out time windows)
- **`unseen`**: settings not used for training

### HF Arrow schema (high level)

Each Arrow row stores one **complete trajectory** (all frames). Splits are defined externally by the `*_index_*.json` files.

- **Fluid scenarios (Cylinder / Controlled Cylinder / FSI / Foil)**
  - `sim_id` (string): trajectory identifier (e.g., `10031.h5`)
  - `u`, `v` (bytes): float32 arrays of shape `(T_full, H, W)` — **complete time series**
  - `p` (bytes): float32 array `(T_full, H, W)` *(numerical only)*
  - `vo` (bytes): float32 array `(T_full, H, W)` — vorticity
  - `x` (bytes): float32 array `(H, W)` — spatial x-coordinate grid *(time-invariant)*
  - `y` (bytes): float32 array `(H, W)` — spatial y-coordinate grid *(time-invariant)*
  - `t` (bytes): float32 array `(T_full,)` — time stamps
  - `shape_t` (int): **complete trajectory length** (e.g., 3990, 2173)
  - `shape_h`, `shape_w` (int): spatial dimensions

- **Combustion**
  - `sim_id` (string): trajectory identifier (e.g., `40NH3_1.1.h5`)
  - `observed` (bytes): float32 array `(T_full, H, W)` — real-world intensity \(I\) (real) or surrogate (numerical)
  - `numerical` (bytes): float32 array `(T_full, H, W, 15)` *(numerical only)*
  - `numerical_channels` (int): number of channels (15) *(numerical only)*
  - `x` (bytes): float32 array `(H, W)` — spatial x-coordinate grid *(time-invariant)*
  - `y` (bytes): float32 array `(H, W)` — spatial y-coordinate grid *(time-invariant)*
  - `t` (bytes): float32 array `(T_full,)` — time stamps
  - `shape_t` (int): **complete trajectory length** (e.g., 2001)
  - `shape_h`, `shape_w` (int): spatial dimensions

### Index file format

The `{split}_index_{type}.json` files map sample indices to trajectory positions:

```json
[
  {"sim_id": "10031.h5", "time_id": 0},
  {"sim_id": "10031.h5", "time_id": 20},
  {"sim_id": "10031.h5", "time_id": 40},
  ...
]
```

At runtime, the loader uses these indices to slice windows from the complete trajectories, enabling dynamic `N_autoregressive` support.



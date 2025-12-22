# Combustion Dataset

3D swirl-stabilized NH₃/CH₄/air flames with multi-species chemistry.

## Overview

The **Combustion dataset** captures **turbulent reactive flow** in 3D swirl-stabilized burners with ammonia/methane co-firing, representing the most complex multi-physics system in RealPDEBench.

## Physical Parameters

| Parameter | Range | Description |
|-----------|-------|-------------|
| **CH₄ Ratio** | 20% - 100% | Methane fraction in fuel blend |
| **Equivalence Ratio (φ)** | 0.75 - 1.3 | Fuel-to-air ratio (1.0 = stoichiometric) |
| **Thermal Power** | Variable | Heat release rate |
| **Swirl Number (S)** | 0.6 - 1.2 | Tangential-to-axial velocity ratio |
| **Reynolds Number** | ~10,000 | Turbulent regime |

## Data Collection

### Real-World (OH* Chemiluminescence)

- **Method:** High-speed OH* imaging (4000 fps)
- **Duration:** 1 second per trajectory
- **Species:** OH radical emission (excited state)
- **Frames:** 4000 images per run
- **Camera:** Intensified high-speed CMOS
- **Measured:** Intensity field I (heat release marker)

### Simulation (3D LES + Chemistry)

- **Solver:** STAR-CCM+ Large Eddy Simulation
- **Chemistry:** Eddy Dissipation Concept (EDC)
- **Mechanism:** Detailed NH₃/CH₄ kinetics
  - **38 species**
  - **184 reactions**
- **Turbulence:** Smagorinsky SGS model
- **Output:** T, ρ, Y_i (temperature, density, 38 species mass fractions)

## Dataset Statistics

- **Trajectories:** 80+
- **Chemical Species:** 38
- **FPS (Real Data):** 4000

## Physical Phenomena

### Flame Dynamics

1. **Swirl Stabilization:** Vortex breakdown creates recirculation zone
2. **Flame Anchoring:** Hot products recirculate to ignite fresh mixture
3. **Turbulent Wrinkling:** Flame surface area amplification
4. **Extinction-Reignition:** Local flame quenching events
5. **Thermoacoustic Oscillations:** Pressure-heat release coupling

### Multi-Scale Physics

- **Kolmogorov Scale:** ~100 μm (turbulence)
- **Flame Thickness:** ~1 mm (reaction zone)
- **Integral Length:** ~10 mm (large eddies)
- **Domain Size:** ~100 mm (burner scale)

### NH₃/CH₄ Co-firing

Ammonia reduces carbon emissions but introduces challenges:

- **Slower burning velocity**
- **Higher NOx emissions**
- **Flame instabilities**
- **Narrow flammability limits**

## Governing Equations

**Reactive Navier-Stokes:**

$$
\frac{\partial \rho \mathbf{u}}{\partial t} + \nabla \cdot (\rho \mathbf{u} \mathbf{u}) = -\nabla p + \nabla \cdot \boldsymbol{\tau} + \rho \mathbf{g}
$$

**Species Transport (for each i = 1...38):**

$$
\frac{\partial \rho Y_i}{\partial t} + \nabla \cdot (\rho \mathbf{u} Y_i) = \nabla \cdot (\rho D_i \nabla Y_i) + \dot{\omega}_i
$$

**Energy Equation:**

$$
\frac{\partial \rho h}{\partial t} + \nabla \cdot (\rho \mathbf{u} h) = \nabla \cdot (k \nabla T) + \sum_i \dot{\omega}_i h_i
$$

Where $\dot{\omega}_i$ are chemical reaction rates (184 reactions!).

## Chemical Mechanism

Simplified NH₃/CH₄ reaction pathways:

```
CH₄ + 2O₂ → CO₂ + 2H₂O        (complete combustion)
NH₃ + O₂ → NO + H₂O + N₂       (ammonia oxidation)
NO + CO → N₂ + CO₂              (NO reduction)
```

Full mechanism includes intermediates: H, O, OH, HO₂, H₂O₂, CO, HCN, N₂O, etc.

## Benchmark Tasks

1. **Flame Prediction:** Forecast flame dynamics from initial conditions
2. **Unmeasured Modality:** Predict temperature/species from OH* intensity
3. **Surrogate Modeling:** Map simulation species to real measurements
4. **Emissions Prediction:** Infer NOx/CO from flow conditions

## Challenges

This dataset is the **most difficult** in RealPDEBench:

- **Lowest R² values** among all datasets
- **Complex multi-physics:** Turbulence + chemistry + heat transfer
- **High dimensionality:** 38 species in simulation
- **Measurement mismatch:** OH* (real) vs. full species (sim)

## Data Loading Example

```python
import h5py

with h5py.File('combustion_dataset.h5', 'r') as f:
    # Real-world OH* chemiluminescence
    real_intensity = f['real_data/trajectory_001/OH_star'][:]  # (T, X, Y)

    # Simulated fields (many modalities)
    sim_T = f['sim_data/trajectory_001/temperature'][:]
    sim_rho = f['sim_data/trajectory_001/density'][:]
    sim_OH = f['sim_data/trajectory_001/species/OH'][:]
    sim_NO = f['sim_data/trajectory_001/species/NO'][:]
    # ... 36 more species

    # Parameters
    phi = f['real_data/trajectory_001/metadata'].attrs['equivalence_ratio']
    CH4_ratio = f['real_data/trajectory_001/metadata'].attrs['methane_ratio']
```

## Download

- [Download Combustion Dataset (XX GB)](#)
- [Sample Data](#)

## References

- Kobayashi, H., et al. (2019). Science and technology of ammonia combustion. *Proceedings of the Combustion Institute*.
- Valera-Medina, A., et al. (2018). Ammonia for power. *Progress in Energy and Combustion Science*.
- Poinsot, T., & Veynante, D. (2005). *Theoretical and Numerical Combustion*. RT Edwards, Inc.

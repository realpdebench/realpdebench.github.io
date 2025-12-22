# Cylinder Dataset

Wake dynamics behind a circular cylinder at high Reynolds numbers.

## Overview

The **Cylinder dataset** captures the classical von Kármán vortex street phenomenon behind a stationary circular cylinder in cross-flow.

## Physical Parameters

| Parameter | Range | Description |
|-----------|-------|-------------|
| **Reynolds Number (Re)** | 1800 - 12000 | Flow regime from transitional to turbulent |
| **Cylinder Diameter (D)** | 10 mm | Fixed geometry |
| **Flow Velocity (U∞)** | Variable | Adjusted to achieve target Re |
| **Domain Size** | 20D × 15D | Computational/experimental domain |

## Data Collection

### Real-World (PIV)

- **Method:** Particle Image Velocimetry in circulating water tunnel
- **Frame Rate:** 400-500 fps
- **Duration:** 20 seconds per trajectory
- **Particles:** 10μm hollow-glass microspheres
- **Camera:** High-speed imaging system
- **Measured Fields:** u, v (velocity components)

### Simulation (CFD)

- **Solver:** Lilypad (Finite Volume + Immersed Boundary Method)
- **Grid Resolution:** Adaptive mesh refinement
- **Time Step:** Dynamic adaptive stepping
- **Output Fields:** u, v, p (velocity + pressure)
- **Boundary Conditions:** Uniform inflow, periodic lateral, convective outflow

## Dataset Statistics

- **Trajectories:** 250+
- **Frames per Trajectory:** 2000+
- **Spatial Resolution:** 128×128

## Physical Phenomena

### Von Kármán Vortex Street

The wake behind the cylinder exhibits alternating vortex shedding:

- **Shedding Frequency:** Scales with Strouhal number (St ≈ 0.2)
- **Vorticity Patterns:** Alternating positive/negative vortices
- **Wake Structure:** Asymmetric, time-periodic
- **Transition:** From laminar to turbulent with increasing Re

### Key Features

1. **Vortex Formation:** Near-wake recirculation zone
2. **Shedding Mechanism:** Kelvin-Helmholtz instability
3. **Far-Wake:** Vortex street propagation and decay
4. **Boundary Layer:** Separation points on cylinder surface

## Governing Equations

2D incompressible Navier-Stokes equations:

$$
\frac{\partial \mathbf{u}}{\partial t} + (\mathbf{u} \cdot \nabla)\mathbf{u} = -\frac{1}{\rho}\nabla p + \nu \nabla^2 \mathbf{u}
$$

$$
\nabla \cdot \mathbf{u} = 0
$$

Where:
- $\mathbf{u} = (u, v)$ - velocity field
- $p$ - pressure
- $\rho$ - density
- $\nu$ - kinematic viscosity

## Data Loading Example

```python
import h5py
import numpy as np

# Load HDF5 file
with h5py.File('cylinder_dataset.h5', 'r') as f:
    # Real-world data
    real_u = f['real_data/trajectory_001/u'][:]  # Shape: (T, X, Y)
    real_v = f['real_data/trajectory_001/v'][:]

    # Simulated data
    sim_u = f['sim_data/trajectory_001/u'][:]
    sim_v = f['sim_data/trajectory_001/v'][:]
    sim_p = f['sim_data/trajectory_001/p'][:]

    # Metadata
    metadata = dict(f['real_data/trajectory_001/metadata'].attrs)
    print(f"Reynolds Number: {metadata['reynolds_number']}")
```

## Benchmark Tasks

1. **Velocity Field Prediction:** Given initial conditions, predict future states
2. **Sim-to-Real Transfer:** Train on simulated data, test on real measurements
3. **Parameter Estimation:** Infer Reynolds number from flow patterns
4. **Missing Modality:** Predict pressure from velocity measurements

## Download

- [Download Cylinder Dataset (XX GB)](#)
- [Sample Data](#)

## References

- Williamson, C. H. K. (1996). Vortex dynamics in the cylinder wake. *Annual Review of Fluid Mechanics*.
- Roshko, A. (1954). On the development of turbulent wakes from vortex streets. *NACA Report*.

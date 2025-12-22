# Foil Dataset

3D cross-sectional flow around NACA0025 airfoil.

## Overview

The **Foil dataset** captures flow around a **NACA0025 symmetric airfoil** at various angles of attack, representing 3D flow physics in a cross-sectional plane.

## Physical Parameters

| Parameter | Range | Description |
|-----------|-------|-------------|
| **Angle of Attack (α)** | 0° - 20° | Airfoil inclination |
| **Reynolds Number (Re)** | 2968 - 17031 | Based on chord length |
| **Chord Length (c)** | 50 mm | Airfoil chord |
| **Aspect Ratio (AR)** | Finite span | 3D effects present |
| **Flow Velocity (U∞)** | Variable | Free-stream velocity |

## Data Collection

### Real-World (PIV)

- **Method:** Planar PIV at mid-span cross-section
- **Frame Rate:** 400-500 fps
- **Plane:** 2D slice through 3D flow
- **Measured Fields:** u, v (in-plane velocity)
- **3D Effects:** Tip vortices, spanwise flow captured indirectly

### Simulation (3D CFD)

- **Solver:** Waterlily (GPU-accelerated 3D solver)
- **Domain:** Full 3D with airfoil geometry
- **Extraction:** Mid-span cross-section for comparison
- **Output Fields:** u, v, w, p (full 3D + pressure)
- **Resolution:** High near airfoil surface

## Dataset Statistics

- **Trajectories:** 100+
- **Angles of Attack:** 21
- **Flow Dimension:** 3D

## Physical Phenomena

### Flow Regimes

**Low α (0° - 5°):**
- Attached flow
- Thin boundary layer
- Minimal separation

**Medium α (5° - 12°):**
- Leading-edge vortex formation
- Partial separation
- Transition to turbulence

**High α (12° - 20°):**
- Massive separation
- Dynamic stall
- Wake instabilities

### Aerodynamic Forces

Lift and drag vary nonlinearly with angle of attack:

- **Lift:** Increases then plateaus/drops (stall)
- **Drag:** Quadratic increase with α
- **Stall Angle:** ~12-15° for NACA0025

## Governing Equations

3D incompressible Navier-Stokes:

$$
\frac{\partial \mathbf{u}}{\partial t} + (\mathbf{u} \cdot \nabla)\mathbf{u} = -\frac{1}{\rho}\nabla p + \nu \nabla^2 \mathbf{u}
$$

$$
\nabla \cdot \mathbf{u} = 0
$$

Where $\mathbf{u} = (u, v, w)$ in 3D.

## Benchmark Tasks

1. **Stall Prediction:** Detect onset of flow separation
2. **Force Estimation:** Infer lift/drag from flow fields
3. **3D Effects Modeling:** Account for spanwise variations
4. **Angle Classification:** Identify α from flow patterns

## Data Loading Example

```python
import h5py
import numpy as np

with h5py.File('foil_dataset.h5', 'r') as f:
    # Real-world 2D cross-section
    real_u = f['real_data/trajectory_001/u'][:]  # (T, X, Y)
    real_v = f['real_data/trajectory_001/v'][:]

    # Simulated 3D (mid-span slice)
    sim_u = f['sim_data/trajectory_001/u'][:]
    sim_v = f['sim_data/trajectory_001/v'][:]
    sim_w = f['sim_data/trajectory_001/w'][:]  # Spanwise velocity
    sim_p = f['sim_data/trajectory_001/p'][:]

    # Parameters
    alpha = f['real_data/trajectory_001/metadata'].attrs['angle_of_attack']
    Re = f['real_data/trajectory_001/metadata'].attrs['reynolds_number']

    print(f"Angle of Attack: {alpha}°, Re: {Re}")
```

## NACA0025 Profile

The NACA 4-digit series airfoil with maximum thickness at 25% chord:

```
Thickness = 0.25 × chord
Symmetric (zero camber)
Smooth leading edge
Sharp trailing edge
```

## Download

- [Download Foil Dataset (XX GB)](#)
- [Sample Data](#)

## References

- Abbott, I. H., & Von Doenhoff, A. E. (1959). *Theory of Wing Sections*. Dover Publications.
- McCroskey, W. J. (1982). Unsteady airfoils. *Annual Review of Fluid Mechanics*.

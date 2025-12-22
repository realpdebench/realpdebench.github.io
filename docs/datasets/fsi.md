# FSI (Fluid-Structure Interaction) Dataset

Coupled dynamics of cylinder vibration induced by fluid forces.

## Overview

The **FSI dataset** captures **vortex-induced vibration (VIV)** where the cylinder is free to vibrate in the transverse direction, creating a two-way coupled fluid-structure system.

## Physical Parameters

| Parameter | Range | Description |
|-----------|-------|-------------|
| **Reynolds Number (Re)** | 3272 - 9068 | Flow conditions |
| **Mass Ratio (m*)** | 18.2 - 20.8 | Cylinder mass / displaced fluid mass |
| **Damping Ratio (ζ)** | 0.01 - 0.05 | Structural damping coefficient |
| **Natural Frequency (f_n)** | Variable | Structure's natural frequency |
| **Reduced Velocity (U*)** | 3 - 12 | U∞ / (f_n × D) |

## Data Collection

### Real-World (PIV + Motion Tracking)

- **Flow Method:** Particle Image Velocimetry
- **Structure Tracking:** High-speed motion capture (cylinder position)
- **Frame Rate:** 400-500 fps synchronized
- **DOF:** 1 (transverse vibration only)
- **Measured:** u, v (flow) + y_c, ẏ_c (structure)

### Simulation (FSI CFD)

- **Solver:** Coupled Lilypad + structural solver
- **Coupling:** Two-way partitioned scheme
- **Structure Model:** Spring-mass-damper (1-DOF)
- **Fluid Forces:** Integrated on cylinder surface
- **Output:** u, v, p (fluid) + y_c, ẏ_c, F_y (structure)

## Dataset Statistics

- **Trajectories:** 120+
- **Coupling Type:** 2-way
- **Flow Resolution:** 128×128

## Physical Phenomena

### Vortex-Induced Vibration Regimes

1. **Initial Branch:** Small amplitude oscillations
2. **Upper Branch:** Maximum amplitude (lock-in)
3. **Lower Branch:** Reduced amplitude
4. **Desynchronization:** Irregular motion

### Key Features

- **Lock-in Region:** Synchronization of shedding and vibration
- **Hysteresis:** Different response for increasing/decreasing velocity
- **Figure-8 Trajectory:** Complex cylinder motion patterns
- **Energy Transfer:** Fluid → structure coupling

## Governing Equations

**Fluid (Navier-Stokes):**

$$
\frac{\partial \mathbf{u}}{\partial t} + (\mathbf{u} \cdot \nabla)\mathbf{u} = -\frac{1}{\rho_f}\nabla p + \nu \nabla^2 \mathbf{u}
$$

**Structure (1-DOF oscillator):**

$$
m^* \ddot{y}_c + 2\zeta \omega_n \dot{y}_c + \omega_n^2 y_c = \frac{F_y}{\rho_f D^2 U_\infty^2}
$$

Where $F_y$ is the transverse fluid force.

## Benchmark Tasks

1. **Coupled Prediction:** Forecast coupled fluid-structure dynamics
2. **Amplitude Prediction:** Predict VIV amplitude from parameters
3. **Regime Classification:** Identify VIV branch from flow data
4. **Force Estimation:** Infer fluid forces from cylinder motion

## Data Loading Example

```python
import h5py

with h5py.File('fsi_dataset.h5', 'r') as f:
    # Flow fields
    u = f['real_data/trajectory_001/u'][:]
    v = f['real_data/trajectory_001/v'][:]

    # Structure motion
    y_c = f['real_data/trajectory_001/cylinder_position'][:]
    v_c = f['real_data/trajectory_001/cylinder_velocity'][:]

    # Parameters
    Re = f['real_data/trajectory_001/metadata'].attrs['reynolds_number']
    m_star = f['real_data/trajectory_001/metadata'].attrs['mass_ratio']
```

## Download

- [Download FSI Dataset (XX GB)](#)
- [Sample Data](#)

## References

- Williamson, C. H. K., & Govardhan, R. (2004). Vortex-induced vibrations. *Annual Review of Fluid Mechanics*.
- Sarpkaya, T. (2004). A critical review of the intrinsic nature of vortex-induced vibrations. *Journal of Fluids and Structures*.

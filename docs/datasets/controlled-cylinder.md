# Controlled Cylinder Dataset

Active flow control with forced cylinder vibration.

## Overview

The **Controlled Cylinder dataset** extends the cylinder wake problem by introducing **active control** through forced transverse vibration of the cylinder. This enables study of flow control strategies and closed-loop dynamics.

## Physical Parameters

| Parameter | Range | Description |
|-----------|-------|-------------|
| **Reynolds Number (Re)** | 1781 - 9843 | Flow regime variation |
| **Control Frequency (f)** | 0.5 - 1.4 Hz | Cylinder vibration frequency |
| **Amplitude (A)** | Variable | Transverse displacement amplitude |
| **Cylinder Diameter (D)** | 10 mm | Fixed geometry |
| **Phase (φ)** | 0° - 360° | Control phase relative to shedding |

## Data Collection

### Real-World (PIV)

- **Method:** Particle Image Velocimetry with actuated cylinder
- **Frame Rate:** 400-500 fps
- **Duration:** 20 seconds per trajectory
- **Actuation:** Motorized linear stage for cylinder vibration
- **Measured Fields:** u, v (velocity components)

### Simulation (CFD)

- **Solver:** Lilypad with moving boundary conditions
- **Cylinder Motion:** Prescribed sinusoidal motion
- **Grid:** Adaptive mesh following cylinder motion
- **Output Fields:** u, v, p (velocity + pressure)
- **Coupling:** Fluid forces computed on moving cylinder

## Dataset Statistics

- **Trajectories:** 150+
- **Control Frequencies:** 6
- **Spatial Resolution:** 128×128

## Physical Phenomena

### Flow Control Mechanisms

1. **Lock-in:** Synchronization of vortex shedding with cylinder motion
2. **Drag Reduction:** Up to 30% reduction at optimal frequencies
3. **Wake Stabilization:** Suppression of vortex street
4. **Phase Dynamics:** Critical role of control phase

### Control Regimes

- **Sub-harmonic:** f < f_natural (frequency ratio < 1)
- **Resonant:** f ≈ f_natural (lock-in region)
- **Super-harmonic:** f > f_natural (frequency ratio > 1)

## Governing Equations

Modified Navier-Stokes with moving boundary:

$$
\frac{\partial \mathbf{u}}{\partial t} + (\mathbf{u} \cdot \nabla)\mathbf{u} = -\frac{1}{\rho}\nabla p + \nu \nabla^2 \mathbf{u}
$$

Cylinder motion:

$$
y_c(t) = A \sin(2\pi f t + \phi)
$$

Where $y_c$ is cylinder center position.

## Benchmark Tasks

1. **Control Prediction:** Predict optimal control parameters for drag reduction
2. **Closed-loop Learning:** Learn control policies from data
3. **Sim-to-Real Transfer:** Transfer control strategies from simulation
4. **Phase Estimation:** Infer optimal control phase from flow state

## Download

- [Download Controlled Cylinder Dataset (XX GB)](#)
- [Sample Data](#)

## References

- Choi, H., Jeon, W. P., & Kim, J. (2008). Control of flow over a bluff body. *Annual Review of Fluid Mechanics*.
- Fujisawa, N., & Takeda, G. (2003). Flow control around a circular cylinder by internal acoustic excitation. *Journal of Fluids and Structures*.

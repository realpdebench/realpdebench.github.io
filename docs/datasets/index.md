# Datasets Overview

RealPDEBench provides **5 comprehensive datasets** spanning fluid dynamics and combustion systems. Each dataset contains paired real-world measurements and CFD simulations.

## Dataset Summary

| Dataset | Domain | Re Range | Measured Fields | Simulated Fields | Trajectories |
|---------|--------|----------|-----------------|------------------|--------------|
| **Cylinder** | Fluid Dynamics | 1800-12000 | u, v (PIV) | u, v, p (CFD) | 250+ |
| **Controlled Cylinder** | Flow Control | 1781-9843 | u, v (PIV) | u, v, p (CFD) | 150+ |
| **FSI** | Fluid-Structure | 3272-9068 | u, v, y_c, ẏ_c | u, v, p, F_y | 120+ |
| **Foil** | Aerodynamics | 2968-17031 | u, v (2D slice) | u, v, w, p (3D) | 100+ |
| **Combustion** | Reactive Flow | ~10000 | OH* intensity | T, ρ, 38 species | 80+ |

**Total:** 700+ trajectories with 2000+ frames each.

## Data Collection Methods

### Real-World Measurements

All fluid dynamics datasets (Cylinder, Controlled Cylinder, FSI, Foil) use **Particle Image Velocimetry (PIV)**:

- **Technique:** Fluorescent particle tracking (10μm hollow-glass microspheres)
- **Frame Rate:** 400-500 fps
- **Duration:** 20 seconds per trajectory
- **Setup:** Circulating water tunnel with high-speed cameras

The Combustion dataset uses **OH* Chemiluminescence Imaging**:

- **Technique:** High-speed imaging of OH radical emission
- **Frame Rate:** 4000 fps
- **Duration:** 1 second per trajectory
- **Setup:** Swirl-stabilized burner with intensified CMOS camera

### Computational Simulations

**Fluid Dynamics (2D):**
- **Solver:** Lilypad (Finite Volume + Immersed Boundary Method)
- **Grid:** Adaptive mesh refinement
- **Output:** u, v, p fields

**Aerodynamics (3D):**
- **Solver:** Waterlily (GPU-accelerated)
- **Domain:** Full 3D simulation
- **Output:** u, v, w, p fields

**Combustion (3D LES):**
- **Solver:** STAR-CCM+ with LES turbulence model
- **Chemistry:** Eddy Dissipation Concept (EDC)
- **Mechanism:** 38 species, 184 reactions for NH₃/CH₄ co-firing
- **Output:** Temperature, density, species mass fractions

## Data Format

All datasets are provided in **HDF5 format** with the following structure:

```
dataset.h5
├── real_data/
│   ├── trajectory_001/
│   │   ├── u                    # Velocity component x (T, X, Y)
│   │   ├── v                    # Velocity component y (T, X, Y)
│   │   └── metadata             # Parameters (Re, geometry, etc.)
│   ├── trajectory_002/
│   └── ...
└── sim_data/
    ├── trajectory_001/
    │   ├── u                    # Velocity component x (T, X, Y)
    │   ├── v                    # Velocity component y (T, X, Y)
    │   ├── p                    # Pressure field (T, X, Y)
    │   └── metadata
    ├── trajectory_002/
    └── ...
```

**Array Dimensions:**
- `T` = Time steps (2000+ frames)
- `X, Y` = Spatial dimensions (typically 128×128 or 256×256)
- All arrays are NumPy-compatible

## Detailed Dataset Descriptions

### 1. Cylinder

Wake dynamics behind a stationary circular cylinder.

**Key Features:**
- Von Kármán vortex street
- Reynolds numbers from transitional to turbulent regime
- Classical fluid dynamics benchmark

**Use Cases:**
- Vortex shedding prediction
- Frequency analysis
- Wake structure learning

[View Cylinder Dataset Details →](cylinder.md)

---

### 2. Controlled Cylinder

Active flow control with forced cylinder vibration.

**Key Features:**
- Prescribed sinusoidal motion
- Control frequencies: 0.5-1.4 Hz
- Lock-in and drag reduction phenomena

**Use Cases:**
- Flow control optimization
- Closed-loop learning
- Control phase prediction

[View Controlled Cylinder Details →](controlled-cylinder.md)

---

### 3. FSI (Fluid-Structure Interaction)

Vortex-induced vibration with two-way coupling.

**Key Features:**
- Free cylinder oscillation
- Coupled fluid-structure dynamics
- Mass ratio and damping variations

**Use Cases:**
- Coupled system prediction
- VIV amplitude forecasting
- Force-motion relationship learning

[View FSI Dataset Details →](fsi.md)

---

### 4. Foil

NACA0025 symmetric airfoil at various angles of attack.

**Key Features:**
- 3D flow with 2D cross-sectional measurements
- Angles of attack: 0°-20°
- Stall and separation dynamics

**Use Cases:**
- Stall prediction
- Lift/drag estimation from flow fields
- 3D effects modeling

[View Foil Dataset Details →](foil.md)

---

### 5. Combustion

3D swirl-stabilized NH₃/CH₄/air flames.

**Key Features:**
- Multi-species reactive flow
- 38 chemical species, 184 reactions
- OH* chemiluminescence vs. full LES output

**Use Cases:**
- Flame dynamics prediction
- Emissions estimation
- Surrogate modeling (map sim species → real measurements)

**Note:** This is the most challenging dataset with the lowest R² values due to complex multi-physics coupling.

[View Combustion Dataset Details →](combustion.md)

---

## Sim-to-Real Gap

A key feature of RealPDEBench is the **explicit sim-to-real gap**:

### Sources of Discrepancy

1. **Numerical Errors:** Discretization, modeling assumptions in CFD
2. **Measurement Noise:** Camera sensors, particle tracking errors
3. **Unmeasured Modalities:** Pressure fields not measurable in PIV
4. **Boundary Conditions:** Idealized (sim) vs. imperfect (real) inflow
5. **3D Effects:** 2D simulations vs. 3D real flows

### Quantitative Gap

Training on real-world data achieves **9.39% to 78.91% improvement** in Relative L₂ Error compared to training on simulated data alone.

## Download Instructions

### Individual Datasets

Each dataset can be downloaded separately:

- [Cylinder Dataset (XX GB)](#)
- [Controlled Cylinder Dataset (XX GB)](#)
- [FSI Dataset (XX GB)](#)
- [Foil Dataset (XX GB)](#)
- [Combustion Dataset (XX GB)](#)

### Full Benchmark

Download the complete benchmark including all datasets, baseline model checkpoints, and evaluation scripts:

```bash
# Using wget
wget https://zenodo.org/record/XXXXX/realpdebench_full.tar.gz

# Or using Python API
pip install realpdebench
python -m realpdebench.download --all
```

### Sample Data

For quick experimentation, sample data (10% of each dataset) is available:

```bash
python -m realpdebench.download --sample
```

## Support

- **GitHub Issues:** [Report bugs or request features](https://github.com/realpdebench/realpdebench.github.io/issues)
- **Discussions:** [Ask questions](https://github.com/realpdebench/realpdebench.github.io/discussions)

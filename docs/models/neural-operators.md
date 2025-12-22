# Neural Operators

Neural operators aim to learn mappings between **function spaces** (e.g., input fields \(\to\) output fields), which makes them natural baselines for PDE-related tasks.

## Operator Learning Baselines

### FNO (Fourier Neural Operator)

Learns global interactions via Fourier-domain convolution.

### CNO (Convolutional Neural Operator)

Combines convolutional representations with operator-learning objectives.

### DeepONet (Deep Operator Network)

Represents operators using a **branch** network (inputs) and a **trunk** network (query points), combining them to predict outputs.

### MWT (Multi-Wavelet Transform)

Uses wavelet transforms to represent multi-scale interactions.

### GK-Transformer (Galerkin Transformer)

Applies transformer-style attention with Galerkin-inspired formulations for PDE operators.

### Transolver

Transformer-based solver model tailored for PDE dynamics.

### WDNO (Wavelet-Decomposed Neural Operator)

Wavelet-decomposed formulation to capture multi-resolution structure.

## Notes

- Within RealPDEBench, neural operators are evaluated consistently across datasets/metrics.



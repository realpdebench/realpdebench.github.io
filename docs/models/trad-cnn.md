# Trad & CNN

This page groups **traditional baselines** and **convolutional architectures** used in RealPDEBench.

## Traditional Baselines

### DMD (Dynamic Mode Decomposition)

**DMD** is a classical reduced-order modeling technique that approximates dynamics with a linear operator in a low-dimensional subspace.

- **Strengths**: fast, interpretable, strong when dynamics are approximately linear in a suitable basis
- **Limitations**: struggles with strongly nonlinear / multi-scale regimes

## CNN-based Models

### U-Net

**U-Net** is an encoder–decoder CNN with skip connections, widely used for dense prediction tasks and field-to-field mappings.

- **Strengths**: strong spatial inductive bias, efficient training/inference
- **Limitations**: can underperform when long-range/global interactions dominate unless augmented

## Notes

- This category is intended as a **stable reference point** against which neural operator and foundation models can be compared.



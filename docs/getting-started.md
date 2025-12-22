# Getting Started

Quick start guide to using RealPDEBench.

## Installation

```bash
pip install realpdebench
```

## Basic Usage

### Load a Dataset

```python
from realpdebench import CylinderDataset

# Initialize dataset
dataset = CylinderDataset(
    data_path='path/to/cylinder.h5',
    mode='real',  # 'real', 'sim', or 'both'
    split='train'  # 'train', 'val', or 'test'
)

# Get a sample
sample = dataset[0]
print(sample['velocity'].shape)  # (T, X, Y, 2)
```

### Train a Model

```python
from realpdebench.models import FNO
from realpdebench.training import Trainer

# Initialize model
model = FNO(
    modes=12,
    width=64,
    input_dim=2,
    output_dim=2
)

# Setup trainer
trainer = Trainer(
    model=model,
    dataset=dataset,
    config='configs/fno_cylinder.yaml'
)

# Train
trainer.fit()
```

### Evaluate

```python
from realpdebench.evaluation import evaluate_model

# Evaluate on real-world test data
metrics = evaluate_model(
    model=model,
    dataset=dataset,
    split='test',
    metrics=['rmse', 'rel_l2', 'r2', 'ke']
)

print(metrics)
```

## Training Paradigms

### 1. Simulated Training

Train only on simulated data, test on real data:

```python
train_dataset = CylinderDataset(mode='sim', split='train')
test_dataset = CylinderDataset(mode='real', split='test')
```

### 2. Real-World Training

Train on limited real data:

```python
train_dataset = CylinderDataset(mode='real', split='train')
test_dataset = CylinderDataset(mode='real', split='test')
```

### 3. Sim Pretrain + Real Finetune

Leverage both simulated and real data:

```python
# Pretrain on simulated data
pretrain_dataset = CylinderDataset(mode='sim', split='train')
trainer.pretrain(pretrain_dataset)

# Finetune on real data
finetune_dataset = CylinderDataset(mode='real', split='train')
trainer.finetune(finetune_dataset)
```

## Download Data

Visit our [Datasets](/datasets/) page to download individual datasets or the full benchmark.

## Examples

Check out example notebooks:

- [Cylinder Wake Prediction](examples/cylinder_prediction.ipynb)
- [Sim-to-Real Transfer](examples/sim_to_real.ipynb)
- [Model Comparison](examples/model_comparison.ipynb)

## Support

- **GitHub Issues:** [Report bugs](https://github.com/realpdebench/realpdebench.github.io/issues)
- **Discussions:** [Ask questions](https://github.com/realpdebench/realpdebench.github.io/discussions)
- **Email:** contact@realpdebench.org

# Add Your Model

This page explains how to define a **new baseline model** in the RealPDEBench benchmark codebase.

> Source of truth for implementation details (interface, training loop, shapes) is the benchmark code snapshot under `ref_codes/real_benchmark-public/`.

## 1) The `Model` interface (what you must implement)

RealPDEBench defines a minimal base class `Model` with three key methods:

- **`forward(x)`**: run inference and return predictions
- **`train_loss(input, target)`**: compute the training loss used by the benchmark training loop
- **`load_checkpoint(checkpoint_path, device)`** *(optional but recommended)*: restore weights and return metadata

### Tensor layout contract (critical)

All datasets expose a consistent field layout:

- **Single sample**:
  - `input`: `[T_in, H, W, C_in]`
  - `target`: `[T_out, H, W, C_out]`
- **Batched input to the model**:
  - `x`: `[B, T_in, H, W, C_in]`
  - `y_hat = model(x)`: `[B, T_out, H, W, C_out]`

Notes:

- Many baselines assume \(T_\text{out}\) is a multiple of \(T_\text{in}\). If your model does not, make sure your `forward()` still returns the correct `T_out`.
- Real-world data can have **unmeasured modalities**. In the benchmark, these are represented by **zero-padded channels** (and simulated training may use mask-training so the model learns to handle this).

## 2) Minimal model skeleton

Below is a minimal pattern that matches the benchmark training loop (MSE loss as an example):

```python
import torch
import torch.nn as nn

from realpdebench.model.model import Model
from realpdebench.utils.metrics import mse_loss


class MyModel(Model):
    def __init__(self, ...):
        super().__init__()
        # define layers here

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        # x: [B, T_in, H, W, C_in]
        # return: [B, T_out, H, W, C_out]
        ...

    def train_loss(self, input: torch.Tensor, target: torch.Tensor) -> torch.Tensor:
        pred = self.forward(input)
        return mse_loss(pred, target)
```

## 3) How training uses `train_loss`

The benchmark training loop calls:

- `input, target = data_normalizer.preprocess(input, target)`
- `loss = model.train_loss(input, target).mean()`

So `train_loss()` should return a tensor that can be averaged over the batch.

## 4) Register the model name (factory pattern)

In the benchmark code, models are constructed via a single factory function (e.g. keyed by `model_name`).

To add a new model:

- Create a new module (example): `realpdebench/model/my_model.py`
- Add a new branch in the model factory (example): `realpdebench/model/load_model.py`
  - Map `model_name: "my_model"` to `MyModel(...)`
  - Pass `shape_in` / `shape_out` (from the dataset) if your architecture needs them

## 5) Add a config YAML (recommended workflow)

RealPDEBench uses YAML configs per dataset and model (e.g. `configs/cylinder/fno.yaml`).

To add a new model config:

- Copy an existing config in `configs/<dataset>/`
- Set:
  - `model_name: "my_model"`
  - your model hyperparameters

Then you can run training via the standard CLI entry (see [Getting Started](../getting-started.md)).

## 6) Compatibility checklist

- **Shapes**: always return `[B, T_out, H, W, C_out]`
- **Missing modalities**: do not crash if some channels are all zeros
- **Autoregressive evaluation**: if you support rollouts, make sure the model behaves sensibly when repeatedly fed its own predictions



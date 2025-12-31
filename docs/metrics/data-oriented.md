# Data-oriented Metrics

These metrics evaluate **prediction accuracy** directly in data space (plus one training-efficiency metric).

We follow the notation in our paper: let \(\{\mathbf{y}_k\}_{k=1}^K\) be ground-truth samples and \(\{\hat{\mathbf{y}}_k\}_{k=1}^K\) be model predictions. Each sample is indexed by time \(t=1,\ldots,T\) and spatial grid points \(\{\mathbf{x}_i\}_{i=1}^I\).

<a id="rmse"></a>
## RMSE (Root Mean Square Error)

$$
\mathrm{RMSE} = \sqrt{\frac{1}{KTI}\sum_{k=1}^{K}\sum_{t=1}^{T}\sum_{i=1}^{I}\left\|\mathbf{y}_k(t,\mathbf{x}_i) - \hat{\mathbf{y}}_k(t,\mathbf{x}_i)\right\|_2^2}
$$

Measures average prediction error magnitude.

**Better:** lower is better (0 is perfect).

<a id="mae"></a>
## MAE (Mean Absolute Error)

$$
\mathrm{MAE} = \frac{1}{KTI}\sum_{k=1}^{K}\sum_{t=1}^{T}\sum_{i=1}^{I}\left\|\mathbf{y}_k(t,\mathbf{x}_i) - \hat{\mathbf{y}}_k(t,\mathbf{x}_i)\right\|_1
$$

Measures mean absolute deviation (less sensitive to outliers than RMSE).

**Better:** lower is better (0 is perfect).

<a id="rel-l2"></a>
## Relative \(L_2\) Error

$$
\mathrm{Rel}\ L_2 = \frac{1}{K}\sum_{k=1}^{K}\frac{\|\mathbf{y}_k - \hat{\mathbf{y}}_k\|_2}{\|\mathbf{y}_k\|_2}
$$

Scale-independent normalized error.

**Better:** lower is better (0 is perfect).

<a id="r2"></a>
## \(R^2\) (Coefficient of Determination)

$$
R^2 = 1 - \frac{\sum_{k} (\mathbf{y}_k - \hat{\mathbf{y}}_k)^2}{\sum_{k} (\mathbf{y}_k - \bar{\mathbf{y}})^2}
$$

where \(\bar{\mathbf{y}} = \sum_k \mathbf{y}_k / K\).

Goodness-of-fit measure (\(1.0\) = perfect fit).

**Better:** higher is better (1 is perfect).

## Update Ratio (Training Efficiency)

$$
\mathrm{Update\ Ratio} = \frac{N_1}{N_2}
$$

Measures the relative efficiency of simulated pretraining with real-world finetuning versus real-world training from scratch.

Let \(\mathrm{RMSE}_0\) denote the best RMSE achieved with real-world training. Define \(N_1\) and \(N_2\) as the number of finetuning updates and training updates required to reach \(\mathrm{RMSE}_0\), respectively. The metric is then given by \(N_1/N_2\).

**Better:** lower is better. Values \(< 1\) indicate pretraining reduces the number of updates needed to match real-world training.



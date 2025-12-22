# Data-oriented Metrics

These metrics evaluate **prediction accuracy** directly in data space (or learning efficiency).

## RMSE (Root Mean Square Error)

$$
\text{RMSE} = \sqrt{\frac{1}{K}\sum_k (y_k - \hat{y}_k)^2}
$$

Measures average prediction error magnitude.

## Relative \(L_2\) Error

$$
\text{Rel }L_2 = \frac{\|y - \hat{y}\|_2}{\|y\|_2}
$$

Scale-independent normalized error.

## \(R^2\) (Coefficient of Determination)

$$
R^2 = 1 - \frac{\sum_k (y_k - \hat{y}_k)^2}{\sum_k (y_k - \bar{y})^2}
$$

Goodness-of-fit measure (\(1.0\) = perfect fit).

## Update Ratio

$$
\text{Update Ratio} = \frac{N_1}{N_2}
$$

Measures pretraining efficiency: \(N_1\) (finetuning updates) / \(N_2\) (from-scratch updates).



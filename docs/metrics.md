# Evaluation Metrics

RealPDEBench reports **9 metrics** to assess prediction accuracy on real-world data, physical consistency, and (for sim-to-real transfer) training efficiency.

## Data-oriented

- RMSE (Root Mean Square Error)
- MAE (Mean Absolute Error)
- Rel \(L_2\) (Relative \(L_2\) Error)
- \(R^2\) (Coefficient of Determination)
- Update Ratio (training efficiency; finetuning only)

[Go to Data-oriented metrics →](metrics/data-oriented.md)

## Physics-oriented

- fRMSE (Fourier Space Error)
- FE (Frequency Error)
- KE (Kinetic Energy Error)
- MVPE (Mean Velocity Profile Error)

[Go to Physics-oriented metrics →](metrics/physics-oriented.md)

## Metric Comparison

| Metric | Category | Range | Best Value |
|--------|----------|-------|------------|
| RMSE | Data-oriented | \([0, \infty)\) | 0 |
| MAE | Data-oriented | \([0, \infty)\) | 0 |
| Rel \(L_2\) | Data-oriented | \([0, \infty)\) | 0 |
| \(R^2\) | Data-oriented | \((-\infty, 1]\) | 1 |
| fRMSE | Physics-oriented | \([0, \infty)\) | 0 |
| FE | Physics-oriented | \([0, \infty)\) | 0 |
| KE | Physics-oriented | \([0, \infty)\) | 0 |
| MVPE | Physics-oriented | \([0, \infty)\) | 0 |
| Update Ratio | Data-oriented | \([0, \infty)\) | 0 |

Notes:
- \(R^2\) is **higher-is-better**; all other listed metrics are **lower-is-better**.
- Update Ratio is only reported for **Real-world finetuning** (simulated pretraining → real-world finetuning).
- Update Ratio values \(< 1\) indicate simulated pretraining reduces the number of updates needed to reach the best real-training RMSE.

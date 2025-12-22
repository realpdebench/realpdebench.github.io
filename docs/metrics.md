# Evaluation Metrics

RealPDEBench uses **8 metrics** to assess model performance on real-world data and physical consistency.

## Data-oriented

- RMSE (Root Mean Square Error)
- Relative \(L_2\) Error
- \(R^2\) (Coefficient of Determination)
- Update Ratio (pretraining efficiency)

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
| Rel \(L_2\) | Data-oriented | \([0, \infty)\) | 0 |
| \(R^2\) | Data-oriented | \((-\infty, 1]\) | 1 |
| Update Ratio | Data-oriented | \([0, \infty)\) | < 1 |
| fRMSE | Physics-oriented | \([0, \infty)\) | 0 |
| FE | Physics-oriented | \([0, \infty)\) | 0 |
| KE | Physics-oriented | \([0, \infty)\) | 0 |
| MVPE | Physics-oriented | \([0, \infty)\) | 0 |

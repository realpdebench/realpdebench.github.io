# Physics-oriented Metrics

These metrics evaluate whether predictions respect **physical structure** such as spectral content, frequencies, energy, and long-time statistics.

We use the same notation as in the paper: \(\{\mathbf{y}_k\}_{k=1}^K\) are ground-truth samples, \(\{\hat{\mathbf{y}}_k\}_{k=1}^K\) are predictions, \(t=1,\ldots,T\) indexes time, and \(\{\mathbf{x}_i\}_{i=1}^I\) are spatial grid points.

<a id="frmse"></a>
## fRMSE (Fourier Space Error)

Measures error in the frequency domain, capturing spectral accuracy.

Let \(\mathcal{F}(\cdot)\) denote a 3D FFT applied to spatiotemporal fields. For each sample \(k\), define Fourier coefficients \(\mathbf{Y}_k=\mathcal{F}(\mathbf{y}_k)\) and \(\hat{\mathbf{Y}}_k=\mathcal{F}(\hat{\mathbf{y}}_k)\). Group frequencies \(\omega\) by their magnitude into bins \(B\). The Fourier-space error in a bin is:

$$
\mathrm{fRMSE}(B)=\sqrt{\frac{1}{K}\sum_{k=1}^{K}\frac{1}{|B|}\sum_{\omega\in B}\left\|\mathbf{Y}_k(\omega)-\hat{\mathbf{Y}}_k(\omega)\right\|_2^2}.
$$

In the paper we report fRMSE over low/middle/high frequency bands by partitioning the spectrum.

**Better:** lower is better (0 is perfect).

<a id="fe"></a>
## FE (Frequency Error)

Evaluates temporal periodicity and vortex shedding frequency by comparing the spectra of spatially-summed temporal signals.

Let \(s_k(t)=\sum_i \mathbf{y}_k(t,\mathbf{x}_i)\) and \(\hat s_k(t)=\sum_i \hat{\mathbf{y}}_k(t,\mathbf{x}_i)\). Let \(\mathcal{F}\) denote the 1D FFT. Then:

$$
\mathrm{FE}=\frac{1}{KT}\sum_{k=1}^{K}\sum_{t=1}^{T}\left|\mathcal{F}(s_k)(t)-\mathcal{F}(\hat s_k)(t)\right|.
$$

**Better:** lower is better (0 is perfect).

<a id="ke"></a>
## KE (Kinetic Energy Error)

$$
\mathrm{KE} = |e - \hat e|,
\quad
e = \frac{\overline{(\mathbf{u}')^2} + \overline{(\mathbf{v}')^2}}{2},
\quad
\overline{(\mathbf{u}')^2} = \frac{1}{T}\sum_{t}(\mathbf{u}(t)-\bar{\mathbf{u}})^2
$$

where \(\mathbf{u}\) and \(\mathbf{v}\) (two channels of \(\mathbf{y}\)) denote the velocity field in the \(x\)- and \(y\)-directions, respectively, and \(\bar{\mathbf{u}}\) is the time-average of \(\mathbf{u}(t)\) (similarly for \(\mathbf{v}\)).

Assesses energy consistency in velocity fields.

**Better:** lower is better (0 is perfect).

<a id="mvpe"></a>
## MVPE (Mean Velocity Profile Error)

Compares long-term time-averaged velocity profiles against ground truth at selected probe locations.

Given probe locations \(\{(x_{\text{probe},j}, y_{\text{probe},j})\}_{j=1}^{N_\text{probe}}\), MVPE is defined as:

$$
\mathrm{MVPE}=\frac{1}{KN_\text{probe}}\sum_{k=1}^{K}\sum_{j=1}^{N_\text{probe}}\left|\bar u_k(x_{\text{probe},j}, y_{\text{probe},j}) - \bar{\hat u}_k(x_{\text{probe},j}, y_{\text{probe},j})\right|.
$$

This is a long-term summary statistic; in the paper it is used for autoregressive evaluation and sim↔real gap analyses.

**Better:** lower is better (0 is perfect).



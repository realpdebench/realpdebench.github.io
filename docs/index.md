<!-- Hero Section -->
<section class="section rp-fullbleed rp-fullbleed--hero">
  <div class="container">
    <!-- Hero media: synced Real↔Sim comparison carousel (per-dataset) -->
    <div class="rp-hero-carousel" data-rp-hero-carousel style="--rp-split: 20%;">
      <div class="rp-carousel-viewport" data-rp-carousel-viewport>
        <div class="rp-carousel-track" data-rp-carousel-track>
          <!-- Slide: Combustion -->
          <div class="rp-carousel-slide is-active" data-rp-carousel-slide data-title="Combustion">
            <div class="rp-compare-grid">
              <!-- Left card: Real base, Sim overlay (drag → becomes Sim) -->
              <div class="rp-compare" data-rp-compare>
                <video class="rp-compare-base" muted playsinline loop preload="metadata">
                  <source src="assets/videos/combusion/combusion_real.mp4" type="video/mp4">
                </video>
                <div class="rp-compare-label rp-compare-label--base" aria-hidden="true">REAL</div>
                <div class="rp-compare-overlay" aria-hidden="true">
                  <video class="rp-compare-over" muted playsinline loop preload="metadata">
                    <source src="assets/videos/combusion/combusion_sim.mp4" type="video/mp4">
                  </video>
                  <div class="rp-compare-label rp-compare-label--overlay" aria-hidden="true">SIM</div>
                </div>
                <div class="rp-compare-handle" role="slider" tabindex="0" aria-label="Compare Real to Sim" aria-valuemin="0" aria-valuemax="100" aria-valuenow="20"></div>
              </div>

              <!-- Right card: Sim base, Real overlay (drag → becomes Real) -->
              <div class="rp-compare rp-compare--mirror" data-rp-compare>
                <video class="rp-compare-base" muted playsinline loop preload="metadata">
                  <source src="assets/videos/combusion/combusion_sim.mp4" type="video/mp4">
                </video>
                <div class="rp-compare-label rp-compare-label--base" aria-hidden="true">SIM</div>
                <div class="rp-compare-overlay" aria-hidden="true">
                  <video class="rp-compare-over" muted playsinline loop preload="metadata">
                    <source src="assets/videos/combusion/combusion_real.mp4" type="video/mp4">
                  </video>
                  <div class="rp-compare-label rp-compare-label--overlay" aria-hidden="true">REAL</div>
                </div>
                <div class="rp-compare-handle" role="slider" tabindex="0" aria-label="Compare Sim to Real" aria-valuemin="0" aria-valuemax="100" aria-valuenow="20"></div>
              </div>
            </div>

            <div class="rp-carousel-meta" aria-hidden="true">
              <span class="rp-carousel-kicker">Combustion</span>
            </div>
          </div>

          <!-- Slide: FSI -->
          <div class="rp-carousel-slide" data-rp-carousel-slide data-title="FSI">
            <div class="rp-compare-grid">
              <!-- Left card: Real base, Sim overlay (drag → becomes Sim) -->
              <div class="rp-compare" data-rp-compare>
                <video class="rp-compare-base" muted playsinline loop preload="metadata">
                  <source src="assets/videos/fsi/fsi_real.mp4" type="video/mp4">
                </video>
                <div class="rp-compare-label rp-compare-label--base" aria-hidden="true">REAL</div>
                <div class="rp-compare-overlay" aria-hidden="true">
                  <video class="rp-compare-over" muted playsinline loop preload="metadata">
                    <source src="assets/videos/fsi/fsi_sim.mp4" type="video/mp4">
                  </video>
                  <div class="rp-compare-label rp-compare-label--overlay" aria-hidden="true">SIM</div>
                </div>
                <div class="rp-compare-handle" role="slider" tabindex="0" aria-label="Compare Real to Sim" aria-valuemin="0" aria-valuemax="100" aria-valuenow="20"></div>
              </div>

              <!-- Right card: Sim base, Real overlay (drag → becomes Real) -->
              <div class="rp-compare rp-compare--mirror" data-rp-compare>
                <video class="rp-compare-base" muted playsinline loop preload="metadata">
                  <source src="assets/videos/fsi/fsi_sim.mp4" type="video/mp4">
                </video>
                <div class="rp-compare-label rp-compare-label--base" aria-hidden="true">SIM</div>
                <div class="rp-compare-overlay" aria-hidden="true">
                  <video class="rp-compare-over" muted playsinline loop preload="metadata">
                    <source src="assets/videos/fsi/fsi_real.mp4" type="video/mp4">
                  </video>
                  <div class="rp-compare-label rp-compare-label--overlay" aria-hidden="true">REAL</div>
                </div>
                <div class="rp-compare-handle" role="slider" tabindex="0" aria-label="Compare Sim to Real" aria-valuemin="0" aria-valuemax="100" aria-valuenow="20"></div>
              </div>
            </div>

            <div class="rp-carousel-meta" aria-hidden="true">
              <span class="rp-carousel-kicker">FSI</span>
            </div>
          </div>

          <!-- Slide: Cylinder -->
          <div class="rp-carousel-slide" data-rp-carousel-slide data-title="Cylinder">
            <div class="rp-compare-grid">
              <!-- Left card: Real base, Sim overlay (drag → becomes Sim) -->
              <div class="rp-compare" data-rp-compare>
                <video class="rp-compare-base" muted playsinline loop preload="metadata">
                  <source src="assets/videos/cylinder/cylinder_real.mp4" type="video/mp4">
                </video>
                <div class="rp-compare-label rp-compare-label--base" aria-hidden="true">REAL</div>
                <div class="rp-compare-overlay" aria-hidden="true">
                  <video class="rp-compare-over" muted playsinline loop preload="metadata">
                    <source src="assets/videos/cylinder/cylinder_sim.mp4" type="video/mp4">
                  </video>
                  <div class="rp-compare-label rp-compare-label--overlay" aria-hidden="true">SIM</div>
                </div>
                <div class="rp-compare-handle" role="slider" tabindex="0" aria-label="Compare Real to Sim" aria-valuemin="0" aria-valuemax="100" aria-valuenow="20"></div>
              </div>

              <!-- Right card: Sim base, Real overlay (drag → becomes Real) -->
              <div class="rp-compare rp-compare--mirror" data-rp-compare>
                <video class="rp-compare-base" muted playsinline loop preload="metadata">
                  <source src="assets/videos/cylinder/cylinder_sim.mp4" type="video/mp4">
                </video>
                <div class="rp-compare-label rp-compare-label--base" aria-hidden="true">SIM</div>
                <div class="rp-compare-overlay" aria-hidden="true">
                  <video class="rp-compare-over" muted playsinline loop preload="metadata">
                    <source src="assets/videos/cylinder/cylinder_real.mp4" type="video/mp4">
                  </video>
                  <div class="rp-compare-label rp-compare-label--overlay" aria-hidden="true">REAL</div>
                </div>
                <div class="rp-compare-handle" role="slider" tabindex="0" aria-label="Compare Sim to Real" aria-valuemin="0" aria-valuemax="100" aria-valuenow="20"></div>
              </div>
            </div>

            <div class="rp-carousel-meta" aria-hidden="true">
              <span class="rp-carousel-kicker">Cylinder</span>
            </div>
          </div>

          <!-- Slide: Controlled Cylinder -->
          <div class="rp-carousel-slide" data-rp-carousel-slide data-title="Controlled Cylinder">
            <div class="rp-compare-grid">
              <!-- Left card: Real base, Sim overlay (drag → becomes Sim) -->
              <div class="rp-compare" data-rp-compare>
                <video class="rp-compare-base" muted playsinline loop preload="metadata">
                  <source src="assets/videos/controlled_cylinder/controlled_cylinder_real.mp4" type="video/mp4">
                </video>
                <div class="rp-compare-label rp-compare-label--base" aria-hidden="true">REAL</div>
                <div class="rp-compare-overlay" aria-hidden="true">
                  <video class="rp-compare-over" muted playsinline loop preload="metadata">
                    <source src="assets/videos/controlled_cylinder/controlled_cylinder_sim.mp4" type="video/mp4">
                  </video>
                  <div class="rp-compare-label rp-compare-label--overlay" aria-hidden="true">SIM</div>
                </div>
                <div class="rp-compare-handle" role="slider" tabindex="0" aria-label="Compare Real to Sim" aria-valuemin="0" aria-valuemax="100" aria-valuenow="20"></div>
              </div>

              <!-- Right card: Sim base, Real overlay (drag → becomes Real) -->
              <div class="rp-compare rp-compare--mirror" data-rp-compare>
                <video class="rp-compare-base" muted playsinline loop preload="metadata">
                  <source src="assets/videos/controlled_cylinder/controlled_cylinder_sim.mp4" type="video/mp4">
                </video>
                <div class="rp-compare-label rp-compare-label--base" aria-hidden="true">SIM</div>
                <div class="rp-compare-overlay" aria-hidden="true">
                  <video class="rp-compare-over" muted playsinline loop preload="metadata">
                    <source src="assets/videos/controlled_cylinder/controlled_cylinder_real.mp4" type="video/mp4">
                  </video>
                  <div class="rp-compare-label rp-compare-label--overlay" aria-hidden="true">REAL</div>
                </div>
                <div class="rp-compare-handle" role="slider" tabindex="0" aria-label="Compare Sim to Real" aria-valuemin="0" aria-valuemax="100" aria-valuenow="20"></div>
              </div>
            </div>

            <div class="rp-carousel-meta" aria-hidden="true">
              <span class="rp-carousel-kicker">Controlled Cylinder</span>
            </div>
          </div>

          <!-- Slide: Foil -->
          <div class="rp-carousel-slide" data-rp-carousel-slide data-title="Foil">
            <div class="rp-compare-grid">
              <!-- Left card: Real base, Sim overlay (drag → becomes Sim) -->
              <div class="rp-compare" data-rp-compare>
                <video class="rp-compare-base" muted playsinline loop preload="metadata">
                  <source src="assets/videos/foil/foil_real.mp4" type="video/mp4">
                </video>
                <div class="rp-compare-label rp-compare-label--base" aria-hidden="true">REAL</div>
                <div class="rp-compare-overlay" aria-hidden="true">
                  <video class="rp-compare-over" muted playsinline loop preload="metadata">
                    <source src="assets/videos/foil/foil_sim.mp4" type="video/mp4">
                  </video>
                  <div class="rp-compare-label rp-compare-label--overlay" aria-hidden="true">SIM</div>
                </div>
                <div class="rp-compare-handle" role="slider" tabindex="0" aria-label="Compare Real to Sim" aria-valuemin="0" aria-valuemax="100" aria-valuenow="20"></div>
              </div>

              <!-- Right card: Sim base, Real overlay (drag → becomes Real) -->
              <div class="rp-compare rp-compare--mirror" data-rp-compare>
                <video class="rp-compare-base" muted playsinline loop preload="metadata">
                  <source src="assets/videos/foil/foil_sim.mp4" type="video/mp4">
                </video>
                <div class="rp-compare-label rp-compare-label--base" aria-hidden="true">SIM</div>
                <div class="rp-compare-overlay" aria-hidden="true">
                  <video class="rp-compare-over" muted playsinline loop preload="metadata">
                    <source src="assets/videos/foil/foil_real.mp4" type="video/mp4">
                  </video>
                  <div class="rp-compare-label rp-compare-label--overlay" aria-hidden="true">REAL</div>
                </div>
                <div class="rp-compare-handle" role="slider" tabindex="0" aria-label="Compare Sim to Real" aria-valuemin="0" aria-valuemax="100" aria-valuenow="20"></div>
              </div>
            </div>

            <div class="rp-carousel-meta" aria-hidden="true">
              <span class="rp-carousel-kicker">Foil</span>
            </div>
          </div>
        </div>
      </div>

      <button type="button" class="rp-carousel-nav rp-carousel-prev" data-rp-carousel-prev aria-label="Previous dataset"></button>
      <button type="button" class="rp-carousel-nav rp-carousel-next" data-rp-carousel-next aria-label="Next dataset"></button>
      <div class="rp-carousel-dots" data-rp-carousel-dots aria-label="Dataset selector"></div>
    </div>

    <div class="rp-hero-inner">
      <h1 class="hero-title">
        <span class="hero-gradient-mint">RealPDE</span>Bench:<br>
        Bridging the <span class="hero-gradient">Sim-to-Real</span> Gap
      </h1>
      <p class="rp-hero-subtitle">
        The first scientific ML benchmark with <strong style="font-weight: 600;">paired real-world and simulated data</strong> for complex physical systems
      </p>
      <div class="rp-hero-authors" aria-label="Authors">
        <p class="rp-hero-authors-names">
          AI for Scientific Simulation and Discovery Lab, Westlake University
        </p>
        <p class="rp-hero-authors-note">Corresponding author: Tailin Wu</p>
      </div>
      <div class="rp-hero-cta">
        <a href="#datasets" class="btn-primary">Explore Datasets</a>
        <a href="#download" class="btn-secondary">Paper</a>
        <a href="https://huggingface.co/datasets/AI4Science-WestlakeU/RealPDEBench" class="btn-secondary" target="_blank" rel="noopener noreferrer">Hugging Face</a>
      </div>
    </div>
  </div>
</section>

<div class="spacer-lg"></div>

<!-- Key Stats -->
<section class="section-sm">
  <div class="container">
    <div class="rp-home-stats">
      <div class="rp-home-stat">
        <span class="stat-number">5</span>
        <span class="stat-label">Datasets</span>
      </div>
      <div class="rp-home-stat">
        <span class="stat-number">700+</span>
        <span class="stat-label">Trajectories</span>
      </div>
      <div class="rp-home-stat">
        <span class="stat-number">10</span>
        <span class="stat-label">Baseline Models</span>
      </div>
      <div class="rp-home-stat">
        <span class="stat-number">8</span>
        <span class="stat-label">Evaluation Metrics</span>
      </div>
    </div>
  </div>
</section>

<!-- Dataset Visualization -->
<section class="section rp-dataset-showcase">
  <div class="container">
    <div class="rp-showcase-grid">
      <div class="rp-showcase-item">
        <p class="rp-showcase-label">Real-World Experiments</p>
        <img src="assets/images/all_real.png" alt="All real-world experimental data" class="rp-showcase-img">
      </div>
      <div class="rp-showcase-item">
        <p class="rp-showcase-label">CFD Simulations</p>
        <img src="assets/images/all_sim.png" alt="All CFD simulation data" class="rp-showcase-img">
      </div>
    </div>
  </div>
</section>

<div class="spacer-lg"></div>

<!-- Core Problem Section -->
<section id="challenge" class="section rp-challenge-section">
  <div class="container">
    <div class="rp-challenge-header">
      <p class="subtitle">The Challenge</p>
      <h2 class="section-title">Why Real-World Data Matters</h2>
      <p class="rp-challenge-lead">
        Most scientific ML models are only validated on simulated data, creating a <strong>critical gap</strong> between theory and practice.
      </p>
    </div>

    <div class="rp-challenge-grid" aria-label="Key sources of the sim-to-real gap">
      <div class="glass-card rp-challenge-card">
        <h3 class="rp-challenge-title">Numerical Errors</h3>
        <p class="rp-challenge-text">Discretization and modeling assumptions in CFD simulations</p>
      </div>

      <div class="glass-card rp-challenge-card">
        <h3 class="rp-challenge-title">Measurement Noise</h3>
        <p class="rp-challenge-text">Camera sensors and particle tracking introduce real-world noise</p>
      </div>

      <div class="glass-card rp-challenge-card">
        <h3 class="rp-challenge-title">Unmeasured Modalities</h3>
        <p class="rp-challenge-text">Pressure fields and 3D velocities cannot be fully measured</p>
      </div>
    </div>
  </div>
</section>

<!-- Bento Grid - Datasets Showcase -->
<section id="datasets" class="section">
  <div class="container">
    <p class="subtitle">Benchmark Datasets</p>
    <h2 class="section-title">Five Physical Systems<br/>Real Experiments + CFD Simulations</h2>
    <p class="rp-section-hint">Click a dataset card to open the scenario page (data format, downloads, and examples).</p>

    <div class="bento-grid">

      <!-- Large: FSI -->
      <a class="bento-item bento-large glass-card" href="datasets/fsi/" style="background: linear-gradient(135deg, rgba(216,212,230,0.3) 0%, rgba(255,255,255,0.9) 100%); display: flex; align-items: center;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; align-items: center; width: 100%;">
          <div>
            <h3 style="font-size: 2rem; font-weight: 600; margin-bottom: 1rem;">FSI</h3>
            <p style="color: var(--slate); font-size: 1.125rem; line-height: 1.8;">
              Two-way fluid–structure interaction with cylinder vibration (vortex-induced vibration), spanning <strong>Re 3272–9068</strong> across varying mass ratio and damping.
            </p>
            <div style="margin-top: 1.5rem;">
              <span class="badge">Fluid-Structure</span>
              <span class="badge">Two-way Coupling</span>
              <span class="badge">VIV</span>
            </div>
          </div>
          <div style="border-radius: 16px; overflow: hidden; aspect-ratio: 1 / 1;">
            <div class="image-placeholder" data-rp-video-tile>
              <video muted playsinline loop autoplay preload="metadata">
                <source src="assets/videos/fsi/fsi_real.mp4" type="video/mp4">
              </video>
              <div class="rp-video-tile-overlay" aria-hidden="true">
                <span class="image-placeholder-text">FSI Coupling</span>
              </div>
            </div>
          </div>
        </div>
      </a>

      <!-- Medium: Controlled Cylinder -->
      <a class="bento-item bento-medium glass-card card-lavender" href="datasets/controlled-cylinder/">
        <div style="height: 50%; margin-bottom: 1rem; border-radius: 12px; overflow: hidden;">
          <div class="image-placeholder" data-rp-video-tile>
            <video muted playsinline loop autoplay preload="metadata">
              <source src="assets/videos/controlled_cylinder/controlled_cylinder_real.mp4" type="video/mp4">
            </video>
            <div class="rp-video-tile-overlay" aria-hidden="true">
              <span class="image-placeholder-text">Active Control</span>
            </div>
          </div>
        </div>
        <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem;">Controlled Cylinder</h3>
        <p style="font-size: 1rem; color: var(--slate);">
          Active control via forced vibration (f 0.5–1.4 Hz, Re 1781–9843).
        </p>
      </a>

      <!-- Medium: Cylinder -->
      <a class="bento-item bento-medium glass-card" href="datasets/cylinder/">
        <div style="height: 50%; margin-bottom: 1rem; border-radius: 12px; overflow: hidden;">
          <div class="image-placeholder" data-rp-video-tile>
            <video muted playsinline loop autoplay preload="metadata">
              <source src="assets/videos/cylinder/cylinder_real.mp4" type="video/mp4">
            </video>
            <div class="rp-video-tile-overlay" aria-hidden="true">
              <span class="image-placeholder-text">Cylinder Wake Dynamics<br/>PIV Visualization</span>
            </div>
          </div>
        </div>
        <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem;">Cylinder</h3>
        <p style="font-size: 1rem; color: var(--slate);">
          Stationary cylinder wake (Re 1800–12000) measured by PIV.
        </p>
      </a>

      <!-- Medium: Foil -->
      <a class="bento-item bento-small glass-card" href="datasets/foil/">
        <div style="height: 50%; margin-bottom: 1rem; border-radius: 12px; overflow: hidden;">
          <div class="image-placeholder" data-rp-video-tile>
            <video muted playsinline loop autoplay preload="metadata">
              <source src="assets/videos/foil/foil_real.mp4" type="video/mp4">
            </video>
            <div class="rp-video-tile-overlay" aria-hidden="true">
              <span class="image-placeholder-text">NACA0025 Foil</span>
            </div>
          </div>
        </div>
        <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem;">Foil</h3>
        <p style="font-size: 1rem; color: var(--slate);">
          NACA0025 airfoil: 2D slices of 3D flow (AoA 0°–20°, Re 2968–17031).
        </p>
      </a>

      <!-- Wide: Combustion -->
      <a class="bento-item bento-wide glass-card" href="datasets/combustion/" style="background: linear-gradient(90deg, var(--platinum) 0%, var(--lavender-light) 100%);">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; align-items: center;">
          <div>
            <h3 style="font-size: 2rem; font-weight: 600; margin-bottom: 1rem;">Combustion</h3>
            <p style="font-size: 1.125rem; color: var(--slate); line-height: 1.8; margin-bottom: 1.5rem;">
              3D swirl-stabilized NH₃/CH₄/air flames captured with OH* chemiluminescence at <strong>4000 fps</strong>. Large Eddy Simulation with 38 species and 184 reactions.
            </p>
            <div>
              <span class="badge">Combustion</span>
              <span class="badge">3D LES</span>
              <span class="badge">Multi-physics</span>
            </div>
          </div>
          <div style="height: 300px; border-radius: 16px; overflow: hidden;">
            <div class="image-placeholder" data-rp-video-tile>
              <video muted playsinline loop autoplay preload="metadata">
                <source src="assets/videos/combusion/combusion_real.mp4" type="video/mp4">
              </video>
              <div class="rp-video-tile-overlay" aria-hidden="true">
                <span class="image-placeholder-text">Flame OH* Chemiluminescence<br/>4000 FPS High-Speed Imaging</span>
              </div>
            </div>
          </div>
        </div>
      </a>

    </div>
  </div>
</section>

<!-- Benchmark Overview (Baselines + Metrics) -->
<section id="benchmark" class="section section-sm">
  <div class="container">
    <p class="subtitle">Benchmark</p>
    <h2 class="section-title">Baselines & Evaluation</h2>
    <p class="rp-section-hint">Click a model or metric to open its detail page.</p>

    <div class="rp-overview-grid" aria-label="Benchmark overview">
      <div class="rp-overview-panel" id="baseline-models">
        <h3 class="rp-overview-heading">10 Baseline Models</h3>

        <div class="rp-overview-subgrid rp-overview-subgrid--baseline" aria-label="Baseline model families">
          <div class="rp-overview-group rp-overview-group--foundation">
            <div class="rp-overview-kicker">Foundation Models</div>
            <ul class="rp-overview-list">
              <li><a class="rp-overview-link" href="models/dpot/#variants-in-realpdebench">DPOT-L (509M)</a></li>
              <li><a class="rp-overview-link" href="models/dpot/#variants-in-realpdebench">DPOT-S (30M)</a></li>
            </ul>
          </div>

          <div class="rp-overview-group rp-overview-group--traditional">
            <div class="rp-overview-kicker">Traditional & CNN</div>
            <ul class="rp-overview-list">
              <li><a class="rp-overview-link" href="models/dmd/">DMD</a></li>
              <li><a class="rp-overview-link" href="models/unet/">U-Net</a></li>
            </ul>
          </div>

          <div class="rp-overview-group rp-overview-group--operators">
            <div class="rp-overview-kicker">Neural Operators</div>
            <ul class="rp-overview-list">
              <li><a class="rp-overview-link" href="models/fno/">FNO</a></li>
              <li><a class="rp-overview-link" href="models/cno/">CNO</a></li>
              <li><a class="rp-overview-link" href="models/deeponet/">DeepONet</a></li>
              <li><a class="rp-overview-link" href="models/mwt/">MWT</a></li>
              <li><a class="rp-overview-link" href="models/gk-transformer/">GK-Transformer</a></li>
              <li><a class="rp-overview-link" href="models/transolver/">Transolver</a></li>
              <li><a class="rp-overview-link" href="models/wdno/">WDNO</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div class="rp-overview-panel" id="evaluation-metrics">
        <h3 class="rp-overview-heading">8 Evaluation Metrics</h3>

        <div class="rp-overview-subgrid rp-overview-subgrid--2" aria-label="Metric families">
          <div class="rp-overview-group">
            <div class="rp-overview-kicker">Data-oriented</div>
            <ul class="rp-metrics-list" aria-label="Data-oriented metrics (hover for definitions)">
              <li class="rp-metric-item" data-desc="Root Mean Square Error">
                <a class="rp-metric-link" href="metrics/data-oriented/#rmse">RMSE</a>
              </li>
              <li class="rp-metric-item" data-desc="Mean Absolute Error">
                <a class="rp-metric-link" href="metrics/data-oriented/#mae">MAE</a>
              </li>
              <li class="rp-metric-item" data-desc="Relative L₂ Error">
                <a class="rp-metric-link" href="metrics/data-oriented/#rel-l2">Rel L₂</a>
              </li>
              <li class="rp-metric-item" data-desc="Coefficient of Determination">
                <a class="rp-metric-link" href="metrics/data-oriented/#r2">R²</a>
              </li>
            </ul>
          </div>

          <div class="rp-overview-group">
            <div class="rp-overview-kicker">Physics-oriented</div>
            <ul class="rp-metrics-list" aria-label="Physics-oriented metrics (hover for definitions)">
              <li class="rp-metric-item" data-desc="Fourier Space Error">
                <a class="rp-metric-link" href="metrics/physics-oriented/#frmse">fRMSE</a>
              </li>
              <li class="rp-metric-item" data-desc="Frequency Error (Periodicity)">
                <a class="rp-metric-link" href="metrics/physics-oriented/#fe">FE</a>
              </li>
              <li class="rp-metric-item" data-desc="Kinetic Energy Error">
                <a class="rp-metric-link" href="metrics/physics-oriented/#ke">KE</a>
              </li>
              <li class="rp-metric-item" data-desc="Mean Velocity Profile Error">
                <a class="rp-metric-link" href="metrics/physics-oriented/#mvpe">MVPE</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Benchmark Results -->
<section id="benchmark-results" class="section rp-fullbleed rp-fullbleed--platinum">
  <div class="container">
    <p class="subtitle">Results Explorer</p>
    <h2 class="section-title">Explore Results</h2>
    <p class="rp-benchmark-lead">
      Baseline ranking on real-world test data, stratified by dataset and training paradigm.
    </p>

    <div class="glass-card rp-benchmark" data-rp-benchmark>
      <div class="rp-benchmark-howto" aria-label="How to read the bar ranking">
        <div class="rp-radar-kicker">SINGLE-METRIC COMPARISON</div>
        <div class="rp-benchmark-howto-title">Bar Chart</div>
        <div class="rp-benchmark-howto-subtitle">
          Bars are sorted best → worst (longest → shortest) for the selected metric.
          <strong>Bar length is min–max normalized across all models in the current dataset + training paradigm</strong>
          (best = 100% / full bar; worst = 0%).
          <strong>
            For error metrics (↓), smaller raw values correspond to longer bars; for R² (↑), larger values correspond to longer bars.
          </strong>
        </div>
      </div>

      <div class="rp-benchmark-controls" aria-label="Benchmark controls">
        <div class="rp-benchmark-control">
          <label class="rp-benchmark-label" for="rp-benchmark-dataset">Dataset</label>
          <select id="rp-benchmark-dataset" class="rp-select" aria-label="Dataset"></select>
        </div>

        <div class="rp-benchmark-control">
          <span class="rp-benchmark-label">Training paradigm</span>
          <div class="rp-seg" role="radiogroup" aria-label="Training paradigm">
            <button type="button" class="rp-seg-btn is-active" data-paradigm="simulated_training" aria-checked="true" role="radio" title="Trained on simulated (numerical/CFD) data; evaluated on real-world test data.">Simulated training</button>
            <button type="button" class="rp-seg-btn" data-paradigm="real_training" aria-checked="false" role="radio" title="Trained on real-world data; evaluated on real-world test data.">Real-world training</button>
            <button type="button" class="rp-seg-btn" data-paradigm="real_finetuning" aria-checked="false" role="radio" title="Simulated pretraining, then real-world finetuning; evaluated on real-world test data.">Real-world finetuning</button>
          </div>
        </div>

        <div class="rp-benchmark-control">
          <label class="rp-benchmark-label" for="rp-benchmark-metric">Metric</label>
          <select id="rp-benchmark-metric" class="rp-select" aria-label="Metric">
            <option value="rmse">RMSE (↓)</option>
            <option value="mae">MAE (↓)</option>
            <option value="rel_l2">Rel L₂ (↓)</option>
            <option value="r2">R² (↑)</option>
            <option value="frmse">fRMSE (↓)</option>
            <option value="fe">FE (↓)</option>
            <option value="ke">KE (↓)</option>
            <option value="mvpe">MVPE (↓)</option>
          </select>
        </div>

        <div class="rp-benchmark-control">
          <label class="rp-benchmark-label" for="rp-benchmark-topk">Show</label>
          <select id="rp-benchmark-topk" class="rp-select" aria-label="How many models to show">
            <option value="5">Top 5</option>
            <option value="999">All</option>
          </select>
        </div>
      </div>

      <div class="rp-benchmark-metric-help" data-rp-benchmark-metric-help aria-live="polite">
        <div class="rp-benchmark-paradigm-inline" data-rp-benchmark-paradigm-help>
          <div class="rp-benchmark-paradigm-inline-title">
            <span class="rp-benchmark-paradigm-inline-kicker">Training paradigm</span>
            <span class="rp-benchmark-paradigm-inline-label" data-rp-benchmark-paradigm-label>Simulated training</span>
          </div>
          <div class="rp-benchmark-paradigm-inline-desc" data-rp-benchmark-paradigm-desc>
            trained on simulated (numerical/CFD) data.
          </div>
        </div>
        <div class="rp-benchmark-metric-help-title">
          <span class="rp-benchmark-metric-help-kicker">Metric</span>
          <span class="rp-benchmark-metric-help-abbr" data-rp-benchmark-metric-abbr>RMSE</span>
          <span class="rp-benchmark-metric-help-sep" aria-hidden="true">—</span>
          <span class="rp-benchmark-metric-help-full" data-rp-benchmark-metric-full>Root Mean Square Error</span>
          <span class="rp-benchmark-metric-help-dir" data-rp-benchmark-metric-dir>(↓ lower is better)</span>
        </div>
        <div class="rp-benchmark-metric-help-desc" data-rp-benchmark-metric-desc>
          Pointwise error between predicted and ground-truth fields.
        </div>
      </div>

      <div class="rp-benchmark-chart" data-rp-benchmark-chart aria-live="polite">
        <div class="rp-benchmark-loading">Loading benchmark data…</div>
      </div>

      <div class="rp-benchmark-divider" aria-hidden="true"></div>

      <!-- Multi-metric radar comparison -->
      <div class="rp-radar" data-rp-radar>
        <div class="rp-radar-head">
          <div class="rp-radar-head-copy">
            <div class="rp-radar-kicker">Multi-metric comparison</div>
            <div class="rp-radar-title">Radar chart across performance dimensions</div>
            <div class="rp-radar-subtitle">
              Scores are min–max normalized to <strong>0–100</strong> within the current dataset + training paradigm.
              Use <strong>Zoom</strong> to normalize within the currently selected models for clearer separation.
              <strong>Higher is better</strong>. Axes are computed from the reported benchmark metrics (no extra measurements).
            </div>
          </div>
        </div>

        <div class="rp-radar-models" data-rp-radar-models aria-label="Select models to compare"></div>

        <div class="rp-radar-layout">
          <div class="rp-radar-chart" data-rp-radar-chart aria-label="Radar chart"></div>
          <div class="rp-radar-notes-wrap">
            <div class="rp-radar-actions rp-radar-actions--notes" aria-label="Radar selection actions">
              <button type="button" class="rp-chip-btn" data-rp-radar-top5>Top 5</button>
              <button type="button" class="rp-chip-btn" data-rp-radar-all>All models</button>
              <button type="button" class="rp-chip-btn" data-rp-radar-clear>Clear</button>
              <button
                type="button"
                class="rp-chip-btn"
                data-rp-radar-zoom
                aria-pressed="false"
                title="Zoom: normalize axes within the selected models (better separation; not comparable across different selections)."
              >
                Zoom
              </button>
            </div>
            <div class="rp-radar-notes" data-rp-radar-notes aria-live="polite"></div>
          </div>
        </div>
      </div>

      <div class="rp-benchmark-footnote">
        <span class="rp-benchmark-footnote-label">Notes:</span>
        Reported metrics are evaluated on real-world test data. DMD has no training stage; where unavailable, values are omitted.
      </div>
    </div>
  </div>
</section>

<div class="spacer-lg"></div>

<!-- Key Takeaways -->
<section class="section">
  <div class="container">
    <p class="subtitle">Key Takeaways</p>
    <h2 class="section-title">Key Findings</h2>

    <div class="rp-takeaways" aria-label="Key takeaways (click to expand)">
      <details class="rp-takeaway">
        <summary class="rp-takeaway-summary">
          <span class="rp-takeaway-num" aria-hidden="true">1</span>
          <span class="rp-takeaway-headline">Real data and simulation fail in different ways.</span>
          <span class="rp-takeaway-chevron" aria-hidden="true"></span>
        </summary>
        <div class="rp-takeaway-body">
          Real-world measurements are dominated by sensor and measurement noise, while simulated data are dominated by numerical and modeling error (e.g., discretization, LES closures, idealized conditions).
          That mismatch changes the error distribution—and is a key reason sim-to-real transfer is hard.
        </div>
      </details>

      <details class="rp-takeaway">
        <summary class="rp-takeaway-summary">
          <span class="rp-takeaway-num" aria-hidden="true">2</span>
          <span class="rp-takeaway-headline">Simulation is cheap and information-rich, but imperfect.</span>
          <span class="rp-takeaway-chevron" aria-hidden="true"></span>
        </summary>
        <div class="rp-takeaway-body">
          Simulated data are cheaper to generate at scale, can expose additional modalities (e.g., pressure), and avoid measurement-induced noise.
          This makes simulation valuable for coverage and pretraining, even though it cannot perfectly match reality.
        </div>
      </details>

      <details class="rp-takeaway">
        <summary class="rp-takeaway-summary">
          <span class="rp-takeaway-num" aria-hidden="true">3</span>
          <span class="rp-takeaway-headline">Simulation-only training doesn't transfer cleanly to real tests.</span>
          <span class="rp-takeaway-chevron" aria-hidden="true"></span>
        </summary>
        <div class="rp-takeaway-body">
          Across datasets, models trained on simulated trajectories show a clear performance gap when evaluated on real-world measurements.
          Even when physical parameters are matched, learning only from simulation tends to miss real-world effects.
        </div>
      </details>

      <details class="rp-takeaway">
        <summary class="rp-takeaway-summary">
          <span class="rp-takeaway-num" aria-hidden="true">4</span>
          <span class="rp-takeaway-headline">Training on real data closes much of the gap.</span>
          <span class="rp-takeaway-chevron" aria-hidden="true"></span>
        </summary>
        <div class="rp-takeaway-body">
          On real-world benchmarks, training directly on real measurements yields substantially lower errors than training on simulated data only.
          In our main results, real-world training improves Rel \(L_2\) by <strong>9.39% to 78.91%</strong> (depending on dataset and model).
        </div>
      </details>

      <details class="rp-takeaway">
        <summary class="rp-takeaway-summary">
          <span class="rp-takeaway-num" aria-hidden="true">5</span>
          <span class="rp-takeaway-headline">Pretrain on simulation, finetune on real: best of both.</span>
          <span class="rp-takeaway-chevron" aria-hidden="true"></span>
        </summary>
        <div class="rp-takeaway-body">
          Simulated pretraining followed by real-world finetuning often outperforms training on real-world data from scratch with the same real-data budget.
          Pretraining helps models pick up broad dynamics from large simulated corpora, then adapt to real measurement artifacts during finetuning.
        </div>
      </details>

      <details class="rp-takeaway">
        <summary class="rp-takeaway-summary">
          <span class="rp-takeaway-num" aria-hidden="true">6</span>
          <span class="rp-takeaway-headline">Pretraining saves updates.</span>
          <span class="rp-takeaway-chevron" aria-hidden="true"></span>
        </summary>
        <div class="rp-takeaway-body">
          Finetuned models reach the same (or better) performance with fewer real-data update steps—reflected by Update Ratios below one for most settings.
          On Combustion, the validation RMSE curve drops faster under finetuning than training from scratch.
        </div>
      </details>

      <details class="rp-takeaway">
        <summary class="rp-takeaway-summary">
          <span class="rp-takeaway-num" aria-hidden="true">7</span>
          <span class="rp-takeaway-headline">Architectures trade off pointwise accuracy vs. global structure.</span>
          <span class="rp-takeaway-chevron" aria-hidden="true"></span>
        </summary>
        <div class="rp-takeaway-body">
          Convolution-based models (e.g., U-Net, CNO) tend to do well on pointwise errors like RMSE.
          Models with operator / wavelet structure (e.g., MWT) can better preserve periodicity and other global features—so "best model" depends on the metric you care about.
        </div>
      </details>

      <details class="rp-takeaway">
        <summary class="rp-takeaway-summary">
          <span class="rp-takeaway-num" aria-hidden="true">8</span>
          <span class="rp-takeaway-headline">Long-horizon rollouts separate short-term wins from stable dynamics.</span>
          <span class="rp-takeaway-chevron" aria-hidden="true"></span>
        </summary>
        <div class="rp-takeaway-body">
          Autoregressive evaluation makes error accumulation obvious: a model that looks great at one-step prediction can drift quickly over multiple rollouts.
          In our Cylinder long-horizon analysis, the large pretrained DPOT model is among the most stable under multi-round evaluation.
        </div>
      </details>
    </div>
  </div>
</section>

<div class="spacer-lg"></div>

<!-- CTA Section -->
<section id="download" class="section rp-fullbleed rp-fullbleed--download">
  <div class="rp-download-blobs" aria-hidden="true">
    <div style="position: absolute; top: 18%; right: 8%; width: 380px; height: 380px; background: rgba(255,255,255,0.10); border-radius: 50%; filter: blur(90px);"></div>
    <div style="position: absolute; bottom: 12%; left: 10%; width: 320px; height: 320px; background: rgba(255,255,255,0.12); border-radius: 50%; filter: blur(70px);"></div>
  </div>

  <div class="container" style="position: relative; z-index: 1;">
    <p class="subtitle">Resources</p>
    <h2 class="section-title">Reproducibility</h2>
    <p style="font-size: 1.25rem; color: var(--slate); margin-bottom: 2.25rem; max-width: 760px;">
      Access datasets, baselines, and evaluation scripts to reproduce results and benchmark new models on paired experiments and CFD simulations.
    </p>

    <div style="display: flex; gap: 1rem; justify-content: flex-start; flex-wrap: wrap;">
      <a href="getting-started/" class="btn-primary" style="font-size: 1.05rem; padding: 14px 32px;">
        Getting Started
      </a>
      <a href="https://github.com/AI4Science-WestlakeU/RealPDEBench" class="btn-secondary" style="font-size: 1.05rem; padding: 14px 28px; background: rgba(255,255,255,0.92);">
        Code & Baselines
      </a>
    </div>

    <!-- Inline Citation (BibTeX) -->
    <div id="citation" class="rp-citation-inline">
      <div class="rp-citation-inline-header">
        <span class="rp-citation-inline-kicker">Citation</span>
      </div>
      <p class="rp-citation-inline-lead">If you find RealPDEBench useful in your research, please cite:</p>
      <div class="rp-citation-inline-code-meta">
        <span class="rp-citation-inline-hint">BibTeX</span>
      </div>
      <pre class="rp-code-block"><code class="language-plaintext">@article{realpdebench2025,
  title={RealPDEBench: A Benchmark for Complex Physical Systems with Real-World Data},
  author={Authors},
  year={2025}
}</code></pre>
    </div>
  </div>
</section>

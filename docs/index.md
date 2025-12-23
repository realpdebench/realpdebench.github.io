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
        RealPDEBench:<br>
        Bridging the <span class="hero-gradient">Sim-to-Real</span> Gap
      </h1>
      <p class="rp-hero-subtitle">
        The first scientific ML benchmark with <strong style="font-weight: 600;">paired real-world and simulated data</strong> for complex physical systems
      </p>
      <div class="rp-hero-authors" aria-label="Authors">
        <p class="rp-hero-authors-names">
          Peiyan Hu<sup>*</sup>, Haodong Feng<sup>*</sup>, Yue Wang, Zhiming Ma, Tailin Wu<sup>†</sup>
        </p>
        <p class="rp-hero-authors-note"><sup>*</sup> Equal contribution · <sup>†</sup> Corresponding author</p>
      </div>
      <div class="rp-hero-cta">
        <a href="#datasets" class="btn-primary">Explore Datasets</a>
        <a href="#download" class="btn-secondary">Paper</a>
      </div>
    </div>
  </div>
</section>

<div class="spacer-lg"></div>

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

<!-- Key Stats -->
<section class="section-sm">
  <div class="container">
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 3rem; text-align: center;">
      <div>
        <span class="stat-number">5</span>
        <span class="stat-label">Datasets</span>
      </div>
      <div>
        <span class="stat-number">700+</span>
        <span class="stat-label">Trajectories</span>
      </div>
      <div>
        <span class="stat-number">10</span>
        <span class="stat-label">Baseline Models</span>
      </div>
      <div>
        <span class="stat-number">8</span>
        <span class="stat-label">Evaluation Metrics</span>
      </div>
    </div>
  </div>
</section>

<!-- Bento Grid - Datasets Showcase -->
<section id="datasets" class="section">
  <div class="container">
    <p class="subtitle">Benchmark Datasets</p>
    <h2 class="section-title">Five Physical Systems<br/>Real Experiments + CFD Simulations</h2>

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

<div class="spacer-lg"></div>

<!-- Key Findings -->
<section class="section">
  <div class="container">
    <p class="subtitle">Research Findings</p>
    <h2 class="section-title">Significant Sim-to-Real Gap</h2>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-top: 3rem;">

      <div class="glass-card card-lavender">
        <div style="padding: 2rem;">
          <div style="font-size: 3rem; font-weight: 700; color: var(--carbon); margin-bottom: 0.5rem;">9-79%</div>
          <h4 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem;">Performance Improvement</h4>
          <p style="color: var(--slate);">Real-world training achieves 9.39% to 78.91% better accuracy than simulated-only training</p>
        </div>
      </div>

      <div class="glass-card">
        <div style="padding: 2rem;">
          <div style="font-size: 3rem; font-weight: 700; color: var(--carbon); margin-bottom: 0.5rem;">3</div>
          <h4 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem;">Training Paradigms</h4>
          <p style="color: var(--slate);">Simulated training, real-world training, and sim-pretrain + real-finetune evaluated</p>
        </div>
      </div>

      <div class="glass-card">
        <div style="padding: 2rem;">
          <div style="font-size: 3rem; font-weight: 700; color: var(--carbon); margin-bottom: 0.5rem;">&lt; 1.0</div>
          <h4 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem;">Update Ratio</h4>
          <p style="color: var(--slate);">Pretraining on simulated data accelerates convergence on real-world data</p>
        </div>
      </div>

    </div>
  </div>
</section>

<div class="spacer-lg"></div>

<!-- Baseline Models -->
<section id="baseline-models" class="section rp-fullbleed rp-fullbleed--platinum">
  <div class="container">
    <p class="subtitle">Benchmark</p>
    <h2 class="section-title">10 Baseline Models Evaluated</h2>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-top: 3rem;">

      <div class="card">
        <h4 style="font-weight: 600; margin-bottom: 0.5rem; color: var(--slate); font-size: 0.875rem;">FOUNDATION MODELS</h4>
        <ul style="list-style: none; padding: 0; margin: 0;">
          <li style="padding: 0.5rem 0; border-bottom: 1px solid var(--lavender-light);">DPOT-L (509M params)</li>
          <li style="padding: 0.5rem 0;">DPOT-S (30M params)</li>
        </ul>
      </div>

      <div class="card">
        <h4 style="font-weight: 600; margin-bottom: 0.5rem; color: var(--slate); font-size: 0.875rem;">NEURAL OPERATORS</h4>
        <ul style="list-style: none; padding: 0; margin: 0;">
          <li style="padding: 0.5rem 0; border-bottom: 1px solid var(--lavender-light);">FNO</li>
          <li style="padding: 0.5rem 0; border-bottom: 1px solid var(--lavender-light);">CNO</li>
          <li style="padding: 0.5rem 0; border-bottom: 1px solid var(--lavender-light);">DeepONet</li>
          <li style="padding: 0.5rem 0;">MWT, GK-Transformer, Transolver, WDNO</li>
        </ul>
      </div>

      <div class="card">
        <h4 style="font-weight: 600; margin-bottom: 0.5rem; color: var(--slate); font-size: 0.875rem;">TRADITIONAL & CNN</h4>
        <ul style="list-style: none; padding: 0; margin: 0;">
          <li style="padding: 0.5rem 0; border-bottom: 1px solid var(--lavender-light);">DMD</li>
          <li style="padding: 0.5rem 0;">U-Net</li>
        </ul>
      </div>

    </div>
  </div>
</section>

<div class="spacer-lg"></div>

<!-- Evaluation Metrics -->
<section id="evaluation-metrics" class="section">
  <div class="container">
    <p class="subtitle">Comprehensive Evaluation</p>
    <h2 class="section-title">8 Evaluation Metrics</h2>
    <p style="font-size: 1.125rem; color: var(--slate); max-width: 700px; margin-bottom: 3rem;">
      Both data-oriented and physics-oriented metrics provide comprehensive model assessment
    </p>

    <div class="rp-eval-grid">

      <div class="glass-card">
        <div class="rp-eval-card-body">
          <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1.5rem;">Data-Oriented</h3>
          <ul class="rp-metrics-list" aria-label="Data-oriented metrics (hover for definitions)">
            <li class="rp-metric-item" data-desc="Root Mean Square Error">
              <span class="rp-metric-abbr" tabindex="0">RMSE</span>
            </li>
            <li class="rp-metric-item" data-desc="Mean Absolute Error">
              <span class="rp-metric-abbr" tabindex="0">MAE</span>
            </li>
            <li class="rp-metric-item" data-desc="Relative L₂ Error">
              <span class="rp-metric-abbr" tabindex="0">Rel L₂</span>
            </li>
            <li class="rp-metric-item" data-desc="Coefficient of Determination">
              <span class="rp-metric-abbr" tabindex="0">R²</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="glass-card card-lavender">
        <div class="rp-eval-card-body">
          <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1.5rem;">Physics-Oriented</h3>
          <ul class="rp-metrics-list" aria-label="Physics-oriented metrics (hover for definitions)">
            <li class="rp-metric-item" data-desc="Fourier Space Error">
              <span class="rp-metric-abbr" tabindex="0">fRMSE</span>
            </li>
            <li class="rp-metric-item" data-desc="Frequency Error (Periodicity)">
              <span class="rp-metric-abbr" tabindex="0">FE</span>
            </li>
            <li class="rp-metric-item" data-desc="Kinetic Energy Error">
              <span class="rp-metric-abbr" tabindex="0">KE</span>
            </li>
            <li class="rp-metric-item" data-desc="Mean Velocity Profile Error">
              <span class="rp-metric-abbr" tabindex="0">MVPE</span>
            </li>
          </ul>
        </div>
      </div>

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
    <h2 class="section-title">Data, Code, and Reproducibility</h2>
    <p style="font-size: 1.25rem; color: var(--slate); margin-bottom: 2.25rem; max-width: 760px;">
      Access datasets, baselines, and evaluation scripts to reproduce results and benchmark new models on paired experiments and CFD simulations.
    </p>

    <div style="display: flex; gap: 1rem; justify-content: flex-start; flex-wrap: wrap;">
      <a href="getting-started/" class="btn-primary" style="font-size: 1.05rem; padding: 14px 32px;">
        Getting Started
      </a>
      <a href="datasets/" class="btn-secondary" style="font-size: 1.05rem; padding: 14px 28px; background: rgba(255,255,255,0.92);">
        Browse Datasets
      </a>
      <a href="https://github.com/realpdebench/realpdebench.github.io" class="btn-secondary" style="font-size: 1.05rem; padding: 14px 28px; background: rgba(255,255,255,0.92);">
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

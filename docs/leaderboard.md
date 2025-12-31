<div class="rp-leaderboard-fullbleed">
  <div class="rp-leaderboard-container">
    <h1 class="rp-leaderboard-title">Leaderboard</h1>
    <p class="rp-leaderboard-intro">
      Benchmark rankings on real-world test data, stratified by <strong>dataset</strong> and <strong>training paradigm</strong>.
      This page shows <strong>8 evaluation metrics</strong> in a two-column grid. Use <strong>Top 5</strong> / <strong>All</strong> to toggle how many models are shown for each metric.
    </p>

    <div class="rp-leaderboard" data-rp-leaderboard>
  <div class="rp-leaderboard-lead">
    Bars are sorted best → worst for each metric.
    Bar length is min–max normalized across <strong>all models</strong> in the current dataset + training paradigm (best = 100%).
    For error metrics (↓), smaller raw values correspond to longer bars; for R² (↑), larger values correspond to longer bars.
  </div>

  <div class="rp-leaderboard-controls" aria-label="Leaderboard controls">
    <div class="rp-leaderboard-control rp-leaderboard-control--dataset">
      <label class="rp-leaderboard-label" for="rp-leaderboard-dataset">Dataset</label>
      <select id="rp-leaderboard-dataset" class="rp-select" aria-label="Dataset"></select>
    </div>

    <div class="rp-leaderboard-control rp-leaderboard-control--paradigm">
      <span class="rp-leaderboard-label">Training paradigm</span>
      <div class="rp-seg" role="radiogroup" aria-label="Training paradigm">
        <button type="button" class="rp-seg-btn is-active" data-paradigm="simulated_training" aria-checked="true" role="radio"
          title="Trained on simulated (numerical/CFD) data; evaluated on real-world test data.">Simulated training</button>
        <button type="button" class="rp-seg-btn" data-paradigm="real_training" aria-checked="false" role="radio"
          title="Trained on real-world data; evaluated on real-world test data.">Real-world training</button>
        <button type="button" class="rp-seg-btn" data-paradigm="real_finetuning" aria-checked="false" role="radio"
          title="Simulated pretraining, then real-world finetuning; evaluated on real-world test data.">Real-world finetuning</button>
      </div>
    </div>

    <div class="rp-leaderboard-control rp-leaderboard-control--topk">
      <span class="rp-leaderboard-label">Show</span>
      <div class="rp-seg" role="radiogroup" aria-label="How many models to show">
        <button type="button" class="rp-seg-btn is-active" data-topk="5" aria-checked="true" role="radio">Top 5</button>
        <button type="button" class="rp-seg-btn" data-topk="999" aria-checked="false" role="radio">All</button>
      </div>
    </div>
  </div>

  <div class="rp-leaderboard-metric-grid" data-rp-leaderboard-metric-grid aria-live="polite">
    <div class="rp-benchmark-loading">Loading benchmark data…</div>
  </div>

  <div class="rp-leaderboard-footnote">
    <span class="rp-leaderboard-footnote-label">Notes:</span>
    Reported metrics are evaluated on real-world test data. Where unavailable, values are omitted.
  </div>
    </div>
  </div>
</div>


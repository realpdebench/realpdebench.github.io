/* RealPDEBench — Homepage Benchmark Results Module
 *
 * Loads `assets/data/benchmark_results.json` (generated from paper LaTeX)
 * and renders an interactive bar ranking on the homepage.
 *
 * Design goals:
 * - No hardcoded benchmark numbers in HTML.
 * - Safe on non-home pages (early exit if module not present).
 */

(function () {
  /** @param {string} sel */
  function qsa(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }

  /** @param {string} sel */
  function qs(sel, root) {
    return (root || document).querySelector(sel);
  }

  var moduleRoot = qs(".real-homepage [data-rp-benchmark]");
  if (!moduleRoot) return;

  var datasetSelect = qs("#rp-benchmark-dataset", moduleRoot);
  var metricSelect = qs("#rp-benchmark-metric", moduleRoot);
  var topkSelect = qs("#rp-benchmark-topk", moduleRoot);
  var chartRoot = qs("[data-rp-benchmark-chart]", moduleRoot);
  var paradigmBtns = qsa(".rp-seg-btn[data-paradigm]", moduleRoot);
  var metricHelpRoot = qs("[data-rp-benchmark-metric-help]", moduleRoot);
  var metricHelpAbbr = metricHelpRoot ? qs("[data-rp-benchmark-metric-abbr]", metricHelpRoot) : null;
  var metricHelpFull = metricHelpRoot ? qs("[data-rp-benchmark-metric-full]", metricHelpRoot) : null;
  var metricHelpDir = metricHelpRoot ? qs("[data-rp-benchmark-metric-dir]", metricHelpRoot) : null;
  var metricHelpDesc = metricHelpRoot ? qs("[data-rp-benchmark-metric-desc]", metricHelpRoot) : null;
  var paradigmHelpLabel = metricHelpRoot ? qs("[data-rp-benchmark-paradigm-label]", metricHelpRoot) : null;
  var paradigmHelpDesc = metricHelpRoot ? qs("[data-rp-benchmark-paradigm-desc]", metricHelpRoot) : null;

  // Optional radar module (only present on homepage Explore Results card).
  var radarRoot = qs("[data-rp-radar]", moduleRoot);
  var radarModelsRoot = radarRoot ? qs("[data-rp-radar-models]", radarRoot) : null;
  var radarChartHost = radarRoot ? qs("[data-rp-radar-chart]", radarRoot) : null;
  var radarNotesRoot = radarRoot ? qs("[data-rp-radar-notes]", radarRoot) : null;
  var radarTop5Btn = radarRoot ? qs("[data-rp-radar-top5]", radarRoot) : null;
  var radarAllBtn = radarRoot ? qs("[data-rp-radar-all]", radarRoot) : null;
  var radarClearBtn = radarRoot ? qs("[data-rp-radar-clear]", radarRoot) : null;

  if (!datasetSelect || !metricSelect || !topkSelect || !chartRoot || paradigmBtns.length === 0) return;

  var METRICS = {
    rmse: {
      key: "rmse",
      label: "RMSE",
      full: "Root Mean Square Error",
      desc: "Pointwise error between predicted and ground-truth fields.",
      direction: "lower",
      decimals: 4,
    },
    mae: {
      key: "mae",
      label: "MAE",
      full: "Mean Absolute Error",
      desc: "Average absolute error between predicted and ground-truth fields.",
      direction: "lower",
      decimals: 5,
    },
    rel_l2: {
      key: "rel_l2",
      label: "Rel L₂",
      full: "Relative L₂ Error",
      desc: "Relative (normalized) L₂ error between prediction and ground truth.",
      direction: "lower",
      decimals: 4,
    },
    r2: {
      key: "r2",
      label: "R²",
      full: "Coefficient of Determination",
      desc: "Goodness-of-fit measure; higher indicates better agreement.",
      direction: "higher",
      decimals: 5,
    },
    frmse: {
      key: "frmse",
      label: "fRMSE",
      full: "Fourier-space RMSE",
      desc: "RMSE computed in Fourier space (spectral error).",
      direction: "lower",
      decimals: 4,
    },
    fe: {
      key: "fe",
      label: "FE",
      full: "Frequency Error",
      desc: "Periodicity / dominant-frequency mismatch between prediction and ground truth.",
      direction: "lower",
      decimals: 2,
    },
    ke: {
      key: "ke",
      label: "KE",
      full: "Kinetic Energy Error",
      desc: "Error in kinetic energy statistics (physics-oriented).",
      direction: "lower",
      decimals: 5,
    },
    mvpe: {
      key: "mvpe",
      label: "MVPE",
      full: "Mean Velocity Profile Error",
      desc: "Error in mean velocity profiles (physics-oriented).",
      direction: "lower",
      decimals: 5,
    },
  };

  var PARADIGMS = {
    simulated_training: {
      key: "simulated_training",
      label: "Simulated training",
      desc: "trained on simulated (numerical/CFD) data.",
    },
    real_training: {
      key: "real_training",
      label: "Real-world training",
      desc: "trained on real-world experimental data.",
    },
    real_finetuning: {
      key: "real_finetuning",
      label: "Real-world finetuning",
      desc: "simulated pretraining → real-world finetuning.",
    },
  };

  var DATASET_ORDER = ["Cylinder", "Controlled Cylinder", "FSI", "Foil", "Combustion"];

  // Radar (multi-dimensional) comparison uses only reported benchmark fields.
  // All axes are min–max normalized within the current (dataset, paradigm) view.
  var RADAR_PALETTE = [
    "#7DA0D7",
    "#F1B38A",
    "#E59BA2",
    "#86C9C4",
    "#93C68D",
    "#C7A4DB",
    "#F0B8CD",
    "#B9B2A8",
    "#9ABBE2",
    "#E8D7A5",
    "#A6C2C1",
    "#D7A28E",
  ];

  var RADAR_AXES_BASE = [
    {
      key: "correlation",
      label: "Correlation",
      metrics: [{ key: "r2", direction: "higher", label: "R²" }],
      help: "R² (↑)",
      missingNote: "Correlation (R²) is not available for this selection.",
    },
    {
      key: "accuracy",
      label: "Accuracy",
      metrics: [
        { key: "rmse", direction: "lower", label: "RMSE" },
        { key: "mae", direction: "lower", label: "MAE" },
        { key: "rel_l2", direction: "lower", label: "Rel L₂" },
      ],
      help: "mean of RMSE/MAE/Rel L₂ (↓)",
      missingNote: "Accuracy axes are not available for this selection.",
    },
    {
      key: "physics",
      label: "Physics",
      metrics: [
        { key: "frmse", direction: "lower", label: "fRMSE" },
        { key: "fe", direction: "lower", label: "FE" },
        { key: "ke", direction: "lower", label: "KE" },
        { key: "mvpe", direction: "lower", label: "MVPE" },
      ],
      help: "mean of fRMSE/FE/KE/MVPE (↓)",
      missingNote: "Physics-oriented metrics are not available for this selection.",
    },
    {
      key: "update_eff",
      label: "Update\nEfficiency",
      metrics: [{ key: "update_ratio", direction: "lower", label: "Update Ratio" }],
      help: "Update Ratio (↓, finetuning only)",
      missingNote: "Update Ratio is only reported for Real-world finetuning (sim-pretraining → real finetuning).",
    },
    {
      key: "param_eff",
      label: "Parameter\nEfficiency",
      metrics: [{ key: "params_m", direction: "lower", label: "Params (M)" }],
      help: "fewer parameters (↓)",
      missingNote: "Parameter counts are not available for this selection.",
    },
  ];

  var state = {
    dataset: null,
    paradigm: "simulated_training",
    metric: metricSelect.value || "rmse",
    topk: Number(topkSelect.value) || 5,
    records: null,
    radar_selected: [],
    radar_hasUserSelection: false,
    model_order: [],
  };

  function formatParams(paramsM) {
    if (paramsM == null || Number.isNaN(paramsM)) return "—";
    // Keep one decimal like the paper tables (e.g., 23.0M)
    return String(paramsM.toFixed(1)) + "M params";
  }

  function formatValue(v, decimals) {
    if (v == null || Number.isNaN(v)) return "—";
    return Number(v).toFixed(decimals);
  }

  function setActiveParadigm(p) {
    state.paradigm = p;
    paradigmBtns.forEach(function (btn) {
      var isActive = btn.getAttribute("data-paradigm") === p;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-checked", isActive ? "true" : "false");
    });
    renderParadigmHelp();
    syncMetricAvailability();
    renderMetricHelp();
    render();
    renderRadar();
  }

  function uniq(arr) {
    var seen = Object.create(null);
    var out = [];
    arr.forEach(function (x) {
      if (seen[x]) return;
      seen[x] = true;
      out.push(x);
    });
    return out;
  }

  function isNumber(v) {
    return v != null && typeof v === "number" && !Number.isNaN(v);
  }

  function avg(xs) {
    if (!xs || xs.length === 0) return null;
    var sum = xs.reduce(function (a, b) {
      return a + b;
    }, 0);
    return sum / xs.length;
  }

  function colorForModel(model) {
    if (!model) return RADAR_PALETTE[0];
    var idx = state.model_order.indexOf(model);
    if (idx < 0) idx = 0;
    return RADAR_PALETTE[idx % RADAR_PALETTE.length];
  }

  function sortDatasets(datasets) {
    return datasets.sort(function (a, b) {
      var ia = DATASET_ORDER.indexOf(a);
      var ib = DATASET_ORDER.indexOf(b);
      if (ia === -1 && ib === -1) return a.localeCompare(b);
      if (ia === -1) return 1;
      if (ib === -1) return -1;
      return ia - ib;
    });
  }

  function populateDatasets(records) {
    var datasets = uniq(
      records
        .map(function (r) {
          return r.dataset;
        })
        .filter(Boolean)
    );

    sortDatasets(datasets);
    datasetSelect.innerHTML = "";
    datasets.forEach(function (ds) {
      var opt = document.createElement("option");
      opt.value = ds;
      opt.textContent = ds;
      datasetSelect.appendChild(opt);
    });

    state.dataset = state.dataset && datasets.indexOf(state.dataset) >= 0 ? state.dataset : datasets[0] || null;
    if (state.dataset) datasetSelect.value = state.dataset;
  }

  function filteredRecords() {
    if (!state.records || !state.dataset) return [];
    return state.records.filter(function (r) {
      return r.dataset === state.dataset && r.paradigm === state.paradigm;
    });
  }

  function radarIsComparableRecord(r) {
    // Require at least one reported performance metric (avoid comparing models with only params).
    return (
      isNumber(r.rmse) ||
      isNumber(r.mae) ||
      isNumber(r.rel_l2) ||
      isNumber(r.r2) ||
      isNumber(r.frmse) ||
      isNumber(r.fe) ||
      isNumber(r.ke) ||
      isNumber(r.mvpe)
    );
  }

  function radarSelectionRecords() {
    var rows = filteredRecords();
    return rows.filter(function (r) {
      return r && r.model && radarIsComparableRecord(r);
    });
  }

  function metricStats(rows, key) {
    var vals = rows
      .map(function (r) {
        return r[key];
      })
      .filter(isNumber);

    // Need at least 2 values to make min–max normalization meaningful.
    if (vals.length < 2) return null;

    var minV = Math.min.apply(null, vals);
    var maxV = Math.max.apply(null, vals);
    return { min: minV, max: maxV, n: vals.length };
  }

  function norm01(v, stats, direction) {
    if (!isNumber(v) || !stats) return null;
    var minV = stats.min;
    var maxV = stats.max;
    if (maxV === minV) return 1;
    if (direction === "higher") return (v - minV) / (maxV - minV);
    return (maxV - v) / (maxV - minV);
  }

  function computeRadarAxes(rows) {
    var metricKeys = [
      "r2",
      "rmse",
      "mae",
      "rel_l2",
      "frmse",
      "fe",
      "ke",
      "mvpe",
      "update_ratio",
      "params_m",
    ];

    var statsBy = Object.create(null);
    metricKeys.forEach(function (k) {
      statsBy[k] = metricStats(rows, k);
    });

    var notes = [];
    var axes = [];

    RADAR_AXES_BASE.forEach(function (axis) {
      var metrics = axis.metrics.filter(function (m) {
        return !!statsBy[m.key];
      });

      if (metrics.length === 0) {
        if (axis.missingNote) notes.push(axis.missingNote);
        return;
      }

      axes.push({
        key: axis.key,
        label: axis.label,
        metrics: metrics,
        help: axis.help,
      });
    });

    return { axes: axes, statsBy: statsBy, notes: notes };
  }

  function computeRadarModelScores(rows, axes, statsBy) {
    return rows
      .map(function (r) {
        var axisScores = Object.create(null);
        var present = [];

        axes.forEach(function (axis) {
          var parts = axis.metrics
            .map(function (m) {
              return norm01(r[m.key], statsBy[m.key], m.direction);
            })
            .filter(function (x) {
              return x != null && !Number.isNaN(x);
            });

          var score = parts.length ? avg(parts) : null;
          axisScores[axis.key] = score;
          if (score != null) present.push(score);
        });

        return {
          model: r.model,
          color: colorForModel(r.model),
          axis: axisScores,
          overall: present.length ? avg(present) : null,
        };
      })
      .filter(function (x) {
        return x.model;
      });
  }

  function setRadarSelected(models) {
    state.radar_selected = models.slice();
  }

  function ensureRadarSelection(entries) {
    // Keep previous selection if possible; otherwise default to Top 5 by overall score.
    var available = entries
      .filter(function (e) {
        return e.overall != null && !Number.isNaN(e.overall);
      })
      .sort(function (a, b) {
        return b.overall - a.overall;
      });

    var availableNames = available.map(function (e) {
      return e.model;
    });

    var keep = state.radar_selected.filter(function (m) {
      return availableNames.indexOf(m) >= 0;
    });

    if (keep.length > 0) {
      setRadarSelected(keep);
      return;
    }

    // If the user explicitly interacted with radar selection, keep empty selection.
    if (state.radar_hasUserSelection) {
      setRadarSelected([]);
      return;
    }

    var top = available.slice(0, 5).map(function (e) {
      return e.model;
    });
    setRadarSelected(top);
  }

  function renderRadarNotes(axes, notes) {
    if (!radarNotesRoot) return;

    var html = "";
    html += '<div class="rp-radar-note-title">How we compute the axes</div>';
    html += '<ul class="rp-radar-note-list">';
    axes.forEach(function (a) {
      html +=
        '<li><span class="rp-radar-note-axis">' +
        (a.label || "") +
        "</span>: <span class=\"rp-radar-note-help\">" +
        (a.help || "") +
        "</span></li>";
    });
    html += "</ul>";

    var extra = [];
    extra.push("Only models with available values on all shown axes are included in the radar.");
    if (notes && notes.length) extra = extra.concat(notes);

    if (extra.length) {
      html += '<div class="rp-radar-note-muted">';
      html +=
        extra
          .map(function (n) {
            return "• " + n;
          })
          .join("<br>");
      html += "</div>";
    }

    radarNotesRoot.innerHTML = html;
  }

  function renderRadarChips(entries) {
    if (!radarModelsRoot) return;

    radarModelsRoot.innerHTML = "";

    var sorted = entries
      .filter(function (e) {
        return e.overall != null && !Number.isNaN(e.overall);
      })
      .slice()
      .sort(function (a, b) {
        return b.overall - a.overall;
      });

    sorted.forEach(function (e) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "rp-model-chip";
      btn.setAttribute("data-rp-radar-model", e.model);

      var isOn = state.radar_selected.indexOf(e.model) >= 0;
      btn.classList.toggle("is-selected", isOn);
      btn.setAttribute("aria-pressed", isOn ? "true" : "false");
      btn.style.setProperty("--rp-chip-color", e.color);

      var check = document.createElement("span");
      check.className = "rp-chip-check";
      check.setAttribute("aria-hidden", "true");

      var dot = document.createElement("span");
      dot.className = "rp-chip-dot";
      dot.setAttribute("aria-hidden", "true");

      var label = document.createElement("span");
      label.className = "rp-chip-label";
      label.textContent = e.model;

      btn.appendChild(check);
      btn.appendChild(dot);
      btn.appendChild(label);

      btn.addEventListener("click", function () {
        state.radar_hasUserSelection = true;
        var name = e.model;
        var idx = state.radar_selected.indexOf(name);
        if (idx >= 0) {
          state.radar_selected.splice(idx, 1);
        } else {
          state.radar_selected.push(name);
        }
        renderRadar();
      });

      radarModelsRoot.appendChild(btn);
    });
  }

  function svgEl(name) {
    return document.createElementNS("http://www.w3.org/2000/svg", name);
  }

  function renderRadarChart(axes, selectedEntries) {
    if (!radarChartHost) return;

    radarChartHost.innerHTML = "";

    if (!axes || axes.length < 3) {
      var msg = document.createElement("div");
      msg.className = "rp-benchmark-loading";
      msg.textContent = "Radar chart needs at least 3 available axes for this selection.";
      radarChartHost.appendChild(msg);
      return;
    }

    if (!selectedEntries || selectedEntries.length === 0) {
      var empty = document.createElement("div");
      empty.className = "rp-benchmark-loading";
      empty.textContent = "Select one or more models to compare.";
      radarChartHost.appendChild(empty);
      return;
    }

    var W = 640;
    var H = 520;
    var cx = Math.round(W / 2);
    var cy = Math.round(H / 2);
    var R = 190;
    var labelPad = 22;

    var svg = svgEl("svg");
    svg.setAttribute("class", "rp-radar-svg");
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", "Radar chart comparing selected models across performance axes.");

    var n = axes.length;

    function angleAt(i) {
      // Start at 12 o'clock.
      return (-Math.PI / 2) + (i * 2 * Math.PI) / n;
    }

    function pointAt(i, t) {
      var ang = angleAt(i);
      return {
        x: cx + Math.cos(ang) * R * t,
        y: cy + Math.sin(ang) * R * t,
      };
    }

    // Grid rings.
    [0.2, 0.4, 0.6, 0.8, 1].forEach(function (t) {
      var poly = svgEl("polygon");
      poly.setAttribute("class", "rp-radar-grid");
      var pts = [];
      for (var i = 0; i < n; i++) {
        var p = pointAt(i, t);
        pts.push(p.x.toFixed(2) + "," + p.y.toFixed(2));
      }
      poly.setAttribute("points", pts.join(" "));
      svg.appendChild(poly);
    });

    // Axes + labels.
    for (var i = 0; i < n; i++) {
      var end = pointAt(i, 1);

      var axisLine = svgEl("line");
      axisLine.setAttribute("class", "rp-radar-axis");
      axisLine.setAttribute("x1", String(cx));
      axisLine.setAttribute("y1", String(cy));
      axisLine.setAttribute("x2", end.x.toFixed(2));
      axisLine.setAttribute("y2", end.y.toFixed(2));
      svg.appendChild(axisLine);

      var labelPt = pointAt(i, 1);
      var ang = angleAt(i);
      var lx = cx + Math.cos(ang) * (R + labelPad);
      var ly = cy + Math.sin(ang) * (R + labelPad);

      var text = svgEl("text");
      text.setAttribute("class", "rp-radar-label");
      text.setAttribute("x", lx.toFixed(2));
      text.setAttribute("y", ly.toFixed(2));
      var rawLabel = axes[i].label == null ? "" : String(axes[i].label);
      var lines = rawLabel
        .split("\n")
        .map(function (s) {
          return s.trim();
        })
        .filter(Boolean);

      if (lines.length <= 1) {
        text.textContent = rawLabel;
      } else {
        // Multi-line labels via <tspan> so long axis names don't get clipped.
        lines.forEach(function (line, idx) {
          var tspan = svgEl("tspan");
          tspan.setAttribute("x", lx.toFixed(2));
          tspan.setAttribute("dy", idx === 0 ? "0" : "1.15em");
          tspan.textContent = line;
          text.appendChild(tspan);
        });
      }

      // Better anchoring depending on side.
      var cos = Math.cos(ang);
      if (Math.abs(cos) < 0.15) {
        text.setAttribute("text-anchor", "middle");
      } else {
        text.setAttribute("text-anchor", cos > 0 ? "start" : "end");
      }

      // Vertical offset so top/bottom labels don't collide with the line.
      var sin = Math.sin(ang);
      if (Math.abs(sin) > 0.75) {
        text.setAttribute("dominant-baseline", sin > 0 ? "hanging" : "auto");
      } else {
        text.setAttribute("dominant-baseline", "middle");
      }

      svg.appendChild(text);
    }

    // Tooltip (HTML overlay).
    var tooltip = document.createElement("div");
    tooltip.className = "rp-radar-tooltip";
    tooltip.setAttribute("role", "tooltip");
    tooltip.style.display = "none";

    // Model polygons.
    selectedEntries.forEach(function (e) {
      var poly = svgEl("polygon");
      poly.setAttribute("class", "rp-radar-model");
      poly.setAttribute("data-model", e.model);
      poly.style.stroke = e.color;
      poly.style.fill = e.color;
      poly.style.fillOpacity = "0.10";
      poly.style.strokeOpacity = "0.85";

      var pts = [];
      for (var i = 0; i < n; i++) {
        var a = axes[i];
        var v = e.axis[a.key];
        var t = v == null || Number.isNaN(v) ? 0 : Math.max(0, Math.min(1, v));
        var p = pointAt(i, t);
        pts.push(p.x.toFixed(2) + "," + p.y.toFixed(2));
      }
      poly.setAttribute("points", pts.join(" "));

      poly.addEventListener("mouseenter", function (ev) {
        tooltip.textContent = e.model;
        tooltip.style.display = "block";
      });

      poly.addEventListener("mousemove", function (ev) {
        var rect = radarChartHost.getBoundingClientRect();
        var x = ev.clientX - rect.left;
        var y = ev.clientY - rect.top;
        tooltip.style.left = Math.max(8, Math.min(rect.width - 140, x + 12)) + "px";
        tooltip.style.top = Math.max(8, y + 12) + "px";
      });

      poly.addEventListener("mouseleave", function () {
        tooltip.style.display = "none";
      });

      svg.appendChild(poly);
    });

    radarChartHost.appendChild(svg);
    radarChartHost.appendChild(tooltip);
  }

  function renderRadar() {
    if (!radarRoot || !radarModelsRoot || !radarChartHost || !radarNotesRoot) return;

    if (!state.records || !state.dataset) {
      radarModelsRoot.innerHTML = "";
      radarChartHost.innerHTML = '<div class="rp-benchmark-loading">Loading radar data…</div>';
      radarNotesRoot.innerHTML = "";
      return;
    }

    var rows = radarSelectionRecords();
    if (rows.length === 0) {
      radarModelsRoot.innerHTML = "";
      radarChartHost.innerHTML = '<div class="rp-benchmark-loading">No comparable models for this selection.</div>';
      radarNotesRoot.innerHTML = "";
      return;
    }

    var computed = computeRadarAxes(rows);
    var axes = computed.axes;
    var statsBy = computed.statsBy;
    var notes = computed.notes;

    var entries = computeRadarModelScores(rows, axes, statsBy);

    // Keep only models that have all axis values (avoid treating missing as zero in the polygon).
    var completeEntries = entries.filter(function (e) {
      return axes.every(function (a) {
        var v = e.axis[a.key];
        return v != null && !Number.isNaN(v);
      });
    });

    if (completeEntries.length === 0) {
      radarModelsRoot.innerHTML = "";
      radarChartHost.innerHTML = '<div class="rp-benchmark-loading">No models have complete radar axes for this selection.</div>';
      renderRadarNotes(axes, notes);
      return;
    }

    ensureRadarSelection(completeEntries);

    renderRadarNotes(axes, notes);
    renderRadarChips(completeEntries);

    var selectedEntries = completeEntries.filter(function (e) {
      return state.radar_selected.indexOf(e.model) >= 0;
    });
    renderRadarChart(axes, selectedEntries);
  }

  function metricConfig() {
    return METRICS[state.metric] || METRICS.rmse;
  }

  function metricDirectionLabel(direction) {
    return direction === "higher" ? "(↑ higher is better)" : "(↓ lower is better)";
  }

  function renderMetricHelp() {
    if (!metricHelpRoot) return;
    var m = metricConfig();
    if (metricHelpAbbr) metricHelpAbbr.textContent = m.label || "";
    if (metricHelpFull) metricHelpFull.textContent = m.full || "";
    if (metricHelpDir) metricHelpDir.textContent = metricDirectionLabel(m.direction);
    if (metricHelpDesc) metricHelpDesc.textContent = m.desc || "";
  }

  function renderParadigmHelp() {
    if (!metricHelpRoot) return;
    var p = PARADIGMS[state.paradigm] || PARADIGMS.simulated_training;
    if (paradigmHelpLabel) paradigmHelpLabel.textContent = p.label || "";
    if (paradigmHelpDesc) paradigmHelpDesc.textContent = p.desc || "";
  }

  function syncMetricAvailability() {
    // Enable/disable metrics depending on whether data exists for current dataset+paradigm.
    if (!state.records || !state.dataset) return;
    var sel = filteredRecords();

    function hasMetric(m) {
      return sel.some(function (r) {
        var v = r[m.key];
        return v != null && !Number.isNaN(v);
      });
    }

    var enabledAny = false;
    Object.keys(METRICS).forEach(function (k) {
      var m = METRICS[k];
      var opt = metricSelect.querySelector("option[value='" + k + "']");
      if (!opt) return;
      var enabled = hasMetric(m);
      opt.disabled = !enabled;
      opt.title = enabled ? "" : "Not available for this selection.";
      if (enabled) enabledAny = true;
    });

    if (!enabledAny) return;

    // If currently selected metric is disabled, fall back to the first enabled option.
    var currentOpt = metricSelect.querySelector("option[value='" + state.metric + "']");
    if (currentOpt && currentOpt.disabled) {
      var firstEnabled = metricSelect.querySelector("option:not([disabled])");
      if (firstEnabled) {
        state.metric = firstEnabled.value;
        metricSelect.value = firstEnabled.value;
      }
    }
  }

  function render() {
    if (!state.records) return;

    var metric = metricConfig();
    var itemsAll = filteredRecords()
      .map(function (r) {
        return {
          model: r.model,
          params_m: r.params_m,
          value: r[metric.key],
        };
      })
      .filter(function (x) {
        return x.model && x.value != null && !Number.isNaN(x.value);
      });

    // Sort depending on metric direction.
    if (metric.direction === "higher") {
      itemsAll.sort(function (a, b) {
        return b.value - a.value;
      });
    } else {
      itemsAll.sort(function (a, b) {
        return a.value - b.value;
      });
    }

    // Display can be Top-k, but bar normalization should be consistent with "All models"
    // within the current (dataset, training paradigm, metric) selection.
    var itemsShown = itemsAll;
    if (state.topk && itemsAll.length > state.topk) {
      itemsShown = itemsAll.slice(0, state.topk);
    }

    chartRoot.innerHTML = "";

    if (itemsShown.length === 0) {
      var empty = document.createElement("div");
      empty.className = "rp-benchmark-loading";
      empty.textContent = "No data for this selection.";
      chartRoot.appendChild(empty);
      return;
    }

    // Compute bar widths (best = longest bar), normalized over ALL models in the selection.
    var values = itemsAll.map(function (x) {
      return x.value;
    });
    var minV = Math.min.apply(null, values);
    var maxV = Math.max.apply(null, values);

    function widthPct(v) {
      if (maxV === minV) return 100;
      if (metric.direction === "higher") {
        // Best (max) => 100%; Worst (min) => 0%
        return ((v - minV) / (maxV - minV)) * 100;
      }
      // Best (min) => 100%; Worst (max) => 0%
      return ((maxV - v) / (maxV - minV)) * 100;
    }

    itemsShown.forEach(function (it, idx) {
      var row = document.createElement("div");
      row.className = "rp-bar-row";

      var rank = document.createElement("div");
      rank.className = "rp-bar-rank";
      rank.textContent = String(idx + 1);

      var label = document.createElement("div");
      label.className = "rp-bar-label";

      var model = document.createElement("div");
      model.className = "rp-bar-model";
      model.textContent = it.model;

      var params = document.createElement("div");
      params.className = "rp-bar-params";
      params.textContent = formatParams(it.params_m);

      label.appendChild(model);
      label.appendChild(params);

      var track = document.createElement("div");
      track.className = "rp-bar-track";
      track.setAttribute("role", "img");
      track.setAttribute("aria-label", it.model + " " + metric.label + " " + formatValue(it.value, metric.decimals));

      var fill = document.createElement("div");
      fill.className = "rp-bar-fill";
      fill.style.width = widthPct(it.value).toFixed(1) + "%";
      track.appendChild(fill);

      var val = document.createElement("div");
      val.className = "rp-bar-value";
      val.textContent = formatValue(it.value, metric.decimals);

      row.appendChild(rank);
      row.appendChild(label);
      row.appendChild(track);
      row.appendChild(val);

      chartRoot.appendChild(row);
    });
  }

  function setError(msg) {
    chartRoot.innerHTML = "";
    var el = document.createElement("div");
    el.className = "rp-benchmark-loading";
    el.textContent = msg;
    chartRoot.appendChild(el);

    if (radarModelsRoot) radarModelsRoot.innerHTML = "";
    if (radarChartHost) radarChartHost.innerHTML = "";
    if (radarNotesRoot) radarNotesRoot.innerHTML = "";
  }

  function load() {
    // Use origin-rooted path so the script is safe on subpages (avoid `datasets/assets/...`).
    var url = new URL("/assets/data/benchmark_results.json", window.location.origin).toString();
    fetch(url, { cache: "no-store" })
      .then(function (r) {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.json();
      })
      .then(function (data) {
        if (!data || !Array.isArray(data.records)) {
          throw new Error("Invalid benchmark JSON schema.");
        }
        state.records = data.records;
        state.model_order = uniq(
          state.records
            .map(function (r) {
              return r.model;
            })
            .filter(Boolean)
        ).sort(function (a, b) {
          return a.localeCompare(b);
        });
        populateDatasets(state.records);
        syncMetricAvailability();
        renderParadigmHelp();
        renderMetricHelp();
        render();
        renderRadar();

        if (radarTop5Btn) {
          radarTop5Btn.addEventListener("click", function () {
            if (!state.records) return;
            var rows = radarSelectionRecords();
            if (rows.length === 0) return;
            var computed = computeRadarAxes(rows);
            var axes = computed.axes;
            var entries = computeRadarModelScores(rows, axes, computed.statsBy)
              .filter(function (e) {
                return (
                  e.overall != null &&
                  !Number.isNaN(e.overall) &&
                  axes.every(function (a) {
                    var v = e.axis[a.key];
                    return v != null && !Number.isNaN(v);
                  })
                );
              })
              .sort(function (a, b) {
                return b.overall - a.overall;
              });
            if (entries.length === 0) return;
            state.radar_hasUserSelection = true;
            setRadarSelected(
              entries.slice(0, 5).map(function (e) {
                return e.model;
              })
            );
            renderRadar();
          });
        }

        if (radarAllBtn) {
          radarAllBtn.addEventListener("click", function () {
            if (!state.records) return;
            var rows = radarSelectionRecords();
            if (rows.length === 0) return;
            var computed = computeRadarAxes(rows);
            var axes = computed.axes;
            var entries = computeRadarModelScores(rows, axes, computed.statsBy)
              .filter(function (e) {
                return (
                  e.overall != null &&
                  !Number.isNaN(e.overall) &&
                  axes.every(function (a) {
                    var v = e.axis[a.key];
                    return v != null && !Number.isNaN(v);
                  })
                );
              })
              .sort(function (a, b) {
                return b.overall - a.overall;
              });
            if (entries.length === 0) return;
            state.radar_hasUserSelection = true;
            setRadarSelected(
              entries.map(function (e) {
                return e.model;
              })
            );
            renderRadar();
          });
        }

        if (radarClearBtn) {
          radarClearBtn.addEventListener("click", function () {
            state.radar_hasUserSelection = true;
            setRadarSelected([]);
            renderRadar();
          });
        }
      })
      .catch(function (err) {
        setError("Failed to load benchmark data: " + (err && err.message ? err.message : String(err)));
      });
  }

  datasetSelect.addEventListener("change", function () {
    state.dataset = datasetSelect.value;
    syncMetricAvailability();
    renderMetricHelp();
    render();
    renderRadar();
  });

  metricSelect.addEventListener("change", function () {
    state.metric = metricSelect.value;
    // Prevent selecting a metric that has no data for the current dataset/paradigm.
    syncMetricAvailability();
    renderMetricHelp();
    render();
  });

  topkSelect.addEventListener("change", function () {
    state.topk = Number(topkSelect.value) || 5;
    render();
  });

  paradigmBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var p = btn.getAttribute("data-paradigm");
      if (p) setActiveParadigm(p);
    });
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", load);
  } else {
    load();
  }
})();



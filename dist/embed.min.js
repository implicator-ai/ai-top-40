(function () {
  "use strict";

  var DATA_URL =
    "https://cdn.jsdelivr.net/gh/implicator-ai/ai-top-40@main/data/latest.json";

  var STYLES = [
    ":host { display: block; }",
    "*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }",
    ".ait40-wrap { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1A1814; line-height: 1.4; }",
    ".ait40-wrap.dark { background: #1E1B18; color: #F5F1EB; }",

    /* Header */
    ".ait40-header { display: flex; align-items: baseline; gap: 8px; margin-bottom: 16px; }",
    ".ait40-title { font-size: 18px; font-weight: 700; }",
    ".ait40-date { font-size: 12px; color: #8A8580; }",

    /* List */
    ".ait40-list { list-style: none; }",
    ".ait40-row { display: flex; align-items: center; gap: 12px; padding: 8px 0; border-bottom: 1px solid #E8E4DF; }",
    ".dark .ait40-row { border-bottom-color: #3A3530; }",

    /* Rank circle */
    ".ait40-rank { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; flex-shrink: 0; color: #1A1814; border: 1.5px solid #D4CFC7; background: transparent; }",
    ".ait40-rank.r1 { background: #E8372D; color: #fff; border-color: #E8372D; }",
    ".ait40-rank.r2, .ait40-rank.r3 { background: #1A1814; color: #fff; border-color: #1A1814; }",
    ".dark .ait40-rank { border-color: #5A5550; color: #F5F1EB; }",
    ".dark .ait40-rank.r1 { background: #E8372D; color: #fff; border-color: #E8372D; }",
    ".dark .ait40-rank.r2, .dark .ait40-rank.r3 { background: #F5F1EB; color: #1A1814; border-color: #F5F1EB; }",

    /* Change indicator */
    ".ait40-change { font-size: 11px; font-weight: 600; width: 40px; text-align: center; flex-shrink: 0; }",
    ".ait40-change.up { color: #4CAF50; }",
    ".ait40-change.down { color: #E8372D; }",
    ".ait40-change.new { background: #E8372D; color: #fff; font-size: 9px; font-weight: 700; padding: 2px 5px; border-radius: 3px; text-transform: uppercase; letter-spacing: 0.5px; }",
    ".ait40-change.same { color: #8A8580; }",

    /* Model info */
    ".ait40-info { flex: 1; min-width: 0; }",
    ".ait40-model { font-size: 14px; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }",
    ".ait40-lab { font-size: 11px; color: #8A8580; }",

    /* Score */
    ".ait40-score { font-size: 14px; font-weight: 700; text-align: right; flex-shrink: 0; min-width: 36px; }",
    ".ait40-score.top { color: #E8372D; }",

    /* Column header */
    ".ait40-colheader { display: flex; align-items: center; gap: 12px; padding: 0 0 6px; margin-bottom: 2px; border-bottom: 2px solid #D4CFC7; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #8A8580; }",
    ".dark .ait40-colheader { border-bottom-color: #5A5550; }",
    ".ait40-colheader-rank { width: 32px; flex-shrink: 0; text-align: center; }",
    ".ait40-colheader-change { width: 40px; flex-shrink: 0; text-align: center; }",
    ".ait40-colheader-model { flex: 1; min-width: 0; padding-left: 4px; }",
    ".ait40-colheader-score { min-width: 36px; text-align: right; flex-shrink: 0; }",

    /* Description row below column header */
    ".ait40-coldesc { display: flex; align-items: center; gap: 12px; padding: 4px 0 6px; font-size: 9px; color: #A09890; letter-spacing: 0.02em; }",
    ".ait40-coldesc-rank { width: 32px; flex-shrink: 0; text-align: center; }",
    ".ait40-coldesc-change { width: 40px; flex-shrink: 0; text-align: center; }",
    ".ait40-coldesc-model { flex: 1; min-width: 0; padding-left: 4px; }",
    ".ait40-coldesc-score { min-width: 36px; text-align: right; flex-shrink: 0; }",

    /* Footer */
    ".ait40-footer { margin-top: 12px; padding-top: 10px; border-top: 1px solid #E8E4DF; text-align: right; }",
    ".dark .ait40-footer { border-top-color: #3A3530; }",
    ".ait40-footer a { font-size: 11px; font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace; color: #8A8580; text-decoration: none; }",
    ".ait40-footer a:hover { text-decoration: underline; }",

    /* Combo layout */
    ".ait40-combo { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 24px; }",
    "@media (max-width: 700px) { .ait40-combo { grid-template-columns: 1fr; } }",
    ".ait40-combo .ait40-board { min-width: 0; }",

    /* Error state */
    ".ait40-error { padding: 16px; text-align: center; color: #8A8580; font-size: 13px; }",
  ].join("\n");

  /* ---- Helpers ---- */

  function getChange(model, displayRank) {
    if (model.is_new) return '<span class="ait40-change new">NEW</span>';
    if (model.prev_rank === null || model.prev_rank === undefined)
      return '<span class="ait40-change same">&mdash;</span>';
    /* We need to compute the change relative to the filtered list.
       Since prev_rank is from the overall chart, we just show the
       overall direction (up/down/same) based on overall rank shift. */
    var diff = model.prev_rank - model.rank;
    if (diff > 0)
      return '<span class="ait40-change up">&blacktriangle;' + diff + "</span>";
    if (diff < 0)
      return (
        '<span class="ait40-change down">&blacktriangledown;' +
        Math.abs(diff) +
        "</span>"
      );
    return '<span class="ait40-change same">&mdash;</span>';
  }

  function renderBoard(models, title, chartDate, limit, isDark) {
    var themeClass = isDark ? "ait40-wrap dark" : "ait40-wrap";
    var html = '<div class="' + themeClass + '">';
    html += '<div class="ait40-header">';
    html += '<span class="ait40-title">' + escapeHtml(title) + "</span>";
    if (chartDate)
      html += '<span class="ait40-date">' + escapeHtml(chartDate) + "</span>";
    html += "</div>";

    html += '<div class="ait40-colheader">';
    html += '<span class="ait40-colheader-rank">#</span>';
    html += '<span class="ait40-colheader-change">\u25B2\u25BC</span>';
    html += '<span class="ait40-colheader-model">Model</span>';
    html += '<span class="ait40-colheader-score">Score</span>';
    html += '</div>';
    html += '<div class="ait40-coldesc">';
    html += '<span class="ait40-coldesc-rank">Rank</span>';
    html += '<span class="ait40-coldesc-change">Change</span>';
    html += '<span class="ait40-coldesc-model">Name &middot; Lab</span>';
    html += '<span class="ait40-coldesc-score">0\u2013100</span>';
    html += '</div>';

    var items = models.slice(0, limit);
    html += '<ol class="ait40-list">';
    for (var i = 0; i < items.length; i++) {
      var m = items[i];
      var displayRank = i + 1;
      var rankClass = "ait40-rank";
      if (displayRank === 1) rankClass += " r1";
      else if (displayRank === 2) rankClass += " r2";
      else if (displayRank === 3) rankClass += " r3";

      var scoreText = Math.round(m.score);
      var scoreClass = displayRank === 1 ? "ait40-score top" : "ait40-score";

      html += '<li class="ait40-row">';
      html += '<span class="' + rankClass + '">' + displayRank + "</span>";
      html += getChange(m, displayRank);
      html += '<div class="ait40-info">';
      html += '<div class="ait40-model">' + escapeHtml(m.name) + "</div>";
      html += '<div class="ait40-lab">' + escapeHtml(m.lab) + "</div>";
      html += "</div>";
      html +=
        '<span class="' + scoreClass + '">' + scoreText + "</span>";
      html += "</li>";
    }
    html += "</ol>";

    html += '<div class="ait40-footer">';
    html +=
      '<a href="https://implicator.ai" target="_blank" rel="noopener">presented by implicator.ai</a>';
    html += "</div>";
    html += "</div>";
    return html;
  }

  function escapeHtml(str) {
    var d = document.createElement("div");
    d.appendChild(document.createTextNode(str));
    return d.innerHTML;
  }

  function filterModels(models, type) {
    if (type === "open") return models.filter(function (m) { return m.is_open_weight; });
    if (type === "commercial") return models.filter(function (m) { return !m.is_open_weight; });
    return models;
  }

  function titleForType(type) {
    if (type === "open") return "AI Top 40 \u2014 Open Weights";
    if (type === "commercial") return "AI Top 40 \u2014 Commercial";
    return "AI Top 40";
  }

  /* ---- Tracking ---- */

  function sendPing(types) {
    try {
      var domain = window.location.hostname || "localhost";
      var img = new Image();
      img.src =
        "https://ttn.relusch.com/api/embed-ping?d=" +
        encodeURIComponent(domain) +
        "&c=" +
        encodeURIComponent(types.join(",")) +
        "&v=1";
    } catch (e) {
      /* silently ignore */
    }
  }

  /* ---- Main ---- */

  function init() {
    var widgets = document.querySelectorAll("[data-ai-top-40]");
    if (!widgets.length) return;

    /* Collect chart types for the single tracking ping */
    var types = [];
    for (var i = 0; i < widgets.length; i++) {
      var t = widgets[i].getAttribute("data-ai-top-40") || "all";
      if (types.indexOf(t) === -1) types.push(t);
    }
    sendPing(types);

    /* Determine data URL -- allow override for local testing */
    var url = DATA_URL;
    var script = document.querySelector("script[data-ai-top-40-src]");
    if (script) url = script.getAttribute("data-ai-top-40-src");

    /* Fetch data once, render all widgets */
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = function () {
      if (xhr.status !== 200) {
        renderError(widgets, "Failed to load chart data.");
        return;
      }
      var data;
      try {
        data = JSON.parse(xhr.responseText);
      } catch (e) {
        renderError(widgets, "Invalid chart data.");
        return;
      }
      renderAll(widgets, data);
    };
    xhr.onerror = function () {
      renderError(widgets, "Network error loading chart data.");
    };
    xhr.send();
  }

  function renderError(widgets, msg) {
    for (var i = 0; i < widgets.length; i++) {
      var shadow = widgets[i].attachShadow({ mode: "open" });
      var style = document.createElement("style");
      style.textContent = STYLES;
      shadow.appendChild(style);
      var div = document.createElement("div");
      div.innerHTML = '<div class="ait40-error">' + escapeHtml(msg) + "</div>";
      shadow.appendChild(div);
    }
  }

  function renderAll(widgets, data) {
    var models = data.models || [];
    var chartDate = data.chart_date || "";

    for (var i = 0; i < widgets.length; i++) {
      var el = widgets[i];
      var type = (el.getAttribute("data-ai-top-40") || "all").toLowerCase();
      var limit = parseInt(el.getAttribute("data-limit"), 10) || 10;
      var theme = (el.getAttribute("data-theme") || "light").toLowerCase();
      var isDark = theme === "dark";

      var shadow = el.attachShadow({ mode: "open" });
      var style = document.createElement("style");
      style.textContent = STYLES;
      shadow.appendChild(style);

      var container = document.createElement("div");

      if (type === "combo") {
        var openModels = filterModels(models, "open");
        var allModels = filterModels(models, "all");
        var commercialModels = filterModels(models, "commercial");
        var themeClass = isDark ? "ait40-wrap dark" : "ait40-wrap";

        var html = '<div class="' + themeClass + '">';
        html += '<div class="ait40-combo">';
        html += '<div class="ait40-board">' + renderBoard(openModels, "Open Weights", chartDate, limit, isDark) + "</div>";
        html += '<div class="ait40-board">' + renderBoard(allModels, "All Models", chartDate, limit, isDark) + "</div>";
        html += '<div class="ait40-board">' + renderBoard(commercialModels, "Commercial", chartDate, limit, isDark) + "</div>";
        html += "</div>";
        html += "</div>";
        container.innerHTML = html;
      } else {
        var filtered = filterModels(models, type);
        container.innerHTML = renderBoard(
          filtered,
          titleForType(type),
          chartDate,
          limit,
          isDark
        );
      }

      shadow.appendChild(container);
    }
  }

  /* Boot */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

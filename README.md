<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/AI_Top_40-E8372D?style=for-the-badge&logoColor=white">
  <img alt="AI Top 40" src="https://img.shields.io/badge/AI_Top_40-1A1814?style=for-the-badge&logoColor=white">
</picture>

# AI Top 40

**The definitive composite AI model leaderboard.**<br>
Ranked by aggregate performance across 10 leading benchmarks. Updated weekly.

[![License: MIT](https://img.shields.io/badge/License-MIT_with_Attribution-E8372D?style=flat-square)](LICENSE)
[![Data: Weekly](https://img.shields.io/badge/Data-Updated_Weekly-4CAF50?style=flat-square)](#data)
[![CDN: jsDelivr](https://img.shields.io/badge/CDN-jsDelivr-1A1814?style=flat-square)](https://cdn.jsdelivr.net/gh/implicator-ai/ai-top-40@main/dist/embed.min.js)

[Live Chart](https://implicator.ai/ai-top-40/) · [Embed It](https://implicator.ai/ai-top-40-embed/) · [View Data](data/latest.json)

</div>

---

## Quick Start

Add the leaderboard to any website with two lines of HTML:

```html
<div data-ai-top-40="all" data-limit="10"></div>
<script src="https://cdn.jsdelivr.net/gh/implicator-ai/ai-top-40@main/dist/embed.min.js" async></script>
```

The widget renders inside a **Shadow DOM** for complete style isolation — it won't conflict with your site's CSS. Zero dependencies. Works with WordPress, Ghost, Hugo, plain HTML, anything.

## Chart Types

| Type | Attribute | What it shows |
|:-----|:----------|:--------------|
| **All Models** | `data-ai-top-40="all"` | Full leaderboard — every qualifying model |
| **Open Weights** | `data-ai-top-40="open"` | Open-weight models only (Meta, DeepSeek, Qwen, Mistral) |
| **Commercial** | `data-ai-top-40="commercial"` | Commercial/closed models only |
| **Combo** | `data-ai-top-40="combo"` | Three boards side by side: Open \| All \| Commercial |

```html
<!-- Open-weight models, top 5 -->
<div data-ai-top-40="open" data-limit="5"></div>

<!-- Three boards side by side -->
<div data-ai-top-40="combo" data-limit="10"></div>

<!-- Dark theme -->
<div data-ai-top-40="all" data-theme="dark"></div>
```

## Customization

| Attribute | Values | Default | Description |
|:----------|:-------|:--------|:------------|
| `data-ai-top-40` | `all` `open` `commercial` `combo` | required | Chart variant |
| `data-limit` | Any number | `10` | Models to display |
| `data-theme` | `light` `dark` | `light` | Color theme |

## Data

Updated every Saturday. Published to [`data/latest.json`](data/latest.json). Historical snapshots archived in [`data/archive/`](data/archive/) by date.

| Field | Description |
|:------|:------------|
| `rank` | Current chart position |
| `name` | Model display name |
| `lab` | Organization |
| `score` | Composite score (0–100) |
| `prev_rank` | Last week's rank (`null` if new) |
| `best_position` | Highest rank ever achieved |
| `weeks_on_chart` | Consecutive weeks ranked |
| `is_open_weight` | Open-weight model flag |
| `is_new` | First week on the chart |

## Attribution

The [MIT license](LICENSE) requires visible attribution: **"presented by implicator.ai"** linked to [implicator.ai/ai-top-40](https://implicator.ai/ai-top-40/). The widget includes this automatically. Do not remove or hide it.

## Local Development

```bash
git clone https://github.com/implicator-ai/ai-top-40.git
cd ai-top-40
python3 -m http.server 8000
# Open http://localhost:8000/demo.html
```

## License

MIT with attribution requirement. See [LICENSE](LICENSE).

---

<div align="center">

Published by **[Implicator.ai](https://implicator.ai/)** — daily AI newsletter from San Francisco.

</div>

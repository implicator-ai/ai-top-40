# AI Top 40

A weekly leaderboard of the world's top AI models, ranked by aggregate performance. Embeddable as a lightweight, zero-dependency widget on any website.

Published by [implicator.ai](https://implicator.ai/ai-top-40/).

![Screenshot placeholder](https://via.placeholder.com/800x400?text=AI+Top+40+Widget)

## Quick Start

Add the widget to any page with two lines of HTML:

```html
<div data-ai-top-40="all" data-limit="10"></div>
<script src="https://cdn.jsdelivr.net/gh/implicator-ai/ai-top-40@main/dist/embed.min.js"></script>
```

The widget renders inside a Shadow DOM for complete style isolation -- it won't conflict with your site's CSS.

## Chart Types

| Attribute Value | Description |
|---|---|
| `all` | Full leaderboard, all models |
| `open` | Open-weight models only |
| `commercial` | Commercial (closed) models only |
| `combo` | Three boards side by side: Open, All, Commercial |

```html
<!-- Open-weight models only -->
<div data-ai-top-40="open"></div>

<!-- Three boards side by side -->
<div data-ai-top-40="combo" data-limit="10"></div>
```

## Customization

| Attribute | Values | Default | Description |
|---|---|---|---|
| `data-ai-top-40` | `all`, `open`, `commercial`, `combo` | `all` | Chart type |
| `data-limit` | Any integer | `10` | Number of models to display |
| `data-theme` | `light`, `dark` | `light` | Color theme |

```html
<!-- Dark theme, top 5 commercial models -->
<div data-ai-top-40="commercial" data-limit="5" data-theme="dark"></div>
```

## Attribution

The MIT license requires visible attribution: **"presented by implicator.ai"** with a link to [implicator.ai/ai-top-40](https://implicator.ai/ai-top-40/). The widget includes this automatically in the footer. Do not remove or hide it.

## Data

Chart data is updated weekly and published to `data/latest.json`. Historical snapshots are archived in `data/archive/` by date.

Each model entry includes:

| Field | Description |
|---|---|
| `rank` | Current overall position |
| `name` | Model name |
| `lab` | Organization |
| `score` | Composite score (0--100) |
| `prev_rank` | Previous week's rank |
| `is_open_weight` | Whether the model's weights are publicly available |
| `is_new` | First appearance on the chart |
| `weeks_on_chart` | Consecutive weeks ranked |

## Local Development

Open `demo.html` in a browser to preview all widget variants with local data.

## License

MIT with attribution requirement. See [LICENSE](LICENSE) for details.

---

Built by [Implicator.ai](https://implicator.ai/) -- AI journalism for a technical audience.

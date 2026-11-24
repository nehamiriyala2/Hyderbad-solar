# Photos needed for /solar-guide

Drop each photo into this folder (`public/guide/`) with the **exact file name** below, then rebuild (`npm run build`).
The page finds them automatically. Until a photo is there, its slot shows a labelled teal frame.

**Rules**
- Real photographs only: no cartoons, illustrations or AI-generated images.
- Your own photos first (Hyderabad installs are best). Otherwise use free-licence stock from **Unsplash** or **Pexels** and note the photographer + URL in the table.
- Format: **WebP**, quality ~80. Keep each file under ~400 KB (hero under ~600 KB).
- Don't show people's faces or house numbers without permission. No brand logos as the main subject.

| File name | What it should show | Size (px, min) | Shape | Used in | Source / credit |
|---|---|---|---|---|---|
| `hero.webp` | Golden-hour Indian rooftop with solar panels, wide, space on the left for text (teal overlay is added in code). **Also used as the social-share (OG) image.** | 2400 × 1350 | 16:9 | Page hero | |
| `panel-closeup.webp` | Close-up of panel cells and frame | 1200 × 900 | 4:3 | Ch.01 Panels | |
| `inverter.webp` | Wall-mounted solar inverter with display | 1200 × 900 | 4:3 | Ch.01 Inverter | |
| `net-meter.webp` | Bi-directional / net electricity meter (TGSPDCL type if possible) | 1200 × 900 | 4:3 | Ch.01 Net meter | |
| `day-roof.webp` | Sunny roof with panels, bright daytime | 1200 × 900 | 4:3 | Ch.02 Day | |
| `evening-home.webp` | Indian home with lights on in the evening | 1200 × 900 | 4:3 | Ch.02 Night | |
| `battery.webp` | Home battery / hybrid inverter unit | 1200 × 900 | 4:3 | Ch.02 Power cut | |
| `on-grid.webp` | Rooftop system on a city house (on-grid) | 900 × 675 | 4:3 | Ch.03 table | |
| `hybrid.webp` | Panels + battery setup (hybrid) | 900 × 675 | 4:3 | Ch.03 table | |
| `off-grid-pump.webp` | Solar panels powering a water pump on a farm | 900 × 675 | 4:3 | Ch.03 table | |
| `skyline.webp` | Real photo of the Hyderabad skyline (HITEC City / Hussain Sagar / Charminar) | 2100 × 900 | 21:9 | Ch.05 banner | |
| `technician-cleaning.webp` | Technician rinsing / cleaning rooftop panels | 960 × 1200 | 4:5 | Ch.07 | |

Convert any JPG/PNG to WebP, e.g. with squoosh.app, or `npx sharp-cli -i photo.jpg -o hero.webp -f webp -q 80`.

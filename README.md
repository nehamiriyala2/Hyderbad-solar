# Hyderabad Solar website

Next.js 15 (App Router) + Tailwind. Bilingual English / తెలుగు (toggle in header, remembered per visitor, `?lang=te` also works).

## Run
```
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```
Deploy: Vercel (recommended) or any Node host. The `/api/lead` route needs a server, so a static-only host won't work.

## Before launch: what to edit
| What | Where |
|---|---|
| WhatsApp number, phone, email, address, hours, map, social | `lib/site.ts` |
| Logo (currently placeholder SVG) | `components/Chrome.tsx` → `Logo` (and colours in `tailwind.config.ts` if your logo differs) |
| Prices per kW, tariffs, subsidy rules (drive ALL calculators) | `lib/solar.ts` → `ASSUME`, `pmSuryaGharSubsidy`, `societySubsidy` |
| Package "Starting from" prices | `content/packages.ts` |
| Scheme facts | `content/schemes.ts` |
| For-You pages | `content/forYou.ts` |
| Home FAQ | `content/faq.ts` |
| Learn articles | `content/learn.ts` |
| Solar Guide photos (12 slots) | drop .webp files into `public/guide/`, see `public/guide/IMAGES-NEEDED.md`, then rebuild |
| Solar Guide text & figures | `components/guide/GuideView.tsx`, sunshine data in `components/guide/parts.tsx` |
| About story, team, warranty, approvals; project gallery | `components/views/ToolViews.tsx` |
| Privacy / Terms (draft — get them reviewed) | `components/views/TextViews.tsx` |

Search the code for `[VERIFY]` (numbers/rules to confirm) and `[EDIT]` (your details). Both show on the site as yellow/blue badges, so nothing slips through. Remove each badge once you've confirmed it.

## Leads → Google Sheet
1. Follow the steps at the top of `docs/google-apps-script.gs`.
2. Copy `.env.example` to `.env.local` and set `LEADS_WEBHOOK_URL` + `LEADS_WEBHOOK_SECRET`.
Every form / plan result posts to `/api/lead` (saved to the sheet) and opens WhatsApp with a prefilled summary.
Without the env var, leads are only printed to the server log.

## WhatsApp auto-reply (optional)
Uses the WhatsApp Cloud API (Meta Business). WhatsApp only allows business-first messages through an **approved template**:
1. Create a template (e.g. `solar_plan_reply`) with 2 body variables: `{{1}}` name, `{{2}}` plan.
   Example: "Hi {{1}}, thanks for checking solar with Hyderabad Solar. Your suggested plan: {{2}}. Next step: reply with a photo of your roof and latest bill."
2. Set `WHATSAPP_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_TEMPLATE_NAME` in `.env.local`.
The reply only goes out when the visitor entered a phone number.
Simpler option without the API: turn on the "Greeting message" in the WhatsApp Business app.

## Structure
- `lib/solar.ts`: all solar maths (size, saving, subsidy, payback, 25-yr, CO₂, EMI)
- `lib/match.ts`: scheme matching + documents list
- `lib/i18n.tsx`: language context, `<T en te />`
- `components/`: UI kit, header/footer/mobile bar, calculators, Find My Plan wizard, skyline illustration
- `components/views/`: page bodies; `app/`: routes + bilingual metadata, sitemap, robots, LocalBusiness schema

## Photo slots (drop a .webp in and rebuild; nothing else to change)
| File | Where it shows | Suggested subject |
|---|---|---|
| `public/for/hero.webp` | /for hero, right side (4:3) | Hyderabad homes/apartments with rooftop solar |
| `public/schemes/hero.webp` | /schemes hero, right side (4:3) | Family home with rooftop solar, documents / subsidy feel |
| `public/schemes/pm-surya-ghar.webp` | scheme card (16:9) | Home rooftop solar |
| `public/schemes/net-metering.webp` | scheme card | Bi-directional net meter (no brand / other-state DISCOM labels) |
| `public/schemes/pm-kusum.webp` | scheme card | Solar water pump on a farm |
| `public/schemes/gruha-jyothi-and-solar.webp` | scheme card | Warm-lit Indian home interior / bulb |
| `public/schemes/telangana-state-and-ghmc-support.webp` | scheme card | Hyderabad civic building / city view |
| `public/schemes/commercial-benefits.webp` | scheme card | Shop or small business with rooftop solar |
Until a photo exists, the hero shows text-only and the card shows a colourful gradient banner — no broken boxes.

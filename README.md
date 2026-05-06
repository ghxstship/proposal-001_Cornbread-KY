# Proposal 001 · Cornbread Hemp (KY)

**Cornbread Hemp × AGV Miami — Abbey Road on the River 2026 Activation Deployment Program**

A digital interactive proposal for the Cornbread Hemp activation deployment program, anchored at Abbey Road on the River 2026 (Jeffersonville, IN). Document `AGORA-CBH-001 · v2.1`.

## Engagement model

Modular execution — every line carries a published rate, composed event by event:

1. **Per Activation** · three lines, fully published
   - **Build & Strike — Logistics** · $4,500 / activation · truck rental, fuel, freight insurance, round-trip from AGV Miami warehouse
   - **Build & Strike — Labor (Local Hires)** · $1,800 / activation · two-crew lift sourced near venue through AGV regional partner network
   - **Build & Strike — Travel & Lodging (1–2 AGV Crew)** · $2,500 / activation · round-trip travel + lodging for AGV producer and second lead on long-haul routes

2. **Per Month** · asset care between events
   - **Storage — Monthly Hold (NYC or Miami)** · $1,500 / mo · climate-monitored, alarmed, 48-hour mobilization

3. **Upgrades** · investments in the activation itself
   - **Plants — Foliage Rental** · $1,200 / instance · outdoor-grade artificial foliage, redeploys clean across the calendar
   - **Lighting — Upgrade + Routine Maintenance** · $4,500 one-time · evening kit + astronomical timer, maintenance carried forward

4. **Optional Add-Ons** · available on request, quoted to scope
   - **Pre-Deployment Activation Refresh** · from $2,500 / instance
   - **Pre-Deployment Activation Rebrand** · from $7,500 / instance

## 2026 Calendar

| Event | City | Dates | One-Way Miles | Per Event |
| --- | --- | --- | --- | --- |
| Abbey Road on the River | Jeffersonville, IN | May 21–25 | 1,200 mi · out-of-market | $14,500 (incl. lighting) |
| Minnesota Yacht Club Festival | St. Paul, MN | Jul 17–19 | 1,800 mi · out-of-market | $10,000 |
| North Carolina Folk Festival | Greensboro, NC | Sept 18–20 | 800 mi · out-of-market | $10,000 |
| Fin Fest | St. Petersburg, FL | Nov 13–14 | 270 mi · local | $6,500 |

Annual production: $41,000 · plus storage at $1,500 / mo rolling between deployments.

## Tech

- Next.js 16 · React 19 · TypeScript
- Single-page interactive proposal at `/`
- Cornbread brand kit (per `CB_BrandGuide-2025`) applied via scoped `cornbread.css`
- Sticky section nav with active-state highlighting · accordion taxonomy · canvas-draw signature pad · round Ranch-Water buttons · print-optimized layout

## Brand kit

Colors (from `CB_BrandGuide-2025` page 18):

| Token | Hex | PMS |
| --- | --- | --- |
| Cornbread Orange | `#C5883F` | 7563 C |
| Dark Cedar | `#44382A` | 7554 C |
| Cannabis | `#3D441D` | 5747 C |
| Buttermilk | `#E1D6C3` | 7527 C |
| Foil | `#DD9F48` | 7563 C |
| Orange (dark variant) | `#945F26` | — |

Fonts (from `CB_BrandGuide-2025` pages 12–17):

| Role | Brand font | Free substitute (loaded) |
| --- | --- | --- |
| Primary headline | **Kopius Extra Bold** | Roboto Slab 800/900 |
| Secondary headline / italic | **Kopius Bold Italic** | Roboto Slab Italic |
| Body + buttons | **Ranch Water Regular & Italic** | Bitter |
| Western detail | **Cowboy** | Rye |
| Tabular figures | (no brand spec) | JetBrains Mono |

**Production**: Kopius (Schick Toikka), Ranch Water (Sudtipos), and Cowboy are commercial faces and aren't on Google Fonts. Drop the AGV Miami Adobe Fonts kit URL into `app/layout.tsx` (commented placeholder is in place) and the brand names — listed first in every font-family stack in `cornbread.css` — resolve to the licensed faces automatically. Until then the page renders cleanly with the Google Font substitutes above.

## Local development

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

## Structure

- `app/layout.tsx` — root layout, font loading (Alfa Slab One · Rye · Zilla Slab · Libre Caslon Text · JetBrains Mono · Cormorant Garamond)
- `app/page.tsx` — renders the proposal
- `app/proposal/data.ts` — proposal content: pricing groups, applied composition, calendar sites, scope taxonomy, lifecycle, exclusions, terms, change orders
- `app/proposal/CornbreadProposalView.tsx` — interactive client component (sticky nav, accordions, signature pad)
- `app/proposal/cornbread.css` — Cornbread brand kit styling (scoped to `.cbh-doc`)
- `scripts/generate_invoice.py` — Gymshark-style invoice XLSX generator (writes to `public/invoices/`)
- `public/invoices/` — generated invoice spreadsheets

## Producer

**AGV Miami, LLC** · `julian@agvmiami.com`

## Confidential

Prepared for Cornbread Hemp. Pricing, modular composition, and calendar projection are confidential between the parties.

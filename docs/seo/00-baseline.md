# SEO Baseline — udv-new.vercel.app

Captured 2026-09-23. Snapshot: `docs/seo/baseline-snapshot/` (`home.html` raw SSR, `signals.json` extracted signals). Phase 6 diffs against this.

## Method and limits

- **Python 3 is now installed**, but `pagespeed_check.py` couldn't get a PSI reading — no API key, and the shared/unauthenticated PSI quota was exhausted (`PSI rate limit exceeded`). Measured performance below instead uses **Lighthouse CLI** (`npx lighthouse`, mobile, simulated throttling) run directly against the live URL — see `docs/seo/perf-baseline.md` for the full breakdown. chrome-devtools MCP's `lighthouse_audit`/trace tools were tried first but couldn't attach (its browser profile dir was locked by another running Chrome session).
- **No DataForSEO MCP**, so there are no search volumes. Phase 2 clustering will be SERP/intent-based only. No invented numbers.
- **No field CWV data** (no PageSpeed/CrUX key) — Performance below is lab-only (Lighthouse simulated throttling), not real-user data.
- Audit = live SSR HTML (curl + Node) + codebase grep + Lighthouse CLI for performance.

## Health score: ~32 / 100 (estimate)

| Category | Weight | Score | Why |
|---|---|---|---|
| Technical | 22% | 40 | robots/sitemap 404, no canonical, footer link broken, legal pages 404 |
| Content | 23% | 35 | 1 indexable URL, itinerary detail not in HTML, unverified reviews/stats |
| On-page | 20% | 35 | H1 no keyword, headings with duplicated text, anchor-only nav |
| Schema | 10% | 0 | zero JSON-LD |
| Performance | 10% | 48 (measured, Lighthouse mobile lab) | LCP 6.9s, TBT 1,040ms, CLS 0 — hero paragraph is the LCP element, render-delay bound (main-thread JS), plus ~781 KiB of oversized/non-modern images. See `perf-baseline.md`. |
| AI search | 10% | 25 | no quotable facts (altitude, distance, months) in HTML, no entity schema |
| Images | 5% | 20 | 34/49 imgs empty alt, spaces/uppercase filenames |

## What exists vs missing

| Signal | Status |
|---|---|
| `<title>` | ✅ "Untouch Destination — small-group trips across Himachal & Uttarakhand" (~70 chars, slightly long) |
| meta description | ✅ present |
| canonical | ❌ none |
| Open Graph / Twitter | ❌ none (WhatsApp previews blank) |
| JSON-LD | ❌ 0 blocks |
| `/robots.txt` | ❌ 404 |
| `/sitemap.xml` | ❌ 404 |
| `/terms`, `/cancellation-policy`, `/privacy-policy` | ❌ 404 (linked from footer) |
| favicon | ✅ `app/icon.png` |
| `images.formats` avif/webp | ✅ already in `next.config.ts` |
| Indexable URLs | 1 (`/`) |
| DOM elements on `/` | ~1,280 |
| Words in SSR body | ~1,880 (inflated by duplicates) |

## Codebase facts

- **Trip data**: `lib/itineraries.ts` — typed `ITINERARIES[]` (slug, title, region, duration string, route, blurb, highlight, days[], advancePct, balanceDue, photo). No prices or dates, on purpose. Source: `untouch_destination_itineraries.md`. Good seed for `data/trips.ts`.
- **"Details→"**: `<button onClick>` opening a client-state dialog (`components/FeaturedItineraries.tsx:67`, dialog `:145`). No route. Day-wise text (e.g. "Raghupur", "Jalori") appears **0 times** in SSR HTML.
- **"use client"**: nearly every component (Hero, TripTypes, FeaturedItineraries, TrustBar, AboutUntouch, AboutOwner, ResponsibleTraveling, WhatsAppCta, Navbar, LoadingScreen…). Server: `app/page.tsx`, `app/layout.tsx`, `Footer`, `FaqPreview`, `Reviews`.
- **Server importing a value from a client module**: `components/Footer.tsx:5` ← `WHATSAPP_NUMBER` from `components/WhatsAppCta.tsx:10`. Only instance found.
- **Split/animated text**: `MaskedHeading.tsx` (per-word spans, no spaces, plus SVG clipPath `<text>` copy); `HyperText.tsx:89` and `BlurHighlight.tsx:120,171` (already aria-hidden + sr-only pair).
- **Duplicated DOM for loops/variants**: `TripTypes.tsx:82/87/94` (3 full card sets), `Reviews.tsx:126` (`[...items, ...items]`), `GalleryStrip.tsx:37` + `:97` (static grid + parallax columns).
- **`next/image` sizes**: set on nearly all; 4 `<img>` without `sizes` (logos/loader). `priority` on Hero, Navbar logo, LoadingScreen logo and the trip modal image (`FeaturedItineraries.tsx:163`) — too many.
- `CircularGallery` is WebGL canvas; its labels are not in HTML (fine, decorative).

## Master-prompt Phase 3 list — confirm / refute

| # | Issue | Verdict | Evidence |
|---|---|---|---|
| 3.1 | Footer WhatsApp href = server error string | **CONFIRMED** | live href `https://wa.me/function(){throw Error("Attempted to call WHATSAPP_NUMBER()…`; `Footer.tsx:5` |
| 3.2 | Animated headings output garbage | **PARTIAL** | `MaskedHeading`: word spans without spaces + SVG copy, no sr-only → real bug. `HyperText`/`BlurHighlight` already use `aria-hidden` + `sr-only`; Google reads sr-only fine, the doubling is only in naive text extraction → low |
| 3.3 | Carousel/marquee clones | **CONFIRMED** | TripTypes ×3, Reviews ×2, GalleryStrip ×2 |
| 3.4 | Fabricated-looking trust signals | **CONFIRMED** | `TrustBar.tsx:5` comment "Placeholder figures"; `Reviews.tsx` cites Kedarkantha, Hampta Pass, Meghalaya, Sandakphu, Ladakh monasteries, Zanskar winter run — none sold |
| 3.5 | H1 no search value | **CONFIRMED** | `Hero.tsx:69` "Open your heart to the world…" |
| 3.6 | Images | **CONFIRMED** except last bullet | 34/49 empty alt; `Jibhi & Shangarh.png`, `7.JPG`…; trip PNGs 1.6–3 MB, `11.png` 6 MB, `5.JPG` 5.4 MB. `images.formats` avif/webp **already set** → REFUTED |
| 3.7 | Brand name mix | **CONFIRMED** | "UntouchDestination" `AboutUntouch.tsx:53,93`; "Untouchdestination" `AboutUntouch.tsx:11` |
| 3.7 | Ravi placeholder | **CONFIRMED** | `AboutOwner.tsx:86` |
| 3.7 | Typos | **CONFIRMED** | `Hero.tsx:87` "ready embrace"; `ResponsibleTraveling.tsx:36` "what were about", "it’s people" (curly apostrophe) |
| 3.7 | No address | **CONFIRMED** | no NAP anywhere |
| Sec. 2 | Legal pages "already exist" | **REFUTED** | all three 404 |

## Prioritised issues

### Critical
1. Footer WhatsApp link broken (3.1).
2. robots.txt + sitemap.xml missing.
3. Legal pages 404 — need text from client.
4. Itinerary content not indexable; no trip URLs.

### High
5. No canonical / OG / Twitter / JSON-LD.
6. MaskedHeading unreadable text (3.2).
7. H1 (3.5).
8. Duplicate DOM (3.3).
9. Unverified reviews + placeholder stats (3.4).
10. Images: alt, filenames, weight, too many `priority` (3.6).
11. Hero starts at `opacity:0` + blur until hydration, plus LoadingScreen overlay → LCP risk. Measure before changing (design-sensitive).

### Medium
12. Brand name, typos, Ravi placeholder, address (3.7).
13. Anchor-only nav.
14. Title ~70 chars → trim to ≤60.

### Low
15. HyperText/BlurHighlight sr-only doubling — optional polish.

## Open questions
- ~~Python 3~~ installed; drift baseline captured.
- DataForSEO credentials for volumes? (none — clustering is SERP-based)
- ~~"Into the Untouched Himalayas"~~ = Darma Valley (client confirmed).
- ~~Reviews/stats~~ all unverified → hide. Business address + legal text: pending client.

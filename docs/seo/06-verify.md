# Phase 6 — Verify (2026-09-23)

## Build
`next build` green. 26 static pages: home, `/trips`, 9 SSG trip pages, `/destinations`, 5 SSG hubs, `/about`, `/private-trips`, `/group-trips-for-solo-travellers`, `robots.txt`, `sitemap.xml`, `opengraph-image.jpg`. Every page: 1 `<h1>`, own title + description, self canonical, og:image.

## Drift compare — live homepage vs `baseline-snapshot/signals.json`

| Signal | Baseline | Now |
|---|---|---|
| Title | "Untouch Destination — small-group trips…" | "Small-Group Trips in Himachal & Uttarakhand \| Untouch Destination" |
| Canonical | none | `https://udv-new.vercel.app` |
| OG / Twitter tags | 0 / 0 | 11 / 8 |
| JSON-LD | 0 | TravelAgency (+ TouristTrip, BreadcrumbList, TouristDestination on inner pages) |
| H1 | "Open your heart to the world…" | "Small-group trips across Himachal & Uttarakhand for solo travellers" |
| Indexable URLs | 1 (`/`) | 20 (sitemap) |
| Internal links to real pages | 0 (anchors only) | 15 (`/trips/*`, `/destinations`, `/about`, …) |
| Broken WhatsApp link | 1 | 0 |
| Fake reviews / stats | shown | hidden until verified |
| robots.txt / sitemap.xml | 404 / 404 | 200 / 200 |
| Legal pages | 404 | **404 — waiting on owner text** |
| DOM elements | 1,282 | 1,192 |
| `<img>` without alt | 34 / 49 | 34 / 49 (mostly decorative `alt=""` photos in gallery/parallax; left as-is — see note) |

Headings in a naive text strip still show doubled words ("Experience tripsExperience trips"): these are `sr-only` text + `aria-hidden` animated copy, which search engines and screen readers read correctly (Phase 1 finding #6).

## Lighthouse (mobile, simulated throttling)

| Page | Perf | A11y | BP | SEO | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|
| `/` baseline | 48 | — | — | — | 6.9 s | 1,040 ms | — |
| `/` now | 54 | 92 | 100 | 100 | 4.6 s | 1,070 ms | 0 |
| `/trips/spiti-valley-circuit-group-trip` | 83 | 92 | 100 | 100 | 3.9 s | 100 ms | 0 |

Trip-page LCP is the hero photo; it was missing `fetchpriority=high` → fixed in 711eeb6. Remaining LCP time is element render delay (~1.3 s): the site-wide `LoadingScreen` overlay. Homepage LCP/TBT still blocked on the owner's design decision (loader + hero fade, heavy animation JS) — see `docs/owner-todo.md`.

## Not done (needs owner)
- Legal pages, address, prices/dates, real reviews/stats, FAQ copy → `docs/owner-todo.md`.
- Search Console / GA4 (`/seo google setup`) → needs the final domain and the owner's Google account. Steps in `offsite-checklist.md`.
- Page sign-off (trip-card modal → trip pages) → `docs/owner-todo.md`.

# Progress

## 2026-09-23 — Phase 1: baseline audit
- Audited live site + codebase. Python missing, so claude-seo scripts (drift, PageSpeed) not run; manual snapshot saved to `docs/seo/baseline-snapshot/`.
- Wrote `docs/seo/00-baseline.md`: health ~34/100, prioritised issues, confirm/refute of Phase 3 list.
- Notable: legal pages 404 (not "already exist"); `images.formats` already set; itinerary detail not in SSR HTML.
- No code changes. Waiting at CHECKPOINT 1.

## 2026-09-23 — Client answers after CHECKPOINT 1
- Python installed; claude-seo drift baseline captured for https://udv-new.vercel.app.
- "Into the Untouched Himalayas" (`darma.png`) = Darma Valley.
- All current reviews and stats are NOT real → `verified: false`; render none, no Review/AggregateRating schema.
- Business address: pending (keep `TODO:`).
- Terms, cancellation and privacy policy text: pending from client. Pages stay unbuilt / footer links need handling until then.

## 2026-09-23 — Phase 2: strategy
- Sonnet workers: 3 SERP clusters (`docs/seo/clusters/`), Lighthouse perf baseline (`perf-baseline.md`: score 48, LCP 6.9s, TBT 1,040ms, CLS 0), plan/programmatic draft (`01-strategy-draft.md`).
- Wrote `docs/seo/01-strategy.md` + `docs/seo/keyword-map.md`. Final slugs set for all 9 trips (Darma → `darma-valley-darchula-trip`, Darchula verified on route).
- Hubs: spiti, kinnaur, zanskar, jibhi, kumaon. Rejected parvati (no trip). Deferred darma-valley (needs verified ILP info).
- No volumes (no DataForSEO). No prices invented — cost sections TODO.
- No code changes. Waiting CHECKPOINT 2.

## 2026-09-23 — Phase 3: live bug fixes
- Owner approved CHECKPOINT 2 ("proceed"); all open questions collected in `docs/owner-todo.md`.
- 3.1 `lib/site-config.ts` (`SITE`, URL from `NEXT_PUBLIC_SITE_URL`); footer WhatsApp href fixed (f71dcd9).
- 3.2 MaskedHeading sr-only text (3ab847b).
- 3.3 `useMediaQuery` prunes non-matching TripTypes/GalleryStrip variants after hydration; review marquee loop copy `aria-hidden` + `inert` (9bb0d37, 8ebc4a8).
- 3.4 `lib/social-proof.ts` with `verified` flag; all false → Reviews, TrustBar and "Reviews" nav links hidden (8ebc4a8).
- 3.5 H1 "Small-group trips across Himachal & Uttarakhand for solo travellers" (53b9e0a).
- 3.6 Photos → kebab-case JPEGs ≤2048px (~43 MB → ~6 MB), trip covers at `/images/trips/<slug>.jpg`, alts fixed, hero is the only `preload`, masked heading photo via `/_next/image` + lazy (0418cf0 + follow-up).
- 3.7 Brand spelling, typos, Ravi placeholder hidden (06c0e10). Address still TODO.
- Footer legal links hidden until client sends copy (a9007e2).
- `next build` passes. Local smoke: WhatsApp href correct, no camera filenames in HTML.
- Unused files left in `public/` (`images/all-peeps.png`, `images/jibhi.png`, `images/logo.png`, `images/peeps/`): not referenced, delete when convenient.
- Redeployed Phase 3 (132cd77). Live Lighthouse mobile: perf 47, SEO 100, a11y 92; LCP 6.9 → 5.8 s, CLS 0, TBT 1.35 s.

## 2026-09-23 — Phase 4: technical foundation
- `app/robots.ts` + `app/sitemap.ts` from `SITE.url` (02a7ba0).
- Root metadata: `metadataBase`, title template, keyword title/description, OG/Twitter, default `app/opengraph-image.jpg`; canonical on `/` only (7182d69).
- `components/JsonLd.tsx` + TravelAgency (no address, no ratings) in layout (c8e4d01). FAQPage deferred: FAQ answers are placeholders.
- CircularGallery: WebGL init via IntersectionObserver, 1080px optimizer textures (5ce6333).
- Bug: with prefers-reduced-motion the page could not wheel-scroll (Lenis swallowed wheel, raf never ran). Fixed (d91f748), verified in Chrome both modes.
- LCP blocked on design call (loader + hero fade) → owner-todo.

## 2026-09-23 — Phase 5: pages
- `lib/itineraries.ts` → `data/trips.ts` (single source; keyword-map slugs, `seoTitle`, `description`); `data/destinations.ts` 5 hubs (061b87f).
- `PageHero`, `Breadcrumbs` (visible + BreadcrumbList), `TripCard`, `lib/seo.ts` `pageMetadata` (canonical + full OG incl. default image, since child `openGraph` replaces the root one) (0a03bfc).
- `/trips` + 9 SSG `/trips/[slug]`: day-by-day in HTML, TouristTrip (no price/dates), related trips (10128a5).
- `/destinations` + 5 hubs, TouristDestination, 389–457 words in `<main>`, all from trip data (c9b3f8c).
- `/about`, `/private-trips`, `/group-trips-for-solo-travellers` (1413daa).
- Homepage modal → links to trip pages; nav/footer → routes; hero "Plan a custom trip" → `/private-trips` (ee47fb8). Sign-off asked in owner-todo.
- Sitemap 20 URLs (2259d58). `next build` green, 26 static pages; og:image on every page.

## 2026-09-23 — Phase 6: verify
- Live deploy checked: all new routes 200, itinerary text in HTML, sitemap 20 URLs.
- Drift compare + Lighthouse → `docs/seo/06-verify.md`. Trip page perf 83 / SEO 100; home 54 (was 48), LCP 4.6 s (was 6.9 s).
- Page hero image `loading=eager` + `fetchPriority=high` (711eeb6).
- `docs/seo/offsite-checklist.md`: domain migration (one env var: `NEXT_PUBLIC_SITE_URL`), Search Console, Bing, GBP, citations, links.
- Waiting on owner: legal text, address, prices/dates, reviews, FAQ copy, loader design call, page sign-off, domain + Google account.

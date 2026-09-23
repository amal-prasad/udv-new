# Checklist

## Phase 1 — Baseline
- [x] Drift baseline (manual snapshot; Python missing)
- [x] Audit: technical, schema, images, content
- [x] robots / sitemap / canonical / OG / JSON-LD check
- [x] Codebase audit
- [x] `docs/seo/00-baseline.md`
- [x] CHECKPOINT 1 approved

## Phase 2 — Strategy
- [x] `/seo plan local` (travel override)
- [x] `/seo programmatic plan`
- [x] Clusters: spiti valley trip / himachal group trip / uttarakhand offbeat trip
- [x] `docs/seo/01-strategy.md`
- [x] `docs/seo/keyword-map.md` + final slugs
- [x] CHECKPOINT 2 approved (owner: proceed, questions in docs/owner-todo.md)

## Phase 3 — Live bugs
- [x] 3.1 `lib/site-config.ts`, fix footer WhatsApp
- [x] 3.2 MaskedHeading readable text
- [x] 3.3 Single SSR set, client-side clones `aria-hidden` + `inert`
- [x] 3.4 Reviews/stats data file with `verified` flag (ask client)
- [x] 3.5 Keyword H1, tagline demoted
- [x] 3.6 Image rename/convert, alt text, sizes, single priority
- [x] 3.7 Brand name, typos, hide Ravi placeholder, address TODO
- [x] Footer legal links hidden until pages exist
- [ ] Redeploy; CHECKPOINT 3

## Phase 4 — Technical foundation
- [ ] Root metadata (metadataBase, template, OG, twitter, canonical)
- [ ] Per-route titles/descriptions
- [ ] `opengraph-image.tsx` per trip
- [ ] `app/sitemap.ts`, `app/robots.ts`
- [ ] `<JsonLd>`: TravelAgency/Organization, TouristTrip, FAQPage, BreadcrumbList
- [ ] No CLS, SSR copy, Lenis anchors/back-forward, reduced motion
- [ ] LCP < 2.5 s, CLS < 0.1, INP < 200 ms

## Phase 5 — Pages
- [ ] `data/trips.ts`
- [ ] `/trips`, `/trips/[slug]`
- [ ] `/destinations/[slug]`
- [ ] `/group-trips-for-solo-travellers`
- [ ] `/private-trips`, `/about`
- [ ] Homepage cards → `<Link>`, nav → routes
- [ ] Content briefs, TODOs for missing facts
- [ ] `/seo geo` on two trip pages

## Phase 6 — Verify
- [ ] `next build` all static + metadata
- [ ] drift compare, technical, page
- [ ] `docs/seo/offsite-checklist.md`
- [ ] `/seo google setup` after Search Console

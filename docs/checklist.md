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
- [x] Root metadata (metadataBase, template, OG, twitter, canonical)
- [x] Per-route titles/descriptions (with Phase 5 routes)
- [x] Default `app/opengraph-image.jpg`
- [x] OG image per trip (with Phase 5 routes)
- [x] `app/sitemap.ts`, `app/robots.ts`
- [x] `<JsonLd>` + TravelAgency
- [x] TouristTrip, BreadcrumbList (Phase 5 routes)
- [ ] FAQPage (blocked: FAQ copy approval, owner-todo)
- [x] CLS 0; reduced-motion scroll bug fixed; WebGL gallery lazy-init
- [ ] LCP < 2.5 s (5.8 s now; loader + hero fade need owner OK), TBT 1.35 s (JS weight: gsap + framer + ogl + lenis)

## Phase 5 — Pages
- [x] `data/trips.ts`
- [x] `/trips`, `/trips/[slug]`
- [x] `/destinations/[slug]`
- [x] `/group-trips-for-solo-travellers`
- [x] `/private-trips`, `/about`
- [x] Homepage cards → `<Link>`, nav → routes
- [x] TODOs for missing facts (briefs = `docs/seo/keyword-map.md`; copy uses only trip-data facts)
- [ ] `/seo geo` on two trip pages

## Phase 6 — Verify
- [ ] `next build` all static + metadata
- [ ] drift compare, technical, page
- [ ] `docs/seo/offsite-checklist.md`
- [ ] `/seo google setup` after Search Console

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

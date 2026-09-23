# SEO Strategy — Untouch Destination

Written 2026-09-23. Built from `00-baseline.md`, `perf-baseline.md`, `clusters/*.md`, `01-strategy-draft.md` and `lib/itineraries.ts`. Keywords per URL are in `keyword-map.md`.

## Positioning

- Don't compete for head terms ("himachal tour package", "himachal group trip", "uttarakhand offbeat trip"). OTAs and listicles own those results.
- Win long-tail itinerary searches: place + "from delhi", "n days itinerary", named combinations.
- Several routes have weak results pages where we can realistically rank:
  - Sangla·Chitkul·Kalpa: ranking pages are thin taxi sites.
  - Naggar + Parashar Lake: no operator sells the combination.
  - Zanskar 6-day itinerary: no exact-match page exists.
  - 4-day Manali→Zanskar: competitors run 6–11 days.
  - Darma Valley: no OTA competes.
  - Uttarakhand group trips for solo travellers: no dominant page.
- Differentiators:
  - Real day-by-day itineraries, rendered as HTML rather than a hidden modal.
  - WhatsApp booking with no checkout form.
  - Small groups for solo travellers.
- Local SEO is about trust in the business as an entity (TravelAgency schema, NAP, GBP), not the Chandigarh map pack. Demand comes from Delhi.

## Architecture

```
/                                   home
/trips                              all 9 trips
/trips/[slug]                       9 trip pages (1:1 with itineraries)
/destinations/[slug]                spiti, kinnaur, zanskar, jibhi, kumaon
/group-trips-for-solo-travellers    "Stranger Trips" concept page
/private-trips                      customised trips
/about                              brand, founder, TravelAgency schema
/terms /cancellation-policy /privacy-policy   blocked on client text
```

Rejected:
- City × destination pages such as `/from-delhi/spiti`. They're a programmatic spam risk with no unique content.
- A `parvati` hub (no trip goes there).
- Bike, honeymoon and couples pages (no such product).
- Standalone blog posts on cost or best time. That content goes into sections on the trip and hub pages.

Deferred:
- `/destinations/darma-valley`. The cluster worker recommended it, but its unique content (the ILP/permit process) needs client confirmation. The Kumaon hub and the Darma trip page cover it for now.
- A hub for Naggar–Parashar.

Hub gate: a hub needs at least one feeding trip and at least 300 words of unique, real content drawn from the itinerary days.

## Page templates

**Trip page**:
1. H1 = real trip name. Keyword in the title tag and intro.
2. Route and duration.
3. Blurb.
4. Day-by-day plan as SSR `<h2>`/`<h3>` sections.
5. Advance and balance terms.
6. WhatsApp CTA.
7. Breadcrumb and 2–3 related trips.
8. Links up to the hub(s).
9. Schema: TouristTrip + BreadcrumbList + FAQPage.
10. OG image.

Leave out any cost or date block until the client supplies real values.

**Hub page**:
1. H1 = destination.
2. At least 300 words built from facts already in the data (Shinkula Pass 16,580 ft, Chandratal, Khaliya Top trek, Phuktal, Komik, Chitkul).
3. Cards for the feeding trips.
4. Breadcrumb.
5. Schema: TouristDestination + BreadcrumbList.

**Concept pages**:
1. What the product is.
2. Which trips apply. TODO: client to confirm which trips are Stranger Trips and which are private.
3. How WhatsApp booking works.
4. No seat counts, prices or reviews.

## Internal linking

- Nav: Trips · Destinations · Solo group trips · About. Real routes; anchors only on `/`.
- Home trip cards link to `/trips/[slug]` with `<Link>`. The modal can stay as a quick view, but the link must be crawlable.
- Trip page links to its hub (breadcrumb), related trips and the solo-travellers concept page.
- Hub links to its trips and to the other hubs in the same region.
- Every non-home URL gets BreadcrumbList JSON-LD.

## Performance (from `perf-baseline.md`, lab mobile)

Baseline: score 48, LCP 6.9s, TBT 1,040ms, CLS 0. The LCP element is the hero `<p>`, and it is late because of render delay (hydration plus the opacity/blur-in animation), not network.

Levers, in order:
1. `/images/1.JPEG` (793 KB) in MaskedHeading, served at 1920w into a 364px slot. Fix with `sizes` and a smaller source. Saves about 781 KiB.
2. Remove the extra `priority` preloads.
3. Hero text visible in SSR before hydration. **This is a visual change and needs client approval.**
4. LoadingScreen overlay. **Also a visual change and needs approval.**

Targets: LCP < 2.5s, INP < 200ms, CLS < 0.1.

## Priority order

1. Phase 3 bug fixes:
   - footer WhatsApp link
   - MaskedHeading sr-only text
   - hide cloned DOM from crawlers
   - hide unverified reviews and stats
   - new H1
   - images
   - brand name and typos
2. Phase 4 technical:
   - metadata and canonical (`metadataBase` read from `SITE.url` env)
   - `robots.ts` and `sitemap.ts`
   - JSON-LD
   - OG images
   - performance levers 1–2
3. `data/trips.ts` and 9 trip pages. Biggest win: the content already exists but isn't indexed.
4. `/trips` index, breadcrumbs, related trips, nav links.
5. 5 hubs.
6. Concept pages, once the client has mapped trips to products.
7. Legal pages (blocked on client text), `/about` NAP (blocked on address), GBP.

## Domain move

`SITE.url` reads `NEXT_PUBLIC_SITE_URL`, so canonical, sitemap, OG and schema all follow the real domain with no code change. Steps go in `offsite-checklist.md` in Phase 6:
- set the env var on Vercel
- add the domain as primary
- 308 redirect from vercel.app
- verify GSC on the new domain and submit the sitemap
- re-run the drift baseline

## Open questions for client

1. Which trips are Stranger Trips (for solo travellers), which are private, which are experience trips?
2. Prices and departure dates, for the cost sections and TouristTrip `offers`. Until then they're omitted.
3. Darma Valley permit (ILP) process, as confirmed on the ground. This unlocks `/destinations/darma-valley`.
4. Best months per trip, from what you actually operate.
5. `/private-trips`: is custom trip demand mainly Himachal, Uttarakhand, or both?
6. Business address, T&C, cancellation and privacy text (already pending).

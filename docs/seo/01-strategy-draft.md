# SEO Strategy Draft — Untouch Destination

Draft. Built from `docs/seo/00-baseline.md` + `lib/itineraries.ts` (9 trips, current source of truth). Keywords: see `docs/seo/clusters/keyword-map.md` (not yet written — this doc is architecture/IA only, no volumes or rankings implied).

## Business context (for reference, not to be re-derived elsewhere)

- **Untouch Destination** (exact brand spelling — baseline flags "UntouchDestination"/"Untouchdestination" typos in `AboutUntouch.tsx` as a fix item) — small-group travel company, Chandigarh. Trips across Himachal, Uttarakhand, Ladakh/Zanskar.
- Booking is WhatsApp-only (+91 88008 88489) — no cart/checkout, so every page's conversion action is a WhatsApp CTA, not a form.
- Audience: Indian 20–40, mobile-first, mostly Delhi (all 9 trips depart from Delhi).
- Products: (1) group trips for solo travellers, branded "Stranger Trips" — a label, not a real inventory/volume signal; (2) customised private trips; (3) experience trips.
- Competitors: WanderOn, Thrillophilia, Zostel, IndiaHikes — all outrank on head terms. Strategy targets long-tail itinerary queries (place + trip-shape combinations), not head terms.
- No invented prices, volumes, stats, or reviews anywhere in this plan or its pages.

## Target architecture

```
/                                  home
/trips                             trip index (all 9, filterable by region/type)
/trips/[slug]                      9 trip detail pages (1:1 with ITINERARIES)
/destinations/[slug]               hub pages — ONLY where gate passes (below)
/group-trips-for-solo-travellers   concept page ("Stranger Trips")
/private-trips                     concept page (customised trips)
/about
/terms
/cancellation-policy
/privacy-policy
```

No city × destination matrix pages (e.g. `/from-delhi/spiti`) — explicitly out per the programmatic gate: no data source supports unique per-combination content, and it's the exact "penalty risk" pattern (`[city]/[destination]` with only the city swapped) the `seo-programmatic` skill flags.

## Destination hub gate

Rule (from task): a `/destinations/[slug]` hub is only built where **≥1 trip sources it AND ≥300 words of unique, real content is possible** (not template boilerplate — actual place detail already present in the itinerary day-by-day text, which this site has, since `lib/itineraries.ts` carries real route/day content per trip).

| Hub slug | Trips feeding it | Gate | Notes |
|---|---|---|---|
| `spiti` | `spiti-circuit` (full 7-day loop: Tabo, Kaza, Hikkim, Komik, Langza, Nako); `manali-chandratal` (Atal Tunnel into Lahaul–Spiti, Chandratal) touches the region | ✅ pass | Deepest content of any region — Tabo monastery, world's highest post office, Komik — easily clears 300 words unique. |
| `kinnaur` | `sangla-chitkul-kalpa` (Sangla, Chitkul, Kalpa, Kinner Kailash); `spiti-circuit` passes through Kalpa/Chitkul too | ✅ pass | Chitkul ("last inhabited village"), Kamru Fort, Kinner Kailash sunrise — real, specific content. |
| `zanskar` | `manali-to-zanskar` (Shinkula Pass, Phuktal Monastery, Gumbok Rangan); `zanskar-padum-circuit` (Padum, Drang Drung Glacier, Phuktal) | ✅ pass | 2 trips, both content-rich and genuinely different (one ends at Gumbok Rangan/Jispa, one goes deeper to Padum) — no near-duplicate risk. |
| `jibhi` | `jibhi-shangarh` (Jibhi Waterfall, Jalori Pass, Raghupur Fort, Shangarh meadow, Rupi Raila Waterfall) | ✅ pass | 1 trip but content-dense (5-day itinerary, 5 distinct places) — clears 300 words alone. |
| `kumaon` | `kasar-devi-munsiyari-khaliya-top` (Kasar Devi, Munsiyari, Khaliya Top, Panchachuli); `untouched-himalayas-darma-darchula` (same start + Darma Valley, Darchula) | ✅ pass | 2 trips share Kasar Devi/Munsiyari but diverge at Munsiyari (one turns back, one continues to Darma/Darchula) — enough unique content per trip to avoid the two hub-feeding pages reading as duplicates of each other. |
| `parvati` | none | ❌ fail | **No trip in `lib/itineraries.ts` touches Parvati Valley.** Named in the task's example hub list but there's no data to back a page — building it now would be exactly the thin/fabricated-content pattern flagged in baseline issue #4 (Reviews.tsx citing trips never sold). Hold until a Parvati trip exists. |

**Open question, not resolved here:** `naggar-parashar` (Naggar Castle, Parashar Lake, Jana Waterfall — Kullu Valley) doesn't map to any hub in the task's target list. It has enough content for a hub of its own (`/destinations/kullu` or fold into a broader `/destinations/manali`), but since neither was named as in-scope and it's only 1 trip, default is: **no hub, trip page only**, revisit once there's a second Kullu-area trip. Flag for client/owner decision.

Net: **5 of 6 named hubs pass** (spiti, kinnaur, zanskar, jibhi, kumaon), **1 fails** (parvati — no data), **1 trip has no assigned hub** (naggar-parashar / Kullu).

## Internal linking plan

- **Home → `/trips`**: primary nav + a "Trip Types" section (baseline's existing `TripTypes.tsx` component, already themed around solo/private/experience) linking to the two concept pages.
- **Home → hub pages**: a destinations strip (5 cards: Spiti, Kinnaur, Zanskar, Jibhi, Kumaon) linking to `/destinations/[slug]`, each card also naming which trip(s) live there.
- **`/trips` → `/trips/[slug]`**: index page, filterable by region and by trip type (Stranger/Private/Experience), each card links to its detail page.
- **`/trips/[slug]` → `/destinations/[slug]`**: every trip page links up to its destination hub(s) via a breadcrumb (`Home / Destinations / Spiti / Spiti Circuit`) — trips feeding 2 hubs (e.g. `spiti-circuit` → Spiti + Kinnaur) get both in a "Region:" line, breadcrumb still picks the primary one.
- **`/trips/[slug]` → related trips**: 2–3 related-trip cards at the bottom, matched by shared hub or shared region (e.g. both Zanskar trips cross-link each other; `manali-chandratal` cross-links `spiti-circuit` since both touch Lahaul–Spiti).
- **`/destinations/[slug]` → `/trips/[slug]`**: hub page lists every trip that feeds it (1–2 cards) plus prose built from the real day-by-day content already in `lib/itineraries.ts` (place names, altitudes, distances — the "quotable facts" baseline's AI-search section says are currently missing from HTML).
- **`/group-trips-for-solo-travellers`, `/private-trips`**: link out to whichever trips are realistically sold as that product (needs an owner call — `ITINERARIES` doesn't currently tag trips by product type; today "Stranger Trips" is a marketing label, not a filterable field). Both link back to `/trips` and to WhatsApp.
- **Footer**: fix the broken WhatsApp href first (baseline #1), then carry `/terms`, `/cancellation-policy`, `/privacy-policy`, `/about`, and the 5 destination hubs.
- **Breadcrumbs**: `BreadcrumbList` JSON-LD on every non-home page, matching the URL hierarchy above (feeds the programmatic-skill's internal linking automation notes — hub/spoke, not flat).

## Page template — required sections

**`/trips/[slug]`**
1. H1 = trip title (real, from `ITINERARIES`)
2. Route line + duration (already in data: `route`, `duration`)
3. Blurb / highlight (already in data)
4. Day-by-day itinerary (already in data — currently trapped in a client-only modal, per baseline finding; needs to render in SSR HTML as real content, not a dialog)
5. Advance/balance terms (`advancePct`, `balanceDue` — already in data)
6. WhatsApp CTA (fix broken href first)
7. Breadcrumb + related trips
8. Schema: `TouristTrip` or `Product`-adjacent + `BreadcrumbList` (defer exact type choice to `seo-schema` skill pass — flagged, not decided here)

**`/destinations/[slug]`**
1. H1 = destination name
2. ≥300 words real prose built from the feeding trip(s)' day content — altitudes, named villages/passes, distances already present in `lib/itineraries.ts` (e.g. Shinkula Pass 16,580 ft, Chandratal 4,300 m, Khaliya Top 5 km trek) — these are the "quotable facts" the baseline's AI-search row says are missing
3. Card(s) for feeding trip(s)
4. Breadcrumb
5. Schema: `TouristDestination` + `BreadcrumbList`

**`/group-trips-for-solo-travellers`, `/private-trips`** (concept pages)
1. H1 explaining the product (solo-friendly group trips vs. fully customised)
2. Which trips apply (owner input needed — see above)
3. WhatsApp CTA
4. No fabricated pricing/seat-count language (baseline #4 — TrustBar/Reviews already have this problem; don't repeat it here)

**`/terms`, `/cancellation-policy`, `/privacy-policy`**
- Currently 404, footer-linked (baseline confirmed). Blocked on real text from the client — do not draft placeholder legal text. Once text exists: plain static pages, `<title>`/meta only, no schema needed.

## Local SEO priorities

- **NAP**: business address is unknown — baseline confirmed no address anywhere on site. This blocks Google Business Profile setup and any `LocalBusiness`/`TravelAgency` schema with a real `address` field. **TODO: get address from client before any local SEO work starts.**
- **GBP**: cannot create/claim without a verifiable address (Chandigarh, per task context, but exact address unconfirmed). Once available: category = Travel Agency, phone matches the WhatsApp number, link to homepage.
- Chandigarh is the operating base but the audience/demand is Delhi-heavy (per task context) — local SEO here is about **entity trust** (GBP + NAP consistency + `TravelAgency` schema on `/about`), not local-pack ranking for "travel agency near me" in Chandigarh, since customers aren't searching locally for a Chandigarh agency.

## Priority order

1. **Fix what's broken before adding pages** — footer WhatsApp link (baseline #1), robots.txt/sitemap (#2), MaskedHeading unreadable text (#6). Zero new content, all regressions.
2. **`/trips/[slug]` ×9** — this is the single highest-leverage move: itinerary content already exists in `lib/itineraries.ts`, it's just not rendered as indexable HTML (baseline: "Day-wise text appears 0 times in SSR HTML"). Ship the data-to-page pipeline (`data/trips.ts` single source per task) before anything else.
3. **`/trips` index + breadcrumbs + related-trips linking** — turns the 9 new pages into a real hub/spoke structure instead of 9 orphans.
4. **5 destination hubs** (spiti, kinnaur, zanskar, jibhi, kumaon) — depends on step 2's data existing first, since hub prose is assembled from trip day-content.
5. **Canonical + OG/Twitter + JSON-LD (`BreadcrumbList`, trip/destination schema)** — baseline's "High" priority items, layered onto the new pages as they ship.
6. **`/group-trips-for-solo-travellers`, `/private-trips`** — needs an owner decision on which trips map to which product first.
7. **Legal pages** — blocked on client-supplied text, can ship the moment text arrives (no dependency on anything else).
8. **Local SEO / GBP / NAP** — blocked on client-supplied address; lowest priority not because it matters least but because it's fully blocked and Delhi-audience demand isn't local-pack driven anyway.
9. **`naggar-parashar` hub decision, `parvati` hub (new trip needed)** — open items, need owner input, not on the critical path.

## What this doc deliberately doesn't do

- No keyword volumes, no traffic projections, no ranking timelines — no DataForSEO MCP connected (per baseline), and none of this is invented. Keyword detail lives in `docs/seo/clusters/keyword-map.md` (not yet written).
- No schema JSON drafted — that's `seo-schema` skill's job once page templates above are agreed.
- No copy drafted for any page — this is architecture/IA only.

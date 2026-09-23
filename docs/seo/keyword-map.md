# Keyword Map — Untouch Destination

One primary keyword per URL; no two URLs share a primary. Volumes are **unknown** (no DataForSEO), so keywords are ranked by intent and by who currently ranks for them. Evidence is in `docs/seo/clusters/*.md`.

Rules:
- Keywords containing **cost** need real prices from the client. Until those arrive, leave the cost block out of the page (`TODO:`). Never estimate a price.
- **Best time / season** facts must come from the client or a named source. Never invent them.
- Each secondary keyword appears on one URL only. Other pages link to that URL.

## Trip pages — `/trips/[slug]`

| Current `lib/itineraries.ts` slug | **Final slug** | Primary | Secondary |
|---|---|---|---|
| `spiti-circuit` | `spiti-valley-circuit-group-trip` | spiti valley trip from delhi | spiti valley trip package · spiti circuit group trip · spiti valley 7 days itinerary · spiti valley group trip for solo travellers · spiti valley trip cost from delhi (TODO price) |
| `sangla-chitkul-kalpa` | `sangla-chitkul-kalpa-trip` | sangla chitkul kalpa trip | kinnaur trip itinerary · chitkul kalpa tour package from delhi · kinnaur trip cost (TODO price) |
| `manali-chandratal` | `manali-chandratal-trip` | manali chandratal trip | chandratal trip from manali · manali to chandratal 3 days · chandratal lake road trip · manali chandratal package cost (TODO price) |
| `jibhi-shangarh` | `jibhi-shangarh-trip-from-delhi` | jibhi trip from delhi | jibhi shangarh trip · jibhi jalori pass trip · jibhi trip cost from delhi (TODO price) |
| `naggar-parashar` | `naggar-parashar-lake-trip` | parashar lake trek | prashar lake trek (use both spellings) · naggar parashar lake trip · naggar to prashar lake distance · naggar sightseeing |
| `manali-to-zanskar` | `manali-to-zanskar-expedition` | manali to zanskar expedition | manali zanskar road trip · zanskar valley trip from manali 4 days · shinku la route · phuktal monastery trek |
| `zanskar-padum-circuit` | `zanskar-padum-circuit` | zanskar padum circuit | zanskar valley 6 days itinerary · padum sightseeing · padum zangla karsha trip |
| `kasar-devi-munsiyari-khaliya-top` | `kasar-devi-munsiyari-khaliya-top-trip` | munsiyari trip from delhi | kasar devi munsiyari itinerary · munsiyari 4 days itinerary · khaliya top trek itinerary (in-page section) · munsiyari trip cost (TODO price) |
| `untouched-himalayas-darma-darchula` | `darma-valley-darchula-trip` | darma valley trip from delhi | darma valley itinerary 7 days · munsiyari to darma valley trip · darchula uttarakhand trip · darma valley inner line permit (TODO: confirm ILP process with client) |

H1 and visible title stay as the real trip name, e.g. "Into the Untouched Himalayas". The keyword goes in `<title>`, the meta description and a subtitle or intro line.

## Destination hubs — `/destinations/[slug]`

| Slug | Feeding trips | Primary | Secondary |
|---|---|---|---|
| `spiti` | spiti-valley-circuit-group-trip, manali-chandratal-trip | spiti valley travel guide | places to visit in spiti valley · best time to visit spiti valley · spiti valley itinerary |
| `kinnaur` | sangla-chitkul-kalpa-trip, spiti-valley-circuit-group-trip | kinnaur valley travel guide | places to visit in kinnaur · best time to visit kinnaur · how to reach kinnaur |
| `zanskar` | manali-to-zanskar-expedition, zanskar-padum-circuit | zanskar valley travel guide | places to visit in zanskar · best time to visit zanskar · manali to padum trip |
| `jibhi` | jibhi-shangarh-trip-from-delhi | jibhi travel guide | places to visit in jibhi · jibhi tirthan valley trip · best time to visit jibhi |
| `kumaon` | kasar-devi-munsiyari-khaliya-top-trip, darma-valley-darchula-trip | kumaon offbeat trip from delhi | offbeat places in uttarakhand · best time to visit munsiyari · kasar devi almora travel guide |

Not built now:
- `parvati`: no trip goes there. Rejected until the client sells a Parvati trip.
- `darma-valley`: only one trip feeds it, and its unique content (the permit/ILP process) is unverified. For now the Kumaon hub and the Darma trip page cover it. Build it once the client confirms the ILP details.
- Naggar–Parashar trip: no hub for it. It links to `/trips` and to the related Jibhi and Manali trips.

## Concept and core pages

| URL | Primary | Secondary |
|---|---|---|
| `/` | small-group trips himachal uttarakhand | group trips for solo travellers from delhi · untouch destination |
| `/trips` | himalayan group trips from delhi | himachal trips from delhi · uttarakhand trips from delhi · ladakh zanskar trips |
| `/group-trips-for-solo-travellers` | group trips for solo travellers | himachal group trip for solo travellers · uttarakhand group trip for solo travellers · solo trip to himachal · stranger trips |
| `/private-trips` | customised himachal trip from delhi *(no SERP research done — confirm before Phase 5)* | private group trip himachal uttarakhand |
| `/about` | untouch destination | chandigarh travel company · founder Ravi |

Cannibalisation check:
- "spiti valley group trip for solo travellers" belongs to the Spiti trip page only. The solo-travellers concept page targets the region-level variants.
- "manali chandratal trip" and "chandratal trip from manali" share most of their search results, so they stay on one page.
- "manali to zanskar expedition" and "zanskar padum circuit" share 0–2 results, so they get two separate pages that link to each other.

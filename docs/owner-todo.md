# Owner TODO — what Untouch Destination needs to send

Work continues without these. Anything missing stays `TODO:` in code and is left off the live site (never guessed). Tick when sent.

## Business facts
- [ ] **Business address** (full postal, Chandigarh) — for About page, footer, TravelAgency schema, Google Business Profile.
- [ ] **Google Business Profile** — exists? If yes, the link. If no, OK to create one?
- [ ] **Founder**: Ravi's full name, a real photo, 2–3 lines bio (years guiding, regions known). Replaces "Photo of Ravi — coming soon".
- [ ] Other social profiles besides Instagram (YouTube, Facebook, LinkedIn)?

## Legal pages (footer links currently 404)
- [ ] Terms & Conditions text
- [ ] Cancellation / refund policy text
- [ ] Privacy policy text

## Trips
- [ ] **Product type per trip** — which are Stranger Trips (groups for solo travellers), private/customised, experience trips:
  | Trip | Stranger | Private | Experience |
  |---|---|---|---|
  | Jibhi & Shangarh | | | |
  | Kasar Devi · Munsiyari · Khaliya Top | | | |
  | Manali & Chandratal | | | |
  | Manali to Zanskar | | | |
  | Into the Untouched Himalayas (Darma) | | | |
  | Naggar & Parashar Lake | | | |
  | Sangla · Chitkul · Kalpa | | | |
  | Spiti Circuit | | | |
  | Zanskar Padum Circuit | | | |
- [ ] **Price per person** for each trip (and what's included / excluded).
- [ ] **Departure dates** or "every weekend / on request" per trip.
- [ ] **Best months** you actually run each trip.
- [ ] **Group size** (typical min–max).
- [ ] **Darma Valley permit**: how the Inner Line Permit works on your trip (who arranges, documents needed).
- [ ] Private trips: mostly Himachal, Uttarakhand, or both?

## Trust signals (currently hidden because not real)
- [ ] Real reviews: name (or initials), trip, month/year, text, and where it came from (Google, Instagram DM, WhatsApp). Only verifiable ones.
- [ ] Real stats: trips run, travellers hosted, years operating — numbers you can stand behind.

## FAQ copy
- [ ] Approve or correct the 3 homepage FAQ answers (they're placeholders). Two need facts: "a large share of our groups are solo women" (true?) and "every itinerary lists a difficulty level" (we don't show one yet — give a level per trip, or drop the line). FAQ schema goes live after approval.

## Design decision (speed)
- [ ] The 1.6 s logo loading screen and the hero text fade-in are the main reason the page's main content shows at ~5.8 s on mobile (Google wants < 2.5 s). OK to (a) shorten the loader to ~0.5 s or show it only on first visit, and (b) show the hero headline immediately (photo still fades/parallaxes)? Nothing else about the look changes.

## Site changes to sign off
- [ ] Homepage trip cards now open their own page (`/trips/<trip>`) instead of a pop-up. Same card look. Needed so Google can read the day-by-day itineraries. OK?
- [ ] New pages: `/trips`, `/destinations` (Spiti, Kinnaur, Zanskar, Jibhi, Kumaon guides), `/group-trips-for-solo-travellers`, `/private-trips`, `/about`. Read them once and flag anything wrong.
- [ ] `/about` reuses the homepage "About Untouch" and "About Ravi" text. A longer, different story for `/about` (how it started, how you pick routes) would rank better.
- [ ] "Plan a custom trip" button in the hero now goes to `/private-trips` (was: scroll to contact). OK?

## Photos
- [ ] Any trip photos you own that should replace current ones (best: 1 landscape per trip, 1600px+).

## Domain (when ready)
- [ ] Domain name. Then: set `NEXT_PUBLIC_SITE_URL` on Vercel, add domain as primary, redirect vercel.app → domain, verify in Google Search Console. Steps in `docs/seo/offsite-checklist.md`.

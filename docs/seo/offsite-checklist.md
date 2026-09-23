# Off-site SEO checklist — Untouch Destination

Things that happen outside the code. Owner does most of these; each says who.

## 1. Domain migration (do first — everything below depends on the final URL)
1. Buy the domain (e.g. `untouchdestination.com` / `.in`). **Owner**
2. Vercel → Project → Settings → Domains → add `example.com` and `www.example.com`; set one as primary (the other redirects 308). Add the DNS records Vercel shows at the registrar. **Owner / dev**
3. Vercel → Settings → Environment Variables → `NEXT_PUBLIC_SITE_URL=https://example.com` (Production). Redeploy. This one variable updates canonicals, OG URLs, sitemap, robots and JSON-LD. **Dev**
4. Make `udv-new.vercel.app` redirect to the new domain (Vercel: set the custom domain as primary; the `.vercel.app` URL keeps serving, so add a redirect in `next.config` `redirects()` with a `has: [{ type: "host", value: "udv-new.vercel.app" }]` rule if Google has indexed it). **Dev**
5. Check: `curl -I https://udv-new.vercel.app/trips` → 308 to new domain; `https://example.com/sitemap.xml` lists new-domain URLs. **Dev**
6. Update Instagram bio link, WhatsApp Business profile website, Google Business Profile website. **Owner**

## 2. Google Search Console
1. Add a **Domain property** (DNS TXT record) for the new domain. **Owner**
2. Submit `https://example.com/sitemap.xml`. **Owner**
3. URL Inspection → Request indexing for `/`, `/trips`, and the 5 `/destinations/*` hubs. **Owner**
4. If the `.vercel.app` URL was verified too: Settings → Change of address → new domain. **Owner**
5. After 2–4 weeks: Pages report (indexed vs excluded), Performance report (queries). Give access to the dev for `/seo google` reports. **Owner**

## 3. Bing Webmaster Tools
Import from Search Console (one click). Also feeds ChatGPT/Copilot search. **Owner**

## 4. Google Business Profile
Service-area business (no public address needed): category "Tour operator" / "Travel agency", service area Delhi NCR + Chandigarh, website = new domain, WhatsApp number, Instagram photos. Ask real past travellers for reviews here — these are the only reviews that count until the site has verified ones. **Owner**

## 5. Citations / listings (same name, phone, email everywhere — "Untouch Destination", +91 88008 88489)
- Instagram bio, Facebook page, JustDial, TripAdvisor (tour operator), Thrillophilia / TravelTriangle listings if you sell there. **Owner**

## 6. Links worth getting
- Homestays/camps you use (Jibhi, Chitkul, Khaliya Top, Gumbok Rangan): ask them to link to the trip page for their village.
- Travel bloggers who joined a trip: link to the trip page, not the homepage.
- Reddit/Quora answers on "Spiti from Delhi", "Zanskar via Shinku La" — only genuine, disclosed replies.

## 7. Content to send the dev (unlocks more SEO) — see `docs/owner-todo.md`
Prices & dates, real reviews/stats, FAQ answers, address, legal pages, best time to visit per region, group size.

@AGENTS.md

## SEO rules (Untouch Destination)
- Brand name is exactly "Untouch Destination".
- Site constants live in a plain module with no `"use client"`; never import values from client modules into server components.
- Trip facts come from one typed data file; homepage, pages, sitemap, schema and OG images read from it.
- Never invent prices, dates, stats, reviews or ratings — use `TODO:` and ask. No Review/AggregateRating schema without verified reviews.
- All meaningful text must be in server-rendered HTML; animated/duplicate layers are `aria-hidden`.
- No extra SEO npm packages. Don't change the visual design without asking.
- SEO docs: `docs/seo/`; log in `docs/progress.md`, tasks in `docs/checklist.md`.

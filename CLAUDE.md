@AGENTS.md

## SEO rules (Untouch Destination)
- Brand name is exactly "Untouch Destination".
- Site constants live in a plain module with no `"use client"`; never import values from client modules into server components.
- Trip facts come from one typed data file; homepage, pages, sitemap, schema and OG images read from it.
- Never invent prices, dates, stats, reviews or ratings — use `TODO:` and ask. No Review/AggregateRating schema without verified reviews.
- All meaningful text must be in server-rendered HTML; animated/duplicate layers are `aria-hidden`.
- No extra SEO npm packages. Don't change the visual design without asking.
- SEO docs: `docs/seo/`; log in `docs/progress.md`, tasks in `docs/checklist.md`.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).

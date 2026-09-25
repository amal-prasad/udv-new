# Graph Report - udv_new  (2026-09-24)

## Corpus Check
- Large corpus: 144 files · ~1,056,653 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder.

## Summary
- 517 nodes · 830 edges · 48 communities (26 shown, 22 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 41 edges (avg confidence: 0.54)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Homepage & About Sections
- Destinations Pages
- WebGL Circular Gallery
- Sitemap & Breadcrumbs SEO
- shadcn/ui Component System
- Root Layout & Fonts
- 3D Globe Visualization
- About Page & Owner Bio
- Trip 8-9 Sitemap & Photos
- Himachal Trips Photo Gallery
- TypeScript Config
- Fonts & Animation Libraries
- Package Dependencies (UI)
- Package Dependencies (Motion)
- Darma Valley & Kumaon Trip
- Zanskar Expedition Trip
- Reviews & Trust Bar
- Button UI Component
- Sangla-Chitkul-Kalpa Trip
- Spiti Valley Circuit Trip
- Dev Dependencies
- Blur Placeholder Generation
- Trip 5 Photos
- Trip 6 Photos
- Trip 7 Photos
- NPM Scripts
- SEO Docs & Progress Log
- Trip 4 Photos (partial)
- PostCSS Config
- Token Save Database
- Meta Description
- Trip 8 Photo 2
- Trip 8 Photo 3
- Trip 8 Photo 4
- Trip 8 Photo 5
- Trip 9 Photo 1
- Trip 9 Photo 2
- Trip 9 Photo 3
- Trip 9 Photo 4
- Trip 9 Photo 5
- Trips Hero Image 1
- Trips Hero Image 2
- Trips Hero Image 3
- Trips Hero Image 4
- Trips Hero Image 5
- TouristDestination Schema
- Trip Photos Constant

## God Nodes (most connected - your core abstractions)
1. `next` - 27 edges
2. `blurFor()` - 20 edges
3. `App` - 18 edges
4. `framer-motion` - 18 edges
5. `react` - 17 edges
6. `compilerOptions` - 16 edges
7. `SITE` - 12 edges
8. `Trip Detail Page` - 12 edges
9. `Globe()` - 11 edges
10. `Spiti Circuit Trip` - 11 edges

## Surprising Connections (you probably didn't know these)
- `Spiti Circuit Trip` ----> `Trip 8 Cover Image`  [INFERRED]
  data/trips.ts → public/images/trip-8-cover.webp
- `Zanskar Padum Circuit Trip` ----> `Image: trip-9-cover`  [INFERRED]
  data/trips.ts → public/images/trip-9-cover.webp
- `Keyword Map` ----> `Trip Detail Page`  [INFERRED]
  docs/seo/keyword-map.md → app/trips/[slug]/page.tsx
- `Keyword Map` ----> `Sitemap`  [INFERRED]
  docs/seo/keyword-map.md → app/sitemap.ts
- `Jibhi & Shangarh Trip Photo` ----> `Jibhi & Shangarh`  [EXTRACTED]
  public/images/trips/jibhi-shangarh.jpg → data/trips.ts

## Import Cycles
- None detected.

## Communities (48 total, 22 thin omitted)

### Community 0 - "Homepage & About Sections"
Cohesion: 0.06
Nodes (41): galleryItems, metadata, AboutUntouch(), PARAGRAPHS, FAQ_ITEMS, FaqItem, FaqPreview(), FeaturedItineraries() (+33 more)

### Community 1 - "Destinations Pages"
Cohesion: 0.08
Nodes (41): DestinationsPage(), metadata, DestinationPage(), dynamicParams, generateMetadata(), HIMACHAL_UTTARAKHAND, metadata, metadata (+33 more)

### Community 2 - "WebGL Circular Gallery"
Cohesion: 0.09
Nodes (15): App, autoBind(), CircularGallery(), createTextTexture(), debounce(), deriveFontFamilyFromUrl(), getFontSize(), lerp() (+7 more)

### Community 3 - "Sitemap & Breadcrumbs SEO"
Cohesion: 0.09
Nodes (29): Sitemap, blurFor, BreadcrumbList schema, cn, Breadcrumbs, PHOTO_SCRIM, Crumb type, destinations data (+21 more)

### Community 4 - "shadcn/ui Component System"
Cohesion: 0.08
Nodes (25): aliases, components, hooks, lib, ui, utils, Authorization, iconLibrary (+17 more)

### Community 5 - "Root Layout & Fonts"
Cohesion: 0.09
Nodes (18): app_globals, bricolage, geist, inter, metadata, TODO: add `address` once the client sends it (docs/owner-todo.md)., TRAVEL_AGENCY, LoadingScreen() (+10 more)

### Community 6 - "3D Globe Visualization"
Cohesion: 0.14
Nodes (17): DEFAULT_ARCS, DEFAULT_MARKERS, DELHI, fibonacciSphere(), Globe(), frame(), render(), GlobeArc (+9 more)

### Community 7 - "About Page & Owner Bio"
Cohesion: 0.14
Nodes (15): metadata, AboutOwner(), PARAGRAPHS, BlurHighlight(), BlurHighlightProps, Chunk, EASE_OUT_EXPO, EASE_OUT_QUINT (+7 more)

### Community 8 - "Trip 8-9 Sitemap & Photos"
Cohesion: 0.11
Nodes (18): Trip 8 Photo 1, Trip 8 Cover Image, Image: trip-9-cover, Chitkul, Drang Drung Glacier, Hikkim, Kalpa, Kaza (+10 more)

### Community 9 - "Himachal Trips Photo Gallery"
Cohesion: 0.11
Nodes (19): Jibhi & Shangarh Trip Photo, Manali & Chandratal Trip Photo, Naggar & Parashar Lake Trip Photo, Atal Tunnel, Chandratal Lake, High altitude camping, Jalori Pass, Jana Waterfall (+11 more)

### Community 10 - "TypeScript Config"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 11 - "Fonts & Animation Libraries"
Cohesion: 0.12
Nodes (16): Bricolage Grotesque font, Footer, Navbar, Framer Motion 12.23.12, Geist font, GSAP 3.13.0, Image configuration, Inter font (+8 more)

### Community 12 - "Package Dependencies (UI)"
Cohesion: 0.12
Nodes (15): name, private, version, clsx, lucide-react, react-dom, shadcn, tailwind-merge (+7 more)

### Community 13 - "Package Dependencies (Motion)"
Cohesion: 0.12
Nodes (16): dependencies, @base-ui/react, class-variance-authority, clsx, cn, framer-motion, gsap, lenis (+8 more)

### Community 14 - "Darma Valley & Kumaon Trip"
Cohesion: 0.15
Nodes (13): Darma Valley to Darchula Trip Photo, Kasar Devi, Munsiyari & Khaliya Top Trip Photo, Alpine meadows, Border town, Darchula, Darma Valley, Kasar Devi Temple, Khaliya Top (+5 more)

### Community 15 - "Zanskar Expedition Trip"
Cohesion: 0.15
Nodes (13): Manali to Zanskar Expedition Photo, Zanskar Padum Circuit Trip Photo, Drang Drung Glacier, Expedition, Padum, Phuktal Monastery, Sani Monastery, Shinku La Pass (+5 more)

### Community 16 - "Reviews & Trust Bar"
Cohesion: 0.21
Nodes (8): COLUMNS, Reviews(), TrustBar(), ALL_REVIEWS, ALL_STATS, Review, REVIEWS, STATS

### Community 17 - "Button UI Component"
Cohesion: 0.33
Nodes (5): Button(), buttonVariants, @base-ui/react, class-variance-authority, cn

### Community 18 - "Sangla-Chitkul-Kalpa Trip"
Cohesion: 0.29
Nodes (7): Sangla, Chitkul & Kalpa Trip Photo, Chitkul (border village), Kalpa, Kinner Kailash, Sangla, Kinnaur, Himachal, Sangla · Chitkul · Kalpa

### Community 19 - "Spiti Valley Circuit Trip"
Cohesion: 0.29
Nodes (7): Spiti Valley Circuit Trip Photo, Hikkim Post Office, Komik Village, Langza, Tabo Monastery, Spiti, Himachal, Spiti Circuit

### Community 20 - "Dev Dependencies"
Cohesion: 0.29
Nodes (7): devDependencies, tailwindcss, @tailwindcss/postcss, @types/node, @types/react, @types/react-dom, typescript

### Community 21 - "Blur Placeholder Generation"
Cohesion: 0.29
Nodes (6): ref_fs, ref_sharp, files, fs, sharp, src

### Community 22 - "Trip 5 Photos"
Cohesion: 0.60
Nodes (6): Trip 5 Photo 1, Trip 5 Photo 2, Trip 5 Photo 3, Trip 5 Photo 4, Trip 5 Photo 5, Trip 5 Cover Image

### Community 23 - "Trip 6 Photos"
Cohesion: 0.60
Nodes (6): Trip 6 Photo 1, Trip 6 Photo 2, Trip 6 Photo 3, Trip 6 Photo 4, Trip 6 Photo 5, Trip 6 Cover Image

### Community 24 - "Trip 7 Photos"
Cohesion: 0.60
Nodes (6): Trip 7 Photo 1, Trip 7 Photo 2, Trip 7 Photo 3, Trip 7 Photo 4, Trip 7 Photo 5, Trip 7 Cover Image

### Community 25 - "NPM Scripts"
Cohesion: 0.40
Nodes (5): scripts, build, dev, lint, start

## Knowledge Gaps
- **242 isolated node(s):** `CrowdCanvasProps`, `Peep`, `metadata`, `dynamicParams`, `metadata` (+237 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 278 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **22 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `Homepage & About Sections` to `Destinations Pages`, `Package Dependencies (UI)`, `Root Layout & Fonts`?**
  _High betweenness centrality (0.116) - this node is a cross-community bridge._
- **Why does `react` connect `Homepage & About Sections` to `WebGL Circular Gallery`, `Root Layout & Fonts`, `3D Globe Visualization`, `About Page & Owner Bio`, `Package Dependencies (UI)`?**
  _High betweenness centrality (0.068) - this node is a cross-community bridge._
- **Why does `PHOTO_SCRIM` connect `Sitemap & Breadcrumbs SEO` to `Destinations Pages`?**
  _High betweenness centrality (0.066) - this node is a cross-community bridge._
- **What connects `CrowdCanvasProps`, `Peep`, `metadata` to the rest of the system?**
  _242 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Homepage & About Sections` be split into smaller, more focused modules?**
  _Cohesion score 0.0642243328810493 - nodes in this community are weakly interconnected._
- **Should `Destinations Pages` be split into smaller, more focused modules?**
  _Cohesion score 0.08397337429595494 - nodes in this community are weakly interconnected._
- **Should `WebGL Circular Gallery` be split into smaller, more focused modules?**
  _Cohesion score 0.0858974358974359 - nodes in this community are weakly interconnected._
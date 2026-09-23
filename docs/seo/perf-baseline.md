# Performance Baseline — udv-new.vercel.app (/)

Captured 2026-09-23. Method: PSI API had no key and the shared/unauthenticated quota was exhausted (`PSI rate limit exceeded (240 QPM / 25,000 QPD)` from `pagespeed_check.py`). Fell back to **Lighthouse CLI** (`npx lighthouse@13`, mobile form factor, simulated throttling, headless Chrome) run directly against the live URL. Raw report: `lh-mobile.json` (scratchpad, not committed — re-run to reproduce).

chrome-devtools MCP's own browser instance could not be used (its persistent profile dir was already locked by another running Chrome session), so the CLI was the working path.

## Scores (Lighthouse, mobile, simulated throttling)

| Category | Score |
|---|---|
| Performance | **48 / 100** |
| Accessibility | 92 / 100 |
| Best Practices | 100 / 100 |
| SEO | 100 / 100 |
| Agentic browsing | 50 / 100 |

## Core Web Vitals / lab metrics

| Metric | Value |
|---|---|
| **LCP** | **6.9 s** |
| **CLS** | **0** |
| **TBT** | **1,040 ms** |
| Max potential FID | 560 ms |
| FCP | 1.5 s |
| Speed Index | 6.3 s |
| Time to Interactive | 8.6 s |

No field CWV (CrUX) data — no PSI key, so this is lab-only.

## LCP element

`main > section.relative > div.relative > p.max-w-xl` — the hero subhead paragraph ("Small group and custom trips across India along roads less travelled...").

LCP breakdown audit reports: TTFB 102 ms, element render delay 1,478 ms. That partial sum (~1.6 s) doesn't reconcile with the 6.9 s simulated-throttling LCP value — a known Lighthouse quirk where the breakdown subparts are computed on the observed trace while the headline LCP is simulated-throttled. Directionally consistent with the baseline note: hero starts at `opacity:0`/blurred and only paints after hydration + a loading overlay, and TBT of 1,040 ms means the main thread is busy for over a second before the LCP element can render — this is a render-delay problem, not a network problem.

## Top opportunities (by measured savings)

1. **Improve image delivery — ~781 KiB.** Worst offender: `/images/1.JPEG` (793 KB), used inside `MaskedHeading`'s `<img>` at 364×485 display size but served at 1920×491 with no modern format — 645 KB wasted on oversized dimensions alone, another 637 KB available from switching to WebP/AVIF (already enabled in `next.config.ts`, so this file just isn't going through `next/image`).
2. **Render-blocking CSS — 2 requests** (`39rrstmrzrssf.css` 14.1 KB, `1mt39xg9s5n3i.css` 0.9 KB) sit on the critical path before first paint.
3. **Legacy JavaScript — ~14 KiB** wasted shipping `Array.prototype.at/flat/flatMap`, `Object.fromEntries` polyfills/transforms to browsers that already support them (next/babel target config).
4. **High TBT (1,040 ms) / TTI (8.6 s)** — consistent with baseline's "nearly every component is `use client`" finding; main-thread JS is the dominant cost, not network.

## Read-through to baseline

- Confirms baseline's flagged risk (issue #11: "Hero starts at `opacity:0` + blur until hydration, plus LoadingScreen overlay → LCP risk") — LCP is 6.9 s, well past the 2.5 s "good" threshold, and the render delay is main-thread bound, matching TBT.
- CLS is genuinely 0 — no layout-shift issue despite the animated/duplicated DOM.
- Accessibility 92/100 and SEO 100/100 (Lighthouse's own on-page checks) are not in scope here — see `00-baseline.md`'s on-page/content sections instead, which used codebase grep and are more detailed.

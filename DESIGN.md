# DESIGN.md — Untouch Destination

## Product truth

Small-group and custom trips across Himachal, Uttarakhand and further. Most
travellers book **solo**. The promise is the line in the hero: *strangers get on
the bus, friends get off.* Conversion happens on WhatsApp, not in a form.

Surface: the marketing homepage. Mode: **Persuade** — the visitor decides and
acts. Design is the product here.

## The world: Alpenglow

The twenty minutes of light that make someone book a Himalayan trip.

**The one rule: light is directional and consistent.** Warm sun enters from the
**top-right** — the way it hits a ridge at dawn. Cold blue shadow pools at the
**bottom-left**. Every gradient on this site describes where the sun is. A
gradient that doesn't is decoration, and decoration is what makes a page read as
generated. Delete it.

Consequences:

- Dark sections get `.sun-wash` (warm top-right, glacier bottom-left) as an
  absolutely-positioned layer behind content.
- Pale sections get `.sun-wash-light`.
- Photo scrims are warm at the top-right edge, cool and deep at the bottom.
- Shadows fall down-and-left, always with an offset **and** a soft blur, tinted
  with ink — never a zero-offset coloured halo.

**The Escape section is the exception and the pivot.** It is pure white, hard
black line art, no warm light at all — the city you are leaving, before dawn.
Going from the ink hero into that white is the loudest cut on the page. Keep it
that way: no warm gradients in there, no softening.

## Tokens (already in `app/globals.css`)

Colour: `ink` `#1e3140` · `night` `#101b24` · `paper` `#edede7` · `summit`
`#ffffff` · `alpenglow` `#e8562b` · `dawn` `#f5a14c` · `ember` `#b84b27` ·
`glacier` `#7fb0cd` · `pine` `#3e5c46` · `mist` `#c7c9c2` · `cloud` `#aeb8be` ·
`slate` `#5b7183`.

Use as Tailwind utilities: `bg-night`, `text-alpenglow`, `border-mist`, …

Shadow: `shadow-lift` (cards), `shadow-deep` (floating/pinned), `shadow-glow`
(primary CTA only). Radii: `rounded-4xl`, `rounded-5xl`.
Ease: `var(--ease-out-expo)`, `var(--ease-out-quint)`.

Helper classes: `.sun-wash` · `.sun-wash-light` · `.sheen` (hover specular sweep
— primary CTAs only, one per screen) · `.rule-fade` · `.grain` (needs
`relative`; `::before` overlay, so give content `relative z-10`).

## Type

- Display: `font-display` (Bricolage Grotesque), `font-semibold`,
  `tracking-tight`. Section headings `text-3xl md:text-5xl`. Hero may go to
  `text-8xl`. Never past `6rem` except the hero.
- Body: `font-sans` (Inter). Measure **65–75ch** — use `max-w-[62ch]` or
  narrower on long paragraphs. Body text ≥ 4.5:1 contrast.
- On ink: body is `text-cloud`, never a neutral grey. On paper: `text-slate`.

## Rhythm — this is what currently reads as slop

Today almost every section is the same object: `h2` on `bg-paper`, then a grid.
Same width, same entrance animation, same vertical padding. Fix by varying the
**container**, not by adding ornament:

- Alternate ground: paper → summit (escape) → paper → ink → paper → night.
- Vary measure: full-bleed, `max-w-5xl`, and one deliberately narrow
  `max-w-2xl` moment.
- Vary heading placement: centred, left-aligned, and once set against the
  opposite column.
- More space **above** a heading than below it.

## Motion

One authored moment per section, not the same fade-up on all of them. Ease out
exponentially from an already-visible default — content must never depend on JS
to become visible. Reach past transform/opacity: blur, `clip-path`, mask, and
shadow are in the palette. All scroll work runs on the existing Lenis + GSAP
ticker in `components/SmoothScroll.tsx`; do not create a second Lenis instance.

Every motion-driven section needs a `motion-reduce` path that renders the same
content statically.

## Do not

- Gradient text. Emphasis is weight and size.
- `01 / 02 / 03` section numbers, and a tracked uppercase eyebrow over every
  section. One named kicker is a system; an eyebrow everywhere is not a decision.
- Same-size icon-heading-text cards as the page structure. Never nest cards.
- Glass/blur as decoration. Blur is for the navbar over photography, nothing else.
- Monospace as a "technical" costume.
- Any shadow without an offset.

## Assets

- `LOGO` → `/logo-mark.png` (colour, pale surfaces)
- `LOGO_LIGHT` → `/logo-mark-light.png` (knocked out to paper-white, ink
  surfaces — use it **as-is**, do not apply `brightness-0 invert`)
- `PEEPS_SPRITE` → real Open Peeps atlas, `PEEPS_COLS` 15 × `PEEPS_ROWS` 7
- Trip photos are 3–20 MB camera originals. Always `next/image` with a real
  `sizes`, and `priority` only on the hero.

## Copy

Plain, dry, slightly wry. Short sentences. The product's own voice, already set
in the existing copy — keep it. Placeholder figures and `[City]` are the
client's to fill; leave the comments marking them.

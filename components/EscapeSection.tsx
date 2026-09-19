"use client";

import MaskedHeading from "@/components/MaskedHeading";
import { TRIP_PHOTOS } from "@/lib/images";

/**
 * The pivot. Everything around this section is warm, lit and photographic;
 * this one is paper-white with nothing in it but ink line art — the city you
 * are leaving, before the sun is up. Cutting from the hero's dark photograph
 * straight into this white is the loudest moment on the page, so it gets no
 * gradient, no scrim and no warm light. See DESIGN.md.
 */
export function EscapeSection() {
  return (
    <section className="relative isolate flex min-h-[88svh] w-full flex-col overflow-hidden bg-summit">
      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center gap-5 px-6 pt-[18vh] text-center">
        {/* The headline is cut out of a trip photo — on this paper-white
            section the photo IS the colour. Darkened and saturated so the
            letterforms still read as type against the white. */}
        <MaskedHeading
          tag="h2"
          text="Tired of the daily grind?"
          src={TRIP_PHOTOS[0]}
          className="w-full font-display"
          // ponytail: textScale/brightness tuned by eye to land near the old
          // clamp(2.5rem,8vw,5rem). Nudge these, not the CSS.
          textScale={0.135}
          weight={600}
          tracking={-0.02}
          lineHeight={0.95}
          brightness={0.78}
          saturation={1.15}
          reveal="rise"
          trigger="view"
          stagger={0.16}
        />

        <p className="max-w-[46ch] text-lg text-slate md:text-xl">
          Log off, pack light, and disappear into the hills — with people who get it.
        </p>
      </div>
    </section>
  );
}

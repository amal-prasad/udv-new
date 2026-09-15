"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { CrowdCanvas } from "@/components/CrowdCanvas";
import { PEEPS_COLS, PEEPS_ROWS, PEEPS_SPRITE } from "@/lib/images";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/**
 * The pivot. Everything around this section is warm, lit and photographic;
 * this one is paper-white with nothing in it but ink line art — the city you
 * are leaving, before the sun is up. Cutting from the hero's dark photograph
 * straight into this white is the loudest moment on the page, so it gets no
 * gradient, no scrim and no warm light. See DESIGN.md.
 *
 * The crowd is a real sprite-sheet animation (components/CrowdCanvas.tsx),
 * not an image — the people have to actually walk past, indifferent, for the
 * headline to land.
 */
export function EscapeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  // The trigger watches the SECTION, never the headline. The headline's own
  // reveal clips it to `inset(100%)`, and Chromium's IntersectionObserver
  // takes clip-path into account — an element hidden that way reports a zero
  // intersection ratio forever, so a `whileInView` on the headline itself can
  // never fire and the text stays invisible. Observe something that is never
  // clipped and drive the child from it.
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Server-rendered markup is the visible state, so the headline is readable
  // with JS off or still loading. Hiding only happens once we're hydrated and
  // know the observer is live, and that first flip is instant, not animated.
  const [armed, setArmed] = useState(false);
  useEffect(() => setArmed(true), []);
  const hidden = armed && !reduced && !inView;

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-[88svh] w-full flex-col overflow-hidden bg-summit"
    >
      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center gap-5 px-6 pt-[18vh] text-center">
        {/* The authored moment: the headline wipes up from behind its own
            baseline as the blur clears, like something coming into focus.
            Under reduced motion it is simply already there. */}
        <motion.h2
          initial={false}
          animate={
            hidden
              ? { clipPath: "inset(100% 0% 0% 0%)", filter: "blur(6px)", y: 14 }
              : { clipPath: "inset(0% 0% 0% 0%)", filter: "blur(0px)", y: 0 }
          }
          transition={hidden ? { duration: 0 } : { duration: 0.9, ease: EASE_OUT_EXPO }}
          className="font-display text-[clamp(2.5rem,8vw,5rem)] font-semibold leading-[0.95] tracking-tight text-ink"
        >
          Tired of the same four walls?
        </motion.h2>

        <motion.p
          initial={false}
          animate={hidden ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 }}
          transition={
            hidden ? { duration: 0 } : { duration: 0.7, delay: 0.25, ease: EASE_OUT_EXPO }
          }
          className="max-w-[46ch] text-lg text-slate md:text-xl"
        >
          Log off, pack light, and disappear into the hills — with people who get it.
        </motion.p>
      </div>

      {/* The crowd owns the lower band. pointer-events-none so the canvas
          never eats a scroll gesture or a tap meant for the page. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[56%]">
        <CrowdCanvas src={PEEPS_SPRITE} cols={PEEPS_COLS} rows={PEEPS_ROWS} />
      </div>
    </section>
  );
}

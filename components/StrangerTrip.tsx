"use client";

import { motion } from "framer-motion";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export function StrangerTrip() {
  return (
    // ponytail: this was a 300vh pinned, scroll-linked 3D reveal. The transform
    // threw the headline off both edges and `useScroll({target})` reported a
    // non-monotonic progress that faded the copy back out halfway through the
    // pin. Two sentences do not need two extra screens of scroll — a plain
    // in-view reveal says the same thing and cannot desync.
    <section className="relative z-0 flex min-h-[70vh] w-full items-center overflow-hidden bg-ink px-6 py-[14vh] text-paper">
      <div className="sun-wash absolute inset-0" aria-hidden />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-7 text-center"
      >
        <h2 className="font-display text-[clamp(2.25rem,5.5vw,5rem)] font-bold leading-[0.95] tracking-tight text-paper">
          You don&apos;t need a travel buddy. You need a departure date.
        </h2>
        <p className="max-w-2xl text-base text-cloud md:text-lg">
          Most of our group trips fill up with people who signed up solo. That&apos;s the point. By
          day two you&apos;re not fifteen strangers in a Tempo Traveller — you&apos;re a group with{" "}
          <span className="text-dawn">inside jokes</span> already.
        </p>
      </motion.div>
    </section>
  );
}

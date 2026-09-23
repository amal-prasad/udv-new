"use client";

import { motion, useReducedMotion } from "framer-motion";

import { STATS } from "@/lib/social-proof";

// A thin punctuation band between two big sections, not another section of
// its own — dark, short, lit the same way the ink sections around it are.
export function TrustBar() {
  const reduceMotion = useReducedMotion();
  if (STATS.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-ink">
      <div className="sun-wash absolute inset-0" aria-hidden />
      <motion.div
        initial={reduceMotion ? undefined : { opacity: 0, y: 10 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-auto flex max-w-5xl flex-wrap items-center justify-center divide-x divide-paper/15 px-6 py-10 text-center md:py-12"
      >
        {STATS.map((stat) => (
          <div key={stat.label} className="flex items-baseline gap-2 px-6 first:pl-0 last:pr-0">
            <span className="font-display text-2xl font-semibold text-paper md:text-3xl">
              {stat.value}
            </span>
            <span className="text-sm text-cloud">{stat.label}</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

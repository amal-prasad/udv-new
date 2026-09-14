"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PEEPS_SPRITE } from "@/lib/images";

/**
 * The crowd artwork is a single illustrated scene anchored to the bottom of the
 * band, not a walkable sprite atlas — see components/CrowdCanvas.tsx for the
 * animated version and what it needs. Here it drifts up slightly as the section
 * scrolls through, which reads as the crowd closing in without any per-frame work.
 */
function CrowdBand() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%]">
      <motion.div
        className="absolute inset-x-0 bottom-0 h-full"
        style={reduced ? undefined : { y }}
      >
        <Image
          src={PEEPS_SPRITE}
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="object-cover object-bottom"
          priority={false}
        />
      </motion.div>
      {/* Melt the top edge of the artwork into the ink background. */}
      <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-ink to-transparent" />
    </div>
  );
}

export function EscapeSection() {
  return (
    <section className="relative flex h-[85dvh] w-full flex-col overflow-hidden bg-ink">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-4 px-4 pt-[14vh] text-center"
      >
        <h2 className="font-display text-4xl font-semibold tracking-tight text-paper md:text-6xl">
          Tired of the same four walls?
        </h2>
        <p className="max-w-md text-lg text-cloud">
          Log off, pack light, and disappear into the hills — with people who get it.
        </p>
      </motion.div>
      <CrowdBand />
    </section>
  );
}

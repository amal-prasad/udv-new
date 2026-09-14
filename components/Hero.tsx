"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { HERO_IMAGE } from "@/lib/images";

export function Hero() {
  return (
    <section className="relative h-[100dvh] w-full overflow-hidden">
      <Image
        src={HERO_IMAGE}
        alt="A group trekking through the Himalayan hills at golden hour"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/20 to-ink/40" />

      <div className="relative z-10 flex h-full max-w-5xl flex-col justify-end gap-6 px-6 pb-28 md:px-10 md:pb-32">
        <h1 className="font-display text-5xl font-semibold leading-[0.95] tracking-tight text-paper md:text-7xl lg:text-8xl">
          Strangers get on the bus. Friends get off.
        </h1>
        <p className="max-w-xl text-base text-paper/90 md:text-lg">
          Small-group and custom trips across Himachal, Uttarakhand and the roads less mapped — for people who&apos;d
          rather travel real than travel comfortable.
        </p>
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Link
            href="#itineraries"
            className="rounded-full bg-ember px-6 py-3 text-sm font-medium text-paper transition-opacity hover:opacity-90"
          >
            See upcoming trips
          </Link>
          <Link
            href="#plan"
            className="rounded-full border border-paper bg-transparent px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-paper/10"
          >
            Plan a custom trip
          </Link>
        </div>
      </div>

      <ScrollCue />
    </section>
  );
}

function ScrollCue() {
  const reduceMotion = useReducedMotion();
  return (
    <div className="absolute inset-x-0 bottom-8 z-10 flex justify-center">
      <motion.div
        className="h-10 w-px bg-paper/60"
        animate={reduceMotion ? undefined : { scaleY: [1, 0.4, 1], opacity: [0.6, 1, 0.6] }}
        transition={reduceMotion ? undefined : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{ originY: 0 }}
      />
    </div>
  );
}

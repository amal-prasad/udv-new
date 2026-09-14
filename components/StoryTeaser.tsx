"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { TRIP_PHOTOS } from "@/lib/images";

export function StoryTeaser() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="story" className="relative bg-paper px-6 py-20 md:px-10 md:py-28 grain">
      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-12 md:items-center md:gap-8">
        <motion.div
          className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-lift md:col-span-5"
          initial={reduceMotion ? undefined : { clipPath: "inset(0% 38% 0% 0% round 1.5rem)" }}
          whileInView={reduceMotion ? undefined : { clipPath: "inset(0% 0% 0% 0% round 1.5rem)" }}
          // Chromium's IntersectionObserver measures the clipped area, so the
          // 38% inset caps this element's ratio at ~0.62. Keep the threshold
          // well under that or the reveal can never trigger itself.
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={TRIP_PHOTOS[0]}
            alt="An early trip that shaped how Untouch Destination travels"
            fill
            sizes="(min-width: 768px) 42vw, 100vw"
            className="object-cover"
          />
        </motion.div>

        <div className="flex flex-col gap-5 md:col-span-7 md:col-start-6">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink md:text-5xl">
            It started with one solo trip that went wrong in all the right ways.
          </h2>
          {/* Placeholder narrative — real founder anecdote pending from the client. */}
          <p className="max-w-md text-base text-slate md:text-lg">
            A missed bus, a borrowed motorcycle, and a village that fed us before it asked our names. That trip
            taught us more than any guidebook. We&apos;ve been chasing that feeling for everyone since.
          </p>
          {/* TODO(client): the "Read the full story →" link lived here and
              pointed at /our-story, a route this project does not have — it
              404'd. Restore it once that page exists. */}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BlurHighlight } from "@/components/BlurHighlight";
import { HyperText } from "@/components/HyperText";

const PARAGRAPHS = [
  {
    text: "Our founder, Ravi, spent his childhood split between the modern metropolis of Delhi and his familial village in rural Haryana. From a young age he witnessed the vast diversity and multitude manifestations of our world.",
    highlight: ["vast diversity and multitude manifestations"],
  },
  {
    text: "As he grew into adulthood, his yearning to learn more about the world developed into a profound connection to travel. Ravi found that as he travelled, not only did he learn about the world, but he learned about himself. He discovered his ability to make connections with people and nature wherever he went. With this ability, the world opened up to him.",
    highlight: ["profound connection to travel", "make connections with people and nature"],
  },
  {
    text: "Having discovered this, Ravi felt compelled to start a travel community. He wanted to share the wonders of the world and help people to come into connection from all corners of the earth.",
    highlight: ["start a travel community"],
  },
];

export function AboutOwner() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="about" className="relative overflow-hidden bg-paper px-6 py-20 md:px-10 md:py-28 grain">

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-12 md:items-start md:gap-8">

        {/* Text Column */}
        <div className="flex flex-col gap-10 md:col-span-7">
          <motion.h2
            initial={reduceMotion ? undefined : { opacity: 0, y: 14 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl lg:text-6xl"
          >
            About <HyperText>Ravi</HyperText>
          </motion.h2>

          <div className="flex flex-col gap-10">
            {PARAGRAPHS.map((paragraph, pIdx) => (
              <motion.div
                key={pIdx}
                initial={reduceMotion ? undefined : { opacity: 0, y: 14 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="flex flex-col gap-4"
              >
                {paragraph.text === "⸻" ? (
                  <div className="my-2 text-ink/20 text-center text-2xl" aria-hidden>
                    ⸻
                  </div>
                ) : (
                  <BlurHighlight
                    as="p"
                    text={paragraph.text}
                    highlight={paragraph.highlight}
                    className="max-w-[62ch] text-base text-slate md:text-lg leading-relaxed"
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Image Column */}
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 14 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: reduceMotion ? 0 : 0.2 }}
          className="sticky top-24 relative aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-lift md:col-span-5 md:col-start-8"
        >
          {/* TODO(client): placeholder — drop the real photo of Ravi into
              /public/images and add it to TRIP_PHOTOS or a new named export
              in lib/images.ts (see how StoryTeaser.tsx sources TRIP_PHOTOS[0]),
              then swap this div for a next/image using that export. */}
          <div aria-hidden className="flex h-full w-full flex-col items-center justify-center gap-3 border border-dashed border-ink/30 bg-ink/5 text-slate">
            <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-10 w-10">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

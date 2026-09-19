"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BlurHighlight } from "@/components/BlurHighlight";
import { HyperText } from "@/components/HyperText";

const PARAGRAPHS = [
  {
    text: "Untouchdestination started with a curiosity about the world that demanded to be explored. Our founder, Ravi, who spent his childhood split between the modern metropolis of Delhi and his familial village in rural Haryana, witnessed from a young age the vast diversity and multitude of manifestations of our world.",
    highlight: ["curiosity about the world"],
  },
  {
    text: "As he grew into adulthood, his yearning to learn more about the world developed into a profound connection to travel. Ravi found that as he travelled, not only did he learn about the world, but he learned about himself. He discovered his ability to make connections with people wherever he went, and to appreciate nature. With this ability, the world opened up to him.",
    highlight: ["profound connection to travel"],
  },
  {
    text: "Having discovered this, Ravi felt compelled to start a travel community—to share the wonders that the world has to offer and extend connections from east to west and north to south.",
    highlight: ["start a travel community"],
  },
  {
    text: "⸻",
    highlight: [],
  },
  {
    text: "Untouchdestination is born out of a love for learning, adventure, and connection. These are at the core of each of our trips. Our trips are curated through personal connections members of the Untouch community have had with people or places they feel a desire to share with others.",
    highlight: ["love for learning, adventure, and connection", "personal connections"],
  },
  {
    text: "Usually, these connections are made through our members embarking on new adventures to quench their curiosity. Along the way, not all experiences will be remarkable, but those that are, we know we have to share with those who haven’t yet walked that path.",
    highlight: [],
  },
  {
    text: "So each of our destinations means something personal to us.",
    highlight: ["each of our destinations means something personal to us"],
  },
  {
    text: "The experiences that charm us range from questioning yourself when faced with the towering might of a Himalayan mountain, to sitting quietly with a local who has never been outside their village, to tasting the bursting flavours of a local dish you’ve never heard of before, to dancing at a festival thousands of years old.",
    highlight: [],
  },
  {
    text: "The list is endless—but each has broadened our perspective into the depth and brilliance of our world.",
    highlight: ["depth and brilliance of our world"],
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
            About <HyperText>Untouchdestination</HyperText>
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
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 border border-dashed border-ink/30 bg-ink/5 text-slate">
            <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-10 w-10">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" />
            </svg>
            <span className="text-sm">Photo of Ravi — coming soon</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

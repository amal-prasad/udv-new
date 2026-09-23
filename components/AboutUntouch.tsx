"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { BlurHighlight } from "@/components/BlurHighlight";
import { HyperText } from "@/components/HyperText";
import { blurFor } from "@/lib/images";

const PARAGRAPHS = [
  {
    text: "Untouch Destination started with a curiosity about the world that demanded to be explored and is born out of a love for adventure, discovery and connection.",
    highlight: ["love for adventure, discovery and connection"],
  },
  {
    text: "We bring these essential values into each of our trips which are lovingly curated through connections that members of the Untouch community make with people or places as they travel.",
    highlight: ["lovingly curated through connections"],
  },
  {
    text: "So each of our destinations means something personal to us.",
    highlight: ["something personal to us"],
  },
  {
    text: "We love travel because it never fails to take us outside of our comfort zone and pushes us to experience the world and ourselves beyond our wildest dreams.",
    highlight: ["take us outside of our comfort zone", "beyond our wildest dreams"],
  },
  {
    text: "The experiences that charm us range from questioning yourself when faced with the towering might of a Himalayan mountain, to sitting quietly with a local who has never been outside their village, to tasting the bursting flavours of a local dish you’ve never heard of before, to dancing at a festival thousands of years old.",
    highlight: ["towering might of a Himalayan mountain", "festival thousands of years old"],
  },
  {
    text: "The list is endless, but each experience has broadened our perspective into the depth and brilliance of our world and untouchdestination is our way of sharing it with you.",
    highlight: ["depth and brilliance of our world"],
  },
];

export function AboutUntouch() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="about-untouch" className="relative overflow-hidden bg-paper px-6 py-20 md:px-10 md:py-28 grain">

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
            About <HyperText>Untouch Destination</HyperText>
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
          <Image
            src="/images/14.JPEG"
            alt="About Untouch Destination"
            fill
            sizes="(min-width: 768px) 42vw, 100vw"
            placeholder="blur"
            blurDataURL={blurFor("/images/14.JPEG")}
            className="object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}

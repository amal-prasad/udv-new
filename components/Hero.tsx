"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { blurFor, HERO_IMAGE } from "@/lib/images";

// Photo scrim: warm alpenglow entering top-right, deep cold ink pooling
// bottom-left where the headline sits — same light rule as the rest of the
// page, just read against a photograph instead of a flat surface. The
// bottom-left pool is kept dense enough that the headline holds >14:1
// contrast regardless of what the photo is doing underneath it.
const SCRIM_STYLE = {
  backgroundImage: [
    "radial-gradient(120% 100% at 96% -8%, rgb(245 161 76 / 0.4) 0%, rgb(232 86 43 / 0.18) 32%, transparent 60%)",
    "radial-gradient(140% 110% at -6% 116%, rgb(16 27 36 / 0.92) 0%, rgb(16 27 36 / 0.6) 40%, transparent 72%)",
    "linear-gradient(178deg, rgb(16 27 36 / 0) 22%, rgb(16 27 36 / 0.42) 64%, rgb(16 27 36 / 0.78) 100%)",
  ].join(", "),
};

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 140]);

  return (
    <section ref={sectionRef} className="relative min-h-[100svh] w-full overflow-hidden bg-night">
      <motion.div
        className="absolute inset-0"
        style={{ y: reduceMotion ? 0 : photoY }}
      >
        <Image
          src={HERO_IMAGE}
          alt="Snow-capped Himalayan peaks above a pine-forested valley"
          fill
          preload
          quality={82}
          sizes="100vw"
          placeholder="blur"
          blurDataURL={blurFor(HERO_IMAGE)}
          className="scale-110 object-cover"
        />
      </motion.div>
      <div className="absolute inset-0" style={SCRIM_STYLE} />
      {/* scrim: do the contrast work here, not on the text. Darkest at the
          very top (sky/cloud is the brightest, least predictable part of
          the photo) and again at the very bottom (headline sits there);
          lighter mid-band so the mountain silhouette still reads. */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 30%, rgba(0,0,0,0.55) 65%, rgba(0,0,0,0.8) 100%)",
        }}
      />

      <motion.div
        initial={reduceMotion ? undefined : { opacity: 0, y: 28, filter: "blur(10px)" }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex min-h-[100svh] max-w-5xl flex-col justify-end gap-7 px-6 pb-16 pt-24 md:px-10 md:pb-32"
      >
        <h1 className="font-display text-[clamp(2.25rem,8vw,3.25rem)] font-semibold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
          <span
            className="block bg-clip-text text-transparent"
            style={{
              // Line 1 sits on the darkest, least predictable part of the
              // photo (sky/mountain) — the fill has to stay light to read,
              // so this runs between light values (paper/summit into dawn)
              // instead of ink. Drop-shadows alone give it enough edge; no
              // stroke hack needed once the fill itself is light.
              backgroundImage: "linear-gradient(105deg, var(--color-paper) 0%, var(--color-summit) 45%, var(--color-dawn) 100%)",
              filter:
                "drop-shadow(0 1px 3px rgba(0,0,0,0.7)) drop-shadow(0 6px 22px rgba(0,0,0,0.45))",
            }}
          >
            Small-group trips across Himachal &amp; Uttarakhand for solo travellers
          </span>
        </h1>
        <p className="max-w-xl text-lg text-cloud md:text-xl">
          Small group and custom trips across India along roads less travelled. For those who are seeking authentic connection through adventure and ready to embrace the journey, whatever it may bring.
        </p>
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Link
            href="#itineraries"
            className="sheen rounded-full bg-gradient-to-r from-alpenglow to-dawn px-7 py-3.5 text-sm font-medium text-summit shadow-glow transition-transform hover:scale-[1.02]"
          >
            See upcoming trips
          </Link>
          <Link
            href="/private-trips"
            className="rounded-full border border-paper/70 bg-ink/25 px-7 py-3.5 text-sm font-medium text-paper transition-colors hover:border-paper hover:bg-ink/45"
          >
            Plan a custom trip
          </Link>
        </div>
      </motion.div>

      <ScrollCue reduceMotion={reduceMotion} progress={scrollYProgress} />
    </section>
  );
}

function ScrollCue({
  reduceMotion,
  progress,
}: {
  reduceMotion: boolean | null;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  // Tied to real scroll progress instead of an infinite blink — the line
  // drains as you actually move down the page, so it reads as an instrument,
  // not a tic. Fully visible and static at rest for motion-reduce / no-JS.
  const lineScale = useTransform(progress, [0, 0.4], [1, 0]);
  return (
    <div className="absolute inset-x-0 bottom-10 z-10 flex justify-center">
      <div className="h-12 w-px bg-paper/25">
        <motion.div
          className="h-full w-px origin-top bg-paper/80"
          style={{ scaleY: reduceMotion ? 1 : lineScale }}
        />
      </div>
    </div>
  );
}

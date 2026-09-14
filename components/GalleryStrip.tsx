"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { TRIP_PHOTOS } from "@/lib/images";

const COLUMN_COUNT = 4;
const PHOTOS_PER_COLUMN = 3;

// Each column starts at a different offset into TRIP_PHOTOS and wraps
// around, so the 4 columns don't all show the same 3 photos.
const COLUMNS = Array.from({ length: COLUMN_COUNT }, (_, col) =>
  Array.from(
    { length: PHOTOS_PER_COLUMN },
    (_, row) => TRIP_PHOTOS[(col * PHOTOS_PER_COLUMN + row) % TRIP_PHOTOS.length],
  ),
);

export function GalleryStrip() {
  return (
    <section className="w-full overflow-hidden bg-paper px-4 py-[10vh]">
      <h2 className="mx-auto mb-8 max-w-5xl font-display text-3xl font-semibold tracking-tight text-ink md:text-5xl">
        From the road.
      </h2>

      {/* Reduced motion: static grid, no scroll-linked movement. */}
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-2 motion-safe:hidden md:grid-cols-4">
        {COLUMNS.flat().map((src, i) => (
          <div key={i} className="relative aspect-[3/4] overflow-hidden rounded-2xl">
            <Image src={src} alt="" fill sizes="25vw" className="object-cover" />
          </div>
        ))}
      </div>

      <div className="hidden motion-safe:block">
        <ParallaxColumns />
      </div>
    </section>
  );
}

function ParallaxColumns() {
  const gallery = useRef<HTMLDivElement>(null);
  const [dimension, setDimension] = useState({ height: 0 });

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"],
  });

  const { height } = dimension;
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 0.5]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 0.8]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 0.3]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 0.65]);

  // Kept only the dimension-measuring part of the original Skiper30 effect —
  // the `new Lenis()` + raf loop was stripped. A single Lenis instance
  // already runs at the app root (see SmoothScroll.tsx); a second instance
  // here would fight it and cause stutter.
  useEffect(() => {
    const resize = () => setDimension({ height: window.innerHeight });
    window.addEventListener("resize", resize);
    resize();
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div
      ref={gallery}
      className="relative mx-auto flex h-[70vh] max-w-5xl gap-2 overflow-hidden"
    >
      <Column images={COLUMNS[0]} y={y} />
      <Column images={COLUMNS[1]} y={y2} />
      <Column images={COLUMNS[2]} y={y3} />
      <Column images={COLUMNS[3]} y={y4} />
    </div>
  );
}

function Column({ images, y }: { images: string[]; y: MotionValue<number> }) {
  return (
    <motion.div className="flex h-full w-1/4 min-w-0 flex-col gap-2" style={{ y }}>
      {images.map((src, i) => (
        <div key={i} className="relative h-full w-full flex-1 overflow-hidden rounded-2xl">
          <Image src={src} alt="" fill sizes="25vw" className="object-cover" />
        </div>
      ))}
    </motion.div>
  );
}

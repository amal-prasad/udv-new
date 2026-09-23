"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { blurFor, TRIP_PHOTOS } from "@/lib/images";
import { useMediaQuery } from "@/lib/use-media-query";
import { cn } from "@/lib/utils";

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

const IMAGE_SIZES = "(min-width: 768px) 25vw, 50vw";

export function GalleryStrip() {
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");

  return (
    <section className="relative w-full overflow-hidden bg-paper py-[8vh]">
      {/* Not a boxed heading — a caption sitting on the photographs
          themselves. This section is the breath between two text-led
          sections; the pictures carry it. */}
      <div className="pointer-events-none absolute left-4 top-6 z-10 md:left-8 md:top-8">
        <span className="rounded-full bg-ink/80 px-3 py-1 font-display text-xs font-medium text-paper md:text-sm">
          From the road
        </span>
      </div>

      {/* Reduced motion: static grid, no scroll-linked movement. */}
      {reduce !== false && (
        <div className="grid grid-cols-2 gap-2 motion-safe:hidden md:grid-cols-4">
          {COLUMNS.flat().map((src, i) => (
            <div key={i} className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={src}
                alt=""
                fill
                sizes={IMAGE_SIZES}
                placeholder="blur"
                blurDataURL={blurFor(src)}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {reduce !== true && (
        <div className="hidden motion-safe:block">
          <ParallaxColumns />
        </div>
      )}
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
  //
  // ponytail: measures the gallery element, NOT window.innerHeight. Mobile
  // browsers collapse the address bar mid-scroll, which fires `resize` and
  // changes innerHeight by ~60-100px — the parallax travel distance changed
  // under the scroll and the columns jumped. The element is sized in `vh`,
  // which the address bar does not touch, so ResizeObserver only fires on a
  // real layout change (orientation, window resize).
  useEffect(() => {
    const el = gallery.current;
    if (!el) return;
    const measure = () => setDimension({ height: el.offsetHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={gallery} className="relative flex h-[70vh] gap-2 overflow-hidden md:h-[85vh]">
      <Column images={COLUMNS[0]} y={y} className="w-1/2 md:w-1/4" />
      <Column images={COLUMNS[1]} y={y2} className="w-1/2 md:w-1/4" />
      <Column images={COLUMNS[2]} y={y3} className="hidden md:flex md:w-1/4" />
      <Column images={COLUMNS[3]} y={y4} className="hidden md:flex md:w-1/4" />
    </div>
  );
}

function Column({
  images,
  y,
  className,
}: {
  images: string[];
  y: MotionValue<number>;
  className?: string;
}) {
  return (
    <motion.div className={cn("flex h-full min-w-0 flex-col gap-2", className)} style={{ y }}>
      {images.map((src, i) => (
        <div key={i} className="relative h-full w-full flex-1 overflow-hidden">
          <Image
              src={src}
              alt=""
              fill
              sizes={IMAGE_SIZES}
              placeholder="blur"
              blurDataURL={blurFor(src)}
              className="object-cover"
            />
        </div>
      ))}
    </motion.div>
  );
}

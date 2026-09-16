"use client";

import { motion, useReducedMotion } from "framer-motion";
import { HyperText } from "@/components/HyperText";

const BEATS = [
  {
    name: "Why “Untouch”",
    body: "The places we keep going back to are usually the ones mass tourism hasn't reached — still themselves, not built for a bus tour. That's the name, and it's why how we travel there matters as much as where.",
  },
  {
    name: "Sustainable, not just scenic",
    body: "Conscious, intentional travel that leaves as little behind as possible — but staying away isn't the answer either. Done right, tourism brings real income to the places we visit, which is why trust with the communities we work with comes first.",
  },
  {
    name: "Leave no waste",
    body: "Every trip runs on a leave-no-waste policy. Most environmental harm comes from feeling disconnected from nature, so the trips are built to close that gap — once you've slept under it, you look after it.",
  },
] as const;

// Ground: ink, matching Reviews right after it. StoryTeaser (paper) precedes
// both, so this keeps the paper -> ink hinge in one place instead of
// flipping back to paper and immediately back to ink for Reviews. TrustBar
// -> StrangerTrip already run two ink sections back to back elsewhere on
// this page, so the repeat isn't a new pattern.
export function AboutOwner() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="about" className="relative overflow-hidden bg-ink px-6 py-20 md:px-10 md:py-28">
      <div className="sun-wash pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-12 md:items-start md:gap-8">
        <div className="flex flex-col gap-6 md:col-span-7">
          <motion.h2
            initial={reduceMotion ? undefined : { opacity: 0, y: 14 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-3xl font-semibold tracking-tight text-paper md:text-5xl"
          >
            It started with one traveller&apos;s curiosity: <HyperText>Ravi</HyperText>.
          </motion.h2>

          <p className="max-w-[62ch] text-base text-cloud md:text-lg">
            Ravi grew up split between Delhi and his family&apos;s village in rural Haryana — a front-row seat
            to how differently people live. Travel taught him as much about himself as it did about the world: he
            found he could connect with almost anyone, wherever he landed, and that opened everything up. So he
            started a travel community to share it — connecting east to west, north to south, built on
            curiosity, adventure and the relationships members bring back with them.
          </p>
          {/* ponytail: no "Read the full story" link here — same reason as
              StoryTeaser.tsx, there's no /our-story route to send it to. */}

          <dl className="mt-4 flex flex-col">
            {BEATS.map((beat, i) => (
              <div key={beat.name} className={i === 0 ? "flex flex-col gap-2 py-5" : "flex flex-col gap-2 border-t border-paper/15 py-5"}>
                <dt className="font-display text-lg font-semibold text-paper">{beat.name}</dt>
                <dd className="max-w-[60ch] text-sm text-cloud md:text-base">{beat.body}</dd>
              </div>
            ))}
          </dl>
        </div>

        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 14 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: reduceMotion ? 0 : 0.1 }}
          className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-lift md:col-span-5 md:col-start-8"
        >
          {/* TODO(client): placeholder — drop the real photo of Ravi into
              /public/images and add it to TRIP_PHOTOS or a new named export
              in lib/images.ts (see how StoryTeaser.tsx sources TRIP_PHOTOS[0]),
              then swap this div for a next/image using that export. */}
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 border border-dashed border-paper/30 bg-night text-cloud">
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

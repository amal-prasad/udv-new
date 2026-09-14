"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { TRIP_PHOTOS } from "@/lib/images";

export function StoryTeaser() {
  return (
    <section className="bg-paper px-6 py-20 md:px-10 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16"
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl">
          <Image
            src={TRIP_PHOTOS[0]}
            alt="An early trip that shaped how Untouch Destination travels"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-5">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink md:text-5xl">
            It started with one solo trip that went wrong in all the right ways.
          </h2>
          {/* Placeholder narrative — real founder anecdote pending from the client. */}
          <p className="max-w-md text-base text-ink/70 md:text-lg">
            A missed bus, a borrowed motorcycle, and a village that fed us before it asked our names. That trip
            taught us more than any guidebook. We&apos;ve been chasing that feeling for everyone since.
          </p>
          <Link href="/our-story" className="w-fit text-sm font-medium text-ember hover:opacity-80">
            Read the full story →
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

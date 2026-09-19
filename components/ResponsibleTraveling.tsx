"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { blurFor, TRIP_PHOTOS } from "@/lib/images";

export function ResponsibleTraveling() {
  const reduceMotion = useReducedMotion();

  const points = [
    "Volunteering to provide essentials for the gritty souls who carve these roads so our journeys can happen.",
    "A quick pause to leave the places we visit cleaner than we found them.",
    "Learning and understanding the local culture and people.",
    "Be part of a travellers group who carry responsibility of actively working to make the places better, act as volunteers to educate the locals and bring out what locals have to offer."
  ];

  return (
    <section id="responsible" className="relative w-full overflow-hidden bg-night px-6 py-20 md:px-10 md:py-28">
      <div aria-hidden className="sun-wash pointer-events-none absolute inset-0" />
      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-12 md:items-center md:gap-8">
        
        <div className="flex flex-col gap-6 md:col-span-7">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-paper md:text-5xl">
            Responsible Traveling
          </h2>
          <motion.ul 
            className="flex flex-col gap-4 text-base text-cloud md:text-lg"
            initial={reduceMotion ? undefined : "hidden"}
            whileInView={reduceMotion ? undefined : "visible"}
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.3
                }
              }
            }}
          >
            {points.map((point, idx) => (
              <motion.li
                key={idx}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 }
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex items-start gap-3"
              >
                <span className="text-paper mt-1 md:mt-1.5 shrink-0 text-xl leading-none">•</span>
                <span>{point}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-lift md:col-span-5"
          initial={reduceMotion ? undefined : { clipPath: "inset(0% 38% 0% 0% round 1.5rem)" }}
          whileInView={reduceMotion ? undefined : { clipPath: "inset(0% 0% 0% 0% round 1.5rem)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={TRIP_PHOTOS[0]}
            alt="Responsible Traveling"
            fill
            sizes="(min-width: 768px) 42vw, 100vw"
            placeholder="blur"
            blurDataURL={blurFor(TRIP_PHOTOS[0])}
            className="object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}

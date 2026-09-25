"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { blurFor, TRIP_PHOTOS } from "@/lib/images";

export function ResponsibleTraveling() {
  const reduceMotion = useReducedMotion();



  return (
    <section id="responsible" className="relative w-full overflow-hidden bg-night px-6 py-20 md:px-10 md:py-28">
      <div aria-hidden className="sun-wash pointer-events-none absolute inset-0" />
      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-12 md:items-center md:gap-8">

        <div className="flex flex-col gap-6 md:col-span-7">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-paper md:text-5xl">
            Responsible Travel
          </h2>
          <motion.div
            className="flex flex-col gap-4 text-base text-cloud md:text-lg leading-relaxed"
            initial={reduceMotion ? undefined : "hidden"}
            whileInView={reduceMotion ? undefined : "visible"}
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
          >
            {[
              "We believe that travel has an amazing ability to bring a positive impact to both the traveller, the place travelled to and the world more widely, however only when done responsibly.",
              "To us responsible travel is all about travelling in a conscious and intentional way. Whistle stop tours aren’t what we’re about. Instead, we like to build deep connections to a place and its people. We recognise that as travellers we are always guests in another’s home and so we always work to build a relationship with local communities so that we can bring to them the sort of tourism that enables their flourishing.",
              "This usually means immersing ourselves in local culture by eating locally grown and cooked food, staying in local homestays, buying local handmade products, pausing before we leave to ensure we leave the place cleaner than we found it, taking time to stop and look at life through the locals eyes, feeling into the vibrancy of the surrounding nature, being open to sharing what you have wherever you go.",
              "We find that travelling like this is actually our favourite way to travel as it offers the most authentic experiences. The very act of connecting deeply with the world around us allows us to connect to ourselves.",
              "As a travel community we commit ourselves to responsible travel and if you choose to travel with us we invite you to also take the opportunity to open your heart to the world."
            ].map((paragraph, idx) => (
              <motion.p
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                {paragraph}
              </motion.p>
            ))}
          </motion.div>
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
            alt="Responsible Travel"
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

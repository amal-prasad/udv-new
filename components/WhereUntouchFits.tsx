"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BlurHighlight } from "@/components/BlurHighlight";

const PARAGRAPHS = [
  {
    text: "Our adventurers have found that the places we feel the greatest connection to are those more untouched by mass tourism. These places have preserved their originality and authenticity, and so it is where we get to go outside of our comfort zone.",
    highlight: ["untouched by mass tourism", "originality and authenticity"],
  },
  {
    text: "While it might seem hypocritical for a travel company to avoid tourist places and promote tourism in such regions—considering it could one day lead to their loss of originality—it is for this very reason that we value sustainable tourism greatly.",
    highlight: ["we value sustainable tourism greatly"],
  },
  {
    text: "Sustainable tourism is about travelling in a conscious and intentional way, leaving as little negative impact as possible.",
    highlight: ["conscious and intentional way"],
  },
  {
    text: "The problem of tourism affecting the originality of places isn’t black and white. We can’t say that just because tourism has negative impacts, we shouldn’t do it. Instead, we must find ways to reduce these impacts—because tourism also creates a lot of value.",
    highlight: ["isn’t black and white"],
  },
  {
    text: "Not only do travellers benefit, but local communities do too—if done in the right way. Tourism has the ability to boost the economy of an area and provide access to opportunities that may not otherwise exist.",
    highlight: ["if done in the right way"],
  },
  {
    text: "It also gives people the opportunity to interact with others from different backgrounds. Of course, this is only beneficial if the local communities want this to happen.",
    highlight: [],
  },
  {
    text: "That’s why making personal connections with the communities we work with is so important to us. By building these connections, we are able to create trust, understand their needs, and ensure the best exchange between them and our travellers.",
    highlight: ["making personal connections with the communities"],
  },
  {
    text: "⸻",
    highlight: [],
  },
  {
    text: "Another major impact of tourism is on the environment.",
    highlight: ["the environment"],
  },
  {
    text: "Our trips revolve around nature, and while it offers us breathtaking beauty, it is often a local pain point. For this reason, we always remember to show gratitude and respect to our environment and operate with a “leave no waste” policy.",
    highlight: ["“leave no waste” policy"],
  },
  {
    text: "We believe a significant reason why humans have such a negative impact on the environment is because we are disconnected from it. It’s hard to care about recycling your plastic when you don’t see it building up along a river.",
    highlight: ["because we are disconnected from it"],
  },
  {
    text: "Through our trips, we aim to bring people back into connection with nature—so that they are able to develop a deeper sense of care and responsibility.",
    highlight: ["a deeper sense of care and responsibility"],
  },
];

export function WhereUntouchFits() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="where-untouch-fits"
      className="relative overflow-hidden bg-paper px-6 pb-20 md:px-10 md:pb-28 grain"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Emphasis break: oversized question set apart from the About column,
            so the long essay below reads as its own chapter. */}
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="border-t border-ink/10 pt-16 md:pt-24"
        >
          <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink md:text-6xl lg:text-7xl">
            Where does{" "}
            <span className="bg-gradient-to-tr from-alpenglow to-dawn bg-clip-text text-transparent">
              Untouch
            </span>{" "}
            fit into this?
          </h2>
        </motion.div>

        <div className="mt-14 md:mt-20 flex flex-col gap-6 md:gap-8">
          {PARAGRAPHS.map((paragraph, pIdx) => (
            <motion.div
              key={pIdx}
              initial={reduceMotion ? undefined : { opacity: 0, y: 14 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="break-inside-avoid"
            >
              {paragraph.text === "⸻" ? (
                <div className="my-2 text-center text-2xl text-ink/20" aria-hidden>
                  ⸻
                </div>
              ) : (
                <BlurHighlight
                  as="p"
                  text={paragraph.text}
                  highlight={paragraph.highlight}
                  className="text-base leading-relaxed text-slate md:text-lg"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

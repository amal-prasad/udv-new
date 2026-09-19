"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useMemo } from "react";

import { cn } from "@/lib/utils";

type BlurHighlightProps = {
  text: string;
  /** Phrases inside `text` to mark. Case-insensitive, whole-phrase match. */
  highlight?: string | string[];
  className?: string;
  highlightClassName?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
  as?: "p" | "h2" | "h3" | "span";
};

// Word blur-in duration. The chip sweep is offset from it below so the marker
// lands just as the word finishes sharpening, not while it's still soft.
const BLUR_DURATION = 0.5;
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
const EASE_OUT_QUINT = [0.22, 1, 0.36, 1] as const;

const TAGS = { p: motion.p, h2: motion.h2, h3: motion.h3, span: motion.span } as const;

// alpenglow → dawn, the site's warm light, painted as a background image so
// the sweep can be a background-size animation. An absolutely-positioned
// layer can't do this: a highlighted phrase that wraps to the next line needs
// the fill to break with the text, which only the box's own background does.
const CHIP_GRADIENT = "linear-gradient(90deg, #e8562b 0%, #f5a14c 100%)";

type Chunk = { text: string; highlighted: boolean };
type Token = { text: string; isWord: boolean };

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Longest phrase first, so "Jalori Pass" wins over a bare "Pass" when both
// are declared and overlap.
function splitByHighlight(text: string, phrases: string[]): Chunk[] {
  if (phrases.length === 0) return [{ text, highlighted: false }];

  const re = new RegExp(
    [...phrases].sort((a, b) => b.length - a.length).map(escapeRegExp).join("|"),
    "gi",
  );

  const chunks: Chunk[] = [];
  let cursor = 0;
  for (const match of text.matchAll(re)) {
    if (match[0].length === 0) continue;
    if (match.index > cursor) {
      chunks.push({ text: text.slice(cursor, match.index), highlighted: false });
    }
    chunks.push({ text: match[0], highlighted: true });
    cursor = match.index + match[0].length;
  }
  if (cursor < text.length) chunks.push({ text: text.slice(cursor), highlighted: false });
  return chunks;
}

// Whitespace is kept as its own token so spacing round-trips exactly: each
// word needs its own element to carry its own stagger delay.
function tokenize(chunk: string): Token[] {
  return chunk
    .split(/(\s+)/)
    .filter(Boolean)
    .map((t) => ({ text: t, isWord: !/^\s+$/.test(t) }));
}

/**
 * Local stand-in for React Bits Pro's Blur Highlight — that registry needs a
 * licence key this project doesn't have, so it's rebuilt on the framer-motion
 * we already ship.
 */
export function BlurHighlight({
  text,
  highlight,
  className,
  highlightClassName,
  delay = 0,
  stagger = 0.045,
  once = true,
  as = "p",
}: BlurHighlightProps) {
  const reduceMotion = useReducedMotion();
  const Tag = TAGS[as];

  const phrases = useMemo(
    () =>
      highlight
        ? (Array.isArray(highlight) ? highlight : [highlight]).filter(Boolean)
        : [],
    [highlight],
  );

  // Each chunk carries the running word index of its first word so the
  // stagger stays continuous across the whole paragraph, chips included.
  const chunks = useMemo(() => {
    let wordIndex = 0;
    return splitByHighlight(text, phrases).map((chunk) => {
      const tokens = tokenize(chunk.text);
      const startIndex = wordIndex;
      wordIndex += tokens.filter((t) => t.isWord).length;
      return { ...chunk, tokens, startIndex };
    });
  }, [text, phrases]);

  const chipClass = cn(
    "box-decoration-clone rounded-md px-1.5 py-0.5",
    highlightClassName,
  );

  if (reduceMotion) {
    return (
      <Tag className={cn("text-current", className)} aria-label={text}>
        <span aria-hidden="true">
          {chunks.map((chunk, i) =>
            chunk.highlighted ? (
              <span
                key={i}
                className={chipClass}
                style={{ backgroundImage: CHIP_GRADIENT, color: "var(--color-summit)" }}
              >
                {chunk.text}
              </span>
            ) : (
              <span key={i}>{chunk.text}</span>
            ),
          )}
        </span>
      </Tag>
    );
  }

  // No transform here on purpose: a transform needs inline-block, and an
  // inline-block word is an atomic inline, so the browser is allowed to break
  // the line between a chip and the comma right after it. Plain inline words
  // break only at spaces, which is what prose wants.
  const wordVariants: Variants = {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: (i: number) => ({
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: BLUR_DURATION, ease: EASE_OUT_EXPO, delay: delay + i * stagger },
    }),
  };

  // Sweep timing keys off the LAST word of the phrase, so the marker never
  // overtakes text that hasn't resolved yet.
  const chipVariants: Variants = {
    hidden: { backgroundSize: "0% 100%" },
    visible: (i: number) => ({
      backgroundSize: "100% 100%",
      color: "var(--color-summit)",
      transition: {
        duration: 0.45,
        ease: EASE_OUT_QUINT,
        delay: delay + i * stagger + BLUR_DURATION * 0.75,
      },
    }),
  };

  const viewport = { once, amount: 0.3 } as const;

  return (
    <Tag className={cn("text-current", className)} aria-label={text}>
      <span aria-hidden="true">
        {chunks.map((chunk, chunkIndex) => {
          const words = chunk.tokens.map((token, i) => {
            if (!token.isWord) return <span key={i}>{token.text}</span>;
            const wordIndex =
              chunk.startIndex + chunk.tokens.slice(0, i).filter((t) => t.isWord).length;
            return (
              <motion.span
                key={i}
                style={{ willChange: "filter, opacity" }}
                custom={wordIndex}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                variants={wordVariants}
              >
                {token.text}
              </motion.span>
            );
          });

          if (!chunk.highlighted) return <span key={chunkIndex}>{words}</span>;

          const lastWordIndex =
            chunk.startIndex + Math.max(0, chunk.tokens.filter((t) => t.isWord).length - 1);

          return (
            <motion.span
              key={chunkIndex}
              className={chipClass}
              style={{
                backgroundImage: CHIP_GRADIENT,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "left center",
              }}
              custom={lastWordIndex}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={chipVariants}
            >
              {words}
            </motion.span>
          );
        })}
      </span>
    </Tag>
  );
}

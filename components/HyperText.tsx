"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const randomChar = () => ALPHABET[Math.floor(Math.random() * ALPHABET.length)];

interface HyperTextProps {
  children: string;
  className?: string;
  /** Total scramble-to-settle duration in ms. */
  duration?: number;
  /** Trigger once on mount instead of on first scroll-into-view. Hover always re-triggers. */
  animateOnLoad?: boolean;
}

/**
 * magicui-style "decode" text: renders normally, then on hover (and on first
 * scroll into view) each character cycles through random glyphs before
 * settling on the real one, left to right.
 */
export function HyperText({ children, className, duration = 800, animateOnLoad = false }: HyperTextProps) {
  const text = children;
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState<string>(text);
  const spanRef = useRef<HTMLSpanElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hasRunRef = useRef(false);

  const scramble = () => {
    if (reduceMotion) return;
    if (intervalRef.current) clearInterval(intervalRef.current);

    const chars = text.split("");
    const frameDuration = Math.max(duration / Math.max(chars.length, 1), 30);
    let settled = 0;

    intervalRef.current = setInterval(() => {
      settled += 1;
      setDisplay(chars.map((c, i) => (c === " " || i < settled ? c : randomChar())).join(""));
      if (settled >= chars.length && intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }, frameDuration);
  };

  // Cleanup on unmount.
  useEffect(() => () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  // Reset the settled text if the source string changes.
  useEffect(() => {
    setDisplay(text);
  }, [text]);

  useEffect(() => {
    if (reduceMotion || !animateOnLoad) return;
    scramble();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion, animateOnLoad]);

  useEffect(() => {
    if (reduceMotion || animateOnLoad) return;
    const el = spanRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !hasRunRef.current) {
          hasRunRef.current = true;
          scramble();
        }
      },
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion, animateOnLoad]);

  if (reduceMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span ref={spanRef} className={className} onMouseEnter={scramble}>
      <span aria-hidden="true">{display}</span>
      <span className="sr-only">{text}</span>
    </span>
  );
}

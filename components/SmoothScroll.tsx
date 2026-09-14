"use client";

import { gsap } from "gsap";
import { ReactLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef } from "react";

/**
 * The one and only Lenis instance. Skiper34/28/30 each shipped with their own
 * — two competing smooth-scroll loops stutter and rubber-band, so those were
 * stripped and everything reads from this root instance. GSAP's ticker drives
 * the raf loop so the canvas crowd and the scroll animations share one clock.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const update = (time: number) => lenisRef.current?.lenis?.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis root ref={lenisRef} options={{ autoRaf: false }}>
      {children}
    </ReactLenis>
  );
}

"use client";

import { useSyncExternalStore } from "react";

// null on the server and during hydration, so SSR can render every variant
// (CSS picks the visible one, no layout flash) and the client then drops the
// variants that don't match. Keeps duplicate headings/images out of the
// rendered DOM.
export function useMediaQuery(query: string): boolean | null {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => null,
  );
}

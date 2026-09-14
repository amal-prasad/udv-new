"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { LOGO_LIGHT } from "@/lib/images";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

// Anchors point at sections owned by other components — check `id=` there if
// Every link here is an in-page anchor on purpose: app/page.tsx is the only
// route this site has, so /our-story and /faq would both 404.
const NAV_LINKS = [
  { label: "Trips", href: "#itineraries" },
  { label: "Trip Types", href: "#trip-types" },
  { label: "Our Story", href: "#story" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
];

const CTA_CLASS =
  "sheen rounded-full bg-gradient-to-tr from-alpenglow to-dawn font-medium text-paper shadow-glow transition-transform duration-300 ease-out hover:scale-[1.03] focus-visible:scale-[1.03]";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    document.documentElement.classList.add("lenis-stopped");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.classList.remove("lenis-stopped");
      window.removeEventListener("keydown", onKey);
    };
  }, [open, closeMenu]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        {/* Unscrolled: soft top scrim so links stay legible over any hero
            frame, no per-link text-shadow needed. */}
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-ink/75 via-ink/25 to-transparent transition-opacity duration-500",
            scrolled ? "opacity-0" : "opacity-100"
          )}
        />
        {/* Scrolled: the ink bar, lit by the same sun rule as every other
            dark surface — not a flat colour fill. */}
        <motion.div
          aria-hidden
          className="sun-wash absolute inset-0 bg-ink backdrop-blur-md"
          initial={false}
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
        <nav
          aria-label="Primary"
          className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10"
        >
          <Link href="/" className="relative z-10 shrink-0">
            <Image
              src={LOGO_LIGHT}
              alt="Untouch Destination"
              width={424}
              height={190}
              className="h-10 w-auto"
              priority
            />
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="rounded-sm text-sm font-medium text-paper transition-colors hover:text-cloud"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <Link href="#plan" className={cn(CTA_CLASS, "px-5 py-2.5 text-sm")}>
              Plan your trip
            </Link>
          </div>

          <button
            ref={toggleRef}
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => (open ? closeMenu() : setOpen(true))}
            className="relative z-10 flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-sm text-paper md:hidden"
          >
            <span
              className={cn(
                "block h-0.5 w-6 bg-current transition-transform",
                open && "translate-y-2 rotate-45"
              )}
            />
            <span className={cn("block h-0.5 w-6 bg-current transition-opacity", open && "opacity-0")} />
            <span
              className={cn(
                "block h-0.5 w-6 bg-current transition-transform",
                open && "-translate-y-2 -rotate-45"
              )}
            />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25, ease: "easeIn" } }}
            transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
            className="sun-wash fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-ink md:hidden"
          >
            <motion.ul
              className="relative z-10 flex flex-col items-center gap-8"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{ visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } }}
            >
              {NAV_LINKS.map((link) => (
                <motion.li
                  key={link.label}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT_EXPO } },
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className="rounded-sm font-display text-3xl font-semibold text-paper"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT_EXPO } },
                }}
              >
                <Link
                  href="#plan"
                  onClick={closeMenu}
                  className={cn(CTA_CLASS, "mt-4 block px-6 py-3 text-base")}
                >
                  Plan your trip
                </Link>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { LOGO } from "@/lib/images";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Trips", href: "#itineraries" },
  { label: "Trip Types", href: "#trip-types" },
  { label: "Our Story", href: "/our-story" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <motion.div
          aria-hidden
          className="absolute inset-0 backdrop-blur-md"
          initial={false}
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{ backgroundColor: "color-mix(in srgb, var(--color-ink) 85%, transparent)" }}
        />
        <nav
          aria-label="Primary"
          className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10"
        >
          <Link href="/" className="relative z-10 shrink-0">
            <Image src={LOGO} alt="Untouch Destination" height={40} width={140} className="h-10 w-auto brightness-0 invert" priority />
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    scrolled ? "text-paper" : "text-paper [text-shadow:0_1px_6px_rgba(0,0,0,0.45)]",
                    "hover:text-cloud"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <Link
              href="#plan"
              className="rounded-full bg-ember px-5 py-2.5 text-sm font-medium text-paper transition-opacity hover:opacity-90"
            >
              Plan your trip
            </Link>
          </div>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "relative z-10 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden",
              scrolled ? "text-paper" : "text-paper [text-shadow:0_1px_6px_rgba(0,0,0,0.45)]"
            )}
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
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-ink md:hidden"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-display text-3xl font-semibold text-paper"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#plan"
              onClick={() => setOpen(false)}
              className="mt-4 rounded-full bg-ember px-6 py-3 text-base font-medium text-paper"
            >
              Plan your trip
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

// Placeholder — the client hasn't supplied the real business WhatsApp number
// yet. Swap this for the real one (country code, no "+", no spaces/dashes).
export const WHATSAPP_NUMBER = "919999999999";

const PREFILLED_MESSAGE = "Hi! I'm interested in a trip — can you share more details?";

function whatsappHref() {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(PREFILLED_MESSAGE)}`;
}

export function WhatsAppCta() {
  return (
    <section id="plan" className="relative w-full overflow-hidden bg-night px-4 py-[16vh]">
      <div aria-hidden className="sun-wash pointer-events-none absolute inset-0" />

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
        <h2 className="font-display text-4xl font-semibold tracking-tight text-paper md:text-6xl">
          Skip the form. Just message us.
        </h2>
        <p className="max-w-md text-base text-cloud md:text-lg">
          Tell us the dates you're picturing — we'll reply with real trip
          options, not a PDF brochure.
        </p>
        {/* The one CTA on the page that gets .sheen + shadow-glow — this is
            the close, it should be unmissable. */}
        <a
          href={whatsappHref()}
          target="_blank"
          rel="noopener noreferrer"
          className="sheen mt-4 rounded-full bg-gradient-to-r from-alpenglow to-dawn px-10 py-5 text-base font-semibold text-summit shadow-glow transition-transform hover:scale-[1.03]"
        >
          Message us on WhatsApp →
        </a>
      </div>
    </section>
  );
}

export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={whatsappHref()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Message us on WhatsApp"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-ember shadow-lg transition-opacity hover:opacity-90"
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-7 w-7 text-paper"
            aria-hidden
          >
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.42-1.36a9.9 9.9 0 0 0 4.62 1.14h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.02h-.01a8.16 8.16 0 0 1-4.16-1.14l-.3-.18-3.22.81.86-3.14-.19-.32a8.14 8.14 0 0 1-1.25-4.34c0-4.49 3.66-8.15 8.16-8.15 2.18 0 4.22.85 5.76 2.39a8.1 8.1 0 0 1 2.39 5.77c0 4.49-3.66 8.1-8.04 8.1zm4.47-6.1c-.24-.12-1.44-.71-1.67-.79-.22-.08-.38-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.32-.75-1.8-.2-.48-.4-.42-.55-.42-.14 0-.3-.02-.46-.02-.16 0-.42.06-.64.3-.22.24-.85.83-.85 2.03s.87 2.36 1 2.52c.12.16 1.71 2.6 4.14 3.65.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28z" />
          </svg>
        </motion.a>
      )}
    </AnimatePresence>
  );
}

import Image from "next/image";
import Link from "next/link";

import { LOGO } from "@/lib/images";
import { WHATSAPP_NUMBER } from "@/components/WhatsAppCta";

const QUICK_LINKS = [
  { label: "Trips", href: "/#itineraries" },
  { label: "Trip Types", href: "/#trip-types" },
  { label: "Our Story", href: "/our-story" },
  { label: "Reviews", href: "/#reviews" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/#plan" },
];

// Placeholder contact details — real email/Instagram handle pending from the
// client.
const CONTACT_EMAIL = "hello@untouchdestination.com";
const INSTAGRAM_HANDLE = "@untouchdestination";
const INSTAGRAM_URL = "https://instagram.com/untouchdestination";

const LEGAL_LINKS = [
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Cancellation Policy", href: "/cancellation-policy" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

export function Footer() {
  return (
    <footer className="w-full bg-ink px-4 pb-8 pt-[8vh] text-paper">
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="flex flex-col gap-3">
          <Image
            src={LOGO}
            alt="Untouch Destination"
            width={160}
            height={80}
            className="h-12 w-auto brightness-0 invert"
          />
          <p className="max-w-xs text-sm text-cloud">
            Small-group trips for people who'd rather show up solo than not
            go at all.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-display text-sm font-semibold text-paper">
            Quick links
          </h3>
          <ul className="flex flex-col gap-2">
            {QUICK_LINKS.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="text-sm text-cloud hover:text-paper">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-display text-sm font-semibold text-paper">
            Get in touch
          </h3>
          <ul className="flex flex-col gap-2">
            <li>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-cloud hover:text-paper"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-sm text-cloud hover:text-paper">
                {CONTACT_EMAIL}
              </a>
            </li>
            <li>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-cloud hover:text-paper"
              >
                {INSTAGRAM_HANDLE}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-5xl flex-col gap-6 border-t border-mist/20 pt-6 text-xs text-cloud md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {LEGAL_LINKS.map((link) => (
            <Link key={link.label} href={link.href} className="hover:text-paper">
              {link.label}
            </Link>
          ))}
        </div>
        <p>
          {/* [City] is a placeholder — real base city pending from the client. */}
          © 2026 Untouch Destination. Based in [City], with trips across
          Himachal, Uttarakhand & beyond.
        </p>
      </div>
    </footer>
  );
}

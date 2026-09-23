import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, Geist } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Navbar } from "@/components/Navbar";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/site-config";
import { JsonLd } from "@/components/JsonLd";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const DESCRIPTION =
  "Small-group trips across Himachal & Uttarakhand for solo travellers from Delhi & Chandigarh: Spiti, Kinnaur, Zanskar, Jibhi, Kumaon, plus private trips.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Small-Group Trips in Himachal & Uttarakhand | Untouch Destination",
    template: `%s | ${SITE.name}`,
  },
  description: DESCRIPTION,
  applicationName: SITE.name,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_IN",
    url: "/",
    description: DESCRIPTION,
  },
  twitter: { card: "summary_large_image" },
};

// TODO: add `address` once the client sends it (docs/owner-todo.md).
const TRAVEL_AGENCY = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "@id": `${SITE.url}/#organization`,
  name: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/logo.png`,
  image: `${SITE.url}/opengraph-image.jpg`,
  email: SITE.email,
  telephone: `+${SITE.whatsappNumber}`,
  sameAs: [SITE.instagramUrl],
  areaServed: [
    { "@type": "State", name: "Himachal Pradesh" },
    { "@type": "State", name: "Uttarakhand" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(bricolage.variable, inter.variable, "font-sans", geist.variable)}>
      <body className="bg-night text-paper">
        <JsonLd data={TRAVEL_AGENCY} />
        <LoadingScreen />
        <SmoothScroll>
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

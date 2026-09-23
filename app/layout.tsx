import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, Geist } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Navbar } from "@/components/Navbar";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/site-config";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(bricolage.variable, inter.variable, "font-sans", geist.variable)}>
      <body className="bg-night text-paper">
        <LoadingScreen />
        <SmoothScroll>
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

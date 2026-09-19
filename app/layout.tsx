import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, Geist } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Navbar } from "@/components/Navbar";
import { cn } from "@/lib/utils";

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

export const metadata: Metadata = {
  title: "Untouch Destination — small-group trips across Himachal & Uttarakhand",
  description:
    "Strangers get on the bus. Friends get off. Small-group and custom trips across Himachal, Uttarakhand and the roads less mapped.",
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

import { Hero } from "@/components/Hero";
import { EscapeSection } from "@/components/EscapeSection";
import { TripTypes } from "@/components/TripTypes";
import { FeaturedItineraries } from "@/components/FeaturedItineraries";
import { TrustBar } from "@/components/TrustBar";

import { GalleryStrip } from "@/components/GalleryStrip";
import { AboutUntouch } from "@/components/AboutUntouch";
import { ResponsibleTraveling } from "@/components/ResponsibleTraveling";
import { AboutOwner } from "@/components/AboutOwner";
import { Reviews } from "@/components/Reviews";
import { FaqPreview } from "@/components/FaqPreview";
import { WhatsAppCta, FloatingWhatsApp } from "@/components/WhatsAppCta";
import { Footer } from "@/components/Footer";
import CircularGallery from "@/components/CircularGallery";

const galleryItems = [
  { image: "/images/1.JPEG", text: "Journey" },
  { image: "/images/2.JPEG", text: "Explore" },
  { image: "/images/3.JPEG", text: "Discover" },
  { image: "/images/4.JPEG", text: "Wander" },
  { image: "/images/5.JPG", text: "Escape" },
  { image: "/images/6.JPEG", text: "Adventure" },
  { image: "/images/7.JPG", text: "Memories" },
  { image: "/images/8.JPEG", text: "Views" },
  { image: "/images/9.JPEG", text: "Scenery" },
  { image: "/images/10.JPEG", text: "Vistas" },
  { image: "/images/11.png", text: "Unload" },
  { image: "/images/12.png", text: "Moments" },
  { image: "/images/13.png", text: "Reconnect" },
  { image: "/images/14.JPEG", text: "Adventures" },
  { image: "/images/hero.JPEG", text: "Memories" },
];

/**
 * Section order is the argument the page makes, in order:
 *   promise → the life you're leaving → how to travel with us → actual trips
 *   with dates → proof → why solo works → what it looks like → who we are →
 *   who's already gone → objections → the ask.
 *
 * The ground alternates with it: photo/ink, then the one pure-white cut
 * (EscapeSection), then paper, then ink for the pinned moment, then paper
 * again, closing on night for the WhatsApp CTA. See DESIGN.md.
 */
export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <EscapeSection />
        <TripTypes />
        <FeaturedItineraries />
        <TrustBar />

        <GalleryStrip />
        <AboutUntouch />
        <ResponsibleTraveling />
        <AboutOwner />
        <Reviews />
        <FaqPreview />
        <WhatsAppCta />
      </main>
      <div style={{ height: '600px', position: 'relative' }}>
        <CircularGallery
          items={galleryItems}
          bend={4}
          textColor="#ffffff"
          borderRadius={0.05}
          scrollEase={0.02}
          fontUrl="https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap"
          font="bold 30px Orbitron"
        />
      </div>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}

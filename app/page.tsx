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
  { image: "/images/himalayan-valley-river.jpg", text: "Journey" },
  { image: "/images/monastery-prayer-flags.jpg", text: "Explore" },
  { image: "/images/village-children-smiling.jpg", text: "Discover" },
  { image: "/images/hillside-village-temple.jpg", text: "Wander" },
  { image: "/images/craft-workshop-table.jpg", text: "Escape" },
  { image: "/images/temple-below-mountain-wall.jpg", text: "Adventure" },
  { image: "/images/traveller-craft-workshop.jpg", text: "Memories" },
  { image: "/images/traveller-himachali-cap.jpg", text: "Views" },
  { image: "/images/traveller-mountain-view.jpg", text: "Scenery" },
  { image: "/images/village-snow-peaks-view.jpg", text: "Vistas" },
  { image: "/images/painting-in-the-forest.jpg", text: "Unload" },
  { image: "/images/painting-session-by-river.jpg", text: "Moments" },
  { image: "/images/group-art-session-forest.jpg", text: "Reconnect" },
  { image: "/images/group-selfie-prayer-flags.jpg", text: "Adventures" },
  { image: "/images/snow-peaks-pine-valley.jpg", text: "Memories" },
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

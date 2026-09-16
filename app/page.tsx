import { Hero } from "@/components/Hero";
import { EscapeSection } from "@/components/EscapeSection";
import { TripTypes } from "@/components/TripTypes";
import { FeaturedItineraries } from "@/components/FeaturedItineraries";
import { TrustBar } from "@/components/TrustBar";
import { StrangerTrip } from "@/components/StrangerTrip";
import { GalleryStrip } from "@/components/GalleryStrip";
import { StoryTeaser } from "@/components/StoryTeaser";
import { AboutOwner } from "@/components/AboutOwner";
import { Reviews } from "@/components/Reviews";
import { FaqPreview } from "@/components/FaqPreview";
import { WhatsAppCta, FloatingWhatsApp } from "@/components/WhatsAppCta";
import { Footer } from "@/components/Footer";
import CircularGallery from "@/components/CircularGallery";

const galleryItems = [
  { image: "/images/DJI_0141.JPEG", text: "Journey" },
  { image: "/images/DSC01003 n.JPEG", text: "Explore" },
  { image: "/images/DSC01003.JPEG", text: "Wander" },
  { image: "/images/DSC01010.JPEG", text: "Discover" },
  { image: "/images/DSC01069.JPEG", text: "Escape" },
  { image: "/images/DSC01070.JPG", text: "Adventure" },
  { image: "/images/DSC010701.JPEG", text: "Travel" },
  { image: "/images/IMG_20260630_080719993.JPG", text: "Views" },
  { image: "/images/IMG_20260630_080719993_n.JPEG", text: "Scenery" },
  { image: "/images/IMG_20260630_081210116_HDR.JPEG", text: "Moments" },
  { image: "/images/IMG_20260630_093715977_HDR_PCT.JPEG", text: "Nature" },
  { image: "/images/Screenshot 2026-07-16 at 6.05.24 PM.png", text: "Vistas" },
  { image: "/images/Screenshot 2026-07-16 at 6.06.35 PM.png", text: "Destinations" },
  { image: "/images/Screenshot 2026-07-16 at 6.07.13 PM.png", text: "Experiences" },
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
        <StrangerTrip />
        <GalleryStrip />
        <StoryTeaser />
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

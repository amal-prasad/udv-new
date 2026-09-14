import { Hero } from "@/components/Hero";
import { EscapeSection } from "@/components/EscapeSection";
import { TripTypes } from "@/components/TripTypes";
import { FeaturedItineraries } from "@/components/FeaturedItineraries";
import { StrangerTrip } from "@/components/StrangerTrip";
import { TrustBar } from "@/components/TrustBar";
import { StoryTeaser } from "@/components/StoryTeaser";
import { Reviews } from "@/components/Reviews";
import { WhatsAppCta, FloatingWhatsApp } from "@/components/WhatsAppCta";
import { GalleryStrip } from "@/components/GalleryStrip";
import { FaqPreview } from "@/components/FaqPreview";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <EscapeSection />
        <TripTypes />
        <FeaturedItineraries />
        <StrangerTrip />
        <TrustBar />
        <StoryTeaser />
        <Reviews />
        <WhatsAppCta />
        <GalleryStrip />
        <FaqPreview />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}

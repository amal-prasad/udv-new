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
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}

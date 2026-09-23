import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BlurHighlight } from "@/components/BlurHighlight";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { TripGrid } from "@/components/TripCard";
import { destinationsForTrip } from "@/data/destinations";
import { ITINERARIES, tripBySlug, type Itinerary } from "@/data/trips";
import { SITE } from "@/lib/site-config";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return ITINERARIES.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/trips/[slug]">): Promise<Metadata> {
  const trip = tripBySlug((await params).slug);
  if (!trip) return {};
  return pageMetadata({
    title: trip.seoTitle,
    description: trip.description,
    path: `/trips/${trip.slug}`,
    image: trip.photo,
  });
}

function whatsAppHref(trip: Itinerary) {
  const message = `Hi! I'd like details on the ${trip.title} trip (${trip.duration}).`;
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

// Same hub first, then same region; three is enough to keep people moving.
function relatedTrips(trip: Itinerary) {
  const hubTrips = destinationsForTrip(trip.slug).flatMap((d) => d.trips);
  return ITINERARIES.filter((t) => t.slug !== trip.slug)
    .sort(
      (a, b) =>
        Number(hubTrips.includes(b.slug)) - Number(hubTrips.includes(a.slug)) ||
        Number(b.region === trip.region) - Number(a.region === trip.region),
    )
    .slice(0, 3);
}

// No offers/price/dates: none are published (docs/owner-todo.md).
function touristTrip(trip: Itinerary) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: trip.title,
    description: trip.description,
    url: `${SITE.url}/trips/${trip.slug}`,
    image: `${SITE.url}${trip.photo}`,
    touristType: "Solo travellers joining a small group",
    provider: { "@id": `${SITE.url}/#organization` },
    itinerary: {
      "@type": "ItemList",
      itemListElement: trip.days.map((d, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: `${d.label}: ${d.title}`,
        description: d.detail,
      })),
    },
  };
}

export default async function TripPage({ params }: PageProps<"/trips/[slug]">) {
  const trip = tripBySlug((await params).slug);
  if (!trip) notFound();
  const hubs = destinationsForTrip(trip.slug);

  return (
    <>
      <JsonLd data={touristTrip(trip)} />
      <main>
        <PageHero
          photo={trip.photo}
          crumbs={[
            { name: "Trips", href: "/trips" },
            { name: trip.title, href: `/trips/${trip.slug}` },
          ]}
          eyebrow={`${trip.region} · ${trip.duration}`}
          title={trip.title}
        >
          <p className="max-w-2xl text-base text-cloud md:text-lg">{trip.description}</p>
        </PageHero>

        <div className="bg-paper px-6 py-16 md:px-10 md:py-24">
          <div className="mx-auto flex max-w-3xl flex-col gap-12">
            <BlurHighlight
              className="text-lg leading-relaxed text-ink md:text-xl"
              text={trip.blurb}
              highlight={trip.highlight}
            />

            <section>
              <h2 className="text-[0.7rem] uppercase tracking-[0.18em] text-slate">Route</h2>
              <p className="mt-2 font-display text-base leading-relaxed text-ink">{trip.route}</p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-ink md:text-3xl">
                Day-by-day itinerary
              </h2>
              {/* Left rule + dot per day reads as a timeline without a
                  library: the rule is the <ol> border, the dot is a span
                  positioned onto it. */}
              <ol className="mt-6 flex flex-col gap-6 border-l border-mist pl-6">
                {trip.days.map((day) => (
                  <li key={day.label + day.title} className="relative">
                    <span
                      aria-hidden
                      className="absolute -left-[1.9rem] top-1.5 h-2.5 w-2.5 rounded-full bg-alpenglow ring-4 ring-paper"
                    />
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ember">
                      {day.label}
                    </p>
                    <h3 className="mt-1 font-display text-lg font-semibold text-ink">{day.title}</h3>
                    <p className="mt-1 text-base leading-relaxed text-slate">{day.detail}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section className="rounded-4xl bg-ink/5 p-6 ring-1 ring-ink/10">
              <h2 className="text-[0.7rem] uppercase tracking-[0.18em] text-slate">Payment terms</h2>
              <p className="mt-2 text-base leading-relaxed text-ink">
                <span className="font-semibold">{trip.advancePct}%</span> as the booking advance, the
                remaining <span className="font-semibold">{100 - trip.advancePct}%</span>{" "}
                {trip.balanceDue}. Message us for the next departure dates and the price.
              </p>
            </section>

            <a
              href={whatsAppHref(trip)}
              target="_blank"
              rel="noopener noreferrer"
              className="sheen w-fit rounded-full bg-gradient-to-r from-alpenglow to-dawn px-8 py-4 text-sm font-semibold text-summit shadow-glow transition-transform hover:scale-[1.03]"
            >
              Ask about this trip on WhatsApp
            </a>

            {hubs.length > 0 && (
              <p className="text-base text-slate">
                More on the region:{" "}
                {hubs.map((d, i) => (
                  <span key={d.slug}>
                    {i > 0 && " · "}
                    <Link
                      href={`/destinations/${d.slug}`}
                      className="font-medium text-ink underline underline-offset-4 hover:text-ember"
                    >
                      {d.name} travel guide
                    </Link>
                  </span>
                ))}
              </p>
            )}
          </div>
        </div>

        <section className="bg-night px-4 py-16 md:py-24">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-8 font-display text-2xl font-semibold text-paper md:text-4xl">
              Related trips
            </h2>
            <TripGrid trips={relatedTrips(trip)} />
            <Link
              href="/trips"
              className="mt-8 inline-block text-sm font-medium text-paper underline underline-offset-4 hover:text-dawn"
            >
              All trips →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { TripGrid } from "@/components/TripCard";
import { DESTINATIONS, destinationBySlug, tripsFor } from "@/data/destinations";
import { SITE } from "@/lib/site-config";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return DESTINATIONS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: PageProps<"/destinations/[slug]">): Promise<Metadata> {
  const d = destinationBySlug((await params).slug);
  if (!d) return {};
  return pageMetadata({
    title: d.seoTitle,
    description: d.description,
    path: `/destinations/${d.slug}`,
    image: tripsFor(d)[0].photo,
  });
}

export default async function DestinationPage({ params }: PageProps<"/destinations/[slug]">) {
  const d = destinationBySlug((await params).slug);
  if (!d) notFound();
  const trips = tripsFor(d);
  const url = `${SITE.url}/destinations/${d.slug}`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TouristDestination",
          name: d.name,
          description: d.description,
          url,
          image: `${SITE.url}${trips[0].photo}`,
        }}
      />
      <main>
        <PageHero
          photo={trips[0].photo}
          crumbs={[
            { name: "Destinations", href: "/destinations" },
            { name: d.name, href: `/destinations/${d.slug}` },
          ]}
          eyebrow="Travel guide"
          title={d.name}
        >
          <p className="max-w-2xl text-base text-cloud md:text-lg">{d.description}</p>
        </PageHero>

        <article className="bg-paper px-6 py-16 md:px-10 md:py-24">
          <div className="mx-auto flex max-w-3xl flex-col gap-6">
            {d.intro.map((p) => (
              <p key={p.slice(0, 40)} className="text-base leading-relaxed text-slate md:text-lg">
                {p}
              </p>
            ))}

            <h2 className="mt-6 font-display text-2xl font-semibold text-ink md:text-3xl">
              {d.name} trips at a glance
            </h2>
            {trips.map((t) => (
              <section key={t.slug}>
                <h3 className="font-display text-lg font-semibold text-ink">
                  <Link href={`/trips/${t.slug}`} className="underline-offset-4 hover:text-ember hover:underline">
                    {t.title}
                  </Link>
                </h3>
                <p className="mt-1 text-base leading-relaxed text-slate">
                  {t.duration}, {t.route}. {t.blurb} Booking takes a {t.advancePct}% advance, with
                  the balance due {t.balanceDue}.
                </p>
              </section>
            ))}
          </div>
        </article>

        <section className="bg-night px-4 py-16 md:py-24">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-8 font-display text-2xl font-semibold text-paper md:text-4xl">
              {d.name} trips from Delhi
            </h2>
            <TripGrid trips={trips} />
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

import Link from "next/link";

import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { TripGrid } from "@/components/TripCard";
import { ITINERARIES } from "@/data/trips";
import { SITE } from "@/lib/site-config";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Private & Custom Himachal Trips from Delhi",
  description:
    "Plan a private or custom trip to Himachal, Uttarakhand or Zanskar for your own group. Tell us your dates and we reply with real trip options on WhatsApp.",
  path: "/private-trips",
});

// TODO(client): which regions private trips cover, group sizes, and how
// pricing works (docs/owner-todo.md). Copy below states only what the site
// already says.
const PRIVATE_MESSAGE = "Hi! I'd like to plan a private trip for my group. Our dates are:";

const STYLES = [
  {
    name: "Slow travel",
    text: "Built around actually resting: long mornings, one place, no rush to squeeze in one more thing before checkout.",
  },
  {
    name: "Travel without a map",
    text: "No hour-by-hour itinerary. We pick a direction and the road decides the rest.",
  },
  {
    name: "Adventure",
    text: "Rafting, trekking and the kind of days that get your heart rate up.",
  },
];

export default function PrivateTripsPage() {
  return (
    <>
      <main>
        <PageHero
          photo="/images/village-snow-peaks-view.jpg"
          crumbs={[{ name: "Private trips", href: "/private-trips" }]}
          title="Private and custom trips"
        >
          <p className="max-w-2xl text-base text-cloud md:text-lg">
            Your own group, your own dates, on roads less travelled in Himachal, Uttarakhand and
            beyond.
          </p>
        </PageHero>

        <article className="bg-paper px-6 py-16 md:px-10 md:py-24">
          <div className="mx-auto flex max-w-3xl flex-col gap-6 text-base leading-relaxed text-slate md:text-lg">
            <p>
              Not every trip has to be a fixed departure. If you are travelling with friends,
              family or a team, we can plan a trip around your group instead: your dates, your
              pace and the places you want to see.
            </p>
            <p>
              Skip the form. Tell us the dates you are picturing and who is coming, and we reply
              with real trip options, not a PDF brochure.
            </p>
            <h2 className="mt-6 font-display text-2xl font-semibold text-ink md:text-3xl">
              Pick the kind of trip
            </h2>
            <ul className="flex flex-col gap-4">
              {STYLES.map((s) => (
                <li key={s.name}>
                  <h3 className="font-display text-lg font-semibold text-ink">{s.name}</h3>
                  <p>{s.text}</p>
                </li>
              ))}
            </ul>
            <a
              href={`https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(PRIVATE_MESSAGE)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="sheen mt-4 w-fit rounded-full bg-gradient-to-r from-alpenglow to-dawn px-8 py-4 text-sm font-semibold text-summit shadow-glow transition-transform hover:scale-[1.03]"
            >
              Plan a private trip on WhatsApp
            </a>
            <p>
              Travelling alone? Join one of our{" "}
              <Link
                href="/group-trips-for-solo-travellers"
                className="font-medium text-ink underline underline-offset-4 hover:text-ember"
              >
                group trips for solo travellers
              </Link>{" "}
              instead.
            </p>
          </div>
        </article>

        <section className="bg-night px-4 py-16 md:py-24">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-3 font-display text-2xl font-semibold text-paper md:text-4xl">
              Start from one of our routes
            </h2>
            <p className="mb-8 max-w-2xl text-base text-cloud">
              Every group route can be a starting point for your own trip.
            </p>
            <TripGrid trips={ITINERARIES} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

import Link from "next/link";

import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { TripGrid } from "@/components/TripCard";
import { ITINERARIES } from "@/data/trips";
import { SITE } from "@/lib/site-config";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Group Trips for Solo Travellers from Delhi",
  description:
    "Travelling alone? Join a small-group trip from Delhi to Himachal, Uttarakhand or Zanskar. Book as one person, travel with a group, leave with friends.",
  path: "/group-trips-for-solo-travellers",
});

// TODO(client): group size, share of solo women, age range — add once
// confirmed (docs/owner-todo.md). Nothing here is a number we made up.
const HIMACHAL_UTTARAKHAND = ITINERARIES.filter((t) => !t.region.includes("Ladakh"));

export default function SoloTravellersPage() {
  return (
    <>
      <main>
        <PageHero
          photo="/images/group-selfie-prayer-flags.jpg"
          alt="An Untouch Destination group selfie under prayer flags in the mountains"
          crumbs={[{ name: "Group trips for solo travellers", href: "/group-trips-for-solo-travellers" }]}
          title="Group trips for solo travellers"
        >
          <p className="max-w-2xl text-base text-cloud md:text-lg">
            You don&apos;t need a travel buddy. You need a departure date.
          </p>
        </PageHero>

        <article className="bg-paper px-6 py-16 md:px-10 md:py-24">
          <div className="mx-auto flex max-w-3xl flex-col gap-6 text-base leading-relaxed text-slate md:text-lg">
            <h2 className="font-display text-2xl font-semibold text-ink md:text-3xl">
              How a group trip works when you come alone
            </h2>
            <p>
              Every Untouch Destination trip is a small group. You book as one person, and you
              meet the rest of the group at the pickup point in Delhi on the night of departure.
              Most trips start with a <em>raat ki sawari</em>, an overnight drive, so by the first
              morning you are already in the mountains with the people you will spend the trip with.
            </p>
            <p>
              The plan is fixed and published before you book: the route, what each day covers
              and how the payment works. You don&apos;t have to plan the route, find the homestays
              or work out the roads. You only need to pick a trip and a date.
            </p>
            <p>
              The trips are built around things that are better with other people: bonfires at
              the homestay in Jibhi and Sangla, camping at Jalori Pass, Khaliya Top and Chandratal
              Lake, stargazing at Gumbok Rangan, and long drives over Shinku La into Zanskar.
            </p>
            <h2 className="mt-6 font-display text-2xl font-semibold text-ink md:text-3xl">
              Before you book
            </h2>
            <p>
              Message us on{" "}
              <a
                href={`https://wa.me/${SITE.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-ink underline underline-offset-4 hover:text-ember"
              >
                WhatsApp
              </a>{" "}
              with the trip you like and ask anything: who else is going, how fit you need to be,
              where you stay. Ask before you book. Want to go with your own people
              instead? See{" "}
              <Link href="/private-trips" className="font-medium text-ink underline underline-offset-4 hover:text-ember">
                private trips
              </Link>
              .
            </p>
          </div>
        </article>

        <section className="bg-night px-4 py-16 md:py-24">
          <div className="mx-auto flex max-w-5xl flex-col gap-16">
            <div>
              <h2 className="mb-8 font-display text-2xl font-semibold text-paper md:text-4xl">
                Himachal &amp; Uttarakhand group trips for solo travellers
              </h2>
              <TripGrid trips={HIMACHAL_UTTARAKHAND} />
            </div>
            <div>
              <h2 className="mb-8 font-display text-2xl font-semibold text-paper md:text-4xl">
                Zanskar group trips
              </h2>
              <TripGrid trips={ITINERARIES.filter((t) => t.region.includes("Ladakh"))} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

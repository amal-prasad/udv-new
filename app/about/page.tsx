import { AboutOwner } from "@/components/AboutOwner";
import { AboutUntouch } from "@/components/AboutUntouch";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { WhereUntouchFits } from "@/components/WhereUntouchFits";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Us",
  description:
    "Untouch Destination is a Chandigarh-based travel company running small-group and private trips to less-touristed corners of Himachal and Uttarakhand.",
  path: "/about",
});

// TODO(client): address, founder photo and full name (docs/owner-todo.md).
export default function AboutPage() {
  return (
    <>
      <main>
        <PageHero
          photo="/images/group-selfie-prayer-flags.jpg"
          alt="An Untouch Destination group selfie under prayer flags in the mountains"
          crumbs={[{ name: "About", href: "/about" }]}
          title="About Untouch Destination"
        >
          <p className="max-w-2xl text-base text-cloud md:text-lg">
            A small travel company from Chandigarh, taking people to the places mass tourism
            hasn&apos;t reached yet.
          </p>
        </PageHero>
        <AboutUntouch />
        <WhereUntouchFits />
        <AboutOwner />
      </main>
      <Footer />
    </>
  );
}

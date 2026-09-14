// Static section — spec says don't animate trust/conversion content, so no
// scroll or hover motion here.

type Review = {
  quote: string;
  name: string;
  trip: string;
};

// Placeholder quotes in the brand voice, awaiting real traveller reviews
// from the client. Same shape (quote/name/trip) so swapping in real
// testimonials later is a data-only change.
const REVIEWS: Review[] = [
  {
    quote:
      "Booked solo, left with a group chat I still use. The itinerary had just enough plan and just enough nothing planned.",
    name: "Ananya",
    trip: "Spiti Valley circuit",
  },
  {
    quote:
      "No brochure PDFs, no runaround — just a WhatsApp reply within the hour and a trip that actually matched it.",
    name: "Rohit",
    trip: "Kedarkantha winter trek",
  },
  {
    quote:
      "Went in expecting a standard tour group, got a small crew and a guide who clearly loved the route more than the job.",
    name: "Meera",
    trip: "Ladakh monasteries road trip",
  },
];

function StarRow({ size = "h-4 w-4" }: { size?: string }) {
  return (
    <div aria-hidden className="flex gap-1 text-dawn">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" fill="currentColor" className={size}>
          <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.4 6-5.5-3.2-5.5 3.2 1.4-6-4.6-4.1 6.1-.6z" />
        </svg>
      ))}
    </div>
  );
}

export function Reviews() {
  const [featured, ...rest] = REVIEWS;

  return (
    // Ink, not paper: GalleryStrip, StoryTeaser and FaqPreview are all pale,
    // and four pale sections in a row is exactly the flat rhythm the brief
    // calls out. The proof section is where the page goes dark before the ask.
    <section id="reviews" className="relative isolate w-full overflow-hidden bg-ink px-4 py-[12vh] md:px-8">
      <div className="sun-wash pointer-events-none absolute inset-0 -z-10" />
      <div className="mx-auto max-w-5xl">
        <h2 className="max-w-sm font-display text-3xl font-semibold tracking-tight text-paper md:text-5xl">
          People who&apos;ve already gone
        </h2>

        {/* One large review, not six equal cards: it carries the section,
            the rest sit beside it as narrower pull-quotes. No card chrome —
            a divider rule is the only separator. */}
        <div className="mt-14 grid gap-12 md:grid-cols-[1.4fr_1fr] md:gap-16">
          <figure className="flex max-w-[36ch] flex-col gap-5">
            <StarRow size="h-5 w-5" />
            <blockquote className="font-display text-2xl font-medium leading-snug tracking-tight text-paper md:text-3xl">
              &ldquo;{featured.quote}&rdquo;
            </blockquote>
            <figcaption className="text-sm text-cloud">
              {featured.name} &middot; {featured.trip}
            </figcaption>
          </figure>

          <div className="flex flex-col gap-10 md:pt-2">
            {rest.map((review, i) => (
              <figure
                key={review.name}
                className={i === 0 ? "max-w-[38ch]" : "max-w-[38ch] border-t border-paper/15 pt-8"}
              >
                <StarRow />
                <blockquote className="mt-3 text-sm text-cloud md:text-base">
                  &ldquo;{review.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-3 text-sm text-cloud">
                  {review.name} &middot; {review.trip}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

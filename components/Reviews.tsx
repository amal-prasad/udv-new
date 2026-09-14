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

function StarRow() {
  return (
    <div aria-hidden className="flex gap-1 text-ember">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
          <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.4 6-5.5-3.2-5.5 3.2 1.4-6-4.6-4.1 6.1-.6z" />
        </svg>
      ))}
    </div>
  );
}

export function Reviews() {
  return (
    <section id="reviews" className="w-full bg-paper px-4 py-[10vh]">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-ink md:text-5xl">
          People who've already gone
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {REVIEWS.map((review) => (
            <figure
              key={review.name}
              className="flex flex-col gap-4 rounded-3xl border border-mist bg-paper p-6"
            >
              <StarRow />
              <blockquote className="text-sm text-ink md:text-base">
                “{review.quote}”
              </blockquote>
              <figcaption className="mt-auto text-sm text-ink/60">
                {review.name} · {review.trip}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

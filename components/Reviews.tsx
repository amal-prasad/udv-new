import { REVIEWS, type Review } from "@/lib/social-proof";

// Three columns, each a seamless vertical loop. Middle column runs the other
// way so the wall never reads as one block sliding.
const COLUMNS: { items: Review[]; duration: string; reverse: boolean }[] = [
  { items: REVIEWS.filter((_, i) => i % 3 === 0), duration: "34s", reverse: false },
  { items: REVIEWS.filter((_, i) => i % 3 === 1), duration: "42s", reverse: true },
  { items: REVIEWS.filter((_, i) => i % 3 === 2), duration: "38s", reverse: false },
];

function QuoteCard({ review }: { review: Review }) {
  return (
    <figure className="rounded-2xl border border-paper/10 bg-paper/[0.04] p-6 md:p-7">
      <blockquote className="text-[0.95rem] leading-relaxed text-paper/90 md:text-base">
        &ldquo;{review.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-5 border-t border-paper/10 pt-4 text-sm text-cloud">
        <span className="text-paper">{review.name}</span>
        <span className="block text-xs text-cloud/80">{review.trip}</span>
      </figcaption>
    </figure>
  );
}

export function Reviews() {
  if (REVIEWS.length === 0) return null;

  return (
    // Ink, not paper: GalleryStrip, StoryTeaser and FaqPreview are all pale,
    // and four pale sections in a row is exactly the flat rhythm the brief
    // calls out. The proof section is where the page goes dark before the ask.
    <section id="reviews" className="relative isolate w-full overflow-hidden bg-ink px-4 py-[12vh] md:px-8">
      <div className="sun-wash pointer-events-none absolute inset-0 -z-10" />
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center">
          <span className="rounded-full border border-paper/25 px-4 py-1.5 text-xs tracking-wide text-cloud">
            Testimonials
          </span>
          <h2 className="mt-6 font-display text-4xl font-semibold tracking-tight text-paper md:text-6xl">
            Real stories.
          </h2>
          <p className="mt-4 max-w-xl text-sm text-cloud md:text-base">
            People who&apos;ve already gone, in their own words.
          </p>
        </div>

        {/* Fades at both edges so cards enter and leave instead of popping. */}
        <div
          className="review-columns relative mt-14 grid max-h-[560px] grid-cols-1 gap-5 overflow-hidden md:max-h-[640px] md:grid-cols-3 md:gap-6"
          style={{
            maskImage: "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
          }}
        >
          {COLUMNS.map((column, ci) => (
            <div
              key={ci}
              className={`review-track flex flex-col gap-5 md:gap-6${column.reverse ? " review-track-down" : ""}${
                ci === 2 ? " hidden md:flex" : ""
              }`}
              style={{ ["--review-duration" as string]: column.duration }}
            >
              {column.items.map((review, i) => (
                <QuoteCard key={`${review.name}-${i}`} review={review} />
              ))}
              {/* Loop copy — the animation translates exactly one set. Hidden
                  from crawlers and assistive tech so each quote reads once. */}
              <div aria-hidden inert className="flex flex-col gap-5 md:gap-6">
                {column.items.map((review, i) => (
                  <QuoteCard key={`${review.name}-copy-${i}`} review={review} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

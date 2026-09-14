import Link from "next/link";

// Static — no JS accordion state. <details>/<summary> gives us expand/
// collapse natively; only the marker styling and chevron rotation are CSS.

type FaqItem = {
  question: string;
  answer: string;
};

// Placeholder answers in the brand voice, awaiting final copy review.
const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Do I need a travel buddy to book?",
    answer:
      "No. Most of our travellers book solo — you land in a small group of strangers who leave as friends. All you need is a departure date.",
  },
  {
    question: "How fit do I need to be?",
    answer:
      "Depends on the trip — a road trip needs none, a trek needs some. Every itinerary lists a difficulty level up front so you know what you're signing up for before you book.",
  },
  {
    question: "Is it safe for solo female travellers?",
    answer:
      "Yes — a large share of our groups are solo women, and it stays a priority in how we pick stays, routes and group sizes. Happy to share specifics over WhatsApp before you book.",
  },
];

export function FaqPreview() {
  return (
    <section className="w-full bg-paper px-4 py-[10vh]">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-ink md:text-5xl">
          Questions before you book?
        </h2>

        <div className="mt-8 divide-y divide-mist border-y border-mist">
          {FAQ_ITEMS.map((item) => (
            <details key={item.question} className="group py-5 [&::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-medium text-ink">
                {item.question}
                <span className="shrink-0 text-2xl leading-none text-ink transition-transform duration-200 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-ink/70 md:text-base">{item.answer}</p>
            </details>
          ))}
        </div>

        <Link
          href="/faq"
          className="mt-6 inline-block text-sm font-medium text-ink underline underline-offset-4"
        >
          Read all FAQs →
        </Link>
      </div>
    </section>
  );
}

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
    <section id="faq" className="w-full bg-paper px-4 pb-[10vh] pt-[18vh] md:px-8">
      {/* Narrow measure, lots of air above — the quiet moment before the ask. */}
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-ink md:text-5xl">
          Questions before you book?
        </h2>

        <div className="mt-10 divide-y divide-mist border-y border-mist text-left">
          {FAQ_ITEMS.map((item) => (
            <details key={item.question} className="group py-5 [&::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-medium text-ink">
                {item.question}
                <span className="shrink-0 text-2xl leading-none text-ink transition-transform duration-200 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-[62ch] text-sm text-slate md:text-base">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

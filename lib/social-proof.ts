export type Review = {
  quote: string;
  name: string;
  trip: string;
  // true only once the client confirms the review is real and sourced.
  verified: boolean;
};

// Placeholder quotes in the brand voice. Client confirmed (2026-09-23) none are
// real, so all are verified: false and nothing renders. Add real ones with
// verified: true (see docs/owner-todo.md).
const ALL_REVIEWS: Review[] = [
  {
    quote:
      "Booked solo, left with a group chat I still use. The itinerary had just enough plan and just enough nothing planned.",
    name: "Ananya",
    trip: "Spiti Valley circuit",
    verified: false,
  },
  {
    quote:
      "No brochure PDFs, no runaround — just a WhatsApp reply within the hour and a trip that actually matched it.",
    name: "Rohit",
    trip: "Kedarkantha winter trek",
    verified: false,
  },
  {
    quote:
      "Went in expecting a standard tour group, got a small crew and a guide who clearly loved the route more than the job.",
    name: "Meera",
    trip: "Ladakh monasteries road trip",
    verified: false,
  },
  {
    quote:
      "The homestay night wasn't on any brochure. We ate what the family ate, and that's the evening everyone still talks about.",
    name: "Devika",
    trip: "Kinnaur slow route",
    verified: false,
  },
  {
    quote:
      "First high-altitude trek and I was quietly terrified. Nobody rushed me, nobody made it a thing. I walked up at my own pace and made it.",
    name: "Sameer",
    trip: "Hampta Pass crossing",
    verified: false,
  },
  {
    quote:
      "Weather turned on day three and the whole plan changed by evening. It changed well — we ended up somewhere better than the original stop.",
    name: "Tanvi",
    trip: "Zanskar winter run",
    verified: false,
  },
  {
    quote:
      "I'd stopped expecting travel companies to be honest about what a trip actually costs. These folks were, down to the last add-on.",
    name: "Arjun",
    trip: "Meghalaya living roots",
    verified: false,
  },
  {
    quote:
      "Came back and realised I hadn't opened work email in nine days. Didn't even decide to — there was just never a moment I wanted to.",
    name: "Nikhil",
    trip: "Spiti Valley circuit",
    verified: false,
  },
  {
    quote:
      "They kept the group small enough that by day two we were splitting snacks and finishing each other's sentences. That's the whole thing, really.",
    name: "Priya",
    trip: "Sandakphu ridge walk",
    verified: false,
  },
];

export const REVIEWS = ALL_REVIEWS.filter((r) => r.verified);

// Client confirmed (2026-09-23) these figures are placeholders.
const ALL_STATS = [
  { value: "40+", label: "trips run", verified: false },
  { value: "600+", label: "travellers", verified: false },
  { value: "5 years", label: "on the road", verified: false },
  { value: "4.9★", label: "average rating", verified: false },
];

export const STATS = ALL_STATS.filter((s) => s.verified);

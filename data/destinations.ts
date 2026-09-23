import { ITINERARIES } from "@/data/trips";

export type Destination = {
  /** URL segment: /destinations/[slug]. */
  slug: string;
  name: string;
  /** <title> text (the layout template appends the brand). */
  seoTitle: string;
  /** Meta description, max 160 chars. */
  description: string;
  /** Every sentence is taken from the trip data — no invented facts.
   *  TODO(client): "best time to visit" per hub (docs/owner-todo.md). */
  intro: string[];
  /** Trip slugs from data/trips.ts that go here. */
  trips: string[];
};

// Hubs from docs/seo/keyword-map.md. Parvati and Darma Valley hubs wait for
// a Parvati trip and confirmed permit details.
export const DESTINATIONS: Destination[] = [
  {
    slug: "spiti",
    name: "Spiti Valley",
    seoTitle: "Spiti Valley Travel Guide & Group Trips",
    description:
      "Spiti Valley travel guide: the places on our Spiti circuit and Chandratal trips from Delhi, from Tabo, Kaza, Hikkim and Komik to Chandratal Lake.",
    intro: [
      "Spiti is the high, dry valley of Himachal Pradesh. From Delhi you can reach it the long way, through Shimla and Kinnaur, or over the top from Manali through the Atal Tunnel. We run both: a seven-day circuit that loops the whole valley, and a short three-day trip to Chandratal Lake.",
      "The Spiti Circuit leaves Majnu Ka Tila at 9:30 PM and climbs through Shimla, Narkanda and Rampur to Kalpa. From there the road passes the Kinnaur Caves and Moorang Fort to Khab Bridge, where the Sutlej and Spiti rivers meet. Tabo Monastery and Dhankar Monastery come next, and then Kaza.",
      "From Kaza the circuit reaches the world's highest post office at Hikkim, Komik, the highest motorable village, and the Buddha statue at Langza. The way back runs through Nako and its lake, then Karcham and the Sangla Valley to Chitkul, before the long drive to Shimla and an overnight Volvo to Delhi.",
      "Manali & Chandratal is the short version. You drive overnight from Delhi to the Kullu Valley, spend a day in Manali with the Jogini Waterfall trek from Vashisht and the Hadimba Temple, then go through the Atal Tunnel into Lahaul and Spiti. The night is at Chandratal Lake, 4,300 m up, with lakeside camping and the kind of stargazing you only get that high.",
    ],
    trips: ["spiti-valley-circuit-group-trip", "manali-chandratal-trip"],
  },
  {
    slug: "kinnaur",
    name: "Kinnaur",
    seoTitle: "Kinnaur Valley Travel Guide & Group Trips",
    description:
      "Kinnaur valley travel guide: Sangla, Chitkul and Kalpa, Kamru Fort, Kinner Kailash and Nako, on our small-group trips from Delhi.",
    intro: [
      "Kinnaur sits between Shimla and Spiti, running up to the Indo-Tibetan border. Two of our trips go through it: the four-day Sangla, Chitkul and Kalpa trip, which stays in Kinnaur the whole time, and the Spiti Circuit, which crosses it on the way in and on the way back.",
      "The Sangla trip leaves Delhi overnight and arrives at a riverside stay in Sangla. The first day covers Kamru Fort, home to the Kamakhya Devi Temple, and Kamru Monastery, with a bonfire in the evening. The next day stops at Rakshak village and then reaches Chitkul, the last inhabited village on the Indo-Tibetan border, for its village lanes and riverside trails.",
      "After a morning in Chitkul the group moves to Kalpa for Suicide Point (Roghi Cliff) and an authentic Himachali thali. The last morning starts with sunrise over Kinner Kailash, then the Chandika Devi Temple, the Hu-Bu-Lan-Kar Monastery and a walk through the apple orchards before the drive back to Delhi.",
      "On the Spiti Circuit, Kinnaur is where the trip spends its first and last nights in the hills: Kalpa on the way in, via Narkanda and Rampur, then the Kinnaur Caves, Moorang Fort and Khab Bridge. On the way back the circuit stops at Nako and its lake, then goes through Karcham and the Sangla Valley to Chitkul.",
    ],
    trips: ["sangla-chitkul-kalpa-trip", "spiti-valley-circuit-group-trip"],
  },
  {
    slug: "zanskar",
    name: "Zanskar",
    seoTitle: "Zanskar Valley Travel Guide & Group Trips",
    description:
      "Zanskar valley travel guide: Shinku La, Gumbok Rangan, Padum, Pensi La, the Drang Drung Glacier and Phuktal Monastery, on our trips from Delhi via Manali.",
    intro: [
      "Zanskar is on the far side of Shinku La, at 16,580 ft the pass that takes the road from Manali into the Zanskar Valley. Both of our Zanskar trips start in Delhi, go through Manali and the Atal Tunnel, cross Shinku La and end at Phuktal Monastery, which is built into a cliff face.",
      "Manali to Zanskar is the four-day expedition. You board a tempo traveller at Majnu Ka Tila at 9:00 PM and spend the first day in Manali: Old Manali, the Vashisht Temple hot springs, the short trek to Jogini Waterfall and an evening on Mall Road. Day two crosses Shinku La to the Gumbok Rangan campsite for a night of stargazing. Day three is the trek to Phuktal, then back over the pass to a riverside evening at Jispa, and the last day stops at Deepak Tal and Sissu on the way to Manali.",
      "The Zanskar Padum Circuit takes six days and goes further in. It starts with a pickup at Civil Lines Metro Station and a day in Naggar, with the castle, old temples and an evening art retreat. It then crosses Solang Valley, the Atal Tunnel and Shinku La to a riverside camp at Gumbok Ranjan, and drives on to Padum for its monasteries and market.",
      "From Padum the circuit visits Sani Village and Monastery and goes through Pensi La Pass for views of the Drang Drung Glacier. The last full day goes to the Lungnak Valley and Yougar Village, then to Phuktal Monastery, before the return through Jispa and Sissu to Manali.",
    ],
    trips: ["manali-to-zanskar-expedition", "zanskar-padum-circuit"],
  },
  {
    slug: "jibhi",
    name: "Jibhi",
    seoTitle: "Jibhi Travel Guide: Jalori Pass & Shangarh",
    description:
      "Jibhi travel guide: Jibhi Waterfall, Jalori Pass, a sunset trek to Raghupur Fort and the meadows of Shangarh, on our 4-day small-group trip from Delhi.",
    intro: [
      "Jibhi is a village in Himachal's Kullu district, and the start of our four-day Jibhi & Shangarh trip from Delhi. It is a short trip built around three things: waterfalls, a fort you trek up to for the sunset, and a meadow most people never find.",
      "The group leaves Delhi in the evening and arrives in Jibhi the next morning. The first day is for Jibhi itself: Jibhi Waterfall, the spot known as Mini Thailand, a riverside walk and the local cafes, then dinner and a bonfire with music at the homestay.",
      "Day two goes to Jalori Pass through Shoja village. From the pass it is a trek of about two and a half hours to Raghupur Fort for the sunset and the mountain views, and the night is spent camping at Jalori Pass. The next morning starts with sunrise at Raghupur Fort before the trek back down to the pass.",
      "From Jalori the trip moves to Shangarh village to walk its meadows, with a night at a homestay there. The last day visits Rupi Raila Waterfall before the return journey, reaching Delhi the next morning.",
      "If you want another short trip in the Kullu valley, Naggar & Parashar covers Naggar Castle, the Parashar Rishi Temple and a sunset over Parashar Lake.",
    ],
    trips: ["jibhi-shangarh-trip-from-delhi", "naggar-parashar-lake-trip"],
  },
  {
    slug: "kumaon",
    name: "Kumaon",
    seoTitle: "Kumaon Offbeat Trips from Delhi",
    description:
      "Offbeat Kumaon trips from Delhi: Kasar Devi, Munsiyari, a camp at Khaliya Top facing Panchachuli, and the remote Darma Valley and Darchula.",
    intro: [
      "Kumaon is the eastern half of Uttarakhand. Our two Kumaon trips both start with Kasar Devi and Munsiyari; the longer one then keeps going into the Darma Valley and out to Darchula on the border.",
      "Kasar Devi · Munsiyari · Khaliya Top is the four-day version. After an overnight drive from Delhi, the first day visits Kainchi Dham, then the Kasar Devi Temple, known for its cosmic energy, along with the village lanes, the boho cafes and a sunset point. Day two is the drive to Munsiyari via Bageshwar, Sama Village and the 126 m Birthi Waterfall.",
      "Day three is the trek from Balati Bend to Khaliya Top, 5 km, with an optional hike to Zero Point for views of Panchachuli, Nanda Kot and Rajrambha. The night is a camp at Khaliya Top, and the group walks down to Munsiyari after sunrise before heading back to Delhi.",
      "Into the Untouched Himalayas is the seven-day version. It boards at Akshardham Metro, walks the pine forests at Kasar Devi, sees the Panchachuli peaks from Munsiyari and goes to Khaliya Top for its alpine meadows. Then it drives deeper into the Himalayas to the remote Darma Valley to meet the people who live there, and on to the border town of Darchula for a slow riverside morning before the overnight journey home.",
    ],
    trips: ["kasar-devi-munsiyari-khaliya-top-trip", "darma-valley-darchula-trip"],
  },
];

export const destinationBySlug = (slug: string) => DESTINATIONS.find((d) => d.slug === slug);

export const tripsFor = (d: Destination) =>
  d.trips.map((slug) => ITINERARIES.find((t) => t.slug === slug)!);

export const destinationsForTrip = (tripSlug: string) =>
  DESTINATIONS.filter((d) => d.trips.includes(tripSlug));

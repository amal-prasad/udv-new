import { TRIP_PHOTOS } from "@/lib/images";

export type ItineraryDay = {
  /** "Day 0", "Day 1", "Night before" — printed as-is. */
  label: string;
  title: string;
  detail: string;
};

export type Itinerary = {
  slug: string;
  title: string;
  region: string;
  duration: string;
  /** Delhi to Delhi, already arrow-joined for display. */
  route: string;
  /** One-line pitch. Phrases in `highlight` get the marker-pen treatment. */
  blurb: string;
  highlight: string[];
  days: ItineraryDay[];
  /** Advance % taken at booking; the rest is the balance. */
  advancePct: number;
  /** When the balance falls due — wording differs per trip. */
  balanceDue: string;
  photo: string;
};

// Source of truth: untouch_destination_itineraries.md, as supplied by the
// client. No prices and no seat counts here on purpose — those were invented
// placeholders in the old list and the real sheet quotes neither.
export const ITINERARIES: Itinerary[] = [
  {
    slug: "jibhi-shangarh",
    title: "Jibhi & Shangarh",
    region: "Himachal Pradesh",
    duration: "4 days",
    route: "Delhi → Jibhi → Jalori Pass → Shangarh → Delhi",
    blurb:
      "Waterfalls, a fort you trek to for sunset, and a meadow most people never find. Camping at Jalori Pass under a sky with nothing in the way.",
    highlight: ["trek to for sunset", "Camping at Jalori Pass"],
    advancePct: 30,
    balanceDue: "on arrival",
    photo: TRIP_PHOTOS[0],
    days: [
      {
        label: "Day 0",
        title: "Evening pickup from Delhi",
        detail: "Depart from Delhi in the evening for Jibhi.",
      },
      {
        label: "Day 1",
        title: "Explore Jibhi",
        detail:
          "Visit Jibhi Waterfall and Mini Thailand. Riverside walk and local cafes. Dinner and bonfire with music at the homestay.",
      },
      {
        label: "Day 2",
        title: "Jalori Pass & Raghupur Fort",
        detail:
          "Travel to Jalori Pass via Shoja village. Trek to Raghupur Fort (~2.5 hours) for sunset and mountain views. Camping at Jalori Pass.",
      },
      {
        label: "Day 3",
        title: "Sunrise & Shangarh",
        detail:
          "Sunrise at Raghupur Fort. Trek back to Jalori Pass, then transfer to Shangarh village to explore the meadows. Homestay in Shangarh.",
      },
      {
        label: "Day 4",
        title: "Shangarh & return to Delhi",
        detail:
          "Visit Rupi Raila Waterfall, then begin the return journey to Delhi, arriving the next morning.",
      },
    ],
  },
  {
    slug: "kasar-devi-munsiyari-khaliya-top",
    title: "Kasar Devi · Munsiyari · Khaliya Top",
    region: "Uttarakhand",
    duration: "3 nights / 4 days",
    route: "Delhi → Kasar Devi → Munsiyari → Khaliya Top → Delhi",
    blurb:
      "Boho cafes and cosmic-energy ridges, then a 5 km climb to camp at Khaliya Top with Panchachuli standing right in front of you.",
    highlight: ["camp at Khaliya Top", "Panchachuli"],
    advancePct: 35,
    balanceDue: "on arrival",
    photo: TRIP_PHOTOS[1],
    days: [
      {
        label: "Day 0",
        title: "Departure from Delhi",
        detail: "Evening departure and overnight drive towards Kasar Devi.",
      },
      {
        label: "Day 1",
        title: "Arrival at Kasar Devi",
        detail:
          "Visit Kainchi Dham. Explore Kasar Devi Temple, known for its cosmic energy, plus the village lanes and boho cafes. Sunset point in the evening.",
      },
      {
        label: "Day 2",
        title: "Kasar Devi to Munsiyari",
        detail:
          "Scenic drive via Bageshwar, Sama Village and the 126 m Birthi Waterfall. Evening arrival in Munsiyari.",
      },
      {
        label: "Day 3",
        title: "Trek to Khaliya Top & Zero Point",
        detail:
          "Trek from Balati Bend to Khaliya Top (5 km). Optional hike to Zero Point for views of Panchachuli, Nanda Kot and Rajrambha. Camp at Khaliya Top.",
      },
      {
        label: "Day 4",
        title: "Descent & return to Delhi",
        detail:
          "Trek down to Munsiyari after sunrise. Depart for Delhi by afternoon, arriving late night or early morning.",
      },
    ],
  },
  {
    slug: "manali-chandratal",
    title: "Manali & Chandratal",
    region: "Himachal Pradesh",
    duration: "3 days / 2 nights",
    route: "Delhi → Manali → Chandratal → Delhi",
    blurb:
      "Through the Atal Tunnel into Lahaul, up to a lake at 4,300 metres. Lakeside camping and the kind of stargazing you only get that high.",
    highlight: ["a lake at 4,300 metres", "stargazing"],
    advancePct: 35,
    balanceDue: "on the day of departure, before boarding",
    photo: TRIP_PHOTOS[2],
    days: [
      {
        label: "Night before",
        title: "Raat ki sawari",
        detail: "Overnight drive from Delhi to Kullu Valley.",
      },
      {
        label: "Day 1",
        title: "Arrival in Manali",
        detail:
          "Trek to Jogini Waterfall from Vashisht village. Visit Hadimba Temple. Evening at Old Manali and Mall Road.",
      },
      {
        label: "Day 2",
        title: "Lake, camps & high altitude",
        detail:
          "Drive through the Atal Tunnel into Lahaul and Spiti. Chandratal Lake at 4,300 m. High-altitude lakeside camping and stargazing.",
      },
      {
        label: "Day 3",
        title: "Back with mountain memories",
        detail:
          "Morning at the campsite, then Naggar Castle, Krishna Temple and the art galleries. Drive back to Delhi via Mandi.",
      },
    ],
  },
  {
    slug: "manali-to-zanskar",
    title: "A Himalayan Expedition: Manali to Zanskar",
    region: "Himachal & Ladakh",
    duration: "4 days / 3 nights",
    route:
      "Delhi → Manali → Gumbok Rangan → Zanskar → Phuktal → Jispa → Sissu → Delhi",
    blurb:
      "Over Shinkula Pass at 16,580 ft into Zanskar, and a trek to Phuktal Monastery — an entire monastery built into a cliff face.",
    highlight: ["16,580 ft", "built into a cliff face"],
    advancePct: 35,
    balanceDue: "on departure",
    photo: TRIP_PHOTOS[3],
    days: [
      {
        label: "Day 0",
        title: "Raat ki sawari from Dilli",
        detail: "Board the tempo traveller from Majnu Ka Tila at 9:00 PM.",
      },
      {
        label: "Day 1",
        title: "Manali local exploration",
        detail:
          "Old Manali, Vashisht Temple and hot springs, a short trek to Jogini Waterfall, evening stroll on Mall Road.",
      },
      {
        label: "Day 2",
        title: "Manali to Gumbok Rangan",
        detail:
          "Drive towards Shinkula Pass (16,580 ft), cross into Zanskar Valley and reach the Gumbok Rangan campsite for stargazing.",
      },
      {
        label: "Day 3",
        title: "Phuktal Monastery and Jispa",
        detail:
          "Trek to the hidden Phuktal Monastery built into a cliff. Return via Shinkula Pass towards Jispa for a riverside evening.",
      },
      {
        label: "Day 4",
        title: "Jispa to Manali to Delhi",
        detail:
          "Morning at Deepak Tal, then Sissu for its waterfall and lake. Continue to Manali and depart for Delhi.",
      },
      {
        label: "Day 5",
        title: "Arrival in Delhi",
        detail: "Reach Delhi early morning.",
      },
    ],
  },
  {
    slug: "untouched-himalayas-darma-darchula",
    title: "Into the Untouched Himalayas",
    region: "Uttarakhand",
    duration: "7 days / 6 nights",
    route:
      "Delhi → Kasar Devi → Munsiyari → Khaliya Top → Darma Valley → Darchula → Delhi",
    blurb:
      "The long one. Past Munsiyari and Khaliya Top, then deeper still into the remote Darma Valley and out to the border town of Darchula.",
    highlight: ["remote Darma Valley", "border town of Darchula"],
    advancePct: 35,
    balanceDue: "on arrival",
    photo: TRIP_PHOTOS[4],
    days: [
      {
        label: "Day 0",
        title: "Raat ki sawari from Dilli",
        detail: "Board the traveller at Akshardham Metro.",
      },
      {
        label: "Day 1",
        title: "Arrival at Kasar Devi",
        detail: "Visit Kasar Devi Temple and walk along the pine forests.",
      },
      {
        label: "Day 2",
        title: "Kasar Devi to Munsiyari",
        detail: "Scenic drive to Munsiyari. Witness the Panchachuli peaks.",
      },
      {
        label: "Day 3",
        title: "Munsiyari · Khaliya Top · Munsiyari",
        detail:
          "Trek or drive to Khaliya Top for alpine meadows and long vistas, then return to Munsiyari.",
      },
      {
        label: "Day 4",
        title: "Munsiyari to Darma Valley",
        detail: "Drive deeper into the Himalayas to the remote Darma Valley.",
      },
      {
        label: "Day 5",
        title: "Darma Valley to Darchula",
        detail:
          "Explore Darma Valley and meet the locals, then drive towards the border town of Darchula.",
      },
      {
        label: "Day 6",
        title: "Darchula to Delhi",
        detail:
          "Relaxed morning by the riverside. Evening departure for an overnight return journey.",
      },
      {
        label: "Day 7",
        title: "Arrival in Delhi",
        detail: "Arrive in the morning.",
      },
    ],
  },
  {
    slug: "naggar-parashar",
    title: "Naggar & Parashar",
    region: "Himachal Pradesh",
    duration: "4 days / 3 nights",
    route: "Delhi → Naggar → Parashar Lake → Delhi",
    blurb:
      "A Roerich art gallery, a castle, and sunset over Parashar Lake. Ends on an authentic Himachali thali at Jana Waterfall.",
    highlight: ["sunset over Parashar Lake", "Himachali thali"],
    advancePct: 35,
    balanceDue: "on the day of departure, before boarding",
    photo: TRIP_PHOTOS[5],
    days: [
      {
        label: "Day 0",
        title: "Delhi to Naggar",
        detail: "Evening pickup and overnight journey.",
      },
      {
        label: "Day 1",
        title: "Arrival in Naggar & local exploration",
        detail:
          "Check in at Naggar. Naggar Castle, the Nicholas Roerich Art Gallery, Tripura Sundari Temple and the German Bakery.",
      },
      {
        label: "Day 2",
        title: "Naggar to Parashar Lake",
        detail:
          "Drive to Parashar Lake and explore the ancient Parashar Rishi Temple. Sunset by the lake.",
      },
      {
        label: "Day 3",
        title: "Nashala Village & Jana Waterfall",
        detail:
          "Drive to Nashala Village for a taste of traditional life, then on to Jana Waterfall for an authentic Himachali thali before the return journey.",
      },
    ],
  },
  {
    slug: "sangla-chitkul-kalpa",
    title: "Sangla · Chitkul · Kalpa",
    region: "Kinnaur, Himachal",
    duration: "3 nights / 4 days",
    route: "Delhi → Sangla → Chitkul → Kalpa → Delhi",
    blurb:
      "Chitkul is the last inhabited village on the Indo-Tibetan border. Two days later you wake to sunrise over Kinner Kailash.",
    highlight: ["last inhabited village", "sunrise over Kinner Kailash"],
    advancePct: 35,
    balanceDue: "on arrival",
    photo: TRIP_PHOTOS[6],
    days: [
      {
        label: "Day 0",
        title: "Departure from Delhi",
        detail: "Overnight journey to Sangla.",
      },
      {
        label: "Day 1",
        title: "Welcome to Sangla",
        detail:
          "Arrive at a riverside stay. Visit Kamru Fort (Kamakhya Devi Temple) and Kamru Monastery. Evening bonfire.",
      },
      {
        label: "Day 2",
        title: "Rakchham & Chitkul",
        detail:
          "Stop at Rakshak Village, then Chitkul — the last inhabited village on the Indo-Tibetan border. Village lanes and riverside trails.",
      },
      {
        label: "Day 3",
        title: "Chitkul to Kalpa",
        detail:
          "Morning at Chitkul, then depart for Kalpa. Suicide Point (Roghi Cliff) and an authentic Himachali thali.",
      },
      {
        label: "Day 4",
        title: "Exploring Kalpa & departure",
        detail:
          "Sunrise over Kinner Kailash. Chandika Devi Temple and Hu-Bu-Lan-Kar Monastery, a stroll through apple orchards, then leave for Delhi in the afternoon.",
      },
      {
        label: "Day 5",
        title: "Arrival in Delhi",
        detail: "Morning arrival in Delhi.",
      },
    ],
  },
  {
    slug: "spiti-circuit",
    title: "Spiti Circuit",
    region: "Spiti, Himachal",
    duration: "6 nights / 7 days",
    route:
      "Delhi → Shimla → Kalpa → Tabo → Kaza → Nako → Chitkul → Shimla → Delhi",
    blurb:
      "The full loop. A UNESCO monastery at Tabo, the world's highest post office at Hikkim, and Komik, the highest motorable village anywhere.",
    highlight: ["world's highest post office", "highest motorable village"],
    advancePct: 35,
    balanceDue: "on arrival",
    photo: TRIP_PHOTOS[7],
    days: [
      {
        label: "Day 0",
        title: "Departure from Delhi",
        detail: "Leave Majnu Ka Tila at 9:30 PM.",
      },
      {
        label: "Day 1",
        title: "Shimla to Kalpa",
        detail: "A 10–11 hour drive via Narkanda and Rampur.",
      },
      {
        label: "Day 2",
        title: "Kalpa to Tabo",
        detail:
          "Kinnaur Caves, Moorang Fort and Khab Bridge at the confluence of the Sutlej and Spiti rivers.",
      },
      {
        label: "Day 3",
        title: "Tabo to Kaza",
        detail:
          "Tabo Monastery (a UNESCO site) and Dhankar Monastery, arriving in Kaza.",
      },
      {
        label: "Day 4",
        title: "Hikkim, Komik & Langza",
        detail:
          "The world's highest post office at Hikkim, the highest motorable village at Komik, and the Buddha statue at Langza.",
      },
      {
        label: "Day 5",
        title: "Kaza to Nako",
        detail: "Drive to Nako. Explore Nako Lake and its Tibetan culture.",
      },
      {
        label: "Day 6",
        title: "Nako to Chitkul",
        detail: "Drive through Karcham and the Sangla Valley to Chitkul.",
      },
      {
        label: "Day 7",
        title: "Chitkul to Shimla",
        detail:
          "A 10–11 hour drive to Shimla, then an overnight Volvo bus to Delhi.",
      },
    ],
  },
  {
    slug: "zanskar-padum-circuit",
    title: "Zanskar Padum Circuit",
    region: "Ladakh & Himachal",
    duration: "6 days / 5 nights",
    route: "Delhi → Manali → Zanskar (Padum) → Manali → Delhi",
    blurb:
      "Six days in Zanskar: riverside camps at Gumbok Ranjan, the Drang Drung Glacier from Pensi La, and cliffside Phuktal at the end.",
    highlight: ["Drang Drung Glacier", "cliffside Phuktal"],
    advancePct: 35,
    balanceDue: "on the day of departure",
    photo: TRIP_PHOTOS[8],
    days: [
      {
        label: "Night before",
        title: "Raat ki sawari",
        detail: "Pickup at Civil Lines Metro Station, then the overnight drive.",
      },
      {
        label: "Day 1",
        title: "Arrival in Naggar",
        detail:
          "Naggar Castle, ancient temples and local cafes. Evening art retreat.",
      },
      {
        label: "Day 2",
        title: "Into the heart of Zanskar",
        detail:
          "Cross Solang Valley, the Atal Tunnel and Shinku La Pass. Riverside camping at Gumbok Ranjan.",
      },
      {
        label: "Day 3",
        title: "Discover the soul of Zanskar",
        detail:
          "Drive to Padum. Visit the monasteries and explore Padum Market.",
      },
      {
        label: "Day 4",
        title: "Wonders of Zanskar",
        detail:
          "Sani Village and Monastery, then through Pensi La Pass for views of the Drang Drung Glacier.",
      },
      {
        label: "Day 5",
        title: "Into the hidden valleys",
        detail:
          "Drive to Lungnak Valley and Yougar Village, and visit the iconic cliffside Phuktal Monastery.",
      },
      {
        label: "Day 6",
        title: "Farewell to Zanskar",
        detail: "Return journey via Jispa and Sissu to Manali.",
      },
      {
        label: "Day 7",
        title: "Arrival in Delhi",
        detail: "Arrive in the city early morning.",
      },
    ],
  },
];

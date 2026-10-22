/**
 * Destinations, venues and map points.
 *
 * Coordinates come from OpenStreetMap (Nominatim) lookups made on 22 October 2026.
 * Venue status was checked against official websites or recent (2026) public reviews.
 * Opening hours are deliberately NOT published: sources disagree, so guests are asked to check.
 * Full provenance: CONTENT_VERIFICATION.md.
 */

export type MapCategory = "food" | "nature" | "villages";

export const mapCategories: { id: MapCategory; label: string }[] = [
  { id: "food", label: "Food & Coffee" },
  { id: "nature", label: "Beaches & Nature" },
  { id: "villages", label: "Villages & Day Trips" },
];

export type Venue = {
  id: string;
  name: string;
  area: "Scarborough" | "Kalk Bay";
  kind: string;
  description: string;
  website?: string;
  /** Free-text Google Maps search, so we never hard-code a street number we could not confirm. */
  mapsQuery: string;
  coords?: [number, number];
  status: string;
};

export type MapPoint = {
  id: string;
  name: string;
  category: MapCategory | "home";
  description: string;
  coords: [number, number];
  mapsQuery: string;
  approximate?: boolean;
};

export const directionsUrl = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

export const scarboroughVenues: Venue[] = [
  {
    id: "whole-earth",
    name: "Whole Earth Café",
    area: "Scarborough",
    kind: "Wholesome, plant-friendly café",
    description:
      "A relaxed village café with a garden under the trees. Known for hearty breakfasts and good vegetarian and vegan cooking, and easy-going with families and bigger tables.",
    website: "https://www.wholeearthcollection.com/",
    mapsQuery: "Whole Earth Cafe, Scarborough, Cape Town",
    coords: [-34.19604, 18.37426],
    status: "Official website active in 2026.",
  },
  {
    id: "village-hub",
    name: "The Village Hub",
    area: "Scarborough",
    kind: "Deli, coffee, bakery and restaurant under one roof",
    description:
      "The village's meeting place at 2 Watsonia Lane: Foragers Deli for provisions, a coffee station with bakes, the Foragers Courtyard for breakfast and lunch, and Sopra for dinner.",
    website: "https://www.thevillagehub.co.za/",
    mapsQuery: "The Village Hub, 2 Watsonia Lane, Scarborough, Cape Town",
    coords: [-34.1968, 18.37497],
    status: "Official website lists current tenants and hours.",
  },
  {
    id: "camel-rock",
    name: "Camel Rock",
    area: "Scarborough",
    kind: "Village restaurant, seafood and grills",
    description:
      "A long-standing, unhurried village restaurant on Main Road. Seafood, grills and pizzas, and guests often mention the Sunday fish braai.",
    mapsQuery: "Camel Rock Restaurant, Scarborough, Cape Town",
    coords: [-34.19706, 18.3752],
    status: "No official website found; recent guest reviews dated mid-2026.",
  },
];

export const kalkBayVenues: Venue[] = [
  {
    id: "olympia",
    name: "Olympia Café",
    area: "Kalk Bay",
    kind: "Café, deli and bakery",
    description:
      "A Kalk Bay institution since the late nineties: a small, busy room, a chalkboard of the day's dishes and pastries from its own bakery around the corner. Go early.",
    website: "https://olympiacafe.co.za/",
    mapsQuery: "Olympia Cafe, 134 Main Road, Kalk Bay",
    coords: [-34.12756, 18.44804],
    status: "Listed by several 2025–26 guides at 134 Main Road.",
  },
  {
    id: "harbour-house",
    name: "Harbour House",
    area: "Kalk Bay",
    kind: "Seafood restaurant on the harbour",
    description:
      "A seafood restaurant on Kalk Bay harbour, looking out over False Bay. The place for a long, unhurried lunch.",
    website: "https://www.harbourhouse.co.za/",
    mapsQuery: "Harbour House, Kalk Bay Harbour",
    coords: [-34.12962, 18.44938],
    status: "Official website lists current hours and 2026 menus.",
  },
  {
    id: "kalkys",
    name: "Kalky's",
    area: "Kalk Bay",
    kind: "Fish and chips on the harbour",
    description:
      "A family-run counter on the harbour since 1996. Queue, order hake or snoek and chips, and eat while the boats come in.",
    mapsQuery: "Kalky's, Kalk Bay Harbour",
    coords: [-34.12913, 18.4488],
    status: "No official website found; widely covered by Cape Town food guides.",
  },
  {
    id: "brass-bell",
    name: "The Brass Bell",
    area: "Kalk Bay",
    kind: "Seaside restaurant and bar",
    description:
      "On the water since 1939, beside the tidal pools. Seafood, sundowners and, some evenings, live music.",
    website: "https://www.brassbell.co.za/",
    mapsQuery: "The Brass Bell, Kalk Bay",
    coords: [-34.12609, 18.45063],
    status: "Official website active, with online booking.",
  },
  {
    id: "salt",
    name: "SALT",
    area: "Kalk Bay",
    kind: "Café and restaurant",
    description: "A relaxed spot on Main Road, next door to Olympia, open from breakfast through dinner.",
    mapsQuery: "SALT, 136 Main Road, Kalk Bay",
    status: "Listed at 136 Main Road; recent reviews from 2026. No official website found.",
  },
];

export const mapPoints: MapPoint[] = [
  {
    id: "home",
    name: "Orange Cliffs, in Scarborough",
    category: "home",
    description: "The house is in Scarborough village. The exact address is shared by your host after booking.",
    coords: [-34.1974, 18.3755],
    mapsQuery: "Scarborough, Cape Town",
    approximate: true,
  },
  {
    id: "scarborough-beach",
    name: "Scarborough Beach",
    category: "nature",
    description: "The long white beach below the village, on the Atlantic side of the peninsula.",
    coords: [-34.2013, 18.37234],
    mapsQuery: "Scarborough Beach, Cape Town",
  },
  {
    id: "misty-cliffs",
    name: "Misty Cliffs",
    category: "nature",
    description: "The neighbouring settlement just up the coast: rocks, surf and a quiet road along the sea.",
    coords: [-34.18462, 18.3644],
    mapsQuery: "Misty Cliffs, Cape Town",
  },
  {
    id: "cape-point",
    name: "Cape Point",
    category: "nature",
    description: "The lighthouse at the tip of the Cape Point Nature Reserve, high above the ocean.",
    coords: [-34.35694, 18.4969],
    mapsQuery: "Cape Point Lighthouse",
  },
  {
    id: "cape-of-good-hope",
    name: "Cape of Good Hope",
    category: "nature",
    description: "The famous headland in the same reserve, with coastal walks around it.",
    coords: [-34.35811, 18.47193],
    mapsQuery: "Cape of Good Hope",
  },
  {
    id: "boulders",
    name: "Boulders Beach",
    category: "nature",
    description: "Sheltered coves among granite boulders near Simon's Town, home to a colony of African penguins.",
    coords: [-34.19807, 18.45236],
    mapsQuery: "Boulders Beach, Simon's Town",
  },
  {
    id: "kalk-bay-harbour",
    name: "Kalk Bay Harbour",
    category: "villages",
    description: "A working fishing harbour on False Bay, full of colourful boats.",
    coords: [-34.12823, 18.44969],
    mapsQuery: "Kalk Bay Harbour",
  },
  {
    id: "simons-town",
    name: "Simon's Town",
    category: "villages",
    description: "A historic naval town on the False Bay side, with a long main street of old façades.",
    coords: [-34.19318, 18.43327],
    mapsQuery: "Simon's Town, Cape Town",
  },
  {
    id: "cape-town",
    name: "Cape Town city centre",
    category: "villages",
    description: "Museums, markets, restaurants and Table Mountain, for a day in the city.",
    coords: [-33.92538, 18.42367],
    mapsQuery: "Cape Town City Hall",
  },
  ...[...scarboroughVenues, ...kalkBayVenues]
    .filter((v): v is Venue & { coords: [number, number] } => Boolean(v.coords))
    .map((v) => ({
      id: v.id,
      name: v.name,
      category: "food" as const,
      description: `${v.kind}, ${v.area}.`,
      coords: v.coords,
      mapsQuery: v.mapsQuery,
    })),
];

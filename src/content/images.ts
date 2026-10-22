/**
 * The single source of truth for every photograph on the site.
 *
 * Two kinds of picture live here during the preview stage:
 *
 * - `location`: real, openly licensed photographs of the named place (Scarborough, Kalk Bay, Cape Point…),
 *   downloaded from Wikimedia Commons with their licence and credited on the page.
 * - `illustrative`: temporary stock photography (Unsplash License) that sets a mood for the house.
 *   It is NOT Orange Cliffs. Every one carries `isTemporary: true`, renders with a visible
 *   "Illustrative image" label, and has a `replacementKey` that maps to CONTENT_AND_ASSETS_NEEDED.md.
 *
 * When the owner's photo album arrives: drop the file into /public/images, point `src` at it,
 * set `kind: "property"`, `isTemporary: false`, remove `credit`, and update `alt`.
 */

export type ImageKind = "property" | "location" | "illustrative";

export type Credit = {
  creator: string;
  license: string;
  licenseUrl: string;
  source: string;
  via: string;
};

export type ImageRecord = {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** What the picture actually shows, used in captions. */
  subject: string;
  kind: ImageKind;
  isTemporary: boolean;
  /** Stable key that the owner's replacement photo should take over. */
  replacementKey?: string;
  credit?: Credit;
  /** CSS object-position, to keep the horizon or subject in frame at every crop. */
  focus?: string;
};

const commons = (creator: string, license: string, licenseUrl: string, source: string): Credit => ({
  creator,
  license,
  licenseUrl,
  source,
  via: "Wikimedia Commons",
});

const unsplash = (creator: string, source: string): Credit => ({
  creator,
  license: "Unsplash License",
  licenseUrl: "https://unsplash.com/license",
  source,
  via: "Unsplash",
});

const imageData = {
  /* ── Illustrative mood: stands in for the real view and rooms until the owner's album arrives ── */
  heroView: {
    src: "/images/mood-headlands-golden.jpg",
    width: 2400,
    height: 1600,
    alt: "Rocky headlands dropping into a calm sea in warm, low evening light",
    subject: "Coastal headlands at golden hour",
    kind: "illustrative",
    isTemporary: true,
    replacementKey: "home.hero.ocean-view",
    credit: unsplash("Artur Pokusin", "https://unsplash.com/photos/0nv-h04oPhM"),
    focus: "62% 50%",
  },
  seaMorning: {
    src: "/images/mood-sea-morning.jpg",
    width: 2400,
    height: 1600,
    alt: "A calm blue sea and distant hills seen across a rocky shore with driftwood, in clear morning light",
    subject: "A calm sea in morning light",
    kind: "illustrative",
    isTemporary: true,
    replacementKey: "view.morning",
    credit: unsplash("Paul Jarvis", "https://unsplash.com/photos/gkT4FfgHO5o"),
    focus: "50% 60%",
  },
  seaDay: {
    src: "/images/mood-headland-day.jpg",
    width: 2400,
    height: 1600,
    alt: "Green headlands dropping steeply into a deep blue bay under a pale afternoon sky",
    subject: "Headlands and a deep blue bay in the afternoon",
    kind: "illustrative",
    isTemporary: true,
    replacementKey: "view.afternoon",
    credit: unsplash("Paweł Wojciechowski", "https://unsplash.com/photos/QYAojSRu82c"),
  },
  seaDusk: {
    src: "/images/mood-sea-dusk.jpg",
    width: 2400,
    height: 1800,
    alt: "A dark, quiet sea fading into blue haze at dusk",
    subject: "The sea at dusk",
    kind: "illustrative",
    isTemporary: true,
    replacementKey: "view.night",
    credit: unsplash("Yuriy Khimanin", "https://unsplash.com/photos/o4H20aIIAt8"),
  },
  morningCoffee: {
    src: "/images/mood-morning-coffee-bed.jpg",
    width: 2400,
    height: 1600,
    alt: "A green mug on a bedside table beside rumpled white bedding in soft morning light",
    subject: "Coffee beside an unmade bed",
    kind: "illustrative",
    isTemporary: true,
    replacementKey: "house.bedroom.morning",
    credit: unsplash("David Mao", "https://unsplash.com/photos/m0l5J8Lqnzo"),
    focus: "70% 60%",
  },
  breakfastTable: {
    src: "/images/mood-breakfast-table.jpg",
    width: 2400,
    height: 1600,
    alt: "Enamel mugs and a teapot on a worn wooden table in warm light",
    subject: "Mugs on a wooden table",
    kind: "illustrative",
    isTemporary: true,
    replacementKey: "house.kitchen.table",
    credit: unsplash("André Freitas", "https://unsplash.com/photos/uu5PfAzu0s4"),
  },
  diningRoom: {
    src: "/images/mood-dining-table.jpg",
    width: 2400,
    height: 1603,
    alt: "A wooden dining table with white chairs beside tall windows",
    subject: "A dining table by the windows",
    kind: "illustrative",
    isTemporary: true,
    replacementKey: "house.dining",
    credit: unsplash("Breather", "https://unsplash.com/photos/DEdM9Vs6s8w"),
  },
  balconyTable: {
    src: "/images/mood-balcony-table.jpg",
    width: 2400,
    height: 1590,
    alt: "A small white table with a vase of green branches on a railed balcony",
    subject: "A quiet corner on a balcony",
    kind: "illustrative",
    isTemporary: true,
    replacementKey: "house.veranda.corner",
    credit: unsplash("Dominik Martin", "https://unsplash.com/photos/B6uUPYt7wz4"),
  },
  cooking: {
    src: "/images/mood-cooking.jpg",
    width: 2400,
    height: 1593,
    alt: "Red onions, herbs, parsnips and peppercorns on a wooden chopping board",
    subject: "Vegetables on a chopping board",
    kind: "illustrative",
    isTemporary: true,
    replacementKey: "house.kitchen.cooking",
    credit: unsplash("Webvilla", "https://unsplash.com/photos/hv1MrBzGGNY"),
  },
  dinnerTable: {
    src: "/images/mood-dinner-table.jpg",
    width: 2400,
    height: 1600,
    alt: "A dark wooden table seen from above with a cake, small bowls of nuts and a folded linen cloth",
    subject: "A table laid for dessert",
    kind: "illustrative",
    isTemporary: true,
    replacementKey: "house.outdoor-dining.evening",
    credit: unsplash("Annie Spratt", "https://unsplash.com/photos/R3LcfTvcGWY"),
  },
  cafeTable: {
    src: "/images/mood-cafe-table.jpg",
    width: 2400,
    height: 1600,
    alt: "A cup of coffee on a long wooden table inside a bright café",
    subject: "Coffee in a café",
    kind: "illustrative",
    isTemporary: true,
    replacementKey: "explore.cafe.mood",
    credit: unsplash("Luke Chesser", "https://unsplash.com/photos/KR2mdHJ5qMg"),
  },
  cappuccino: {
    src: "/images/mood-cappuccino.jpg",
    width: 2400,
    height: 1600,
    alt: "A cappuccino with latte art on a wooden counter beside a brass bell and paper receipts",
    subject: "A cappuccino on a café counter",
    kind: "illustrative",
    isTemporary: true,
    replacementKey: "explore.food.mood",
    credit: unsplash("Carli Jean", "https://unsplash.com/photos/UWRqlJcDCXA"),
  },

  /* ── Real photographs of named places (openly licensed, credited) ── */
  scarboroughAerial: {
    src: "/images/scarborough-aerial.jpg",
    width: 2400,
    height: 1800,
    alt: "Aerial view of a curving white beach and dunes at Witsands, with the coast running on towards Misty Cliffs and Scarborough below the mountains",
    subject: "Witsands, looking along the coast to Misty Cliffs and Scarborough",
    kind: "location",
    isTemporary: false,
    credit: commons("Simisa", "CC BY-SA 3.0", "https://creativecommons.org/licenses/by-sa/3.0", "https://commons.wikimedia.org/wiki/File:Greater_Cape_Town_12.02.2007_16-17-21.2007_16-17-23.JPG"),
    focus: "50% 55%",
  },
  scarboroughPanorama: {
    src: "/images/scarborough-panorama.jpg",
    width: 2400,
    height: 522,
    alt: "Wide panorama of Scarborough: houses scattered over green hillside above a long white beach and the Atlantic",
    subject: "Scarborough from above",
    kind: "location",
    isTemporary: false,
    credit: commons("SkyPixels", "CC BY-SA 4.0", "https://creativecommons.org/licenses/by-sa/4.0", "https://commons.wikimedia.org/wiki/File:Scarborough_Western_Cape_Coastline_and_City_View.jpg"),
  },
  scarboroughBeachSign: {
    src: "/images/scarborough-beach-sign.jpg",
    width: 2400,
    height: 1566,
    alt: "A green Scarborough Beach sign at the top of a sandy path through coastal bush, with the sea behind",
    subject: "The path down to Scarborough Beach",
    kind: "location",
    isTemporary: false,
    credit: commons("Ossewa", "CC BY 4.0", "https://creativecommons.org/licenses/by/4.0", "https://commons.wikimedia.org/wiki/File:Scarborough_Beach,_Cape_Town.jpg"),
  },
  scarboroughBeachPath: {
    src: "/images/scarborough-beach-path.jpg",
    width: 2400,
    height: 1081,
    alt: "A wooden-edged path through low green fynbos leading towards Scarborough Beach under a soft grey sky",
    subject: "Fynbos above Scarborough Beach",
    kind: "location",
    isTemporary: false,
    credit: commons("Bernard Dupont", "CC BY-SA 2.0", "https://creativecommons.org/licenses/by-sa/2.0", "https://commons.wikimedia.org/wiki/File:Scarborough_Beach_..._(Photo_JC_PLE)_(52670629003).jpg"),
  },
  scarboroughVillage: {
    src: "/images/scarborough-village.jpg",
    width: 2400,
    height: 1800,
    alt: "Houses of Scarborough village among trees at the foot of a fynbos-covered mountain",
    subject: "Scarborough village",
    kind: "location",
    isTemporary: false,
    credit: commons("Fritz Joubert", "CC BY-SA 4.0", "https://creativecommons.org/licenses/by-sa/4.0", "https://commons.wikimedia.org/wiki/File:Scarborough,_South_Africa.jpeg"),
    focus: "50% 40%",
  },
  kalkBayBoats: {
    src: "/images/kalk-bay-boats.jpg",
    width: 2400,
    height: 1800,
    alt: "Small red, white and blue fishing boats moored in Kalk Bay harbour beneath the mountain",
    subject: "Fishing boats in Kalk Bay harbour",
    kind: "location",
    isTemporary: false,
    credit: commons("Octagon", "Public domain", "https://creativecommons.org/publicdomain/mark/1.0/", "https://commons.wikimedia.org/wiki/File:Kalk_Bay_4.JPG"),
  },
  kalkBayQuay: {
    src: "/images/kalk-bay-harbour-quay.jpg",
    width: 2400,
    height: 1800,
    alt: "Colourful fishing boats tied up along the quay in Kalk Bay harbour",
    subject: "The quay at Kalk Bay harbour",
    kind: "location",
    isTemporary: false,
    credit: commons("Octagon", "Public domain", "https://creativecommons.org/publicdomain/mark/1.0/", "https://commons.wikimedia.org/wiki/File:Kalk_Bay_2.JPG"),
  },
  kalkBayFishingBoat: {
    src: "/images/kalk-bay-fishing-boats.jpg",
    width: 2400,
    height: 1800,
    alt: "A green and white fishing boat on clear turquoise water in Kalk Bay harbour",
    subject: "A fishing boat in Kalk Bay harbour",
    kind: "location",
    isTemporary: false,
    credit: commons("Nkansahrexford", "CC BY-SA 3.0", "https://creativecommons.org/licenses/by-sa/3.0", "https://commons.wikimedia.org/wiki/File:Kalk_bay_fishing_boats_dock.jpg"),
  },
  kalkBaySeafront: {
    src: "/images/kalk-bay-seafront.jpg",
    width: 2400,
    height: 1459,
    alt: "Waves breaking over dark rocks at Kalk Bay in the evening, with the mountains across False Bay",
    subject: "Evening at Kalk Bay, looking across False Bay",
    kind: "location",
    isTemporary: false,
    credit: commons("Nina R", "CC BY 2.0", "https://creativecommons.org/licenses/by/2.0", "https://commons.wikimedia.org/wiki/File:Kalk_Bay_Harbour,_South_Africa_(52139025253).jpg"),
  },
  kalkBayMainRoad: {
    src: "/images/kalk-bay-main-road.jpg",
    width: 2400,
    height: 1639,
    alt: "An old two-storey house with a wooden veranda, set among aloes and coastal bush on Main Road in Kalk Bay",
    subject: "Schoonzicht, an old house on Kalk Bay's Main Road",
    kind: "location",
    isTemporary: false,
    credit: commons("Lennon Fletcher", "CC BY-SA 3.0", "https://creativecommons.org/licenses/by-sa/3.0", "https://commons.wikimedia.org/wiki/File:Schoonzicht_204_Main_Road_Kalk_Bay_Cape_Town.jpg"),
  },
  chapmansPeak: {
    src: "/images/chapmans-peak.jpg",
    width: 2400,
    height: 1600,
    alt: "Chapman's Peak Drive curving along orange sandstone cliffs high above the Atlantic in late light",
    subject: "Chapman's Peak Drive",
    kind: "location",
    isTemporary: false,
    credit: commons("kallerna", "CC BY-SA 4.0", "https://creativecommons.org/licenses/by-sa/4.0", "https://commons.wikimedia.org/wiki/File:Chapmans_Peak_Drive_3.jpg"),
  },
  capePointDias: {
    src: "/images/cape-point-dias-beach.jpg",
    width: 2400,
    height: 1600,
    alt: "Dias Beach far below the cliffs of Cape Point, with turquoise water and the open ocean beyond",
    subject: "Dias Beach, Cape Point",
    kind: "location",
    isTemporary: false,
    credit: commons("Diego Delso", "CC BY-SA 4.0", "https://creativecommons.org/licenses/by-sa/4.0", "https://commons.wikimedia.org/wiki/File:Playa_Dias,_Cape_Point,_Sud%C3%A1frica,_2018-07-23,_DD_103.jpg"),
  },
  capePointLighthouse: {
    src: "/images/cape-point-lighthouse.jpg",
    width: 2400,
    height: 1600,
    alt: "The old white lighthouse on the summit at Cape Point under a deep blue sky, with walkers on the path below",
    subject: "The old lighthouse at Cape Point",
    kind: "location",
    isTemporary: false,
    credit: commons("Diego Delso", "CC BY-SA 4.0", "https://creativecommons.org/licenses/by-sa/4.0/", "https://commons.wikimedia.org/w/index.php?curid=72561768"),
  },
  boulders: {
    src: "/images/boulders-beach.jpg",
    width: 2400,
    height: 1602,
    alt: "Granite boulders and clear sheltered water at Boulders Beach near Simon's Town",
    subject: "Boulders Beach, Simon's Town",
    kind: "location",
    isTemporary: false,
    credit: commons("Diego Delso", "CC BY-SA 4.0", "https://creativecommons.org/licenses/by-sa/4.0", "https://commons.wikimedia.org/wiki/File:Playa_de_Boulders,_Simon%27s_Town,_Sud%C3%A1frica,_2018-07-23,_DD_47.jpg"),
  },
  penguins: {
    src: "/images/boulders-penguins.jpg",
    width: 2400,
    height: 1600,
    alt: "African penguins walking on the sand at Boulders Beach, with boulders and surf behind",
    subject: "African penguins at Boulders Beach",
    kind: "location",
    isTemporary: false,
    credit: commons("Liridon", "CC BY-SA 4.0", "https://creativecommons.org/licenses/by-sa/4.0", "https://commons.wikimedia.org/wiki/File:Penguins_at_Boulders_Beach,_Cape_Town_(18).jpg"),
  },
  fynbos: {
    src: "/images/fynbos-erica.jpg",
    width: 2400,
    height: 1600,
    alt: "Pink Erica heath flowering among green fynbos on the road to Cape Point",
    subject: "Erica in flower on the road to Cape Point",
    kind: "location",
    isTemporary: false,
    credit: commons("Andrew Massyn", "CC BY-SA 3.0", "https://creativecommons.org/licenses/by-sa/3.0/", "https://commons.wikimedia.org/w/index.php?curid=31959298"),
  },
  tableMountain: {
    src: "/images/table-mountain.jpg",
    width: 2400,
    height: 781,
    alt: "Panorama from the top of Table Mountain: sandstone plateau in front, the peninsula's mountains running south to the sea",
    subject: "On top of Table Mountain, looking down the peninsula",
    kind: "location",
    isTemporary: false,
    credit: commons("Dietmar Rabich", "CC BY-SA 4.0", "https://creativecommons.org/licenses/by-sa/4.0", "https://commons.wikimedia.org/wiki/File:Cape_Town_(ZA),_Table_Mountain_--_2024_--_2794%2B96%2B98%2B2800%2B01.jpg"),
  },
  simonsTown: {
    src: "/images/simons-town-harbour.jpg",
    width: 2400,
    height: 1600,
    alt: "Sailing boats moored in Simon's Town harbour below green mountains",
    subject: "Simon's Town harbour",
    kind: "location",
    isTemporary: false,
    credit: commons("Greg Zaal and Rico Cilliers", "CC0", "https://creativecommons.org/publicdomain/zero/1.0/", "https://commons.wikimedia.org/wiki/File:Backplate_%E2%80%93_Simon%27s_Town_Harbour_IMG_0164_(Greg_Zaal_and_Rico_Cilliers_via_Poly_Haven).jpg"),
  },
} satisfies Record<string, ImageRecord>;

export type ImageKey = keyof typeof imageData;
export const images: Record<ImageKey, ImageRecord> = imageData;

/**
 * Property features that are verified on the listing but have no honest picture yet.
 * These render as deliberate "photograph to come" panels, never as stock that could pass for the real thing.
 */
export const pendingPhotos = {
  pool: { label: "The pool and sun loungers", replacementKey: "house.pool" },
  pizzaOven: { label: "The pizza oven", replacementKey: "house.pizza-oven" },
  braai: { label: "The porch with its built-in braai and fire pit", replacementKey: "house.porch.braai" },
  fireplace: { label: "A lounge with its fireplace", replacementKey: "house.lounge.fireplace" },
  cottage: { label: "The garden cottage", replacementKey: "house.cottage" },
  exterior: { label: "The house from outside", replacementKey: "house.exterior" },
} as const;

export type PendingKey = keyof typeof pendingPhotos;

export const allCredits = () =>
  Object.values(images)
    .filter((i) => i.credit)
    .map((i) => ({ subject: i.subject, kind: i.kind, ...i.credit! }));

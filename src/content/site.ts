/**
 * Site-wide constants and verified property facts.
 *
 * Provenance: every fact in `listing` was read from the live Airbnb listing
 * (https://www.airbnb.com/rooms/1490676984882768742) on 22 October 2026.
 * See CONTENT_VERIFICATION.md. Re-check before launch and whenever the listing changes.
 */

export const BOOKING_URL = "https://www.airbnb.nl/rooms/1490676984882768742";
export const REVIEWS_URL = `${BOOKING_URL}#reviews`;
export const INSTAGRAM_URL = "https://www.instagram.com/orangecliffs/";

export const brand = {
  name: "Orange Cliffs",
  place: "Scarborough",
  country: "South Africa",
  /** Production domain is not known yet. Canonical URLs are only emitted once this is set. */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "",
};

export const nav = [
  { href: "/the-house", label: "The house" },
  { href: "/explore", label: "Explore" },
  { href: "/gallery", label: "Gallery" },
  { href: "/reviews", label: "Reviews" },
] as const;

export type Verified<T> = {
  value: T;
  verified: boolean;
  source: string;
  checked?: string;
};

const AIRBNB = "Airbnb listing";
const CHECKED = "2026-10-22";

const v = <T,>(value: T): Verified<T> => ({ value, verified: true, source: AIRBNB, checked: CHECKED });

export const listing = {
  guests: v(8),
  bedrooms: v(4),
  beds: v(5),
  bathrooms: v(3),
  checkIn: v("after 15:00"),
  checkOut: v("before 10:00"),
  quietHours: v("from 22:00"),
  rating: v(4.92),
  reviewCount: v(13),
  wifi: v("Fast wifi, 107 Mbps (speed-tested by Airbnb)"),
  superhost: v(true),
} as const;

export const ratingCheckedLabel = "22 October 2026";

/** Room-by-room layout, as described on the listing. */
export const rooms = [
  {
    name: "The master suite",
    floor: "Upstairs",
    beds: "King-size bed",
    detail: "Its own generous bathroom with a walk-in shower, a freestanding bath and a single vanity.",
  },
  {
    name: "Second bedroom",
    floor: "Downstairs",
    beds: "King-size bed",
    detail: "Shares the downstairs bathroom with its shower and double vanity.",
  },
  {
    name: "Third bedroom",
    floor: "Downstairs",
    beds: "Two single beds",
    detail: "A good room for children or friends. Shares the downstairs bathroom.",
  },
  {
    name: "The garden cottage",
    floor: "Separate, self-contained",
    beds: "Queen-size bed",
    detail: "A kitchenette and its own en-suite bathroom, for guests who like a little independence.",
  },
] as const;

/** Spaces, as described on the listing. Each one is verified. */
export const spaces = {
  upstairs:
    "The open-plan kitchen and dining area look out over the nature reserve and the ocean, and run into a lounge with an indoor fireplace.",
  downstairs:
    "A second lounge with its own fireplace opens onto a wide porch: a large dining table, a built-in braai, a fire pit, the pool and sun loungers.",
  back: "Behind the house, a second outdoor dining area gathers around a wood-fired pizza oven.",
  cottage:
    "A self-contained garden cottage with a queen-size bed, a kitchenette and its own bathroom.",
};

/** Amenities confirmed as available on the listing, grouped for display. */
export const amenities: { group: string; items: string[] }[] = [
  {
    group: "Views",
    items: ["Ocean and bay view", "Mountain view", "Garden view", "Pool view"],
  },
  {
    group: "Outside",
    items: [
      "Pool with sun loungers",
      "Built-in braai and barbecue utensils",
      "Wood-fired pizza oven",
      "Fire pit",
      "Two outdoor dining areas",
      "Outdoor shower",
      "Beach access nearby",
    ],
  },
  {
    group: "Kitchen",
    items: [
      "Full kitchen with induction stove and oven",
      "Dishwasher",
      "Nespresso and French press",
      "Blender, toaster, kettle",
      "Dining table and wine glasses",
    ],
  },
  {
    group: "Comfort",
    items: [
      "Two indoor fireplaces, with fireplace guards",
      "Books and reading material",
      "TV",
      "Room-darkening shades",
      "Washer and dryer",
      "Bathtub",
    ],
  },
  {
    group: "Practical",
    items: [
      "Fast wifi, 107 Mbps",
      "Dedicated workspace",
      "Free parking on the premises",
      "Private entrance",
      "Travel cot and high chair on request (paid)",
      "Luggage drop-off allowed",
    ],
  },
];

/** Things the listing marks as NOT available. Shown honestly in the practical FAQ. */
export const notIncluded = ["Air conditioning", "Heating", "Smoke alarm", "Carbon monoxide alarm"];

export const houseRules = [
  "Up to 8 overnight guests",
  "Check-in after 15:00, checkout before 10:00",
  "Quiet hours from 22:00",
  "Please use lighting sparingly",
  "No parties or events",
  "No pets",
  "No smoking",
];

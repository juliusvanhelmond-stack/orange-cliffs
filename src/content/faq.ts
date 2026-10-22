/**
 * Practical questions. Every answer is drawn from the live Airbnb listing (checked 22 October 2026)
 * or states plainly that Airbnb is where the detail lives. Nothing here is guessed.
 */
export type Faq = { q: string; a: string[]; list?: string[] };

export const bookingFaq: Faq[] = [
  {
    q: "How do I book, and where do I see prices and availability?",
    a: [
      "All reservations go through our Airbnb listing. That is where you will find live availability, the nightly price for your dates, the cancellation policy and secure payment.",
      "We don't take bookings or payments on this website.",
    ],
  },
  {
    q: "How many people can stay?",
    a: [
      "Up to 8 overnight guests, across 4 bedrooms and 5 beds: a king-size master suite upstairs, a second king and a twin room downstairs, and a queen bed in the self-contained garden cottage. There are 3 bathrooms.",
    ],
  },
  {
    q: "What time are check-in and checkout?",
    a: [
      "Check-in is after 15:00 and checkout is before 10:00. We often have guests leaving and arriving on the same day.",
      "Early check-in or late checkout can sometimes be arranged; if not, we will try to offer an early bag drop or late luggage storage. This is confirmed the day before your arrival or departure.",
    ],
  },
  {
    q: "What are the house rules?",
    a: [
      "Scarborough is a quiet, nature-minded village, and we ask guests to help keep it that way.",
    ],
    list: [
      "Quiet hours from 22:00",
      "Please use lighting sparingly",
      "No parties or events",
      "No pets",
      "No smoking",
    ],
  },
  {
    q: "Is it suitable for children?",
    a: [
      "The house is set up for families: a travel cot and a high chair are available on request for a fee, and the fireplaces have guards.",
      "Please note that the pool has no gate or lock, and the house has stairs, so young children need to be supervised.",
    ],
  },
  {
    q: "Is there wifi, and can I work from the house?",
    a: [
      "Yes. The wifi was speed-tested by Airbnb at 107 Mbps, and there is a dedicated workspace.",
    ],
  },
  {
    q: "Is there parking?",
    a: ["Yes, free parking on the property, and free parking on the street."],
  },
  {
    q: "Is there air conditioning or heating?",
    a: [
      "No. The house has no air conditioning or central heating. For cool evenings there are two indoor fireplaces, one in each lounge.",
    ],
  },
  {
    q: "Anything else I should know about safety?",
    a: [
      "Airbnb's listing notes that the property does not currently have a smoke alarm or a carbon monoxide alarm. There is a fire extinguisher and a first-aid kit, and the pool is not fenced or gated.",
    ],
  },
];

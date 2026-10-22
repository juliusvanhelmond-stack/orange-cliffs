import type { Metadata } from "next";
import Link from "next/link";
import { Photo } from "@/components/Photo";
import { PlaceStrip } from "@/components/PlaceStrip";
import { BOOKING_URL, listing, ratingCheckedLabel, REVIEWS_URL } from "@/content/site";

export const metadata: Metadata = {
  title: "Guest reviews",
  description:
    "Orange Cliffs is rated 4.92 out of 5 across 13 guest reviews on Airbnb. Read every review, in full, on the Airbnb listing.",
};

/** Category scores as shown on the Airbnb listing on 22 October 2026. */
const categories = [
  { label: "Check-in", score: 5.0 },
  { label: "Accuracy", score: 4.92 },
  { label: "Communication", score: 4.92 },
  { label: "Cleanliness", score: 4.85 },
  { label: "Value", score: 4.77 },
  { label: "Location", score: 4.62 },
];

export default function ReviewsPage() {
  return (
    <>
      <header className="wrap page-head reviews-head">
        <div>
          <h1 className="t-hero" data-rise>
            In our guests&apos; words.
          </h1>
          <p className="t-lead" data-rise style={{ "--i": 1 } as React.CSSProperties}>
            Every review of Orange Cliffs lives on Airbnb, written by guests who actually stayed. We would rather send
            you there than pick favourites here.
          </p>
          <a
            className="btn btn-primary"
            href={REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-rise
            style={{ "--i": 2, marginTop: 32 } as React.CSSProperties}
          >
            Read all {listing.reviewCount.value} reviews on Airbnb <span className="arrow" aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="reviews-score field-burgundy on-dark" data-rise style={{ "--i": 3 } as React.CSSProperties}>
          <p className="reviews-big">{listing.rating.value.toFixed(2)}</p>
          <p>
            out of 5 overall, from {listing.reviewCount.value} reviews. Hosted by a Superhost.
          </p>
          <dl className="reviews-cats">
            {categories.map((c) => (
              <div key={c.label}>
                <dt>{c.label}</dt>
                <dd>{c.score.toFixed(c.score === 5 ? 1 : 2)}</dd>
              </div>
            ))}
          </dl>
          <p className="t-small reviews-note">As shown on the Airbnb listing on {ratingCheckedLabel}. Scores change as new guests review.</p>
        </div>
      </header>

      <section className="section-tight" aria-labelledby="why-title">
        <div className="wrap reviews-why">
          <Photo image="breakfastTable" sizes="(max-width: 900px) 100vw, 40vw" className="ratio-4-5" />
          <div className="stack">
            <h2 id="why-title" className="t-1">
              Why there are no quotes here
            </h2>
            <p>
              Reviews belong to the people who wrote them, and they read best in full, next to the dates and the stays
              they describe. So we don&apos;t copy them onto this site, edit them or choose the flattering ones.
            </p>
            <p>
              On Airbnb you can read each one in full and see when it was written. If you have stayed with
              us, that is also the best place to tell the next guests how it was.
            </p>
            <p>
              <Link href="/book" className="link link-accent">
                Ready to book? <span className="arrow" aria-hidden="true">→</span>
              </Link>
            </p>
          </div>
        </div>
      </section>

      <PlaceStrip
        title="The beach, the harbour, the quiet."
        text="Scarborough Beach below the village, Kalk Bay across the peninsula, and the long, unhurried days in between."
        images={["scarboroughBeachSign", "kalkBayFishingBoat", "fynbos"]}
      />

      <section className="section field-green on-dark" aria-labelledby="rev-cta">
        <div className="wrap cta-band">
          <div>
            <h2 id="rev-cta" className="t-1">
              Come and write your own.
            </h2>
            <p>Dates, prices and reservations are on Airbnb.</p>
          </div>
          <a className="btn btn-paper" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
            Book your stay <span className="arrow" aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </>
  );
}

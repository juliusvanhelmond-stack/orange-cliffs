import type { Metadata } from "next";
import Link from "next/link";
import { FaqList } from "@/components/FaqList";
import { Photo } from "@/components/Photo";
import { PlaceStrip } from "@/components/PlaceStrip";
import { bookingFaq } from "@/content/faq";
import { BOOKING_URL, listing } from "@/content/site";

export const metadata: Metadata = {
  title: "Book your stay",
  description:
    "Book Orange Cliffs, a holiday home for up to 8 guests in Scarborough, South Africa. Availability, prices and reservations are handled securely on Airbnb.",
};

export default function BookPage() {
  return (
    <>
      <header className="book-head">
        <div className="wrap book-head-text">
          <h1 className="t-hero" data-rise>
            Come stay a while.
          </h1>
          <p className="t-lead" data-rise style={{ "--i": 1 } as React.CSSProperties}>
            Your next slow morning starts here. Dates, prices and reservations are all handled securely on Airbnb.
          </p>
          <div className="book-actions" data-rise style={{ "--i": 2 } as React.CSSProperties}>
            <a className="btn btn-primary book-main" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              Check dates and book on Airbnb <span className="arrow" aria-hidden="true">↗</span>
            </a>
            <p className="t-small t-muted">Opens the official Orange Cliffs listing in a new tab.</p>
          </div>
        </div>
        <div className="book-head-photo" data-rise style={{ "--i": 3 } as React.CSSProperties}>
          <Photo image="seaMorning" sizes="(max-width: 900px) 100vw, 45vw" priority className="book-photo" />
        </div>
      </header>

      <section className="section field-sand" aria-labelledby="how-title">
        <div className="wrap book-how">
          <h2 id="how-title" className="t-1" data-reveal>
            How booking works
          </h2>
          <ul className="book-steps">
            <li data-reveal>
              <h3 className="t-2">Choose your dates</h3>
              <p>The Airbnb calendar is always the live one. You see the exact price for your stay before you commit.</p>
            </li>
            <li data-reveal style={{ "--i": 1 } as React.CSSProperties}>
              <h3 className="t-2">Book on Airbnb</h3>
              <p>Payment, the cancellation policy and your confirmation all run through Airbnb. We never ask you to pay anywhere else.</p>
            </li>
            <li data-reveal style={{ "--i": 2 } as React.CSSProperties}>
              <h3 className="t-2">Arrive and unwind</h3>
              <p>Check in after {listing.checkIn.value.replace("after ", "")}. Your host greets you and shows you around, then the house is yours.</p>
            </li>
          </ul>
        </div>
      </section>

      <PlaceStrip
        title="While you're here."
        text="The lighthouse at Cape Point, the granite coves of Boulders Beach and evenings by the water in Kalk Bay, all within a day's reach."
        images={["capePointLighthouse", "boulders", "kalkBaySeafront"]}
      />

      <section className="section" aria-labelledby="faq-title">
        <div className="wrap book-faq">
          <div>
            <h2 id="faq-title" className="t-1" data-reveal>
              Before you book
            </h2>
            <p className="t-muted book-faq-note" data-reveal>
              Answers come from our Airbnb listing. Anything else, ask us through Airbnb before you book. Or{" "}
              <Link href="/the-house" className="link link-accent">
                see the house
              </Link>
              .
            </p>
          </div>
          <FaqList items={bookingFaq} />
        </div>
      </section>

      <section className="section field-green on-dark" aria-labelledby="book-cta">
        <div className="wrap cta-band">
          <div>
            <h2 id="book-cta" className="t-1">
              Make yourself at home.
            </h2>
            <p>Up to {listing.guests.value} guests · {listing.bedrooms.value} bedrooms · {listing.bathrooms.value} bathrooms · Scarborough, South Africa</p>
          </div>
          <a className="btn btn-paper" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
            Book your stay <span className="arrow" aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </>
  );
}

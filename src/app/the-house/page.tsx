import type { Metadata } from "next";
import Link from "next/link";
import { FaqList } from "@/components/FaqList";
import { Gallery } from "@/components/Gallery";
import { Photo, PendingPhoto } from "@/components/Photo";
import { bookingFaq } from "@/content/faq";
import { galleryItems } from "@/content/gallery";
import { amenities, BOOKING_URL, listing, rooms, spaces } from "@/content/site";
import "@/styles/house.css";

export const metadata: Metadata = {
  title: "The house",
  description:
    "A family holiday home in Scarborough, South Africa, for up to 8 guests: 4 bedrooms, 3 bathrooms, a pool, a braai, a wood-fired pizza oven, two fireplaces and a separate garden cottage.",
};

const houseItems = galleryItems.filter((i) => ["inside", "outside", "views"].includes(i.category));

export default function HousePage() {
  return (
    <>
      <header className="wrap page-head house-head">
        <div className="house-head-text">
          <h1 className="t-hero" data-rise>
            Make yourself at home.
          </h1>
          <p className="t-lead" data-rise style={{ "--i": 1 } as React.CSSProperties}>
            A light-filled coastal home with room to gather and room to drift apart, and a cottage of its own in the
            garden.
          </p>
          <dl className="facts-row" data-rise style={{ "--i": 2 } as React.CSSProperties}>
            <div>
              <dt>Guests</dt>
              <dd>{listing.guests.value}</dd>
            </div>
            <div>
              <dt>Bedrooms</dt>
              <dd>{listing.bedrooms.value}</dd>
            </div>
            <div>
              <dt>Beds</dt>
              <dd>{listing.beds.value}</dd>
            </div>
            <div>
              <dt>Bathrooms</dt>
              <dd>{listing.bathrooms.value}</dd>
            </div>
          </dl>
          <p className="t-small t-muted facts-note">Figures include the garden cottage. Source: the Airbnb listing.</p>
        </div>
        <div className="house-head-photo" data-rise style={{ "--i": 3 } as React.CSSProperties}>
          <Photo image="breakfastTable" sizes="(max-width: 900px) 100vw, 42vw" priority className="ratio-4-5" />
        </div>
      </header>

      {/* Slow mornings */}
      <section className="section-tight chapter chapter-morning" aria-labelledby="ch-morning">
        <div className="wrap chapter-grid">
          <div className="chapter-photo" data-reveal="photo">
            <Photo image="morningCoffee" sizes="(max-width: 900px) 100vw, 58vw" className="ratio-3-2" />
          </div>
          <div className="chapter-text">
            <h2 id="ch-morning" className="t-1" data-reveal>
              Slow mornings
            </h2>
            <p data-reveal style={{ "--i": 1 } as React.CSSProperties}>
              {spaces.upstairs} Coffee is easy: there is a Nespresso machine and a French press, and plenty of time.
            </p>
            <p data-reveal style={{ "--i": 2 } as React.CSSProperties}>
              The master suite is upstairs too, with a king-size bed and its own generous bathroom: a walk-in shower and
              a freestanding bath.
            </p>
          </div>
        </div>
      </section>

      {/* Afternoons outside */}
      <section className="section chapter-outside field-green on-dark" aria-labelledby="ch-outside">
        <div className="wrap">
          <h2 id="ch-outside" className="t-1" data-reveal>
            Afternoons outside
          </h2>
          <div className="outside-grid">
            <PendingPhoto which="pool" tone="green" className="outside-big" />
            <div className="outside-text" data-reveal>
              <p>{spaces.downstairs}</p>
              <p>Back from the beach, rinse off under the outdoor shower. Then the only decision is sun or shade.</p>
            </div>
            <PendingPhoto which="braai" tone="green" className="outside-small" />
          </div>
        </div>
      </section>

      {/* Long dinners */}
      <section className="section chapter-dinner" aria-labelledby="ch-dinner">
        <div className="wrap dinner-grid">
          <h2 id="ch-dinner" className="t-1 dinner-title" data-reveal>
            Long dinners
          </h2>
          <p className="dinner-text" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
            Cook together in the full kitchen, with an induction hob, an oven and a dishwasher for afterwards. Eat at the
            big table on the porch beside the braai, or carry it all round the back: {spaces.back.toLowerCase()}
          </p>
          <div className="dinner-a" data-reveal="photo">
            <Photo image="cooking" sizes="(max-width: 900px) 100vw, 40vw" className="ratio-4-5" label="Illustrative image" />
          </div>
          <div className="dinner-b" data-reveal="photo">
            <PendingPhoto which="pizzaOven" className="ratio-1" />
          </div>
          <div className="dinner-c" data-reveal="photo">
            <Photo image="dinnerTable" sizes="(max-width: 900px) 100vw, 30vw" className="ratio-3-2" label="Illustrative image" />
          </div>
        </div>
      </section>

      {/* Space to yourself */}
      <section className="section field-sand chapter-rooms" aria-labelledby="ch-rooms">
        <div className="wrap rooms-grid">
          <div className="rooms-intro">
            <h2 id="ch-rooms" className="t-1" data-reveal>
              Space to yourself
            </h2>
            <p data-reveal style={{ "--i": 1 } as React.CSSProperties}>
              Two lounges, each with its own fireplace, mean the night owls and the early sleepers never have to
              negotiate. And for anyone who wants a little more independence, there is the cottage.
            </p>
            <PendingPhoto which="cottage" className="ratio-4-5 rooms-cottage" />
          </div>
          <ul className="room-list">
            {rooms.map((r, i) => (
              <li key={r.name} data-reveal style={{ "--i": i } as React.CSSProperties}>
                <h3 className="t-2">{r.name}</h3>
                <p className="room-floor t-small">{r.floor}</p>
                <p className="room-beds">{r.beds}</p>
                <p>{r.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Amenities */}
      <section className="section amenities" aria-labelledby="amenities-title">
        <div className="wrap">
          <h2 id="amenities-title" className="t-1" data-reveal>
            What&apos;s here
          </h2>
          <p className="amen-intro" data-reveal>
            Everything below is confirmed on the Airbnb listing. The full list of 68 amenities is there too.
          </p>
          <div className="amen-cols">
            {amenities.map((g, i) => (
              <div key={g.group} data-reveal style={{ "--i": i } as React.CSSProperties}>
                <h3 className="t-2">{g.group}</h3>
                <ul>
                  {g.items.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photographs */}
      <section className="section-tight house-gallery" aria-labelledby="house-photos">
        <div className="wrap">
          <h2 id="house-photos" className="t-1" data-reveal>
            Around the house
          </h2>
          <p className="amen-intro" data-reveal>
            For now these are illustrative mood photographs; the house&apos;s own album will replace them. See the{" "}
            <Link href="/gallery" className="link link-accent">
              full gallery
            </Link>
            .
          </p>
          <Gallery items={houseItems} categories={["views", "inside", "outside"]} label="house photographs" />
        </div>
      </section>

      {/* Practical */}
      <section className="section practical" aria-labelledby="practical-title">
        <div className="wrap practical-grid">
          <div>
            <h2 id="practical-title" className="t-1" data-reveal>
              Good to know
            </h2>
            <dl className="practical-list" data-reveal>
              <div>
                <dt>Check-in</dt>
                <dd>{listing.checkIn.value}</dd>
              </div>
              <div>
                <dt>Checkout</dt>
                <dd>{listing.checkOut.value}</dd>
              </div>
              <div>
                <dt>Quiet hours</dt>
                <dd>{listing.quietHours.value}</dd>
              </div>
              <div>
                <dt>Parking</dt>
                <dd>Free, on the property</dd>
              </div>
              <div>
                <dt>Wifi</dt>
                <dd>107 Mbps</dd>
              </div>
            </dl>
          </div>
          <FaqList items={bookingFaq.slice(2)} />
        </div>
      </section>

      <section className="section field-green on-dark" aria-labelledby="house-cta">
        <div className="wrap cta-band">
          <div>
            <h2 id="house-cta" className="t-1">
              Stay a little longer.
            </h2>
            <p>See your dates, the price and the full listing on Airbnb.</p>
          </div>
          <a className="btn btn-paper" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
            Check availability <span className="arrow" aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </>
  );
}

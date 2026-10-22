import Link from "next/link";
import { DayPlanner } from "@/components/DayPlanner";
import { Credit, Photo, PendingPhoto, TEMP_LABEL } from "@/components/Photo";
import { BOOKING_URL, listing, ratingCheckedLabel, REVIEWS_URL } from "@/content/site";
import "@/styles/home.css";

export default function HomePage() {
  return (
    <>
      {/* ── Hero: let the view lead ── */}
      <section className="hero on-photo" data-hero-photo aria-labelledby="hero-title">
        <div className="hero-media">
          <Photo
            image="heroView"
            sizes="100vw"
            priority
            className="hero-photo"
            imgClassName="drift"
            label={TEMP_LABEL}
            labelPos="top"
          />
        </div>
        <div className="hero-copy wrap">
          <p className="t-place" data-rise style={{ "--i": 0 } as React.CSSProperties}>
            SCARBOROUGH · SOUTH AFRICA
          </p>
          <h1 id="hero-title" className="t-hero lines">
            <span className="line">
              <span data-line style={{ "--i": 0 } as React.CSSProperties}>
                Slow mornings. <br className="br-phone" />
                Ocean views.
              </span>
            </span>
            <span className="line">
              <span data-line style={{ "--i": 1 } as React.CSSProperties}>
                Your place to unwind.
              </span>
            </span>
          </h1>
          <p className="hero-sub" data-rise style={{ "--i": 3 } as React.CSSProperties}>
            A beautiful coastal home in Scarborough, South Africa. Made for slow days, shared moments and feeling
            completely at ease.
          </p>
          <div className="hero-actions" data-rise style={{ "--i": 4 } as React.CSSProperties}>
            <Link href="/the-house" className="btn btn-paper">
              Explore the house
            </Link>
            <Link href="/book" className="btn btn-primary">
              Book your stay <span className="arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Introduction: a heading that captions the coast ── */}
      <section className="intro" aria-labelledby="intro-title">
        <div className="wrap intro-head">
          <h2 id="intro-title" className="t-1 intro-title" data-reveal>
            Some places make you slow down without even trying.
          </h2>
          <div className="intro-cols">
            <p data-reveal style={{ "--i": 1 } as React.CSSProperties}>
              Tucked between the ocean and the natural beauty of the Cape Peninsula, Orange Cliffs is a place to settle
              in and stay a little longer. Start your morning with a view, spend your afternoon wherever the sun takes
              you and come together around the table when the day winds down.
            </p>
            <p data-reveal style={{ "--i": 2 } as React.CSSProperties}>
              With plenty of space to be together, and little corners to enjoy a moment to yourself. Scarborough sits on
              the edge of the Cape Point Nature Reserve, where life moves at a slower, quieter pace.
            </p>
          </div>
        </div>
        <figure className="intro-pano" data-reveal="photo">
          <Photo image="scarboroughAerial" sizes="100vw" className="intro-pano-photo" />
          <figcaption className="caption wrap">
            <Credit image="scarboroughAerial" />
          </figcaption>
        </figure>
      </section>

      {/* ── The house: room for everyone ── */}
      <section className="section house-teaser" aria-labelledby="house-title">
        <div className="wrap">
          <h2 id="house-title" className="t-1" data-reveal>
            Room for everyone. Space for yourself.
          </h2>
          <p className="t-lead house-lead" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
            A light-filled family home: two lounges, two fireplaces, two places to eat outside and a garden cottage
            with its own front door.
          </p>

          <div className="house-mosaic">
            <div className="house-photo-wrap" data-reveal="photo">
              <Photo image="diningRoom" sizes="(max-width: 900px) 100vw, 64vw" className="house-photo" />
              <p className="house-note">
                Upstairs, the open kitchen and dining table look out over the nature reserve and the sea, with a cosy
                lounge and its fireplace right beside them.
              </p>
            </div>
            <div className="house-tile field-green on-dark" data-reveal style={{ "--i": 2 } as React.CSSProperties}>
              <dl className="facts">
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
              <p className="t-small">Including the garden cottage, with its own queen bed, kitchenette and bathroom.</p>
            </div>
          </div>

          <ul className="moments">
            <li data-reveal>
              <h3 className="t-2">Slow mornings</h3>
              <p>Coffee at the upstairs window, the reserve and the ocean beyond. Nobody has to be anywhere.</p>
            </li>
            <li data-reveal style={{ "--i": 1 } as React.CSSProperties}>
              <h3 className="t-2">Afternoons outside</h3>
              <p>The wide porch, the pool and the sun loungers. A towel, a book, another swim.</p>
            </li>
            <li data-reveal style={{ "--i": 2 } as React.CSSProperties}>
              <h3 className="t-2">Long dinners</h3>
              <p>A big table by the built-in braai, or pizzas from the wood-fired oven out back.</p>
            </li>
            <li data-reveal style={{ "--i": 3 } as React.CSSProperties}>
              <h3 className="t-2">Space to yourself</h3>
              <p>Two lounges, a master suite upstairs and a cottage of its own. Easy to find a quiet hour.</p>
            </li>
          </ul>
          <Link href="/the-house" className="link link-accent" data-reveal>
            Explore the house <span className="arrow" aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* ── The view: the signature moment ── */}
      <section className="view" aria-labelledby="view-title">
        <h2 id="view-title" className="t-1 wrap view-title" data-reveal>
          The kind of view you never really get used to.
        </h2>
        <div className="view-media" data-reveal="photo">
          <Photo image="seaDay" sizes="100vw" className="view-photo" imgClassName="drift" />
        </div>
        <p className="caption wrap">
          The real view from Orange Cliffs will take this place as soon as the house&apos;s own photographs arrive. The
          listing confirms ocean, bay, mountain and garden views.
        </p>
      </section>

      {/* ── Favourite spots: a band of unequal panels ── */}
      <section className="section spots" aria-labelledby="spots-title">
        <h2 id="spots-title" className="t-1 wrap spots-title" data-reveal>
          Find your favourite spot. Then find another.
        </h2>
        <div className="band" data-reveal>
          <div className="band-panel" style={{ "--grow": 5 } as React.CSSProperties}>
            <Photo image="balconyTable" sizes="(max-width: 760px) 64vw, 42vw" label="Illustrative image" />
            <p className="band-title">A corner in the sun.</p>
          </div>
          <div className="band-panel" style={{ "--grow": 2 } as React.CSSProperties}>
            <PendingPhoto which="pool" />
          </div>
          <div className="band-panel" style={{ "--grow": 3 } as React.CSSProperties}>
            <Photo image="morningCoffee" sizes="(max-width: 760px) 36vw, 25vw" label="Illustrative image" />
            <p className="band-title">Nowhere else to be.</p>
          </div>
          <div className="band-panel" style={{ "--grow": 2 } as React.CSSProperties}>
            <PendingPhoto which="pizzaOven" tone="green" />
          </div>
        </div>
        <p className="wrap spots-caption">
          The porch with its braai and fire pit, the pool and loungers, two lounges with fireplaces, a pizza oven out
          back and the garden cottage. Our own photographs of each are on their way.
        </p>
      </section>

      {/* ── Scarborough: the destination as a reason to stay ── */}
      <section className="section field-sand scarborough" aria-labelledby="scarborough-title">
        <div className="wrap">
          <h2 id="scarborough-title" className="t-1 scarborough-title" data-reveal>
            A slower kind of South Africa.
          </h2>
          <div className="scarborough-body">
            <figure className="scarborough-photo" data-reveal="photo">
              <Photo image="scarboroughBeachSign" sizes="(max-width: 900px) 60vw, 26vw" className="ratio-4-5" />
              <figcaption className="caption">
                <Credit image="scarboroughBeachSign" />
              </figcaption>
            </figure>
            <div className="scarborough-list">
              <p className="scarborough-intro" data-reveal>
                Just beyond the house, Scarborough invites you to slow down. Quiet coastal mornings, small local cafés,
                beautiful beaches and the kind of days that don&apos;t need much planning.
              </p>
              <table className="rows" data-reveal>
                <caption className="sr-only">Scarborough at a glance</caption>
                <tbody>
                  <tr>
                    <th scope="row">Beach</th>
                    <td>Scarborough Beach</td>
                    <td>Long, wide and white</td>
                  </tr>
                  <tr>
                    <th scope="row">Nature</th>
                    <td>Cape Point Nature Reserve</td>
                    <td>On the village&apos;s edge</td>
                  </tr>
                  <tr className="group">
                    <th scope="row">Coffee</th>
                    <td>Whole Earth Café</td>
                    <td>Breakfast in the garden</td>
                  </tr>
                  <tr>
                    <th scope="row">Provisions</th>
                    <td>The Village Hub</td>
                    <td>Deli, bakery, courtyard</td>
                  </tr>
                  <tr>
                    <th scope="row">Dinner</th>
                    <td>Camel Rock</td>
                    <td>Seafood and grills</td>
                  </tr>
                </tbody>
              </table>
              <Link href="/explore#scarborough" className="link link-accent" data-reveal>
                Explore Scarborough <span className="arrow" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Kalk Bay and the peninsula ── */}
      <section className="section kalk" aria-labelledby="kalk-title">
        <div className="wrap grid12 kalk-grid">
          <figure className="kalk-portrait" data-reveal="photo">
            <Photo image="kalkBayBoats" sizes="(max-width: 900px) 72vw, 30vw" className="ratio-3-4" />
            <figcaption className="caption">
              <Credit image="kalkBayBoats" />
            </figcaption>
          </figure>
          <div className="kalk-text">
            <h2 id="kalk-title" className="t-1" data-reveal>
              A little further. A whole lot to discover.
            </h2>
            <p className="kalk-statement" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
              Across the peninsula, Kalk Bay is full of character: colourful streets, independent shops, a working
              harbour and plenty of places to stop for something delicious. Further on, Cape Point, Boulders Beach and
              the city itself.
            </p>
            <Link href="/explore#kalk-bay" className="link link-accent" data-reveal style={{ "--i": 2 } as React.CSSProperties}>
              Plan a day trip <span className="arrow" aria-hidden="true">→</span>
            </Link>
          </div>
          <figure className="kalk-small" data-reveal="photo">
            <Photo image="capePointDias" sizes="(max-width: 900px) 44vw, 16vw" className="ratio-1" />
            <figcaption className="caption">
              <Credit image="capePointDias" />
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ── Your day, your pace: the live part of the page ── */}
      <section className="field-green on-dark day-section" aria-label="Your day, your pace">
        <DayPlanner />
      </section>

      {/* ── Proof: only what can be checked ── */}
      <section className="section-tight proof" aria-labelledby="proof-title">
        <div className="wrap proof-grid">
          <h2 id="proof-title" className="sr-only">
            What guests say
          </h2>
          <p className="proof-score" data-reveal>
            {listing.rating.value.toFixed(2)}
          </p>
          <div className="proof-text" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
            <p className="t-2">
              Out of 5, across {listing.reviewCount.value} guest reviews on Airbnb. Check-in scores a perfect 5.
            </p>
            <p className="t-small t-muted">As shown on the Airbnb listing on {ratingCheckedLabel}.</p>
            <div className="proof-links">
              <a className="link link-accent" href={REVIEWS_URL} target="_blank" rel="noopener noreferrer">
                Read guest reviews on Airbnb <span className="arrow" aria-hidden="true">↗</span>
              </a>
              <Link className="link" href="/reviews">
                About our reviews <span className="arrow" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Closing: come stay a while ── */}
      <section className="closing on-photo" aria-labelledby="closing-title">
        <Photo image="chapmansPeak" sizes="100vw" className="closing-photo" />
        <p className="closing-credit">
          <Credit image="chapmansPeak" />
        </p>
        <div className="closing-text">
          <h2 id="closing-title" className="t-1">
            Come stay a while.
          </h2>
          <p>Your next slow morning starts here. Dates, prices and booking are all on Airbnb.</p>
          <a className="btn btn-paper" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
            Book your stay <span className="arrow" aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </>
  );
}

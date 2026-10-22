import type { Metadata } from "next";
import Link from "next/link";
import { LocalMap } from "@/components/LocalMap";
import { LoopVideo } from "@/components/LoopVideo";
import { Credit, Photo } from "@/components/Photo";
import { VenueList } from "@/components/VenueList";
import { kalkBayVenues, scarboroughVenues } from "@/content/places";
import "@/styles/explore.css";

export const metadata: Metadata = {
  title: "Explore Scarborough, Kalk Bay and the Cape Peninsula",
  description:
    "A local guide from a holiday home in Scarborough, South Africa: Scarborough Beach and village cafés, a day in Kalk Bay, Cape Point, Boulders Beach and Cape Town, with a map.",
};

const chapters = [
  { href: "#scarborough", label: "Scarborough" },
  { href: "#food", label: "Food" },
  { href: "#kalk-bay", label: "Kalk Bay" },
  { href: "#peninsula", label: "The peninsula" },
  { href: "#map", label: "Map" },
];

export default function ExplorePage() {
  return (
    <>
      <section className="ex-hero on-photo" data-hero-photo aria-labelledby="ex-title">
        <Photo image="scarboroughVillage" sizes="100vw" priority className="ex-hero-photo" imgClassName="drift" />
        <div className="ex-hero-copy wrap">
          <h1 id="ex-title" className="t-hero lines">
            <span className="line">
              <span data-line style={{ "--i": 0 } as React.CSSProperties}>
                Between the mountains
              </span>
            </span>
            <span className="line">
              <span data-line style={{ "--i": 1 } as React.CSSProperties}>
                and the sea.
              </span>
            </span>
          </h1>
          <nav aria-label="On this page" data-rise style={{ "--i": 3 } as React.CSSProperties}>
            <ul className="ex-chapters">
              {chapters.map((c) => (
                <li key={c.href}>
                  <a href={c.href}>{c.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <p className="ex-hero-credit">
            <Credit image="scarboroughVillage" />
          </p>
        </div>
      </section>

      {/* Scarborough */}
      <section id="scarborough" className="section ex-scarborough" aria-labelledby="sc-title">
        <div className="wrap sc-grid">
          <h2 id="sc-title" className="t-1 sc-title" data-reveal>
            A slower kind of South Africa.
          </h2>
          <div className="sc-text">
            <p className="t-lead" data-reveal>
              Just beyond the house, Scarborough invites you to slow down. Think quiet coastal mornings, small local
              cafés, beautiful beaches and the kind of days that don&apos;t need much planning.
            </p>
            <p data-reveal style={{ "--i": 1 } as React.CSSProperties}>
              The village sits on the Atlantic side of the peninsula, on the edge of the Cape Point Nature Reserve. It is
              small, green and unhurried, and the people who live here like to keep it that way: low lights at night
              and a light touch on the land.
            </p>
          </div>
        </div>
        <figure className="sc-pano" data-reveal="photo">
          <Photo image="scarboroughPanorama" sizes="100vw" className="sc-pano-photo" />
          <figcaption className="caption wrap">
            <Credit image="scarboroughPanorama" />
          </figcaption>
        </figure>
        <div className="wrap sc-ideas">
          <figure className="sc-ideas-photo" data-reveal="photo">
            <Photo image="scarboroughBeachPath" sizes="(max-width: 900px) 100vw, 50vw" className="ratio-3-2" />
            <figcaption className="caption">
              <Credit image="scarboroughBeachPath" />
            </figcaption>
          </figure>
          <ul className="sc-ideas-list">
            <li data-reveal>
              <h3 className="t-2">A slow coffee</h3>
              <p>In the garden at Whole Earth Café, or with a pastry from the bakery at the Village Hub.</p>
            </li>
            <li data-reveal style={{ "--i": 1 } as React.CSSProperties}>
              <h3 className="t-2">A long beach walk</h3>
              <p>Scarborough Beach is long, wide and white. Go early, go barefoot, take your time.</p>
            </li>
            <li data-reveal style={{ "--i": 2 } as React.CSSProperties}>
              <h3 className="t-2">A relaxed lunch</h3>
              <p>Pick up provisions at Foragers Deli and eat back on the porch, or stay out for lunch in the village.</p>
            </li>
            <li data-reveal style={{ "--i": 3 } as React.CSSProperties}>
              <h3 className="t-2">Home at sunset</h3>
              <p>The village looks out over the Atlantic, so the sun goes down over the sea. Be back on the porch in time.</p>
            </li>
          </ul>
        </div>
      </section>

      {/* Food */}
      <section id="food" className="section field-sand ex-food" aria-labelledby="food-title">
        <div className="wrap food-grid">
          <div className="food-head">
            <h2 id="food-title" className="t-1" data-reveal>
              Good food. No rush.
            </h2>
            <p data-reveal style={{ "--i": 1 } as React.CSSProperties}>
              A few village favourites, all in Scarborough. Opening hours change with the seasons, so check before you
              go.
            </p>
          </div>
          <VenueList venues={scarboroughVenues} />
          <Photo image="cappuccino" sizes="(max-width: 900px) 100vw, 34vw" className="ratio-4-5 food-photo" label="Illustrative image, not a Scarborough café" />
        </div>
      </section>

      {/* Kalk Bay */}
      <section id="kalk-bay" className="section ex-kalk" aria-labelledby="kalk-title">
        <div className="wrap kb-top">
          <h2 id="kalk-title" className="t-1 kb-title" data-reveal>
            A little further. A whole lot to discover.
          </h2>
          <p className="t-lead kb-lead" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
            Across the peninsula, Kalk Bay is full of character. Colourful streets, independent shops, cafés, a working
            harbour and plenty of places to stop for something delicious.
          </p>
        </div>
        <div className="kb-photos">
          <figure className="kb-a" data-reveal="photo">
            <Photo image="kalkBayQuay" sizes="(max-width: 900px) 100vw, 58vw" className="ratio-4-3" />
            <figcaption className="caption">
              <Credit image="kalkBayQuay" />
            </figcaption>
          </figure>
          <figure className="kb-b" data-reveal="photo">
            <Photo image="kalkBayMainRoad" sizes="(max-width: 900px) 70vw, 30vw" className="ratio-3-4" />
            <figcaption className="caption">
              <Credit image="kalkBayMainRoad" />
            </figcaption>
          </figure>
        </div>
        <div className="wrap kb-day">
          <div className="kb-day-text">
            <h3 className="t-2" data-reveal>
              How a Kalk Bay day goes
            </h3>
            <p data-reveal style={{ "--i": 1 } as React.CSSProperties}>
              Walk the harbour wall and watch the boats. Browse the small, independent shops along Main Road. Stop for
              coffee, then for seafood. The views across False Bay come free. There is no
              list to tick off; that is rather the point.
            </p>
            <figure className="kb-video" data-reveal="photo">
              <LoopVideo
                src="/video/kalk-bay-harbour.webm"
                poster="/video/kalk-bay-harbour-poster.jpg"
                label="A short, silent clip walking along the quay of Kalk Bay harbour past moored fishing boats"
              />
              <figcaption className="caption">
                Kalk Bay harbour, filmed in 2008. Video:{" "}
                <a href="https://commons.wikimedia.org/wiki/File:Kalk_Bay_Harbour.ogv" target="_blank" rel="noopener noreferrer">
                  Patrick Scales
                </a>
                , public domain
              </figcaption>
            </figure>
          </div>
          <VenueList venues={kalkBayVenues} />
        </div>
        <figure className="kb-wide" data-reveal="photo">
          <Photo image="kalkBaySeafront" sizes="100vw" className="kb-wide-photo" />
          <figcaption className="caption wrap">
            <Credit image="kalkBaySeafront" />
          </figcaption>
        </figure>
      </section>

      {/* The peninsula */}
      <section id="peninsula" className="ex-peninsula" aria-labelledby="pen-title">
        <div className="wrap section pen-head">
          <h2 id="pen-title" className="t-1" data-reveal>
            Peacefully tucked away. Beautifully connected.
          </h2>
          <p className="pen-lead" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
            Scarborough feels far from everything, yet the whole peninsula is open to you: wild nature reserve to the
            south, penguins and naval history on the False Bay side, the cliff road of Chapman&apos;s Peak to the
            north, and Cape Town beyond it.
          </p>
        </div>
        <div className="curtain">
          {[
            {
              image: "capePointDias" as const,
              title: "Cape Point and the Cape of Good Hope",
              text: "The southern tip of the peninsula, in Table Mountain National Park: the lighthouse high above the ocean, coastal walks, quiet beaches and fynbos in flower.",
            },
            {
              image: "penguins" as const,
              title: "Boulders Beach and Simon's Town",
              text: "Sheltered coves between granite boulders, home to a colony of African penguins, and the historic harbour town just beside them.",
            },
            {
              image: "chapmansPeak" as const,
              title: "Chapman's Peak and Cape Town",
              text: "The cliff road between Noordhoek and Hout Bay, then the city: Table Mountain, museums, markets, restaurants and shopping for a day.",
            },
          ].map((f) => (
            <div key={f.title} className="curtain-frame">
              <Photo image={f.image} sizes="100vw" className="curtain-photo" />
              <div className="curtain-caption on-photo">
                <h3 className="t-2">{f.title}</h3>
                <p>{f.text}</p>
                <p className="curtain-credit">
                  <Credit image={f.image} />
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Map */}
      <section id="map" className="section ex-map" aria-labelledby="map-title">
        <div className="wrap">
          <h2 id="map-title" className="t-1" data-reveal>
            Find your way around.
          </h2>
          <p className="map-intro" data-reveal>
            Every place on this page, on one map. Choose what to show, then tap a place for directions.
          </p>
          <LocalMap />
          <p className="map-cta">
            Seen enough?{" "}
            <Link className="link link-accent" href="/book">
              Book your stay <span className="arrow" aria-hidden="true">→</span>
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Gallery } from "@/components/Gallery";
import { galleryItems } from "@/content/gallery";
import { pendingPhotos } from "@/content/images";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photographs of Scarborough, Kalk Bay and the Cape Peninsula, with illustrative mood images of the house until its own album is published.",
};

export default function GalleryPage() {
  return (
    <>
      <header className="wrap page-head gallery-head">
        <h1 className="t-hero" data-rise>
          Look around.
        </h1>
        <p className="t-lead" data-rise style={{ "--i": 1 } as React.CSSProperties}>
          The coast, the villages and the peninsula. Anything marked illustrative is a mood image, not Orange Cliffs;
          the house&apos;s own album is on its way.
        </p>
      </header>
      <section className="wrap section-tight" style={{ paddingTop: 0 }} aria-label="Photographs">
        <Gallery items={galleryItems} label="photographs" />
      </section>
      <section className="section field-sand" aria-labelledby="coming-title">
        <div className="wrap coming">
          <h2 id="coming-title" className="t-1" data-reveal>
            Coming soon, from the house
          </h2>
          <ul className="coming-list">
            {Object.values(pendingPhotos).map((p, i) => (
              <li key={p.replacementKey} data-reveal style={{ "--i": i } as React.CSSProperties}>
                {p.label}
              </li>
            ))}
          </ul>
          <p>
            Want to see it all now? The Airbnb listing has the full photo tour.{" "}
            <Link href="/book" className="link link-accent">
              Book your stay <span className="arrow" aria-hidden="true">→</span>
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}

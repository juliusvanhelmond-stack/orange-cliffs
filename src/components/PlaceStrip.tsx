import Link from "next/link";
import type { ImageKey } from "@/content/images";
import { Credit, Photo } from "./Photo";

/** Three real photographs of the area at uneven sizes, with credits and a way on to the Explore page. */
export function PlaceStrip({ title, text, images }: { title: string; text: string; images: [ImageKey, ImageKey, ImageKey] }) {
  return (
    <section className="section place-strip" aria-label={title}>
      <div className="wrap place-strip-head">
        <h2 className="t-1" data-reveal>
          {title}
        </h2>
        <p data-reveal style={{ "--i": 1 } as React.CSSProperties}>
          {text}{" "}
          <Link href="/explore" className="link link-accent">
            Explore the area <span className="arrow" aria-hidden="true">→</span>
          </Link>
        </p>
      </div>
      <div className="wrap place-strip-row">
        {images.map((k, i) => (
          <figure key={k} className={`place-strip-item place-strip-${i}`} data-reveal="photo" style={{ "--i": i } as React.CSSProperties}>
            <Photo image={k} sizes="(max-width: 760px) 100vw, 40vw" className="place-strip-photo" />
            <figcaption className="caption">
              <Credit image={k} />
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

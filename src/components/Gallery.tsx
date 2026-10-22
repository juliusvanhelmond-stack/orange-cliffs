"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { images } from "@/content/images";
import { galleryCategories, type GalleryCategory, type GalleryItem } from "@/content/gallery";
import { TEMP_LABEL } from "./Photo";

type Props = {
  items: GalleryItem[];
  /** Restrict the filter buttons to these categories (e.g. the house page shows only its own). */
  categories?: GalleryCategory[];
  label: string;
};

export function Gallery({ items, categories, label }: Props) {
  const cats = galleryCategories.filter((c) => !categories || categories.includes(c.id));
  const [filter, setFilter] = useState<GalleryCategory | "all">("all");
  const [open, setOpen] = useState<number | null>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  const visible = items.filter((i) => filter === "all" || i.category === filter);

  const close = useCallback(() => {
    setOpen(null);
    dialog.current?.close();
    lastTrigger.current?.focus();
  }, []);

  const step = useCallback(
    (d: number) => setOpen((o) => (o === null ? o : (o + d + visible.length) % visible.length)),
    [visible.length],
  );

  useEffect(() => {
    if (open !== null && dialog.current && !dialog.current.open) dialog.current.showModal();
  }, [open]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, step]);

  // Swipe on touch screens.
  const touchX = useRef<number | null>(null);

  const current = open !== null ? images[visible[open].image] : null;

  return (
    <div className="gallery">
      <div className="gallery-filters" role="group" aria-label={`Filter ${label}`}>
        <button type="button" aria-pressed={filter === "all"} onClick={() => setFilter("all")}>
          All <span className="count">{items.length}</span>
        </button>
        {cats.map((c) => {
          const n = items.filter((i) => i.category === c.id).length;
          if (!n) return null;
          return (
            <button key={c.id} type="button" aria-pressed={filter === c.id} onClick={() => setFilter(c.id)}>
              {c.label} <span className="count">{n}</span>
            </button>
          );
        })}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {visible.length} photographs
      </p>

      <ul className="gallery-grid">
        {visible.map((item, i) => {
          const img = images[item.image];
          const tall = img.height > img.width;
          const wide = img.width / img.height > 2;
          return (
            <li
              key={item.image}
              className={`gallery-item ${wide ? "is-wide" : ""} ${tall ? "is-tall" : ""}`}
              data-reveal
              style={{ "--i": i % 3 } as React.CSSProperties}
            >
              <button
                type="button"
                className="gallery-open"
                onClick={(e) => {
                  lastTrigger.current = e.currentTarget;
                  setOpen(i);
                }}
                aria-label={`Open larger: ${img.subject}${img.isTemporary ? " (illustrative image)" : ""}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  sizes="(max-width: 600px) 100vw, (max-width: 1100px) 50vw, 33vw"
                  style={{ width: "100%", height: "auto" }}
                />
                {img.isTemporary ? <span className="photo-label">Illustrative image</span> : null}
              </button>
              <p className="caption">
                {img.subject}
                {img.credit ? <span className="credit"> · {img.credit.creator}, {img.credit.license}</span> : null}
              </p>
            </li>
          );
        })}
      </ul>

      <dialog
        ref={dialog}
        className="lightbox"
        aria-label={current ? current.subject : "Photograph"}
        onClose={() => open !== null && close()}
        onClick={(e) => {
          if (e.target === dialog.current) close();
        }}
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        {current ? (
          <div className="lightbox-inner">
            <div className="lightbox-bar">
              <p className="t-small">
                {(open ?? 0) + 1} of {visible.length}
              </p>
              <button type="button" className="lightbox-btn" onClick={close} autoFocus>
                Close <span aria-hidden="true">×</span>
              </button>
            </div>
            <figure className="lightbox-figure">
              <Image
                key={current.src}
                src={current.src}
                alt={current.alt}
                width={current.width}
                height={current.height}
                sizes="100vw"
                className="lightbox-img"
              />
              <figcaption>
                <strong>{current.subject}.</strong> {current.alt}.
                {current.isTemporary ? <span className="lightbox-temp"> {TEMP_LABEL}.</span> : null}
                {current.credit ? (
                  <span className="lightbox-credit">
                    {" "}
                    Photo:{" "}
                    <a href={current.credit.source} target="_blank" rel="noopener noreferrer">
                      {current.credit.creator}
                    </a>
                    , {current.credit.license}.
                  </span>
                ) : null}
              </figcaption>
            </figure>
            <div className="lightbox-nav">
              <button type="button" className="lightbox-btn" onClick={() => step(-1)} aria-label="Previous photograph">
                ← Previous
              </button>
              <button type="button" className="lightbox-btn" onClick={() => step(1)} aria-label="Next photograph">
                Next →
              </button>
            </div>
          </div>
        ) : null}
      </dialog>
    </div>
  );
}

"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CircularGallery, type GalleryItem } from "@/components/ui/circular-gallery";
import { images, type ImageKey } from "@/content/images";
import { galleryItems, type GalleryCategory } from "@/content/gallery";

/** The circle reads best with 5 to 12 cards, so the photographs are grouped into sets of that size. */
const sets: { id: string; label: string; categories: GalleryCategory[]; max?: number }[] = [
  { id: "all", label: "Highlights", categories: ["views", "inside", "scarborough", "kalk-bay", "peninsula"], max: 12 },
  { id: "house", label: "The house", categories: ["views", "inside", "outside"] },
  { id: "scarborough", label: "Scarborough", categories: ["scarborough"] },
  { id: "kalk-bay", label: "Kalk Bay", categories: ["kalk-bay"] },
  { id: "peninsula", label: "The peninsula", categories: ["peninsula"], max: 8 },
];

const categoryLabel: Record<GalleryCategory, string> = {
  views: "Views · illustrative",
  inside: "Inside · illustrative",
  outside: "Outside · illustrative",
  scarborough: "Scarborough",
  "kalk-bay": "Kalk Bay",
  peninsula: "Cape Peninsula",
};

function toItem(key: ImageKey, category: GalleryCategory): GalleryItem {
  const img = images[key];
  return {
    common: img.subject,
    binomial: categoryLabel[category],
    photo: {
      url: img.src,
      text: img.alt,
      pos: img.focus,
      by: img.credit ? `${img.credit.creator}, ${img.credit.license}` : "Orange Cliffs",
    },
    badge: img.isTemporary ? "Illustrative image" : undefined,
  };
}

/** Pick evenly across categories so a highlights circle alternates house, village, harbour and coast. */
function pick(categories: GalleryCategory[], max?: number) {
  const pool = galleryItems.filter((g) => categories.includes(g.category));
  // Skip extreme panoramas: they crop badly into a portrait card.
  const usable = pool.filter((g) => images[g.image].width / images[g.image].height < 2.2);
  if (!max || usable.length <= max) return usable;
  const byCat = categories.map((c) => usable.filter((g) => g.category === c));
  const out: typeof usable = [];
  for (let i = 0; out.length < max; i++) {
    let added = false;
    for (const list of byCat) {
      if (list[i] && out.length < max) {
        out.push(list[i]);
        added = true;
      }
    }
    if (!added) break;
  }
  return out;
}

function useCardSize() {
  const [size, setSize] = useState({ w: 300, h: 400 });
  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth;
      if (vw < 480) setSize({ w: 190, h: 260 });
      else if (vw < 900) setSize({ w: 240, h: 320 });
      else setSize({ w: 300, h: 400 });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return size;
}

export function GalleryCarousel() {
  const [setId, setSetId] = useState("all");
  const [offset, setOffset] = useState(0);
  const [active, setActive] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { w, h } = useCardSize();

  const current = sets.find((s) => s.id === setId)!;
  const picked = useMemo(() => pick(current.categories, current.max), [current]);
  const items = useMemo(() => picked.map((g) => toItem(g.image, g.category)), [picked]);

  // Space the cards so neighbours never overlap; keep the circle within a sensible depth.
  const radius = Math.round(Math.min(w * 2, Math.max(w * 1.3, (items.length * (w + 28)) / (2 * Math.PI))));
  const step = 360 / items.length;

  const rotate = useCallback((dir: 1 | -1) => setOffset((o) => o - dir * step), [step]);
  const onActiveChange = useCallback((i: number) => setActive(i), []);
  const front = items[active];

  return (
    <div ref={scrollRef} className="circle-scroll">
      <div className="circle-stage">
        <div className="circle-top wrap">
          <div className="circle-sets" role="group" aria-label="Choose a set of photographs">
            {sets.map((s) => (
              <button
                key={s.id}
                type="button"
                aria-pressed={s.id === setId}
                onClick={() => {
                  setSetId(s.id);
                  setOffset(0);
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
          <p className="circle-hint t-small">Scroll, or use the arrows, to turn the circle.</p>
        </div>

        <div
          className="circle-canvas"
          tabIndex={0}
          aria-label="Photo circle. Use the left and right arrow keys to turn it."
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") {
              e.preventDefault();
              rotate(1);
            }
            if (e.key === "ArrowLeft") {
              e.preventDefault();
              rotate(-1);
            }
          }}
        >
          <CircularGallery
            key={setId}
            items={items}
            radius={radius}
            cardWidth={w}
            cardHeight={h}
            autoRotateSpeed={0.03}
            scrollRef={scrollRef}
            offset={offset}
            onActiveChange={onActiveChange}
          />
        </div>

        <div className="circle-bottom wrap">
          <p className="circle-now" aria-live="polite">
            {front ? (
              <>
                <span className="circle-count">
                  {active + 1} of {items.length}
                </span>{" "}
                {front.common}
                {front.badge ? <span className="t-muted"> · illustrative</span> : null}
              </>
            ) : null}
          </p>
          <div className="circle-nav">
            <button type="button" className="btn btn-paper" onClick={() => rotate(-1)} aria-label="Previous photograph">
              <span aria-hidden="true">←</span> Previous
            </button>
            <button type="button" className="btn btn-paper" onClick={() => rotate(1)} aria-label="Next photograph">
              Next <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

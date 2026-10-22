"use client";

import React, { useEffect, useRef, useState, type HTMLAttributes, type RefObject } from "react";

// A simple utility for conditional class names
const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(" ");

// Define the type for a single gallery item
export interface GalleryItem {
  common: string;
  binomial: string;
  photo: {
    url: string;
    text: string;
    pos?: string;
    by: string;
  };
  /** Optional visible badge, e.g. "Illustrative image" for temporary stock photography. */
  badge?: string;
}

interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[];
  /** Controls how far the items are from the center. */
  radius?: number;
  /** Controls the speed of auto-rotation when not scrolling (degrees per frame). */
  autoRotateSpeed?: number;
  cardWidth?: number;
  cardHeight?: number;
  /** Element whose own scroll progress drives the rotation. Falls back to the whole document. */
  scrollRef?: RefObject<HTMLElement | null>;
  /** Extra rotation in degrees, e.g. from previous/next buttons. */
  offset?: number;
  /** Called when a different item comes to the front. */
  onActiveChange?: (index: number) => void;
}

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  (
    {
      items,
      className,
      radius = 600,
      autoRotateSpeed = 0.02,
      cardWidth = 300,
      cardHeight = 400,
      scrollRef,
      offset = 0,
      onActiveChange,
      ...props
    },
    ref,
  ) => {
    const [scrollRotation, setScrollRotation] = useState(0);
    const [autoRotation, setAutoRotation] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const [reduceMotion, setReduceMotion] = useState(false);
    const [inView, setInView] = useState(true);
    const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const animationFrameRef = useRef<number | null>(null);
    const rootRef = useRef<HTMLDivElement | null>(null);
    const lastActive = useRef(-1);

    // Respect the visitor's motion preference.
    useEffect(() => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      const update = () => setReduceMotion(mq.matches);
      update();
      mq.addEventListener("change", update);
      return () => mq.removeEventListener("change", update);
    }, []);

    // Only animate while the gallery is on screen.
    useEffect(() => {
      const el = rootRef.current;
      if (!el) return;
      const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting));
      io.observe(el);
      return () => io.disconnect();
    }, []);

    // Scroll-based rotation, measured over the scroll container (or the whole page).
    useEffect(() => {
      if (reduceMotion) return;
      const handleScroll = () => {
        setIsScrolling(true);
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

        let progress: number;
        const target = scrollRef?.current;
        if (target) {
          const rect = target.getBoundingClientRect();
          const total = rect.height - window.innerHeight;
          progress = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
        } else {
          const scrollable = document.documentElement.scrollHeight - window.innerHeight;
          progress = scrollable > 0 ? window.scrollY / scrollable : 0;
        }
        setScrollRotation(progress * 360);

        scrollTimeoutRef.current = setTimeout(() => setIsScrolling(false), 150);
      };

      handleScroll();
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", handleScroll);
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      };
    }, [reduceMotion, scrollRef]);

    // Auto-rotation when not scrolling.
    useEffect(() => {
      if (reduceMotion || !inView || autoRotateSpeed === 0) return;
      const autoRotate = () => {
        if (!isScrolling && !document.hidden) setAutoRotation((prev) => prev + autoRotateSpeed);
        animationFrameRef.current = requestAnimationFrame(autoRotate);
      };
      animationFrameRef.current = requestAnimationFrame(autoRotate);
      return () => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      };
    }, [isScrolling, autoRotateSpeed, reduceMotion, inView]);

    const rotation = (reduceMotion ? 0 : scrollRotation + autoRotation) + offset;
    const anglePerItem = 360 / Math.max(items.length, 1);

    // Report which item faces the viewer.
    const active = items.length ? (((Math.round(-rotation / anglePerItem) % items.length) + items.length) % items.length) : 0;
    useEffect(() => {
      if (active !== lastActive.current) {
        lastActive.current = active;
        onActiveChange?.(active);
      }
    }, [active, onActiveChange]);

    return (
      <div
        ref={(node) => {
          rootRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        role="region"
        aria-roledescription="carousel"
        aria-label="Circular 3D gallery"
        className={cn("relative flex h-full w-full items-center justify-center", className)}
        style={{ perspective: "2000px" }}
        {...props}
      >
        <div
          className="relative h-full w-full"
          style={{
            transform: `rotateY(${rotation}deg)`,
            transformStyle: "preserve-3d",
            transition: isScrolling ? undefined : "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {items.map((item, i) => {
            const itemAngle = i * anglePerItem;
            const relativeAngle = (((itemAngle + rotation) % 360) + 360) % 360;
            const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle);
            const opacity = Math.max(0.3, 1 - normalizedAngle / 180);

            return (
              <div
                key={item.photo.url}
                role="group"
                aria-roledescription="slide"
                aria-label={`${item.common}, ${i + 1} of ${items.length}`}
                aria-hidden={i !== active}
                className="absolute"
                style={{
                  width: cardWidth,
                  height: cardHeight,
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                  left: "50%",
                  top: "50%",
                  marginLeft: -cardWidth / 2,
                  marginTop: -cardHeight / 2,
                  opacity,
                  transition: "opacity 0.3s linear",
                  // Cards turned away from the viewer are hidden, so they never ghost through the front ones.
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >
                <figure className="relative m-0 h-full w-full overflow-hidden bg-[var(--sand)]">
                  {/* eslint-disable-next-line @next/next/no-img-element -- 3D-transformed card; next/image adds nothing here */}
                  <img
                    src={item.photo.url}
                    alt={item.photo.text}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ objectPosition: item.photo.pos || "center" }}
                  />
                  {item.badge ? (
                    <span className="absolute right-0 top-0 bg-[rgb(38_55_44/0.86)] px-2 py-1 text-[13px] leading-tight text-[var(--paper)]">
                      {item.badge}
                    </span>
                  ) : null}
                  {/* taste-skill-ignore: neutral scrim behind text on a photograph */}
                  <figcaption className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 pt-12 text-white">
                    <p className="font-[family-name:var(--font-display)] text-xl leading-tight">{item.common}</p>
                    <p className="mt-1 text-sm opacity-85">{item.binomial}</p>
                    <p className="mt-2 text-[13px] opacity-75">Photo: {item.photo.by}</p>
                  </figcaption>
                </figure>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);

CircularGallery.displayName = "CircularGallery";

export { CircularGallery };

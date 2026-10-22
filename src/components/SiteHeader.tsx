"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BOOKING_URL, nav } from "@/content/site";

/** Routes whose first screen is a full-bleed photograph the header floats over. */
const PHOTO_HERO_ROUTES = new Set(["/", "/explore"]);

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [overPhoto, setOverPhoto] = useState(PHOTO_HERO_ROUTES.has(pathname));
  const menuButton = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  // Float over the hero photograph until it has scrolled away.
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("[data-hero-photo]");
    if (!hero) {
      setOverPhoto(false);
      return;
    }
    const update = () => setOverPhoto(hero.getBoundingClientRect().bottom > 72);
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  // Close the menu on navigation.
  useEffect(() => setOpen(false), [pathname]);

  // While the menu is open: lock scroll, close on Escape, keep focus inside.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
      if (e.key === "Tab") {
        const panel = document.getElementById("mobile-menu");
        const focusables = panel?.querySelectorAll<HTMLElement>("a, button");
        if (!focusables?.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header className={`site-header ${overPhoto ? "on-photo" : ""}`} data-over-photo={overPhoto}>
        <Link href="/" className="wordmark" aria-label="Orange Cliffs, home">
          Orange Cliffs
        </Link>
        <nav aria-label="Main">
          <ul className="nav-links">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} aria-current={isActive(item.href) ? "page" : undefined}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="header-actions">
          <Link href="/book" className="btn btn-primary header-book header-book-wide">
            Book your stay
          </Link>
          <Link href="/book" className="btn btn-primary header-book header-book-narrow">
            Book
          </Link>
          <button
            ref={menuButton}
            type="button"
            className="menu-button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
          >
            Menu
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        className="mobile-menu on-dark"
        data-open={open}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!open}
        inert={!open}
      >
        <div className="bar">
          <Link href="/" className="wordmark">
            Orange Cliffs
          </Link>
          <button
            ref={closeButton}
            type="button"
            className="menu-button"
            style={{ display: "inline-flex" }}
            onClick={() => {
              setOpen(false);
              menuButton.current?.focus();
            }}
          >
            Close
          </button>
        </div>
        <nav aria-label="Main, mobile">
          <ul>
            <li>
              <Link href="/" aria-current={pathname === "/" ? "page" : undefined}>
                Home
              </Link>
            </li>
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} aria-current={isActive(item.href) ? "page" : undefined}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/book" aria-current={isActive("/book") ? "page" : undefined}>
                Book your stay
              </Link>
            </li>
          </ul>
        </nav>
        <div className="menu-foot">
          <a className="btn btn-paper" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
            See dates on Airbnb <span className="arrow" aria-hidden="true">→</span>
          </a>
          <p className="t-small" style={{ color: "var(--on-dark-soft)" }}>
            Scarborough, on the Cape Peninsula, South Africa
          </p>
        </div>
      </div>
    </>
  );
}

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Map as LeafletMap, CircleMarker } from "leaflet";
import { directionsUrl, mapCategories, mapPoints, type MapCategory, type MapPoint } from "@/content/places";

const colours: Record<MapPoint["category"], string> = {
  home: "#a9512a",
  food: "#693b42",
  nature: "#354b3d",
  villages: "#7a6a4f",
};

/**
 * A lazy, keyless map (Leaflet + OpenStreetMap tiles) with a full list beside it.
 * The list is the accessible, always-working version; the map loads only when scrolled near.
 */
export function LocalMap() {
  const [active, setActive] = useState<Set<MapCategory>>(new Set(["food", "nature", "villages"]));
  const [selected, setSelected] = useState<string | null>(null);
  const [mapState, setMapState] = useState<"idle" | "loading" | "ready" | "failed">("idle");
  const box = useRef<HTMLDivElement>(null);
  const map = useRef<LeafletMap | null>(null);
  const markers = useRef<Map<string, CircleMarker>>(new Map());

  const visible = useMemo(
    () => mapPoints.filter((p) => p.category === "home" || active.has(p.category as MapCategory)),
    [active],
  );

  // Load Leaflet only when the map is near the viewport.
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    let cancelled = false;
    const io = new IntersectionObserver(
      async (entries) => {
        if (!entries.some((e) => e.isIntersecting) || map.current) return;
        io.disconnect();
        setMapState("loading");
        try {
          const L = (await import("leaflet")).default;
          await import("leaflet/dist/leaflet.css");
          if (cancelled || !box.current) return;
          const m = L.map(box.current, { scrollWheelZoom: false, zoomControl: true, attributionControl: true });
          L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 18,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          }).addTo(m);
          for (const p of mapPoints) {
            const mk = L.circleMarker(p.coords, {
              radius: p.category === "home" ? 11 : 8,
              color: "#faf7f1",
              weight: 2,
              fillColor: colours[p.category],
              fillOpacity: 1,
            });
            mk.bindPopup(
              `<strong>${p.name}</strong><br>${p.description}<br><a href="${directionsUrl(p.mapsQuery)}" target="_blank" rel="noopener noreferrer">Directions ↗</a>`,
            );
            mk.on("click", () => setSelected(p.id));
            markers.current.set(p.id, mk);
          }
          map.current = m;
          setMapState("ready");
        } catch {
          setMapState("failed");
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io.disconnect();
      map.current?.remove();
      map.current = null;
    };
  }, []);

  // Sync markers and bounds with the filters.
  useEffect(() => {
    const m = map.current;
    if (!m || mapState !== "ready") return;
    const ids = new Set(visible.map((p) => p.id));
    markers.current.forEach((mk, id) => {
      if (ids.has(id)) mk.addTo(m);
      else mk.remove();
    });
    import("leaflet").then(({ default: L }) => {
      const b = L.latLngBounds(visible.map((p) => p.coords));
      m.fitBounds(b, { padding: [36, 36], maxZoom: 13 });
    });
  }, [visible, mapState]);

  const focusPoint = (p: MapPoint) => {
    setSelected(p.id);
    const m = map.current;
    const mk = markers.current.get(p.id);
    if (m && mk) {
      m.setView(p.coords, Math.max(m.getZoom(), 13));
      mk.openPopup();
      box.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  const toggle = (c: MapCategory) =>
    setActive((s) => {
      const n = new Set(s);
      if (n.has(c)) n.delete(c);
      else n.add(c);
      return n.size ? n : new Set([c]);
    });

  return (
    <div className="localmap">
      <div className="localmap-filters" role="group" aria-label="Show on the map">
        {mapCategories.map((c) => (
          <button key={c.id} type="button" aria-pressed={active.has(c.id)} onClick={() => toggle(c.id)}>
            <span className="swatch" style={{ background: colours[c.id] }} aria-hidden="true" />
            {c.label}
          </button>
        ))}
      </div>
      <div className="localmap-body">
        <div className="localmap-canvas" ref={box} role="region" aria-label="Map of Scarborough and the Cape Peninsula">
          {mapState !== "ready" ? (
            <p className="localmap-status">
              {mapState === "failed"
                ? "The map could not load. Every place is listed alongside, with directions."
                : "Loading the map…"}
            </p>
          ) : null}
        </div>
        <ul className="localmap-list" aria-label="Places on the map">
          {visible.map((p) => (
            <li key={p.id} data-selected={selected === p.id}>
              <button type="button" className="localmap-item" onClick={() => focusPoint(p)}>
                <span className="swatch" style={{ background: colours[p.category] }} aria-hidden="true" />
                <span>
                  <strong>{p.name}</strong>
                  <span className="t-small">{p.description}</span>
                </span>
              </button>
              <a className="link link-accent localmap-dir" href={directionsUrl(p.mapsQuery)} target="_blank" rel="noopener noreferrer">
                Directions<span className="sr-only"> to {p.name}</span> <span aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <p className="t-small t-muted localmap-note">
        Map data © OpenStreetMap contributors. The house marker shows Scarborough village only; your host shares the
        exact address after booking.
      </p>
    </div>
  );
}

import { directionsUrl, type Venue } from "@/content/places";

/** Venues set as an editorial list: alternating indents, never a grid of identical cards. */
export function VenueList({ venues }: { venues: Venue[] }) {
  return (
    <ul className="venues">
      {venues.map((v, i) => (
        <li key={v.id} className="venue" data-reveal style={{ "--i": i } as React.CSSProperties}>
          <h3 className="venue-name">{v.name}</h3>
          <div className="venue-body">
            <p className="venue-kind">{v.kind}</p>
            <p>{v.description}</p>
            <p className="venue-links">
              {v.website ? (
                <a className="link link-accent" href={v.website} target="_blank" rel="noopener noreferrer">
                  Website<span className="sr-only"> of {v.name}</span> <span aria-hidden="true">↗</span>
                </a>
              ) : null}
              <a className="link link-accent" href={directionsUrl(v.mapsQuery)} target="_blank" rel="noopener noreferrer">
                Directions<span className="sr-only"> to {v.name}</span> <span aria-hidden="true">↗</span>
              </a>
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

import Image from "next/image";
import Link from "next/link";
import { images } from "@/content/images";
import { BOOKING_URL, INSTAGRAM_URL, nav } from "@/content/site";

export function SiteFooter() {
  const stamp = images.scarboroughVillage;
  return (
    <footer className="site-footer field-green on-dark">
      <div className="postcard">
        <svg className="scallops" viewBox="0 0 1200 40" preserveAspectRatio="none" aria-hidden="true">
          <path d={scallopPath(12, 1200, 40)} fill="var(--paper)" />
        </svg>
        <div className="postcard-body">
          <div className="postcard-message">
            <p className="t-1 postcard-signoff">Until the next slow morning.</p>
            <p>
              Orange Cliffs is a family home in Scarborough, on the Atlantic side of the Cape Peninsula. Dates, prices
              and reservations are all handled on Airbnb.
            </p>
            <a className="btn btn-primary" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              Book your stay on Airbnb <span className="arrow" aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="postcard-address">
            <figure className="stamp">
              <Image src={stamp.src} alt="" width={176} height={234} sizes="96px" style={{ objectFit: "cover" }} />
            </figure>
            <ul>
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href}>{n.label}</Link>
                </li>
              ))}
              <li>
                <Link href="/book">Book your stay</Link>
              </li>
              <li>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                  Instagram, @orangecliffs
                </a>
              </li>
              <li className="postcard-place">Scarborough, Cape Town, South Africa</li>
            </ul>
          </div>
        </div>
        <p className="postcard-imprint">
          © {new Date().getFullYear()} Orange Cliffs · <Link href="/credits">Photo credits</Link> · Preview edition:
          illustrative photographs will be replaced by the house&apos;s own.
        </p>
      </div>
      <p className="footer-name" aria-hidden="true">
        Orange Cliffs
      </p>
    </footer>
  );
}

function scallopPath(count: number, width: number, height: number) {
  const w = width / count;
  let d = `M0 ${height} `;
  for (let i = 0; i < count; i++) {
    const x = i * w;
    d += `L${x} ${height} A${w / 2} ${height} 0 0 1 ${x + w} ${height} `;
  }
  return `${d}L${width} ${height} Z`;
}

import Link from "next/link";

export default function NotFound() {
  return (
    <section className="wrap section not-found">
      <h1 className="t-hero">Lost the path to the beach?</h1>
      <p className="t-lead">This page doesn&apos;t exist, but the house does. Here are a few ways back.</p>
      <ul>
        <li>
          <Link className="link link-accent" href="/">
            Home <span className="arrow" aria-hidden="true">→</span>
          </Link>
        </li>
        <li>
          <Link className="link link-accent" href="/the-house">
            The house <span className="arrow" aria-hidden="true">→</span>
          </Link>
        </li>
        <li>
          <Link className="link link-accent" href="/explore">
            Explore Scarborough <span className="arrow" aria-hidden="true">→</span>
          </Link>
        </li>
        <li>
          <Link className="link link-accent" href="/book">
            Book your stay <span className="arrow" aria-hidden="true">→</span>
          </Link>
        </li>
      </ul>
    </section>
  );
}

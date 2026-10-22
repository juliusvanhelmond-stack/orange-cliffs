import type { Faq } from "@/content/faq";

/** Native <details> keeps the expanded state accessible without any script. */
export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="faq">
      {items.map((f) => (
        <details key={f.q}>
          <summary>{f.q}</summary>
          <div className="answer">
            {f.a.map((p) => (
              <p key={p}>{p}</p>
            ))}
            {f.list ? (
              <ul>
                {f.list.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </details>
      ))}
    </div>
  );
}

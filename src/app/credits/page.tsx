import type { Metadata } from "next";
import { images, type ImageRecord } from "@/content/images";

export const metadata: Metadata = {
  title: "Photo credits",
  description: "Sources and licences for the photographs used on the Orange Cliffs website.",
};

export default function CreditsPage() {
  const all = Object.values(images as Record<string, ImageRecord>).filter((i) => i.credit);
  const location = all.filter((i) => i.kind === "location");
  const illustrative = all.filter((i) => i.kind === "illustrative");
  return (
    <div className="wrap section-tight credits">
      <h1 className="t-1">Photo credits</h1>
      <p className="t-lead credits-lead">
        Photographs of Scarborough, Kalk Bay and the peninsula are openly licensed and used with thanks. Illustrative
        images are temporary mood pictures; they are not Orange Cliffs and will be replaced by the house&apos;s own.
      </p>
      {[
        { title: "Places", list: location },
        { title: "Illustrative (temporary)", list: illustrative },
      ].map((g) => (
        <section key={g.title} aria-labelledby={`cr-${g.title}`}>
          <h2 id={`cr-${g.title}`} className="t-2">
            {g.title}
          </h2>
          <table className="credits-table">
            <thead>
              <tr>
                <th scope="col">Shows</th>
                <th scope="col">Photographer</th>
                <th scope="col">Licence</th>
              </tr>
            </thead>
            <tbody>
              {g.list.map((i) => (
                <tr key={i.src}>
                  <td>{i.subject}</td>
                  <td>
                    <a href={i.credit!.source} target="_blank" rel="noopener noreferrer">
                      {i.credit!.creator}
                    </a>
                    , via {i.credit!.via}
                  </td>
                  <td>
                    <a href={i.credit!.licenseUrl} target="_blank" rel="noopener noreferrer">
                      {i.credit!.license}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ))}
      <p className="t-small t-muted">
        Video: Kalk Bay harbour (2008) by{" "}
        <a href="https://commons.wikimedia.org/wiki/File:Kalk_Bay_Harbour.ogv" target="_blank" rel="noopener noreferrer">
          Patrick Scales
        </a>
        , public domain, via Wikimedia Commons. Images were resized for the web. Map data © OpenStreetMap contributors. Typefaces: Newsreader and DM Sans (SIL
        Open Font License).
      </p>
    </div>
  );
}

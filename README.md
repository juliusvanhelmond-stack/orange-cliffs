# Orange Cliffs

Website for Orange Cliffs, a family holiday home in Scarborough on the Cape Peninsula, South Africa. Bookings go through the official Airbnb listing.

**Stack:** Next.js 15 (App Router, statically rendered) · TypeScript · Tailwind CSS v4 + plain CSS tokens · Leaflet with OpenStreetMap tiles (loaded lazily, no API key) · Playwright.

## Run it

```bash
npm install
npm run dev            # http://localhost:3000
npm run build && npm start
```

Checks:

```bash
npm run typecheck
npm run lint
npm run build
npx next start -p 3100 &   # then, in another shell:
npm run test:e2e           # Playwright, desktop 1440 + mobile 390
npm run shots -- http://localhost:3100 .shots   # screenshots + overflow/console report
```

Playwright uses the Chromium at `/opt/pw-browsers/...` by default; set `CHROME=/path/to/chrome` elsewhere.

## Routes

| Route | Page |
| --- | --- |
| `/` | Home: view, house teaser, favourite spots, Scarborough, Kalk Bay, "Your day, your pace" planner, rating, booking |
| `/the-house` | Spaces, rooms, amenities, filterable gallery with lightbox, practical info and FAQ |
| `/explore` | Scarborough, food guide, Kalk Bay, the peninsula, interactive map |
| `/gallery` | All photographs with category filters and an accessible lightbox |
| `/reviews` | Verified rating and category scores, linking to the real reviews on Airbnb |
| `/book` | How booking works, FAQ, Airbnb CTAs |
| `/credits` | Photo, video and map credits |

## Where things live

- `src/content/site.ts`: booking URL, verified listing facts (with source and date), rooms, amenities, rules
- `src/content/images.ts`: **every photograph** (src, alt, credit, licence, `isTemporary`, `replacementKey`)
- `src/content/places.ts`: venues and OSM coordinates for the map
- `src/content/faq.ts`: practical answers, all from the listing
- `src/components/`: header/menu, footer, `Photo` (auto-labels temporary images), `Gallery`, `LocalMap`, `DayPlanner`, `FaqList`
- `CONTENT_VERIFICATION.md`: what is verified, where from, and what is not shown
- `CONTENT_AND_ASSETS_NEEDED.md`: photo replacement checklist and owner to-dos

## Before launch

Set `NEXT_PUBLIC_SITE_URL` to the production domain. Until it is set, the site sends `noindex` and `robots.txt` disallows crawling, so the preview stays out of search results.

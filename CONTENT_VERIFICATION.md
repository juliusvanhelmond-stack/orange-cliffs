# Content verification

What the website states as fact, where it came from, and what still needs the owner's confirmation.
Last checked: **22 October 2026**.

## Property facts — verified on the live Airbnb listing

Source: <https://www.airbnb.nl/rooms/1490676984882768742> (also read in English at airbnb.com).
Code: `src/content/site.ts` (every value carries `verified`, `source` and `checked`).

| Fact | Value shown on the site | Status |
| --- | --- | --- |
| Capacity | Up to 8 guests | ✅ Verified |
| Bedrooms / beds / bathrooms | 4 / 5 / 3 (counts include the garden cottage) | ✅ Verified |
| Room layout | Master suite upstairs (king, en-suite with walk-in shower, freestanding bath); downstairs king room and twin room sharing a bathroom (shower, double vanity); self-contained garden cottage (queen, kitchenette, en-suite) | ✅ Verified from listing description |
| Spaces | Upstairs open-plan kitchen and dining overlooking the reserve and ocean; lounge with fireplace; second lounge with fireplace onto a wide porch with large dining table, built-in braai, fire pit, pool, sun loungers; back outdoor dining area with wood-fired pizza oven; outdoor shower | ✅ Verified |
| Check-in / checkout | After 15:00 / before 10:00 | ✅ Verified |
| House rules | Quiet hours from 22:00 · use lighting sparingly · no parties · no pets · no smoking · up to 8 overnight guests | ✅ Verified |
| Rating | 4.92 / 5 from 13 reviews (category scores: check-in 5.0, accuracy 4.92, communication 4.92, cleanliness 4.85, value 4.77, location 4.62) | ✅ Verified, shown with "as of 22 October 2026". **Update before launch** — it changes as guests review |
| Superhost | Yes | ✅ Verified |
| Wifi | 107 Mbps (Airbnb speed test), dedicated workspace | ✅ Verified |
| Amenities shown on The House page | Selected from the listing's 68 amenities | ✅ Verified |
| Not available (shown honestly in the FAQ) | No air conditioning, no heating, **no smoke alarm, no carbon monoxide alarm**; pool has no gate or lock; stairs | ✅ Verified — see owner actions below |

### Notes and owner actions

- **Name mismatch:** the Airbnb listing is titled "Villa Van D | Luxurious 4 bed in Scarborough", not "Orange Cliffs". Consider renaming the listing so guests arriving from the website recognise it.
- **Safety:** the listing states there is no smoke alarm and no carbon monoxide alarm. The site says so plainly in the FAQ. Fitting both (and updating Airbnb) would let us remove that line. Worth doing before you market to families.
- **Guest reviews:** no individual review text is publicly exposed on the listing page, and we have no permission to republish quotes. **No quotes are published.** The Reviews page links to Airbnb instead. If you want quotes, provide them with each guest's permission.
- **Structured data:** no `aggregateRating`, price or availability schema is emitted.
- **Exact address:** not published. The map marks Scarborough village only.

## Restaurants and venues

Code: `src/content/places.ts`. Opening hours are **not** published: sources disagreed, so the site asks guests to check before they go.

| Venue | Shown? | Evidence | Open questions |
| --- | --- | --- | --- |
| Whole Earth Café, Scarborough | ✅ | Official site (wholeearthcollection.com) active with 2026 content | Street number differs between sources (96 vs 257 Main Road), so none is shown |
| The Village Hub, 2 Watsonia Lane, Scarborough | ✅ | Official site lists Foragers Deli, Foragers Courtyard, Coffee Station, Sopra | — |
| Foragers Deli | ✅ (as part of the Village Hub) | Official Village Hub site | — |
| Table & Tide | ❌ Not shown | Only appears in image filenames on the Village Hub site; one third-party listing | Confirm whether it currently operates |
| Camel Rock, Scarborough | ✅ | No official website; TripAdvisor reviews dated June–August 2026; listed on Main Road | Street number differs between sources (54 vs 264), so none is shown |
| Sunshine Café | ❌ Not shown | No Scarborough (Cape Town) venue of this name found | Confirm the name and location if you want it included |
| Olympia Café, 134 Main Road, Kalk Bay | ✅ | Multiple 2025–26 guides; OSM | — |
| Harbour House, Kalk Bay Harbour | ✅ | Official site lists current hours and May 2026 menus | — |
| Kalky's, Kalk Bay Harbour | ✅ | Widely covered (Eat Out, Time Out); OSM. No official website | — |
| The Brass Bell, Kalk Bay | ✅ | Official site with booking, 2026 updates | — |
| SALT, 136 Main Road, Kalk Bay | ✅ (no map pin) | Several listings at 136 Main Road; review dated April 2026. Not in OpenStreetMap | Confirm it is still trading |

## Map coordinates

All coordinates come from OpenStreetMap (Nominatim) lookups on 22 October 2026. None are invented. SALT has no OSM entry, so it is listed without a pin. The "Orange Cliffs" marker uses the Scarborough suburb centroid, not the house.

## Destination statements

The site avoids distances, drive times and walking times. Geographic statements, such as Scarborough sitting on the Atlantic side on the edge of the Cape Point Nature Reserve, Kalk Bay being on False Bay, and Boulders having an African penguin colony, are taken from the listing or are well established.

## Fonts and licences

Newsreader and DM Sans (Google Fonts, SIL OFL), self-hosted by `next/font` at build time.

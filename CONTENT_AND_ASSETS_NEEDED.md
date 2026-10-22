# Content and assets needed from the owner

The preview site is complete and works, but it uses **temporary illustrative photographs** for the house. Every one carries a visible "Illustrative image" label. Replace them with the real album to finish the site.

## How to replace a photo

1. Put the file in `public/images/` (JPEG, at least 2400 px on the long side, sRGB).
2. Open `src/content/images.ts`, find the record with the matching `replacementKey`, and set:
   - `src` → the new file
   - `width` / `height` → the file's pixel size
   - `alt` → what the photo actually shows
   - `kind: "property"`, `isTemporary: false`, and remove `credit`
3. For features that currently show a "Photograph coming soon" panel (`pendingPhotos` in the same file), add a new image record and swap the `<PendingPhoto which="…" />` for `<Photo image="…" />` where it is used.

The labels disappear automatically once `isTemporary` is false.

## Photo checklist (by priority)

### Priority 1: needed for launch

| replacementKey | Where it appears | What to shoot | Orientation / ratio |
| --- | --- | --- | --- |
| `home.hero.ocean-view` | Home hero, full screen | **The real view from the house over the ocean**, ideally morning or golden hour, with calm sky or sea in the lower left for the headline | Landscape, 3:2 or wider; must survive a portrait phone crop (keep the horizon and main subject central) |
| `view.afternoon` | Home "The kind of view…" panorama | The same view, wide, midday or afternoon | Landscape, 16:9 or wider |
| `house.pool` | Home spots band, The House (Afternoons outside) | Pool with sun loungers | Landscape 4:3 **and** a tall crop for the band |
| `house.porch.braai` | The House (Afternoons outside) | Wide porch: large dining table, built-in braai, fire pit | Landscape 3:2 |
| `house.pizza-oven` | Home spots band, The House (Long dinners) | Back dining area with the wood-fired pizza oven, ideally lit in the evening | Square or portrait |
| `house.exterior` | Gallery (not yet placed) | The house from outside, showing architecture and setting | Landscape 3:2 |
| `house.dining` | Home house teaser | Upstairs open-plan kitchen and dining table, with the view through the windows | Landscape 16:10 |

### Priority 2

| replacementKey | Where it appears | What to shoot | Orientation / ratio |
| --- | --- | --- | --- |
| `house.lounge.fireplace` | Gallery, The House | A lounge with its fireplace lit | Landscape or 4:5 |
| `house.cottage` | The House (Space to yourself) | The garden cottage: exterior and the queen bedroom | Portrait 4:5 |
| `house.bedroom.morning` | Home spots band, The House (Slow mornings), Gallery | Master suite in morning light; coffee by the bed or window | Landscape 3:2 |
| `house.kitchen.table` | The House page header, Reviews | Breakfast on the kitchen table | Portrait 4:5 |
| `house.veranda.corner` | Home spots band | A favourite small corner outside: chair, view, book | Tall portrait |
| `house.kitchen.cooking` | The House (Long dinners) | Cooking together in the kitchen | Portrait 4:5 |
| `house.outdoor-dining.evening` | The House (Long dinners), Home day planner (18:30) | Table laid outside at dusk | Landscape 3:2 |

### Priority 3: the day planner on Home

| replacementKey | Moment | What to shoot |
| --- | --- | --- |
| `view.morning` | 07:30 Coffee with the view | The view from the kitchen window in early light |
| `view.night` | 22:00 The village goes quiet | The house or view at blue hour, lights low |

### Other temporary images

| replacementKey | Where | Note |
| --- | --- | --- |
| `explore.food.mood` | Explore, food guide | Generic café photo. Better: your own photo at a Scarborough café, or a photo supplied by the venue with permission |
| `explore.cafe.mood` | Not currently placed | — |

### Location photographs

Scarborough, Kalk Bay, Cape Point, Boulders, Chapman's Peak, Simon's Town and Table Mountain use **real, openly licensed photographs** from Wikimedia Commons, credited on each page and at `/credits`. They can stay. Your own photographs of the beach, the village and Kalk Bay would make the site more personal.

## Text and facts to confirm

- [ ] Rename the Airbnb listing to "Orange Cliffs" (it is currently "Villa Van D | Luxurious 4 bed in Scarborough").
- [ ] Production domain. Set `NEXT_PUBLIC_SITE_URL` so canonical URLs, the sitemap and indexing switch on. Until then the site sends `noindex`.
- [ ] Re-check the rating (4.92 / 13 reviews) just before launch; it is hard-coded with its check date.
- [ ] Smoke and CO alarms: fit them and update the listing, then remove the line in `src/content/faq.ts`.
- [ ] Table & Tide and Sunshine Café: confirm if you want them listed (see `CONTENT_VERIFICATION.md`).
- [ ] Optional: guest quotes, **only** with each reviewer's written permission.
- [ ] Optional: a short host introduction (Sean and co-hosts) with a portrait, if you would like a personal "who we are" moment.
- [ ] Open Graph share image. Use the real hero view once it exists (none is set now, so we don't share a stock image as the property).

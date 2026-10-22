import type { ImageKey } from "./images";

export type GalleryCategory = "views" | "inside" | "outside" | "scarborough" | "kalk-bay" | "peninsula";

export const galleryCategories: { id: GalleryCategory; label: string }[] = [
  { id: "views", label: "Views" },
  { id: "inside", label: "Inside" },
  { id: "outside", label: "Outside" },
  { id: "scarborough", label: "Scarborough" },
  { id: "kalk-bay", label: "Kalk Bay" },
  { id: "peninsula", label: "The peninsula" },
];

export type GalleryItem = { image: ImageKey; category: GalleryCategory };

/** Order is deliberate: alternating light, scale and subject so the grid reads as a sequence. */
export const galleryItems: GalleryItem[] = [
  { image: "heroView", category: "views" },
  { image: "scarboroughAerial", category: "scarborough" },
  { image: "morningCoffee", category: "inside" },
  { image: "kalkBayBoats", category: "kalk-bay" },
  { image: "seaMorning", category: "views" },
  { image: "diningRoom", category: "inside" },
  { image: "scarboroughBeachPath", category: "scarborough" },
  { image: "chapmansPeak", category: "peninsula" },
  { image: "balconyTable", category: "outside" },
  { image: "kalkBayFishingBoat", category: "kalk-bay" },
  { image: "breakfastTable", category: "inside" },
  { image: "capePointLighthouse", category: "peninsula" },
  { image: "scarboroughVillage", category: "scarborough" },
  { image: "seaDay", category: "views" },
  { image: "dinnerTable", category: "outside" },
  { image: "kalkBaySeafront", category: "kalk-bay" },
  { image: "penguins", category: "peninsula" },
  { image: "cooking", category: "inside" },
  { image: "scarboroughBeachSign", category: "scarborough" },
  { image: "kalkBayQuay", category: "kalk-bay" },
  { image: "capePointDias", category: "peninsula" },
  { image: "seaDusk", category: "views" },
  { image: "kalkBayMainRoad", category: "kalk-bay" },
  { image: "fynbos", category: "peninsula" },
  { image: "boulders", category: "peninsula" },
  { image: "scarboroughPanorama", category: "scarborough" },
  { image: "simonsTown", category: "peninsula" },
  { image: "tableMountain", category: "peninsula" },
];

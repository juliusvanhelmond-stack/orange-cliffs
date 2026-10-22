import type { MetadataRoute } from "next";
import { brand } from "@/content/site";

const routes = ["", "/the-house", "/explore", "/gallery", "/reviews", "/book"];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = brand.siteUrl || "http://localhost:3000";
  return routes.map((r) => ({ url: `${base}${r}`, changeFrequency: "monthly", priority: r === "" ? 1 : 0.7 }));
}

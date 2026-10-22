import type { MetadataRoute } from "next";
import { brand } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  // Until a production domain is configured, keep the preview out of search engines.
  if (!brand.siteUrl) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${brand.siteUrl}/sitemap.xml` };
}

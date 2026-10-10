import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/studio";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/tretmani`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/pravila-privatnosti`, changeFrequency: "yearly", priority: 0.3 },
  ];
}

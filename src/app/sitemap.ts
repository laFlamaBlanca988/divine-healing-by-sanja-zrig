import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/studio";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/tretmani`, changeFrequency: "monthly", priority: 0.9 },
    // /pravila-privatnosti se dodaje kad konačni tekst zamijeni nacrt (dotad je noindex).
  ];
}

import type { MetadataRoute } from "next";
import { AZURIRANO } from "@/content/seo";
import { putanjaStranice, stranice } from "@/content/stranice";
import { SITE_URL } from "@/content/studio";

// lastmod mora biti stvarni datum izmjene sadržaja (Google ga inače ignorira), ne datum buildanja.
// /pravila-privatnosti se dodaje kad konačni tekst zamijeni nacrt (dotad je noindex).
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(AZURIRANO);
  return [
    { url: `${SITE_URL}/`, lastModified },
    { url: `${SITE_URL}/tretmani`, lastModified },
    ...stranice.map((s) => ({ url: `${SITE_URL}${putanjaStranice(s.slug)}`, lastModified })),
  ];
}

import type { MetadataRoute } from "next";
import { pravilaSpremna, privatnost } from "@/content/privatnost";
import { AZURIRANO } from "@/content/seo";
import { putanjaStranice, stranice } from "@/content/stranice";
import { SITE_URL } from "@/content/studio";

// lastmod mora biti stvarni datum izmjene sadržaja (Google ga inače ignorira), ne datum buildanja.
// /pravila-privatnosti se dodaje kad su upisani svi podaci u src/content/privatnost.ts (dotad je noindex).
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(AZURIRANO);
  return [
    { url: `${SITE_URL}/`, lastModified },
    { url: `${SITE_URL}/tretmani`, lastModified },
    ...stranice.map((s) => ({ url: `${SITE_URL}${putanjaStranice(s.slug)}`, lastModified })),
    ...(pravilaSpremna && privatnost.datumIzmjene
      ? [{ url: `${SITE_URL}/pravila-privatnosti`, lastModified: new Date(privatnost.datumIzmjene) }]
      : []),
  ];
}

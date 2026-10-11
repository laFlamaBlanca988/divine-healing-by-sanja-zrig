import { SITE_URL, studio } from "./studio";

/** Datum zadnje izmjene sadržaja (sitemap lastmod). Ažurirati ručno kad se promijeni sadržaj. */
export const AZURIRANO = "2026-10-11";

/**
 * Zajednički Open Graph podaci. Next spaja metadata plitko: stranica koja postavi openGraph
 * zamjenjuje cijeli openGraph iz layouta, pa ga svaka stranica proširuje s ovim.
 */
export const ogBase = {
  type: "website",
  locale: "hr_HR",
  siteName: studio.naziv,
  // Ista slika kao src/app/opengraph-image.jpg; stranice tretmana postavljaju svoju.
  images: [
    {
      url: "/opengraph-image.jpg",
      width: 1200,
      height: 630,
      alt: "Sanja u studiju Divine Healing uz klijenticu na stolu za masažu",
    },
  ],
};

export const STUDIO_ID = `${SITE_URL}/#studio`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export type Mrvica = { naziv: string; putanja: string };

/** Strukturirani podaci BreadcrumbList — prate vidljivu putanju na stranici. */
export function breadcrumbLd(mrvice: Mrvica[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: mrvice.map((m, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: m.naziv,
      item: `${SITE_URL}${m.putanja}`,
    })),
  };
}

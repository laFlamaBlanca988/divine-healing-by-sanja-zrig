import { STUDIO_ID, WEBSITE_ID } from "./seo";
import { stranicaZaTretman } from "./stranice";
import { SITE_URL, studio } from "./studio";
import { kategorije, nazivBezZnaka, sviTretmani } from "./tretmani";

const cijene = sviTretmani.flatMap((t) => t.opcije.map((o) => o.cijenaEur));

/**
 * JSON-LD za početnu: WebSite + DaySpa (podvrsta LocalBusiness / HealthAndBeautyBusiness).
 * Cijene u katalogu dolaze iz tretmani.json pa su uvijek iste kao vidljive.
 * geo se dodaje tek kad postoji provjerena lokacija iz Google profila tvrtke — ne pogađati.
 */
export function pocetnaLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: `${SITE_URL}/`,
        name: studio.naziv,
        alternateName: ["Divine Healing"],
        inLanguage: "hr-HR",
        publisher: { "@id": STUDIO_ID },
      },
      {
        "@type": "DaySpa",
        "@id": STUDIO_ID,
        name: studio.naziv,
        description:
          "Studio za masažu u Kustošiji, Zagreb: terapeutska, tradicionalna tajlandska, sportska i relax masaža, antistres tretmani, hidžama i FOHOW BEM 3.0 masaže.",
        url: `${SITE_URL}/`,
        image: [`${SITE_URL}/opengraph-image.jpg`, `${SITE_URL}/images/studio-prostor.jpg`],
        logo: `${SITE_URL}/images/logo-znak.png`,
        telephone: "+385981654696",
        email: studio.email,
        priceRange: `${Math.min(...cijene)} € – ${Math.max(...cijene)} €`,
        currenciesAccepted: "EUR",
        address: {
          "@type": "PostalAddress",
          streetAddress: studio.adresa,
          postalCode: studio.postanskiBroj,
          addressLocality: studio.grad,
          addressCountry: "HR",
        },
        hasMap: studio.karta,
        areaServed: { "@type": "City", name: "Zagreb" },
        founder: { "@type": "Person", name: "Sanja Zrig" },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "10:00",
            closes: "21:00",
          },
          { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "13:00", closes: "19:00" },
        ],
        sameAs: [studio.instagram, studio.zoyya],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Masaže i tretmani",
          itemListElement: kategorije.map((k) => ({
            "@type": "OfferCatalog",
            name: nazivBezZnaka(k.naziv),
            itemListElement: k.tretmani.flatMap((t) =>
              t.opcije.map((o) => {
                const stranica = stranicaZaTretman(t.id);
                return {
                  "@type": "Offer",
                  price: o.cijenaEur,
                  priceCurrency: "EUR",
                  itemOffered: {
                    "@type": "Service",
                    name: t.opcije.length > 1 ? `${t.naziv} (${o.trajanjeMin} min)` : t.naziv,
                    description: t.opis,
                    url: `${SITE_URL}${stranica ?? "/tretmani"}`,
                  },
                };
              }),
            ),
          })),
        },
      },
    ],
  };
}

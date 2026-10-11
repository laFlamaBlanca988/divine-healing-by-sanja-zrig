export const studio = {
  naziv: "Divine Healing by Sanja Zrig",
  podnaslov: "Massage & Wellness Studio",
  adresa: "Ilica 322",
  postanskiBroj: "10000",
  grad: "Zagreb",
  kvart: "Kustošija",
  telefon: "+385 98 165 4696",
  telefonHref: "tel:+385981654696",
  email: "sanjazrig@gmail.com",
  instagram: "https://www.instagram.com/divine_healing_bysanja/",
  instagramHandle: "@divine_healing_bysanja",
  zoyya: "https://zoyya.com/hr/divine-healing",
  karta: "https://maps.google.com/?q=Ilica+322,+Zagreb",
} as const;

/**
 * Javna adresa stranice (canonical, sitemap, Open Graph, strukturirani podaci).
 * Redom: NEXT_PUBLIC_SITE_URL → produkcijska domena projekta na Vercelu → localhost (lokalni razvoj).
 * Koristi se samo na serveru, pri buildu.
 */
const vercelProdukcija = process.env.VERCEL_PROJECT_PRODUCTION_URL;
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (vercelProdukcija ? `https://${vercelProdukcija}` : "") ||
  "http://localhost:3000"
).replace(/\/$/, "");

import type { Metadata, Viewport } from "next";
import { Cinzel, Dancing_Script, Montserrat } from "next/font/google";
import { MobilnaTraka } from "@/components/MobilnaTraka";
import { SITE_URL, studio } from "@/content/studio";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-cinzel",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-montserrat",
  display: "swap",
});

const dancing = Dancing_Script({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600"],
  variable: "--font-dancing",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Divine Healing by Sanja Zrig — masaže i wellness, Zagreb",
    template: "%s | Divine Healing by Sanja Zrig",
  },
  description:
    "Massage & Wellness Studio u Ilici 322, Zagreb. Terapeutska, tajlandska, sportska i relax masaža, antistres tretmani, hidžama i FOHOW BEM 3.0 masaže.",
  openGraph: {
    type: "website",
    locale: "hr_HR",
    siteName: studio.naziv,
  },
};

export const viewport: Viewport = {
  themeColor: "#FBF7F0",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["DaySpa", "HealthAndBeautyBusiness"],
  name: studio.naziv,
  description: "Massage & Wellness Studio — masaže, antistres tretmani, hidžama i FOHOW BEM 3.0 masaže.",
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image.jpg`,
  logo: `${SITE_URL}/images/logo-znak.png`,
  telephone: "+385981654696",
  email: studio.email,
  priceRange: "25 € – 80 €",
  currenciesAccepted: "EUR",
  address: {
    "@type": "PostalAddress",
    streetAddress: studio.adresa,
    postalCode: studio.postanskiBroj,
    addressLocality: studio.grad,
    addressCountry: "HR",
  },
  hasMap: studio.karta,
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
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="hr"
      data-scroll-behavior="smooth"
      className={`${cinzel.variable} ${montserrat.variable} ${dancing.variable}`}
    >
      <body className="min-w-0 overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        {children}
        <MobilnaTraka />
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Cinzel, Dancing_Script, Montserrat } from "next/font/google";
import { MobilnaTraka } from "@/components/MobilnaTraka";
import { ogBase } from "@/content/seo";
import { SITE_URL } from "@/content/studio";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-cinzel",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-montserrat",
  display: "swap",
});

const dancing = Dancing_Script({
  subsets: ["latin", "latin-ext"],
  weight: ["500"],
  variable: "--font-dancing",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Masaža Zagreb (Kustošija) | Divine Healing by Sanja Zrig",
    template: "%s | Divine Healing",
  },
  description:
    "Masaže u Ilici 322 (Kustošija, Zagreb): terapeutska, tajlandska, sportska i relax masaža, antistres tretmani, hidžama i FOHOW BEM 3.0. Online rezervacija.",
  openGraph: ogBase,
};

export const viewport: Viewport = {
  themeColor: "#FBF7F0",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="hr"
      data-scroll-behavior="smooth"
      className={`${cinzel.variable} ${montserrat.variable} ${dancing.variable}`}
    >
      <body className="min-w-0 overflow-x-hidden">
        {children}
        <MobilnaTraka />
      </body>
    </html>
  );
}

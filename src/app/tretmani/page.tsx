import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { NaslovnaTraka } from "@/components/NaslovnaTraka";
import { PomocPriOdabiru } from "@/components/PomocPriOdabiru";
import { Cjenik } from "@/components/RedTretmana";
import { SlikaULuku } from "@/components/SlikaULuku";
import { breadcrumbLd, ogBase, type Mrvica } from "@/content/seo";
import { putanjaStranice } from "@/content/stranice";
import { kategorije, tretman, type Kategorija } from "@/content/tretmani";

/** Cijena prve opcije, za opis generiran iz cjenika. */
const cijena = (id: string) => tretman(id).opcije[0].cijenaEur;

export const metadata: Metadata = {
  title: "Cjenik masaža i tretmana, Zagreb",
  description: `Cjenik masaža u Zagrebu (Ilica 322, Kustošija): masaža leđa od ${cijena("masaza-ledja")} €, relax ${cijena("relax-masaza")} €, sportska ${cijena("sportska-masaza")} €, terapeutska ${cijena("terapeutska-masaza")} €, tajlandska ${cijena("tradicionalna-tajlandska-masaza")} €. Online rezervacija.`,
  alternates: { canonical: "/tretmani" },
  openGraph: { ...ogBase, url: "/tretmani" },
};

const mrvice: Mrvica[] = [
  { naziv: "Početna", putanja: "/" },
  { naziv: "Tretmani i cjenik", putanja: "/tretmani" },
];

/** Alt tekstovi i object-position slika kategorija (docs/dizajn.md §7). */
const slikeKategorija: Record<string, { alt: string; pozicija: string }> = {
  masaze: { alt: "Sanja izvodi terapeutsku masažu leđa", pozicija: "50% 40%" },
  antistres: { alt: "Sanja izvodi antistres masažu lica i glave", pozicija: "50% 30%" },
  tijelo: { alt: "Drveni valjci i pomagala za maderoterapiju", pozicija: "50% 50%" },
  fohow: { alt: "FOHOW BEM 3.0 uređaj sa srebrnim rukavicama i gelovima za masažu", pozicija: "50% 60%" },
};

/** Kategorije koje imaju zasebnu stranicu s detaljnijim opisom. */
const viseOKategoriji: Record<string, { href: string; tekst: string }> = {
  fohow: { href: putanjaStranice("fohow-bem-masaze"), tekst: "Više o FOHOW BEM 3.0 masažama" },
};

const skokovi = [
  { href: "#masaze", label: "Masaže" },
  { href: "#antistres", label: "Antistres" },
  { href: "#tijelo", label: "Hidžama i tijelo" },
  { href: "#fohow", label: "FOHOW BEM 3.0" },
];

export default function Tretmani() {
  return (
    <>
      <JsonLd data={breadcrumbLd(mrvice)} />
      <Header stranica="tretmani" />
      <main>
        <NaslovnaTraka mrvice={mrvice} naslov="Tretmani i cjenik">
          <p className="m-0 max-w-[620px] text-[16px] leading-[1.75] text-cocoa md:text-[17px]">
            Cjenik masaža i tretmana u studiju Divine Healing u Ilici 322 (Kustošija, Zagreb). Rezervirajte online
            putem Zoyye ili pošaljite upit — za tretmane s cijenom na upit javit ćemo vam se s detaljima. Cijene su u
            eurima i uključuju PDV.
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-2.5">
            {skokovi.map((s) => (
              <a
                key={s.href}
                href={s.href}
                className="btn min-h-11 border-gold-line bg-white-warm px-[22px] text-espresso hover:bg-ivory hover:text-espresso"
              >
                {s.label}
              </a>
            ))}
          </div>
        </NaslovnaTraka>

        {kategorije.map((k, i) => (
          <SekcijaKategorije key={k.id} k={k} broj={i + 1} krem={i % 2 === 1} />
        ))}

        <PomocPriOdabiru />
      </main>
      <Footer />
    </>
  );
}

function SekcijaKategorije({ k, broj, krem }: { k: Kategorija; broj: number; krem: boolean }) {
  const tamno = !!k.tamnaSekcija;
  const slika = slikeKategorija[k.id];
  const vise = viseOKategoriji[k.id];
  const linija = tamno ? "border-espresso-line" : krem ? "border-sand-mid" : "border-sand";
  const pozadina = tamno ? "bg-espresso text-cream" : krem ? "border-t border-sand bg-cream" : "border-t border-sand bg-ivory";

  return (
    <section id={k.id} className={`scroll-mt-0 ${broj === 1 ? "bg-ivory" : pozadina}`}>
      <div className="wrap section-y flex flex-wrap items-start gap-x-[72px] gap-y-10 md:gap-y-12">
        <div className="flex w-full max-w-[400px] min-w-0 flex-[1_1_320px] flex-col gap-[18px]">
          <div className={`eyebrow ${tamno ? "text-gold-light" : ""}`}>{String(broj).padStart(2, "0")}</div>
          <h2 className={`h2-sm ${tamno ? "text-ivory" : ""}`}>{k.naziv}</h2>
          {k.slogan && <p className="m-0 font-serif text-[19px] leading-[1.45] text-gold-light">{k.slogan}</p>}
          <p className={`m-0 text-[16px] leading-[1.75] ${tamno ? "text-on-dark" : "text-cocoa"}`}>{k.uvod}</p>
          {vise && (
            <Link
              href={vise.href}
              className={`inline-flex min-h-11 items-center self-start text-[12px] font-semibold tracking-[0.16em] uppercase no-underline ${
                tamno ? "text-gold-light hover:text-ivory" : ""
              }`}
            >
              {vise.tekst}
            </Link>
          )}
          <SlikaULuku src={k.slika} alt={slika?.alt ?? ""} pozicija={slika?.pozicija} tamno={tamno} className="mt-6 md:mt-8" />
        </div>
        <Cjenik tretmani={k.tretmani} tamno={tamno} linija={linija} />
      </div>
    </section>
  );
}

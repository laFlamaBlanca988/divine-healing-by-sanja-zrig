import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Ikona } from "./Ikona";
import { InfoTraka } from "./InfoTraka";
import { JsonLd } from "./JsonLd";
import { NaslovnaTraka } from "./NaslovnaTraka";
import { PomocPriOdabiru } from "./PomocPriOdabiru";
import { Cjenik } from "./RedTretmana";
import { SlikaULuku } from "./SlikaULuku";
import { TekstSPoveznicama } from "./TekstSPoveznicama";
import { breadcrumbLd, ogBase, type Mrvica } from "@/content/seo";
import { putanjaStranice, stranica, stranice } from "@/content/stranice";
import { studio } from "@/content/studio";
import { tretman, upitHref } from "@/content/tretmani";

/** Metadata stranice tretmana (naslov, opis, canonical, Open Graph sa slikom tretmana). */
export function metadataStranice(slug: string): Metadata {
  const s = stranica(slug);
  const putanja = putanjaStranice(slug);
  // Slika za dijeljenje ostaje zajednička (1200×630 iz ogBase): fotografije tretmana su uspravne
  // i u pregledu na društvenim mrežama bile bi izrezane na usku traku.
  return {
    title: s.title,
    description: s.description,
    alternates: { canonical: putanja },
    openGraph: {
      ...ogBase,
      url: putanja,
      title: s.h1,
      description: s.description,
    },
  };
}

function mrviceZa(slug: string): Mrvica[] {
  const s = stranica(slug);
  return [
    { naziv: "Početna", putanja: "/" },
    { naziv: "Tretmani i cjenik", putanja: "/tretmani" },
    { naziv: s.naziv, putanja: putanjaStranice(slug) },
  ];
}

export function StranicaTretmana({ slug }: { slug: string }) {
  const s = stranica(slug);
  const mrvice = mrviceZa(slug);
  const tamno = !!s.tamno;
  const linija = tamno ? "border-espresso-line" : "border-sand";
  const glavna = s.slike[0];
  const srodne = stranice.filter((x) => x.slug !== slug);

  return (
    <>
      <JsonLd data={breadcrumbLd(mrvice)} />
      <Header stranica="tretman" />
      <main>
        <NaslovnaTraka mrvice={mrvice} naslov={s.h1} uskiNaslov>
          {s.slogan && (
            <p className="m-0 max-w-[620px] font-serif text-[19px] leading-[1.45] text-gold-deep md:text-[21px]">
              {s.slogan}
            </p>
          )}
          {s.uvod.map((p) => (
            <p key={p} className="m-0 max-w-[620px] text-[16px] leading-[1.75] text-cocoa md:text-[17px]">
              <TekstSPoveznicama tekst={p} />
            </p>
          ))}
          <div className="mt-2 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-3.5">
            <a href={studio.zoyya} className="btn btn-primary btn-lg pomak-strelice gap-3">
              Rezerviraj termin
              <Ikona ime="strelica" size={18} />
            </a>
            <Link href={upitHref(s.upitTretman)} className="btn btn-secondary btn-lg bg-white-warm">
              Pošalji upit
            </Link>
          </div>
        </NaslovnaTraka>

        {/* Trajanje i cijena — isti redovi kao u cjeniku */}
        <section className={tamno ? "bg-espresso text-cream" : "bg-ivory"}>
          <div className="wrap section-y flex flex-wrap items-start gap-x-[72px] gap-y-10 md:gap-y-12">
            <div className="flex w-full max-w-[400px] min-w-0 flex-[1_1_320px] flex-col gap-[18px]">
              <div className={`eyebrow ${tamno ? "text-gold-light" : ""}`}>Cjenik</div>
              <h2 className={`h2-sm ${tamno ? "text-ivory" : ""}`}>Trajanje i cijena</h2>
              <p className={`m-0 text-[16px] leading-[1.75] ${tamno ? "text-on-dark" : "text-cocoa"}`}>
                Cijene su u eurima i uključuju PDV. Termin rezervirajte online putem Zoyye ili pošaljite upit.
              </p>
              <SlikaULuku src={glavna.src} alt={glavna.alt} pozicija={glavna.pozicija} tamno={tamno} className="mt-6 md:mt-8" />
            </div>
            <Cjenik
              tretmani={s.tretmanIds.map((id) => tretman(id))}
              tamno={tamno}
              linija={linija}
              trenutnaStranica={putanjaStranice(slug)}
            />
          </div>
        </section>

        {/* Opis (+ galerija u desnom stupcu na širokim ekranima) */}
        <section className="border-t border-sand bg-ivory">
          <div className="wrap section-y">
            <div
              className={`grid gap-14 ${
                s.galerija ? "lg:grid-cols-[minmax(0,1fr)_minmax(240px,320px)] lg:gap-14 xl:gap-20" : ""
              }`}
            >
              <div className="flex max-w-[760px] flex-col gap-12">
                {s.sekcije.map((sek) => (
                  <div key={sek.naslov} className="otkrij flex flex-col gap-4">
                    <h2 className="h2-sm">{sek.naslov}</h2>
                    {sek.citat && (
                      <blockquote className="m-0 font-serif text-[19px] leading-[1.45] text-espresso md:text-[22px]">
                        „{sek.citat}”
                      </blockquote>
                    )}
                    {sek.odlomci?.map((p) => (
                      <p key={p} className="lead m-0">
                        <TekstSPoveznicama tekst={p} />
                      </p>
                    ))}
                    {sek.stavke && (
                      <ul role="list" className="m-0 flex list-none flex-col gap-2.5 p-0">
                        {sek.stavke.map((st) => (
                          <li key={st} className="flex items-start gap-3 text-[16px] leading-[1.6] text-espresso">
                            <span className="mt-[9px] h-1.5 w-1.5 flex-none rounded-full bg-gold" aria-hidden="true" />
                            {st}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>

              {s.galerija && (
                <div className="grid max-w-[760px] grid-cols-2 content-start gap-2.5 md:gap-4 lg:grid-cols-1">
                  {s.galerija.map((g) => (
                    <div key={g.src} className="otkrij zum-slike relative aspect-[4/5] overflow-hidden rounded-[20px]">
                      <Image
                        src={g.src}
                        alt={g.alt}
                        fill
                        sizes="(min-width: 1024px) 320px, (min-width: 768px) 372px, 50vw"
                        className="object-cover"
                        style={{ objectPosition: g.pozicija }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <nav aria-label="Srodni tretmani" className="mt-16 flex flex-col gap-4 border-t border-sand pt-10">
              <h2 className="m-0 text-[12px] font-semibold tracking-[0.3em] text-gold-deep uppercase">Srodni tretmani</h2>
              <div className="flex flex-wrap gap-2.5">
                {srodne.map((x) => (
                  <Link
                    key={x.slug}
                    href={putanjaStranice(x.slug)}
                    className="btn btn-secondary min-h-11 px-5 py-2.5 text-center"
                  >
                    {x.naziv}
                  </Link>
                ))}
                <Link href="/tretmani" className="btn btn-secondary pomak-strelice min-h-11 gap-2.5 px-5">
                  Cijeli cjenik
                  <span className="text-gold-deep">
                    <Ikona ime="strelica" size={16} strokeWidth={1.6} />
                  </span>
                </Link>
              </div>
            </nav>
          </div>
        </section>

        <InfoTraka upute />
        <PomocPriOdabiru />
      </main>
      <Footer />
    </>
  );
}

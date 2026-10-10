import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Ikona } from "@/components/Ikona";
import { studio } from "@/content/studio";
import { kategorije, upitHref, type Kategorija, type Tretman } from "@/content/tretmani";

export const metadata: Metadata = {
  title: "Tretmani i cjenik",
  description:
    "Cjenik masaža i tretmana u studiju Divine Healing, Ilica 322, Zagreb: terapeutska, tajlandska, sportska i relax masaža, antistres tretmani, hidžama i FOHOW BEM 3.0 masaže.",
  alternates: { canonical: "/tretmani" },
};

/** Alt tekstovi i object-position slika kategorija (docs/dizajn.md §7). */
const slikeKategorija: Record<string, { alt: string; pozicija: string }> = {
  masaze: { alt: "Sanja izvodi terapeutsku masažu leđa", pozicija: "50% 40%" },
  antistres: { alt: "Sanja izvodi antistres masažu lica i glave", pozicija: "50% 30%" },
  tijelo: { alt: "Drveni valjci i pomagala za maderoterapiju", pozicija: "50% 50%" },
  fohow: { alt: "FOHOW BEM 3.0 uređaj sa srebrnim rukavicama i gelovima za masažu", pozicija: "50% 60%" },
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
      <Header stranica="tretmani" />
      <main>
        <section className="grid bg-cream">
          <Image
            src="/images/zlatna-svila.jpg"
            alt=""
            width={2400}
            height={533}
            sizes="100vw"
            loading="eager"
            className="col-start-1 row-start-1 h-[150px] w-full self-end object-cover"
            style={{ objectPosition: "50% 40%" }}
          />
          <div className="relative col-start-1 row-start-1 mx-auto flex w-full max-w-[900px] flex-col items-center gap-5 px-6 pt-12 pb-[180px] text-center md:px-10 md:pt-16 md:pb-[190px]">
            <nav aria-label="Putanja" className="text-[13px] text-cocoa">
              <Link href="/" className="no-underline">
                Početna
              </Link>{" "}
              <span aria-hidden="true">/</span> <span aria-current="page">Tretmani i cjenik</span>
            </nav>
            <h1 className="m-0 font-serif text-[clamp(34px,4.4vw,60px)] leading-[1.15] font-medium">Tretmani i cjenik</h1>
            <div className="flex w-full max-w-[360px] items-center gap-3.5 text-gold">
              <span className="h-px flex-1 bg-gold-line" />
              <Ikona ime="lotos" vrsta="tretman" size={30} strokeWidth={1.2} />
              <span className="h-px flex-1 bg-gold-line" />
            </div>
            <p className="m-0 max-w-[620px] text-[16px] leading-[1.75] text-cocoa md:text-[17px]">
              Rezervirajte online putem Zoyye ili pošaljite upit — za tretmane s cijenom na upit javit ćemo vam se s
              detaljima. Cijene su u eurima.
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
          </div>
        </section>

        {kategorije.map((k, i) => (
          <SekcijaKategorije key={k.id} k={k} broj={i + 1} krem={i % 2 === 1} />
        ))}

        <section className="bg-ivory">
          <div className="wrap py-14 md:py-[clamp(64px,7vw,104px)]">
            <div className="flex flex-wrap items-center justify-between gap-x-14 gap-y-8 rounded-[28px] border border-sand-dark bg-cream p-7 md:rounded-[32px] md:p-[clamp(32px,4vw,56px)]">
              <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-3.5">
                <h2 className="m-0 font-serif text-[clamp(26px,2.6vw,34px)] leading-[1.25] font-medium">
                  Niste sigurni koji tretman odabrati?
                </h2>
                <p className="lead m-0">
                  Nazovite ili pošaljite upit — zajedno ćemo odabrati tretman koji vam najbolje odgovara.
                </p>
              </div>
              <div className="flex w-full flex-col gap-3.5 sm:w-auto sm:flex-row sm:flex-wrap">
                <a href={studio.telefonHref} className="btn btn-secondary btn-lg px-7 tracking-[0.08em]">
                  <span className="text-gold-deep">
                    <Ikona ime="telefon" size={18} />
                  </span>
                  {studio.telefon}
                </a>
                <Link href={upitHref("savjet")} className="btn btn-primary btn-lg px-[30px]">
                  Pošalji upit
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function SekcijaKategorije({ k, broj, krem }: { k: Kategorija; broj: number; krem: boolean }) {
  const tamno = !!k.tamnaSekcija;
  const slika = slikeKategorija[k.id];
  const linija = tamno ? "border-espresso-line" : krem ? "border-sand-mid" : "border-sand";
  const pozadina = tamno ? "bg-espresso text-cream" : krem ? "border-t border-sand bg-cream" : "border-t border-sand bg-ivory";

  return (
    <section id={k.id} className={`scroll-mt-0 ${broj === 1 ? "bg-ivory" : pozadina}`}>
      <div className="wrap flex flex-wrap items-start gap-x-[72px] gap-y-10 py-14 md:gap-y-12 md:py-[clamp(64px,7vw,104px)]">
        <div className="flex w-full max-w-[400px] min-w-0 flex-[1_1_320px] flex-col gap-[18px]">
          <div className={`eyebrow ${tamno ? "text-gold-light" : ""}`}>{String(broj).padStart(2, "0")}</div>
          <h2 className={`h2-sm ${tamno ? "text-ivory" : ""}`}>{k.naziv}</h2>
          {k.slogan && <p className="m-0 font-serif text-[19px] leading-[1.45] text-gold-light">{k.slogan}</p>}
          <p className={`m-0 text-[16px] leading-[1.75] ${tamno ? "text-on-dark" : "text-cocoa"}`}>{k.uvod}</p>
          <div className="arch relative mt-3 aspect-[4/3] w-full overflow-hidden">
            <Image
              src={k.slika}
              alt={slika?.alt ?? ""}
              fill
              sizes="(min-width: 1024px) 400px, 100vw"
              className="object-cover"
              style={{ objectPosition: slika?.pozicija }}
            />
          </div>
        </div>
        <div className={`min-w-0 flex-[999_1_560px] border-t ${linija}`}>
          {k.tretmani.map((t) => (
            <RedTretmana key={t.id} t={t} tamno={tamno} linija={linija} />
          ))}
        </div>
      </div>
    </section>
  );
}

function RedTretmana({ t, tamno, linija }: { t: Tretman; tamno: boolean; linija: string }) {
  const sporedni = tamno ? "text-on-dark" : "text-cocoa";
  const cijenaBoja = tamno ? "text-gold-light" : "text-espresso";
  const gumb = "btn min-h-11 min-w-[128px] px-5 text-[11px]";

  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-4 border-b py-6 md:gap-x-6 ${linija}`}>
      <span className={`h-[52px] w-[52px] ${tamno ? "icon-ring-dark" : "icon-ring"}`}>
        <Ikona ime={t.ikona} vrsta="tretman" size={24} />
      </span>
      <div className="flex min-w-0 flex-[1_1_200px] flex-col gap-1.5 md:flex-[1_1_300px]">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <h3 className={`m-0 text-[14px] font-semibold tracking-[0.14em] uppercase md:text-[15px] ${tamno ? "text-ivory" : "text-espresso"}`}>
            {t.naziv}
          </h3>
          {t.oznaka && (
            <span className="inline-flex min-h-6 items-center rounded-full border border-sand-dark bg-cream px-2.5 text-[11px] font-semibold tracking-[0.08em] text-gold-deep">
              {t.oznaka}
            </span>
          )}
        </div>
        <p className={`m-0 text-[15px] leading-[1.6] ${sporedni}`}>{t.opis}</p>
      </div>
      <div className="ml-auto flex items-center gap-5">
        {t.naUpit ? (
          <>
            <span className={`min-w-20 text-right font-serif text-[18px] font-medium ${tamno ? "text-gold-light" : "text-gold-deep"}`}>
              Na upit
            </span>
            <Link
              href={upitHref(t.id)}
              aria-label={`Pošalji upit — ${t.naziv}`}
              className={`${gumb} ${
                tamno
                  ? "bg-gold-light text-espresso hover:bg-cream hover:text-espresso"
                  : "border-sand-dark bg-cream text-espresso hover:bg-sand hover:text-espresso"
              }`}
            >
              Pošalji upit
            </Link>
          </>
        ) : (
          <>
            <span className="flex min-w-20 flex-col items-end gap-0.5">
              {t.opcije.length === 1 ? (
                <>
                  <span className={`font-serif text-[24px] font-medium ${cijenaBoja}`}>{t.opcije[0].cijenaEur} €</span>
                  <span className={`text-[13px] ${sporedni}`}>{t.opcije[0].trajanjeMin} min</span>
                </>
              ) : (
                t.opcije.map((o) => (
                  <span key={o.trajanjeMin} className="flex items-baseline gap-2.5">
                    <span className={`text-[13px] ${sporedni}`}>{o.trajanjeMin} min</span>
                    <span className={`font-serif text-[20px] font-medium ${cijenaBoja}`}>{o.cijenaEur} €</span>
                  </span>
                ))
              )}
            </span>
            <a
              href={studio.zoyya}
              aria-label={`Rezerviraj: ${t.naziv}`}
              className={`${gumb} ${
                tamno
                  ? "border-gold-light text-gold-light hover:bg-gold-light hover:text-espresso"
                  : "border-gold text-espresso hover:bg-cream hover:text-espresso"
              }`}
            >
              Rezerviraj
            </a>
          </>
        )}
      </div>
    </div>
  );
}

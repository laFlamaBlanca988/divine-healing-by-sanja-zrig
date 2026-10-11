import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Ikona } from "@/components/Ikona";
import { UpitForma } from "@/components/UpitForma";
import { studio } from "@/content/studio";
import { istaknutiTretmani, kategorija, takoderRecenica, upitHref, type Tretman } from "@/content/tretmani";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/** Alt tekstovi i object-position iz docs/dizajn.md §7 (gdje ih tablica nema, iz artboarda). */
const slikeTretmana: Record<string, { alt: string; pozicija: string }> = {
  "/images/terapeutska-masaza-ledja.jpg": { alt: "Sanja izvodi terapeutsku masažu leđa", pozicija: "50% 45%" },
  "/images/tajlandska-istezanje-sjedeci.jpg": {
    alt: "Sanja izvodi tradicionalnu tajlandsku masažu — istezanje u sjedećem položaju",
    pozicija: "50% 35%",
  },
  "/images/relax-masaza.jpg": { alt: "Relax masaža preko ručnika", pozicija: "50% 45%" },
  "/images/antistres-lice-glava.jpg": { alt: "Sanja izvodi antistres masažu lica i glave", pozicija: "50% 30%" },
  "/images/sportska-masaza.jpg": { alt: "Sportska masaža leđa", pozicija: "50% 40%" },
  "/images/maderoterapija-valjci.jpg": { alt: "Drveni valjci i pomagala za maderoterapiju", pozicija: "50% 50%" },
};

const galerija = [
  { src: "/images/tajlandska-istezanje-ramena.jpg", alt: "Tajlandska masaža — istezanje ramena" },
  { src: "/images/abdominalna-masaza.jpg", alt: "Abdominalna masaža" },
  { src: "/images/tajlandska-istezanje-ruke.jpg", alt: "Tajlandska masaža — istezanje ruku i leđa" },
  { src: "/images/masaza-vrata.jpg", alt: "Masaža vrata i ramena" },
];

export default function Pocetna() {
  return (
    <>
      <Header stranica="pocetna" />
      <main>
        <Hero />
        <InfoTraka />
        <Najtrazeniji />
        <Fohow />
        <OMeni />
        <Galerija />
        <UpitIKontakt />
      </main>
      <Footer />
    </>
  );
}

function Hero() {
  return (
    <section className="bg-ivory">
      <div className="wrap flex flex-wrap items-center gap-x-20 gap-y-12 pt-8 pb-12 md:gap-y-16 md:pt-[clamp(48px,6vw,88px)] md:pb-[clamp(72px,8vw,112px)]">
        <div className="flex min-w-0 flex-[1_1_500px] flex-col gap-[22px] md:gap-7">
          <div className="eyebrow flex items-center gap-3.5">
            <span className="hidden h-px w-7 bg-gold-line sm:block md:w-10" />
            Massage &amp; Wellness Studio · Zagreb
          </div>
          <h1 className="h1 text-espresso">
            Prostor u kojem ćete se osjećati <span className="text-gold-deep">i biti bolje</span>
          </h1>
          <p className="m-0 max-w-[540px] text-[16px] leading-[1.7] text-cocoa md:text-[17px] md:leading-[1.75]">
            Terapeutska, tajlandska, sportska i relax masaža, antistres tretmani, hidžama i FOHOW BEM 3.0
            bio-meridijanske masaže — s individualnim pristupom i punom posvećenošću svakom klijentu.
          </p>
          <div className="mt-1 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-3.5">
            <a href={studio.zoyya} className="btn btn-primary btn-lg gap-3">
              Rezerviraj termin
              <Ikona ime="strelica" size={18} />
            </a>
            <Link href="/#upit" className="btn btn-secondary btn-lg">
              Pošalji upit
            </Link>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-1 border-t border-sand pt-6 text-[15px]">
            <a href={studio.telefonHref} className="inline-flex min-h-11 items-center gap-2.5 text-espresso no-underline">
              <span className="text-gold-deep">
                <Ikona ime="telefon" size={20} strokeWidth={1.4} />
              </span>
              {studio.telefon}
            </a>
            <a href={studio.instagram} className="inline-flex min-h-11 items-center gap-2.5 text-espresso no-underline">
              <span className="text-gold-deep">
                <Ikona ime="instagram" size={20} strokeWidth={1.4} />
              </span>
              {studio.instagramHandle}
            </a>
          </div>
        </div>

        <div className="flex min-w-0 flex-[1_1_400px] justify-center pt-3 md:pt-0">
          <div className="relative aspect-[470/620] w-full max-w-[470px] max-md:aspect-auto max-md:h-[440px]">
            <div className="arch absolute -top-3 -right-3 bottom-3 left-3 border border-gold-line md:-top-[18px] md:-right-[18px] md:bottom-[18px] md:left-[18px]" />
            <Image
              src="/images/studio-sanja.jpg"
              alt="Sanja u studiju Divine Healing uz klijenticu na stolu za masažu"
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1024px) 470px, 100vw"
              className="arch object-cover"
              style={{ objectPosition: "50% 72%" }}
            />
            <div className="absolute bottom-6 left-3 flex items-center gap-3.5 rounded-full border border-sand bg-white-warm py-3 pr-6 pl-3 shadow-[0_18px_40px_-18px_rgba(46,33,25,0.35)] md:bottom-11 md:-left-9">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-cream text-gold-deep">
                <Ikona ime="sat" size={20} strokeWidth={1.4} />
              </span>
              <span className="flex flex-col gap-0.5">
                <span className="text-[14px] font-semibold">Pon – Pet 10 – 21 h</span>
                <span className="text-[13px] text-cocoa">Subota 13 – 19 h</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoStavka({ ikona, naslov, children }: { ikona: string; naslov: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-4 md:gap-[18px]">
      <span className="icon-ring h-12 w-12 md:h-14 md:w-14">
        <Ikona ime={ikona} size={24} strokeWidth={1.3} />
      </span>
      <div className="flex flex-col gap-1">
        <span className="text-[12px] font-semibold tracking-[0.18em] text-gold-deep uppercase">{naslov}</span>
        {children}
      </div>
    </div>
  );
}

function InfoTraka() {
  return (
    <section className="border-y border-sand bg-cream">
      <div className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-x-14 gap-y-5 py-8 md:gap-y-8 md:py-11">
        <InfoStavka ikona="lokacija" naslov="Adresa">
          <span className="text-[15px] font-medium md:text-[16px]">
            {studio.adresa}, {studio.grad}
          </span>
          <span className="text-[14px] text-cocoa">{studio.kvart}</span>
        </InfoStavka>
        <InfoStavka ikona="sat" naslov="Radno vrijeme">
          <span className="text-[15px] font-medium md:text-[16px]">Pon – Pet: 10:00 – 21:00</span>
          <span className="text-[14px] text-cocoa">Subota: 13:00 – 19:00 · Nedjelja: zatvoreno</span>
        </InfoStavka>
        <InfoStavka ikona="telefon" naslov="Kontakt">
          <a href={studio.telefonHref} className="inline-flex min-h-11 items-center self-start text-[15px] font-medium text-espresso no-underline md:text-[16px]">
            {studio.telefon}
          </a>
          <a href={`mailto:${studio.email}`} className="-mt-1 inline-flex min-h-11 items-center self-start text-[14px] text-cocoa no-underline">
            {studio.email}
          </a>
        </InfoStavka>
      </div>
    </section>
  );
}

function KarticaTretmana({ t }: { t: Tretman }) {
  const slika = t.slika ? slikeTretmana[t.slika] : undefined;
  const opcija = t.opcije[0];
  return (
    <article className="flex w-[272px] flex-none snap-start flex-col overflow-hidden rounded-3xl border border-sand bg-white-warm md:w-auto">
      {t.slika && (
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={t.slika}
            alt={slika?.alt ?? ""}
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 272px"
            className="object-cover"
            style={{ objectPosition: slika?.pozicija }}
          />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-3 px-5 pt-5 pb-4 md:px-6 md:pt-6 md:pb-[22px]">
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold tracking-[0.12em] text-gold-deep uppercase">
            {opcija && (
              <>
                <Ikona ime="sat" size={15} strokeWidth={1.6} />
                {opcija.trajanjeMin} min
              </>
            )}
          </span>
          <span className="font-serif text-[22px] font-medium md:text-[26px]">
            {opcija ? `${opcija.cijenaEur} €` : "Na upit"}
          </span>
        </div>
        <h3 className="m-0 text-[14px] leading-[1.4] font-semibold tracking-[0.12em] uppercase md:text-[15px]">{t.naziv}</h3>
        <p className="m-0 text-[14px] leading-[1.6] text-cocoa md:text-[15px]">{t.kratkiOpis ?? t.opis}</p>
        <a
          href={studio.zoyya}
          aria-label={`Rezerviraj: ${t.naziv}`}
          className="mt-auto inline-flex min-h-11 items-center gap-2.5 self-start text-[12px] font-semibold tracking-[0.16em] uppercase no-underline"
        >
          Rezerviraj <Ikona ime="strelica" size={16} strokeWidth={1.6} />
        </a>
      </div>
    </article>
  );
}

function Najtrazeniji() {
  return (
    <section id="tretmani" className="section-y bg-ivory">
      <div className="wrap">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-x-12 gap-y-6 md:mb-12">
          <div className="flex max-w-[640px] flex-col gap-3 md:gap-4">
            <div className="eyebrow">Najtraženiji tretmani</div>
            <h2 className="h2">Masaže i tretmani</h2>
            <p className="lead m-0">
              Tretmani su terapeutskog tipa i prilagođavaju se vašem tijelu — od dubinskog rada na napetim mišićima do
              potpunog opuštanja.
            </p>
          </div>
          <Link href="/tretmani" className="btn btn-secondary hidden min-h-[52px] gap-3 px-7 md:inline-flex">
            Cijeli cjenik
            <span className="text-gold-deep">
              <Ikona ime="strelica" size={18} />
            </span>
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-[1240px] md:px-10">
        <div className="no-scrollbar flex snap-x snap-mandatory scroll-px-6 gap-3.5 overflow-x-auto px-6 pb-2 md:grid md:grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] md:gap-7 md:overflow-visible md:px-0 md:pb-0">
          {istaknutiTretmani.map((t) => (
            <KarticaTretmana key={t.id} t={t} />
          ))}
        </div>
      </div>

      <div className="wrap">
        <p className="mt-6 mb-0 text-center text-[15px] leading-[1.7] text-cocoa md:mt-9">
          Također: {takoderRecenica()}.{" "}
          <Link href="/tretmani" className="font-semibold">
            Pogledajte cijeli cjenik
          </Link>
        </p>
        <Link href="/tretmani" className="btn btn-secondary mt-6 flex min-h-[52px] gap-3 md:hidden">
          Cijeli cjenik
          <span className="text-gold-deep">
            <Ikona ime="strelica" size={18} />
          </span>
        </Link>
      </div>
    </section>
  );
}

function Fohow() {
  const k = kategorija("fohow");
  const naslov = (k.slogan ?? "").replace(/\.$/, "");
  return (
    <section id="fohow" className="bg-espresso text-cream">
      <div className="wrap section-y flex flex-wrap items-center gap-x-20 gap-y-8 md:gap-y-14">
        <div className="relative w-full max-w-[500px] min-w-0 flex-[1_1_400px]">
          <div className="absolute top-[18px] right-[18px] -bottom-[18px] -left-[18px] hidden rounded-[28px] border border-bronze-line md:block" />
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[22px] md:aspect-[4/5] md:rounded-[28px]">
            <Image
              src="/images/fohow-bem-uredaj.jpg"
              alt="FOHOW BEM 3.0 uređaj sa srebrnim rukavicama i gelovima za masažu"
              fill
              sizes="(min-width: 1024px) 500px, 100vw"
              className="object-cover"
              style={{ objectPosition: "50% 50%" }}
            />
          </div>
        </div>
        <div className="flex min-w-0 flex-[1_1_500px] flex-col gap-5 md:gap-6">
          <div className="eyebrow text-gold-light">{k.naziv}</div>
          <h2 className="h2 text-ivory">
            {naslov}
          </h2>
          <p className="m-0 text-[15px] leading-[1.7] text-on-dark md:text-[16px] md:leading-[1.75]">
            FOHOW BEM 3.0 uređaj i srebrne rukavice stimuliraju meridijanske puteve i šalju blage bio-električne signale
            kroz fasciju i živce — tretman koji ide dublje od same masaže rukama.
          </p>
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="mr-1 text-[13px] text-on-dark">Možete osjetiti:</span>
            {["valove kroz tijelo", "duboko oslobađanje", "trenutnu lakoću"].map((p) => (
              <span
                key={p}
                className="inline-flex min-h-9 items-center rounded-full border border-bronze-line px-4 text-[13px] text-cream"
              >
                {p}
              </span>
            ))}
          </div>
          <ul className="m-0 flex list-none flex-col border-t border-espresso-line p-0">
            {k.tretmani.map((t) => (
              <li
                key={t.id}
                className="flex items-center justify-between gap-3.5 border-b border-espresso-line py-3.5 md:gap-5 md:py-4"
              >
                <span className="text-[13px] leading-[1.45] font-medium tracking-[0.08em] text-ivory uppercase md:text-[14px] md:tracking-[0.1em]">
                  {t.naziv}
                </span>
                {t.naUpit ? (
                  <Link
                    href={upitHref(t.id)}
                    aria-label={`Na upit — ${t.naziv}`}
                    className="inline-flex min-h-11 flex-none items-center font-serif text-[16px] text-gold-light underline-offset-4 hover:text-ivory md:text-[17px]"
                  >
                    Na upit
                  </Link>
                ) : (
                  <span className="flex flex-none flex-col items-end md:flex-row md:items-baseline md:gap-3.5">
                    <span className="order-2 text-[12px] text-on-dark md:order-1 md:text-[13px]">
                      {t.opcije.map((o) => `${o.trajanjeMin} min`).join(" / ")}
                    </span>
                    <span className="order-1 font-serif text-[19px] text-gold-light md:order-2 md:min-w-12 md:text-right md:text-[22px]">
                      {t.opcije.map((o) => `${o.cijenaEur} €`).join(" / ")}
                    </span>
                  </span>
                )}
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3.5 sm:flex-row sm:flex-wrap">
            <a href={studio.zoyya} className="btn btn-dark min-h-[54px] px-[30px]">
              Rezerviraj BEM 3.0 masažu
            </a>
            <Link href="/tretmani#fohow" className="btn btn-dark-outline min-h-[54px] px-7">
              Opisi tretmana
              <span className="text-gold-light">
                <Ikona ime="strelica" size={16} strokeWidth={1.6} />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function OMeni() {
  return (
    <section id="o-meni" className="bg-ivory">
      <div className="wrap section-y flex flex-wrap items-center gap-x-24 gap-y-14 md:gap-y-[72px]">
        <div className="flex min-w-0 flex-[1_1_400px] justify-center">
          <div className="relative aspect-[440/560] w-[min(100%,440px)] max-md:mr-2">
            <div className="arch absolute -top-3 right-3 bottom-3 -left-3 border border-gold-line md:-top-[18px] md:right-[18px] md:bottom-[18px] md:-left-[18px]" />
            <Image
              src="/images/sanja-tajlandska-osmijeh.jpg"
              alt="Sanja Zrig tijekom tajlandske masaže, nasmijana"
              fill
              sizes="(min-width: 1024px) 440px, 100vw"
              className="arch object-cover"
              style={{ objectPosition: "50% 30%" }}
            />
            <div className="absolute -right-2 -bottom-6 aspect-square w-[38%] overflow-hidden rounded-full border-8 border-ivory md:-right-8 md:-bottom-8 md:w-[44%]">
              <Image
                src="/images/sanja-masaza-glave.jpg"
                alt="Sanja masira glavu i vrat klijentice"
                fill
                sizes="200px"
                className="object-cover"
                style={{ objectPosition: "50% 18%" }}
              />
            </div>
          </div>
        </div>
        <div className="flex min-w-0 flex-[1_1_480px] flex-col gap-[18px] md:gap-[22px]">
          <div className="eyebrow">O meni</div>
          <h2 className="m-0 font-script text-[40px] leading-[1.05] font-medium text-gold-deep md:text-[clamp(42px,4.2vw,58px)] md:leading-none">
            Pozdrav, ja sam Sanja
          </h2>
          <blockquote className="m-0 font-serif text-[19px] leading-[1.45] text-espresso md:text-[clamp(21px,2vw,25px)]">
            „Za mene je masaža više od posla – to je poziv koji nosim u srcu.”
          </blockquote>
          <p className="m-0 text-[15px] leading-[1.75] text-cocoa md:text-[16px] md:leading-[1.8]">
            Moji tretmani su terapeutskog tipa, a moj prvi instinkt uvijek je pomoći klijentu da se osjeća bolje.
          </p>
          <p className="m-0 text-[15px] leading-[1.75] text-cocoa md:text-[16px] md:leading-[1.8]">
            Svakom se klijentu posvećujem u potpunosti, u okviru svojih mogućnosti, s individualnim pristupom i punim
            poštovanjem. Povjerenje koje mi pružate iznimno cijenim – i zato ga nastojim uzvratiti jednako iskreno i s
            poštovanjem.
          </p>
          <p className="m-0 text-[15px] leading-[1.75] text-espresso md:text-[16px] md:leading-[1.8]">
            Ako osjetite želju za suradnjom sa mnom, rezervirajte svoj termin. Dobro mi došli!
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-x-7 gap-y-4">
            <span className="font-script text-[30px] text-gold-deep md:text-[34px]">Sanja Zrig</span>
            <a href={studio.zoyya} className="btn btn-primary min-h-[52px] px-7">
              Rezerviraj termin
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Galerija() {
  return (
    <section className="border-t border-sand bg-cream">
      <div className="wrap section-y flex flex-col gap-5 md:gap-9">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <div className="flex flex-col gap-3">
            <div className="eyebrow">Iz studija</div>
            <h2 className="h2-sm">Trenuci opuštanja</h2>
          </div>
          <a href={studio.instagram} className="btn btn-secondary hidden tracking-[0.14em] md:inline-flex">
            <span className="text-gold-deep">
              <Ikona ime="instagram" size={18} />
            </span>
            Pratite na Instagramu
          </a>
        </div>
        <div className="grid grid-cols-2 gap-2.5 md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] md:gap-4">
          {galerija.map((s) => (
            <div key={s.src} className="relative aspect-[4/5] overflow-hidden rounded-[20px]">
              <Image src={s.src} alt={s.alt} fill sizes="(min-width: 1024px) 240px, 50vw" className="object-cover" />
            </div>
          ))}
          <a
            href={studio.instagram}
            className="hidden aspect-[4/5] flex-col items-center justify-center gap-3 rounded-[20px] bg-espresso p-5 text-center text-gold-light no-underline hover:text-gold-light md:flex"
          >
            <Ikona ime="instagram" size={36} strokeWidth={1.3} />
            <span className="text-[14px] font-semibold text-ivory">{studio.instagramHandle}</span>
            <span className="text-[13px] text-on-dark">Više fotografija na Instagramu</span>
          </a>
        </div>
        <a
          href={studio.instagram}
          className="btn min-h-[52px] bg-espresso tracking-[0.12em] text-gold-light normal-case hover:text-ivory md:hidden"
        >
          <Ikona ime="instagram" size={18} />
          {studio.instagramHandle}
        </a>
      </div>
    </section>
  );
}

function UpitIKontakt() {
  return (
    <section id="upit" className="scroll-mt-2 bg-ivory">
      <div className="section-y mx-auto flex max-w-[1240px] flex-wrap items-start gap-6 px-6 md:gap-10 md:px-10">
        <div className="min-w-0 flex-[999_1_560px] rounded-[28px] border border-sand bg-white-warm p-6 md:rounded-[32px] md:p-[clamp(28px,4vw,52px)]">
          <UpitForma />
        </div>

        <aside
          id="kontakt"
          className="flex min-w-0 flex-[1_1_400px] scroll-mt-6 flex-col gap-[22px] rounded-[28px] bg-espresso px-[22px] py-7 text-on-dark md:gap-[26px] md:rounded-[32px] md:p-[clamp(28px,3.5vw,44px)]"
        >
          <div className="flex flex-col gap-2.5">
            <div className="eyebrow text-gold-light">Kontakt</div>
            <h2 className="m-0 font-serif text-[26px] leading-[1.2] font-medium text-ivory md:text-[30px]">Posjetite studio</h2>
          </div>
          <ul className="m-0 flex list-none flex-col border-t border-espresso-line p-0">
            <li className="flex items-start gap-4 border-b border-espresso-line py-4">
              <span className="mt-0.5 flex-none text-gold-light">
                <Ikona ime="lokacija" size={22} strokeWidth={1.4} />
              </span>
              <span className="flex flex-col gap-1">
                <span className="text-[16px] text-ivory">
                  {studio.adresa}, {studio.postanskiBroj} {studio.grad}
                </span>
                <span className="text-[14px]">{studio.kvart}</span>
                <a href={studio.karta} className="inline-flex min-h-11 items-center self-start text-[14px] font-semibold text-gold-light hover:text-ivory">
                  Upute do studija
                </a>
              </span>
            </li>
            {[
              { ikona: "telefon", href: studio.telefonHref, tekst: studio.telefon },
              { ikona: "email", href: `mailto:${studio.email}`, tekst: studio.email },
              { ikona: "instagram", href: studio.instagram, tekst: studio.instagramHandle },
            ].map((r) => (
              <li key={r.ikona} className="border-b border-espresso-line">
                <a
                  href={r.href}
                  className="flex min-h-[54px] items-center gap-4 text-[16px] break-all text-ivory no-underline hover:text-gold-light"
                >
                  <span className="flex-none text-gold-light">
                    <Ikona ime={r.ikona} size={22} strokeWidth={1.4} />
                  </span>
                  {r.tekst}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-2.5">
            <span className="text-[12px] font-semibold tracking-[0.2em] text-gold-light uppercase">Radno vrijeme</span>
            {[
              ["Ponedjeljak – Petak", "10:00 – 21:00"],
              ["Subota", "13:00 – 19:00"],
              ["Nedjelja", "zatvoreno"],
            ].map(([d, v]) => (
              <div key={d} className="flex justify-between gap-4 text-[14px] md:text-[15px]">
                <span>{d}</span>
                <span className="whitespace-nowrap text-ivory">{v}</span>
              </div>
            ))}
          </div>
          <a href={studio.zoyya} className="btn btn-dark min-h-[54px] px-4 text-[11px] tracking-[0.12em] sm:text-[12px] sm:tracking-[0.16em]">
            <Ikona ime="kalendar" size={18} />
            Online rezervacija — Zoyya
          </a>
        </aside>
      </div>
    </section>
  );
}

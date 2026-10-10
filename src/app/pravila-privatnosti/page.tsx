import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { studio } from "@/content/studio";

// NACRT: tekst treba pregledati i potvrditi naručitelj (po potrebi pravni savjetnik) prije objave.

export const metadata: Metadata = {
  title: "Pravila privatnosti",
  description: "Kako Divine Healing by Sanja Zrig postupa s osobnim podacima poslanim putem forme za upit.",
  alternates: { canonical: "/pravila-privatnosti" },
  robots: { index: false },
};

const h2 = "m-0 mt-4 font-serif text-[22px] leading-[1.3] font-medium md:text-[26px]";

export default function PravilaPrivatnosti() {
  return (
    <>
      <Header />
      <main className="bg-ivory">
        <article className="mx-auto flex max-w-[780px] flex-col gap-5 px-6 py-14 text-[16px] leading-[1.75] text-cocoa md:px-10 md:py-[clamp(64px,7vw,104px)]">
          <nav aria-label="Putanja" className="text-[13px]">
            <Link href="/" className="no-underline">
              Početna
            </Link>{" "}
            <span aria-hidden="true">/</span> <span aria-current="page">Pravila privatnosti</span>
          </nav>

          <div
            role="note"
            className="rounded-2xl border border-error/40 bg-error/5 px-5 py-4 text-[15px] leading-[1.6] text-error"
          >
            <strong className="tracking-[0.12em] uppercase">Nacrt — nije konačni tekst.</strong> Ovaj tekst je
            privremen i služi samo kao predložak. Prije objave stranice mora ga pregledati i potvrditi vlasnica studija
            (po potrebi uz pravni savjet).
          </div>

          <div className="eyebrow">Zaštita podataka</div>
          <h1 className="m-0 font-serif text-[clamp(32px,4vw,52px)] leading-[1.15] font-medium text-espresso">
            Pravila privatnosti
          </h1>
          <p className="m-0">Posljednja izmjena: [datum — upisati prije objave]</p>

          <h2 className={`${h2} text-espresso`}>1. Voditelj obrade</h2>
          <p className="m-0">
            {studio.naziv}, {studio.adresa}, {studio.postanskiBroj} {studio.grad} [puni naziv obrta/tvrtke i OIB —
            upisati]. Kontakt za pitanja o privatnosti:{" "}
            <a href={`mailto:${studio.email}`}>{studio.email}</a>, {studio.telefon}.
          </p>

          <h2 className={`${h2} text-espresso`}>2. Koje podatke prikupljamo</h2>
          <p className="m-0">
            Putem forme za upit prikupljamo samo podatke koje sami upišete: ime i prezime, broj telefona, e-mail adresu
            (ako je navedete), željeni datum i vrijeme, odabrani tretman, željeni način kontakta i sadržaj poruke.
            Molimo vas da u poruku ne upisujete podatke o zdravlju osim ako su nužni za odabir tretmana.
          </p>

          <h2 className={`${h2} text-espresso`}>3. Svrha i pravna osnova</h2>
          <p className="m-0">
            Podatke koristimo isključivo kako bismo odgovorili na vaš upit i dogovorili termin. Pravna osnova je vaša
            privola (čl. 6. st. 1. t. (a) Opće uredbe o zaštiti podataka) te poduzimanje radnji na vaš zahtjev prije
            sklapanja ugovora (čl. 6. st. 1. t. (b)).
          </p>

          <h2 className={`${h2} text-espresso`}>4. Kako se podaci obrađuju i koliko dugo se čuvaju</h2>
          <p className="m-0">
            Upit se ne sprema u bazu podataka na web stranici — prosljeđuje se e-mailom vlasnici studija putem servisa
            za slanje e-pošte [naziv servisa, npr. Resend — potvrditi]. Poruke čuvamo samo onoliko koliko je potrebno
            za odgovor i dogovor termina, a najdulje [rok — upisati].
          </p>

          <h2 className={`${h2} text-espresso`}>5. Primatelji podataka</h2>
          <p className="m-0">
            Podatke ne prodajemo niti ih dijelimo s trećim stranama u marketinške svrhe. Pristup imaju samo pružatelji
            usluga nužnih za rad stranice i slanje e-pošte (hosting [naziv — upisati] i servis za e-poštu), koji ih
            obrađuju u naše ime. Online rezervacije putem Zoyye podliježu pravilima privatnosti Zoyye.
          </p>

          <h2 className={`${h2} text-espresso`}>6. Vaša prava</h2>
          <p className="m-0">
            Imate pravo na pristup, ispravak i brisanje svojih podataka, ograničenje obrade, prigovor te povlačenje
            privole u bilo kojem trenutku, bez utjecaja na zakonitost obrade prije povlačenja. Zahtjev možete poslati na{" "}
            <a href={`mailto:${studio.email}`}>{studio.email}</a>. Imate i pravo podnijeti prigovor Agenciji za zaštitu
            osobnih podataka (AZOP, azop.hr).
          </p>

          <h2 className={`${h2} text-espresso`}>7. Kolačići</h2>
          <p className="m-0">
            Stranica ne koristi kolačiće za praćenje ni analitiku. [Ažurirati ako se doda analitika ili ugrađena karta.]
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}

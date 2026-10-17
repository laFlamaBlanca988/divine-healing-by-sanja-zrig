import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { izvrsitelji, OPIS_POLJA, pravilaSpremna, privatnost } from "@/content/privatnost";
import { studio } from "@/content/studio";
import { formatirajDatum } from "@/lib/upit";

// Tekst treba pregledati vlasnica studija (po potrebi uz pravni savjet). Podaci koji nedostaju upisuju se
// u src/content/privatnost.ts; dok ih nema, stranica nije indeksirana i prazna mjesta su označena.

export const metadata: Metadata = {
  title: "Pravila privatnosti",
  description:
    "Kako Divine Healing by Sanja Zrig obrađuje osobne podatke poslane putem forme za upit, telefonom ili e-mailom te koja su vaša prava.",
  alternates: { canonical: "/pravila-privatnosti" },
  robots: pravilaSpremna ? undefined : { index: false },
};

const poveznica = "underline decoration-gold-line decoration-1 underline-offset-4";
const h2 = "m-0 mt-4 font-serif text-[22px] leading-[1.3] font-medium text-espresso md:text-[26px]";
const lista = "m-0 flex list-disc flex-col gap-2 pl-5 marker:text-gold";

/** Vrijednost iz src/content/privatnost.ts ili istaknuto prazno mjesto dok nije upisana. */
function Podatak({ polje }: { polje: keyof typeof privatnost }) {
  const v = privatnost[polje];
  if (v) return <>{polje === "datumIzmjene" ? formatirajDatum(v).replace(/^\S+, /, "") : v}</>;
  return (
    <mark className="rounded bg-error/10 px-1 text-error">[{OPIS_POLJA[polje]}: upisati]</mark>
  );
}

export default function PravilaPrivatnosti() {
  const email = (
    <a href={`mailto:${studio.email}`} className={poveznica}>
      {studio.email}
    </a>
  );

  return (
    <>
      <Header />
      <main className="bg-ivory">
        <article className="mx-auto flex max-w-[780px] flex-col gap-5 px-6 py-14 text-[16px] leading-[1.75] text-cocoa md:px-10 md:py-[clamp(64px,7vw,104px)]">
          <nav aria-label="Putanja" className="text-[13px]">
            <Link href="/" className="inline-flex min-h-11 items-center underline decoration-gold-line decoration-1 underline-offset-4">
              Početna
            </Link>{" "}
            <span aria-hidden="true">/</span> <span aria-current="page">Pravila privatnosti</span>
          </nav>

          {!pravilaSpremna && (
            <div
              role="note"
              className="rounded-2xl border border-error/40 bg-error/5 px-5 py-4 text-[15px] leading-[1.6] text-error"
            >
              <strong className="tracking-[0.12em] uppercase">Nisu upisani svi podaci.</strong> Istaknuta mjesta treba
              popuniti u <code>src/content/privatnost.ts</code> prije objave stranice.
            </div>
          )}

          <div className="eyebrow">Zaštita podataka</div>
          <h1 className="h1 text-espresso">Pravila privatnosti</h1>
          <p className="m-0">
            Vrijede od: <Podatak polje="datumIzmjene" />
          </p>
          <p className="m-0">
            Ova pravila objašnjavaju koje osobne podatke prikupljamo kada nam pošaljete upit putem ove stranice ili nas
            kontaktirate telefonom, porukom ili e-mailom, zašto ih koristimo, koliko ih dugo čuvamo i koja su vaša
            prava prema Općoj uredbi o zaštiti podataka (GDPR).
          </p>

          <h2 className={h2}>1. Tko obrađuje vaše podatke</h2>
          <p className="m-0">
            Voditelj obrade je <Podatak polje="voditelj" />, OIB <Podatak polje="oib" />, sa sjedištem na adresi{" "}
            <Podatak polje="sjediste" />. Studio {studio.naziv} nalazi se na adresi {studio.adresa},{" "}
            {studio.postanskiBroj} {studio.grad}.
          </p>
          <p className="m-0">
            Za sva pitanja o osobnim podacima javite nam se na {email} ili na {studio.telefon}.
          </p>

          <h2 className={h2}>2. Koje podatke prikupljamo</h2>
          <p className="m-0">Kada pošaljete upit putem forme, prikupljamo samo ono što sami upišete:</p>
          <ul className={lista}>
            <li>ime i prezime i broj telefona (obavezno, da vas možemo kontaktirati),</li>
            <li>e-mail adresu (ako je navedete),</li>
            <li>odabrani tretman, željeni datum i vrijeme te željeni način kontakta,</li>
            <li>sadržaj poruke.</li>
          </ul>
          <p className="m-0">
            Ako nas kontaktirate telefonom, SMS-om, WhatsAppom, Viberom ili e-mailom, obrađujemo vaš broj ili adresu i
            sadržaj razgovora odnosno poruke.
          </p>
          <p className="m-0">
            <strong className="font-semibold text-espresso">Podaci o zdravlju.</strong> U poruci možete navesti npr.
            bolove ili ozljede kako bismo vam preporučili odgovarajući tretman. To su posebno osjetljivi podaci, pa ih
            navedite samo ako su potrebni za odabir tretmana. Ako ih navedete, obrađujemo ih isključivo za tu svrhu.
          </p>
          <p className="m-0">
            Pri posjetu stranici poslužitelj na kojem je stranica smještena automatski bilježi tehničke podatke (IP
            adresu, vrijeme pristupa, vrstu preglednika) radi sigurnosti i ispravnog rada stranice.
          </p>
          <p className="m-0">
            Upite djece mlađe od 16 godina treba poslati roditelj ili skrbnik.
          </p>

          <h2 className={h2}>3. Svrha i pravna osnova</h2>
          <ul className={lista}>
            <li>
              Odgovor na upit i dogovor termina: poduzimanje radnji na vaš zahtjev prije sklapanja ugovora (čl. 6. st. 1.
              t. (b) GDPR-a) i vaša privola koju dajete označavanjem polja u formi (čl. 6. st. 1. t. (a)).
            </li>
            <li>
              Podaci o zdravlju koje sami navedete: vaša izričita privola (čl. 9. st. 2. t. (a) GDPR-a).
            </li>
            <li>
              Tehnički podaci o posjetu: legitimni interes za sigurnost i ispravan rad stranice (čl. 6. st. 1. t. (f)).
            </li>
          </ul>
          <p className="m-0">
            Podatke ne koristimo za oglašavanje, ne šaljemo vam promotivne poruke bez vašeg pristanka i ne donosimo
            automatizirane odluke ni profiliranje.
          </p>

          <h2 className={h2}>4. Kome se podaci otkrivaju</h2>
          <p className="m-0">
            Podatke ne prodajemo i ne dijelimo s trećima u marketinške svrhe. Pristup imaju samo pružatelji usluga
            nužnih za rad stranice i komunikaciju, koji ih obrađuju u naše ime ili prema vlastitim pravilima:
          </p>
          <ul className={lista}>
            <li>{izvrsitelji.hosting}: smještaj stranice (hosting),</li>
            <li>{izvrsitelji.email}: dostava upita iz forme e-mailom do studija,</li>
            <li>Google (Gmail): e-mail sandučić studija u koji stižu upiti,</li>
            <li>WhatsApp ili Viber: samo ako odaberete taj način kontakta.</li>
          </ul>

          <h2 className={h2}>5. Prijenos podataka izvan EU</h2>
          <p className="m-0">
            Neki od navedenih pružatelja usluga imaju sjedište u SAD-u. Prijenos podataka u tom se slučaju temelji na
            zaštitnim mjerama predviđenim GDPR-om, kao što su okvir EU-SAD za privatnost podataka ili standardne
            ugovorne klauzule Europske komisije.
          </p>

          <h2 className={h2}>6. Koliko dugo čuvamo podatke</h2>
          <p className="m-0">
            Upit se ne sprema u bazu podataka na stranici, nego se prosljeđuje e-mailom studiju. Upite i prepisku
            čuvamo onoliko koliko je potrebno za dogovor termina, a najdulje <Podatak polje="rokCuvanja" />, osim ako
            zakon ne propisuje dulji rok. Nakon toga ih brišemo.
          </p>

          <h2 className={h2}>7. Online rezervacija i vanjske poveznice</h2>
          <p className="m-0">
            Online rezervacija termina odvija se na platformi Zoyya, koja vaše podatke obrađuje prema vlastitim
            pravilima privatnosti. Isto vrijedi za Instagram i Google karte, na koje vode poveznice na ovoj stranici.
          </p>

          <h2 className={h2}>8. Kolačići</h2>
          <p className="m-0">
            Stranica ne koristi kolačiće, analitiku ni alate za praćenje, a fontovi se učitavaju s našeg poslužitelja.
            Zato se pri ulasku na stranicu ne prikazuje obavijest o kolačićima.
          </p>

          <h2 className={h2}>9. Sigurnost</h2>
          <p className="m-0">
            Stranica i forma koriste šifriranu vezu (HTTPS), a upiti se ne spremaju na samoj stranici.
          </p>

          <h2 className={h2}>10. Vaša prava</h2>
          <p className="m-0">U svakom trenutku imate pravo:</p>
          <ul className={lista}>
            <li>znati koje podatke o vama obrađujemo i dobiti njihovu kopiju,</li>
            <li>zatražiti ispravak netočnih podataka ili brisanje podataka,</li>
            <li>zatražiti ograničenje obrade i uložiti prigovor na obradu,</li>
            <li>zatražiti prijenos podataka koje ste nam dali,</li>
            <li>povući privolu, bez utjecaja na zakonitost obrade prije povlačenja.</li>
          </ul>
          <p className="m-0">
            Zahtjev pošaljite na {email}. Odgovorit ćemo najkasnije u roku od mjesec dana. Ako smatrate da su vaši
            podaci obrađeni protivno propisima, možete podnijeti prigovor Agenciji za zaštitu osobnih podataka (AZOP,{" "}
            <a href="https://azop.hr" className={poveznica}>
              azop.hr
            </a>
            ).
          </p>

          <h2 className={h2}>11. Izmjene pravila</h2>
          <p className="m-0">
            Ova pravila možemo povremeno izmijeniti, npr. ako uvedemo novu uslugu ili alat. Važeća verzija uvijek je
            objavljena na ovoj stranici, s datumom od kojeg vrijedi.
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}

import { SAVJET, stavkaZaVrijednost } from "@/content/tretmani";

/** Pravila forme za upit (docs/dizajn.md §5) — dijele ih klijent i Server Action. */

export const VREMENA = [
  { id: "jutro", label: "Jutro", sub: "10 – 13 h", subSubota: "9 – 13 h" },
  { id: "popodne", label: "Popodne", sub: "13 – 17 h", subSubota: "13 – 14 h" },
  { id: "vecer", label: "Večer", sub: "17 – 21 h" },
  { id: "svejedno", label: "Svejedno", sub: "bilo kada" },
] as const;

export const KONTAKTI = [
  { id: "poziv", label: "Poziv" },
  { id: "poruka", label: "SMS / WhatsApp / Viber" },
  { id: "email", label: "E-mail" },
] as const;

export type VrijemeId = (typeof VREMENA)[number]["id"];
export type KontaktId = (typeof KONTAKTI)[number]["id"];

/** Subotom studio radi 9 – 14 h, pa večernji termin nije moguć. */
export const SUBOTOM_ZATVORENO: VrijemeId = "vecer";

export const PORUKA_MAX = 1000;
export const MIN_VRIJEME_ISPUNE_MS = 3000;

export const PORUKE = {
  ime: "Upišite ime i prezime.",
  telefonPrazan: "Upišite broj telefona.",
  telefonNeispravan: "Provjerite broj telefona.",
  emailNeispravan: "Provjerite e-mail adresu.",
  emailPrazan: "Upišite e-mail ako želite odgovor e-mailom.",
  datumProslost: "Odaberite današnji ili neki budući datum.",
  datumNedjelja: "Nedjeljom je studio zatvoren — odaberite drugi dan.",
  datumNeispravan: "Provjerite datum.",
  privola: "Za slanje upita potrebna je vaša privola.",
  tretman: "Odaberite tretman s popisa.",
  vrijeme: "Odaberite drugo vrijeme.",
  kontakt: "Odaberite način kontakta.",
  poruka: `Poruka može imati najviše ${PORUKA_MAX} znakova.`,
} as const;

/** Današnji datum (YYYY-MM-DD) u vremenskoj zoni Europe/Zagreb. */
export function danasZagreb(sada: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Zagreb",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(sada);
}

/** Dan u tjednu za YYYY-MM-DD (0 = nedjelja … 6 = subota), neovisno o zoni preglednika. */
export function danUTjednu(datum: string): number | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(datum);
  if (!m) return null;
  const d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
  if (d.getUTCMonth() !== +m[2] - 1) return null;
  return d.getUTCDay();
}

const DANI = ["nedjelja", "ponedjeljak", "utorak", "srijeda", "četvrtak", "petak", "subota"];

/** „subota, 17. 10. 2026.” */
export function formatirajDatum(datum: string): string {
  const dan = danUTjednu(datum);
  if (dan === null) return datum;
  const [g, m, d] = datum.split("-").map(Number);
  return `${DANI[dan]}, ${d}. ${m}. ${g}.`;
}

const TELEFON_ZNAKOVI = /^[+\d\s/-]+$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type UpitPodaci = {
  ime: string;
  telefon: string;
  email: string;
  datum: string;
  tretman: string;
  vrijeme: VrijemeId;
  kontakt: KontaktId;
  poruka: string;
  privola: boolean;
};
export type PoljeUpita = keyof UpitPodaci;
export type GreskeUpita = Partial<Record<PoljeUpita, string>>;

/** Sirove vrijednosti iz FormData → objekt za validaciju. */
export function izFormData(fd: FormData) {
  const s = (k: string) => {
    const v = fd.get(k);
    return typeof v === "string" ? v : "";
  };
  return {
    ime: s("ime"),
    telefon: s("telefon"),
    email: s("email"),
    datum: s("datum"),
    tretman: s("tretman"),
    vrijeme: s("vrijeme") || "svejedno",
    kontakt: s("kontakt") || "poziv",
    // Multipart slanje pretvara LF u CRLF; prijelom retka se svugdje broji kao jedan znak.
    poruka: s("poruka").replace(/\r\n?/g, "\n"),
    privola: s("privola") === "da",
  };
}

export type RezultatValidacije =
  | { ok: true; podaci: UpitPodaci }
  | { ok: false; greske: GreskeUpita };

type SiroviUpit = ReturnType<typeof izFormData>;

const jeVrijeme = (v: string): v is VrijemeId => VREMENA.some((x) => x.id === v);
const jeKontakt = (v: string): v is KontaktId => KONTAKTI.some((x) => x.id === v);

/**
 * Sva pravila u jednoj provjeri da se greške svih polja prikažu odjednom.
 * Bez biblioteke za validaciju: ista funkcija radi i u pregledniku, pa ne povećava JavaScript stranice.
 */
export function validirajUpit(sirovo: SiroviUpit, danas: string): RezultatValidacije {
  const v = {
    ime: sirovo.ime.trim(),
    telefon: sirovo.telefon.trim(),
    email: sirovo.email.trim(),
    datum: sirovo.datum.trim(),
    tretman: sirovo.tretman,
    vrijeme: sirovo.vrijeme,
    kontakt: sirovo.kontakt,
    poruka: sirovo.poruka.trim(),
    privola: sirovo.privola,
  };
  const greske: GreskeUpita = {};
  const greska = (polje: PoljeUpita, poruka: string) => {
    greske[polje] ??= poruka;
  };

  if (!v.ime || v.ime.length > 120) greska("ime", PORUKE.ime);

  if (!v.telefon) greska("telefon", PORUKE.telefonPrazan);
  else if (v.telefon.length > 40 || !TELEFON_ZNAKOVI.test(v.telefon) || (v.telefon.match(/\d/g)?.length ?? 0) < 8)
    greska("telefon", PORUKE.telefonNeispravan);

  if (v.email && (v.email.length > 200 || !EMAIL.test(v.email))) greska("email", PORUKE.emailNeispravan);
  else if (!v.email && v.kontakt === "email") greska("email", PORUKE.emailPrazan);

  if (!jeVrijeme(v.vrijeme)) greska("vrijeme", PORUKE.vrijeme);
  if (!jeKontakt(v.kontakt)) greska("kontakt", PORUKE.kontakt);

  if (v.datum) {
    const dan = danUTjednu(v.datum);
    if (dan === null) greska("datum", PORUKE.datumNeispravan);
    else if (v.datum < danas) greska("datum", PORUKE.datumProslost);
    else if (dan === 0) greska("datum", PORUKE.datumNedjelja);
    else if (dan === 6 && v.vrijeme === SUBOTOM_ZATVORENO) greska("vrijeme", PORUKE.vrijeme);
  }

  if (v.tretman && v.tretman !== SAVJET && !stavkaZaVrijednost(v.tretman)) greska("tretman", PORUKE.tretman);

  if (v.poruka.length > PORUKA_MAX) greska("poruka", PORUKE.poruka);

  if (!v.privola) greska("privola", PORUKE.privola);

  if (Object.keys(greske).length > 0 || !jeVrijeme(v.vrijeme) || !jeKontakt(v.kontakt)) return { ok: false, greske };
  return { ok: true, podaci: { ...v, vrijeme: v.vrijeme, kontakt: v.kontakt } };
}

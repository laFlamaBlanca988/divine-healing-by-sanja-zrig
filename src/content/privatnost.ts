/**
 * Podaci za stranicu /pravila-privatnosti koje mora dati vlasnica studija.
 * Dok je ijedan null, stranica prikazuje označena prazna mjesta, nije indeksirana i nije u sitemapu,
 * a production build ispisuje upozorenje. Kad se sve upiše, stranica sama postaje konačna.
 * Nema importa jer ga čita i next.config.ts.
 */
export const privatnost: {
  /** Puni naziv iz obrtnog/sudskog registra, npr. „Divine Healing, obrt za usluge masaže, vl. Sanja Zrig”. */
  voditelj: string | null;
  oib: string | null;
  /** Sjedište iz registra (može biti isto kao studio), npr. „Ilica 322, 10000 Zagreb”. */
  sjediste: string | null;
  /** Koliko se čuvaju upiti i prepiska, npr. „12 mjeseci od posljednjeg kontakta”. */
  rokCuvanja: string | null;
  /** Datum od kojeg pravila vrijede, YYYY-MM-DD. */
  datumIzmjene: string | null;
} = {
  voditelj: null,
  oib: null,
  sjediste: null,
  rokCuvanja: null,
  datumIzmjene: null,
};

/** Pružatelji usluga koji obrađuju podatke u ime studija (izvršitelji obrade). */
export const izvrsitelji = {
  hosting: "Vercel Inc. (SAD)",
  email: "Resend (SAD)",
};

export const OPIS_POLJA: Record<keyof typeof privatnost, string> = {
  voditelj: "puni naziv obrta ili tvrtke",
  oib: "OIB",
  sjediste: "sjedište iz registra",
  rokCuvanja: "rok čuvanja upita",
  datumIzmjene: "datum od kojeg pravila vrijede",
};

export const nedostajePrivatnost = (Object.keys(privatnost) as (keyof typeof privatnost)[]).filter(
  (k) => !privatnost[k],
);

export const pravilaSpremna = nedostajePrivatnost.length === 0;

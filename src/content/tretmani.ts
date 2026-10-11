import podaci from "../../docs/tretmani.json";

export type Opcija = { trajanjeMin: number; cijenaEur: number };

export type Tretman = {
  id: string;
  naziv: string;
  opis: string;
  kratkiOpis?: string;
  oznaka?: string;
  opcije: Opcija[];
  naUpit: boolean;
  ikona: string;
  istaknuto: boolean;
  istaknutoRedoslijed?: number;
  slika?: string;
};

export type Kategorija = {
  id: string;
  naziv: string;
  uvod: string;
  slika: string;
  slogan?: string;
  tamnaSekcija?: boolean;
  tretmani: Tretman[];
};

export const kategorije: Kategorija[] = podaci.kategorije;

export const sviTretmani = kategorije.flatMap((k) => k.tretmani);

export function kategorija(id: string): Kategorija {
  const k = kategorije.find((x) => x.id === id);
  if (!k) throw new Error(`Nepoznata kategorija: ${id}`);
  return k;
}

/** Naziv kategorije bez ® (za izbornik u formi i podnožje). */
export function nazivBezZnaka(naziv: string): string {
  return naziv.replace(/®/g, "");
}

export const istaknutiTretmani = sviTretmani
  .filter((t) => t.istaknuto)
  .sort((a, b) => (a.istaknutoRedoslijed ?? 99) - (b.istaknutoRedoslijed ?? 99));

/** Rečenica „Također: …” — ne-istaknuti tretmani iz kategorija koje nisu FOHOW. */
export function takoderRecenica(): string {
  const dijelovi = kategorije
    .filter((k) => k.id !== "fohow")
    .flatMap((k) => k.tretmani)
    .filter((t) => !t.istaknuto)
    .map((t) => {
      const naziv = t.naziv.charAt(0).toLowerCase() + t.naziv.slice(1);
      if (t.opcije.length > 1) {
        const min = t.opcije.map((o) => o.trajanjeMin);
        return `${naziv} (${min.slice(0, -1).join(", ")} i ${min.at(-1)} min)`;
      }
      return naziv;
    });
  if (dijelovi.length < 2) return dijelovi.join("");
  // Ako neki naziv sam sadrži zarez (npr. „Antistres — leđa, vrat, glava i lice”), stavke se
  // odvajaju točkom-zarezom da se vidi gdje koja završava.
  const razdjelnik = dijelovi.some((d) => d.includes(",")) ? "; " : ", ";
  return `${dijelovi.slice(0, -1).join(razdjelnik)} i ${dijelovi.at(-1)}`;
}

/** Stavke izbornika tretmana u formi (§5 „Izbornik tretmana”). */
export type StavkaIzbornika = { value: string; label: string; tretmanId: string };
export type GrupaIzbornika = { label: string; stavke: StavkaIzbornika[] };

export const SAVJET = "savjet";
export const SAVJET_LABEL = "Nisam sigurna/siguran — trebam savjet";

export const izbornikTretmana: GrupaIzbornika[] = kategorije.map((k) => ({
  label: nazivBezZnaka(k.naziv),
  stavke: k.tretmani.flatMap((t): StavkaIzbornika[] => {
    if (t.naUpit || t.opcije.length === 0) {
      return [{ value: t.id, label: `${t.naziv} — cijena na upit`, tretmanId: t.id }];
    }
    const vise = t.opcije.length > 1;
    return t.opcije.map((o) => ({
      value: vise ? `${t.id}:${o.trajanjeMin}` : t.id,
      label: `${t.naziv} — ${o.trajanjeMin} min · ${o.cijenaEur} €`,
      tretmanId: t.id,
    }));
  }),
}));

const sveStavke = izbornikTretmana.flatMap((g) => g.stavke);

export function stavkaZaVrijednost(value: string): StavkaIzbornika | undefined {
  return sveStavke.find((s) => s.value === value);
}

/** Vrijednost izbornika za ?tretman={id} (tretman s više opcija → prva opcija). */
export function vrijednostZaTretmanId(id: string): string | undefined {
  if (id === SAVJET) return SAVJET;
  return sveStavke.find((s) => s.value === id || s.tretmanId === id)?.value;
}

export function upitHref(tretmanId?: string): string {
  return tretmanId ? `/?tretman=${encodeURIComponent(tretmanId)}#upit` : "/#upit";
}

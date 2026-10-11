"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Suspense,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  useTransition,
  type FormEvent,
} from "react";
import { posaljiUpit } from "@/app/actions";
import { Ikona } from "./Ikona";
import { studio } from "@/content/studio";
import { SAVJET, SAVJET_LABEL, izbornikTretmana, vrijednostZaTretmanId } from "@/content/tretmani";
import {
  KONTAKTI,
  MIN_VRIJEME_ISPUNE_MS,
  PORUKA_MAX,
  PORUKE,
  VREMENA,
  danUTjednu,
  danasZagreb,
  izFormData,
  validirajUpit,
  type GreskeUpita,
  type KontaktId,
  type PoljeUpita,
  type VrijemeId,
} from "@/lib/upit";

const REDOSLIJED_POLJA: PoljeUpita[] = ["ime", "telefon", "email", "datum", "tretman", "vrijeme", "kontakt", "poruka", "privola"];

const bezPretplate = () => () => {};

export function UpitForma() {
  const [poslano, setPoslano] = useState(false);
  const [kljuc, setKljuc] = useState(0);
  const [fokusNaFormu, setFokusNaFormu] = useState(false);
  const resetiraj = useRef(false);

  // Stranica ostaje montirana kad se ode s nje (Activity). Nakon uspješnog slanja forma se
  // vraća u početno stanje kad se stranica sakrije, da se pri povratku (npr. /?tretman=…#upit)
  // ne prikaže stara poruka o uspjehu.
  useLayoutEffect(
    () => () => {
      if (!resetiraj.current) return;
      resetiraj.current = false;
      setPoslano(false);
      setFokusNaFormu(false);
      setKljuc((k) => k + 1);
    },
    [],
  );

  if (poslano) {
    return (
      <Uspjeh
        onNovi={() => {
          resetiraj.current = false;
          setFokusNaFormu(true);
          setKljuc((k) => k + 1);
          setPoslano(false);
        }}
      />
    );
  }
  return (
    <Forma
      key={kljuc}
      fokusiraj={fokusNaFormu}
      onPoslano={() => {
        resetiraj.current = true;
        setPoslano(true);
      }}
    />
  );
}

function Forma({ onPoslano, fokusiraj }: { onPoslano: () => void; fokusiraj: boolean }) {
  const formRef = useRef<HTMLFormElement>(null);
  const naslovRef = useRef<HTMLHeadingElement>(null);
  const tretmanRef = useRef<HTMLSelectElement>(null);
  const ucitano = useRef<number | null>(null);
  const fokusirano = useRef(false);
  const zadnjiFokus = useRef(0);
  const [greske, setGreske] = useState<GreskeUpita>({});
  const [fokusPolje, setFokusPolje] = useState<{ polje: PoljeUpita; n: number } | null>(null);
  const [pokusano, setPokusano] = useState(false);
  const [tehnicka, setTehnicka] = useState(false);
  const [saljem, startTransition] = useTransition();

  const [datum, setDatum] = useState("");
  const [vrijeme, setVrijeme] = useState<VrijemeId>("svejedno");
  const [kontakt, setKontakt] = useState<KontaktId>("poziv");

  // „Danas” samo u pregledniku (Europe/Zagreb); na serveru se ne računa.
  const danas = useSyncExternalStore(bezPretplate, () => danasZagreb(), () => undefined);
  // Gumb za slanje radi tek kad je forma hidrirana (prije toga bi preglednik poslao običan zahtjev).
  const spreman = useSyncExternalStore(bezPretplate, () => true, () => false);

  // Efekti se ponovno pokreću svaki put kad Activity ponovno prikaže stranicu,
  // pa se vrijeme učitavanja i početni fokus postavljaju samo jednom po formi.
  useEffect(() => {
    if (ucitano.current === null) ucitano.current = performance.now();
    if (fokusiraj && !fokusirano.current) {
      fokusirano.current = true;
      naslovRef.current?.focus();
    }
  }, [fokusiraj]);

  // Fokus na prvo neispravno polje tek nakon što su greške prikazane (aria-describedby postavljen).
  useEffect(() => {
    if (!fokusPolje || fokusPolje.n === zadnjiFokus.current) return;
    zadnjiFokus.current = fokusPolje.n;
    formRef.current?.querySelector<HTMLElement>(`[data-polje="${fokusPolje.polje}"]`)?.focus();
  }, [fokusPolje]);

  // Poruka o tehničkoj grešci ne ostaje kad se korisnik vrati na stranicu.
  useLayoutEffect(() => () => setTehnicka(false), []);

  const odaberiTretman = useCallback((v: string) => {
    if (tretmanRef.current) tretmanRef.current.value = v;
  }, []);

  const dan = datum ? danUTjednu(datum) : null;
  const subota = dan === 6;
  const nedjelja = dan === 0;

  function provjeri(form: HTMLFormElement) {
    return validirajUpit(izFormData(new FormData(form)), danasZagreb());
  }

  function prikaziGreske(g: GreskeUpita) {
    setGreske(g);
    const prvo = REDOSLIJED_POLJA.find((p) => g[p]);
    if (prvo) setFokusPolje((f) => ({ polje: prvo, n: (f?.n ?? 0) + 1 }));
  }

  function onChange(e: FormEvent<HTMLFormElement>) {
    // Datum obrađuje promijeniDatum (mijenja i odabir vremena prije nego što ga DOM prikaže).
    if (!pokusano || (e.target as HTMLInputElement).name === "datum") return;
    const r = provjeri(e.currentTarget);
    setGreske(r.ok ? {} : r.greske);
  }

  function promijeniDatum(novi: string, form: HTMLFormElement | null) {
    const noviDan = danUTjednu(novi);
    const novoVrijeme = noviDan === 6 && vrijeme === "jutro" ? "svejedno" : vrijeme;
    setDatum(novi);
    setVrijeme(novoVrijeme);

    if (pokusano && form) {
      const r = validirajUpit({ ...izFormData(new FormData(form)), datum: novi, vrijeme: novoVrijeme }, danasZagreb());
      setGreske(r.ok ? {} : r.greske);
      return;
    }
    // Poruke za datum (nedjelja, prošlost) prikazuju se odmah, i prije prvog slanja.
    let poruka: string | undefined;
    if (novi && noviDan === null) poruka = PORUKE.datumNeispravan;
    else if (novi && novi < danasZagreb()) poruka = PORUKE.datumProslost;
    else if (noviDan === 0) poruka = PORUKE.datumNedjelja;
    setGreske((g) => ({ ...g, datum: poruka, vrijeme: undefined }));
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (saljem) return;
    const form = e.currentTarget;
    setPokusano(true);
    setTehnicka(false);

    const r = provjeri(form);
    if (!r.ok) {
      prikaziGreske(r.greske);
      return;
    }
    setGreske({});

    const fd = new FormData(form);
    const pocetak = ucitano.current ?? performance.now();
    startTransition(async () => {
      try {
        // Server odbacuje slanja brža od 3 s od učitavanja forme (zaštita od spama),
        // pa brzi korisnik (npr. automatsko popunjavanje) samo kratko pričeka.
        const ostatak = MIN_VRIJEME_ISPUNE_MS + 200 - (performance.now() - pocetak);
        if (ostatak > 0) await new Promise((r) => setTimeout(r, ostatak));
        // Šalje se trajanje ispune, ne sat uređaja, da razlika satova ne utječe na provjeru.
        fd.set("t", String(Math.round(performance.now() - pocetak)));
        const odgovor = await posaljiUpit(fd);
        startTransition(() => {
          if (odgovor.ok) onPoslano();
          else if (odgovor.greske) prikaziGreske(odgovor.greske);
          else setTehnicka(true);
        });
      } catch {
        startTransition(() => setTehnicka(true));
      }
    });
  }

  const opis = (polje: PoljeUpita) => (greske[polje] ? `u-${polje}-greska` : undefined);
  const greska = (polje: PoljeUpita) =>
    greske[polje] ? (
      <p id={`u-${polje}-greska`} className="field-error m-0">
        {greske[polje]}
      </p>
    ) : null;

  return (
    <form
      ref={formRef}
      method="post"
      noValidate
      onSubmit={onSubmit}
      onChange={onChange}
      className="relative flex flex-col gap-7"
    >
      <Suspense fallback={null}>
        <TretmanIzUrla onTretman={odaberiTretman} />
      </Suspense>

      <div className="flex flex-col gap-3">
        <div className="eyebrow">Upit za termin</div>
        <h2 ref={naslovRef} tabIndex={-1} className="h2-sm text-espresso outline-none">
          Pošaljite upit
        </h2>
        <p className="m-0 text-[16px] leading-[1.7] text-cocoa">
          Ostavite broj telefona i željeni termin — Sanja će vas kontaktirati i potvrditi termin.
        </p>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="u-ime" className="field-label">
            Ime i prezime <span className="text-gold-deep">*</span>
          </label>
          <input
            id="u-ime"
            data-polje="ime"
            name="ime"
            type="text"
            autoComplete="name"
            required
            maxLength={120}
            placeholder="Vaše ime"
            aria-invalid={!!greske.ime}
            aria-describedby={opis("ime")}
            className="field"
          />
          {greska("ime")}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="u-telefon" className="field-label">
            Broj telefona <span className="text-gold-deep">*</span>
          </label>
          <input
            id="u-telefon"
            data-polje="telefon"
            name="telefon"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            required
            maxLength={40}
            placeholder="+385 9x xxx xxxx"
            aria-invalid={!!greske.telefon}
            aria-describedby={opis("telefon")}
            className="field"
          />
          {greska("telefon")}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="u-email" className="field-label">
            E-mail{" "}
            {kontakt === "email" ? (
              <span className="text-gold-deep">*</span>
            ) : (
              <span className="font-normal text-cocoa">(neobavezno)</span>
            )}
          </label>
          <input
            id="u-email"
            data-polje="email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={200}
            required={kontakt === "email"}
            placeholder="ime@primjer.hr"
            aria-invalid={!!greske.email}
            aria-describedby={opis("email")}
            className="field"
          />
          {greska("email")}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="u-datum" className="field-label">
            Željeni datum
          </label>
          <input
            id="u-datum"
            data-polje="datum"
            name="datum"
            type="date"
            min={danas}
            value={datum}
            onChange={(e) => promijeniDatum(e.target.value, e.target.form)}
            aria-invalid={!!greske.datum}
            aria-describedby={opis("datum")}
            className="field"
          />
          {greska("datum")}
          {/* Poruka uz datum pojavljuje se bez promjene fokusa, pa se najavljuje čitačima ekrana. */}
          <p className="sr-only" aria-live="polite">
            {greske.datum ?? ""}
          </p>
        </div>

        <div className="col-span-full flex flex-col gap-2">
          <label htmlFor="u-tretman" className="field-label">
            Tretman
          </label>
          <div className="relative">
            <select
              ref={tretmanRef}
              id="u-tretman"
              data-polje="tretman"
              name="tretman"
              defaultValue=""
              aria-invalid={!!greske.tretman}
              aria-describedby={opis("tretman")}
              className="field appearance-none pr-12"
            >
              <option value="">Odaberite tretman</option>
              {izbornikTretmana.map((g) => (
                <optgroup key={g.label} label={g.label}>
                  {g.stavke.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </optgroup>
              ))}
              <option value={SAVJET}>{SAVJET_LABEL}</option>
            </select>
            <span className="pointer-events-none absolute top-[17px] right-[18px] text-gold-deep">
              <Ikona ime="chevron-dolje" size={18} strokeWidth={1.6} />
            </span>
          </div>
          {greska("tretman")}
        </div>
      </div>

      <fieldset
        className="m-0 flex flex-col gap-2.5 border-0 p-0"
        aria-describedby={opis("vrijeme")}
      >
        <legend className="field-label mb-2.5 p-0">Željeno vrijeme</legend>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,130px),1fr))] gap-2.5">
          {VREMENA.map((v) => {
            const onemoguceno = subota && v.id === "jutro";
            const sub = subota && "subSubota" in v ? v.subSubota : v.sub;
            return (
              <label
                key={v.id}
                className="relative flex min-h-[58px] cursor-pointer flex-col items-start justify-center gap-0.5 rounded-[14px] border border-sand-dark bg-ivory px-4 py-2.5 text-espresso has-checked:border-espresso has-checked:bg-espresso has-checked:text-ivory has-disabled:cursor-not-allowed has-disabled:opacity-45 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-gold"
              >
                <input
                  type="radio"
                  name="vrijeme"
                  value={v.id}
                  data-polje={v.id === "svejedno" ? "vrijeme" : undefined}
                  checked={vrijeme === v.id}
                  disabled={onemoguceno}
                  onChange={() => setVrijeme(v.id)}
                  className="sr-only"
                />
                <span className={`text-[14px] font-semibold ${onemoguceno ? "line-through" : ""}`}>{v.label}</span>
                <span className={`text-[12px] ${onemoguceno ? "line-through" : ""}`}>
                  {sub}
                </span>
              </label>
            );
          })}
        </div>
        {greska("vrijeme")}
      </fieldset>

      <fieldset className="m-0 flex flex-col gap-2.5 border-0 p-0">
        <legend className="field-label mb-2.5 p-0">Kako da vas kontaktiram?</legend>
        <div className="flex flex-wrap gap-2.5">
          {KONTAKTI.map((k) => (
            <label
              key={k.id}
              className="inline-flex min-h-[46px] cursor-pointer items-center rounded-full border border-sand-dark bg-ivory px-5 text-[14px] font-semibold text-espresso has-checked:border-espresso has-checked:bg-espresso has-checked:text-ivory has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-gold"
            >
              <input
                type="radio"
                name="kontakt"
                value={k.id}
                checked={kontakt === k.id}
                onChange={() => setKontakt(k.id)}
                className="sr-only"
              />
              {k.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-col gap-2">
        <label htmlFor="u-poruka" className="field-label">
          Poruka
        </label>
        <textarea
          id="u-poruka"
          data-polje="poruka"
          name="poruka"
          rows={4}
          maxLength={PORUKA_MAX}
          placeholder="Npr. imam bolove u vratu i ramenima, dolazim prvi put…"
          aria-invalid={!!greske.poruka}
          aria-describedby={opis("poruka")}
          className="field resize-y py-3.5 leading-[1.6]"
        />
        {greska("poruka")}
      </div>

      <div className="flex flex-col gap-2">
        <label className="flex cursor-pointer items-start gap-3 text-[14px] leading-[1.6] text-cocoa">
          <input
            type="checkbox"
            data-polje="privola"
            name="privola"
            value="da"
            required
            aria-invalid={!!greske.privola}
            aria-describedby={opis("privola")}
            className="mt-0.5 h-5 w-5 flex-none accent-gold-deep"
          />
          <span>
            Slažem se da se moji podaci koriste isključivo za odgovor na ovaj upit.{" "}
            <Link href="/pravila-privatnosti">Pravila privatnosti</Link>
          </span>
        </label>
        {greska("privola")}
      </div>

      {/* Honeypot — skriveno od ljudi i čitača ekrana */}
      <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
        <label htmlFor="u-web">Web stranica</label>
        <input id="u-web" type="text" name="web" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      {tehnicka && (
        <p role="alert" className="m-0 rounded-xl border border-error/40 bg-error/5 px-4 py-3 text-[14px] leading-[1.6] text-error">
          Upit nije poslan zbog tehničke greške. Pokušajte ponovno ili nazovite{" "}
          <a href={studio.telefonHref} className="font-semibold text-error">
            {studio.telefon}
          </a>
          .
        </p>
      )}

      <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
        <button
          type="submit"
          disabled={!spreman || saljem}
          aria-disabled={nedjelja || undefined}
          className="btn btn-primary btn-lg w-full px-9 disabled:cursor-not-allowed disabled:opacity-60 aria-disabled:cursor-not-allowed aria-disabled:opacity-60 sm:w-auto"
        >
          <Ikona ime="posalji" size={18} />
          {saljem ? "Šaljem…" : "Pošalji upit"}
        </button>
        <p className="m-0 flex-[1_1_260px] text-[13px] leading-[1.6] text-cocoa">
          Termin je potvrđen kada vas Sanja kontaktira. Za trenutnu online rezervaciju koristite{" "}
          <a href={studio.zoyya} className="font-semibold">
            Zoyyu
          </a>
          .
        </p>
      </div>
    </form>
  );
}

/** Unaprijed odabire tretman iz ?tretman={id}. */
function TretmanIzUrla({ onTretman }: { onTretman: (value: string) => void }) {
  const params = useSearchParams();
  const id = params.get("tretman");
  const primijenjen = useRef<string | null>(null);
  // Primjenjuje se samo kad se ?tretman promijeni — ne pri ponovnom prikazu stranice,
  // da se ne pregazi tretman koji je posjetitelj sam odabrao.
  useEffect(() => {
    if (!id || id === primijenjen.current) return;
    primijenjen.current = id;
    const v = vrijednostZaTretmanId(id);
    if (v) onTretman(v);
  }, [id, onTretman]);
  return null;
}

function Uspjeh({ onNovi }: { onNovi: () => void }) {
  const naslovRef = useRef<HTMLHeadingElement>(null);
  const fokusirano = useRef(false);
  useEffect(() => {
    if (fokusirano.current) return;
    fokusirano.current = true;
    naslovRef.current?.focus();
  }, []);
  return (
    <div role="status" className="flex min-h-[520px] flex-col items-center justify-center gap-[18px] p-6 text-center">
      <span className="icon-ring h-[72px] w-[72px] shadow-[inset_0_0_0_5px_#FFFDF9,inset_0_0_0_6px_#EADBC2]">
        <Ikona ime="kvacica" size={32} />
      </span>
      <h2 ref={naslovRef} tabIndex={-1} className="m-0 font-serif text-[34px] font-medium text-espresso outline-none">
        Hvala na upitu!
      </h2>
      <p className="m-0 max-w-[420px] text-[16px] leading-[1.7] text-cocoa">
        Upit je poslan. Sanja će vam se javiti što prije kako bi potvrdila termin.
      </p>
      <button type="button" onClick={onNovi} className="btn btn-secondary">
        Pošalji novi upit
      </button>
    </div>
  );
}

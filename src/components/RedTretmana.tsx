import Link from "next/link";
import { Ikona } from "./Ikona";
import { studio } from "@/content/studio";
import { stranicaZaTretman } from "@/content/stranice";
import { upitHref, type Tretman } from "@/content/tretmani";

/** Red cjenika: ikona, naziv (s poveznicom na stranicu tretmana ako postoji), opis, cijena i gumb. */
export function RedTretmana({
  t,
  tamno,
  linija,
  trenutnaStranica,
}: {
  t: Tretman;
  tamno: boolean;
  linija: string;
  /** Putanja stranice na kojoj se red prikazuje — tada naziv ne vodi na samu sebe. */
  trenutnaStranica?: string;
}) {
  const poveznica = stranicaZaTretman(t.id);
  const stranica = poveznica !== trenutnaStranica ? poveznica : undefined;
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
            {stranica ? (
              <Link
                href={stranica}
                className={`-my-3 inline-block py-3 underline decoration-1 underline-offset-4 ${
                  tamno ? "decoration-bronze-line" : "decoration-gold-line"
                } ${
                  tamno ? "text-ivory hover:text-gold-light" : "text-espresso hover:text-gold-deep"
                }`}
              >
                {t.naziv}
              </Link>
            ) : (
              t.naziv
            )}
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

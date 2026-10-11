import Link from "next/link";
import { Ikona } from "./Ikona";
import { studio } from "@/content/studio";
import { upitHref } from "@/content/tretmani";

/** Okvir „Niste sigurni koji tretman odabrati?” — telefon i upit. */
export function PomocPriOdabiru() {
  return (
    <section className="bg-ivory">
      <div className="wrap section-y">
        <div className="flex flex-wrap items-center justify-between gap-x-14 gap-y-8 rounded-[28px] border border-sand-dark bg-cream p-7 md:rounded-[32px] md:p-[clamp(32px,4vw,56px)]">
          <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-3.5">
            <h2 className="m-0 font-serif text-[clamp(26px,2.6vw,34px)] leading-[1.25] font-medium">
              Niste sigurni koji tretman odabrati?
            </h2>
            <p className="lead m-0">Nazovite ili pošaljite upit — zajedno ćemo odabrati tretman koji vam najbolje odgovara.</p>
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
  );
}

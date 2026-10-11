"use client";

import Link from "next/link";
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { Ikona } from "./Ikona";
import { Logo } from "./Logo";
import { studio } from "@/content/studio";

type Props = {
  /**
   * Na /tretmani („tretmani”) i stranicama tretmana („tretman”) linkovi Masaže i FOHOW vode na sekcije
   * cjenika, a „Cjenik” je istaknut. aria-current="page" samo na samom cjeniku; na podstranicama "true".
   */
  stranica?: "pocetna" | "tretmani" | "tretman" | "ostalo";
};

export function Header({ stranica = "ostalo" }: Props) {
  const [otvoren, setOtvoren] = useState(false);
  const gumbRef = useRef<HTMLButtonElement>(null);
  const zaglavljeRef = useRef<HTMLElement>(null);
  // Skrivene stranice ostaju u DOM-u (Activity), pa id panela mora biti jedinstven po instanci.
  const panelId = useId();

  const naTretmanima = stranica === "tretmani" || stranica === "tretman";
  const trenutno = stranica === "tretmani" ? "page" : "true";
  const linkovi = [
    { href: naTretmanima ? "/tretmani#masaze" : "/#tretmani", label: "Masaže" },
    { href: naTretmanima ? "/tretmani#fohow" : "/#fohow", label: "FOHOW BEM 3.0" },
    { href: "/tretmani", label: "Cjenik", aktivan: naTretmanima },
    { href: "/#o-meni", label: "O meni" },
    { href: "/#kontakt", label: "Kontakt" },
  ];

  // Izbornik se zatvara kad Activity sakrije stranicu (navigacija na drugu rutu).
  useLayoutEffect(() => () => setOtvoren(false), []);

  useEffect(() => {
    if (!otvoren) return;
    const zatvori = () => setOtvoren(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOtvoren(false);
        gumbRef.current?.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setOtvoren(false);
    };
    // Klik izvan zaglavlja (npr. donja traka) zatvara izbornik.
    const onKlik = (e: MouseEvent) => {
      if (zaglavljeRef.current && !zaglavljeRef.current.contains(e.target as Node)) setOtvoren(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onKlik);
    window.addEventListener("resize", onResize);
    window.addEventListener("popstate", zatvori);
    window.addEventListener("hashchange", zatvori);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onKlik);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("popstate", zatvori);
      window.removeEventListener("hashchange", zatvori);
    };
  }, [otvoren]);

  const zatvori = () => setOtvoren(false);

  return (
    <header ref={zaglavljeRef} className="relative z-40 border-b border-sand bg-ivory">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-3 py-3 pr-4 pl-6 md:px-10 lg:gap-5 lg:py-4 xl:gap-8">
        <Logo mali onNavigate={zatvori} />

        <nav
          aria-label="Glavna navigacija"
          className="hidden items-center gap-4 text-[12px] font-semibold tracking-[0.12em] whitespace-nowrap uppercase lg:flex xl:gap-[30px] xl:tracking-[0.16em]"
        >
          {linkovi.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              aria-current={l.aktivan ? trenutno : undefined}
              className={`py-3.5 no-underline ${
                l.aktivan ? "border-b border-gold text-gold-deep" : "text-espresso hover:text-gold-deep"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <a href={studio.zoyya} className="btn btn-primary hidden flex-none px-5 whitespace-nowrap lg:inline-flex xl:px-[26px]">
          <span className="hidden xl:inline-flex">
            <Ikona ime="kalendar" size={18} />
          </span>
          Rezerviraj termin
        </a>

        <button
          ref={gumbRef}
          type="button"
          onClick={() => setOtvoren((o) => !o)}
          aria-expanded={otvoren}
          aria-controls={panelId}
          aria-label={otvoren ? "Zatvori izbornik" : "Otvori izbornik"}
          className="flex h-12 w-12 flex-none cursor-pointer items-center justify-center rounded-full border border-sand-dark bg-white-warm text-espresso lg:hidden"
        >
          <Ikona ime={otvoren ? "zatvori" : "izbornik"} size={22} />
        </button>
      </div>

      <div
        id={panelId}
        hidden={!otvoren}
        className="absolute inset-x-0 top-full border-b border-sand bg-ivory shadow-[0_24px_40px_-24px_rgba(46,33,25,0.35)] lg:hidden"
      >
        <nav aria-label="Izbornik" className="wrap flex flex-col pt-2 pb-6">
          {linkovi.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={zatvori}
              aria-current={l.aktivan ? trenutno : undefined}
              className={`flex min-h-[52px] items-center border-b border-sand text-[13px] font-semibold tracking-[0.16em] uppercase no-underline ${
                l.aktivan ? "text-gold-deep" : "text-espresso"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <a href={studio.zoyya} className="btn btn-primary btn-lg mt-6">
            <Ikona ime="kalendar" size={18} />
            Rezerviraj termin
          </a>
          <a
            href={studio.telefonHref}
            className="mt-3 flex min-h-11 items-center justify-center gap-2.5 text-[15px] text-espresso no-underline"
          >
            <span className="text-gold-deep">
              <Ikona ime="telefon" size={20} strokeWidth={1.4} />
            </span>
            {studio.telefon}
          </a>
        </nav>
      </div>
    </header>
  );
}

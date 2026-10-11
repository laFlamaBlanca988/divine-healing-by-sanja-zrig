import Link from "next/link";
import { Ikona } from "./Ikona";
import { studio } from "@/content/studio";

/** Sticky traka na dnu ekrana ispod lg (1024 px). */
export function MobilnaTraka() {
  return (
    <nav aria-label="Brze radnje" className="fixed inset-x-3 bottom-3 z-30 flex gap-2 rounded-full border border-sand bg-white-warm p-2 shadow-[0_16px_36px_-12px_rgba(46,33,25,0.35)] lg:hidden">
      <a
        href={studio.telefonHref}
        aria-label={`Nazovi ${studio.telefon}`}
        className="flex h-[52px] w-[52px] flex-none items-center justify-center rounded-full border border-gold-line text-gold-deep"
      >
        <Ikona ime="telefon" size={20} />
      </a>
      <Link
        href="/#upit"
        aria-label="Pošalji upit"
        className="flex h-[52px] w-[52px] flex-none items-center justify-center rounded-full border border-gold-line text-gold-deep"
      >
        <Ikona ime="email" size={20} />
      </Link>
      <a href={studio.zoyya} className="btn btn-primary min-h-[52px] flex-1 px-4 tracking-[0.14em]">
        Rezerviraj termin
      </a>
    </nav>
  );
}

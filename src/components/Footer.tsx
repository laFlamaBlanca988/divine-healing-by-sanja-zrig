import Link from "next/link";
import { Logo } from "./Logo";
import { studio } from "@/content/studio";

const naslov = "mb-2 text-[12px] font-semibold tracking-[0.2em] text-gold-light uppercase";
const link = "flex min-h-11 items-center text-[14px] text-on-dark no-underline hover:text-ivory";

export function Footer() {
  return (
    <footer className="border-t border-espresso-line bg-espresso text-on-dark">
      <div className="wrap flex flex-col gap-14 pt-[72px] pb-[120px] lg:pb-8">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-x-12 gap-y-10">
          <div className="flex flex-col gap-[18px]">
            <Logo tamno />
            <p className="m-0 text-[14px] leading-[1.7]">
              {studio.podnaslov}
              <br />
              {studio.adresa}, {studio.postanskiBroj} {studio.grad}
            </p>
          </div>
          <nav aria-label="Tretmani" className="flex flex-col">
            <span className={naslov}>Tretmani</span>
            <Link href="/tretmani#masaze" className={link}>Masaže</Link>
            <Link href="/tretmani#antistres" className={link}>Antistres tretmani</Link>
            <Link href="/tretmani#tijelo" className={link}>Hidžama i tretmani tijela</Link>
            <Link href="/tretmani#fohow" className={link}>FOHOW BEM 3.0 masaže</Link>
          </nav>
          <div className="flex flex-col">
            <span className={naslov}>Kontakt</span>
            <a href={studio.telefonHref} className={link}>{studio.telefon}</a>
            <a href={`mailto:${studio.email}`} className={link}>{studio.email}</a>
            <a href={studio.instagram} className={link}>Instagram</a>
          </div>
          <div className="flex flex-col text-[14px]">
            <span className={naslov}>Radno vrijeme</span>
            {/* Ista visina redaka kao linkovi u susjednim stupcima (44 px) */}
            <span className="flex min-h-11 items-center">Pon – Pet: 10:00 – 21:00</span>
            <span className="flex min-h-11 items-center">Subota: 13:00 – 19:00</span>
            <span className="flex min-h-11 items-center">Nedjelja: zatvoreno</span>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-1 border-t border-espresso-line pt-6 text-[13px]">
          <span>© 2026 Divine Healing by Sanja Zrig. Sva prava pridržana.</span>
          <span>
            Rezervacije omogućila{" "}
            <a href={studio.zoyya} className="inline-flex min-h-11 items-center text-on-dark underline-offset-4 hover:text-ivory">Zoyya</a>
            {" · "}
            <Link href="/pravila-privatnosti" className="inline-flex min-h-11 items-center text-on-dark underline-offset-4 hover:text-ivory">
              Pravila privatnosti
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}

import { SIDRENA_DATUM } from "@/content/tretmani";

/** Sidrena cijena uz svaku cijenu (zakonska obveza, docs/tretmani.json → sidrenaCijenaEur). */
export function SidrenaCijena({ eur, tamno, className = "" }: { eur: number | string; tamno: boolean; className?: string }) {
  return (
    <span className={`text-[12px] whitespace-nowrap ${tamno ? "text-on-dark" : "text-cocoa"} ${className}`}>
      Sidrena cijena: {typeof eur === "number" ? `${eur} €` : eur}
    </span>
  );
}

/** Napomena na kraju svakog cjenika: PDV i datum sidrene cijene. */
export function NapomenaCjenika({ tamno, className = "" }: { tamno: boolean; className?: string }) {
  return (
    <p className={`m-0 text-[13px] leading-[1.6] ${tamno ? "text-on-dark" : "text-cocoa"} ${className}`}>
      Sve cijene su u eurima i uključuju PDV. Sidrena cijena je cijena koja je vrijedila {SIDRENA_DATUM}
    </p>
  );
}

import Image from "next/image";
import Link from "next/link";
import { Ikona } from "./Ikona";
import type { Mrvica } from "@/content/seo";

type Props = {
  /** Putanja do trenutne stranice; zadnja stavka je trenutna stranica (bez poveznice). */
  mrvice: Mrvica[];
  naslov: string;
  /** Manji H1 na vrlo uskim ekranima (dugi nazivi tretmana, npr. „Tradicionalna…”). */
  uskiNaslov?: boolean;
  children?: React.ReactNode;
};

/** Naslovni dio podstranica: putanja, H1, razdjelnik s lotosom, sadržaj i traka zlatna-svila.jpg. */
export function NaslovnaTraka({ mrvice, naslov, uskiNaslov = false, children }: Props) {
  const prethodne = mrvice.slice(0, -1);
  const trenutna = mrvice.at(-1);
  return (
    <section className="grid bg-cream">
      <Image
        src="/images/zlatna-svila.jpg"
        alt=""
        width={2400}
        height={533}
        sizes="100vw"
        loading="eager"
        className="col-start-1 row-start-1 h-[150px] w-full self-end object-cover"
        style={{ objectPosition: "50% 40%" }}
      />
      <div className="relative col-start-1 row-start-1 mx-auto flex w-full max-w-[900px] flex-col items-center gap-5 px-6 pt-12 pb-[180px] text-center md:px-10 md:pt-16 md:pb-[190px]">
        <nav aria-label="Putanja" className="flex flex-wrap items-center justify-center gap-x-1 text-[13px] text-cocoa">
          {prethodne.map((m) => (
            <span key={m.putanja}>
              <Link href={m.putanja} className="inline-flex min-h-11 items-center no-underline">
                {m.naziv}
              </Link>{" "}
              <span aria-hidden="true">/</span>{" "}
            </span>
          ))}
          {trenutna && (
            <span aria-current="page" className="whitespace-nowrap">
              {trenutna.naziv}
            </span>
          )}
        </nav>
        <h1 className={`h1 text-espresso ${uskiNaslov ? "max-[380px]:text-[34px] max-[340px]:text-[30px]" : ""}`}>
          {naslov}
        </h1>
        <div className="flex w-full max-w-[360px] items-center gap-3.5 text-gold">
          <span className="h-px flex-1 bg-gold-line" />
          <Ikona ime="lotos" vrsta="tretman" size={30} strokeWidth={1.2} />
          <span className="h-px flex-1 bg-gold-line" />
        </div>
        {children}
      </div>
    </section>
  );
}

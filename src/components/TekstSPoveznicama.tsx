import Link from "next/link";

/** Odlomak u kojem se poveznica piše kao [tekst](/putanja). */
export function TekstSPoveznicama({ tekst }: { tekst: string }) {
  const dijelovi: React.ReactNode[] = [];
  const uzorak = /\[([^\]]+)\]\(([^)]+)\)/g;
  let zadnji = 0;
  for (const m of tekst.matchAll(uzorak)) {
    const pocetak = m.index ?? 0;
    if (pocetak > zadnji) dijelovi.push(tekst.slice(zadnji, pocetak));
    dijelovi.push(
      <Link key={pocetak} href={m[2]} className="font-semibold underline-offset-4">
        {m[1]}
      </Link>,
    );
    zadnji = pocetak + m[0].length;
  }
  if (zadnji < tekst.length) dijelovi.push(tekst.slice(zadnji));
  return <>{dijelovi}</>;
}

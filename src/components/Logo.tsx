import Image from "next/image";
import Link from "next/link";

type Props = { tamno?: boolean; mali?: boolean; onNavigate?: () => void };

/** Znak + „DIVINE HEALING” (Cinzel) + „by Sanja Zrig” (Dancing Script). */
export function Logo({ tamno = false, mali = false, onNavigate }: Props) {
  const boja = tamno ? "text-gold-light" : "text-gold-deep";
  const tekst = (
    <span className={`flex flex-col leading-none ${boja}`}>
      <span
        className={`font-serif font-medium whitespace-nowrap tracking-[0.06em] ${
          mali ? "text-[17px] lg:text-[19px] xl:text-[22px]" : "text-[18px] md:text-[20px]"
        }`}
      >
        DIVINE HEALING
      </span>
      <span
        className={`font-script font-medium whitespace-nowrap ${
          mali ? "pl-[34px] text-[16px] lg:pl-[40px] lg:text-[18px] xl:pl-[46px] xl:text-[20px]" : "pl-[36px] text-[17px] md:pl-[42px] md:text-[18px]"
        }`}
      >
        by Sanja Zrig
      </span>
    </span>
  );
  const znak = (
    <Image
      src="/images/logo-znak.png"
      alt=""
      width={108}
      height={98}
      className={mali ? "h-9 w-10 object-contain lg:h-[42px] lg:w-[46px] xl:h-[49px] xl:w-[54px]" : "h-[42px] w-[46px] object-contain md:h-[49px] md:w-[54px]"}
    />
  );

  if (tamno) {
    return (
      <div className="flex items-center gap-3.5">
        {znak}
        {tekst}
      </div>
    );
  }
  return (
    <Link
      href="/"
      aria-label="Divine Healing by Sanja Zrig — početna"
      onNavigate={onNavigate}
      className="flex min-h-11 flex-none items-center gap-2.5 no-underline lg:gap-3 xl:gap-3.5"
    >
      {znak}
      {tekst}
    </Link>
  );
}

import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  pozicija?: string;
  tamno?: boolean;
  sizes?: string;
  className?: string;
};

/** Fotografija u obliku luka s tankim obrubom pomaknutim iza slike (docs/dizajn.md §3), omjer 4:3. */
export function SlikaULuku({ src, alt, pozicija, tamno = false, sizes = "(min-width: 1024px) 400px, 100vw", className = "" }: Props) {
  return (
    <div className={`relative aspect-[4/3] w-full ${className}`}>
      <div
        className={`arch absolute -top-3 -right-3 bottom-3 left-3 border md:-top-[18px] md:-right-[18px] md:bottom-[18px] md:left-[18px] ${
          tamno ? "border-bronze-line" : "border-gold-line"
        }`}
      />
      <div className="arch relative h-full w-full overflow-hidden">
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" style={{ objectPosition: pozicija }} />
      </div>
    </div>
  );
}

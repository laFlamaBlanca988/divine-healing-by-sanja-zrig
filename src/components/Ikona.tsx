import ikone from "../../docs/ikone.json";

type Props = {
  ime: string;
  /** "ui" za UI ikone, "tretman" za ikone tretmana */
  vrsta?: "ui" | "tretman";
  size?: number;
  strokeWidth?: number;
  className?: string;
};

const izvori: Record<"ui" | "tretman", Record<string, string>> = {
  ui: ikone.ui,
  tretman: ikone.tretmani,
};

/** Inline SVG ikona iz docs/ikone.json (stroke="currentColor", bez ispune). */
export function Ikona({ ime, vrsta = "ui", size = 20, strokeWidth, className }: Props) {
  const markup = izvori[vrsta][ime];
  if (!markup) throw new Error(`Nepoznata ikona: ${vrsta}/${ime}`);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth ?? (vrsta === "tretman" ? 1.3 : 1.5)}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}

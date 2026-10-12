/** Ruka koja pritišće podlogu: dlan na y = 0, prsti ulijevo, podlaktica gore desno. */
function Ruka({ x, y, kut = 0, mjera = 1 }: { x: number; y: number; kut?: number; mjera?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${kut}) scale(${mjera})`}>
      <path d="M-30 0C-27-4-21-6-15-7C-7-8 1-9 7-12L38-48" />
      <path d="M5 0C9-1 12-3 14-6L48-41" />
      <path d="M1-3C-5-3-10-2-14 0" />
    </g>
  );
}

/** Lijeva polovica figure u sjedećem položaju s rukama iznad glave (tajlandska). */
const polaFigure = (
  <>
    <path d="M116 75c-6 2-12 3-16 7-8-8-14-18-14-26 4-12 14-22 24-28" />
    <path d="M104 92c-4-10-8-20-8-30 4-10 10-18 18-24" />
    <path d="M104 92c3 8 4 16 0 26" />
  </>
);

/** Linijski crteži (viewBox 240 × 180) za kartice istaknutih tretmana, po `id` tretmana. */
const crtezi: Record<string, React.ReactNode> = {
  "terapeutska-masaza": (
    <>
      <path d="M26 136h188M42 136v16M198 136v16" />
      <path d="M42 120c-2-9 4-17 13-17 6 0 10 3 12 8" />
      <path d="M67 111c14-6 30-9 50-9 26 0 46-2 64 2 12 3 22 9 26 18" />
      <path d="M40 128h168" />
      <path d="M164 105c6 6 7 14 5 23" opacity=".6" />
      <Ruka x={104} y={102} />
      <Ruka x={150} y={102} />
    </>
  ),
  "tradicionalna-tajlandska-masaza": (
    <>
      <circle cx="120" cy="62" r="10" />
      {polaFigure}
      <g transform="translate(240 0) scale(-1 1)">{polaFigure}</g>
      <path d="M110 28c4-5 16-5 20 0M114 38c2-3 10-3 12 0" />
      <path d="M104 118c-20 3-34 11-34 19 0 6 20 8 50 4 30 4 50 2 50-4 0-8-14-16-34-19" />
      <path d="M90 138c12-6 48-6 60 0" opacity=".6" />
      <path d="M50 152h140" />
    </>
  ),
  "relax-masaza": (
    <>
      <ellipse cx="116" cy="138" rx="46" ry="10" />
      <ellipse cx="116" cy="117" rx="34" ry="9" />
      <ellipse cx="116" cy="98" rx="22" ry="8" />
      <path d="M116 90c-8-10-8-22 0-32 8 10 8 22 0 32z" />
      <path d="M116 90c-14-2-22-10-26-22 12 0 20 8 26 22zM116 90c14-2 22-10 26-22-12 0-20 8-26 22z" />
      <path d="M178 148v-30h16v30M186 118v-6" />
      <path d="M186 112c-3-4-3-8 0-12 3 4 3 8 0 12z" />
      <path d="M40 148h160" opacity=".6" />
    </>
  ),
  "antistres-lice-glava-ramena": (
    <g transform="translate(0 6)">
      <path d="M134 44c-22-2-40 14-42 36-1 8-6 14-10 20l8 4-2 10c4 2 8 2 10 4l-2 8c8 2 18 0 24 4v14" />
      <path d="M134 44c18 2 30 18 30 36 0 16-8 26-14 34v30" />
      <path d="M102 80c4 2 8 2 12 0" />
      <Ruka x={118} y={46} kut={-10} mjera={0.85} />
      <path d="M60 144h120" opacity=".6" />
    </g>
  ),
  "sportska-masaza": (
    <>
      <path d="M18 116c20-2 38-8 62-10 24-2 42 4 62 10 10 3 18 4 26 4 8-4 18-6 24-2 6 6 12 18 18 26" />
      <path d="M18 136c50-2 100 0 150-2 10 0 20 4 30 8h12" />
      <path d="M14 146h212" opacity=".6" />
      <Ruka x={84} y={105} kut={-3} />
      <Ruka x={128} y={111} kut={12} />
    </>
  ),
  "anticelulitni-tretman-nogu": (
    <>
      <path d="M82 22c-4 34-2 66 6 92 4 14 4 28 2 44M116 24c-2 34-6 64-6 90 0 16-2 30-4 44" />
      <path d="M126 24c2 34 6 64 6 90 0 16 2 30 4 44M160 22c4 34 2 66-6 92-4 14-4 28-2 44" />
      <path d="M94 112c4 3 10 3 14 0M136 112c4 3 10 3 14 0" opacity=".6" />
      <rect x="124" y="56" width="50" height="16" rx="8" className="fill-cream" />
      <path d="M134 56v16M144 56v16M154 56v16M164 56v16" opacity=".6" />
      <path d="M174 64h8l14-18" />
      <path d="M196 46l10-13" strokeWidth={5} />
    </>
  ),
};

export function imaCrtez(id: string): boolean {
  return id in crtezi;
}

/** Ukrasni linijski crtež tretmana na krem podlozi s lukom (umjesto fotografije na kartici). */
export function CrtezTretmana({ id }: { id: string }) {
  const crtez = crtezi[id];
  if (!crtez) return null;
  return (
    <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden bg-cream text-gold-deep">
      <span className="arch absolute bottom-0 h-[88%] w-[56%] border border-b-0 border-gold-line opacity-60" aria-hidden="true" />
      <svg
        viewBox="0 0 240 180"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
        className="relative w-[86%]"
      >
        {crtez}
      </svg>
    </div>
  );
}

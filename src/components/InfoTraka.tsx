import { Ikona } from "./Ikona";
import { studio } from "@/content/studio";

function InfoStavka({ ikona, naslov, children }: { ikona: string; naslov: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-4 md:gap-[18px]">
      <span className="icon-ring h-12 w-12 md:h-14 md:w-14">
        <Ikona ime={ikona} size={24} strokeWidth={1.3} />
      </span>
      <div className="flex flex-col gap-1">
        <span className="text-[12px] font-semibold tracking-[0.18em] text-gold-deep uppercase">{naslov}</span>
        {children}
      </div>
    </div>
  );
}

/** Info traka: adresa i radno vrijeme. `upute` dodaje poveznicu „Upute do studija”. */
export function InfoTraka({ upute = false }: { upute?: boolean }) {
  return (
    <section className="border-y border-sand bg-cream">
      <div className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-x-14 gap-y-5 py-8 md:gap-y-8 md:py-11">
        <InfoStavka ikona="lokacija" naslov="Adresa">
          <span className="text-[15px] font-medium md:text-[16px]">
            {studio.adresa}, {studio.grad}
          </span>
          <span className="text-[14px] text-cocoa">{studio.kvart}</span>
          {upute && (
            <a
              href={studio.karta}
              className="-mt-1 inline-flex min-h-11 items-center self-start text-[14px] font-semibold"
            >
              Upute do studija
            </a>
          )}
        </InfoStavka>
        <InfoStavka ikona="sat" naslov="Radno vrijeme">
          <span className="text-[15px] font-medium md:text-[16px]">Pon – Pet: 10:00 – 21:00</span>
          <span className="text-[14px] text-cocoa">Subota: 13:00 – 19:00 · Nedjelja: zatvoreno</span>
        </InfoStavka>
      </div>
    </section>
  );
}

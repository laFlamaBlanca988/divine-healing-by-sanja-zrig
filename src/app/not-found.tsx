import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Stranica nije pronađena",
};

export default function NijePronadeno() {
  return (
    <>
      <Header />
      <main className="bg-ivory">
        <div className="wrap section-y flex flex-col items-center gap-5 text-center">
          <div className="eyebrow">Greška 404</div>
          <h1 className="h1 text-espresso">Stranica nije pronađena</h1>
          <p className="lead m-0 max-w-[520px]">
            Stranica koju tražite ne postoji ili je premještena. Pogledajte početnu stranicu ili cjenik tretmana.
          </p>
          <div className="mt-2 flex w-full flex-col gap-3.5 sm:w-auto sm:flex-row">
            <Link href="/" className="btn btn-primary btn-lg">
              Na početnu
            </Link>
            <Link href="/tretmani" className="btn btn-secondary btn-lg">
              Tretmani i cjenik
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

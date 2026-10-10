"use server";

import { Resend } from "resend";
import { SAVJET, SAVJET_LABEL, stavkaZaVrijednost, sviTretmani } from "@/content/tretmani";
import {
  KONTAKTI,
  MIN_VRIJEME_ISPUNE_MS,
  VREMENA,
  danUTjednu,
  danasZagreb,
  formatirajDatum,
  izFormData,
  validirajUpit,
  type GreskeUpita,
  type UpitPodaci,
} from "@/lib/upit";

export type OdgovorUpita = { ok: true } | { ok: false; greske?: GreskeUpita; tehnicka?: boolean };

export async function posaljiUpit(fd: FormData): Promise<OdgovorUpita> {
  // Zaštita od spama: honeypot + prebrzo slanje. Botu glumimo uspjeh.
  const honeypot = fd.get("web");
  const ucitano = Number(fd.get("t"));
  if ((typeof honeypot === "string" && honeypot !== "") || !ucitano || Date.now() - ucitano < MIN_VRIJEME_ISPUNE_MS) {
    console.warn("[upit] odbačeno kao spam");
    return { ok: true };
  }

  const r = validirajUpit(izFormData(fd), danasZagreb());
  if (!r.ok) return { ok: false, greske: r.greske };

  const email = sastaviEmail(r.podaci);
  const kljuc = process.env.RESEND_API_KEY;

  if (!kljuc) {
    if (process.env.NODE_ENV !== "production") {
      console.log(`\n[upit] RESEND_API_KEY nije postavljen — upit se ne šalje, ispis:\n` +
        `Naslov: ${email.subject}\n${email.text}\n`);
      return { ok: true };
    }
    console.error("[upit] RESEND_API_KEY nije postavljen u produkciji");
    return { ok: false, tehnicka: true };
  }

  try {
    const resend = new Resend(kljuc);
    const { error } = await resend.emails.send({
      from: process.env.UPIT_EMAIL_FROM ?? "Divine Healing <onboarding@resend.dev>",
      to: process.env.UPIT_EMAIL_TO ?? "sanjazrig@gmail.com",
      replyTo: r.podaci.email || undefined,
      subject: email.subject,
      text: email.text,
      html: email.html,
    });
    if (error) {
      console.error("[upit] Resend greška:", error);
      return { ok: false, tehnicka: true };
    }
    return { ok: true };
  } catch (e) {
    console.error("[upit] slanje nije uspjelo:", e);
    return { ok: false, tehnicka: true };
  }
}

function sastaviEmail(p: UpitPodaci) {
  const stavka = p.tretman && p.tretman !== SAVJET ? stavkaZaVrijednost(p.tretman) : undefined;
  const nazivTretmana = stavka
    ? (sviTretmani.find((t) => t.id === stavka.tretmanId)?.naziv ?? stavka.label)
    : p.tretman === SAVJET
      ? "treba savjet"
      : "bez odabira";
  const tretmanPuni = stavka ? stavka.label : p.tretman === SAVJET ? SAVJET_LABEL : "—";

  const vrijeme = VREMENA.find((v) => v.id === p.vrijeme)!;
  const subota = p.datum ? danUTjednu(p.datum) === 6 : false;
  const vrijemeTekst =
    p.vrijeme === "svejedno"
      ? "Svejedno"
      : `${vrijeme.label} (${subota && "subSubota" in vrijeme ? vrijeme.subSubota : vrijeme.sub})`;

  const poslano = new Intl.DateTimeFormat("hr-HR", {
    timeZone: "Europe/Zagreb",
    dateStyle: "full",
    timeStyle: "short",
  }).format(new Date());

  const redovi: [string, string][] = [
    ["Ime i prezime", p.ime],
    ["Telefon", p.telefon],
    ["E-mail", p.email || "—"],
    ["Tretman", tretmanPuni],
    ["Željeni datum", p.datum ? formatirajDatum(p.datum) : "—"],
    ["Željeno vrijeme", vrijemeTekst],
    ["Način kontakta", KONTAKTI.find((k) => k.id === p.kontakt)!.label],
    ["Poruka", p.poruka || "—"],
    ["Poslano", poslano],
  ];

  const subject = `Novi upit: ${nazivTretmana} — ${p.ime}`;
  const text = redovi.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html =
    `<h2 style="font-family:Georgia,serif;font-weight:500;color:#2E2119">Novi upit za termin</h2>` +
    `<table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:15px;color:#2E2119">` +
    redovi
      .map(
        ([k, v]) =>
          `<tr><td style="color:#5A4636;vertical-align:top;white-space:nowrap"><strong>${esc(k)}</strong></td>` +
          `<td style="white-space:pre-wrap">${esc(v)}</td></tr>`,
      )
      .join("") +
    `</table>`;

  return { subject, text, html };
}

function esc(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

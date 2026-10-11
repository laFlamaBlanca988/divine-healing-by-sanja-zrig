# Divine Healing by Sanja Zrig

Web stranica za Divine Healing — Massage & Wellness Studio, Ilica 322, Zagreb.

Stranica je napravljena u **Next.js** (App Router, TypeScript, Tailwind CSS) prema specifikaciji u `docs/dizajn.md`.

## Što je u repozitoriju

| Putanja | Sadržaj |
|---|---|
| `docs/dizajn.md` | **Specifikacija** — struktura stranica, boje, fontovi, forma za upit, slike, tehničke preporuke. Početi odavde. |
| `docs/tretmani.json` | Svi tretmani s trajanjem, cijenom i opisom (izvor istine za cjenik). |
| `docs/ikone.json` | SVG markup svih ikona iz dizajna. |
| `docs/zoyya-izvorni-tekstovi.md` | Izvorni tekstovi sa Zoyye (referenca). |
| `docs/canvas/` | Referentne kopije artboarda iz dizajna (`.dc.html`): početna, cjenik, mobitel, stil. |
| `public/images/` | Fotografije i logo pripremljeni za web. |
| `assets/originali/` | Originalne fotografije koje je poslao naručitelj. |

Dizajn na canvasu: https://claude.ai/artifact/LKaCithXbxSkBRApn3jvrg (privatan).

## Pokretanje

```bash
npm install
cp .env.example .env.local   # po potrebi upisati vrijednosti
npm run dev                  # http://localhost:3000
npm run lint
npm run build && npm start
```

| Putanja | Sadržaj |
|---|---|
| `src/app/` | stranice `/`, `/tretmani`, `/tretmani/<tretman>` (5 stranica tretmana), `/pravila-privatnosti`, Server Action za upit (`actions.ts`), sitemap, robots, ikone |
| `src/components/` | zaglavlje, podnožje, mobilna traka, forma za upit, ikone |
| `src/content/` | podaci o studiju; tretmani se čitaju izravno iz `docs/tretmani.json`; tekstovi stranica tretmana (`stranice.ts`); SEO i strukturirani podaci |
| `src/lib/upit.ts` | pravila forme (zajednička za preglednik i server) |

### Forma za upit
Upit se šalje Server Actionom preko [Resenda](https://resend.com) na `UPIT_EMAIL_TO`.
Bez `RESEND_API_KEY` se u developmentu upit samo ispiše u log servera; u produkciji bez ključa
forma prikazuje poruku o tehničkoj grešci. Varijable su opisane u `.env.example`.

### SEO
Što je napravljeno i što treba napraviti izvan koda (Google profil tvrtke, recenzije, Search Console): `docs/seo-upute.md`.
Adresa stranice za canonical i sitemap: `NEXT_PUBLIC_SITE_URL`, a ako nije postavljena, na Vercelu se koristi
produkcijska adresa projekta. Kad se sadržaj promijeni, ažurirati `AZURIRANO` u `src/content/seo.ts` (datum u sitemapu).

### Otvoreno
- **Pravila privatnosti** — na stranici je privremeni nacrt (jasno označen); konačni tekst treba od naručitelja.
- **Domena** — postaviti `NEXT_PUBLIC_SITE_URL` (canonical, sitemap, Open Graph).
- **Tekstovi stranica tretmana** — Sanja ih treba pročitati i odobriti prije objave (`src/content/stranice.ts`).
- **Google profil tvrtke i recenzije** — vidi `docs/seo-upute.md`.
- **Resend** — račun, verificirana domena i adresa pošiljatelja (`UPIT_EMAIL_FROM`).

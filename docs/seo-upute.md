# SEO — što je napravljeno na stranici i što treba napraviti izvan nje

Cilj: da se Divine Healing pojavljuje kad netko u Zagrebu traži „masaža Zagreb”, „masaže Zagreb”,
„terapeutska masaža Zagreb”, „FOHOW masaža” i slično.

## Realna očekivanja

- **Prvu stranicu Googlea nitko ne može garantirati.** To kaže i Google:
  https://developers.google.com/search/docs/fundamentals/do-i-need-seo. Ne vjerujte agencijama koje to obećavaju.
- Za „masaža Zagreb” prvi ekran na google.hr čini **karta s 3 salona (Google profil tvrtke)**, a ispod nje
  većinom portali (SrediMe, Zoyya, Fresha…) i veliki saloni sa stotinama recenzija.
- Google kartu slaže prema **relevantnosti, udaljenosti i ugledu** (recenzije, spomeni):
  https://support.google.com/business/answer/7091. Ilica 322 je u zapadnom Zagrebu, pa je realan cilj karta za
  ljude koji traže u blizini (Kustošija, Črnomerec, Vrapče, Rudeš).
- Okvirno, nakon objave domene i verifikacije Google profila:
  - naziv studija („Divine Healing Zagreb”) — nekoliko tjedana;
  - FOHOW / BEM 3.0 / „masaža srebrnim rukavicama”, „masaža Kustošija” — 1–3 mjeseca (malo konkurencije);
  - „terapeutska / relax / antistres masaža Zagreb” — 3–9 mjeseci, ovisno o recenzijama;
  - karta za „masaža” u zapadnom Zagrebu — 3–6 mjeseci uz stalan priljev pravih recenzija;
  - „tajlandska masaža Zagreb”, „sportska masaža Zagreb” i opći „masaža Zagreb” u cijelom gradu — dugoročno.

## Što je napravljeno na stranici

- Naslovi i opisi svake stranice na hrvatskom, s lokacijom (Zagreb, Kustošija, Ilica 322) i cijenama iz cjenika.
- Pet novih stranica tretmana s vlastitim tekstom, cjenikom, fotografijama i poveznicama:
  `/tretmani/terapeutska-masaza`, `/tretmani/tajlandska-masaza`, `/tretmani/sportska-masaza`,
  `/tretmani/relax-i-antistres-masaza`, `/tretmani/fohow-bem-masaze`.
  Tekstovi su iz odobrenih opisa i Sanjinih tekstova sa Zoyye, bez uklonjenih zdravstvenih tvrdnji.
  **Sanja ih treba pročitati i odobriti prije objave** (`src/content/stranice.ts`).
- Strukturirani podaci za Google: studio (adresa, telefon, radno vrijeme, cijene tretmana, Instagram, Zoyya),
  naziv web stranice i putanja (breadcrumb) na podstranicama.
- Sitemap sa svim stranicama, canonical adrese, Open Graph slike za dijeljenje na društvenim mrežama.
- Interne poveznice: kartice na početnoj, nazivi u cjeniku i podnožje vode na stranice tretmana.
- Bez domene stranica i dalje radi: na Vercelu se automatski koristi produkcijska adresa projekta.

## Što treba napraviti izvan koda (redom važnosti)

### 1. Domena (developer + Sanja)
1. Odabrati kratku domenu s imenom studija (npr. `divinehealing.hr`), ne „masaza-zagreb”.
2. Povezati je s Vercelom; jednu verziju (s ili bez `www`) postaviti kao glavnu, drugu preusmjeriti (301).
3. U Vercelu postaviti `NEXT_PUBLIC_SITE_URL=https://…` (glavna adresa, bez `/` na kraju) i ponovno objaviti.

### 2. Google profil tvrtke — najvažnije za „masaža Zagreb”
1. business.google.com → prijava (npr. sanjazrig@gmail.com) → potražiti studio; ako profil postoji, zatražiti
   vlasništvo, inače napraviti novi. Smije postojati **samo jedan** profil.
2. Naziv točno **„Divine Healing by Sanja Zrig”** — bez dodataka „masaža Zagreb” i sl. (krši pravila, rizik suspenzije).
3. Adresa **Ilica 322, 10000 Zagreb**, pribadača točno na ulazu. Verifikacija (najčešće kratkim videom: kućni
   broj, ulaz, unutrašnjost, stol za masažu).
4. Glavna kategorija: ona za studio masaže (upišite „masaž” i odaberite najtočniju). Dodatne samo ako stvarno
   odgovaraju. Ne fizioterapeut, liječnik ni kozmetički salon.
5. Telefon +385 98 165 4696, web stranica (nova domena), link za rezervaciju https://zoyya.com/hr/divine-healing.
6. Radno vrijeme: pon–pet 10–21, sub 9–14, ned zatvoreno; posebno radno vrijeme za blagdane.
7. Usluge: svaki tretman s trajanjem i cijenom **točno kao na webu**; opisi s weba (bez detoksa, „nema
   nuspojava”, „10–15 masaža u jednom”, kolagena…).
8. Opis (do 750 znakova, bez linkova i cijena), prijedlog:
   > Divine Healing by Sanja Zrig je studio za masažu u Ilici 322, u zagrebačkoj Kustošiji. Sanja Zrig izvodi
   > terapeutsku, tradicionalnu tajlandsku, sportsku i relax masažu, masažu cijelog tijela i masažu leđa,
   > antistres tretmane lica, glave i vrata, hidžamu (suhu i vlažnu) i anticelulitni tretman nogu te FOHOW BEM 3.0
   > bio-meridijanske masaže srebrnim rukavicama i ultrazvučne masaže. Svaki tretman prilagođava se vašim
   > potrebama, uz individualan pristup i punu posvećenost svakom klijentu. Termin možete rezervirati online,
   > telefonom ili porukom.
9. Fotografije: logo, ulaz s kućnim brojem, prostor, odobrene fotografije tretmana; svaki mjesec 2–3 nove.
10. Kad je profil verificiran, developeru poslati **link profila** („Podijeli”) i **koordinate** pribadače
    (desni klik na kartu) — dodaju se u „Upute do studija” i strukturirane podatke.

### 3. Recenzije
1. U Google profilu „Zatraži recenzije” → kratki link i QR kod; kartica s QR kodom u studiju, link u poruci
   zahvale nakon termina.
2. Molite **sve** klijente, ne samo zadovoljne. **Nikad** popust ili poklon za recenziju, recenzije obitelji koja
   nije bila na tretmanu ili kupljene recenzije — Google ih briše i kažnjava profil.
3. Na svaku recenziju odgovoriti u 1–3 dana, kratko i osobno, bez zdravstvenih detalja i obećanja.
4. Cilj je stalan priljev (nekoliko tjedno), ne nagli skok.

### 4. Google Search Console (developer)
1. search.google.com/search-console → svojstvo „Domena” → TXT zapis u DNS → potvrda.
2. Sitemaps → `sitemap.xml` → Pošalji. „Pregled URL-a” → zatražiti indeksiranje početne, `/tretmani` i stranica tretmana.
3. Nakon 4–8 tjedana: Učinak → Upiti. Prema stvarnim upitima doraditi naslove (npr. „masaža” ili „masaže”).

### 5. Isti podaci svugdje
Naziv, adresa i telefon moraju biti identični: **Divine Healing by Sanja Zrig · Ilica 322, 10000 Zagreb · +385 98 165 4696**.
- **Zoyya:** naziv s razmakom („Sanja Zrig”, ne „SanjaZrig”); ispraviti tipfelere u nazivima usluga
  („Antistres tretman – leđa, vrat, glava i lice”, „Antistres tretman – lice, glava i ramena”,
  „BioMeridijanska masaža srebrnim rukavicama”, „Masaža cijelog tijela”); cijene iste kao na webu; opisi ublaženi kao na webu.
- **Instagram:** link na web u bio, adresa.
- **Facebook** (ako postoji ili se otvori), **Apple Business Connect**, **Bing Places** — isti podaci.
- Ne plaćati „SEO imenike” ni pakete linkova.

### 6. Podaci koje samo Sanja može dati (stranice postaju korisnije od konkurencije)
- edukacije i certifikati (masaža, tajlandska, hidžama, FOHOW), godine iskustva;
- kako izgleda prvi termin; za tajlandsku masažu odjeća i podloga;
- najbliža tramvajska stanica i parking; pravila otkazivanja; poklon bonovi;
- za buduću stranicu o hidžami: neutralan opis postupka i edukacija (bez detoksa).

### 7. Ostalo
- Repozitorij na GitHubu je javan i sadrži izvorne Zoyya tekstove; nakon objave domene preporuka je učiniti ga privatnim.
- Mjesečno (15 min): Google profil → Uspješnost; odgovoriti na recenzije; nove fotografije; provjeriti da su cijene
  iste na webu, Zoyyi i Google profilu.

## Što ne raditi
- Stranice po kvartovima („masaža Vrapče”, „masaža Trešnjevka”…) ili popisi kvartova — Google ih kažnjava kao doorway stranice.
- Ponavljanje „masaža Zagreb” u svakom naslovu, alt tekstu ili linku; skriveni tekst.
- Ključne riječi u nazivu Google profila; više profila; lažne ili kupljene recenzije.
- Vraćanje zdravstvenih tvrdnji (detoks, „nema nuspojava”, „10–15 masaža u jednom”, kolagen, pomlađivanje, liječenje).
- Superlativi bez pokrića („najbolja masaža u Zagrebu”, „jedini FOHOW centar”).

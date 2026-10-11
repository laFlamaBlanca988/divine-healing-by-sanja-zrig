# Divine Healing by Sanja Zrig — specifikacija web stranice

Ovo je predaja dizajna za izradu stranice u **Next.js**. Sve što treba za izradu je ovdje i u
datotekama na koje se dokument poziva.

- **Dizajn (canvas):** https://claude.ai/artifact/LKaCithXbxSkBRApn3jvrg
  Privatan je; sesija istog korisnika ga može pročitati Artifact alatom (`action: "read"`).
- **Referentne kopije artboarda** su u `docs/canvas/`. To su `.dc.html` datoteke iz canvasa,
  s putanjama slika već prepisanim na `/images/...`. Iz njih se može prepisati točan markup,
  inline SVG ikone i stilovi. **Ne mogu se otvoriti izravno u pregledniku** (trebaju runtime
  editora). Služe kao referenca, ne kao kod za kopiranje 1:1.
  - `Main.dc.html` — početna, desktop (fluidna, radi i na mobitelu)
  - `Tretmani.dc.html` — tretmani i cjenik, desktop
  - `Mobile.dc.html` — početna na 390 px (mobilni raspored, sticky traka)
  - `Stil.dc.html` — vizualni identitet (boje, fontovi, gumbi, ikone, oblici slika)
- **Cjenik i opisi:** `docs/tretmani.json` — jedini izvor istine za tretmane i cijene.
- **Ikone:** `docs/ikone.json` — SVG markup svih ikona (ključevi = polje `ikona` u JSON-u).
- **Izvorni tekstovi sa Zoyye:** `docs/zoyya-izvorni-tekstovi.md`.
- **Slike:** `public/images/` (obrađene za web), originali u `assets/originali/`.

Jezik stranice: **hrvatski** (`<html lang="hr">`).

> **Pravilo prednosti:** gdje se ovaj dokument ili `tretmani.json` razlikuju od artboarda u canvasu,
> vrijedi dokument/JSON. Artboardi određuju izgled i raspored; sadržaj (nazivi, cijene, tekstovi,
> redoslijed) uzima se iz dokumenta i JSON-a.

---

## 1. Podaci o studiju

| | |
|---|---|
| Naziv | Divine Healing by Sanja Zrig |
| Podnaslov | Massage & Wellness Studio |
| Slogan (s plakata) | Prostor u kojem ćete se osjećati i biti bolje |
| Adresa | Ilica 322, 10000 Zagreb (Kustošija) |
| Telefon | +385 98 165 4696 (`tel:+385981654696`) |
| E-mail | sanjazrig@gmail.com |
| Instagram | https://www.instagram.com/divine_healing_bysanja/ (@divine_healing_bysanja) |
| Online rezervacija | https://zoyya.com/hr/divine-healing |
| Google Maps | https://maps.google.com/?q=Ilica+322,+Zagreb |

Radno vrijeme: **Pon – Pet 10:00 – 21:00 · Subota 13:00 – 19:00 · Nedjelja zatvoreno.**

---

## 2. Struktura stranice

### `/` — Početna (`docs/canvas/Main.dc.html`)
Redoslijed sekcija:

1. **Zaglavlje** — logo (znak + „DIVINE HEALING” u Cinzelu + „by Sanja Zrig” u Dancing Scriptu),
   navigacija *Masaže · FOHOW BEM 3.0 · Cjenik · O meni · Kontakt*, gumb **Rezerviraj termin** (Zoyya).
   Ispod prijelomne točke `lg` (vidi „Mobitel”): logo + okrugli gumb izbornika (hamburger). Izbornik u
   dizajnu nije nacrtan — napraviti padajući panel preko cijele širine (pozadina ivory) s istim linkovima,
   gumbom za rezervaciju i telefonom; gumb izbornika tada prikazuje ikonu `zatvori`, a `Esc` ga zatvara.
2. **Hero** — eyebrow „Massage & Wellness Studio · Zagreb”, H1 „Prostor u kojem ćete se osjećati
   *i biti bolje*” (drugi dio u tamnom zlatu), kratki opis, gumbi **Rezerviraj termin** (Zoyya) i
   **Pošalji upit** (skok na formu), telefon + Instagram. Desno: fotografija `studio-sanja.jpg` u
   obliku **luka** s tankim zlatnim obrubom pomaknutim iza slike i plutajućom „pilulom”
   s radnim vremenom. (Alternativa iz dizajna: kvadratna slika `tajlandska-istezanje-sjedeci.jpg`
   sa zaobljenim kutovima — zadana je varijanta s lukom.)
3. **Info traka** (krem pozadina) — tri stupca: Adresa · Radno vrijeme · Kontakt, svaki s ikonom u krugu.
4. **Najtraženiji tretmani** (`#tretmani`) — naslov „Masaže i tretmani”, gumb „Cijeli cjenik”,
   mreža 3 × 2 kartica (slika 4:3, trajanje, cijena, naziv, kratki opis, link „Rezerviraj”).
   Kartice = tretmani s `"istaknuto": true`, poredani po `istaknutoRedoslijed`, tekst iz `kratkiOpis`.
   Ispod rečenica „Također: …” — generira se od ne-istaknutih tretmana iz kategorija koje nisu FOHOW
   (uključuje i Abdominalnu masažu), s linkom „Pogledajte cijeli cjenik”.
5. **FOHOW BEM 3.0** (`#fohow`, tamna sekcija) — slika `fohow-bem-uredaj.jpg` (4:5), naslov =
   `slogan` FOHOW kategorije, opis, „Možete osjetiti:” +
   tri pilule (valove kroz tijelo · duboko oslobađanje · trenutnu lakoću), popis FOHOW tretmana
   s trajanjem i cijenom (stavke „na upit” imaju link „Na upit” na formu), gumbi
   **Rezerviraj BEM 3.0 masažu** (Zoyya) i **Opisi tretmana** (`/tretmani/fohow-bem-masaze`).
6. **O meni** (`#o-meni`) — `sanja-tajlandska-osmijeh.jpg` u luku + okrugla manja slika
   `sanja-masaza-glave.jpg` preko donjeg desnog kuta; „Pozdrav, ja sam Sanja” (Dancing Script),
   citat „Za mene je masaža više od posla – to je poziv koji nosim u srcu.” (Cinzel), Sanjin tekst
   (vidi §6), potpis „Sanja Zrig” i gumb Rezerviraj termin.
7. **Iz studija** — galerija 4 fotografije (4:5, radijus 20 px) + tamna pločica s Instagram linkom.
8. **Upit + kontakt** (`#upit`, `#kontakt`) — lijevo kartica s **formom za upit** (§5),
   desno tamna kartica „Posjetite studio”: adresa + „Upute do studija”, telefon, e-mail,
   Instagram, radno vrijeme, gumb „Online rezervacija — Zoyya”.
9. **Podnožje** (tamno) — logo, adresa, linkovi na tretmane, kontakt, radno vrijeme,
   „© 2026 Divine Healing by Sanja Zrig. Sva prava pridržana.”, „Rezervacije omogućila Zoyya ·
   Pravila privatnosti”.

### `/tretmani` — Tretmani i cjenik (`docs/canvas/Tretmani.dc.html`)
1. Zaglavlje (aktivna stavka „Cjenik”).
2. Naslovni dio: putanja *Početna / Tretmani i cjenik*, H1, razdjelnik s lotosom, uvodna rečenica,
   pilule za skok na sekcije (*Masaže · Antistres · Hidžama i tijelo · FOHOW BEM 3.0*);
   na dnu traka `zlatna-svila.jpg` (150 px visine, `object-fit: cover`).
3. Četiri sekcije redom kako su u `tretmani.json` (01 Masaže, 02 Antistres tretmani,
   03 Hidžama i tretmani tijela, 04 FOHOW® BEM 3.0 masaže — tamna). Svaka: lijevo broj, naslov,
   uvod i slika kategorije u luku (4:3); desno redovi tretmana: ikona u krugu, naziv (velika slova),
   opis, cijena (Cinzel) + trajanje, gumb **Rezerviraj** (Zoyya). Stavke `naUpit` imaju
   „Na upit” i gumb **Pošalji upit** (na `/#upit`). Masaža leđa ima dvije opcije (30 min 25 € / 60 min 40 €).
   Anticelulitni tretman ima oznaku „Paket uz popust”.
4. Okvir „Niste sigurni koji tretman odabrati?” — telefon + Pošalji upit.
5. Podnožje.

### `/tretmani/<slug>` — stranice tretmana (dodano zbog SEO-a)
Pet stranica grupiranih po namjeri pretraživanja: `terapeutska-masaza`, `tajlandska-masaza`, `sportska-masaza`,
`relax-i-antistres-masaza`, `fohow-bem-masaze`. Tekstovi su u `src/content/stranice.ts` (iz `tretmani.json` i Sanjinih
tekstova sa Zoyye, bez tvrdnji iz §9) i prije objave ih odobrava Sanja. Isti vizualni jezik kao `/tretmani`:
1. Naslovni dio kao na `/tretmani` (putanja *Početna / Tretmani i cjenik / {naziv}*, H1, lotos, uvod, gumbi
   **Rezerviraj termin** i **Pošalji upit** s unaprijed odabranim tretmanom).
2. „Trajanje i cijena”: slika u luku lijevo, redovi cjenika desno (FOHOW na tamnoj pozadini).
3. Opis u odlomcima (H2), uz galeriju fotografija u desnom stupcu gdje postoji.
4. „Srodni tretmani” (pilule) i „Cijeli cjenik”, info traka (adresa, radno vrijeme, kontakt, upute), okvir „Niste sigurni…”.
SEO upute i ono što treba napraviti izvan koda: `docs/seo-upute.md`.

### `/pravila-privatnosti`
Potrebna zbog forme (GDPR). Tekst treba pripremiti — u dizajnu postoji samo link.

### Mobitel i prijelomne točke (`docs/canvas/Mobile.dc.html`)
**Sadržaj je na svim širinama isti kao na desktopu** (`Main.dc.html` + `tretmani.json`): isti tekstovi,
nazivi, svih 6 istaknutih kartica, ista forma, isto podnožje (s linkom Pravila privatnosti).
Mobilni artboard ima mjestimično skraćene tekstove i izostavljene elemente — to **nije** namjera;
on određuje samo raspored:
- **< 1024 px (`lg`)**: hamburger izbornik umjesto navigacije; **sticky traka na dnu ekrana**
  (`position: fixed`) — okrugli gumb za poziv, okrugli gumb za upit (ikona `email`, vodi na `/#upit`),
  široki gumb „Rezerviraj termin”. Traka je na svim stranicama (i `/tretmani`); sadržaj stranice dobiva
  donji padding da je traka ne prekrije.
- **< 768 px (`md`)**: sve u jednom stupcu; kartice najtraženijih tretmana su **vodoravni klizač**
  (`overflow-x: auto`, `scroll-snap-type: x mandatory`, kartica 272 px); galerija 2 × 2 (+ Instagram
  pilula ispod); hero slika u luku ispod teksta; bočni padding 24 px.
- Redovi cjenika na `/tretmani` se prelamaju (ikona + naziv/opis gore, cijena i gumb ispod, poravnato
  desno) — kao u desktop artboardu, koji već koristi `flex-wrap`.

### Poveznice
| Element | Cilj |
|---|---|
| Rezerviraj / Rezerviraj termin | https://zoyya.com/hr/divine-healing (novi tab nije potreban) |
| Pošalji upit (općenito) | `/#upit` |
| Pošalji upit / Na upit uz određeni tretman | `/?tretman={id}#upit` — forma unaprijed odabere taj tretman |
| Nav „Kontakt” | `/#kontakt` |
| Nav „Masaže” / „FOHOW BEM 3.0” | `/#tretmani` / `/#fohow` (s `/tretmani`: `/tretmani#masaze` / `/tretmani#fohow`) |
| Podnožje — kategorije | `/tretmani#masaze`, `#antistres`, `#tijelo`; FOHOW → `/tretmani/fohow-bem-masaze` |
| Naziv tretmana (kartice na početnoj, redovi cjenika) | stranica tretmana, ako postoji (vidi „Stranice tretmana”) |
| Pravila privatnosti (forma i podnožje) | `/pravila-privatnosti` |
| „Zoyya” u podnožju („Rezervacije omogućila Zoyya”) | link na Zoyya stranicu studija |
| Upute do studija | https://maps.google.com/?q=Ilica+322,+Zagreb |

---

## 3. Vizualni identitet

Sve je izvedeno iz plakata za izlog: krem podloga, šampanjsko zlato, klasični serif, razmaknuta
velika slova. Bez gradijenata i bez emojija.

### Boje

| Token | Hex | Uporaba |
|---|---|---|
| ivory | `#FBF7F0` | glavna pozadina, pozadina polja forme |
| cream | `#F4EADC` | izmjenične sekcije, info traka, pozadina „na upit” gumba |
| sand | `#E8D6BC` | linije, rubovi kartica |
| sand-dark | `#D9C29C` | rub polja forme, rub kartica na kremi |
| sand-mid | `#DCC7A6` | linije između redova cjenika na krem pozadini |
| gold | `#B4884A` | ikone, dekor, obrub sekundarnih gumba (samo veliki tekst/dekor) |
| gold-line | `#C9A46A` | tanke zlatne linije, obrubi lukova i krugova ikona |
| gold-deep | `#8A6328` | primarni gumbi, eyebrow tekst, linkovi (kontrast 5:1 na ivory) |
| gold-light | `#D9B77E` | tekst i gumbi na tamnoj pozadini |
| cocoa | `#5A4636` | sporedni tekst |
| espresso | `#2E2119` | glavni tekst, tamne sekcije, podnožje |
| espresso-line | `#4A3A2E` | linije na tamnoj pozadini |
| bronze-line | `#8A6A3E` | obrubi na tamnoj pozadini |
| text-on-dark | `#CDBBA3` | sporedni tekst na tamnoj pozadini |
| white-warm | `#FFFDF9` | kartice, unutrašnjost krugova ikona |
| placeholder | `#7A6656` | placeholder tekst u poljima |

Hover za linkove: `#5E4318`. Fokus polja: `outline: 2px solid #B4884A; outline-offset: 1px`.

### Tipografija (Google Fonts, s `latin-ext` zbog č, ć, š, ž, đ)

| Font | Težine | Uporaba |
|---|---|---|
| **Cinzel** | 400, 500, 600 | naslovi (H1 clamp(38px, 4.4vw, 62px); H2 sekcija clamp(30px, 3.2vw, 44px); manji H2 — kategorije cjenika, galerija, forma — clamp(28px, 3vw, 40px)), cijene (20–26 px), citati, logotip |
| **Montserrat** | 300, 400, 500, 600 | tekst (16–17 px, line-height 1.75), oznake i nazivi tretmana VELIKIM SLOVIMA (12–15 px, `letter-spacing` 0.1–0.3em, težina 600; u tamnoj FOHOW listi na početnoj 500) |
| **Dancing Script** | 500, 600 | samo potpis: „by Sanja Zrig”, „Pozdrav, ja sam Sanja”, „Sanja Zrig” |

Eyebrow (nadnaslov): 12 px, 600, `letter-spacing: 0.3em`, uppercase, boja gold-deep (na tamnom gold-light).

### Oblici i razmaci
- **Luk**: `border-radius: 999px 999px 0 0` — glavne fotografije (hero, O meni, slike kategorija).
  Uz luk ide tanki obrub `1px solid #C9A46A` istog oblika, pomaknut ~18 px iza slike.
- Kartice: radijus 24 px (kartice tretmana), 28–32 px (velike kartice, forma); galerija 20 px.
- Krug: manje fotografije, s 8 px obrubom boje pozadine.
- Gumbi: pilule (`border-radius: 999px`), min. visina 44 px (glavni 52–56 px), tekst 12–13 px,
  600, uppercase, `letter-spacing: 0.16em`.
  - primarni: pozadina gold-deep, tekst ivory
  - sekundarni: proziran, obrub gold `#B4884A`, tekst espresso
  - na tamnom: pozadina gold-light, tekst espresso; ili obrub `#8A6A3E`, tekst `#F4EADC`;
    ili (gumbi „Rezerviraj” u redovima cjenika) obrub i tekst gold-light
  - mali gumb u redu cjenika: min. visina 44 px, min. širina 128 px, tekst 11 px
  - „Pošalji upit” u redu cjenika: pozadina cream + obrub sand-dark (na tamnom: pozadina gold-light, tekst espresso)
- Ikone tretmana: krug 52–60 px, `border: 1px solid #C9A46A`, dvostruki unutarnji prsten
  (`box-shadow: inset 0 0 0 4px #FFFDF9, inset 0 0 0 5px #EADBC2`), ikona 24–28 px, linija 1.3,
  boja gold-deep. Na tamnoj pozadini: obrub `#8A6A3E`, ikona gold-light, bez prstena.
- Sadržaj: `max-width: 1240px`, bočni padding 40 px (24 px na mobitelu),
  vertikalni padding sekcija `clamp(72px, 8vw, 120px)`.

### Ikone
Sve su inline SVG (24×24, `stroke="currentColor"`, bez ispune) — **točan markup je u `docs/ikone.json`**
(nazivi ispod ikona u `Stil.dc.html` nisu ključevi i mjestimično su netočni — ne koristiti ih).
Ključevi u `tretmani.json` (`ikona`):

| ključ | prikaz | ključ | prikaz |
|---|---|---|---|
| `ruke` | dlanovi s listom | `lotos` | lotos |
| `thai` | figura (istezanje) | `klasicna` | dlan na podlozi |
| `bucica` | bučica | `kraljeznica` | kralježnica |
| `trbuh` | spirala | `lice` | lice |
| `casica` | čašica na koži | `casice` | dvije čašice |
| `valjak` | drveni valjak | `kap` | kap |
| `rukavica` | rukavica | `valovi` | ultrazvučni valovi |
| `uredaj` | uređaj (BEM) | `bocice` | dvije bočice |

UI ikone (`ikone.json` → `ui`): telefon, instagram, email, lokacija, sat, kalendar, strelica, chevron-desno,
chevron-dolje, kvacica, posalji, izbornik, zatvori.

---

## 4. Tretmani i cijene

Izvor istine: **`docs/tretmani.json`**. Sažetak:

**Masaže**
| Tretman | Trajanje | Cijena |
|---|---|---|
| Terapeutska masaža | 90 min | 60 € |
| Tradicionalna tajlandska masaža | 90 min | 80 € |
| Masaža cijelog tijela | 60 min | 50 € |
| Sportska masaža | 60 min | 55 € |
| Relax masaža | 60 min | 45 € |
| Masaža leđa | 30 / 60 min | 25 / 40 € |
| Abdominalna masaža | — | na upit |

**Antistres tretmani**
| Tretman | Trajanje | Cijena |
|---|---|---|
| Antistres — leđa, vrat, glava i lice | 60 min | 50 € |
| Antistres — lice, glava i ramena | 30 min | 25 € |

**Hidžama i tretmani tijela**
| Tretman | Trajanje | Cijena |
|---|---|---|
| Hidžama (suha / vlažna) | 60 min | 50 € |
| Anticelulitni tretman nogu (paket uz popust) | 45 min | 30 € |
| Maderoterapija | — | na upit |
| Limfna drenaža | — | na upit |

**FOHOW® BEM 3.0 masaže**
| Tretman | Trajanje | Cijena |
|---|---|---|
| BioMeridijanska masaža srebrnim rukavicama | 60 min | 75 € |
| BioMeridijanska masaža — leđa ili noge | 30 min | 40 € |
| Ultrazvučna masaža leđa | 45 min | 40 € |
| Ultrazvučna masaža za face lifting | 30 min | 40 € |
| Kozmetička BEM masaža | 60 min | 40 € |
| FOHOW limfna drenaža | — | na upit |
| FOHOW Minerals Face Skin Set | — | na upit |

Na Zoyyi su dvije kategorije: **Masaže** i **FOHOW BEM 3.0 masaže**. Na stranici su Masaže
podijeljene u tri podsekcije radi preglednosti (`"grupa"` u JSON-u čuva Zoyya kategoriju).
Stavke s `"izvor": "plakat"` nisu na Zoyyi — naručitelj je potvrdio da ostaju kao „na upit”.

Svi gumbi „Rezerviraj” vode na https://zoyya.com/hr/divine-healing (Zoyya nema poveznice na
pojedini tretman).

---

## 5. Forma za upit

Svrha: klijent ostavlja upit za termin; upit stiže e-mailom Sanji. Druga opcija uz Zoyyu —
za pitanja, tretmane „na upit” i one koji ne žele aplikaciju. Jedna komponenta za sve širine.

### Polja (ovim redom)
| Polje | Tip | Obavezno | Napomena |
|---|---|---|---|
| Ime i prezime | text, `autocomplete="name"` | da | placeholder „Vaše ime” |
| Broj telefona | tel, `autocomplete="tel"` | da | placeholder `+385 9x xxx xxxx`; dopušteni znakovi `+`, brojke, razmaci, `/`, `-`; min. 8 znamenki |
| E-mail | email | samo ako je način kontakta „E-mail” | uz oznaku „(neobavezno)”; kad se odabere „E-mail”, oznaka postaje „*” |
| Željeni datum | date | ne | `min` = danas (vremenska zona Europe/Zagreb); nedjelja nije dopuštena (vidi pravila) |
| Tretman | select s `optgroup` | ne | vidi „Izbornik tretmana”; unaprijed odabran iz `?tretman={id}` |
| Željeno vrijeme | radio pilule | ne | Jutro 10–13 h · Popodne 13–17 h · Večer 17–21 h · **Svejedno** (zadano) |
| Kako da vas kontaktiram? | radio pilule | ne | **Poziv** (zadano) · SMS / WhatsApp / Viber · E-mail |
| Poruka | textarea, 4 reda | ne | placeholder „Npr. imam bolove u vratu i ramenima, dolazim prvi put…”, max. 1000 znakova |
| Privola | checkbox | da | „Slažem se da se moji podaci koriste isključivo za odgovor na ovaj upit.” + link Pravila privatnosti |
| (honeypot) | skriveno text polje | — | npr. `name="web"`, sakriveno od ljudi i čitača ekrana |

Pilule su vizualno gumbi; u kodu ih napraviti kao **radio grupe** (`fieldset` + `legend`, vizualno
skriveni `input type="radio"`) da rade s tipkovnicom i čitačima ekrana. Odabrana pilula: pozadina
espresso, tekst ivory; ostale: ivory pozadina, obrub `#D9C29C`.

### Pravila za datum i vrijeme (radno vrijeme)
- **Nedjelja:** ako se odabere nedjelja, ispod polja poruka „Nedjeljom je studio zatvoren — odaberite
  drugi dan.” i slanje nije moguće dok se datum ne promijeni.
- **Subota (13–19 h):** pilula „Jutro” je onemogućena (precrtana/prigušena, `disabled`), „Večer” se
  prikazuje kao „Večer 17–19 h”. Ako je „Jutro” bilo odabrano, vrati na „Svejedno”.
- „Danas” se računa u vremenskoj zoni Europe/Zagreb.

### Izbornik tretmana
- `optgroup` = `naziv` kategorije (bez ®), redom iz JSON-a.
- Stavka = `{naziv} — {trajanjeMin} min · {cijenaEur} €`; tretman s više opcija = po jedna stavka za
  svaku opciju, redom iz JSON-a (Masaža leđa 30 pa 60 min). `naUpit` → `{naziv} — cijena na upit`.
- Vrijednost (`value`) = `{id}` ili `{id}:{trajanjeMin}` kad ima više opcija.
- Prva stavka „Odaberite tretman” (prazna vrijednost), zadnja „Nisam sigurna/siguran — trebam savjet”
  (`value="savjet"`).
- (Izbornik u artboardima ima ručno skraćene nazive — vrijedi ovo pravilo.)

### Tekstovi
- Ispod gumba **Pošalji upit**: „Termin je potvrđen kada vas Sanja kontaktira. Za trenutnu online
  rezervaciju koristite Zoyyu.” („Zoyyu” je link na Zoyya stranicu.)
- Tijekom slanja: gumb onemogućen, tekst „Šaljem…”.
- **Uspjeh** — forma se zamjenjuje porukom: kvačica u krugu, „Hvala na upitu!”, „Upit je poslan.
  Sanja će vam se javiti što prije kako bi potvrdila termin.”, gumb „Pošalji novi upit”.
- **Greške uz polja** (ispod polja, povezane s `aria-describedby`, boja `#9A3B2E`, rub polja iste boje):
  - ime: „Upišite ime i prezime.”
  - telefon prazan: „Upišite broj telefona.” · neispravan: „Provjerite broj telefona.”
  - e-mail neispravan: „Provjerite e-mail adresu.” · prazan uz način „E-mail”: „Upišite e-mail ako želite odgovor e-mailom.”
  - datum u prošlosti: „Odaberite današnji ili neki budući datum.” · nedjelja: vidi gore
  - privola: „Za slanje upita potrebna je vaša privola.”
- **Greška pri slanju** (iznad gumba, `role="alert"`): „Upit nije poslan zbog tehničke greške.
  Pokušajte ponovno ili nazovite +385 98 165 4696.” (broj je `tel:` link).

### Slanje (preporuka)
- Next.js **Server Action** (ili Route Handler) → validacija na serveru (npr. `zod`, ista pravila kao
  gore) → e-mail preko servisa za transakcijske e-mailove (npr. **Resend**) na `sanjazrig@gmail.com`,
  `reply-to` = e-mail klijenta ako ga je upisao.
- Varijable okruženja: `RESEND_API_KEY`, `UPIT_EMAIL_TO=sanjazrig@gmail.com`, `UPIT_EMAIL_FROM`
  (adresa na verificiranoj domeni).
- Naslov e-maila: „Novi upit: {naziv tretmana ili ‚bez odabira’} — {ime}”. Tijelo: sva polja (tretman
  puni naziv s trajanjem/cijenom, datum u formatu „subota, 17. 10. 2026.”, vrijeme, način kontakta,
  poruka) i vrijeme slanja (Europe/Zagreb).
- Zaštita od spama, bez baze: honeypot polje + odbaciti slanja brža od 3 s od učitavanja forme
  (skriveni timestamp). Ako spam ipak stiže, dodati Cloudflare Turnstile. Ograničenje po IP-u nije
  potrebno u prvoj verziji.
- Podaci se ne spremaju u bazu (manje obaveza po GDPR-u).

---

## 6. Tekstovi

**O meni** (Sanjin tekst sa Zoyye, minimalno uređen; ispravljeno „želju za suradnju” → „želju za suradnjom”):
> Pozdrav, ja sam Sanja
>
> „Za mene je masaža više od posla – to je poziv koji nosim u srcu.”
>
> Moji tretmani su terapeutskog tipa, a moj prvi instinkt uvijek je pomoći klijentu da se osjeća bolje.
>
> Svakom se klijentu posvećujem u potpunosti, u okviru svojih mogućnosti, s individualnim pristupom
> i punim poštovanjem. Povjerenje koje mi pružate iznimno cijenim – i zato ga nastojim uzvratiti
> jednako iskreno i s poštovanjem.
>
> Ako osjetite želju za suradnjom sa mnom, rezervirajte svoj termin. Dobro mi došli!

Ostali tekstovi (hero, uvodi sekcija, opisi) su u artboardima u `docs/canvas/` i u `tretmani.json`.

---

## 7. Slike (`public/images/`)

Alt tekstovi i `object-position` iz ove tablice vrijede za sva mjesta (artboardi ponegdje imaju
drugačije formulacije — vrijedi tablica).

| Datoteka | Gdje (`object-position`) | Alt tekst |
|---|---|---|
| `logo-znak.png` | zaglavlje, podnožje, favicon (izvesti) | prazan (dekor uz tekstualni logotip) |
| `studio-sanja.jpg` | hero, luk (`50% 72%`) | Sanja u studiju Divine Healing uz klijenticu na stolu za masažu |
| `tajlandska-istezanje-sjedeci.jpg` | kartica tajlandske masaže (`50% 35%`); alternativni hero | Sanja izvodi tradicionalnu tajlandsku masažu — istezanje u sjedećem položaju |
| `terapeutska-masaza-ledja.jpg` | kartica terapeutske (`50% 45%`); slika kategorije Masaže (`50% 40%`) | Sanja izvodi terapeutsku masažu leđa |
| `relax-masaza.jpg` | kartica relax masaže | Relax masaža preko ručnika |
| `antistres-lice-glava.jpg` | kartica antistres i slika kategorije Antistres (`50% 30%`) | Sanja izvodi antistres masažu lica i glave |
| `sportska-masaza.jpg` | kartica sportske masaže (`50% 40%`) | Sportska masaža leđa |
| `maderoterapija-valjci.jpg` | kartica anticelulitnog; slika kategorije Hidžama i tijelo | Drveni valjci i pomagala za maderoterapiju |
| `fohow-bem-uredaj.jpg` | FOHOW sekcija (`50% 50%`), slika FOHOW kategorije (`50% 60%`) | FOHOW BEM 3.0 uređaj sa srebrnim rukavicama i gelovima za masažu |
| `sanja-tajlandska-osmijeh.jpg` | O meni, luk (`50% 30%`) | Sanja Zrig tijekom tajlandske masaže, nasmijana |
| `sanja-masaza-glave.jpg` | O meni, krug (`50% 18%`) | Sanja masira glavu i vrat klijentice |
| `tajlandska-istezanje-ramena.jpg` | galerija | Tajlandska masaža — istezanje ramena |
| `abdominalna-masaza.jpg` | galerija | Abdominalna masaža |
| `tajlandska-istezanje-ruke.jpg` | galerija | Tajlandska masaža — istezanje ruku i leđa |
| `masaza-vrata.jpg` | galerija | Masaža vrata i ramena |
| `zlatna-svila.jpg` | traka u naslovnom dijelu `/tretmani` | prazan (dekor) |

Koristiti `next/image`. Fotografije su do 1080 px širine; `zlatna-svila.jpg` je dekorativna traka 2400 × 533 px.
Originali svih 21 poslanih fotografija su u `assets/originali/` (vidi tamošnji README).

---

## 8. Tehničke preporuke

- **Next.js** (najnovija stabilna, App Router) + **TypeScript** + **Tailwind CSS** (boje i fontovi
  iz §3 kao teme/tokeni).
- Fontovi preko `next/font/google` (`subsets: ['latin', 'latin-ext']`).
- Sadržaj tretmana učitati iz `docs/tretmani.json` (ili ga premjestiti u `src/content/`) —
  jedno mjesto za izmjenu cijena.
- SEO: `metadata` po stranici (hrvatski naslovi/opisi), Open Graph slika, `sitemap.ts`, `robots.ts`,
  JSON-LD tipa `DaySpa`/`HealthAndBeautyBusiness` (adresa, telefon, radno vrijeme, `priceRange`,
  Instagram u `sameAs`).
- Pristupačnost: prave `<button>`/`<a>`/`<label>`, `aria-label` na gumbima samo s ikonom, kontrast
  iz tablice boja, fokus vidljiv, ciljevi dodira ≥ 44 px.
- Karta: link „Upute do studija” na Google Maps (po želji i ugrađena karta ispod kontakt kartice).
- Hosting: Vercel (ili sličan); domena po dogovoru.

---

## 9. Odluke i otvorena pitanja

- **Zdravstvene tvrdnje:** opisi hidžame i FOHOW tretmana su ublaženi — izostavljeno „jaka
  detoksikacija”, „nema nuspojava”, „probija blokade nakupljane godinama”, „osjećaj kao 10–15 masaža
  u jednom tretmanu”, „stimulira kolagen”. Naručitelj se složio. Izvorni tekstovi su u
  `docs/zoyya-izvorni-tekstovi.md`.
- **Fotografije koje se ne koriste:** hidžama s krvlju (originali 01, 05, 09), cupping lica s tuđim
  logom na čaši (02), tamna masaža rukavicama (04), mutnija (12) i duplikat (13 = 11).
- **Stavke s plakata** (FOHOW limfna drenaža, FOHOW Minerals Face Skin Set, Maderoterapija,
  Limfna drenaža, Abdominalna masaža) — ostaju kao „na upit”.
- **Pravopis:** u Sanjinom tekstu ispravljeno „želju za suradnju” → „želju za suradnjom”; Zoyya se
  sklanja (Zoyye, Zoyyi, Zoyyu).
- **Treba od naručitelja:** tekst pravila privatnosti; domena; račun za servis e-maila (Resend ili
  sl.) i potvrda adrese s koje se šalje.

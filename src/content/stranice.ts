import { kategorija, najnizaCijena, trajanjeICijena } from "./tretmani";

/**
 * Stranice tretmana (/tretmani/<slug>) — grupirane po namjeri pretraživanja, ne po jedna za svaki
 * tretman (premalo teksta po tretmanu za zasebnu stranicu).
 *
 * Tekstovi su iz docs/tretmani.json i Sanjinih tekstova sa Zoyye (docs/zoyya-izvorni-tekstovi.md)
 * BEZ zdravstvenih tvrdnji uklonjenih po dogovoru (docs/dizajn.md §9). Cijene i trajanja u tekstu
 * se ne pišu ručno — u redovima cjenika i opisima dolaze iz tretmani.json.
 *
 * U odlomcima se poveznica piše kao [tekst](/putanja).
 */

export type Slika = { src: string; alt: string; sirina: number; visina: number; pozicija?: string };

export type Sekcija = {
  naslov: string;
  odlomci?: string[];
  stavke?: string[];
  citat?: string;
};

export type StranicaTretmana = {
  slug: string;
  /** Kratki naziv: putanja (breadcrumb), „Srodni tretmani” */
  naziv: string;
  title: string;
  description: string;
  h1: string;
  /** Citat ispod H1 (samo FOHOW: odobreni slogan) */
  slogan?: string;
  uvod: string[];
  /** Redovi cjenika na stranici, redom */
  tretmanIds: string[];
  /** Tretman koji se unaprijed odabere u formi za upit */
  upitTretman: string;
  /** Glavna slika (luk) uz cjenik; prva je i Open Graph slika */
  slike: Slika[];
  /** Dodatne fotografije (galerija) */
  galerija?: Slika[];
  sekcije: Sekcija[];
  tamno?: boolean;
};

const terapeutskaSlika: Slika = {
  src: "/images/terapeutska-masaza-ledja.jpg",
  alt: "Sanja izvodi terapeutsku masažu leđa",
  sirina: 768,
  visina: 960,
  pozicija: "50% 40%",
};

export const stranice: StranicaTretmana[] = [
  {
    slug: "terapeutska-masaza",
    naziv: "Terapeutska masaža",
    title: "Terapeutska masaža Zagreb (Kustošija)",
    description: `Terapeutska masaža u Zagrebu (Ilica 322, Kustošija): ${trajanjeICijena("terapeutska-masaza")}. Za ukočene mišiće i napetost u leđima, vratu i ramenima. Rezervirajte online.`,
    h1: "Terapeutska masaža u Zagrebu",
    uvod: [
      "Terapeutska masaža oslobađa tijelo od napetosti, stresa i bolova. U studiju Divine Healing u Ilici 322, u zagrebačkoj Kustošiji, izvodi je Sanja Zrig — uz pritisak i tehnike prilagođene vašim potrebama.",
    ],
    tretmanIds: ["terapeutska-masaza", "masaza-ledja"],
    upitTretman: "terapeutska-masaza",
    slike: [terapeutskaSlika],
    galerija: [
      { src: "/images/masaza-vrata.jpg", alt: "Masaža vrata i ramena", sirina: 421, visina: 743 },
      {
        src: "/images/sanja-masaza-glave.jpg",
        alt: "Sanja masira glavu i vrat klijentice",
        sirina: 612,
        visina: 1090,
        pozicija: "50% 18%",
      },
    ],
    sekcije: [
      {
        naslov: "Kada odabrati terapeutsku masažu",
        odlomci: [
          "Terapeutska masaža dobar je izbor kada osjećate ukočenost mišića, a napetost se nakupila u leđima, vratu ili ramenima pa želite da se masaža usmjeri upravo na ta mjesta. Uz opuštanje mišića poboljšava i cirkulaciju.",
        ],
      },
      {
        naslov: "Što možete očekivati",
        stavke: ["Opuštanje tijela i uma", "Smanjenje stresa i napetosti", "Bolju pokretljivost"],
      },
      {
        naslov: "Sanjin pristup",
        citat: "Moji tretmani su terapeutskog tipa, a moj prvi instinkt uvijek je pomoći klijentu da se osjeća bolje.",
        odlomci: [
          "Svakom se klijentu posvećujem u potpunosti, u okviru svojih mogućnosti, s individualnim pristupom i punim poštovanjem.",
        ],
      },
      {
        naslov: "Terapeutska, sportska ili relax masaža?",
        odlomci: [
          "Terapeutska masaža usmjerena je na napete, ukočene mišiće. [Sportska masaža](/tretmani/sportska-masaza) je intenzivnija i namijenjena aktivnim osobama i oporavku nakon treninga, a [relax masaža](/tretmani/relax-i-antistres-masaza) nježnija je i sporija — za duboko opuštanje.",
          "Ako želite kraći tretman usmjeren samo na leđa, vrat i ramena, odaberite masažu leđa.",
        ],
      },
    ],
  },
  {
    slug: "tajlandska-masaza",
    naziv: "Tradicionalna tajlandska masaža",
    title: "Tradicionalna tajlandska masaža Zagreb",
    description: `Tradicionalna tajlandska masaža u Kustošiji, Zagreb: istezanje i pritisak za opuštanje i bolju fleksibilnost. ${trajanjeICijena("tradicionalna-tajlandska-masaza")}. Rezervirajte termin online.`,
    h1: "Tradicionalna tajlandska masaža u Zagrebu",
    uvod: [
      "Tradicionalna tajlandska masaža spoj je drevne tehnike, istezanja i pritiska koji vraća ravnotežu tijelu i umu. U studiju Divine Healing u Ilici 322 (Kustošija, Zagreb) izvodi je Sanja Zrig.",
    ],
    tretmanIds: ["tradicionalna-tajlandska-masaza"],
    upitTretman: "tradicionalna-tajlandska-masaza",
    slike: [
      {
        src: "/images/tajlandska-istezanje-sjedeci.jpg",
        alt: "Sanja izvodi tradicionalnu tajlandsku masažu — istezanje u sjedećem položaju",
        sirina: 1000,
        visina: 1000,
        pozicija: "50% 35%",
      },
    ],
    galerija: [
      {
        src: "/images/tajlandska-istezanje-ramena.jpg",
        alt: "Tajlandska masaža — istezanje ramena",
        sirina: 768,
        visina: 960,
      },
      {
        src: "/images/tajlandska-istezanje-ruke.jpg",
        alt: "Tajlandska masaža — istezanje ruku i leđa",
        sirina: 768,
        visina: 960,
      },
    ],
    sekcije: [
      {
        naslov: "Kako izgleda tajlandska masaža",
        odlomci: [
          "Tajlandska masaža kombinira ritmični pritisak i istezanje. Tijelo se pažljivo vodi kroz položaje koji istežu ramena, ruke, leđa i noge, a dio istezanja izvodi se i u sjedećem položaju — kao na fotografijama.",
        ],
      },
      {
        naslov: "Za koga je tajlandska masaža",
        odlomci: [
          "Tajlandska masaža pomaže kod ukočenosti, umora i stresa te poboljšava fleksibilnost. Odgovara onima koji uz opuštanje žele i osjećaj istegnutog, pokretljivijeg tijela.",
        ],
        stavke: [
          "Duboko opuštanje",
          "Veća pokretljivost tijela",
          "Oslobađanje napetosti i stresa",
          "Osjećaj lakoće",
        ],
      },
      {
        naslov: "Tajlandska ili terapeutska masaža?",
        odlomci: [
          "[Terapeutska masaža](/tretmani/terapeutska-masaza) usmjerena je na napete mišiće leđa, vrata i ramena, dok tajlandska više radi s istezanjem i pokretljivošću cijelog tijela. Ako niste sigurni što vam više odgovara, [pošaljite upit](/?tretman=savjet#upit) ili nazovite — zajedno ćemo odabrati tretman.",
        ],
      },
    ],
  },
  {
    slug: "sportska-masaza",
    naziv: "Sportska masaža",
    title: "Sportska masaža Zagreb (Kustošija)",
    description: `Sportska masaža u Zagrebu (Ilica 322, Kustošija): ciljana masaža za aktivne osobe i sportaše i oporavak nakon treninga. ${trajanjeICijena("sportska-masaza")}. Rezervirajte online.`,
    h1: "Sportska masaža u Zagrebu",
    uvod: [
      "Za aktivne osobe i sportaše: sportska masaža u studiju Divine Healing u Ilici 322, u zagrebačkoj Kustošiji, usmjerena je na mišiće koji su pod najvećim opterećenjem — za pripremu, opuštanje i oporavak nakon treninga.",
    ],
    tretmanIds: ["sportska-masaza"],
    upitTretman: "sportska-masaza",
    slike: [
      {
        src: "/images/sportska-masaza.jpg",
        alt: "Sportska masaža leđa",
        sirina: 612,
        visina: 1090,
        pozicija: "50% 40%",
      },
    ],
    sekcije: [
      {
        naslov: "Kome je namijenjena sportska masaža",
        odlomci: [
          "Sportska masaža prilagođava se potrebama aktivnih osoba i sportaša. Fokus je na opuštanju i pripremi mišića, smanjenju mišićne napetosti i podršci oporavku nakon fizičkog napora.",
          "Može biti posebno korisna nakon intenzivnog treninga, kod osjećaja umornih i zategnutih mišića ili kao dio redovite brige o tijelu.",
        ],
      },
      {
        naslov: "Po čemu se razlikuje od drugih masaža",
        odlomci: [
          "To je intenzivnija masaža, usmjerena na mišiće i dijelove tijela koji su pod većim opterećenjem. Ako vam je cilj prije svega opuštanje, bolji izbor je [relax masaža](/tretmani/relax-i-antistres-masaza), a za dulji tretman usmjeren na napete mišiće leđa, vrata i ramena tu je [terapeutska masaža](/tretmani/terapeutska-masaza).",
          "Za ciljani rad na napetim točkama leđa možete probati i [ultrazvučnu masažu leđa](/tretmani/fohow-bem-masaze) uređajem FOHOW BEM 3.0.",
        ],
      },
      {
        naslov: "Termin uz vaš raspored treninga",
        odlomci: [
          "Studio radi od ponedjeljka do petka od 10 do 21 h i subotom od 13 do 19 h, pa termin možete uskladiti i s večernjim treninzima. Rezervirajte online putem Zoyye ili pošaljite upit.",
        ],
      },
    ],
  },
  {
    slug: "relax-i-antistres-masaza",
    naziv: "Relax i antistres masaža",
    title: "Relax i antistres masaža Zagreb",
    description: `Relax masaža, masaža cijelog tijela i antistres tretmani lica, glave i vrata u Kustošiji, Zagreb. Od ${najnizaCijena(["relax-masaza", "masaza-cijelog-tijela", "antistres-ledja-vrat-glava-lice", "antistres-lice-glava-ramena"])} €. Rezervirajte termin online.`,
    h1: "Relax i antistres masaža u Zagrebu",
    uvod: [
      "Kada ne želite „razraditi” mišiće, nego usporiti, opustiti tijelo i napuniti baterije. Relax masaža, masaža cijelog tijela i antistres tretmani u studiju Divine Healing u Ilici 322 (Kustošija, Zagreb) namijenjeni su upravo tome.",
    ],
    tretmanIds: ["relax-masaza", "masaza-cijelog-tijela", "antistres-ledja-vrat-glava-lice", "antistres-lice-glava-ramena"],
    upitTretman: "relax-masaza",
    slike: [
      {
        src: "/images/relax-masaza.jpg",
        alt: "Relax masaža preko ručnika",
        sirina: 768,
        visina: 960,
        pozicija: "50% 45%",
      },
    ],
    galerija: [
      {
        src: "/images/antistres-lice-glava.jpg",
        alt: "Sanja izvodi antistres masažu lica i glave",
        sirina: 1000,
        visina: 1250,
        pozicija: "50% 30%",
      },
      {
        src: "/images/sanja-masaza-glave.jpg",
        alt: "Sanja masira glavu i vrat klijentice",
        sirina: 612,
        visina: 1090,
        pozicija: "50% 18%",
      },
    ],
    sekcije: [
      {
        naslov: "Relax masaža",
        odlomci: [
          "Glavni cilj relax masaže je duboko opuštanje tijela i uma. Pokreti su uglavnom ritmični i ugodni, a pritisak se prilagođava vašim željama — idealna je kada vam nije cilj „razraditi” mišiće, nego usporiti.",
        ],
      },
      {
        naslov: "Masaža cijelog tijela",
        odlomci: [
          "Masaža cijelog tijela idealna je nakon napornog dana: opušta tijelo, smanjuje napetost i umor te vraća osjećaj lakoće i boljeg raspoloženja.",
        ],
      },
      {
        naslov: "Antistres tretmani lica, glave, vrata i leđa",
        odlomci: [
          "Antistres tretmani osmišljeni su za oslobađanje od svakodnevnog stresa, napetosti i umora — za sve koji osjećaju posljedice ubrzanog načina života, mentalnog opterećenja i svakodnevnih obaveza.",
          "Kombinacija nježnih i umirujućih tehnika pruža trenutak potpunog opuštanja tijela i duha. Dulji tretman obuhvaća leđa, vrat, glavu i lice, a kraći je usmjeren na lice, glavu i ramena.",
        ],
      },
      {
        naslov: "Koji tretman odabrati",
        odlomci: [
          "Ako imate malo vremena, kratki antistres tretman lica, glave i ramena pravi je predah usred dana. Za potpuno opuštanje odaberite relax masažu ili masažu cijelog tijela, a za leđa, vrat, glavu i lice zajedno — dulji antistres tretman.",
          "Kad je napetost u mišićima izraženija, pogledajte [terapeutsku masažu](/tretmani/terapeutska-masaza).",
        ],
      },
    ],
  },
  {
    slug: "fohow-bem-masaze",
    naziv: "FOHOW BEM 3.0 masaže",
    title: "FOHOW BEM 3.0 masaže Zagreb (Kustošija)",
    description: `FOHOW BEM 3.0 masaže u Zagrebu: bio-meridijanska masaža srebrnim rukavicama, ultrazvučna masaža leđa i face lifting. Ilica 322, Kustošija. Od ${najnizaCijena(kategorija("fohow").tretmani.filter((t) => !t.naUpit).map((t) => t.id))} €.`,
    h1: "FOHOW BEM 3.0 masaže u Zagrebu",
    slogan: kategorija("fohow").slogan,
    uvod: [
      "FOHOW BEM 3.0 uređaj i srebrne rukavice stimuliraju meridijanske puteve i šalju blage bio-električne signale kroz fasciju i živce — tretman koji ide dublje od same masaže rukama. FOHOW BEM 3.0 masaže izvodi Sanja Zrig u studiju Divine Healing u Ilici 322 (Kustošija, Zagreb).",
    ],
    tretmanIds: kategorija("fohow").tretmani.map((t) => t.id),
    upitTretman: "biomeridijanska-masaza-srebrnim-rukavicama",
    tamno: true,
    slike: [
      {
        src: "/images/fohow-bem-uredaj.jpg",
        alt: "FOHOW BEM 3.0 uređaj sa srebrnim rukavicama i gelovima za masažu",
        sirina: 1026,
        visina: 1264,
        pozicija: "50% 60%",
      },
    ],
    sekcije: [
      {
        naslov: "Kako izgleda tretman",
        odlomci: [
          "Tijekom tretmana možete osjetiti valove kroz tijelo, duboko oslobađanje i trenutnu lakoću. Bioenergetski masažer ili rukavice stimuliraju meridijane i biološki aktivne točke na tijelu — po principima akupresure i tradicionalne istočnjačke masaže.",
        ],
      },
      {
        naslov: "Rukavice, masažer i ultrazvuk",
        odlomci: [
          "Kod bio-meridijanskih masaža uređaj FOHOW BEM 3.0 radi preko srebrnih rukavica ili bioenergetskog masažera, kojima se masiraju meridijanski putevi — na cijelom tijelu ili samo na leđima ili nogama.",
          "Ultrazvučni tretmani koriste ultrazvučne vibracije: kod masaže leđa usmjerene su na triger točke i napete mišiće, a kod tretmana lica na cirkulaciju i njegu kože.",
        ],
      },
      {
        naslov: "Koji FOHOW tretman odabrati",
        odlomci: [
          "Ako vas muče prije svega leđa, odaberite ultrazvučnu masažu leđa ili bio-meridijansku masažu leđa. Za lice su tu ultrazvučni face lifting i kozmetička BEM masaža, a FOHOW limfna drenaža i FOHOW Minerals Face Skin Set dostupni su na upit.",
          "Uređaj BEM 3.0 koristi se i u [anticelulitnom tretmanu nogu](/tretmani#tijelo), uz cupping čašice i maderoterapijske valjke.",
        ],
      },
    ],
  },
];

export function stranica(slug: string): StranicaTretmana {
  const s = stranice.find((x) => x.slug === slug);
  if (!s) throw new Error(`Nepoznata stranica tretmana: ${slug}`);
  return s;
}

export const putanjaStranice = (slug: string) => `/tretmani/${slug}`;

/** Tretman → stranica koja ga detaljnije opisuje (za interne poveznice iz cjenika i kartica). */
const tretmanUStranicu = new Map<string, string>(
  stranice.flatMap((s) => s.tretmanIds.map((id) => [id, s.slug] as const)),
);

export function stranicaZaTretman(id: string): string | undefined {
  const slug = tretmanUStranicu.get(id);
  return slug ? putanjaStranice(slug) : undefined;
}

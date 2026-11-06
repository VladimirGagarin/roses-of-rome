import { TheSonnet, TheVision, OurMotive, ThePrayer } from "./studio.js";

export const SITE_URL = "https://vladimirgagarin.github.io/roses-of-rome";

const ORG = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Roses Of Rome Pictures",
  alternateName: ["RORP", "Roses of Rome"],
  description:
    "Independent creative studio and publishing identity associated with film, music, animation, and visual storytelling. Founded 31 July 2025 in Kenya. Motto: Aeternum Floreamus.",
  foundingDate: "2025-07-31",
  slogan: "Connoisseurs of Film, Music & Animation",
  motto: "AETERNUM FLOREAMUS — Let us bloom forever.",
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/rorps.png`,
  image: `${SITE_URL}/rorps.png`,
  email: "rosesofromepictures@gmail.com",
  location: {
    "@type": "Place",
    address: { "@type": "PostalAddress", addressCountry: "KE" },
  },
  sameAs: ["https://youtube.com/@rosesofrome", "https://tiktok.com/@roses_of_rome"],
};

function breadcrumbList(items) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

function webPageLd({ path, title, description, crumbs, mainEntity }) {
  const graph = [
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/${path}#webpage`,
      url: `${SITE_URL}/${path}`,
      name: title,
      description,
      isPartOf: {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: "Roses Of Rome Pictures",
        url: `${SITE_URL}/`,
      },
      about: ORG,
    },
    breadcrumbList(crumbs),
  ];

  if (Array.isArray(mainEntity)) {
    graph.push(...mainEntity);
  } else if (mainEntity) {
    graph.push(mainEntity);
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

const lyricsOf = (poem) =>
  poem.verses.flatMap((block) => block.verse.map((line) => line.en)).join("\n");

const anthem = TheSonnet();
const motive = OurMotive();
const vision = TheVision();
const prayer = ThePrayer();

export const ABOUT_POEMS = {
  "our-anthem": {
    data: anthem,
    video: {
      url: "https://www.youtube.com/embed/7_Vfg95Ejpk?list=PLqHrzzLZzTgvh-UetjP_26ekPVhgXOnzH",
      ytTitle: "Roses Of Rome Pictures Anthem | The Blooming Sonnet | With Official Flag",
    },
    intro: {
      en: "The official anthem of Roses Of Rome Pictures is “The Blooming Sonnet” — a song of beauty, memory, and the eternal bloom of the studio. Its chorus carries the studio's promise: “Roses of Rome, let us bloom forever.”",
      it: "L'inno ufficiale delle Rose di Roma è “Il Sonetto in Fiore” — un canto di bellezza, memoria e fioritura eterna dello studio. Il suo ritornello porta la promessa dello studio: “Rose di Roma, fioriamo per sempre.”",
    },
  },
  "our-motive": {
    data: motive,
    intro: {
      en: "“Our Motive” is the poetic statement of purpose of Roses Of Rome Pictures — blooming in film, in music, and in song while carrying beauty forward through every frame and every tone.",
      it: "“Il nostro motivo” è la dichiarazione poetica di intenti delle Rose di Roma — fiorire nel cinema, nella musica e nel canto, portando la bellezza avanti attraverso ogni immagine e ogni suono.",
    },
  },
  "our-vision": {
    data: vision,
    video: {
      url: "https://www.youtube.com/embed/mm_YE8V6HZM?list=PLqHrzzLZzTgvh-UetjP_26ekPVhgXOnzH",
      ytTitle: "Roses of Rome Vision | Rosa Di Roma Visione",
    },
    intro: {
      en: "“Our Vision” sets out the studio's creed: beauty is heirloom and fire, love conquers all, and kindness crowns us all. It is a vision of art that outlives the moment in which it is created.",
      it: "“La Nostra Visione” espone il credo dello studio: la bellezza è eredità e fiamma, l'amore vince su tutto e la gentilezza incorona tutti. È una visione dell'arte che sopravvive al momento in cui viene creata.",
    },
  },
  "our-prayer": {
    data: prayer,
    intro: {
      en: "“Our Prayer” is the Roses Of Rome Pictures poem of hope, love, kindness, and beauty — a prayer that what is beautiful inside us will never die, and that we will still remain the Roses of Rome.",
      it: "“La Nostra Preghiera” è la poesia delle Rose di Roma dedicata alla speranza, all'amore, alla gentilezza e alla bellezza — una preghiera che ciò che è bello dentro di noi non muoia mai e che resteremo sempre le Rose di Roma.",
    },
  },
};

export const ABOUT_SYMBOLS = {
  "our-flag": {
    heading: {
      en: "The Official Flag of Roses Of Rome Pictures",
      it: "La Bandiera Ufficiale delle Rose di Roma",
    },
    intro: {
      en: "The flag of Roses Of Rome Pictures carries the studio's visual identity into the world. It joins the golden rose, the laurel wreath, and the words AETERNUM FLOREAMUS into a single emblem of beauty, kindness, and lasting creativity.",
      it: "La bandiera delle Rose di Roma porta nel mondo l'identità visiva dello studio. Unisce la rosa d'oro, la corona d'alloro e le parole AETERNUM FLOREAMUS in un unico emblema di bellezza, gentilezza e creatività duratura.",
    },
    paragraphs: {
      en: [
        "The official flag is used across Roses Of Rome Pictures films, music videos, animation, and digital publications. It represents the studio's creative home and its motto, AETERNUM FLOREAMUS — “Let us bloom forever.”",
        "Its imagery draws on Roman and classical symbolism: the rose for beauty, the laurel for love and kindness, and gold for enduring value and aspiration. The flag is designed to remain recognisable in cinematic, print, and small-screen formats.",
        "The flag is part of the same visual system as the official logo and official motto, forming a consistent identity for Roses Of Rome Pictures and Aeternum Floreamus Production.",
      ],
      it: [
        "La bandiera ufficiale accompagna film, video musicali, animazioni e pubblicazioni digitali delle Rose di Roma. Rappresenta la casa creativa dello studio e il suo motto, AETERNUM FLOREAMUS — “Fioriamo per sempre.”",
        "La sua immagine attinge al simbolismo romano e classico: la rosa per la bellezza, l'alloro per l'amore e la gentilezza, l'oro per il valore duraturo e l'aspirazione. La bandiera è pensata per restare riconoscibile nel cinema, nella stampa e sugli schermi piccoli.",
        "La bandiera fa parte dello stesso sistema visivo del logo ufficiale e del motto ufficiale, formando un'identità coerente per Roses Of Rome Pictures e Aeternum Floreamus Production.",
      ],
    },
    imageKey: "flag",
    imageAlt: {
      en: "Official flag of Roses Of Rome Pictures",
      it: "Bandiera ufficiale delle Rose di Roma",
    },
  },
  "our-logo": {
    heading: {
      en: "The Official Logo of Roses Of Rome Pictures",
      it: "Il Logo Ufficiale delle Rose di Roma",
    },
    intro: {
      en: "The official logo of Roses Of Rome Pictures is a golden rose enclosed within a laurel wreath. It is the studio's primary emblem and the mark that identifies its film, music, animation, and publishing work.",
      it: "Il logo ufficiale delle Rose di Roma è una rosa d'oro racchiusa in una corona d'alloro. È l'emblema principale dello studio e il segno che identifica il suo lavoro nel cinema, nella musica, nell'animazione e nell'editoria.",
    },
    paragraphs: {
      en: [
        "The logo's symbolism is deliberate. The rose represents beauty; the laurel represents love and kindness; gold represents enduring value and aspiration. Together they express the studio's central idea of Aeternum Floreamus — “Let us bloom forever.”",
        "The mark is used on official materials, title cards, publications, and studio communications. It is designed to work alongside the official flag and the official motto as part of one coherent visual language.",
        "Roses Of Rome Pictures frequently pairs the emblem with Roman and classical imagery, including laurel, roses, architectural motifs, and cinematic environments.",
      ],
      it: [
        "Il simbolismo del logo è preciso. La rosa rappresenta la bellezza; l'alloro rappresenta l'amore e la gentilezza; l'oro rappresenta il valore duraturo e l'aspirazione. Insieme esprimono l'idea centrale dello studio: Aeternum Floreamus — “Fioriamo per sempre.”",
        "Il segno è usato su materiali ufficiali, titoli, pubblicazioni e comunicazioni dello studio. È pensato per convivere con la bandiera ufficiale e il motto ufficiale come parte di un unico linguaggio visivo coerente.",
        "Le Rose di Roma accompagnano spesso l'emblema con immagini romane e classiche, tra cui alloro, rose, motivi architettonici e ambienti cinematografici.",
      ],
    },
    imageKey: "logo",
    imageAlt: {
      en: "Official logo of Roses Of Rome Pictures — golden rose and laurel wreath",
      it: "Logo ufficiale delle Rose di Roma — rosa d'oro e corona d'alloro",
    },
  },
  "our-motto": {
    heading: {
      en: "Our Motto — AETERNUM FLOREAMUS",
      it: "Il Nostro Motto — AETERNUM FLOREAMUS",
    },
    intro: {
      en: "The official motto of Roses Of Rome Pictures is AETERNUM FLOREAMUS, Latin for “Let us bloom forever.” It is the heart of the studio's identity and the idea that connects its films, music, animation, poetry, and publishing.",
      it: "Il motto ufficiale delle Rose di Roma è AETERNUM FLOREAMUS, latino per “Fioriamo per sempre.” È il cuore dell'identità dello studio e l'idea che unisce i suoi film, la sua musica, l'animazione, la poesia e l'editoria.",
    },
    paragraphs: {
      en: [
        "Aeternum Floreamus is more than a slogan. It describes the studio's belief that beauty, art, kindness, creativity, and human expression should continue to flourish beyond the moment in which they are created.",
        "The motto appears on the official logo, the official flag, and the studio's creative works. Its associated expression, “May You Bloom Forever,” is also part of the Roses Of Rome creative language.",
        "The concept of blooming recurs as a metaphor for creativity, human potential, beauty, kindness, artistic development, and the continuation of ideas through time.",
      ],
      it: [
        "Aeternum Floreamus è più di uno slogan. Descrive la convinzione dello studio che bellezza, arte, gentilezza, creatività ed espressione umana debbano continuare a fiorire oltre il momento in cui vengono create.",
        "Il motto appare sul logo ufficiale, sulla bandiera ufficiale e nelle opere creative dello studio. L'espressione associata, “Che tu possa fiorire per sempre,” fa parte del linguaggio creativo delle Rose di Roma.",
        "Il concetto di fioritura ricorre come metafora della creatività, del potenziale umano, della bellezza, della gentilezza, dello sviluppo artistico e della continuità delle idee nel tempo.",
      ],
    },
    imageKey: "motto",
    imageAlt: {
      en: "Official motto of Roses Of Rome Pictures — Aeternum Floreamus",
      it: "Motto ufficiale delle Rose di Roma — Aeternum Floreamus",
    },
  },
};

const CRUMBS = {
  home: { name: "Home", path: "/" },
  about: { name: "About", path: "/about/" },
};

function section({
  slug,
  label,
  summary,
  kind,
  title,
  description,
  keywords,
  mainEntity,
}) {
  const path = `about/${slug}/`;
  return {
    slug,
    path,
    kind,
    label,
    summary,
    title,
    description,
    keywords,
    jsonLd: webPageLd({
      path,
      title,
      description,
      crumbs: [
        CRUMBS.home,
        CRUMBS.about,
        { name: label.en, path: `/${path}` },
      ],
      mainEntity,
    }),
  };
}

const poemWork = (slug, name, description, poem, isAnthem = false) => {
  const lyrics = lyricsOf(poem);
  const common = {
    "@type": isAnthem ? "MusicComposition" : "CreativeWork",
    "@id": `${SITE_URL}/about/${slug}/#work`,
    name,
    description,
    url: `${SITE_URL}/about/${slug}/`,
    inLanguage: ["en", "it"],
    creator: ORG,
    publisher: ORG,
  };

  if (isAnthem) {
    return {
      ...common,
      alternateName: [
        "Our Anthem",
        "Blooming Sonnet",
        "The Blooming Sonnet",
        "Roses Of Rome Pictures Anthem",
      ],
      genre: "Anthem",
      lyrics: {
        "@type": "CreativeWork",
        text: lyrics,
        inLanguage: ["en", "it"],
      },
    };
  }

  return {
    ...common,
    genre: "Poetry",
    text: lyrics,
  };
};

const symbolWork = (slug, name, description) => ({
  "@type": "VisualArtwork",
  "@id": `${SITE_URL}/about/${slug}/#artwork`,
  name,
  description,
  url: `${SITE_URL}/about/${slug}/`,
  image: `${SITE_URL}/rorps.png`,
  artform: "Emblem",
  creator: ORG,
  inLanguage: "en",
});

export const ABOUT_HUB = {
  slug: "about",
  path: "about/",
  title: "About Roses Of Rome Pictures | RORP — Anthem, Flag, Logo, Motto & Vision",
  description:
    "Discover Roses Of Rome Pictures (RORP), an independent Kenyan creative studio founded 31 July 2025. Explore who we are, our anthem, official flag, logo, motto, motive, vision, and prayer.",
  keywords:
    "Roses Of Rome Pictures, RORP, about Roses of Rome, Roses of Rome anthem, Roses of Rome flag, Roses of Rome logo, Roses of Rome motto, Aeternum Floreamus, Kenyan creative studio",
  jsonLd: webPageLd({
    path: "about/",
    title: "About Roses Of Rome Pictures | RORP — Anthem, Flag, Logo, Motto & Vision",
    description:
      "Discover Roses Of Rome Pictures (RORP), an independent Kenyan creative studio founded 31 July 2025. Explore who we are, our anthem, official flag, logo, motto, motive, vision, and prayer.",
    crumbs: [CRUMBS.home, CRUMBS.about],
    mainEntity: ORG,
  }),
};

export const ABOUT_SECTIONS = [
  section({
    slug: "who-we-are",
    kind: "article",
    label: { en: "Who We Are", it: "Chi Siamo" },
    summary: {
      en: "The studio's history, name and motto, creative work, visual identity, publishing, philosophy, and brand structure.",
      it: "La storia dello studio, il nome e il motto, il lavoro creativo, l'identità visiva, l'editoria, la filosofia e la struttura del marchio.",
    },
    title:
      "Who We Are — Roses Of Rome Pictures (RORP) | History, Name & Visual Identity",
    description:
      "Who are Roses Of Rome Pictures? Read the studio's history, name and motto, creative work, visual identity, publishing, philosophy, and brand structure. Founded 31 July 2025 in Kenya.",
    keywords:
      "Who are Roses Of Rome Pictures, RORP history, Roses of Rome name and motto, Aeternum Floreamus, Kenyan film studio, Roses of Rome visual identity, Roses of Rome publishing, Roses of Rome philosophy",
    mainEntity: ORG,
  }),
  section({
    slug: "our-anthem",
    kind: "poem",
    label: { en: "Our Anthem", it: "Il Nostro Inno" },
    summary: {
      en: "The official Roses Of Rome anthem, “Blooming Sonnet,” with full lyrics in English and Italian plus the official video.",
      it: "L'inno ufficiale delle Rose di Roma, “Il Sonetto in Fiore,” con testo completo in inglese e italiano e il video ufficiale.",
    },
    title:
      "Our Anthem — Blooming Sonnet | Roses Of Rome Pictures Anthem Lyrics & Video",
    description:
      "Listen to and read the official Roses Of Rome Pictures anthem, “Blooming Sonnet” — “Roses of Rome, let us bloom forever.” Full lyrics in English and Italian, with the official video.",
    keywords:
      "Roses of Rome Pictures anthem, Roses of Rome anthem, Blooming Sonnet, The Blooming Sonnet lyrics, Roses of Rome let us bloom forever, RORP anthem, Aeternum Floreamus song, Roses of Rome music",
    mainEntity: poemWork(
      "our-anthem",
      "Our Anthem — Blooming Sonnet",
      "The official anthem of Roses Of Rome Pictures, also known as The Blooming Sonnet. The song carries the studio's promise: “Roses of Rome, let us bloom forever.”",
      anthem,
      true
    ),
  }),
  section({
    slug: "our-flag",
    kind: "symbol",
    label: { en: "Our Flag", it: "La Nostra Bandiera" },
    summary: {
      en: "The official flag of Roses Of Rome Pictures, its Roman symbolism, colors, and place in the studio's visual identity.",
      it: "La bandiera ufficiale delle Rose di Roma, il suo simbolismo romano, i colori e il suo ruolo nell'identità visiva dello studio.",
    },
    title: "Our Flag — The Official Flag of Roses Of Rome Pictures | RORP",
    description:
      "See the official flag of Roses Of Rome Pictures and discover its symbolism, colors, and meaning within the studio's Aeternum Floreamus identity.",
    keywords:
      "Roses of Rome Pictures flag, Roses of Rome flag, RORP official flag, Roses of Rome emblem, Aeternum Floreamus flag, Kenyan creative studio flag",
    mainEntity: symbolWork(
      "our-flag",
      "The Official Flag of Roses Of Rome Pictures",
      "The official flag of Roses Of Rome Pictures, combining the golden rose, laurel wreath, and Aeternum Floreamus motto."
    ),
  }),
  section({
    slug: "our-logo",
    kind: "symbol",
    label: { en: "Our Logo", it: "Il Nostro Logo" },
    summary: {
      en: "The golden rose and laurel wreath emblem of Roses Of Rome Pictures, and what each element symbolizes.",
      it: "L'emblema della rosa d'oro e della corona d'alloro delle Rose di Roma, e il significato di ogni elemento.",
    },
    title:
      "Our Logo — The Golden Rose & Laurel Emblem of Roses Of Rome Pictures",
    description:
      "Explore the official Roses Of Rome Pictures logo: a golden rose enclosed in a laurel wreath, symbolizing beauty, love, kindness, and enduring value.",
    keywords:
      "Roses of Rome Pictures logo, Roses of Rome logo, golden rose laurel wreath, RORP logo meaning, Roses of Rome emblem, official logo Roses of Rome",
    mainEntity: symbolWork(
      "our-logo",
      "The Official Logo of Roses Of Rome Pictures",
      "The official logo of Roses Of Rome Pictures: a golden rose enclosed in a laurel wreath, symbolizing beauty, love, kindness, and enduring value."
    ),
  }),
  section({
    slug: "our-motto",
    kind: "symbol",
    label: { en: "Our Motto", it: "Il Nostro Motto" },
    summary: {
      en: "AETERNUM FLOREAMUS — “Let us bloom forever” — the Latin motto at the heart of the studio.",
      it: "AETERNUM FLOREAMUS — “Fioriamo per sempre” — il motto latino al cuore dello studio.",
    },
    title:
      "Our Motto — AETERNUM FLOREAMUS | Let Us Bloom Forever — Roses Of Rome",
    description:
      "AETERNUM FLOREAMUS means “Let us bloom forever.” Discover the official motto of Roses Of Rome Pictures and the meaning behind the studio's creative philosophy.",
    keywords:
      "Roses of Rome motto, Aeternum Floreamus, Let us bloom forever, Roses of Rome Pictures motto, Aeternum Floreamus meaning, RORP motto",
    mainEntity: symbolWork(
      "our-motto",
      "Our Motto — AETERNUM FLOREAMUS",
      "AETERNUM FLOREAMUS, Latin for “Let us bloom forever,” is the official motto of Roses Of Rome Pictures."
    ),
  }),
  section({
    slug: "our-motive",
    kind: "poem",
    label: { en: "Our Motive", it: "Il Nostro Motivo" },
    summary: {
      en: "The poetic statement of purpose behind Roses Of Rome Pictures: blooming in film, music, and song.",
      it: "La dichiarazione poetica di intenti delle Rose di Roma: fiorire nel cinema, nella musica e nel canto.",
    },
    title: "Our Motive — The Creative Purpose of Roses Of Rome Pictures",
    description:
      "Read “Our Motive,” the poetic statement of purpose of Roses Of Rome Pictures: blooming in film, music, and song while carrying beauty forward.",
    keywords:
      "Roses of Rome motive, Our Motive Roses of Rome, Roses of Rome Pictures purpose, Roses of Rome poem, RORP creative mission",
    mainEntity: poemWork(
      "our-motive",
      "Our Motive",
      "The poetic statement of purpose of Roses Of Rome Pictures: blooming in film, in music, and in song.",
      motive
    ),
  }),
  section({
    slug: "our-vision",
    kind: "poem",
    label: { en: "Our Vision", it: "La Nostra Visione" },
    summary: {
      en: "Beauty as heirloom and fire, love conquering all, and kindness crowning us all — the studio's poetic vision.",
      it: "La bellezza come eredità e fiamma, l'amore che vince su tutto e la gentilezza che incorona tutti — la visione poetica dello studio.",
    },
    title: "Our Vision — Beauty, Love & Kindness | Roses Of Rome Pictures",
    description:
      "Read “Our Vision” by Roses Of Rome Pictures — a poetic vision of beauty as heirloom and fire, love conquering all, and kindness crowning us all.",
    keywords:
      "Roses of Rome vision, Our Vision Roses of Rome, Roses of Rome Pictures vision, Roses of Rome poem, RORP vision, Aeternum Floreamus vision",
    mainEntity: poemWork(
      "our-vision",
      "Our Vision",
      "The poetic vision of Roses Of Rome Pictures: beauty is heirloom and fire, love conquers all, and kindness crowns us all.",
      vision
    ),
  }),
  section({
    slug: "our-prayer",
    kind: "poem",
    label: { en: "Our Prayer", it: "La Nostra Preghiera" },
    summary: {
      en: "A poem of hope, love, kindness, and beauty — and the promise that we still remain the Roses of Rome.",
      it: "Una poesia di speranza, amore, gentilezza e bellezza — e la promessa che resteremo sempre le Rose di Roma.",
    },
    title: "Our Prayer — The Roses Of Rome Pictures Prayer & Poem",
    description:
      "Read “Our Prayer,” the Roses Of Rome Pictures poem of hope, love, kindness, and beauty, ending with the promise: we still remain the Roses of Rome.",
    keywords:
      "Roses of Rome prayer, Our Prayer Roses of Rome, Roses of Rome Pictures prayer, Roses of Rome poem, RORP prayer",
    mainEntity: poemWork(
      "our-prayer",
      "Our Prayer",
      "The Roses Of Rome Pictures poem of hope, love, kindness, and beauty, ending with the promise that we still remain the Roses of Rome.",
      prayer
    ),
  }),
];

export const ABOUT_PAGES = Object.fromEntries(
  ABOUT_SECTIONS.map((page) => [page.slug, page])
);

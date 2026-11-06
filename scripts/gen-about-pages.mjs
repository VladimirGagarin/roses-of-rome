// Emit crawlable HTML documents for the About hub and each About section.
// The React app still takes over in the browser; this markup gives crawlers and
// no-JavaScript clients useful, route-specific content immediately.
import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import {
  ABOUT_HUB,
  ABOUT_PAGES,
  ABOUT_POEMS,
  ABOUT_SECTIONS,
  ABOUT_SYMBOLS,
  SITE_URL,
} from "../src/data/aboutPages.js";

const DIST = resolve(process.cwd(), "dist");
const escapeHtml = (value = "") => String(value).replace(/[&<>\"]/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;",
}[char]));

function poemLyrics(poem) {
  return poem.verses.map((block) => `<p>${block.verse.map((line) => escapeHtml(line.en)).join("<br>")}</p>`).join("\n");
}

function aboutBody() {
  const links = ABOUT_SECTIONS.map((page) =>
    `<li><a href="${SITE_URL}/${page.path}">${escapeHtml(page.label.en)}</a><p>${escapeHtml(page.summary.en)}</p></li>`
  ).join("\n");
  return `<main class="container page-section about-page about-hub"><header class="about-hub-hero"><span class="kicker">Roses Of Rome Pictures</span><h1>About Roses Of Rome Pictures</h1><p>${escapeHtml(ABOUT_HUB.description)}</p></header><section><h2>Explore the studio</h2><ul>${links}</ul></section></main>`;
}

function whoBody() {
  const page = ABOUT_PAGES["who-we-are"];
  return `<main class="container page-section about-page about-detail"><article class="wiki-article"><h1>Who We Are — Roses Of Rome Pictures</h1><p class="wiki-shortdesc">${escapeHtml(page.description)}</p><table class="infobox"><caption>Roses Of Rome Pictures</caption><tbody><tr><th>Abbreviation</th><td>RORP</td></tr><tr><th>Type</th><td>Creative studio and publishing identity</td></tr><tr><th>Industry</th><td>Film, music, animation, digital media</td></tr><tr><th>Founded</th><td>31 July 2025</td></tr><tr><th>Based in</th><td>Kenya</td></tr><tr><th>Production identity</th><td>Aeternum Floreamus Production</td></tr><tr><th>Motto</th><td><a href="${SITE_URL}/about/our-motto/">AETERNUM FLOREAMUS</a></td></tr></tbody></table><p><strong>Roses Of Rome Pictures (RORP)</strong> is an independent creative studio and publishing identity associated with film, music, animation, and visual storytelling. Founded on 31 July 2025 in Kenya, its motto is <a href="${SITE_URL}/about/our-motto/">AETERNUM FLOREAMUS — Let us bloom forever.</a></p><p>The studio describes itself as “Connoisseurs of Film, Music &amp; Animation.”</p><section><h2>History</h2><p>Roses Of Rome Pictures was established as a creative project centered on film, music, animation, and artistic storytelling. Its name brings together the rose as an image of beauty and Rome as a reference to cultural and historical heritage.</p></section><section><h2>Creative work</h2><p>The studio creates film, original music, animation, visual storytelling, poetry, and digital media, sharing projects through online platforms including YouTube and TikTok.</p><p>Its <a href="${SITE_URL}/about/our-anthem/">official anthem, “The Blooming Sonnet”</a>, carries the promise “Roses of Rome, let us bloom forever.”</p></section><section><h2>Visual identity</h2><p>The golden rose represents beauty, the laurel represents love and kindness, and gold represents lasting value and aspiration. The emblem appears in the <a href="${SITE_URL}/about/our-logo/">official logo</a> and <a href="${SITE_URL}/about/our-flag/">official flag</a>.</p></section><section><h2>Production and publishing</h2><p>Aeternum Floreamus Production is the production identity associated with Roses Of Rome Pictures. Its literary work includes “AETERNUM FLOREAMUS 101 – The Art of Blooming Forever,” a planned collection exploring themes of love, beauty, kindness, music, life, joy, and eternity.</p></section><section><h2>Philosophy</h2><p>The studio’s recurring creative philosophy centers on beauty, kindness, human expression, and the idea that creative work can continue to influence others over time. This outlook is expressed in <a href="${SITE_URL}/about/our-vision/">Our Vision</a> and <a href="${SITE_URL}/about/our-prayer/">Our Prayer</a>.</p></section><section><h2>Explore Roses Of Rome</h2><ul>${ABOUT_SECTIONS.filter((item) => item.slug !== "who-we-are").map((item) => `<li><a href="${SITE_URL}/${item.path}">${escapeHtml(item.label.en)}</a></li>`).join("")}</ul></section></article></main>`;
}

function detailBody(page) {
  if (page.kind === "symbol") {
    const symbol = ABOUT_SYMBOLS[page.slug];
    const imageFile = { "our-flag": "official_flag.png", "our-logo": "transparent_logo.png", "our-motto": "official_motto.png" }[page.slug];
    return `<main class="container page-section about-page about-detail"><nav aria-label="Breadcrumb"><a href="${SITE_URL}/about/">About</a> / ${escapeHtml(page.label.en)}</nav><article><h1>${escapeHtml(symbol.heading.en)}</h1><p>${escapeHtml(symbol.intro.en)}</p><figure><img src="${SITE_URL}/about-assets/${imageFile}" alt="${escapeHtml(symbol.imageAlt.en)}" width="900" height="650"><figcaption>${escapeHtml(symbol.imageAlt.en)}</figcaption></figure>${symbol.paragraphs.en.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("\n")}</article></main>`;
  }
  const poem = ABOUT_POEMS[page.slug];
  const videoId = poem.video?.url.match(/\/embed\/([^?]+)/)?.[1];
  const video = poem.video ? `<p><a href="https://www.youtube.com/watch?v=${escapeHtml(videoId)}">${escapeHtml(poem.video.ytTitle)}</a></p>` : "";
  return `<main class="container page-section about-page about-detail"><nav aria-label="Breadcrumb"><a href="${SITE_URL}/about/">About</a> / ${escapeHtml(page.label.en)}</nav><article><h1>${escapeHtml(page.title)}</h1><p>${escapeHtml(poem.intro.en)}</p>${video}<section class="poem">${poemLyrics(poem.data)}</section></article></main>`;
}

function withSeo(template, title, description, keywords, path, jsonLd, body) {
  let html = template;
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);
  html = html.replace(/<meta name="description"[^>]*>/i, `<meta name="description" content="${escapeHtml(description)}" />`);
  html = html.replace(/<meta name="keywords"[^>]*>/i, `<meta name="keywords" content="${escapeHtml(keywords)}" />`);
  html = html.replace(/<link rel="canonical"[^>]*>/i, `<link rel="canonical" href="${SITE_URL}/${path}" />`);
  html = html.replace(/<meta property="og:title"[^>]*>/i, `<meta property="og:title" content="${escapeHtml(title)}" />`);
  html = html.replace(/<meta property="og:description"[^>]*>/i, `<meta property="og:description" content="${escapeHtml(description)}" />`);
  html = html.replace(/<meta property="og:url"[^>]*>/i, `<meta property="og:url" content="${SITE_URL}/${path}" />`);
  html = html.replace(/<meta name="twitter:title"[^>]*>/i, `<meta name="twitter:title" content="${escapeHtml(title)}" />`);
  html = html.replace(/<meta name="twitter:description"[^>]*>/i, `<meta name="twitter:description" content="${escapeHtml(description)}" />`);
  html = html.replace(/<meta property="og:type"[^>]*>/i, '<meta property="og:type" content="article" />');
  const ld = `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, "\\u003c")}</script>`;
  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/i, ld);
  return html.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
}

async function main() {
  const template = await readFile(resolve(DIST, "index.html"), "utf8");
  await mkdir(resolve(DIST, "about-assets"), { recursive: true });
  for (const filename of ["official_flag.png", "transparent_logo.png", "official_motto.png"]) {
    await copyFile(resolve("src/assets/images", filename), resolve(DIST, "about-assets", filename));
  }
  const pages = [{ path: "about/", title: ABOUT_HUB.title, description: ABOUT_HUB.description, keywords: ABOUT_HUB.keywords, jsonLd: ABOUT_HUB.jsonLd, body: aboutBody() },
    ...ABOUT_SECTIONS.map((page) => ({
      path: page.path,
      title: page.title,
      description: page.description,
      keywords: page.keywords,
      jsonLd: page.jsonLd,
      body: page.slug === "who-we-are" ? whoBody() : detailBody(page),
    }))];

  for (const page of pages) {
    const dir = resolve(DIST, page.path);
    await mkdir(dir, { recursive: true });
    await writeFile(resolve(dir, "index.html"), withSeo(template, page.title, page.description, page.keywords, page.path, page.jsonLd, page.body), "utf8");
  }
  console.log(`about pages: generated ${pages.length} static HTML documents`);
}

main().catch((error) => {
  console.error("about pages: generation failed", error);
  process.exitCode = 1;
});

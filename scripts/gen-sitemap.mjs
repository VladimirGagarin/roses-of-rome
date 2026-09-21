// Build-time sitemap generator.
//
// Produces public/sitemap.xml with the static routes plus a stable, crawlable
// URL for every song (see src/data/songSlug.js). Runs from the "prebuild" npm
// hook so the file is copied into dist/ by Vite.
import { createServer } from "vite";
import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { songSlug } from "../src/data/songSlug.js";

const SITE = "https://vladimirgagarin.github.io/roses-of-rome";
const STATIC_PATHS = ["", "films", "music", "shorts", "about", "contact"];

function renderUrl(pathname) {
  const loc = pathname ? `${SITE}/${pathname}` : `${SITE}/`;
  return `  <url>\n    <loc>${loc}</loc>\n  </url>`;
}

async function main() {
  const server = await createServer({
    root: process.cwd(),
    logLevel: "error",
    appType: "custom",
    server: { middlewareMode: true, hmr: false, watch: null },
  });

  try {
    const { RosesOfRomeSongs } = await server.ssrLoadModule("/src/data/songs.js");
    const { NewSongs } = await server.ssrLoadModule("/src/data/newSongs.js");
    const songs = [...RosesOfRomeSongs(), ...NewSongs()];

    const seen = new Set();
    const songPaths = [];
    for (const song of songs) {
      const slug = songSlug(song);
      if (seen.has(slug)) continue;
      seen.add(slug);
      songPaths.push(`music/${slug}`);
    }

    const paths = [...STATIC_PATHS, ...songPaths];
    const xml = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      ...paths.map(renderUrl),
      "</urlset>",
      "",
    ].join("\n");

    const out = resolve(process.cwd(), "public/sitemap.xml");
    await writeFile(out, xml, "utf8");
    console.log(`sitemap: wrote ${paths.length} URLs (${songPaths.length} songs) to public/sitemap.xml`);
  } finally {
    await server.close();
  }
}

main().catch((err) => {
  console.warn("sitemap: generation skipped —", err?.message || err);
});

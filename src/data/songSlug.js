/**
 * Stable, crawlable identifiers for songs.
 *
 * A song URL is built from a readable name slug plus a short, build-independent
 * fragment of its permanent `songId` (so it survives asset-hash changes and
 * stays unique even when two songs share a title).
 */

export function slugifySongName(name) {
  const raw = (typeof name === "string" ? name : name?.en || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return raw || "song";
}

export function songSlug(song) {
  const id = String(song?.songId || song?.songFile || "")
    .replace(/[^a-z0-9]/gi, "")
    .slice(0, 12)
    .toLowerCase();
  return id ? `${slugifySongName(song?.songName)}-${id}` : slugifySongName(song?.songName);
}

export function songPath(song) {
  return `/music/${songSlug(song)}`;
}

export function songUrl(song) {
  const base = (import.meta.env && import.meta.env.BASE_URL) || "/";
  const path = `${base}music/${songSlug(song)}`.replace(/\/{2,}/g, "/");
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  return `${origin}${path}`;
}

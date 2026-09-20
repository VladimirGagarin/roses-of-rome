import { useEffect } from "react";

const SITE_URL = "https://vladimirgagarin.github.io/roses-of-rome";
const DEFAULT_IMAGE = `${SITE_URL}/rorps.png`;

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(path) {
  const href = `${SITE_URL}/${path.replace(/^\//, "")}`;
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Lightweight per-page SEO helper: updates title, description, keywords,
 * Open Graph, Twitter, canonical, and JSON-LD breadcrumbs on the fly.
 */
export function useSeo({
  title,
  description,
  keywords,
  path = "/",
  type = "website",
  lang = "en",
  customLd = null,
}) {
  useEffect(() => {
    document.title = title;
    document.documentElement.lang = lang;

    if (description) setMeta("name", "description", description);
    if (keywords) setMeta("name", "keywords", keywords);

    setMeta("property", "og:title", title);
    if (description) setMeta("property", "og:description", description);
    setMeta("property", "og:url", `${SITE_URL}/${path.replace(/^\//, "")}`);
    setMeta("property", "og:type", type);
    setMeta("property", "og:image", DEFAULT_IMAGE);
    setMeta("property", "og:locale", lang === "it" ? "it_IT" : "en_US");

    setMeta("name", "twitter:title", title);
    if (description) setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", DEFAULT_IMAGE);

    setCanonical(path);

    const ld = document.getElementById("ro-page-ld");
    const script = ld || document.createElement("script");
    script.type = "application/ld+json";
    script.id = "ro-page-ld";
    script.textContent = JSON.stringify(
      customLd || {
        "@context": "https://schema.org",
        "@type": type === "video.movie" ? "Movie" : "WebPage",
        name: title,
        description,
        url: `${SITE_URL}/${path.replace(/^\//, "")}`,
        isPartOf: { "@type": "WebSite", name: "Roses Of Rome Pictures", url: SITE_URL },
      }
    );
    if (!ld) document.head.appendChild(script);
  }, [title, description, keywords, path, type, lang, customLd]);
}
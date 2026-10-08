// Genera public/sitemap.xml a partir de los códigos en src/app/data/properties.ts
// Uso: node scripts/generate-sitemap.mjs
import { readFileSync, writeFileSync } from "node:fs";

const SITE = "https://www.prestigehouse.com.gt";
const source = readFileSync("src/app/data/properties.ts", "utf8");
const codes = [...source.matchAll(/^\s*code:\s*"([A-Z]{2}-\d{3})"/gm)].map(m => m[1]);

if (new Set(codes).size !== codes.length) {
  throw new Error("Hay códigos de propiedad duplicados en properties.ts");
}

const today = new Date().toISOString().slice(0, 10);
const url = (path, priority) =>
  `  <url>\n    <loc>${SITE}${path}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${priority}</priority>\n  </url>`;

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  [url("/", "1.00"), ...codes.map(c => url(`/propiedad/${c}`, "0.80"))].join("\n\n"),
  "</urlset>",
  "",
].join("\n");

writeFileSync("public/sitemap.xml", xml);
console.log(`sitemap.xml: ${codes.length + 1} URLs`);

import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const outputDirectory = path.resolve("out");
const basePath = process.env.GITHUB_ACTIONS === "true" ? "/movie-aisa-site" : "";
const textExtensions = new Set([".css", ".html", ".js", ".json", ".map", ".txt", ".xml"]);
const publicAssetPrefixes = ["/top/", "/images/", "/works/", "/movie/character/", "/movie/profile/"];
const publicAssetFiles = ["/movie/movie-about.png", "/movie/movie-hero.png", "/favicon.svg"];

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);
      return entry.isDirectory() ? collectFiles(entryPath) : [entryPath];
    }),
  );
  return files.flat();
}

function prefixPublicAssets(contents) {
  if (!basePath) return contents;
  const publicAssetPattern = new RegExp(
    `(?<![\\w-])(${publicAssetPrefixes
      .map((prefix) => prefix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join("|")})`,
    "g",
  );
  let updated = contents.replace(publicAssetPattern, (prefix) => `${basePath}${prefix}`);
  for (const asset of publicAssetFiles) {
    updated = updated.replaceAll(asset, `${basePath}${asset}`);
  }
  return updated.replaceAll(`${basePath}${basePath}/`, `${basePath}/`);
}

for (const file of await collectFiles(outputDirectory)) {
  if (!textExtensions.has(path.extname(file))) continue;
  const contents = await readFile(file, "utf8");
  const updated = prefixPublicAssets(contents);
  if (updated !== contents) await writeFile(file, updated);
}

await writeFile(path.join(outputDirectory, ".nojekyll"), "");

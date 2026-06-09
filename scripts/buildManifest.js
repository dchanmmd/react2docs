/// <reference types="node" />

import { readdirSync, writeFileSync as touch } from "fs";
import path from "path";

const DOCS_DIR = "public/docs";

function toTitle(slug) {
    return slug
        .replaceAll(/-+/g, " ")
        .split(" ")
        .map(w => (w.at(0) ?? "").toUpperCase() + w.slice(1).toLowerCase())
        .join(" ");
}

const files = readdirSync(DOCS_DIR).filter(f => f.endsWith(".md"));

if (!files.length) {
    console.warn(`No Markdown files found in ${DOCS_DIR}`);
    touch(path.join(DOCS_DIR, "manifest.json"), JSON.stringify([]));
    process.exit(0);
}

const manifest = files.map(file => {
    const slug = path.basename(file, ".md");
    return { slug, title: toTitle(slug) };
});

touch(path.join(DOCS_DIR, "manifest.json"), JSON.stringify(manifest, null, 4));

console.log(`Done. ${manifest.length} docs indexed in ${DOCS_DIR}/manifest.json`);

/// <reference types="node" />

import { mkdirSync as mkdir, writeFileSync as touch } from "fs";
import path from "path";

const OUT_DIR = "public/docs";
const PAT = process.env.PAT;
const REPO_PATH = process.env.REPO_PATH;
const DOCS_PATH = process.env.DOCS_PATH;

if (!PAT) throw new Error("Missing required environment variable PAT.");
if (!REPO_PATH) throw new Error("Missing required environment variable REPO_PATH.");

const headers = {
    Authorization: `Bearer ${PAT}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28"
};


/** @returns {{}[]} */
async function listDocs() {
    const response = await fetch(
        `https://api.github.com/repos/${REPO_PATH}/contents/${DOCS_PATH}`,
        { headers: headers }
    );
    if (!response.ok) throw new Error(`GitHub API error: ${response.status} ${await response.text()}`);
    return response.json();
}

async function getDocText(relpath) {
    const response = await fetch(`https://api.github.com/repos/${REPO_PATH}/contents/${relpath}`, {
        headers: {
            ...headers,
            Accept: "application/vnd.github.raw+json"
        }
    });

    if (!response.ok) throw new Error(`Failed to fetch ${relpath} (${response.status}): ${await response.text()}`);
    return response.text();
}


function toTitle(slug) {
    return slug
        .replaceAll(/-+/, " ")
        .split(" ")
        .map(w => (w.at(0) ?? "").toUpperCase() + w.slice(1).toLowerCase())
        .join(" ");
}

mkdir(OUT_DIR, { recursive: true });

const paths = await listDocs();
const files = paths.filter(i => i.type === "file" && i.name.endsWith(".md"));

if (!files.length) {
    console.warn(`No Markdown files found at ${DOCS_PATH}`);
    touch(path.join(OUT_DIR, "manifest.json"), JSON.stringify([]));
    process.exit(0);
}

const manifest = [];

for (const file of files) {
    const content = await getDocText(file.path);
    const slug = path.basename(file.name, ".md");
    touch(path.join(OUT_DIR, path.basename(file.name)), content);
    manifest.push({ slug, title: toTitle(slug) })
    console.log(`fetched ${file.name}`);
}

touch(path.join(OUT_DIR, "manifest.json"), JSON.stringify(manifest, null, 4));



console.log(`Done. ${manifest.length} docs written to ${OUT_DIR}/`);

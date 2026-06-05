# React2Docs

A React documentation viewer that fetches Markdown files from a GitHub repository and renders them as a browsable, styled docs site. Deployed to GitHub Pages via GitHub Actions.

## How it works

On each push to `main`, the CI workflow:

1. Runs `scripts/fetchDocs.js` to pull every `.md` file from a configured path in a target GitHub repo and write them to `public/docs/`, along with a `manifest.json` index.
2. Builds the Vite app.
3. Deploys the `dist/` folder to GitHub Pages.

The app reads `manifest.json` at runtime to populate the navigation sidebar, then fetches individual `.md` files on demand as the user navigates.

## Repository variables and secrets

Configure these in **Settings → Secrets and variables → Actions** on the repository hosting this project.

| Name | Type | Description |
|---|---|---|
| `PAT` | Secret | GitHub Personal Access Token with `repo` (read) scope for the source repository |
| `REPO_PATH` | Variable | Source repository in `owner/repo` format, e.g. `acme/internal-docs` |
| `DOCS_PATH` | Variable | Path inside the source repository where `.md` files live, e.g. `docs` or `content/pages` |

## Local development

To run the app locally you need a populated `public/docs/` directory. Either run the fetch script or create the files manually.

### Option A — run the fetch script

```bash
PAT=ghp_... REPO_PATH=owner/repo DOCS_PATH=docs node scripts/fetchDocs.js
```

### Option B — add docs manually

Create `public/docs/manifest.json`:

```json
[
    { "slug": "getting-started", "title": "Getting Started" },
    { "slug": "api-reference",   "title": "Api Reference" }
]
```

Then place the corresponding `.md` files at `public/docs/getting-started.md`, etc.

### Start the dev server

```bash
npm install
npm run dev
```

## Features

- Three-panel layout: article navigation (left), rendered content (centre), in-page TOC (right)
- Full GitHub Flavoured Markdown support via `remark-gfm`
- Heading anchor links with `rehype-slug`
- Code blocks with a copy-to-clipboard button
- Interactive task lists with state persisted to `localStorage` per document
- Smooth scroll-to-section from the TOC

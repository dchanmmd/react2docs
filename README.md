# React2Docs

A React documentation viewer that renders Markdown files as a browsable, styled docs site. Designed to be used as a build tool by repositories that want to publish their own docs to GitHub Pages.

## How it works

react2docs exposes `public/docs/` as an injection point. The calling repository:

1. Clones react2docs.
2. Copies its `.md` files into `react2docs/public/docs/`.
3. Runs `npm run build:docs`, which generates `manifest.json` from the files present and then builds the Vite app.
4. Deploys `dist/` to its own GitHub Pages.

## Calling repository setup

Add this workflow to `.github/workflows/docs.yml` in any repository with Markdown docs:

```yaml
name: Deploy Docs
on:
  push:
    branches: [main]

permissions:
  contents: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/checkout@v4
        with:
          repository: dchanmmd/react2docs
          path: react2docs

      - run: cp docs/*.md react2docs/public/docs/

      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: npm
          cache-dependency-path: react2docs/package-lock.json

      - run: npm ci
        working-directory: react2docs

      - run: npm run build:docs
        working-directory: react2docs
        env:
          APP_BASE_URL: /${{ github.event.repository.name }}/

      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: react2docs/dist
```

In the calling repository's **Settings → Pages**, set the source to the `gh-pages` branch. No secrets or tokens beyond the default `GITHUB_TOKEN` are required.

## Local development

Populate `public/docs/` with `.md` files, then:

```bash
npm install
npm run build:docs   # generates manifest.json and builds
npm run preview
```

Or skip the manifest step during active development by creating `public/docs/manifest.json` manually:

```json
[
    { "slug": "getting-started", "title": "Getting Started" },
    { "slug": "api-reference",   "title": "Api Reference" }
]
```

Then run `npm run dev` as usual.

## Features

- Three-panel layout: article navigation (left), rendered content (centre), in-page TOC (right)
- Full GitHub Flavoured Markdown support via `remark-gfm`
- Heading anchor links with `rehype-slug`
- Code blocks with a copy-to-clipboard button
- Interactive task lists with state persisted to `localStorage` per document
- Smooth scroll-to-section from the TOC

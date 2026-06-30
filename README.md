# Artur Fattakhov — personal website

A lightweight, statically generated multilingual website built with Astro and TypeScript.

## Requirements

- Node.js 22.12 or newer
- npm 9.6.5 or newer

## Local setup

```sh
npm install
npm run dev
```

The development server is available at `http://localhost:4321`.

## Production build

```sh
npm run build
npm run preview
```

The generated static site is written to `dist/`.

## Routes

- `/` redirects to `/ru/`
- `/ru/` contains the Russian page
- `/en/` contains the English page

SEO metadata and the Person JSON-LD schema are defined in `src/layouts/BaseLayout.astro`.

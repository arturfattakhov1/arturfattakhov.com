# Artur Fattakhov — personal website

A lightweight, statically generated multilingual personal website built with Astro and TypeScript.

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
- `/ru/` and `/en/` contain the localized home pages
- Both languages include About, Research, Publications, Projects, Media, Blog, Contact, CV, Profiles, Uses, and Now
- Blog articles are generated from the `blog` content collection

## Architecture

- `src/components/` contains navigation, language, SEO, and breadcrumb components
- `src/layouts/` contains base, page, and article layouts
- `src/content/` contains localized blog, publication, and project entries
- `src/content.config.ts` defines collection schemas
- `src/data/pages.ts` contains localized page copy

SEO metadata and the Person JSON-LD schema are defined in `src/components/SEO.astro`.

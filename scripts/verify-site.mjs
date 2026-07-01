import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const domain = 'https://arturfattakhov.com';
const languages = ['ru', 'en'];
const routes = ['', 'about', 'research', 'publications', 'projects', 'media', 'blog', 'contact', 'cv', 'profiles', 'uses', 'now'];
const errors = [];

function assert(condition, message) {
  if (!condition) errors.push(message);
}

function matchOne(html, expression) {
  return html.match(expression)?.[1];
}

for (const lang of languages) {
  for (const route of routes) {
    const relativePath = route ? `${lang}/${route}/` : `${lang}/`;
    const file = new URL(`dist/${relativePath}index.html`, root);
    const html = await readFile(file, 'utf8');
    const expectedCanonical = `${domain}/${relativePath}`;
    const alternatePath = route ? `${route}/` : '';

    assert(html.includes(`<html lang="${lang}">`), `${relativePath}: incorrect html lang`);
    assert((html.match(/<h1(?:\s|>)/g) ?? []).length === 1, `${relativePath}: expected exactly one h1`);
    assert(html.includes(`<link rel="canonical" href="${expectedCanonical}">`), `${relativePath}: incorrect canonical`);
    assert(html.includes(`<link rel="alternate" hreflang="ru" href="${domain}/ru/${alternatePath}">`), `${relativePath}: missing ru alternate`);
    assert(html.includes(`<link rel="alternate" hreflang="en" href="${domain}/en/${alternatePath}">`), `${relativePath}: missing en alternate`);
    assert(html.includes(`<link rel="alternate" hreflang="x-default" href="${domain}/ru/${alternatePath}">`), `${relativePath}: missing x-default alternate`);

    const description = matchOne(html, /<meta name="description" content="([^"]+)">/);
    assert(Boolean(description), `${relativePath}: missing description`);

    const title = matchOne(html, /<title>([^<]+)<\/title>/);
    const expectedName = lang === 'ru' ? 'Артур Фаттахов' : 'Artur Fattakhov';
    assert(Boolean(title?.includes(expectedName)), `${relativePath}: document title is not entity-aware`);

    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
    assert(new Set(ids).size === ids.length, `${relativePath}: duplicate HTML ids`);

    const jsonLdText = matchOne(html, /<script type="application\/ld\+json">(.*?)<\/script>/);
    try {
      const jsonLd = JSON.parse(jsonLdText ?? '');
      const graph = jsonLd['@graph'];
      assert(jsonLd['@context'] === 'https://schema.org', `${relativePath}: invalid JSON-LD context`);
      assert(Array.isArray(graph), `${relativePath}: JSON-LD graph missing`);
      assert(graph?.some((node) => node['@id'] === `${domain}/#person` && node['@type'] === 'Person'), `${relativePath}: Person missing`);
      assert(graph?.some((node) => node['@id'] === `${domain}/#website` && node['@type'] === 'WebSite'), `${relativePath}: WebSite missing`);
      if (route === 'about') {
        assert(graph?.some((node) => node['@id'] === `${domain}/${lang}/about/#profile-page` && node['@type'] === 'ProfilePage'), `${relativePath}: ProfilePage missing`);
      }
    } catch {
      errors.push(`${relativePath}: invalid JSON-LD JSON`);
    }

    for (const anchor of html.matchAll(/<a\s+([^>]*target="_blank"[^>]*)>/g)) {
      const attributes = anchor[1];
      assert(/rel="[^"]*noopener[^"]*"/.test(attributes), `${relativePath}: _blank link missing noopener`);
      assert(/rel="[^"]*noreferrer[^"]*"/.test(attributes), `${relativePath}: _blank link missing noreferrer`);
    }
  }
}

const redirect = await readFile(new URL('dist/index.html', root), 'utf8');
assert(redirect.includes('url=/ru/'), 'root redirect does not target /ru/');

const robots = await readFile(new URL('dist/robots.txt', root), 'utf8');
assert(robots.includes('User-agent: *'), 'robots.txt user agent missing');
assert(robots.includes(`Sitemap: ${domain}/sitemap-index.xml`), 'robots.txt sitemap missing');

const sitemap = await readFile(new URL('dist/sitemap-0.xml', root), 'utf8');
for (const lang of languages) {
  for (const route of routes) {
    const relativePath = route ? `${lang}/${route}/` : `${lang}/`;
    assert(sitemap.includes(`<loc>${domain}/${relativePath}</loc>`), `${relativePath}: missing from sitemap`);
  }
}

async function sourceFiles(directory) {
  const directoryPath = directory instanceof URL ? fileURLToPath(directory) : directory;
  const entries = await readdir(directoryPath, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const entryPath = path.join(directoryPath, entry.name);
    if (entry.isDirectory()) files.push(...await sourceFiles(entryPath));
    else files.push(entryPath);
  }
  return files;
}

const forbiddenPattern = new RegExp(['vet', 'uzi', '47'].join('[\\s_-]*'), 'i');
for (const directoryName of ['src', 'public']) {
  const directory = new URL(`${directoryName}/`, root);
  for (const file of await sourceFiles(directory)) {
    const contents = await readFile(file, 'utf8');
    assert(!forbiddenPattern.test(contents), `${path.relative(fileURLToPath(root), file)}: forbidden name found`);
  }
}

if (errors.length > 0) {
  console.error(errors.map((error) => `- ${error}`).join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Verified ${languages.length * routes.length} localized pages, redirects, metadata, JSON-LD, sitemap, robots, links, and source content.`);
}

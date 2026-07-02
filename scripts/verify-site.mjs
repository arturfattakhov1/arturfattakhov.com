import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const domain = 'https://arturfattakhov.com';
const languages = ['ru', 'en'];
const routes = ['', 'about', 'research', 'publications', 'projects', 'media', 'blog', 'contact', 'cv', 'profiles', 'uses', 'now', 'knowledge', 'timeline', 'faq'];
const publicationSlugs = [
  'comparative-xray-morphometry-moose-cattle',
  'hoof-capsule-cattle-moose',
  'diagnostic-imaging-distal-limb-cattle',
  'distal-limb-disorders-cattle',
  'digitalization-cattle-farming',
  'ovariectomy-ovariohysterectomy-cats',
  'feline-calicivirus-saint-petersburg',
  'urethral-intussusception-cat',
  'xray-morphometric-laminitis-cattle-patent',
];
const errors = [];
const pages = new Map();
const titlesByLanguage = new Map(languages.map((lang) => [lang, new Set()]));
const descriptionsByLanguage = new Map(languages.map((lang) => [lang, new Set()]));

function assert(condition, message) {
  if (!condition) errors.push(message);
}

for (const lang of languages) {
  for (const slug of publicationSlugs) {
    const relativePath = `${lang}/publications/${slug}/`;
    const html = await readFile(new URL(`dist/${relativePath}index.html`, root), 'utf8');
    const expectedCanonical = `${domain}/${relativePath}`;
    const alternatePath = `publications/${slug}/`;
    pages.set(`/${relativePath}`, html);

    assert(html.includes(`<html lang="${lang}">`), `${relativePath}: incorrect html lang`);
    assert((html.match(/<h1(?:\s|>)/g) ?? []).length === 1, `${relativePath}: expected exactly one h1`);
    assert(html.includes(`<link rel="canonical" href="${expectedCanonical}">`), `${relativePath}: incorrect canonical`);
    assert(html.includes(`<link rel="alternate" hreflang="ru" href="${domain}/ru/${alternatePath}">`), `${relativePath}: missing ru alternate`);
    assert(html.includes(`<link rel="alternate" hreflang="en" href="${domain}/en/${alternatePath}">`), `${relativePath}: missing en alternate`);
    assert(html.includes(`<link rel="alternate" hreflang="x-default" href="${domain}/ru/${alternatePath}">`), `${relativePath}: missing x-default alternate`);

    const description = matchOne(html, /<meta name="description" content="([^"]+)">/);
    const title = matchOne(html, /<title>([^<]+)<\/title>/);
    const expectedName = lang === 'ru' ? 'Артур Фаттахов' : 'Artur Fattakhov';
    assert(Boolean(description), `${relativePath}: missing description`);
    assert(!descriptionsByLanguage.get(lang).has(description), `${relativePath}: duplicate description`);
    descriptionsByLanguage.get(lang).add(description);
    assert(Boolean(title?.includes(expectedName)), `${relativePath}: document title is not entity-aware`);
    assert(!titlesByLanguage.get(lang).has(title), `${relativePath}: duplicate document title`);
    titlesByLanguage.get(lang).add(title);

    assert(html.includes('<meta property="og:type" content="article">'), `${relativePath}: incorrect Open Graph type`);
    assert(html.includes(`<meta property="og:title" content="${title}">`), `${relativePath}: incorrect Open Graph title`);
    assert(html.includes(`<meta property="og:description" content="${description}">`), `${relativePath}: incorrect Open Graph description`);
    assert(html.includes(`<meta property="og:url" content="${expectedCanonical}">`), `${relativePath}: incorrect Open Graph URL`);
    assert(html.includes(`<meta name="twitter:title" content="${title}">`), `${relativePath}: incorrect Twitter title`);
    assert(html.includes(`<meta name="twitter:description" content="${description}">`), `${relativePath}: incorrect Twitter description`);

    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
    assert(new Set(ids).size === ids.length, `${relativePath}: duplicate HTML ids`);

    const jsonLdBlocks = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
    assert(jsonLdBlocks.length === 2, `${relativePath}: expected identity and publication JSON-LD blocks`);
    const publicationSchema = jsonLdBlocks.find((block) => block['@type'] === 'ScholarlyArticle' || block['@type'] === 'Patent');
    const expectedType = slug.endsWith('-patent') ? 'Patent' : 'ScholarlyArticle';
    assert(publicationSchema?.['@type'] === expectedType, `${relativePath}: incorrect publication schema type`);
    assert(publicationSchema?.['@id'] === `${expectedCanonical}#publication`, `${relativePath}: incorrect publication schema id`);
    assert(publicationSchema?.mainEntityOfPage === expectedCanonical, `${relativePath}: incorrect publication mainEntityOfPage`);
    const schemaIds = jsonLdBlocks.flatMap((block) => block['@graph']?.map((node) => node['@id']) ?? [block['@id']]).filter(Boolean);
    assert(new Set(schemaIds).size === schemaIds.length, `${relativePath}: duplicate JSON-LD ids`);
  }
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
    pages.set(`/${relativePath}`, html);

    assert(html.includes(`<html lang="${lang}">`), `${relativePath}: incorrect html lang`);
    assert((html.match(/<h1(?:\s|>)/g) ?? []).length === 1, `${relativePath}: expected exactly one h1`);
    assert(html.includes(`<link rel="canonical" href="${expectedCanonical}">`), `${relativePath}: incorrect canonical`);
    assert(html.includes(`<link rel="alternate" hreflang="ru" href="${domain}/ru/${alternatePath}">`), `${relativePath}: missing ru alternate`);
    assert(html.includes(`<link rel="alternate" hreflang="en" href="${domain}/en/${alternatePath}">`), `${relativePath}: missing en alternate`);
    assert(html.includes(`<link rel="alternate" hreflang="x-default" href="${domain}/ru/${alternatePath}">`), `${relativePath}: missing x-default alternate`);

    const description = matchOne(html, /<meta name="description" content="([^"]+)">/);
    assert(Boolean(description), `${relativePath}: missing description`);
    assert(!descriptionsByLanguage.get(lang).has(description), `${relativePath}: duplicate description`);
    descriptionsByLanguage.get(lang).add(description);

    const title = matchOne(html, /<title>([^<]+)<\/title>/);
    const expectedName = lang === 'ru' ? 'Артур Фаттахов' : 'Artur Fattakhov';
    assert(Boolean(title?.includes(expectedName)), `${relativePath}: document title is not entity-aware`);
    assert(!titlesByLanguage.get(lang).has(title), `${relativePath}: duplicate document title`);
    titlesByLanguage.get(lang).add(title);

    assert(!/<meta name="robots" content="[^"]*noindex/i.test(html), `${relativePath}: page is marked noindex`);
    assert(html.includes(`<meta property="og:type" content="${route === 'about' ? 'profile' : 'website'}">`), `${relativePath}: incorrect Open Graph type`);
    assert(html.includes(`<meta property="og:title" content="${title}">`), `${relativePath}: incorrect Open Graph title`);
    assert(html.includes(`<meta property="og:description" content="${description}">`), `${relativePath}: incorrect Open Graph description`);
    assert(html.includes(`<meta property="og:url" content="${expectedCanonical}">`), `${relativePath}: incorrect Open Graph URL`);
    assert(html.includes(`<meta property="og:locale" content="${lang === 'ru' ? 'ru_RU' : 'en_US'}">`), `${relativePath}: incorrect Open Graph locale`);

    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
    assert(new Set(ids).size === ids.length, `${relativePath}: duplicate HTML ids`);

    const jsonLdText = matchOne(html, /<script type="application\/ld\+json">(.*?)<\/script>/);
    try {
      const jsonLd = JSON.parse(jsonLdText ?? '');
      const graph = jsonLd['@graph'];
      const person = graph?.find((node) => node['@id'] === `${domain}/#person` && node['@type'] === 'Person');
      const website = graph?.find((node) => node['@id'] === `${domain}/#website` && node['@type'] === 'WebSite');
      assert(jsonLd['@context'] === 'https://schema.org', `${relativePath}: invalid JSON-LD context`);
      assert(Array.isArray(graph), `${relativePath}: JSON-LD graph missing`);
      assert(Boolean(person), `${relativePath}: Person missing`);
      assert(Boolean(website), `${relativePath}: WebSite missing`);
      assert(person?.mainEntityOfPage?.['@id'] === `${domain}/${lang}/about/#profile-page`, `${relativePath}: Person has incorrect mainEntityOfPage`);
      assert(Array.isArray(person?.sameAs) && person.sameAs.length === 9, `${relativePath}: Person sameAs is incomplete`);
      assert(new Set(person?.sameAs).size === person?.sameAs?.length, `${relativePath}: Person sameAs contains duplicates`);
      assert(person?.sameAs?.every((url) => typeof url === 'string' && url.startsWith('https://')), `${relativePath}: Person sameAs contains an invalid URL`);
      assert(website?.about?.['@id'] === `${domain}/#person`, `${relativePath}: WebSite about relationship missing`);
      assert(website?.publisher?.['@id'] === `${domain}/#person`, `${relativePath}: WebSite publisher relationship missing`);
      if (route === 'about') {
        const profilePage = graph?.find((node) => node['@id'] === `${domain}/${lang}/about/#profile-page` && node['@type'] === 'ProfilePage');
        assert(Boolean(profilePage), `${relativePath}: ProfilePage missing`);
        assert(profilePage?.mainEntity?.['@id'] === `${domain}/#person`, `${relativePath}: ProfilePage mainEntity missing`);
        assert(profilePage?.isPartOf?.['@id'] === `${domain}/#website`, `${relativePath}: ProfilePage isPartOf missing`);
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

const publicationFilterScriptPath = '/scripts/publication-filter.js';
const publicationFilterScriptUrl = `${publicationFilterScriptPath}?v=3`;
const publicationFilterScript = await readFile(new URL(`public${publicationFilterScriptPath}`, root), 'utf8');
assert(publicationFilterScript.includes("button.addEventListener('click'"), 'publication filter click handler missing');
assert(publicationFilterScript.includes("document.addEventListener('astro:page-load'"), 'publication filter page-load initialization missing');
assert(publicationFilterScript.includes("item.style.display = matches ? '' : 'none'"), 'publication filter visual hiding missing');
assert(publicationFilterScript.includes("applyFilter('all')"), 'publication filter empty-result fallback missing');

for (const lang of languages) {
  const indexHtml = pages.get(`/${lang}/publications/`) ?? '';
  assert((indexHtml.match(/data-publication-item(?=\s|>)/g) ?? []).length === publicationSlugs.length, `${lang}/publications/: expected nine portfolio cards`);
  assert((indexHtml.match(/data-type="journal"/g) ?? []).length === 2, `${lang}/publications/: expected two journal articles`);
  assert((indexHtml.match(/data-type="conference"/g) ?? []).length === 6, `${lang}/publications/: expected six conference papers`);
  assert((indexHtml.match(/data-type="patent"/g) ?? []).length === 1, `${lang}/publications/: expected one patent`);
  for (const filter of ['all', 'journal', 'conference', 'patent', '2021', '2024', '2025']) {
    assert(indexHtml.includes(`data-publication-filter="${filter}"`), `${lang}/publications/: missing ${filter} filter`);
  }
  assert(
    indexHtml.includes(`<script src="${publicationFilterScriptUrl}" defer></script>`),
    `${lang}/publications/: versioned external filter script missing`,
  );
}

const canonicalValues = [...pages.values()].map((html) => matchOne(html, /<link rel="canonical" href="([^"]+)">/)).filter(Boolean);
assert(new Set(canonicalValues).size === canonicalValues.length, 'duplicate canonical URLs detected');

for (const [sourcePath, html] of pages) {
  for (const match of html.matchAll(/<a\s+[^>]*href="([^"]+)"[^>]*>/g)) {
    const href = match[1].replaceAll('&amp;', '&');
    if (/^(?:mailto:|tel:|javascript:)/.test(href)) continue;

    const target = new URL(href, `${domain}${sourcePath}`);
    if (target.origin !== domain) continue;

    const targetPath = target.pathname;
    assert(targetPath === '/' || targetPath.endsWith('/'), `${sourcePath}: internal link lacks trailing slash: ${href}`);
    const targetHtml = targetPath === '/' ? await readFile(new URL('dist/index.html', root), 'utf8') : pages.get(targetPath);
    assert(Boolean(targetHtml), `${sourcePath}: broken internal link: ${href}`);
    if (target.hash && targetHtml) {
      const fragment = decodeURIComponent(target.hash.slice(1));
      assert(targetHtml.includes(`id="${fragment}"`), `${sourcePath}: missing link fragment: ${href}`);
    }
  }
}

for (const lang of languages) {
  const aboutPath = `/${lang}/about/`;
  const profilesPath = `/${lang}/profiles/`;
  const aboutHtml = pages.get(aboutPath);
  const profilesHtml = pages.get(profilesPath);
  assert(aboutHtml?.includes(`href="${profilesPath}"`), `${aboutPath}: contextual Profiles link missing`);
  assert(profilesHtml?.includes(`href="${aboutPath}"`), `${profilesPath}: contextual About link missing`);

  const jsonLd = JSON.parse(matchOne(profilesHtml ?? '', /<script type="application\/ld\+json">(.*?)<\/script>/) ?? '{}');
  const sameAs = jsonLd['@graph']?.find((node) => node['@id'] === `${domain}/#person`)?.sameAs ?? [];
  assert(sameAs.every((url) => profilesHtml?.includes(`href="${url.replaceAll('&', '&amp;')}"`)), `${profilesPath}: verified profile link missing from page`);

  for (const sourceRoute of ['', 'about', 'research', 'projects', 'profiles', 'contact']) {
    const sourcePath = sourceRoute ? `/${lang}/${sourceRoute}/` : `/${lang}/`;
    const sourceHtml = pages.get(sourcePath);
    for (const hubRoute of ['knowledge', 'timeline', 'faq']) {
      assert(sourceHtml?.includes(`href="/${lang}/${hubRoute}/"`), `${sourcePath}: contextual ${hubRoute} link missing`);
    }
  }

  for (const sourceRoute of ['about', 'research', 'projects', 'knowledge', 'timeline']) {
    const sourcePath = `/${lang}/${sourceRoute}/`;
    assert(pages.get(sourcePath)?.includes(`href="/${lang}/publications/"`), `${sourcePath}: contextual Publications link missing`);
  }

  const patentPath = `/${lang}/publications/xray-morphometric-laminitis-cattle-patent/`;
  assert(pages.get(`/${lang}/publications/`)?.includes(`href="${patentPath}"`), `${lang}/publications/: Patent link missing`);
  assert(pages.get(patentPath)?.includes(`href="/${lang}/research/"`), `${patentPath}: Research link missing`);
}

const redirect = await readFile(new URL('dist/index.html', root), 'utf8');
assert(redirect.includes('url=/ru/'), 'root redirect does not target /ru/');

const robots = await readFile(new URL('dist/robots.txt', root), 'utf8');
assert(robots.includes('User-agent: *'), 'robots.txt user agent missing');
assert(robots.includes('Allow: /'), 'robots.txt does not explicitly allow indexing');
assert(!/^Disallow:\s*\/$/m.test(robots), 'robots.txt blocks the entire site');
assert(robots.includes(`Sitemap: ${domain}/sitemap-index.xml`), 'robots.txt sitemap missing');

const sitemapIndex = await readFile(new URL('dist/sitemap-index.xml', root), 'utf8');
assert(sitemapIndex.includes(`<loc>${domain}/sitemap-0.xml</loc>`), 'sitemap index does not reference the generated sitemap');

const sitemap = await readFile(new URL('dist/sitemap-0.xml', root), 'utf8');
for (const lang of languages) {
  for (const route of routes) {
    const relativePath = route ? `${lang}/${route}/` : `${lang}/`;
    assert(sitemap.includes(`<loc>${domain}/${relativePath}</loc>`), `${relativePath}: missing from sitemap`);
  }
}
for (const lang of languages) {
  for (const slug of publicationSlugs) {
    assert(sitemap.includes(`<loc>${domain}/${lang}/publications/${slug}/</loc>`), `${lang}/publications/${slug}/: missing from sitemap`);
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
for (const directoryName of ['src', 'public', 'docs']) {
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
  console.log(`Verified ${languages.length * (routes.length + publicationSlugs.length)} localized pages, redirects, metadata, JSON-LD, sitemap, robots, links, filters, and source content.`);
}

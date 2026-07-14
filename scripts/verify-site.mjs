import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const domain = 'https://arturfattakhov.com';
const languages = ['ru', 'en'];
const routes = ['', 'about', 'research', 'publications', 'projects', 'media', 'blog', 'contact', 'cv', 'profiles', 'uses', 'now', 'knowledge', 'timeline', 'faq', 'privacy', 'terms', 'disclaimer'];
const legalRoutes = ['privacy', 'terms', 'disclaimer'];
const pageSchemaTypes = {
  research: 'AboutPage',
  publications: 'CollectionPage',
  projects: 'WebPage',
  contact: 'ContactPage',
  profiles: 'CollectionPage',
  knowledge: 'CollectionPage',
  timeline: 'CollectionPage',
};
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
const personSignatures = new Set();
const websiteSignatures = new Set();

function assert(condition, message) {
  if (!condition) errors.push(message);
}

function assertAccessibility(html, relativePath) {
  assert(html.includes('<a class="skip-link" href="#main-content">'), `${relativePath}: skip link missing`);
  assert(html.includes('<main id="main-content" tabindex="-1">'), `${relativePath}: main skip-link target is not focusable`);

  const headingLevels = [...html.matchAll(/<h([1-6])(?:\s|>)/g)].map((match) => Number(match[1]));
  assert(headingLevels[0] === 1, `${relativePath}: heading sequence does not start with h1`);
  assert(headingLevels.every((level, index) => index === 0 || level <= headingLevels[index - 1] + 1), `${relativePath}: heading level is skipped`);

  for (const image of html.matchAll(/<img\b([^>]*)>/g)) {
    assert(/\salt=(?:"[^"]*"|'[^']*')/.test(image[1]), `${relativePath}: image missing alt attribute`);
  }

  for (const button of html.matchAll(/<button\b([^>]*)>(.*?)<\/button>/gs)) {
    const text = button[2].replace(/<[^>]+>/g, '').trim();
    assert(Boolean(text) || /\saria-label="[^"]+"/.test(button[1]), `${relativePath}: button missing accessible name`);
  }
}

function parseJsonLd(html, relativePath) {
  try {
    const blocks = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)]
      .map((match) => JSON.parse(match[1]));
    assert(blocks.every((block) => block['@context'] === 'https://schema.org'), `${relativePath}: invalid JSON-LD context`);
    return blocks;
  } catch {
    errors.push(`${relativePath}: invalid JSON-LD JSON`);
    return [];
  }
}

function flattenJsonLd(blocks) {
  return blocks.flatMap((block) => Array.isArray(block['@graph']) ? block['@graph'] : [block]);
}

function assertUniqueSchemaIds(nodes, relativePath) {
  const ids = nodes.map((node) => node?.['@id']).filter(Boolean);
  assert(new Set(ids).size === ids.length, `${relativePath}: duplicate JSON-LD ids`);
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
    assertAccessibility(html, relativePath);
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

    const jsonLdBlocks = parseJsonLd(html, relativePath);
    const jsonLdNodes = flattenJsonLd(jsonLdBlocks);
    assert(jsonLdBlocks.length === 3, `${relativePath}: expected identity, publication, and breadcrumb JSON-LD blocks`);
    const publicationSchema = jsonLdNodes.find((node) => node['@type'] === 'ScholarlyArticle' || node['@type'] === 'Patent');
    const expectedType = slug.endsWith('-patent') ? 'Patent' : 'ScholarlyArticle';
    const expectedPageId = `${expectedCanonical}#webpage`;
    const expectedPublicationId = `${expectedCanonical}#publication`;
    const publicationPage = jsonLdNodes.find((node) => node['@id'] === expectedPageId && node['@type'] === 'WebPage');
    const breadcrumb = jsonLdNodes.find((node) => node['@id'] === `${expectedCanonical}#breadcrumb` && node['@type'] === 'BreadcrumbList');
    const personNodes = jsonLdNodes.filter((node) => node['@id'] === `${domain}/#person` && node['@type'] === 'Person');
    const websiteNodes = jsonLdNodes.filter((node) => node['@id'] === `${domain}/#website` && node['@type'] === 'WebSite');
    assert(publicationSchema?.['@type'] === expectedType, `${relativePath}: incorrect publication schema type`);
    assert(publicationSchema?.['@id'] === expectedPublicationId, `${relativePath}: incorrect publication schema id`);
    assert(publicationSchema?.mainEntityOfPage?.['@id'] === expectedPageId, `${relativePath}: incorrect publication mainEntityOfPage`);
    assert(publicationSchema?.author?.filter((author) => author['@id'] === `${domain}/#person`).length === 1, `${relativePath}: canonical Person author reference missing`);
    assert(Array.isArray(publicationSchema?.keywords) && publicationSchema.keywords.length > 0, `${relativePath}: publication keywords missing`);
    assert(publicationPage?.mainEntity?.['@id'] === expectedPublicationId, `${relativePath}: publication WebPage mainEntity missing`);
    assert(publicationPage?.isPartOf?.['@id'] === `${domain}/#website`, `${relativePath}: publication WebPage website relationship missing`);
    assert(publicationPage?.breadcrumb?.['@id'] === `${expectedCanonical}#breadcrumb`, `${relativePath}: publication WebPage breadcrumb relationship missing`);
    assert(breadcrumb?.itemListElement?.length === 3, `${relativePath}: publication BreadcrumbList is incomplete`);
    assert(personNodes.length === 1, `${relativePath}: expected one canonical Person entity`);
    assert(websiteNodes.length === 1, `${relativePath}: expected one canonical WebSite entity`);
    if (personNodes[0]) personSignatures.add(JSON.stringify(personNodes[0]));
    if (websiteNodes[0]) websiteSignatures.add(JSON.stringify(websiteNodes[0]));
    assertUniqueSchemaIds(jsonLdNodes, relativePath);
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
    assertAccessibility(html, relativePath);
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

    const jsonLdBlocks = parseJsonLd(html, relativePath);
    const jsonLdNodes = flattenJsonLd(jsonLdBlocks);
    const personNodes = jsonLdNodes.filter((node) => node['@id'] === `${domain}/#person` && node['@type'] === 'Person');
    const websiteNodes = jsonLdNodes.filter((node) => node['@id'] === `${domain}/#website` && node['@type'] === 'WebSite');
    const person = personNodes[0];
    const website = websiteNodes[0];
    assert(personNodes.length === 1, `${relativePath}: expected one canonical Person entity`);
    assert(websiteNodes.length === 1, `${relativePath}: expected one canonical WebSite entity`);
    assert(Array.isArray(person?.mainEntityOfPage) && person.mainEntityOfPage.length === 2, `${relativePath}: Person must reference both About pages`);
    assert(person?.mainEntityOfPage?.some((item) => item['@id'] === `${domain}/ru/about/#profile-page`), `${relativePath}: Person missing ru ProfilePage reference`);
    assert(person?.mainEntityOfPage?.some((item) => item['@id'] === `${domain}/en/about/#profile-page`), `${relativePath}: Person missing en ProfilePage reference`);
    assert(Array.isArray(person?.sameAs) && person.sameAs.length === 9, `${relativePath}: Person sameAs is incomplete`);
    assert(new Set(person?.sameAs).size === person?.sameAs?.length, `${relativePath}: Person sameAs contains duplicates`);
    assert(person?.sameAs?.every((url) => typeof url === 'string' && url.startsWith('https://')), `${relativePath}: Person sameAs contains an invalid URL`);
    assert(Array.isArray(person?.knowsAbout) && person.knowsAbout.length >= 8, `${relativePath}: Person knowsAbout is incomplete`);
    assert(Array.isArray(person?.hasOccupation) && person.hasOccupation.length === 3, `${relativePath}: Person occupations are incomplete`);
    assert(website?.about?.['@id'] === `${domain}/#person`, `${relativePath}: WebSite about relationship missing`);
    assert(website?.creator?.['@id'] === `${domain}/#person`, `${relativePath}: WebSite creator relationship missing`);
    assert(website?.publisher?.['@id'] === `${domain}/#person`, `${relativePath}: WebSite publisher relationship missing`);
    if (person) personSignatures.add(JSON.stringify(person));
    if (website) websiteSignatures.add(JSON.stringify(website));

    if (route === 'about') {
      const profilePage = jsonLdNodes.find((node) => node['@id'] === `${domain}/${lang}/about/#profile-page` && node['@type'] === 'ProfilePage');
      assert(Boolean(profilePage), `${relativePath}: ProfilePage missing`);
      assert(profilePage?.mainEntity?.['@id'] === `${domain}/#person`, `${relativePath}: ProfilePage mainEntity missing`);
      assert(profilePage?.isPartOf?.['@id'] === `${domain}/#website`, `${relativePath}: ProfilePage isPartOf missing`);
      assert(profilePage?.breadcrumb?.['@id'] === `${expectedCanonical}#breadcrumb`, `${relativePath}: ProfilePage breadcrumb missing`);
    }

    if (route) {
      const breadcrumb = jsonLdNodes.find((node) => node['@id'] === `${expectedCanonical}#breadcrumb` && node['@type'] === 'BreadcrumbList');
      assert(breadcrumb?.itemListElement?.length === 2, `${relativePath}: BreadcrumbList is incomplete`);
      assert(breadcrumb?.itemListElement?.at(-1)?.item === expectedCanonical, `${relativePath}: BreadcrumbList current item is incorrect`);
    }

    const expectedPageType = pageSchemaTypes[route];
    if (expectedPageType) {
      const pageSchema = jsonLdNodes.find((node) => node['@id'] === `${expectedCanonical}#webpage`);
      assert(pageSchema?.['@type'] === expectedPageType, `${relativePath}: incorrect page-level schema type`);
      assert(pageSchema?.about?.['@id'] === `${domain}/#person`, `${relativePath}: page-level Person relationship missing`);
      assert(pageSchema?.isPartOf?.['@id'] === `${domain}/#website`, `${relativePath}: page-level WebSite relationship missing`);
      assert(pageSchema?.breadcrumb?.['@id'] === `${expectedCanonical}#breadcrumb`, `${relativePath}: page-level breadcrumb relationship missing`);

      if (['publications', 'profiles', 'knowledge', 'timeline'].includes(route)) {
        const itemList = jsonLdNodes.find((node) => node['@id'] === `${expectedCanonical}#item-list` && node['@type'] === 'ItemList');
        assert(pageSchema?.mainEntity?.['@id'] === `${expectedCanonical}#item-list`, `${relativePath}: CollectionPage mainEntity missing`);
        assert(itemList?.numberOfItems > 0 && itemList?.itemListElement?.length === itemList.numberOfItems, `${relativePath}: CollectionPage ItemList is incomplete`);
      } else {
        assert(pageSchema?.mainEntity?.['@id'] === `${domain}/#person`, `${relativePath}: page-level mainEntity must reference Person`);
      }
    }

    assertUniqueSchemaIds(jsonLdNodes, relativePath);

    for (const anchor of html.matchAll(/<a\s+([^>]*target="_blank"[^>]*)>/g)) {
      const attributes = anchor[1];
      assert(/rel="[^"]*noopener[^"]*"/.test(attributes), `${relativePath}: _blank link missing noopener`);
      assert(/rel="[^"]*noreferrer[^"]*"/.test(attributes), `${relativePath}: _blank link missing noreferrer`);
    }
  }
}

assert(personSignatures.size === 1, 'conflicting Person entities detected across pages');
assert(websiteSignatures.size === 1, 'conflicting WebSite entities detected across pages');

const publicationFilterScriptPath = '/scripts/publication-filter.js';
const publicationFilterScriptUrl = `${publicationFilterScriptPath}?v=3`;
const publicationFilterScript = await readFile(new URL(`public${publicationFilterScriptPath}`, root), 'utf8');
assert(publicationFilterScript.includes("button.addEventListener('click'"), 'publication filter click handler missing');
assert(publicationFilterScript.includes("document.addEventListener('astro:page-load'"), 'publication filter page-load initialization missing');
assert(publicationFilterScript.includes("item.style.display = matches ? '' : 'none'"), 'publication filter visual hiding missing');
assert(publicationFilterScript.includes("applyFilter('all')"), 'publication filter empty-result fallback missing');

const contactFormScriptPath = '/scripts/contact-form.js';
const contactFormScript = await readFile(new URL(`public${contactFormScriptPath}`, root), 'utf8');
assert(contactFormScript.includes("fetch(form.action"), 'contact form fetch enhancement missing');
assert(contactFormScript.includes("headers: { Accept: 'application/json' }"), 'contact form JSON response header missing');
assert(contactFormScript.includes("if (submitting) return"), 'contact form duplicate-submit protection missing');
assert(contactFormScript.includes("form.reset()"), 'contact form success reset missing');
assert(contactFormScript.includes("field.value.trim() === ''"), 'contact form whitespace validation missing');
assert(contactFormScript.includes("document.addEventListener('astro:page-load'"), 'contact form page-load initialization missing');

const privateRecipient = ['arturfattakhov1', 'gmail.com'].join('@');
for (const lang of languages) {
  const contactPath = `/${lang}/contact/`;
  const contactHtml = pages.get(contactPath) ?? '';
  const contactMain = matchOne(contactHtml, /<main\b[^>]*>([\s\S]*?)<\/main>/) ?? '';

  assert((contactMain.match(/<form\b/g) ?? []).length === 1, `${contactPath}: expected exactly one contact form`);
  assert(contactMain.includes(`action="https://formspree.io/f/xgogvvao"`), `${contactPath}: Formspree action missing`);
  assert(contactMain.includes('method="POST"'), `${contactPath}: POST method missing`);
  assert((contactMain.match(/name="email"/g) ?? []).length === 1, `${contactPath}: expected exactly one email field`);
  for (const name of ['firstName', 'lastName', 'email', 'message', '_gotcha', 'subject']) {
    assert(contactMain.includes(`name="${name}"`), `${contactPath}: ${name} field missing`);
  }
  assert(contactMain.includes('name="firstName" type="text" autocomplete="given-name" maxlength="80" required'), `${contactPath}: first-name field contract is incorrect`);
  assert(contactMain.includes('name="email" type="email" inputmode="email" autocomplete="email" maxlength="254" required'), `${contactPath}: email field contract is incorrect`);
  assert(contactMain.includes('name="message"'), `${contactPath}: message field missing`);
  assert(contactMain.includes('maxlength="5000"'), `${contactPath}: message length limit missing`);
  assert(contactMain.includes('name="_gotcha" type="text" autocomplete="off" tabindex="-1"'), `${contactPath}: honeypot contract is incorrect`);
  assert(contactMain.includes(`href="/${lang}/privacy/"`), `${contactPath}: localized privacy link missing`);
  assert(contactHtml.includes(`<script src="${contactFormScriptPath}" defer></script>`), `${contactPath}: local form script missing`);
  assert(!contactMain.includes('mailto:'), `${contactPath}: mailto link must not appear in contact content`);
  assert(!/(?:tel:|telegram|whatsapp|t\.me\/|vk\.com\/)/i.test(contactMain), `${contactPath}: additional contact channel found`);
  assert(!contactHtml.includes('target="_blank"'), `${contactPath}: external profile link found`);
  assert(!contactHtml.includes(privateRecipient), `${contactPath}: private recipient address exposed`);
}

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
  const lang = sourcePath.split('/').filter(Boolean)[0];
  for (const legalRoute of legalRoutes) {
    assert(html.includes(`href="/${lang}/${legalRoute}/"`), `${sourcePath}: footer link to ${legalRoute} missing`);
  }

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

  const profileNodes = flattenJsonLd(parseJsonLd(profilesHtml ?? '', profilesPath));
  const sameAs = profileNodes.find((node) => node['@id'] === `${domain}/#person`)?.sameAs ?? [];
  assert(sameAs.every((url) => profilesHtml?.includes(`href="${url.replaceAll('&', '&amp;')}"`)), `${profilesPath}: verified profile link missing from page`);

  for (const sourceRoute of ['', 'about', 'research', 'projects', 'profiles']) {
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

  const entityLinkExpectations = {
    about: ['research', 'publications', 'projects', 'profiles', 'contact', 'knowledge', 'timeline'],
    research: ['about', 'publications', 'profiles', 'knowledge', 'timeline'],
    publications: ['about', 'research', 'profiles'],
    projects: ['research', 'publications', 'contact', 'knowledge', 'timeline'],
    timeline: ['research', 'publications', 'projects', 'knowledge'],
    knowledge: ['research', 'publications', 'timeline'],
    profiles: ['about', 'publications', 'contact', 'knowledge', 'timeline'],
    contact: ['privacy'],
  };
  for (const [sourceRoute, targetRoutes] of Object.entries(entityLinkExpectations)) {
    const sourcePath = `/${lang}/${sourceRoute}/`;
    const sourceHtml = pages.get(sourcePath) ?? '';
    for (const targetRoute of targetRoutes) {
      assert(sourceHtml.includes(`href="/${lang}/${targetRoute}/"`), `${sourcePath}: entity link to ${targetRoute} missing`);
    }
  }
  for (const targetRoute of ['publications', 'research', 'knowledge']) {
    assert(pages.get(patentPath)?.includes(`href="/${lang}/${targetRoute}/"`), `${patentPath}: entity link to ${targetRoute} missing`);
  }

  for (const legalRoute of legalRoutes) {
    const legalPath = `/${lang}/${legalRoute}/`;
    const legalHtml = pages.get(legalPath) ?? '';
    assert(legalHtml.includes(`<link rel="canonical" href="${domain}${legalPath}">`), `${legalPath}: legal canonical missing`);
    assert(legalHtml.includes(`<link rel="alternate" hreflang="${lang}" href="${domain}${legalPath}">`), `${legalPath}: legal hreflang missing`);
  }
}

const redirect = await readFile(new URL('dist/index.html', root), 'utf8');
assert(redirect.includes('url=/ru/'), 'root redirect does not target /ru/');

const redirects = await readFile(new URL('dist/_redirects', root), 'utf8');
assert(redirects.includes('/contact /ru/contact/ 301'), '/contact redirect missing');
assert(redirects.includes('/contact/ /ru/contact/ 301'), '/contact/ redirect missing');

const robots = await readFile(new URL('dist/robots.txt', root), 'utf8');
assert(robots.includes('User-agent: *'), 'robots.txt user agent missing');
assert(robots.includes('Allow: /'), 'robots.txt does not explicitly allow indexing');
assert(!/^Disallow:\s*\/$/m.test(robots), 'robots.txt blocks the entire site');
assert(robots.includes(`Sitemap: ${domain}/sitemap-index.xml`), 'robots.txt sitemap missing');

const headers = await readFile(new URL('dist/_headers', root), 'utf8');
assert(headers.includes('/*'), 'Cloudflare Pages global headers rule missing');
assert(headers.includes('X-Content-Type-Options: nosniff'), 'nosniff security header missing');
assert(headers.includes('Referrer-Policy: strict-origin-when-cross-origin'), 'referrer policy missing');
assert(headers.includes('Permissions-Policy:'), 'permissions policy missing');
assert(headers.includes('X-Frame-Options: DENY'), 'legacy frame protection missing');
assert(headers.includes("Content-Security-Policy: default-src 'self';"), 'content security policy missing');
assert(headers.includes("frame-ancestors 'none'"), 'CSP frame protection missing');
assert(headers.includes("script-src 'self'"), 'CSP script restriction missing');
assert(headers.includes("form-action 'self' https://formspree.io"), 'CSP Formspree form-action permission missing');
assert(headers.includes("connect-src 'self' https://formspree.io"), 'CSP Formspree connect-src permission missing');

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

const forbiddenPatterns = [
  new RegExp(['vet', 'uzi', '47'].join('[\\s_-]*'), 'i'),
  new RegExp(['move', 'trus'].join(''), 'i'),
];
for (const directoryName of ['src', 'public', 'docs']) {
  const directory = new URL(`${directoryName}/`, root);
  for (const file of await sourceFiles(directory)) {
    const contents = await readFile(file, 'utf8');
    assert(forbiddenPatterns.every((pattern) => !pattern.test(contents)), `${path.relative(fileURLToPath(root), file)}: forbidden name found`);
    assert(!contents.includes(privateRecipient), `${path.relative(fileURLToPath(root), file)}: private recipient address found`);
  }
}

if (errors.length > 0) {
  console.error(errors.map((error) => `- ${error}`).join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Verified ${languages.length * (routes.length + publicationSlugs.length)} localized pages, redirects, metadata, JSON-LD, sitemap, robots, links, filters, and source content.`);
}

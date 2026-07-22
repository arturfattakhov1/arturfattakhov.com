import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { gunzipSync } from 'node:zlib';

const root = process.cwd();
const dist = join(root, 'dist');
const site = 'https://arturfattakhov.com';
const languages = ['ru', 'en'];
const standardRoutes = ['', 'about', 'practice', 'research', 'publications', 'media', 'contact', 'profiles', 'knowledge', 'search', 'privacy', 'terms', 'disclaimer'];
const publicationSlugs = [
  'comparative-xray-morphometry-moose-cattle', 'hoof-capsule-cattle-moose', 'diagnostic-imaging-distal-limb-cattle',
  'distal-limb-disorders-cattle', 'digitalization-cattle-farming', 'ovariectomy-ovariohysterectomy-cats',
  'feline-calicivirus-saint-petersburg', 'urethral-intussusception-cat', 'xray-morphometric-laminitis-cattle-patent',
];
const legacyRoutes = ['timeline', 'cv', 'blog', 'faq', 'uses'];
const draftSlugs = [
  'podgotovka-k-onlayn-konsultatsii', 'preparing-for-an-online-consultation',
  'priznaki-srochnogo-obrashcheniya', 'signs-that-need-urgent-veterinary-attention',
  'chtenie-analizov-bez-samodiagnostiki', 'reading-lab-results-without-self-diagnosis',
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function read(path) {
  return readFileSync(join(root, path), 'utf8');
}

function htmlPath(lang, route) {
  return join(dist, lang, route, 'index.html');
}

function count(input, pattern) {
  return (input.match(pattern) ?? []).length;
}

function walk(directory) {
  return readdirSync(directory).flatMap((name) => {
    const path = join(directory, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

assert(existsSync(dist), 'dist is missing; run npm run build first');

const expectedPages = [];
for (const lang of languages) {
  for (const route of standardRoutes) expectedPages.push({ lang, route, path: htmlPath(lang, route) });
  for (const slug of publicationSlugs) expectedPages.push({ lang, route: `publications/${slug}`, path: htmlPath(lang, `publications/${slug}`) });
}

for (const page of expectedPages) {
  assert(existsSync(page.path), `missing generated page: /${page.lang}/${page.route}`);
  const html = readFileSync(page.path, 'utf8');
  const routePath = page.route ? `/${page.lang}/${page.route}/` : `/${page.lang}/`;
  assert(count(html, /<h1\b/g) === 1, `${routePath}: expected exactly one h1`);
  assert(html.includes(`<html lang="${page.lang}">`), `${routePath}: incorrect html language`);
  assert(html.includes(`<link rel="canonical" href="${site}${routePath}">`), `${routePath}: canonical is missing or incorrect`);
  assert(html.includes('hreflang="ru"') && html.includes('hreflang="en"') && html.includes('hreflang="x-default"'), `${routePath}: hreflang set is incomplete`);
  assert(html.includes('"@type":"Person"') && html.includes('"@type":"WebSite"'), `${routePath}: identity structured data is missing`);
  if (page.route) assert(html.includes('"@type":"BreadcrumbList"'), `${routePath}: BreadcrumbList is missing`);
  assert(!/<script\b[^>]*\bsrc="https?:\/\//i.test(html), `${routePath}: external script detected`);
  assert(!/<link\b[^>]*href="https?:\/\/[^\"]+\.(?:css|woff2?)/i.test(html), `${routePath}: external stylesheet or font detected`);
}

for (const lang of languages) {
  const about = readFileSync(htmlPath(lang, 'about'), 'utf8');
  assert(about.includes('id="professional-timeline"'), `${lang}: About timeline anchor is missing`);
  assert(count(about, /<section\b[^>]*class="[^"]*page-section/g) >= 8, `${lang}: About does not contain the required sections`);

  const publications = readFileSync(htmlPath(lang, 'publications'), 'utf8');
  const publicationMarkers = [...publications.matchAll(/data-publication-record="([^"]+)"/g)].map((match) => match[1]);
  const publicationTypes = [...publications.matchAll(/data-publication-type="([^"]+)"/g)].map((match) => match[1]);
  assert(publicationMarkers.length === 9 && new Set(publicationMarkers).size === 9, `${lang}: publication archive must show 9 unique records once each`);
  assert(publicationTypes.filter((type) => type === 'journal').length === 2, `${lang}: journal count must be 2`);
  assert(publicationTypes.filter((type) => type === 'conference').length === 6, `${lang}: conference count must be 6`);
  assert(publicationTypes.filter((type) => type === 'patent').length === 1, `${lang}: patent count must be 1`);
  assert(publications.includes('data-record-count="9"') && publications.includes('data-patent-count="1"'), `${lang}: computed publication count markers are incorrect`);

  const knowledge = readFileSync(htmlPath(lang, 'knowledge'), 'utf8');
  assert(knowledge.includes('data-published-count="0"') && knowledge.includes('data-knowledge-empty'), `${lang}: empty owner Knowledge Base state is incorrect`);

  const media = readFileSync(htmlPath(lang, 'media'), 'utf8');
  for (const url of ['https://dzen.ru/arturfattakhov', 'https://open.spotify.com/show/033OTXXuHSVlHqyxOQTUdm', 'https://www.youtube.com/@dr.arturfattakhov']) {
    assert(media.includes(url), `${lang}: media channel missing ${url}`);
  }
  assert(count(media, /https:\/\/iz\.ru\/182(?:3909|4936)/g) === 2 && media.includes('https://naked-science.ru/'), `${lang}: grouped interdisciplinary coverage is incomplete`);

  const profiles = readFileSync(htmlPath(lang, 'profiles'), 'utf8');
  assert(count(profiles, /src="\/icons\/profiles\/[^"]+\.svg"/g) === 11, `${lang}: local profile icon count must be 11`);
  for (const group of ['scientific', 'media', 'social', 'technical']) assert(profiles.includes(`id="profiles-${group}"`), `${lang}: profiles group missing ${group}`);

  const contact = readFileSync(htmlPath(lang, 'contact'), 'utf8');
  for (const name of ['name', 'email', 'topic', 'message']) {
    const field = contact.match(new RegExp(`<(?:input|select|textarea)\\b[^>]*\\bname="${name}"[^>]*>`))?.[0];
    assert(field, `${lang}: contact field missing ${name}`);
    assert(/\brequired(?:[\s=>]|$)/.test(field), `${lang}: contact field ${name} must be required`);
  }
  assert(!contact.includes('name="lastName"') && !contact.includes('type="file"'), `${lang}: contact contains a prohibited surname or upload field`);
  assert(contact.includes('action="https://formspree.io/f/xgogvvao"'), `${lang}: configured Formspree endpoint is missing`);
  assert(contact.includes('method="POST"'), `${lang}: contact form must use POST`);
  const confirmation = lang === 'ru'
    ? 'Обращение принято. Если ответ требуется, я свяжусь с вами по указанному email.'
    : 'Your inquiry has been received. If a response is required, I will contact you at the email provided.';
  assert(contact.includes(confirmation), `${lang}: exact contact confirmation copy is missing`);

  const shell = readFileSync(htmlPath(lang, 'about'), 'utf8');
  for (const route of ['practice', 'about', 'publications', 'media', 'contact']) assert(shell.includes(`href="/${lang}/${route}/"`), `${lang}: primary navigation missing ${route}`);
  for (const route of ['knowledge', 'research', 'profiles', 'privacy', 'terms', 'disclaimer', 'search']) assert(shell.includes(`href="/${lang}/${route}/"`), `${lang}: secondary navigation missing ${route}`);
  for (const route of legacyRoutes) assert(!shell.includes(`href="/${lang}/${route}/"`), `${lang}: global shell links to legacy route ${route}`);
}

const redirects = read('public/_redirects');
const requiredRedirects = [
  '/ru/timeline/ /ru/about/#professional-timeline 301', '/en/timeline/ /en/about/#professional-timeline 301',
  '/ru/cv/ /ru/about/ 301', '/en/cv/ /en/about/ 301', '/ru/blog/ /ru/knowledge/ 301', '/en/blog/ /en/knowledge/ 301',
  '/ru/faq/ /ru/practice/ 301', '/en/faq/ /en/practice/ 301', '/ru/uses/ /ru/profiles/ 301', '/en/uses/ /en/profiles/ 301',
  '/ru/projects/ /ru/about/ 301', '/en/projects/ /en/about/ 301', '/ru/now/ /ru/about/ 301', '/en/now/ /en/about/ 301',
];
for (const rule of requiredRedirects) assert(redirects.includes(rule), `redirect missing: ${rule}`);
for (const lang of languages) for (const route of legacyRoutes) assert(!existsSync(htmlPath(lang, route)), `legacy route still generated: /${lang}/${route}/`);

const draftSources = walk(join(root, 'src/content/knowledge')).filter((path) => path.endsWith('.md'));
assert(draftSources.length === 6, 'expected six bilingual draft Knowledge records');
for (const path of draftSources) assert(readFileSync(path, 'utf8').includes('status: draft'), `${relative(root, path)} must remain draft-only`);

const sitemap = read('dist/sitemap-0.xml');
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
assert(sitemapUrls.length === 44 && new Set(sitemapUrls).size === 44, `sitemap must contain 44 unique public URLs, found ${sitemapUrls.length}`);
for (const slug of draftSlugs) assert(!sitemap.includes(slug), `draft leaked into sitemap: ${slug}`);
for (const route of legacyRoutes) assert(!sitemap.includes(`/${route}/`), `legacy route leaked into sitemap: ${route}`);

const pagefindEntry = JSON.parse(read('dist/pagefind/pagefind-entry.json'));
for (const lang of languages) assert(pagefindEntry.languages?.[lang]?.page_count === 16, `${lang}: expected 16 isolated Pagefind pages`);
const pagefindFragments = walk(join(dist, 'pagefind/fragment')).filter((path) => path.endsWith('.pf_fragment'));
assert(pagefindFragments.length === 32, `expected 32 Pagefind fragments, found ${pagefindFragments.length}`);
for (const path of pagefindFragments) {
  const fragment = gunzipSync(readFileSync(path)).toString('utf8');
  const lang = relative(join(dist, 'pagefind/fragment'), path).split('_')[0];
  assert(fragment.includes(`/${lang}/`), `Pagefind fragment crossed language index: ${relative(root, path)}`);
  for (const slug of draftSlugs) assert(!fragment.includes(slug), `draft leaked into Pagefind: ${slug}`);
}

const htmlOutput = expectedPages.map((page) => readFileSync(page.path, 'utf8')).join('\n');
const prohibited = [/ВЕТ УЗИ 47/i, /Movetrus/i, /controlled marketplace/i, /диссертац/i, /research pause/i, /пауза в исслед/i, /кандидат наук/i, /\bPhD\b/i, /профессор/i, /врач УЗИ/i, /специалист УЗИ/i, /active AI platform/i, /действующ[^<]{0,30}AI-платформ/i];
for (const pattern of prohibited) assert(!pattern.test(htmlOutput), `confidential or unsupported public term detected: ${pattern}`);
assert(!/Online Consultation|Онлайн-консультац/.test(htmlOutput), 'Online Consultation CTA is prohibited');

const headers = read('public/_headers');
assert(headers.includes("script-src 'self' 'wasm-unsafe-eval'"), 'Pagefind CSP allowance is missing');
assert(!headers.includes("'unsafe-eval'"), 'ordinary unsafe-eval is prohibited');
assert(headers.includes("font-src 'self'"), 'fonts must remain self-hosted');
const csp = headers.match(/Content-Security-Policy:\s*([^\n]+)/)?.[1] ?? '';
for (const directiveName of ['connect-src', 'form-action']) {
  const directive = csp.split(';').map((part) => part.trim()).find((part) => part.startsWith(`${directiveName} `)) ?? '';
  const sources = directive.split(/\s+/).slice(1);
  assert(sources.includes('https://formspree.io'), `${directiveName} must allow the exact Formspree origin`);
  assert(!sources.some((source) => source.includes('*')), `${directiveName} must not contain wildcard sources`);
}

const generatedHtml = walk(dist).filter((path) => path.endsWith('.html') && !path.includes('/pagefind/'));
assert(generatedHtml.length === 46, `expected 46 HTML files including root redirect and 404, found ${generatedHtml.length}`);

console.log(`Verified 44 localized public URLs, 9 unique publication records, 6 hidden drafts, 14 legacy redirects, and ${generatedHtml.length} generated HTML files.`);
console.log(`Pagefind: ru=${pagefindEntry.languages.ru.page_count}, en=${pagefindEntry.languages.en.page_count}.`);

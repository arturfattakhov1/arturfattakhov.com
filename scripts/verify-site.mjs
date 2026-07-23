import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { gunzipSync } from 'node:zlib';

const root = process.cwd();
const dist = join(root, 'dist');
const site = 'https://arturfattakhov.com';
const languages = ['ru', 'en'];
const standardRoutes = ['', 'about', 'practice', 'research', 'publications', 'media', 'contact', 'consultation', 'profiles', 'knowledge', 'search', 'privacy', 'terms', 'disclaimer'];
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

const cmsConfig = read('.pages.yml');
const cmsPaths = [...cmsConfig.matchAll(/^\s+path:\s+([^\n]+)$/gm)].map((match) => match[1].trim());
assert(
  JSON.stringify(cmsPaths) === JSON.stringify(['src/content/knowledge', 'src/data/cms/home-help.json']),
  `CMS editable paths changed: ${cmsPaths.join(', ')}`,
);
assert(/^settings:\n\s+hide: true\n\s+content:\n\s+merge: true/m.test(cmsConfig), 'CMS must hide settings and preserve unmanaged content keys');
assert(!/^media:/m.test(cmsConfig) && !/^actions:/m.test(cmsConfig), 'CMS media and action surfaces must remain disabled');
assert(!/format:\s+(?:code|raw)\b/.test(cmsConfig), 'CMS must not expose a raw or code editor');
assert(count(cmsConfig, /^\s+rename: false$/gm) === 2, 'CMS rename must be disabled for both editable surfaces');
assert(count(cmsConfig, /^\s+delete: false$/gm) === 2, 'CMS delete must be disabled for both editable surfaces');
assert(cmsConfig.includes('media: false'), 'Knowledge rich-text media uploads must remain disabled');

const cmsHomeHelp = JSON.parse(read('src/data/cms/home-help.json'));
assert(
  JSON.stringify(Object.keys(cmsHomeHelp).sort()) === JSON.stringify(languages.toSorted()),
  'CMS homepage section must contain only ru and en content',
);
for (const lang of languages) {
  const section = cmsHomeHelp[lang];
  assert(typeof section?.title === 'string' && section.title.length >= 5, `${lang}: CMS homepage section title is invalid`);
  assert(typeof section?.introduction === 'string' && section.introduction.length >= 20, `${lang}: CMS homepage section introduction is invalid`);
  assert(Array.isArray(section?.items) && section.items.length === 3, `${lang}: CMS homepage section must contain exactly three service summaries`);
  for (const item of section.items) {
    assert(typeof item.title === 'string' && item.title.length >= 3, `${lang}: CMS service title is invalid`);
    assert(typeof item.description === 'string' && item.description.length >= 20, `${lang}: CMS service description is invalid`);
  }
  assert(typeof section.practiceCta === 'string' && typeof section.contactCta === 'string', `${lang}: CMS homepage link labels are invalid`);
}

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

  const consultation = readFileSync(htmlPath(lang, 'consultation'), 'utf8');
  assert(consultation.includes('data-consultation-page') && consultation.includes('data-application-first'), `${lang}: application-first consultation markers are missing`);
  assert(consultation.includes('data-pagefind-body'), `${lang}: consultation must be indexed by Pagefind`);
  assert(consultation.includes('action="https://formspree.io/f/xgogvvao"'), `${lang}: consultation must use the exact Formspree endpoint`);
  assert(consultation.includes('method="POST"'), `${lang}: consultation form must use POST`);
  for (const name of ['name', 'email', 'animalSpecies', 'inquirySummary', 'nonEmergencyConfirmation', 'privacyConsent']) {
    const field = consultation.match(new RegExp(`<(?:input|select|textarea)\\b[^>]*\\bname="${name}"[^>]*>`))?.[0];
    assert(field, `${lang}: consultation field missing ${name}`);
    assert(/\brequired(?:[\s=>]|$)/.test(field), `${lang}: consultation field ${name} must be required`);
  }
  for (const name of ['countryOrRegion', 'animalAge', 'preferredLanguage', 'preferredFormat']) {
    assert(new RegExp(`<(?:input|select)\\b[^>]*\\bname="${name}"`).test(consultation), `${lang}: consultation optional field missing ${name}`);
  }
  for (const hidden of ['source', 'subject', 'language']) assert(consultation.includes(`name="${hidden}"`), `${lang}: consultation hidden field missing ${hidden}`);
  assert(consultation.includes('name="source" value="online-consultation"'), `${lang}: consultation source marker is incorrect`);
  assert(consultation.includes('name="_gotcha"'), `${lang}: consultation honeypot is missing`);
  assert(!consultation.includes('type="file"'), `${lang}: consultation must not accept file uploads`);
  assert(!/<(?:input|button)\b[^>]*(?:name|type)="(?:payment|card|price|checkout)"/i.test(consultation), `${lang}: consultation contains a payment element`);
  assert(!/<iframe\b/i.test(consultation), `${lang}: consultation contains an iframe`);
  assert(!/<script\b[^>]*\bsrc="https?:\/\//i.test(consultation), `${lang}: consultation contains an external service script`);
  assert(consultation.includes('data-urgent-guidance') && consultation.includes('data-no-site-payment') && consultation.includes('data-legal-consistency'), `${lang}: consultation safety markers are incomplete`);
  assert(!/"@type":"(?:Offer|AggregateRating|MedicalClinic|LocalBusiness)"/.test(consultation), `${lang}: consultation contains unsupported structured data`);
  const consultationConfirmation = lang === 'ru'
    ? 'Заявка принята. Я предварительно оценю вопрос и свяжусь с вами по указанному email, чтобы сообщить, подходит ли дистанционный формат и какие следующие шаги возможны.'
    : 'Your application has been received. I will review the inquiry and contact you at the email provided to confirm whether a remote format is appropriate and what the next steps may be.';
  assert(consultation.includes(consultationConfirmation), `${lang}: exact consultation confirmation copy is missing`);
  assert(!/консультация подтверждена|consultation (?:is|has been) confirmed/i.test(consultation), `${lang}: success copy incorrectly confirms a consultation`);

  const home = readFileSync(htmlPath(lang, ''), 'utf8');
  assert(new RegExp(`class="button button--primary" href="/${lang}/consultation/"`).test(home), `${lang}: homepage primary CTA must lead to Consultation`);
  assert(new RegExp(`class="button button--secondary" href="/${lang}/about/"`).test(home), `${lang}: homepage secondary CTA must lead to About`);

  const practice = readFileSync(htmlPath(lang, 'practice'), 'utf8');
  assert(practice.includes(`href="/${lang}/consultation/"`) && practice.includes(`href="/${lang}/contact/"`), `${lang}: Practice CTAs must lead to Consultation and Contact`);

  const privacy = readFileSync(htmlPath(lang, 'privacy'), 'utf8');
  const terms = readFileSync(htmlPath(lang, 'terms'), 'utf8');
  const disclaimer = readFileSync(htmlPath(lang, 'disclaimer'), 'utf8');
  assert(privacy.includes('Formspree') && privacy.includes(lang === 'ru' ? 'Загрузка медицинских файлов отсутствует' : 'Medical file upload is not available'), `${lang}: Privacy form-processing model is inconsistent`);
  assert(terms.includes('id="consultation-applications"'), `${lang}: Terms consultation application boundary is missing`);
  assert(disclaimer.includes(lang === 'ru' ? 'Онлайн-заявка не предназначена для экстренной помощи' : 'The online application is not intended for emergency care'), `${lang}: Disclaimer emergency boundary is missing`);

  const shell = readFileSync(htmlPath(lang, 'about'), 'utf8');
  for (const route of ['practice', 'about', 'publications', 'media', 'contact']) assert(shell.includes(`href="/${lang}/${route}/"`), `${lang}: primary navigation missing ${route}`);
  for (const route of ['knowledge', 'research', 'profiles', 'privacy', 'terms', 'disclaimer', 'search']) assert(shell.includes(`href="/${lang}/${route}/"`), `${lang}: secondary navigation missing ${route}`);
  const consultationLabel = lang === 'ru' ? 'Онлайн-консультация' : 'Online consultation';
  assert(shell.includes(`class="header-consultation" href="/${lang}/consultation/"`) && shell.includes(`class="menu-panel__consultation" href="/${lang}/consultation/"`), `${lang}: header or drawer Consultation CTA is missing`);
  assert(count(shell, new RegExp(consultationLabel, 'g')) >= 3, `${lang}: localized Consultation CTA is missing from the shell`);
  for (const route of legacyRoutes) assert(!shell.includes(`href="/${lang}/${route}/"`), `${lang}: global shell links to legacy route ${route}`);
}

const redirects = read('public/_redirects');
const requiredRedirects = [
  '/ /ru/ 301', '/contact /ru/contact/ 301', '/contact/ /ru/contact/ 301', '/cv /ru/about/ 301', '/cv/ /ru/about/ 301',
  '/ru/timeline/ /ru/about/#professional-timeline 301', '/en/timeline/ /en/about/#professional-timeline 301',
  '/ru/cv/ /ru/about/ 301', '/en/cv/ /en/about/ 301', '/ru/blog/ /ru/knowledge/ 301', '/en/blog/ /en/knowledge/ 301',
  '/ru/blog/* /ru/knowledge/ 301', '/en/blog/* /en/knowledge/ 301',
  '/ru/faq/ /ru/practice/ 301', '/en/faq/ /en/practice/ 301', '/ru/uses/ /ru/profiles/ 301', '/en/uses/ /en/profiles/ 301',
  '/ru/projects/ /ru/about/ 301', '/en/projects/ /en/about/ 301', '/ru/now/ /ru/about/ 301', '/en/now/ /en/about/ 301',
  '/consultation /ru/consultation/ 301', '/consultation/ /ru/consultation/ 301',
  '/ru/online-consultation/ /ru/consultation/ 301', '/en/online-consultation/ /en/consultation/ 301',
];
for (const rule of requiredRedirects) assert(redirects.includes(rule), `redirect missing: ${rule}`);
for (const lang of languages) for (const route of legacyRoutes) assert(!existsSync(htmlPath(lang, route)), `legacy route still generated: /${lang}/${route}/`);

const draftSources = walk(join(root, 'src/content/knowledge')).filter((path) => path.endsWith('.md'));
assert(draftSources.length === 6, 'expected six bilingual draft Knowledge records');
for (const path of draftSources) assert(readFileSync(path, 'utf8').includes('status: draft'), `${relative(root, path)} must remain draft-only`);

const sitemap = read('dist/sitemap-0.xml');
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
assert(sitemapUrls.length === 46 && new Set(sitemapUrls).size === 46, `sitemap must contain 46 unique public URLs, found ${sitemapUrls.length}`);
for (const lang of languages) assert(sitemap.includes(`${site}/${lang}/consultation/`), `${lang}: Consultation is missing from sitemap`);
for (const slug of draftSlugs) assert(!sitemap.includes(slug), `draft leaked into sitemap: ${slug}`);
for (const route of legacyRoutes) assert(!sitemap.includes(`/${route}/`), `legacy route leaked into sitemap: ${route}`);

const pagefindEntry = JSON.parse(read('dist/pagefind/pagefind-entry.json'));
for (const lang of languages) assert(pagefindEntry.languages?.[lang]?.page_count === 17, `${lang}: expected 17 isolated Pagefind pages`);
const pagefindFragments = walk(join(dist, 'pagefind/fragment')).filter((path) => path.endsWith('.pf_fragment'));
assert(pagefindFragments.length === 34, `expected 34 Pagefind fragments, found ${pagefindFragments.length}`);
for (const path of pagefindFragments) {
  const fragment = gunzipSync(readFileSync(path)).toString('utf8');
  const lang = relative(join(dist, 'pagefind/fragment'), path).split('_')[0];
  assert(fragment.includes(`/${lang}/`), `Pagefind fragment crossed language index: ${relative(root, path)}`);
  for (const slug of draftSlugs) assert(!fragment.includes(slug), `draft leaked into Pagefind: ${slug}`);
}

const htmlOutput = expectedPages.map((page) => readFileSync(page.path, 'utf8')).join('\n');
const prohibited = [/ВЕТ УЗИ 47/i, /Movetrus/i, /controlled marketplace/i, /диссертац/i, /research pause/i, /пауза в исслед/i, /кандидат наук/i, /\bPhD\b/i, /профессор/i, /врач УЗИ/i, /специалист УЗИ/i, /active AI platform/i, /действующ[^<]{0,30}AI-платформ/i];
for (const pattern of prohibited) assert(!pattern.test(htmlOutput), `confidential or unsupported public term detected: ${pattern}`);

const formScript = read('public/scripts/contact-form.js');
assert(formScript.includes("if (typeof window.fetch !== 'function' || form.dataset.nativeFallback === 'true') return;"), 'native form fallback is missing');
assert(formScript.includes('if (payload?.ok !== true)') && formScript.indexOf('if (payload?.ok !== true)') < formScript.indexOf('form.reset()'), 'form must reset only after JSON ok: true');
assert(formScript.includes('submitButton.disabled = true') && formScript.includes('submitButton.disabled = false'), 'submit button busy state is incomplete');

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
assert(generatedHtml.length === 49, `expected 49 HTML files including root redirect and 404, found ${generatedHtml.length}`);

console.log(`Verified 46 localized public URLs, 9 unique publication records, 6 hidden drafts, ${requiredRedirects.length} redirect rules, and ${generatedHtml.length} generated HTML files.`);
console.log(`Pagefind: ru=${pagefindEntry.languages.ru.page_count}, en=${pagefindEntry.languages.en.page_count}.`);

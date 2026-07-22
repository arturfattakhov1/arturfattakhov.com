import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const domain = 'https://arturfattakhov.com';
const languages = ['ru', 'en'];
const routes = ['', 'practice', 'about', 'research', 'publications', 'media', 'blog', 'contact', 'cv', 'profiles', 'uses', 'knowledge', 'timeline', 'faq', 'search', 'privacy', 'terms', 'disclaimer'];
const legalRoutes = ['privacy', 'terms', 'disclaimer'];
const pageSchemaTypes = {
  practice: 'WebPage',
  research: 'AboutPage',
  publications: 'CollectionPage',
  contact: 'ContactPage',
  profiles: 'CollectionPage',
  knowledge: 'CollectionPage',
  timeline: 'CollectionPage',
  faq: 'FAQPage',
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
const publicationMetadataByLanguage = new Map(languages.map((lang) => [lang, new Map()]));
const knowledgeThemeIdsByLanguage = new Map();
const knowledgeRecordSlugsByLanguage = new Map();
const timelineIdsByLanguage = new Map();
const faqGroupIdsByLanguage = new Map();
const faqQuestionIdsByLanguage = new Map();
const expectedTimelineEventCount = 10;
const expectedKnowledgeThemeCount = 4;
const expectedFaqGroupCount = 4;
const expectedFaqQuestionCount = 15;
const prohibitedNames = [
  ['Move', 'trus'].join(''),
  ['ВЕТ', ' УЗИ', ' 47'].join(''),
];

function assert(condition, message) {
  if (!condition) errors.push(message);
}

function assertAccessibility(html, relativePath) {
  assert(html.includes('<a class="skip-link" href="#main-content">'), `${relativePath}: skip link missing`);
  assert(/<main id="main-content" tabindex="-1"(?:\s[^>]*)?>/.test(html), `${relativePath}: main skip-link target is not focusable`);

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
    const publicationMeta = html.match(/<p class="publication-record-meta"><span>([^<]+)<\/span><span>(\d{4})<\/span>(?:<span>[^<]+<\/span>)?<\/p>/);
    const typeByLabel = lang === 'ru'
      ? { 'Журнальная статья': 'journal', 'Публикация конференции': 'conference', 'Патент': 'patent' }
      : { 'Journal article': 'journal', 'Conference paper': 'conference', 'Patent': 'patent' };
    const publicationType = publicationMeta ? typeByLabel[publicationMeta[1]] : undefined;
    const expectedType = slug.endsWith('-patent') ? 'Patent' : 'ScholarlyArticle';
    const expectedPageId = `${expectedCanonical}#webpage`;
    const expectedPublicationId = `${expectedCanonical}#publication`;
    const publicationPage = jsonLdNodes.find((node) => node['@id'] === expectedPageId && node['@type'] === 'WebPage');
    const breadcrumb = jsonLdNodes.find((node) => node['@id'] === `${expectedCanonical}#breadcrumb` && node['@type'] === 'BreadcrumbList');
    const personNodes = jsonLdNodes.filter((node) => node['@id'] === `${domain}/#person` && node['@type'] === 'Person');
    const websiteNodes = jsonLdNodes.filter((node) => node['@id'] === `${domain}/#website` && node['@type'] === 'WebSite');
    assert(publicationSchema?.['@type'] === expectedType, `${relativePath}: incorrect publication schema type`);
    assert(Boolean(publicationType), `${relativePath}: publication display type is missing`);
    assert(publicationSchema?.datePublished?.startsWith(publicationMeta?.[2]), `${relativePath}: publication display year does not match schema`);
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
    publicationMetadataByLanguage.get(lang).set(slug, {
      title: publicationSchema?.name,
      type: publicationType,
      year: publicationMeta?.[2],
      href: `/${relativePath}`,
    });
    assertUniqueSchemaIds(jsonLdNodes, relativePath);
  }
}

function matchOne(html, expression) {
  return html.match(expression)?.[1];
}

function escapeHtmlText(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
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
    const jobTitles = Array.isArray(person?.jobTitle) ? person.jobTitle.map((value) => value?.['@value']) : [];
    const descriptions = Array.isArray(person?.description) ? person.description.map((value) => value?.['@value']) : [];
    assert(jobTitles.includes('Ветеринарный врач') && jobTitles.includes('Veterinary Doctor'), `${relativePath}: neutral bilingual Person jobTitle is incomplete`);
    assert(descriptions.includes('Ветеринарный врач и специалист визуальной диагностики.') && descriptions.includes('Veterinary Doctor and Diagnostic Imaging Specialist.'), `${relativePath}: neutral bilingual Person description is incomplete`);
    assert(Array.isArray(person?.hasOccupation) && person.hasOccupation.length === 1, `${relativePath}: Person occupation must remain limited to veterinary medicine`);
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

      if (route === 'practice') {
        const service = jsonLdNodes.find((node) => node['@id'] === `${expectedCanonical}#professional-service`);
        assert(service?.['@type'] === 'ProfessionalService', `${relativePath}: ProfessionalService schema missing`);
        assert(service?.provider?.['@id'] === `${domain}/#person`, `${relativePath}: ProfessionalService provider relationship missing`);
        assert(pageSchema?.mainEntity?.['@id'] === `${expectedCanonical}#professional-service`, `${relativePath}: Practice mainEntity is incorrect`);
        assert(Array.isArray(service?.areaServed) && service.areaServed.length === 2, `${relativePath}: confirmed service area is incomplete`);
        assert(!('address' in (service ?? {})), `${relativePath}: unverified service address found`);
        assert(!('telephone' in (service ?? {})), `${relativePath}: unverified service telephone found`);
        assert(!('openingHours' in (service ?? {})), `${relativePath}: unverified service hours found`);
        assert(!('priceRange' in (service ?? {})), `${relativePath}: unverified service price range found`);
      }

      if (route === 'knowledge') {
        const knowledgeMain = matchOne(html, /<main\b[^>]*>([\s\S]*?)<\/main>/) ?? '';
        const themeIds = [...html.matchAll(/data-knowledge-theme="([^"]+)"/g)].map((match) => match[1]);
        const themeRecordCounts = [...html.matchAll(/data-knowledge-theme-record-count="(\d+)"/g)].map((match) => Number(match[1]));
        const recordEntries = [...html.matchAll(/<li\b([^>]*\bdata-knowledge-record="[^"]+"[^>]*)>([\s\S]*?)<\/li>/g)]
          .map((match) => ({
            attributes: match[1],
            content: match[2],
            slug: matchOne(match[1], /data-knowledge-record="([^"]+)"/),
          }));
        const recordSlugs = recordEntries.map((entry) => entry.slug).filter(Boolean);
        const recordTypes = [...html.matchAll(/data-knowledge-record-type="([^"]+)"/g)].map((match) => match[1]);
        const recordYears = [...html.matchAll(/data-knowledge-record-year="([^"]+)"/g)].map((match) => match[1]);
        const itemList = jsonLdNodes.find((node) => node['@id'] === `${expectedCanonical}#item-list` && node['@type'] === 'ItemList');
        const itemUrls = itemList?.itemListElement?.map((item) => item.url) ?? [];

        assert((html.match(/data-knowledge-page(?=\s|>)/g) ?? []).length === 1, `${relativePath}: expected one Knowledge page root`);
        assert(themeIds.length === expectedKnowledgeThemeCount, `${relativePath}: expected ${expectedKnowledgeThemeCount} Knowledge themes`);
        assert(new Set(themeIds).size === themeIds.length, `${relativePath}: duplicate Knowledge theme IDs`);
        assert(themeRecordCounts.length === themeIds.length && themeRecordCounts.every((count) => count > 0), `${relativePath}: empty Knowledge theme found`);
        assert(recordSlugs.length === publicationSlugs.length, `${relativePath}: expected every publication record in Knowledge`);
        assert(new Set(recordSlugs).size === recordSlugs.length, `${relativePath}: duplicate Knowledge publication record`);
        assert(JSON.stringify([...recordSlugs].sort()) === JSON.stringify([...publicationSlugs].sort()), `${relativePath}: Knowledge publication coverage is incomplete`);
        assert(themeRecordCounts.reduce((total, count) => total + count, 0) === recordSlugs.length, `${relativePath}: Knowledge theme counts do not match records`);
        assert(recordTypes.length === recordSlugs.length && recordTypes.every((type) => ['journal', 'conference', 'patent'].includes(type)), `${relativePath}: Knowledge record type markers are incomplete`);
        assert(recordYears.length === recordSlugs.length && recordYears.every((year) => ['2021', '2024', '2025'].includes(year)), `${relativePath}: Knowledge record year markers are incomplete`);
        assert(html.includes(`data-knowledge-theme-count="${themeIds.length}"`), `${relativePath}: Knowledge theme count marker is incorrect`);
        assert(html.includes(`data-knowledge-record-count="${recordSlugs.length}"`), `${relativePath}: Knowledge record count marker is incorrect`);
        assert(themeIds.every((id) => knowledgeMain.includes(`href="#${id}"`) && knowledgeMain.includes(`id="${id}"`)), `${relativePath}: Knowledge topic navigation is incomplete`);
        assert(recordSlugs.every((slug) => knowledgeMain.includes(`href="/${lang}/publications/${slug}/"`)), `${relativePath}: Knowledge publication link is incomplete`);
        const publicationMetadata = publicationMetadataByLanguage.get(lang);
        assert(recordEntries.every((entry) => {
          const expected = publicationMetadata.get(entry.slug);
          return expected
            && typeof expected.title === 'string'
            && entry.attributes.includes(`data-knowledge-record-type="${expected.type}"`)
            && entry.attributes.includes(`data-knowledge-record-year="${expected.year}"`)
            && entry.content.includes(`href="${expected.href}"`)
            && entry.content.includes(`<time datetime="${expected.year}">${expected.year}</time>`)
            && entry.content.includes(`<span class="knowledge-record__title">${escapeHtmlText(expected.title)}</span>`);
        }), `${relativePath}: Knowledge record presentation is not synchronized with publication details`);
        assert(pageSchema?.mainEntity?.['@id'] === `${expectedCanonical}#item-list`, `${relativePath}: Knowledge CollectionPage mainEntity missing`);
        assert(itemList?.numberOfItems === themeIds.length, `${relativePath}: Knowledge ItemList count does not match themes`);
        assert(itemUrls.length === themeIds.length && itemUrls.every((url, index) => url === `${expectedCanonical}#${themeIds[index]}`), `${relativePath}: Knowledge ItemList does not match visible themes`);
        assert(itemList?.itemListElement?.every((item) => typeof item.name === 'string' && item.name.trim().length > 0), `${relativePath}: Knowledge ItemList contains an empty theme`);
        assert(!/(?:здесь будут|будет объединять|будущие материалы|материалы будут|will contain|will connect|future material|material will be|will examine|will explain|will address)/i.test(knowledgeMain), `${relativePath}: stale Knowledge future promise found`);
        assert(!/(?:veterinary-ultrasonography|artificial-intelligence|evidence-based-veterinary-medicine|scientific-communication)/i.test(knowledgeMain), `${relativePath}: empty legacy Knowledge theme remains`);
        assert(prohibitedNames.every((name) => !knowledgeMain.toLowerCase().includes(name.toLowerCase())), `${relativePath}: prohibited name found in Knowledge`);
        assert(!/(?:mailto:|tel:|\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b)/i.test(knowledgeMain), `${relativePath}: contact details exposed in Knowledge`);
        assert(!/<script\b[^>]*\ssrc=/i.test(knowledgeMain), `${relativePath}: Knowledge must not add a client script`);

        knowledgeThemeIdsByLanguage.set(lang, themeIds);
        knowledgeRecordSlugsByLanguage.set(lang, recordSlugs);
      } else if (route === 'faq') {
        const groupIds = [...html.matchAll(/data-faq-group="([^"]+)"/g)].map((match) => match[1]);
        const uniqueGroupIds = [...new Set(groupIds)];
        const questionIds = [...html.matchAll(/data-faq-id="([^"]+)"/g)].map((match) => match[1]);
        const questionSources = [...html.matchAll(/data-faq-source="([^"]+)"/g)].map((match) => match[1]);
        const questionLinks = [...html.matchAll(/data-faq-link="([^"]+)"/g)].map((match) => match[1]);
        const faqMain = matchOne(html, /<main\b[^>]*>([\s\S]*?)<\/main>/) ?? '';
        const schemaQuestions = Array.isArray(pageSchema?.mainEntity) ? pageSchema.mainEntity : [];
        const schemaQuestionIds = schemaQuestions.map((question) => question['@id']?.split('#faq-').at(-1));
        const publicationsHtml = pages.get(`/${lang}/publications/`) ?? '';
        const journalCount = (publicationsHtml.match(/data-type="journal"/g) ?? []).length;
        const conferenceCount = (publicationsHtml.match(/data-type="conference"/g) ?? []).length;
        const patentCount = (publicationsHtml.match(/data-type="patent"/g) ?? []).length;

        assert((html.match(/data-faq-page(?=\s|>)/g) ?? []).length === 1, `${relativePath}: expected one FAQ page root`);
        assert(uniqueGroupIds.length === expectedFaqGroupCount, `${relativePath}: expected ${expectedFaqGroupCount} FAQ groups`);
        assert(questionIds.length === expectedFaqQuestionCount, `${relativePath}: expected ${expectedFaqQuestionCount} FAQ questions`);
        assert(new Set(questionIds).size === questionIds.length, `${relativePath}: duplicate FAQ question IDs`);
        assert(questionSources.length === questionIds.length && questionSources.every(Boolean), `${relativePath}: FAQ source mapping is incomplete`);
        assert(new Set(questionLinks).size === questionLinks.length, `${relativePath}: duplicate FAQ link IDs`);
        assert((faqMain.match(/<details\b/g) ?? []).length === questionIds.length, `${relativePath}: FAQ details count does not match questions`);
        assert((faqMain.match(/<summary>/g) ?? []).length === questionIds.length, `${relativePath}: FAQ summary count does not match questions`);
        assert((faqMain.match(/<details\b[^>]*\sopen(?:\s|>)/g) ?? []).length === 0, `${relativePath}: FAQ must be initially collapsed for scanning`);
        assert((faqMain.match(/class="card(?:\s|\")/g) ?? []).length === 0, `${relativePath}: legacy FAQ card layout remains`);
        assert(uniqueGroupIds.every((id) => faqMain.includes(`href="#${id}"`) && faqMain.includes(`id="${id}"`)), `${relativePath}: FAQ topic navigation is incomplete`);
        assert(schemaQuestions.length === questionIds.length, `${relativePath}: FAQPage question count does not match rendered FAQ`);
        assert(JSON.stringify(schemaQuestionIds) === JSON.stringify(questionIds), `${relativePath}: FAQPage question order or IDs do not match rendered FAQ`);
        assert(schemaQuestions.every((question) => question['@type'] === 'Question' && typeof question.name === 'string' && question.name.trim()), `${relativePath}: FAQPage contains an invalid Question`);
        assert(schemaQuestions.every((question) => question.acceptedAnswer?.['@type'] === 'Answer' && typeof question.acceptedAnswer?.text === 'string' && question.acceptedAnswer.text.trim()), `${relativePath}: FAQPage contains an invalid acceptedAnswer`);
        assert(schemaQuestions.every((question) => faqMain.includes(escapeHtmlText(question.name)) && faqMain.includes(escapeHtmlText(question.acceptedAnswer.text))), `${relativePath}: FAQPage text is not synchronized with visible content`);
        assert(html.includes(`data-faq-group-count="${uniqueGroupIds.length}"`), `${relativePath}: FAQ group count marker is incorrect`);
        assert(html.includes(`data-faq-question-count="${questionIds.length}"`), `${relativePath}: FAQ question count marker is incorrect`);
        assert(html.includes(`data-faq-journal-count="${journalCount}"`), `${relativePath}: FAQ journal count is not synchronized`);
        assert(html.includes(`data-faq-conference-count="${conferenceCount}"`), `${relativePath}: FAQ conference count is not synchronized`);
        assert(html.includes(`data-faq-patent-count="${patentCount}"`), `${relativePath}: FAQ patent count is not synchronized`);
        assert(html.includes('data-faq-patent-number="RU 2851956"'), `${relativePath}: FAQ patent number is incorrect`);
        assert(html.includes(lang === 'ru' ? '2 журнальные статьи' : '2 journal articles'), `${relativePath}: FAQ journal summary missing`);
        assert(html.includes(lang === 'ru' ? '6 конференционных публикаций' : '6 conference publications'), `${relativePath}: FAQ conference summary missing`);
        const diagnosticImagingRole = lang === 'ru' ? 'специалист визуальной диагностики' : 'diagnostic imaging specialist';
        assert(faqMain.toLowerCase().includes(diagnosticImagingRole), `${relativePath}: verified diagnostic imaging role missing`);
        assert(html.includes(`href="/${lang}/contact/"`), `${relativePath}: localized Contact link missing`);
        assert(!/(?:где будут доступны публикации|публикации будут|where will publications|publications will appear)/i.test(faqMain), `${relativePath}: stale future Publications promise found`);
        assert(!/(?:PhD|doctoral candidate|current postgraduate student|professor|senior researcher|ultrasound physician|sonographer|врач(?:ом)? УЗИ)/i.test(faqMain), `${relativePath}: unverified FAQ status found`);
        assert(prohibitedNames.every((name) => !faqMain.toLowerCase().includes(name.toLowerCase())), `${relativePath}: prohibited project or practice name found`);
        assert(!/(?:mailto:|tel:|\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b)/i.test(faqMain), `${relativePath}: contact details exposed in FAQ`);
        assert(!/<script\b[^>]*\ssrc=/i.test(faqMain), `${relativePath}: FAQ must not add a client script`);

        faqGroupIdsByLanguage.set(lang, uniqueGroupIds);
        faqQuestionIdsByLanguage.set(lang, questionIds);
      } else if (['publications', 'profiles', 'timeline'].includes(route)) {
        const itemList = jsonLdNodes.find((node) => node['@id'] === `${expectedCanonical}#item-list` && node['@type'] === 'ItemList');
        assert(pageSchema?.mainEntity?.['@id'] === `${expectedCanonical}#item-list`, `${relativePath}: CollectionPage mainEntity missing`);
        assert(itemList?.numberOfItems > 0 && itemList?.itemListElement?.length === itemList.numberOfItems, `${relativePath}: CollectionPage ItemList is incomplete`);

        if (route === 'timeline') {
          const eventIds = [...html.matchAll(/data-timeline-entry="([^"]+)"/g)].map((match) => match[1]);
          const eventSources = [...html.matchAll(/data-timeline-source="([^"]+)"/g)].map((match) => match[1]);
          const eventLinks = [...html.matchAll(/<a\b([^>]*data-timeline-link="[^"]+"[^>]*)>/g)]
            .map((match) => matchOne(match[1], /href="([^"]+)"/))
            .filter(Boolean);
          const itemUrls = itemList?.itemListElement?.map((item) => item.url) ?? [];

          assert(eventIds.length === expectedTimelineEventCount, `${relativePath}: expected ${expectedTimelineEventCount} Timeline entries`);
          assert(new Set(eventIds).size === eventIds.length, `${relativePath}: duplicate Timeline stable IDs`);
          assert(eventSources.length === eventIds.length && eventSources.every(Boolean), `${relativePath}: Timeline source mapping is incomplete`);
          assert(new Set(eventSources).size === eventSources.length, `${relativePath}: duplicate Timeline source mapping`);
          assert(eventLinks.length > 0 && new Set(eventLinks).size === eventLinks.length, `${relativePath}: duplicate or missing Timeline event links`);
          assert((html.match(/data-current="true"/g) ?? []).length === 1, `${relativePath}: current practice marker is incorrect`);
          assert(itemList?.numberOfItems === eventIds.length, `${relativePath}: Timeline ItemList count does not match rendered entries`);
          assert(itemUrls.length === eventIds.length && itemUrls.every((url, index) => url === `${expectedCanonical}#timeline-${eventIds[index]}`), `${relativePath}: Timeline ItemList does not match rendered entry order`);
          assert(itemList?.itemListElement?.every((item) => typeof item.name === 'string' && item.name.trim().length > 0), `${relativePath}: Timeline ItemList contains an empty entry`);
          assert(!/(?:будут добавлены|будет расширяться|будущие этапы|will be added|will expand|future milestones)/i.test(html), `${relativePath}: stale Timeline placeholder promise found`);
          assert(!/(?:PhD student|doctoral candidate|current postgraduate student|professor|senior researcher|ultrasound physician|sonographer)/i.test(html), `${relativePath}: unverified Timeline status found`);
          assert(html.includes(lang === 'ru' ? '>Аналитик<' : '>Analyst<'), `${relativePath}: verified Analyst role missing`);
          timelineIdsByLanguage.set(lang, eventIds);
        }
      } else if (route !== 'practice') {
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

const ruTimelineIds = timelineIdsByLanguage.get('ru') ?? [];
const enTimelineIds = timelineIdsByLanguage.get('en') ?? [];
assert(JSON.stringify(ruTimelineIds) === JSON.stringify(enTimelineIds), 'Timeline RU/EN stable ID parity is incomplete');

const ruKnowledgeThemeIds = knowledgeThemeIdsByLanguage.get('ru') ?? [];
const enKnowledgeThemeIds = knowledgeThemeIdsByLanguage.get('en') ?? [];
const ruKnowledgeRecordSlugs = knowledgeRecordSlugsByLanguage.get('ru') ?? [];
const enKnowledgeRecordSlugs = knowledgeRecordSlugsByLanguage.get('en') ?? [];
assert(JSON.stringify(ruKnowledgeThemeIds) === JSON.stringify(enKnowledgeThemeIds), 'Knowledge RU/EN theme parity is incomplete');
assert(JSON.stringify(ruKnowledgeRecordSlugs) === JSON.stringify(enKnowledgeRecordSlugs), 'Knowledge RU/EN record parity is incomplete');

const knowledgeSource = await readFile(new URL('src/data/knowledge.ts', root), 'utf8');
assert(knowledgeSource.includes("from './publication-records'"), 'Knowledge must reuse centralized publication records');
assert(knowledgeSource.includes('publicationRecords.map'), 'Knowledge mapping must validate against centralized publication records');
assert(knowledgeSource.includes('record.title[lang]'), 'Knowledge titles must come from centralized publication records');
assert(knowledgeSource.includes('record.type'), 'Knowledge types must come from centralized publication records');
assert(knowledgeSource.includes('record.year'), 'Knowledge years must come from centralized publication records');
assert(knowledgeSource.includes('publicationPath(lang, record.slug)'), 'Knowledge URLs must come from centralized publication records');
assert(knowledgeSource.includes('new Set(assignedSlugs).size !== assignedSlugs.length'), 'Knowledge must reject duplicate record assignments');

const ruFaqGroupIds = faqGroupIdsByLanguage.get('ru') ?? [];
const enFaqGroupIds = faqGroupIdsByLanguage.get('en') ?? [];
const ruFaqQuestionIds = faqQuestionIdsByLanguage.get('ru') ?? [];
const enFaqQuestionIds = faqQuestionIdsByLanguage.get('en') ?? [];
assert(JSON.stringify(ruFaqGroupIds) === JSON.stringify(enFaqGroupIds), 'FAQ RU/EN group parity is incomplete');
assert(JSON.stringify(ruFaqQuestionIds) === JSON.stringify(enFaqQuestionIds), 'FAQ RU/EN question parity is incomplete');

const faqSource = await readFile(new URL('src/data/faq.ts', root), 'utf8');
assert(faqSource.includes("from './cv'"), 'FAQ must reuse centralized CV records');
assert(faqSource.includes("from './publication-records'"), 'FAQ must reuse centralized publication records');
assert(faqSource.includes("from './about'"), 'FAQ must reuse approved About terminology');
assert(faqSource.includes('publicationRecords.filter'), 'FAQ publication counts must be derived from centralized records');
assert(faqSource.includes('publicationPath(lang, patentRecord.slug)'), 'FAQ patent URL must come from the centralized publication record');
assert(!faqSource.includes('xray-morphometric-laminitis-cattle-patent'), 'FAQ must not duplicate the patent slug');

const timelineSource = await readFile(new URL('src/data/timeline.ts', root), 'utf8');
assert(timelineSource.includes("from './cv'"), 'Timeline must reuse centralized CV records');
assert(timelineSource.includes("from './publication-records'"), 'Timeline must reuse centralized publication records');
assert(timelineSource.includes('publicationPath(lang, patent2025.slug)'), 'Timeline patent URL must come from the centralized publication record');
assert(!timelineSource.includes('xray-morphometric-laminitis-cattle-patent'), 'Timeline must not duplicate the patent slug');

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

const navigationScriptPath = '/scripts/navigation.js';
const navigationScript = await readFile(new URL(`public${navigationScriptPath}`, root), 'utf8');
assert(navigationScript.includes("event.key === 'Escape'"), 'navigation Escape handler missing');
assert(navigationScript.includes("close({ restoreFocus: true })"), 'navigation focus restoration missing');
assert(navigationScript.includes("element.setAttribute('aria-expanded', 'true')"), 'navigation expanded state missing');

const searchScriptPath = '/scripts/search.js';
const searchScript = await readFile(new URL(`public${searchScriptPath}`, root), 'utf8');
assert(searchScript.includes("import('/pagefind/pagefind.js')"), 'Pagefind browser import missing');
assert(searchScript.includes('query.length < 2'), 'search minimum query length missing');
assert(searchScript.includes('noWorker: true'), 'Pagefind no-worker CSP strategy missing');
assert(searchScript.includes("event.key === 'ArrowDown'"), 'search keyboard result navigation missing');
assert(searchScript.includes('window.location.assign(firstResult.href)'), 'search Enter result activation missing');

for (const lang of languages) {
  const searchPath = `/${lang}/search/`;
  const searchHtml = pages.get(searchPath) ?? '';
  const homeHtml = pages.get(`/${lang}/`) ?? '';
  const siteHeader = matchOne(homeHtml, /<header class="site-header">([\s\S]*?)<\/header>/) ?? '';
  const siteFooter = matchOne(homeHtml, /<footer class="site-footer">([\s\S]*?)<\/footer>/) ?? '';

  assert(siteHeader.includes(lang === 'ru' ? 'aria-label="Артур Фаттахов — главная"' : 'aria-label="Artur Fattakhov — home"'), `${lang}: AF home mark accessible name missing`);
  assert(siteHeader.includes('>AF</a>'), `${lang}: AF home mark missing`);
  assert(siteHeader.includes(`href="/${lang}/search/"`), `${lang}: header search trigger missing`);
  assert(siteHeader.includes(`class="header-search" href="/${lang}/search/" aria-label="${lang === 'ru' ? 'Поиск' : 'Search'}"`), `${lang}: icon-only search accessible name missing`);
  assert(siteHeader.includes('aria-expanded="false"'), `${lang}: menu initial expanded state missing`);
  assert(siteHeader.includes(`aria-controls="site-menu-${lang}"`), `${lang}: menu control relationship missing`);
  assert(!siteHeader.includes(`href="/${lang}/projects/"`), `${lang}: Projects remains in global header navigation`);
  assert(!siteHeader.includes(`href="/${lang}/now/"`), `${lang}: Now remains in global header navigation`);
  assert(!siteHeader.includes(`href="/${lang}/about/#professional-system"`), `${lang}: temporary Practice anchor remains in navigation`);
  assert(siteHeader.includes(`href="/${lang}/practice/"`), `${lang}: localized Practice navigation link missing`);
  assert(siteHeader.includes(lang === 'ru' ? '>Практика<' : '>Practice<'), `${lang}: localized Practice navigation label missing`);
  assert(siteHeader.includes(lang === 'ru'
    ? 'class="header-consultation" href="/ru/contact/">Связаться</a>'
    : 'class="header-consultation" href="/en/contact/">Contact</a>'), `${lang}: honest Contact CTA missing`);
  assert(!siteHeader.includes(`href="/${lang}/cv/"`), `${lang}: CV remains in global header navigation`);
  assert(!siteFooter.includes(`href="/${lang}/projects/"`), `${lang}: Projects remains in footer navigation`);
  assert(!siteFooter.includes(`href="/${lang}/now/"`), `${lang}: Now remains in footer navigation`);
  assert(!siteFooter.includes(`href="/${lang}/cv/"`), `${lang}: CV remains in footer navigation`);
  assert(siteFooter.includes(lang === 'ru'
    ? 'Ветеринарный врач и специалист визуальной диагностики.'
    : 'Veterinary Doctor and Diagnostic Imaging Specialist.'), `${lang}: neutral footer positioning missing`);

  const menuContactIndex = siteHeader.indexOf('menu-panel__consultation');
  const menuSearchIndex = siteHeader.indexOf('menu-panel__search');
  assert(menuContactIndex >= 0 && menuSearchIndex > menuContactIndex, `${lang}: mobile menu Contact CTA must precede search`);

  assert(searchHtml.includes('data-search-form'), `${searchPath}: search form missing`);
  assert(searchHtml.includes('minlength="2"'), `${searchPath}: search input minimum length missing`);
  assert(searchHtml.includes(`<script src="${searchScriptPath}" type="module"></script>`), `${searchPath}: local search script missing`);
  assert(!searchHtml.includes('data-pagefind-body'), `${searchPath}: search results page must not index itself`);

  for (const indexedRoute of ['practice', 'about', 'research', 'media', 'profiles', 'knowledge', 'publications']) {
    assert(pages.get(`/${lang}/${indexedRoute}/`)?.includes('data-pagefind-body'), `${lang}/${indexedRoute}/: Pagefind body marker missing`);
  }
  for (const excludedRoute of ['contact', 'cv', 'uses', 'timeline', 'faq', 'search', 'privacy', 'terms', 'disclaimer']) {
    assert(!pages.get(`/${lang}/${excludedRoute}/`)?.includes('data-pagefind-body'), `${lang}/${excludedRoute}/: excluded route is indexed`);
  }

  const practicePath = `/${lang}/practice/`;
  const practiceHtml = pages.get(practicePath) ?? '';
  const practiceMain = matchOne(practiceHtml, /<main\b[^>]*>([\s\S]*?)<\/main>/) ?? '';
  assert(practiceMain.includes('data-practice-page'), `${practicePath}: Practice page root missing`);
  assert(practiceMain.includes(`href="/${lang}/contact/"`), `${practicePath}: localized Contact CTA missing`);
  assert(practiceMain.includes(lang === 'ru' ? 'Санкт-Петербург' : 'Saint Petersburg'), `${practicePath}: confirmed Saint Petersburg service area missing`);
  assert(practiceMain.includes(lang === 'ru' ? 'Ленинградской области' : 'Leningrad Region'), `${practicePath}: confirmed Leningrad Region service area missing`);
  assert(practiceMain.includes(lang === 'ru' ? 'затруднённом дыхании' : 'difficulty breathing'), `${practicePath}: urgent notice is incomplete`);
  assert(practiceMain.includes(lang === 'ru' ? 'не заменяет физикальный осмотр' : 'does not replace a physical examination'), `${practicePath}: remote-format limitation missing`);
  assert(!/(?:price|prices|цена|цены|стоимость)/i.test(practiceMain), `${practicePath}: unapproved pricing language found`);
}

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

  for (const sourceRoute of ['about', 'research', 'profiles']) {
    const sourcePath = `/${lang}/${sourceRoute}/`;
    const sourceHtml = pages.get(sourcePath);
    for (const hubRoute of ['knowledge', 'timeline', 'faq']) {
      assert(sourceHtml?.includes(`href="/${lang}/${hubRoute}/"`), `${sourcePath}: contextual ${hubRoute} link missing`);
    }
  }

  for (const sourceRoute of ['about', 'research', 'knowledge', 'timeline']) {
    const sourcePath = `/${lang}/${sourceRoute}/`;
    assert(pages.get(sourcePath)?.includes(`href="/${lang}/publications/"`), `${sourcePath}: contextual Publications link missing`);
  }

  const patentPath = `/${lang}/publications/xray-morphometric-laminitis-cattle-patent/`;
  assert(pages.get(`/${lang}/publications/`)?.includes(`href="${patentPath}"`), `${lang}/publications/: Patent link missing`);
  assert(pages.get(patentPath)?.includes(`href="/${lang}/research/"`), `${patentPath}: Research link missing`);

  const entityLinkExpectations = {
    about: ['research', 'publications', 'profiles', 'contact', 'knowledge', 'timeline'],
    research: ['about', 'publications', 'profiles', 'knowledge', 'timeline'],
    publications: ['about', 'research', 'profiles'],
    timeline: ['cv', 'research', 'publications'],
    knowledge: ['research', 'publications', 'faq', 'disclaimer'],
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
assert(redirects.includes('/ru/projects/ /ru/about/ 301'), '/ru/projects/ permanent redirect missing');
assert(redirects.includes('/en/projects/ /en/about/ 301'), '/en/projects/ permanent redirect missing');
assert(redirects.includes('/ru/now/ /ru/about/ 301'), '/ru/now/ permanent redirect missing');
assert(redirects.includes('/en/now/ /en/about/ 301'), '/en/now/ permanent redirect missing');

const notFoundPath = '404.html';
const notFoundScriptPath = '/scripts/not-found.js';
const notFound = await readFile(new URL(`dist/${notFoundPath}`, root), 'utf8');
const notFoundScript = await readFile(new URL(`dist${notFoundScriptPath}`, root), 'utf8');
assert(notFound.includes('<html lang="ru" data-not-found-page>'), '404.html: safe Russian fallback language missing');
assert(notFound.includes('<meta name="robots" content="noindex, nofollow">'), '404.html: noindex directive missing');
assert(!notFound.includes('<link rel="canonical"'), '404.html: canonical must not represent a missing URL');
assert(!notFound.includes('application/ld+json'), '404.html: JSON-LD must not describe the error page as content');
assert(notFound.includes('Страница не найдена'), '404.html: Russian message missing');
assert(notFound.includes('Page not found'), '404.html: English message missing');
assert(notFound.includes('data-not-found-locale="ru"'), '404.html: Russian locale state missing');
assert(notFound.includes('data-not-found-locale="en" hidden'), '404.html: English enhanced state must be initially hidden');
assert(notFound.includes('<noscript>'), '404.html: no-JavaScript fallback missing');
assert(notFound.includes('href="/ru/"'), '404.html: Russian home link missing');
assert(notFound.includes('href="/en/"'), '404.html: English home link missing');
for (const lang of languages) {
  for (const route of ['about', 'research', 'publications', 'contact']) {
    assert(notFound.includes(`href="/${lang}/${route}/"`), `404.html: ${lang} ${route} link missing`);
  }
}
assert(notFound.includes(`<script src="${notFoundScriptPath}" defer></script>`), '404.html: local language script missing');
const notFoundScriptSources = [...notFound.matchAll(/<script\b[^>]*\ssrc="([^"]+)"[^>]*>/g)].map((match) => match[1]);
assert(notFoundScriptSources.includes(notFoundScriptPath), '404.html: local language script source missing');
assert(notFoundScriptSources.every((source) => source.startsWith('/')), '404.html: external script found');
assert(!/<meta\s+http-equiv="refresh"/i.test(notFound), '404.html: meta refresh must not be used');
assert(!/(?:mailto:|tel:|\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b)/i.test(notFound), '404.html: contact details must not be exposed');
assert(!/(?:\/ru|\/en)\/(?:blog|uses|now)\//.test(notFound), '404.html: out-of-scope secondary link found');
assert(notFoundScript.includes('window.location.pathname'), '404 script: pathname language detection missing');
assert(notFoundScript.includes('document.documentElement.lang = language'), '404 script: document language update missing');
assert(notFoundScript.includes('element.hidden = element.dataset.notFoundLocale !== language'), '404 script: inactive locale hiding missing');
assert(notFoundScript.includes('document.title ='), '404 script: localized document title update missing');
assert(!/(?:location\.assign|location\.replace|location\.href\s*=|window\.location\s*=)/.test(notFoundScript), '404 script: automatic redirect found');

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
assert(headers.includes("script-src 'self' 'wasm-unsafe-eval'"), 'CSP Pagefind WebAssembly permission missing');
assert(!/(?:^|\s)'unsafe-eval'(?=\s|;|$)/m.test(headers), 'CSP must not allow ordinary unsafe-eval');
assert(headers.includes("form-action 'self' https://formspree.io"), 'CSP Formspree form-action permission missing');
assert(headers.includes("connect-src 'self' https://formspree.io"), 'CSP Formspree connect-src permission missing');

const pagefindEntry = JSON.parse(await readFile(new URL('dist/pagefind/pagefind-entry.json', root), 'utf8'));
assert(pagefindEntry.version === '1.5.2', 'Pagefind version is not pinned to 1.5.2');
assert(pagefindEntry.languages?.ru?.page_count === 16, 'Pagefind Russian index count is incorrect');
assert(pagefindEntry.languages?.en?.page_count === 16, 'Pagefind English index count is incorrect');
await readFile(new URL('dist/pagefind/pagefind.js', root), 'utf8');
await readFile(new URL('dist/pagefind/wasm.ru.pagefind', root));
await readFile(new URL('dist/pagefind/wasm.en.pagefind', root));
assert(searchScript.includes("import('/pagefind/pagefind.js')"), 'Pagefind assets must remain self-hosted');
assert(!/import\(['"]https?:\/\//i.test(searchScript), 'external Pagefind script origin found');

const pagefindCspAdr = await readFile(new URL('docs/adr/pagefind-csp.md', root), 'utf8');
assert(pagefindCspAdr.includes("'wasm-unsafe-eval'"), 'Pagefind CSP ADR must document the WebAssembly permission');
assert(pagefindCspAdr.includes("ordinary `'unsafe-eval'"), 'Pagefind CSP ADR must reject ordinary unsafe-eval');

const wranglerConfig = await readFile(new URL('wrangler.jsonc', root), 'utf8');
assert(wranglerConfig.includes('"directory": "./dist"'), 'Wrangler static assets directory is incorrect');
assert(wranglerConfig.includes('"not_found_handling": "404-page"'), 'Wrangler custom 404 handling is missing');

const sitemapIndex = await readFile(new URL('dist/sitemap-index.xml', root), 'utf8');
assert(sitemapIndex.includes(`<loc>${domain}/sitemap-0.xml</loc>`), 'sitemap index does not reference the generated sitemap');

const sitemap = await readFile(new URL('dist/sitemap-0.xml', root), 'utf8');
assert(!sitemap.includes('/404'), '404 page must not appear in sitemap');
assert(!sitemap.includes('/projects/'), 'removed Projects route remains in sitemap');
assert(!sitemap.includes('/now/'), 'removed Now route remains in sitemap');
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

for (const lang of languages) {
  for (const route of ['projects', 'now']) {
    let generated = true;
    try {
      await readFile(new URL(`dist/${lang}/${route}/index.html`, root), 'utf8');
    } catch (error) {
      if (error?.code === 'ENOENT') generated = false;
      else throw error;
    }
    assert(!generated, `${lang}/${route}/: removed route still generates public HTML`);
  }
}

const confidentialPublicPatterns = [
  new RegExp(['controlled', 'marketplace'].join('\\s+'), 'i'),
  new RegExp(['AI', 'enabled', 'home', 'veterinary', 'care'].join('[-\\s]+'), 'i'),
  new RegExp(['vet', 'uzi', '47'].join('[\\s_-]*'), 'i'),
  new RegExp(['move', 'trus'].join(''), 'i'),
  /(?:launched|live|operational)\s+(?:veterinary\s+)?(?:platform|marketplace)/i,
  /(?:запущен(?:а|о)?|действующ(?:ая|ее|ий))\s+(?:ветеринарн\w*\s+)?(?:платформ\w*|маркетплейс\w*)/i,
];
for (const file of (await sourceFiles(new URL('dist/', root))).filter((entry) => entry.endsWith('.html'))) {
  const html = await readFile(file, 'utf8');
  const relativePath = path.relative(fileURLToPath(new URL('dist/', root)), file);
  assert(confidentialPublicPatterns.every((pattern) => !pattern.test(html)), `${relativePath}: confidential public claim found`);
  assert(!html.includes('data-faq-id="project-status"'), `${relativePath}: removed FAQ project-status question found`);
  assert(!/(?:href|action)="\/(?:ru|en)\/(?:projects|now)\//.test(html), `${relativePath}: internal link to a removed route found`);
  assert(!/(?:Newsletter|Subscribe|Подписаться на обновления)/i.test(html), `${relativePath}: unimplemented newsletter CTA found`);
  assert(!/(?:Online Consultation|Онлайн-консультац(?:ия|ии|ию|ией))/i.test(html), `${relativePath}: unimplemented Online Consultation CTA found`);
  assert(!/(?:specialist\s+in\s+ultrasound|ultrasound physician|sonographer|radiologist|специалист(?:ом)?\s+УЗИ|врач(?:ом)?\s+УЗИ|кандидат(?:ом)?\s+наук|\bPhD\b|\bprofessor\b|\bпрофессор\b)/i.test(html), `${relativePath}: prohibited public positioning found`);
  const scriptSources = [...html.matchAll(/<script\b[^>]*\ssrc="([^"]+)"[^>]*>/g)].map((match) => match[1]);
  assert(scriptSources.every((source) => source.startsWith('/')), `${relativePath}: external script origin found`);
  const stylesheetSources = [...html.matchAll(/<link\b[^>]*\brel="stylesheet"[^>]*\bhref="([^"]+)"[^>]*>/g)].map((match) => match[1]);
  assert(stylesheetSources.every((source) => source.startsWith('/')), `${relativePath}: external stylesheet or font origin found`);
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
  console.log(`Verified ${languages.length * (routes.length + publicationSlugs.length)} localized pages, bilingual 404, redirects, metadata, JSON-LD, sitemap, robots, links, filters, and source content.`);
}

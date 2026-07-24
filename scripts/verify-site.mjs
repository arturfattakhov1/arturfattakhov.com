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

function frontmatterKeys(source, path) {
  const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)?.[1];
  assert(frontmatter, `${path}: YAML frontmatter is missing or malformed`);
  return [...frontmatter.matchAll(/^([A-Za-z][A-Za-z0-9]*):/gm)].map((match) => match[1]);
}

function exactKeys(value, expected, label) {
  assert(value && typeof value === 'object' && !Array.isArray(value), `${label}: expected an object`);
  const keys = Object.keys(value);
  assert(
    JSON.stringify(keys.toSorted()) === JSON.stringify(expected.toSorted()),
    `${label}: keys do not match the CMS schema: ${keys.join(', ')}`,
  );
}

function assertNoDuplicateJsonKeys(source, path) {
  let cursor = 0;
  const whitespace = () => {
    while (/\s/.test(source[cursor] ?? '')) cursor += 1;
  };
  const parseString = () => {
    const start = cursor;
    assert(source[cursor] === '"', `${path}: invalid JSON string at ${cursor}`);
    cursor += 1;
    while (cursor < source.length) {
      if (source[cursor] === '\\') {
        cursor += 2;
      } else if (source[cursor] === '"') {
        cursor += 1;
        return JSON.parse(source.slice(start, cursor));
      } else {
        cursor += 1;
      }
    }
    throw new Error(`${path}: unterminated JSON string`);
  };
  const parseValue = () => {
    whitespace();
    if (source[cursor] === '{') {
      cursor += 1;
      whitespace();
      const keys = new Set();
      if (source[cursor] === '}') {
        cursor += 1;
        return;
      }
      while (cursor < source.length) {
        whitespace();
        const key = parseString();
        assert(!keys.has(key), `${path}: duplicate JSON key "${key}"`);
        keys.add(key);
        whitespace();
        assert(source[cursor] === ':', `${path}: expected ":" after "${key}"`);
        cursor += 1;
        parseValue();
        whitespace();
        if (source[cursor] === '}') {
          cursor += 1;
          return;
        }
        assert(source[cursor] === ',', `${path}: expected "," in object`);
        cursor += 1;
      }
    } else if (source[cursor] === '[') {
      cursor += 1;
      whitespace();
      if (source[cursor] === ']') {
        cursor += 1;
        return;
      }
      while (cursor < source.length) {
        parseValue();
        whitespace();
        if (source[cursor] === ']') {
          cursor += 1;
          return;
        }
        assert(source[cursor] === ',', `${path}: expected "," in array`);
        cursor += 1;
      }
    } else if (source[cursor] === '"') {
      parseString();
    } else {
      const token = source.slice(cursor).match(/^(?:true|false|null|-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?)/)?.[0];
      assert(token, `${path}: invalid JSON value at ${cursor}`);
      cursor += token.length;
    }
  };
  parseValue();
  whitespace();
  assert(cursor === source.length, `${path}: unexpected JSON content at ${cursor}`);
}

function readJson(path) {
  const source = read(path);
  assertNoDuplicateJsonKeys(source, path);
  return JSON.parse(source);
}

function cmsContentBlock(config, name) {
  const marker = `  - name: ${name}\n`;
  const start = config.indexOf(marker);
  assert(start !== -1, `CMS content schema is missing: ${name}`);
  const next = config.indexOf('\n  - name: ', start + marker.length);
  return config.slice(start, next === -1 ? undefined : next);
}

function cmsFieldDescriptors(block) {
  const lines = block.split('\n');
  const descriptors = [];
  const stack = [];
  for (let index = 0; index < lines.length; index += 1) {
    const match = lines[index].match(/^(\s*)- name: ([A-Za-z][A-Za-z0-9]*)$/);
    if (!match) continue;
    const indent = match[1].length;
    if (indent < 6) continue;
    let hasType = false;
    for (let lookahead = index + 1; lookahead < lines.length; lookahead += 1) {
      const nextIndent = lines[lookahead].match(/^(\s*)/)?.[1].length ?? 0;
      if (lines[lookahead].trim() && nextIndent <= indent) break;
      if (lines[lookahead].startsWith(`${' '.repeat(indent + 2)}type:`)) {
        hasType = true;
        break;
      }
    }
    if (!hasType) continue;
    while (stack.length && stack.at(-1).indent >= indent) stack.pop();
    const parent = stack.at(-1);
    const path = parent ? `${parent.path}.${match[2]}` : match[2];
    const descriptor = { name: match[2], path, indent, index, hidden: false, readonly: false, ownBlock: '', subtreeBlock: '' };
    descriptors.push(descriptor);
    stack.push(descriptor);
  }
  for (let index = 0; index < descriptors.length; index += 1) {
    const current = descriptors[index];
    const nextIndex = descriptors[index + 1]?.index ?? lines.length;
    const ownBlock = lines.slice(current.index, nextIndex).join('\n');
    const nextSibling = descriptors.slice(index + 1).find((candidate) => candidate.indent <= current.indent);
    current.ownBlock = ownBlock;
    current.subtreeBlock = lines.slice(current.index, nextSibling?.index ?? lines.length).join('\n');
    current.hidden = new RegExp(`^${' '.repeat(current.indent + 2)}hidden: true$`, 'm').test(ownBlock);
    current.readonly = new RegExp(`^${' '.repeat(current.indent + 2)}readonly: true$`, 'm').test(ownBlock);
  }
  return descriptors;
}

function assertCmsFieldPaths(block, expected, label) {
  const descriptors = cmsFieldDescriptors(block);
  const paths = descriptors.map((field) => field.path);
  assert(paths.length === new Set(paths).size, `${label}: duplicate CMS field path`);
  assert(
    JSON.stringify(paths.toSorted()) === JSON.stringify(expected.toSorted()),
    `${label}: CMS field paths do not match the data contract: ${paths.join(', ')}`,
  );
  return descriptors;
}

function editableLeafPaths(descriptors) {
  return descriptors
    .filter((field) => !descriptors.some((candidate) => candidate.path.startsWith(`${field.path}.`)))
    .filter((field) => {
      const ancestors = descriptors.filter((candidate) => field.path === candidate.path || field.path.startsWith(`${candidate.path}.`));
      return !ancestors.some((candidate) => candidate.hidden || candidate.readonly);
    })
    .map((field) => field.path);
}

function assertEditablePaths(descriptors, expected, label) {
  const editable = editableLeafPaths(descriptors);
  assert(
    JSON.stringify(editable.toSorted()) === JSON.stringify(expected.toSorted()),
    `${label}: editable CMS paths changed: ${editable.join(', ')}`,
  );
}

assert(existsSync(dist), 'dist is missing; run npm run build first');

const cmsConfig = read('.pages.yml');
const cmsPaths = [...cmsConfig.matchAll(/^\s+path:\s+([^\n]+)$/gm)].map((match) => match[1].trim());
const expectedCmsPaths = [
  'src/content/knowledge',
  'src/data/cms/home-help.json',
  'src/data/cms/media.json',
  'src/data/cms/profiles.json',
  'src/data/cms/home-materials.json',
];
assert(
  JSON.stringify(cmsPaths) === JSON.stringify(expectedCmsPaths),
  `CMS editable paths changed: ${cmsPaths.join(', ')}`,
);
assert(/^settings:\n\s+hide: true\n\s+content:\n\s+merge: true/m.test(cmsConfig), 'CMS must hide settings and preserve unmanaged content keys');
assert(!/^media:/m.test(cmsConfig) && !/^actions:/m.test(cmsConfig), 'CMS media and action surfaces must remain disabled');
assert(!/(?:format|type):\s+(?:code|raw)\b/.test(cmsConfig), 'CMS must not expose a raw or code editor');
assert(count(cmsConfig, /^\s+rename: false$/gm) === expectedCmsPaths.length, 'CMS rename must be disabled for every editable surface');
assert(count(cmsConfig, /^\s+delete: false$/gm) === expectedCmsPaths.length, 'CMS delete must be disabled for every editable surface');
assert(cmsConfig.includes('media: false'), 'Knowledge rich-text media uploads must remain disabled');
const cmsContentNames = [...cmsConfig.matchAll(/^  - name: ([A-Za-z][A-Za-z0-9-]*)$/gm)].map((match) => match[1]);
assert(
  JSON.stringify(cmsContentNames) === JSON.stringify(['knowledge', 'homepage-help', 'media-records', 'profiles', 'homepage-materials']),
  `CMS content surfaces changed: ${cmsContentNames.join(', ')}`,
);
for (const path of cmsPaths) {
  assert(!/(?:components|pages|routes|legal|consultation|forms?|formspree|headers|redirects|workflows?|cloudflare|package\.json|deployment)/i.test(path), `CMS protected path exposed: ${path}`);
}

const cmsKnowledgeBlock = cmsContentBlock(cmsConfig, 'knowledge');
const expectedKnowledgeFrontmatterFields = [
  'routeSlug', 'lang', 'translationKey', 'title', 'excerpt', 'category', 'date',
  'seoTitle', 'metaDescription', 'status', 'featured', 'relatedMedia', 'relatedVideo', 'relatedPodcast',
];
const expectedKnowledgeCmsPaths = [
  ...expectedKnowledgeFrontmatterFields,
  'relatedMedia.title', 'relatedMedia.url',
  'relatedVideo.title', 'relatedVideo.url',
  'relatedPodcast.title', 'relatedPodcast.url',
  'body',
];
const knowledgeDescriptors = assertCmsFieldPaths(cmsKnowledgeBlock, expectedKnowledgeCmsPaths, 'Knowledge');
assertEditablePaths(knowledgeDescriptors, [
  'routeSlug', 'lang', 'translationKey', 'title', 'excerpt', 'category', 'date',
  'seoTitle', 'metaDescription', 'status', 'body',
], 'Knowledge');
for (const field of ['featured', 'relatedMedia', 'relatedVideo', 'relatedPodcast']) {
  const descriptor = knowledgeDescriptors.find((candidate) => candidate.path === field);
  assert(descriptor?.hidden && descriptor.ownBlock.includes('label: false'), `CMS technical field must remain hidden: ${field}`);
}
for (const field of ['relatedMedia', 'relatedVideo', 'relatedPodcast']) {
  const fieldBlock = knowledgeDescriptors.find((candidate) => candidate.path === field)?.ownBlock ?? '';
  assert(fieldBlock.includes('type: object'), `CMS related field must remain structured: ${field}`);
  assert(fieldBlock.includes('default: []') && fieldBlock.includes('list: true'), `CMS related field must preserve an array: ${field}`);
}

const knowledgeSources = walk(join(root, 'src/content/knowledge')).filter((path) => path.endsWith('.md'));
const knowledgeRecords = [];
const knowledgeTranslations = new Map();
for (const path of knowledgeSources) {
  const relativePath = relative(root, path);
  const source = readFileSync(path, 'utf8');
  const keys = frontmatterKeys(source, relativePath);
  assert(keys.length === new Set(keys).size, `${relativePath}: duplicate frontmatter key`);
  assert(
    JSON.stringify(keys.toSorted()) === JSON.stringify(expectedKnowledgeFrontmatterFields.toSorted()),
    `${relativePath}: frontmatter keys do not match the CMS schema: ${keys.join(', ')}`,
  );
  for (const field of ['relatedMedia', 'relatedVideo', 'relatedPodcast']) {
    const inlineArray = source.match(new RegExp(`^${field}:\\s*(\\[[^\\n]*\\])$`, 'm'))?.[1];
    assert(inlineArray === '[]', `${relativePath}: ${field} must remain a structured array`);
  }
  const translationKey = source.match(/^translationKey:\s*([^\n]+)$/m)?.[1].trim();
  const lang = source.match(/^lang:\s*(ru|en)$/m)?.[1];
  const routeSlug = source.match(/^routeSlug:\s*([^\n]+)$/m)?.[1].trim();
  const status = source.match(/^status:\s*(draft|published)$/m)?.[1];
  assert(translationKey && lang && routeSlug && status, `${relativePath}: translation metadata is invalid`);
  const record = { translationKey, lang, routeSlug, status, relativePath };
  knowledgeRecords.push(record);
  const pair = knowledgeTranslations.get(translationKey) ?? [];
  pair.push(record);
  knowledgeTranslations.set(translationKey, pair);
}
for (const [translationKey, pair] of knowledgeTranslations) {
  assert(pair.length === 2 && new Set(pair.map((entry) => entry.lang)).size === 2, `${translationKey}: Knowledge RU/EN pair is incomplete`);
  assert(new Set(pair.map((entry) => entry.status)).size === 1, `${translationKey}: Knowledge RU/EN publication status differs`);
}
const publishedKnowledgeRecords = knowledgeRecords.filter((record) => record.status === 'published');
const draftKnowledgeRecords = knowledgeRecords.filter((record) => record.status === 'draft');

const cmsHomeHelpBlock = cmsContentBlock(cmsConfig, 'homepage-help');
const expectedHomeHelpPaths = languages.flatMap((lang) => [
  lang, `${lang}.title`, `${lang}.introduction`, `${lang}.items`,
  `${lang}.items.title`, `${lang}.items.description`, `${lang}.practiceCta`, `${lang}.contactCta`,
]);
const homeHelpDescriptors = assertCmsFieldPaths(cmsHomeHelpBlock, expectedHomeHelpPaths, 'Homepage help');
assertEditablePaths(homeHelpDescriptors, expectedHomeHelpPaths.filter((path) => !languages.includes(path) && !path.endsWith('.items')), 'Homepage help');
const cmsHomeHelp = readJson('src/data/cms/home-help.json');
exactKeys(cmsHomeHelp, languages, 'CMS homepage help');
for (const lang of languages) {
  const section = cmsHomeHelp[lang];
  exactKeys(section, ['title', 'introduction', 'items', 'practiceCta', 'contactCta'], `${lang}: CMS homepage help`);
  assert(typeof section?.title === 'string' && section.title.length >= 5, `${lang}: CMS homepage section title is invalid`);
  assert(typeof section?.introduction === 'string' && section.introduction.length >= 20, `${lang}: CMS homepage section introduction is invalid`);
  assert(Array.isArray(section?.items) && section.items.length === 3, `${lang}: CMS homepage section must contain exactly three service summaries`);
  for (const [index, item] of section.items.entries()) {
    exactKeys(item, ['title', 'description'], `${lang}: CMS service summary ${index + 1}`);
    assert(typeof item.title === 'string' && item.title.length >= 3, `${lang}: CMS service title is invalid`);
    assert(typeof item.description === 'string' && item.description.length >= 20, `${lang}: CMS service description is invalid`);
  }
  assert(typeof section.practiceCta === 'string' && typeof section.contactCta === 'string', `${lang}: CMS homepage link labels are invalid`);
}

const cmsMediaBlock = cmsContentBlock(cmsConfig, 'media-records');
const expectedMediaPaths = [
  'records', 'records.id', 'records.type', 'records.status', 'records.order',
  'records.title', 'records.title.ru', 'records.title.en',
  'records.summary', 'records.summary.ru', 'records.summary.en',
  'records.role', 'records.role.ru', 'records.role.en',
  'records.externalLinks', 'records.externalLinks.source',
  'records.externalLinks.source.ru', 'records.externalLinks.source.en', 'records.externalLinks.url',
];
const mediaDescriptors = assertCmsFieldPaths(cmsMediaBlock, expectedMediaPaths, 'Media');
assertEditablePaths(mediaDescriptors, [
  'records.type', 'records.status', 'records.order',
  'records.title.ru', 'records.title.en', 'records.summary.ru', 'records.summary.en',
  'records.externalLinks.source.ru', 'records.externalLinks.source.en', 'records.externalLinks.url',
], 'Media');
const mediaIdDescriptor = mediaDescriptors.find((field) => field.path === 'records.id');
assert(mediaIdDescriptor?.hidden && mediaIdDescriptor.ownBlock.includes('label: false'), 'Media technical id must remain hidden');
const mediaRoleDescriptor = mediaDescriptors.find((field) => field.path === 'records.role');
assert(mediaRoleDescriptor?.hidden && mediaRoleDescriptor.ownBlock.includes('label: false'), 'Media existing role field must remain hidden');
const allowedMediaTypes = ['interview', 'project', 'video', 'article', 'podcast'];
const configuredMediaTypes = [...(mediaDescriptors.find((field) => field.path === 'records.type')?.subtreeBlock ?? '').matchAll(/^\s+- name: (interview|project|video|article|podcast)$/gm)].map((match) => match[1]);
assert(JSON.stringify(configuredMediaTypes) === JSON.stringify(allowedMediaTypes), 'CMS Media type values changed');
const cmsMedia = readJson('src/data/cms/media.json');
exactKeys(cmsMedia, ['records'], 'CMS Media');
assert(Array.isArray(cmsMedia.records) && cmsMedia.records.length > 0, 'CMS Media records are missing');
const mediaIds = new Set();
const mediaOrders = new Set();
for (const [index, record] of cmsMedia.records.entries()) {
  const label = `CMS Media record ${index + 1}`;
  const recordKeys = ['id', 'type', 'status', 'order', 'title', 'summary', 'externalLinks'];
  exactKeys(record, Object.hasOwn(record, 'role') ? [...recordKeys, 'role'] : recordKeys, label);
  assert(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(record.id), `${label}: invalid UUID`);
  assert(!mediaIds.has(record.id), `${label}: duplicate id`);
  mediaIds.add(record.id);
  assert(allowedMediaTypes.includes(record.type), `${label}: unsupported type ${record.type}`);
  assert(['draft', 'published'].includes(record.status), `${label}: unsupported status ${record.status}`);
  assert(Number.isInteger(record.order) && record.order > 0 && !mediaOrders.has(record.order), `${label}: display order must be a unique positive integer`);
  mediaOrders.add(record.order);
  exactKeys(record.title, languages, `${label} title`);
  exactKeys(record.summary, languages, `${label} summary`);
  if (record.role !== undefined) exactKeys(record.role, languages, `${label} role`);
  for (const lang of languages) {
    assert(typeof record.title[lang] === 'string' && record.title[lang].length >= 3, `${label}: ${lang} title is invalid`);
    assert(typeof record.summary[lang] === 'string' && record.summary[lang].length >= 20, `${label}: ${lang} summary is invalid`);
    if (record.role !== undefined) assert(typeof record.role[lang] === 'string' && record.role[lang].length >= 20, `${label}: ${lang} role is invalid`);
  }
  assert(Array.isArray(record.externalLinks) && record.externalLinks.length > 0 && record.externalLinks.length <= 5, `${label}: external links are invalid`);
  for (const [linkIndex, link] of record.externalLinks.entries()) {
    exactKeys(link, ['source', 'url'], `${label} link ${linkIndex + 1}`);
    exactKeys(link.source, languages, `${label} link ${linkIndex + 1} source`);
    for (const lang of languages) assert(typeof link.source[lang] === 'string' && link.source[lang].length >= 2, `${label}: ${lang} source is invalid`);
    const url = new URL(link.url);
    assert(url.protocol === 'https:' && url.hostname, `${label}: external link must use HTTPS`);
  }
}

const cmsProfilesBlock = cmsContentBlock(cmsConfig, 'profiles');
const expectedProfilePaths = ['profiles', 'profiles.key', 'profiles.name', 'profiles.url', 'profiles.order', 'profiles.active'];
const profileDescriptors = assertCmsFieldPaths(cmsProfilesBlock, expectedProfilePaths, 'Profiles');
assertEditablePaths(profileDescriptors, ['profiles.url', 'profiles.order', 'profiles.active'], 'Profiles');
for (const path of ['profiles.key', 'profiles.name']) {
  assert(profileDescriptors.find((field) => field.path === path)?.readonly, `CMS Profile technical field must remain readonly: ${path}`);
}
const allowedProfileHosts = {
  orcid: 'orcid.org',
  googleScholar: 'scholar.google.com',
  researchGate: 'www.researchgate.net',
  webOfScience: 'www.webofscience.com',
  github: 'github.com',
  instagram: 'www.instagram.com',
  threads: 'www.threads.com',
  youtube: 'www.youtube.com',
  dzen: 'dzen.ru',
  spotify: 'open.spotify.com',
  facebook: 'www.facebook.com',
};
const profileKeys = Object.keys(allowedProfileHosts);
const configuredProfileKeys = [...(profileDescriptors.find((field) => field.path === 'profiles.key')?.subtreeBlock ?? '').matchAll(/^\s+- (orcid|googleScholar|researchGate|webOfScience|github|instagram|threads|youtube|dzen|spotify|facebook)$/gm)].map((match) => match[1]);
assert(JSON.stringify(configuredProfileKeys) === JSON.stringify(profileKeys), 'CMS Profile platform values changed');
const expectedProfileNames = {
  orcid: 'ORCID', googleScholar: 'Google Scholar', researchGate: 'ResearchGate', webOfScience: 'Web of Science',
  github: 'GitHub', instagram: 'Instagram', threads: 'Threads', youtube: 'YouTube', dzen: 'Yandex Zen',
  spotify: 'Spotify', facebook: 'Facebook',
};
const cmsProfiles = readJson('src/data/cms/profiles.json');
exactKeys(cmsProfiles, ['profiles'], 'CMS Profiles');
assert(Array.isArray(cmsProfiles.profiles) && cmsProfiles.profiles.length === profileKeys.length, 'CMS Profiles must contain exactly the supported platforms');
const seenProfileKeys = new Set();
const profileOrders = new Set();
for (const profile of cmsProfiles.profiles) {
  exactKeys(profile, ['key', 'name', 'url', 'order', 'active'], `CMS Profile ${profile.key ?? 'unknown'}`);
  assert(profileKeys.includes(profile.key) && !seenProfileKeys.has(profile.key), `CMS Profile platform is missing, unsupported, or duplicated: ${profile.key}`);
  seenProfileKeys.add(profile.key);
  assert(profile.name === expectedProfileNames[profile.key], `CMS Profile name changed for ${profile.key}`);
  const url = new URL(profile.url);
  assert(url.protocol === 'https:' && url.hostname === allowedProfileHosts[profile.key], `CMS Profile URL is not allowed for ${profile.key}`);
  assert(Number.isInteger(profile.order) && profile.order > 0 && !profileOrders.has(profile.order), `CMS Profile display order must be unique: ${profile.key}`);
  profileOrders.add(profile.order);
  assert(typeof profile.active === 'boolean', `CMS Profile active flag is invalid: ${profile.key}`);
}
assert(seenProfileKeys.size === profileKeys.length, 'CMS Profile platform set is incomplete');

const cmsHomepageMaterialsBlock = cmsContentBlock(cmsConfig, 'homepage-materials');
const homeMaterialsDescriptors = assertCmsFieldPaths(cmsHomepageMaterialsBlock, ['featuredPublicationSlugs'], 'Homepage materials');
assertEditablePaths(homeMaterialsDescriptors, ['featuredPublicationSlugs'], 'Homepage materials');
const configuredPublicationSlugs = [...(homeMaterialsDescriptors[0]?.subtreeBlock ?? '').matchAll(/^\s+- name: ([a-z0-9]+(?:-[a-z0-9]+)*)$/gm)].map((match) => match[1]);
assert(JSON.stringify(configuredPublicationSlugs) === JSON.stringify(publicationSlugs), 'CMS Homepage publication options do not match the catalogue');
const cmsHomepageMaterials = readJson('src/data/cms/home-materials.json');
exactKeys(cmsHomepageMaterials, ['featuredPublicationSlugs'], 'CMS Homepage materials');
assert(
  Array.isArray(cmsHomepageMaterials.featuredPublicationSlugs)
    && cmsHomepageMaterials.featuredPublicationSlugs.length >= 1
    && cmsHomepageMaterials.featuredPublicationSlugs.length <= 3,
  'CMS Homepage must select one to three publications',
);
assert(
  cmsHomepageMaterials.featuredPublicationSlugs.length === new Set(cmsHomepageMaterials.featuredPublicationSlugs).size
    && cmsHomepageMaterials.featuredPublicationSlugs.every((slug) => publicationSlugs.includes(slug)),
  'CMS Homepage selection contains a duplicate or unknown publication',
);

const expectedPages = [];
for (const lang of languages) {
  for (const route of standardRoutes) expectedPages.push({ lang, route, path: htmlPath(lang, route) });
  for (const slug of publicationSlugs) expectedPages.push({ lang, route: `publications/${slug}`, path: htmlPath(lang, `publications/${slug}`) });
}
for (const record of publishedKnowledgeRecords) {
  const route = `knowledge/${record.routeSlug}`;
  expectedPages.push({ lang: record.lang, route, path: htmlPath(record.lang, route), knowledgeArticle: true });
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
  if (page.knowledgeArticle) assert(html.includes('"@type":"Article"'), `${routePath}: Article structured data is missing`);
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
  const publishedForLang = publishedKnowledgeRecords.filter((record) => record.lang === lang);
  const draftForLang = draftKnowledgeRecords.filter((record) => record.lang === lang);
  assert(knowledge.includes(`data-published-count="${publishedForLang.length}"`), `${lang}: published Knowledge count is incorrect`);
  if (publishedForLang.length === 0) {
    assert(knowledge.includes('data-knowledge-empty'), `${lang}: empty Knowledge state is missing`);
  } else {
    assert(!knowledge.includes('data-knowledge-empty'), `${lang}: empty Knowledge state is visible with published articles`);
  }
  for (const record of publishedForLang) {
    assert(knowledge.includes(`/${lang}/knowledge/${record.routeSlug}/`), `${lang}: published Knowledge article is missing ${record.routeSlug}`);
  }
  for (const record of draftForLang) {
    assert(!knowledge.includes(`/${lang}/knowledge/${record.routeSlug}/`), `${lang}: draft Knowledge article leaked ${record.routeSlug}`);
  }

  const media = readFileSync(htmlPath(lang, 'media'), 'utf8');
  for (const record of cmsMedia.records) {
    for (const link of record.externalLinks) {
      if (record.status === 'published') {
        assert(
          media.includes(link.url)
            && media.includes(record.title[lang])
            && media.includes(record.summary[lang])
            && (!record.role || media.includes(record.role[lang])),
          `${lang}: published Media content is incomplete ${record.id}`,
        );
      } else {
        assert(!media.includes(link.url) && !media.includes(record.title[lang]), `${lang}: draft Media record leaked ${record.id}`);
      }
    }
  }
  assert(count(media, /https:\/\/iz\.ru\/182(?:3909|4936)/g) === 2 && media.includes('https://naked-science.ru/'), `${lang}: grouped interdisciplinary coverage is incomplete`);

  const profiles = readFileSync(htmlPath(lang, 'profiles'), 'utf8');
  const activeProfiles = cmsProfiles.profiles.filter((profile) => profile.active);
  assert(count(profiles, /src="\/icons\/profiles\/[^"]+\.svg"/g) === activeProfiles.length, `${lang}: local profile icon count must match active profiles`);
  for (const profile of cmsProfiles.profiles) {
    if (profile.active) {
      assert(profiles.includes(profile.url), `${lang}: active Profile link is missing ${profile.key}`);
    } else {
      assert(!profiles.includes(profile.url), `${lang}: inactive Profile leaked ${profile.key}`);
    }
  }
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
  assert(count(home, /class="home-record-list__type"/g) === cmsHomepageMaterials.featuredPublicationSlugs.length, `${lang}: Homepage selected publication count is incorrect`);
  for (const slug of cmsHomepageMaterials.featuredPublicationSlugs) {
    assert(home.includes(`/${lang}/publications/${slug}/`), `${lang}: selected Homepage publication is missing ${slug}`);
  }

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

const sitemap = read('dist/sitemap-0.xml');
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const draftMediaMarkers = cmsMedia.records
  .filter((record) => record.status === 'draft')
  .flatMap((record) => [
    ...languages.flatMap((lang) => [record.title[lang], record.summary[lang], record.role?.[lang]].filter(Boolean)),
    ...record.externalLinks.map((link) => link.url),
  ]);
assert(
  sitemapUrls.length === expectedPages.length && new Set(sitemapUrls).size === expectedPages.length,
  `sitemap must contain ${expectedPages.length} unique public URLs, found ${sitemapUrls.length}`,
);
for (const lang of languages) assert(sitemap.includes(`${site}/${lang}/consultation/`), `${lang}: Consultation is missing from sitemap`);
for (const record of publishedKnowledgeRecords) {
  const url = `${site}/${record.lang}/knowledge/${record.routeSlug}/`;
  assert(sitemapUrls.includes(url), `published Knowledge route is missing from sitemap: ${url}`);
}
for (const record of draftKnowledgeRecords) {
  const url = `${site}/${record.lang}/knowledge/${record.routeSlug}/`;
  assert(!sitemapUrls.includes(url), `draft Knowledge route leaked into sitemap: ${url}`);
}
for (const marker of draftMediaMarkers) assert(!sitemap.includes(marker), `draft Media record leaked into sitemap: ${marker}`);
for (const route of legacyRoutes) assert(!sitemap.includes(`/${route}/`), `legacy route leaked into sitemap: ${route}`);

const pagefindEntry = JSON.parse(read('dist/pagefind/pagefind-entry.json'));
const baselinePagefindCount = 17;
const expectedPagefindCounts = Object.fromEntries(languages.map((lang) => [
  lang,
  baselinePagefindCount + publishedKnowledgeRecords.filter((record) => record.lang === lang).length,
]));
for (const lang of languages) {
  assert(
    pagefindEntry.languages?.[lang]?.page_count === expectedPagefindCounts[lang],
    `${lang}: expected ${expectedPagefindCounts[lang]} isolated Pagefind pages`,
  );
}
const pagefindFragments = walk(join(dist, 'pagefind/fragment')).filter((path) => path.endsWith('.pf_fragment'));
const expectedPagefindFragmentCount = Object.values(expectedPagefindCounts).reduce((sum, value) => sum + value, 0);
assert(
  pagefindFragments.length === expectedPagefindFragmentCount,
  `expected ${expectedPagefindFragmentCount} Pagefind fragments, found ${pagefindFragments.length}`,
);
const pagefindFragmentsByLanguage = Object.fromEntries(languages.map((lang) => [lang, []]));
for (const path of pagefindFragments) {
  const fragment = gunzipSync(readFileSync(path)).toString('utf8');
  const lang = relative(join(dist, 'pagefind/fragment'), path).split('_')[0];
  assert(languages.includes(lang), `Pagefind fragment has an unknown language: ${relative(root, path)}`);
  pagefindFragmentsByLanguage[lang].push(fragment);
  assert(fragment.includes(`/${lang}/`), `Pagefind fragment crossed language index: ${relative(root, path)}`);
  for (const record of draftKnowledgeRecords) {
    assert(!fragment.includes(record.routeSlug), `draft leaked into Pagefind: ${record.routeSlug}`);
  }
  for (const record of publishedKnowledgeRecords.filter((entry) => entry.lang !== lang)) {
    assert(!fragment.includes(`/${record.lang}/knowledge/${record.routeSlug}/`), `published Knowledge crossed Pagefind language index: ${record.routeSlug}`);
  }
  for (const marker of draftMediaMarkers) assert(!fragment.includes(marker), `draft Media record leaked into Pagefind: ${marker}`);
}
for (const record of publishedKnowledgeRecords) {
  const indexedContent = pagefindFragmentsByLanguage[record.lang].join('\n');
  assert(
    indexedContent.includes(`/${record.lang}/knowledge/${record.routeSlug}/`),
    `published Knowledge route is missing from Pagefind: ${record.routeSlug}`,
  );
}

const htmlOutput = expectedPages.map((page) => readFileSync(page.path, 'utf8')).join('\n');
for (const marker of draftMediaMarkers) assert(!htmlOutput.includes(marker), `draft Media record leaked into public HTML: ${marker}`);
for (const profile of cmsProfiles.profiles.filter((entry) => !entry.active)) {
  assert(!htmlOutput.includes(profile.url), `inactive Profile leaked into public HTML or JSON-LD: ${profile.key}`);
}
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
const expectedGeneratedHtmlCount = expectedPages.length + 3;
assert(
  generatedHtml.length === expectedGeneratedHtmlCount,
  `expected ${expectedGeneratedHtmlCount} HTML files including root redirect and 404, found ${generatedHtml.length}`,
);

console.log(`Verified ${sitemapUrls.length} localized public URLs, ${publicationSlugs.length} unique publication records, ${publishedKnowledgeRecords.length} published Knowledge records, ${draftKnowledgeRecords.length} draft Knowledge records, ${requiredRedirects.length} redirect rules, and ${generatedHtml.length} generated HTML files.`);
console.log(`Pagefind: ru=${pagefindEntry.languages.ru.page_count}, en=${pagefindEntry.languages.en.page_count}.`);

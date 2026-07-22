import type { Language } from '../i18n/config';

export const identity = {
  name: {
    en: 'Artur Fattakhov',
    ru: 'Артур Фаттахов',
  },
  givenName: 'Artur',
  familyName: 'Fattakhov',
  url: 'https://arturfattakhov.com',
  jobTitle: {
    ru: 'Ветеринарный врач',
    en: 'Veterinary Doctor',
  },
  description: {
    ru: 'Ветеринарный врач и специалист визуальной диагностики.',
    en: 'Veterinary Doctor and Diagnostic Imaging Specialist.',
  },
  knowsAbout: [
    'veterinary medicine',
    'small animal veterinary medicine',
    'veterinary ultrasonography',
    'diagnostic imaging',
    'radiographic anatomy',
    'morphometry',
    'clinical decision support',
    'artificial intelligence in veterinary medicine',
    'evidence-based veterinary medicine',
  ],
  occupation: {
    ru: 'Ветеринарный врач',
    en: 'Veterinary Doctor',
  },
  languages: {
    ru: { name: 'Russian', code: 'ru' },
    en: { name: 'English', code: 'en' },
  },
  locationContext: {
    city: 'Saint Petersburg',
    country: 'Russia',
  },
  profiles: [
    { key: 'orcid', name: 'ORCID', url: 'https://orcid.org/0000-0003-4142-0469' },
    { key: 'googleScholar', name: 'Google Scholar', url: 'https://scholar.google.com/citations?user=eAu1IAsAAAAJ&hl=ru' },
    { key: 'researchGate', name: 'ResearchGate', url: 'https://www.researchgate.net/profile/Artur-Fattakhov-2' },
    { key: 'webOfScience', name: 'Web of Science', url: 'https://www.webofscience.com/wos/author/record/QOA-6820-2026' },
    { key: 'github', name: 'GitHub', url: 'https://github.com/arturfattakhov1' },
    { key: 'instagram', name: 'Instagram', url: 'https://www.instagram.com/dr.arturfattakhov/' },
    { key: 'threads', name: 'Threads', url: 'https://www.threads.com/@dr.arturfattakhov' },
    { key: 'youtube', name: 'YouTube', url: 'https://www.youtube.com/@dr.arturfattakhov' },
    { key: 'dzen', name: 'Yandex Zen', url: 'https://dzen.ru/arturfattakhov' },
    { key: 'spotify', name: 'Spotify', url: 'https://open.spotify.com/show/033OTXXuHSVlHqyxOQTUdm' },
    { key: 'facebook', name: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61582287094595' },
  ],
} as const;

export const schemaIds = {
  person: `${identity.url}/#person`,
  website: `${identity.url}/#website`,
  profilePage: {
    ru: `${identity.url}/ru/about/#profile-page`,
    en: `${identity.url}/en/about/#profile-page`,
  },
} as const;

export function createPersonSchema() {
  const orcid = identity.profiles.find((profile) => profile.key === 'orcid');

  return {
    '@type': 'Person',
    '@id': schemaIds.person,
    name: identity.name.en,
    alternateName: identity.name.ru,
    givenName: identity.givenName,
    familyName: identity.familyName,
    url: identity.url,
    sameAs: identity.profiles.map((profile) => profile.url),
    jobTitle: [
      { '@value': identity.jobTitle.ru, '@language': 'ru' },
      { '@value': identity.jobTitle.en, '@language': 'en' },
    ],
    description: [
      { '@value': identity.description.ru, '@language': 'ru' },
      { '@value': identity.description.en, '@language': 'en' },
    ],
    knowsAbout: identity.knowsAbout,
    hasOccupation: [{
      '@type': 'Occupation',
      name: [
        { '@value': identity.occupation.ru, '@language': 'ru' },
        { '@value': identity.occupation.en, '@language': 'en' },
      ],
    }],
    knowsLanguage: [
      { '@type': 'Language', name: identity.languages.ru.name, alternateName: identity.languages.ru.code },
      { '@type': 'Language', name: identity.languages.en.name, alternateName: identity.languages.en.code },
    ],
    identifier: orcid ? [{
      '@type': 'PropertyValue',
      propertyID: 'ORCID',
      value: '0000-0003-4142-0469',
      url: orcid.url,
    }] : [],
    mainEntityOfPage: [
      { '@id': schemaIds.profilePage.ru },
      { '@id': schemaIds.profilePage.en },
    ],
  } as const;
}

export function createWebsiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': schemaIds.website,
    url: identity.url,
    name: identity.name.en,
    alternateName: identity.name.ru,
    inLanguage: [identity.languages.ru.code, identity.languages.en.code],
    about: { '@id': schemaIds.person },
    creator: { '@id': schemaIds.person },
    publisher: { '@id': schemaIds.person },
  } as const;
}

export function createProfilePageSchema(lang: Language) {
  return {
    '@type': 'ProfilePage',
    '@id': schemaIds.profilePage[lang],
    url: `${identity.url}/${lang}/about/`,
    name: lang === 'ru' ? `О ${identity.name.ru}` : `About ${identity.name.en}`,
    description: lang === 'ru'
      ? 'Официальная страница об Артуре Фаттахове.'
      : 'Official About page for Artur Fattakhov.',
    inLanguage: identity.languages[lang].code,
    isPartOf: { '@id': schemaIds.website },
    about: { '@id': schemaIds.person },
    mainEntity: { '@id': schemaIds.person },
    breadcrumb: { '@id': `${identity.url}/${lang}/about/#breadcrumb` },
  } as const;
}

export function createIdentityJsonLd(lang: Language, includeProfilePage = false) {
  const graph: Array<Record<string, unknown>> = [createPersonSchema(), createWebsiteSchema()];

  if (includeProfilePage) {
    graph.push(createProfilePageSchema(lang));
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  } as const;
}

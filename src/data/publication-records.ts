import type { Language } from '../i18n/config';
import { schemaIds } from './identity';
import { breadcrumbId, webpageId } from './structured-data';

export type PublicationType = 'journal' | 'conference' | 'patent';

type LocalizedText = Record<Language, string>;

export interface PublicationRecord {
  slug: string;
  type: PublicationType;
  title: LocalizedText;
  authors: string[];
  year: 2021 | 2024 | 2025;
  venue: string;
  volume?: string;
  issue?: string;
  pages?: string;
  doi?: string;
  edn?: string;
  orcid?: string;
  location?: LocalizedText;
  eventDate?: LocalizedText;
  publisher?: string;
  dates?: Array<{ label: LocalizedText; value: string }>;
  notes?: LocalizedText;
  patentNumber?: string;
  applicationNumber?: string;
  patentHolder?: string;
  priorityDate?: string;
  registrationDate?: string;
  expirationDate?: string;
  abstract: LocalizedText;
  keywords: Record<Language, string[]>;
  researchArea: LocalizedText;
  methods: LocalizedText;
  keyFindings: LocalizedText;
  practicalSignificance: LocalizedText;
  arturAuthorIndex: number;
}

const unavailable = {
  findings: {
    ru: 'Предоставленная верифицированная запись не содержит резюме ключевых результатов.',
    en: 'The supplied verified record does not include a summary of key findings.',
  },
  significance: {
    ru: 'Предоставленная верифицированная запись не содержит отдельного описания практической значимости.',
    en: 'The supplied verified record does not include a separate statement of practical significance.',
  },
} as const;

export const publicationRecords: PublicationRecord[] = [
  {
    slug: 'comparative-xray-morphometry-moose-cattle',
    type: 'journal',
    title: {
      ru: 'Сравнительная рентгеноморфометрия дистального отдела конечностей лося и крупного рогатого скота',
      en: 'Comparative X-ray Morphometry of the Distal Extremities of Moose and Cattle',
    },
    authors: ['А. К. Фаттахов', 'В. В. Белогуров', 'Е. Н. Борхунова', 'И. Г. Рязанов'],
    year: 2025,
    venue: 'Ветеринария, зоотехния и биотехнология',
    volume: '1',
    issue: '4',
    pages: '49–56',
    doi: '10.36871/vet.zoo.bio.202504106',
    edn: 'VSHVEO',
    notes: {
      ru: 'Артур Фаттахов — первый автор и автор для корреспонденции.',
      en: 'Artur Fattakhov is the first and corresponding author.',
    },
    abstract: {
      ru: 'Публикация посвящена сравнительной рентгеноморфометрии дистального отдела конечностей лося и крупного рогатого скота. Расширенная аннотация в предоставленной верифицированной записи отсутствует.',
      en: 'This publication concerns comparative X-ray morphometry of the distal extremities of moose and cattle. The supplied verified record does not include an extended abstract.',
    },
    keywords: {
      ru: ['рентгеноморфометрия', 'дистальный отдел конечностей', 'лось', 'крупный рогатый скот'],
      en: ['X-ray morphometry', 'distal extremities', 'moose', 'cattle'],
    },
    researchArea: {
      ru: 'Сравнительная анатомия, рентгенографическая диагностика и морфометрия.',
      en: 'Comparative anatomy, radiographic diagnostics, and morphometry.',
    },
    methods: {
      ru: 'Сравнительная рентгеноморфометрия дистального отдела конечностей лося и крупного рогатого скота. Дополнительные сведения о протоколе в записи не приведены.',
      en: 'Comparative X-ray morphometry of the distal extremities of moose and cattle. The record does not provide further protocol details.',
    },
    keyFindings: unavailable.findings,
    practicalSignificance: unavailable.significance,
    arturAuthorIndex: 0,
  },
  {
    slug: 'hoof-capsule-cattle-moose',
    type: 'journal',
    title: {
      ru: 'Микроморфологические характеристики копытец крупного рогатого скота и лося',
      en: 'Micromorphological Characteristics of the Hoof Capsule in Cattle and Moose',
    },
    authors: ['А. К. Фаттахов', 'В. В. Белогуров', 'Е. Н. Борхунова'],
    year: 2025,
    venue: 'Международный вестник ветеринарии',
    issue: '4',
    doi: '10.52419/issn2072-2419.2025.4.325',
    orcid: '0000-0003-4142-0469',
    dates: [
      { label: { ru: 'Получено', en: 'Received' }, value: '2025-06-23' },
      { label: { ru: 'Принято', en: 'Accepted' }, value: '2025-12-05' },
      { label: { ru: 'Опубликовано онлайн', en: 'Published online' }, value: '2025-12-26' },
    ],
    abstract: {
      ru: 'Публикация посвящена микроморфологическим характеристикам копытец крупного рогатого скота и лося. Расширенная аннотация в предоставленной верифицированной записи отсутствует.',
      en: 'This publication concerns micromorphological characteristics of the hoof capsule in cattle and moose. The supplied verified record does not include an extended abstract.',
    },
    keywords: {
      ru: ['микроморфология', 'копытце', 'крупный рогатый скот', 'лось'],
      en: ['micromorphology', 'hoof capsule', 'cattle', 'moose'],
    },
    researchArea: {
      ru: 'Сравнительная анатомия и микроморфология копытец.',
      en: 'Comparative anatomy and hoof-capsule micromorphology.',
    },
    methods: {
      ru: 'Микроморфологическая характеристика копытец крупного рогатого скота и лося. Подробный протокол в записи не приведён.',
      en: 'Micromorphological characterization of the hoof capsule in cattle and moose. The record does not provide a detailed protocol.',
    },
    keyFindings: unavailable.findings,
    practicalSignificance: unavailable.significance,
    arturAuthorIndex: 0,
  },
  {
    slug: 'diagnostic-imaging-distal-limb-cattle',
    type: 'conference',
    title: {
      ru: 'Лучевая диагностика патологий дистального отдела конечностей у крупного рогатого скота',
      en: 'Diagnostic Imaging of Distal Limb Disorders in Cattle',
    },
    authors: ['А. К. Фаттахов', 'В. В. Белогуров', 'Е. Н. Борхунова'],
    year: 2021,
    venue: 'Сборник научных трудов 11-й Международной межвузовской конференции по клинической ветеринарии в формате Purina Partners',
    location: { ru: 'Москва', en: 'Moscow' },
    eventDate: { ru: '8 декабря 2021 года', en: '8 December 2021' },
    publisher: 'ООО «АКАДЕМИЯ ПРИНТ»',
    pages: '451–454',
    edn: 'CYACWU',
    notes: { ru: 'Артур Фаттахов — первый автор.', en: 'Artur Fattakhov is the first author.' },
    abstract: {
      ru: 'Публикация посвящена лучевой диагностике патологий дистального отдела конечностей у крупного рогатого скота. Расширенная аннотация в предоставленной записи отсутствует.',
      en: 'This conference publication concerns diagnostic imaging of distal limb disorders in cattle. The supplied record does not include an extended abstract.',
    },
    keywords: {
      ru: ['лучевая диагностика', 'патологии конечностей', 'крупный рогатый скот'],
      en: ['diagnostic imaging', 'distal limb disorders', 'cattle'],
    },
    researchArea: { ru: 'Ветеринарная лучевая диагностика и заболевания конечностей.', en: 'Veterinary diagnostic imaging and limb disorders.' },
    methods: {
      ru: 'В названии указана лучевая диагностика; подробный дизайн исследования в записи не приведён.',
      en: 'The title identifies diagnostic imaging; the record does not provide the detailed study design.',
    },
    keyFindings: unavailable.findings,
    practicalSignificance: unavailable.significance,
    arturAuthorIndex: 0,
  },
  {
    slug: 'distal-limb-disorders-cattle',
    type: 'conference',
    title: {
      ru: 'Анализ структуры патологий дистального отдела конечностей у крупного рогатого скота',
      en: 'Analysis of the Structure of Distal Limb Disorders in Cattle',
    },
    authors: ['В. В. Белогуров', 'А. К. Фаттахов', 'М. Д. Качалин'],
    year: 2024,
    venue: 'Актуальные проблемы ветеринарной медицины, зоотехнии, биотехнологии и экспертизы сырья и продуктов животного происхождения: Сборник трудов 3-й Научно-практической конференции',
    location: { ru: 'Москва', en: 'Moscow' },
    eventDate: { ru: '28 июня 2024 года', en: '28 June 2024' },
    publisher: 'ООО «Издательство "Сельскохозяйственные Технологии"»',
    pages: '80',
    edn: 'UDLFVP',
    abstract: {
      ru: 'Публикация посвящена анализу структуры патологий дистального отдела конечностей у крупного рогатого скота. Расширенная аннотация в предоставленной записи отсутствует.',
      en: 'This conference publication concerns analysis of the structure of distal limb disorders in cattle. The supplied record does not include an extended abstract.',
    },
    keywords: { ru: ['патологии конечностей', 'анализ структуры', 'крупный рогатый скот'], en: ['limb disorders', 'structural analysis', 'cattle'] },
    researchArea: { ru: 'Ветеринарная диагностика и патологии конечностей крупного рогатого скота.', en: 'Veterinary diagnostics and limb disorders in cattle.' },
    methods: {
      ru: 'Анализ структуры патологий; подробные методы в предоставленной записи не указаны.',
      en: 'Analysis of the structure of disorders; detailed methods are not specified in the supplied record.',
    },
    keyFindings: unavailable.findings,
    practicalSignificance: unavailable.significance,
    arturAuthorIndex: 1,
  },
  {
    slug: 'digitalization-cattle-farming',
    type: 'conference',
    title: {
      ru: 'Цифровизация скотоводства: технологические решения для улучшения воспроизводства и здоровья крупного рогатого скота',
      en: 'Digitalization of Cattle Farming: Technological Solutions for Improving Reproduction and Health of Cattle',
    },
    authors: ['В. В. Белогуров', 'А. К. Фаттахов', 'М. Д. Качалин'],
    year: 2024,
    venue: 'Актуальные проблемы ветеринарной медицины, зоотехнии, биотехнологии и экспертизы сырья и продуктов животного происхождения: Сборник трудов 3-й Научно-практической конференции',
    location: { ru: 'Москва', en: 'Moscow' },
    eventDate: { ru: '28 июня 2024 года', en: '28 June 2024' },
    publisher: 'ООО «Издательство "Сельскохозяйственные Технологии"»',
    pages: '94–95',
    edn: 'BYAVOQ',
    abstract: {
      ru: 'Публикация посвящена цифровизации скотоводства и технологическим решениям для улучшения воспроизводства и здоровья крупного рогатого скота. Расширенная аннотация в предоставленной записи отсутствует.',
      en: 'This conference publication concerns digitalization of cattle farming and technological solutions for improving reproduction and cattle health. The supplied record does not include an extended abstract.',
    },
    keywords: { ru: ['цифровизация', 'скотоводство', 'воспроизводство', 'здоровье крупного рогатого скота'], en: ['digitalization', 'cattle farming', 'reproduction', 'cattle health'] },
    researchArea: { ru: 'Цифровые технологии в скотоводстве и ветеринарной медицине.', en: 'Digital technology in cattle farming and veterinary medicine.' },
    methods: { ru: 'Методы в предоставленной верифицированной записи не указаны.', en: 'Methods are not specified in the supplied verified record.' },
    keyFindings: unavailable.findings,
    practicalSignificance: unavailable.significance,
    arturAuthorIndex: 1,
  },
  {
    slug: 'ovariectomy-ovariohysterectomy-cats',
    type: 'conference',
    title: {
      ru: 'Влияние овариоэктомии и овариогистерэктомии на течение послеоперационного периода у кошек',
      en: 'Effects of Ovariectomy and Ovariohysterectomy on the Postoperative Period in Cats',
    },
    authors: ['Б. С. Семенов', 'А. К. Фаттахов', 'Т. Ш. Кузнецова', 'А. В. Назарова'],
    year: 2021,
    venue: 'Тенденции развития ветеринарной хирургии: материалы Международной научно-практической конференции, посвященной 95-летию кафедры общей, частной и оперативной хирургии УО ВГАВМ',
    location: { ru: 'Витебск', en: 'Vitebsk' },
    eventDate: { ru: '3–4 ноября 2021 года', en: '3–4 November 2021' },
    publisher: 'Учреждение образования "Витебская ордена "Знак Почета" государственная академия ветеринарной медицины"',
    pages: '120–122',
    edn: 'PDQQYC',
    abstract: {
      ru: 'Публикация посвящена влиянию овариоэктомии и овариогистерэктомии на течение послеоперационного периода у кошек. Расширенная аннотация в предоставленной записи отсутствует.',
      en: 'This conference publication concerns the effects of ovariectomy and ovariohysterectomy on the postoperative period in cats. The supplied record does not include an extended abstract.',
    },
    keywords: { ru: ['овариоэктомия', 'овариогистерэктомия', 'послеоперационный период', 'кошки'], en: ['ovariectomy', 'ovariohysterectomy', 'postoperative period', 'cats'] },
    researchArea: { ru: 'Ветеринарная хирургия и послеоперационный период у кошек.', en: 'Veterinary surgery and the postoperative period in cats.' },
    methods: {
      ru: 'Сопоставление послеоперационного периода после овариоэктомии и овариогистерэктомии; подробный дизайн в записи не указан.',
      en: 'Comparison of the postoperative period following ovariectomy and ovariohysterectomy; the detailed design is not specified in the record.',
    },
    keyFindings: unavailable.findings,
    practicalSignificance: unavailable.significance,
    arturAuthorIndex: 1,
  },
  {
    slug: 'feline-calicivirus-saint-petersburg',
    type: 'conference',
    title: {
      ru: 'Ретроспективный анализ распространённости FCV у кошек в Санкт-Петербурге',
      en: 'Retrospective Analysis of Feline Calicivirus Prevalence in Cats in Saint Petersburg',
    },
    authors: ['В. О. Виноходов', 'А. К. Фаттахов'],
    year: 2021,
    venue: 'Материалы Международной научно-практической конференции «Теория и практика ветеринарной фармации, экологии и токсикологии в АПК»',
    location: { ru: 'Санкт-Петербург', en: 'Saint Petersburg' },
    eventDate: { ru: '19–21 мая 2021 года', en: '19–21 May 2021' },
    notes: {
      ru: 'Артур Фаттахов указан как студент 5-го курса по специальности «Ветеринария».',
      en: 'Artur Fattakhov was listed as a fifth-year veterinary medicine student.',
    },
    abstract: {
      ru: 'Публикация посвящена ретроспективному анализу распространённости FCV у кошек в Санкт-Петербурге. Расширенная аннотация в предоставленной записи отсутствует.',
      en: 'This conference publication concerns a retrospective analysis of feline calicivirus prevalence in cats in Saint Petersburg. The supplied record does not include an extended abstract.',
    },
    keywords: { ru: ['FCV', 'калицивирус кошек', 'ретроспективный анализ', 'Санкт-Петербург'], en: ['FCV', 'feline calicivirus', 'retrospective analysis', 'Saint Petersburg'] },
    researchArea: { ru: 'Инфекционные болезни кошек и ветеринарная эпидемиология.', en: 'Feline infectious disease and veterinary epidemiology.' },
    methods: { ru: 'Ретроспективный анализ; дополнительные сведения о методах в записи не приведены.', en: 'Retrospective analysis; the record does not provide further methodological details.' },
    keyFindings: unavailable.findings,
    practicalSignificance: unavailable.significance,
    arturAuthorIndex: 1,
  },
  {
    slug: 'urethral-intussusception-cat',
    type: 'conference',
    title: {
      ru: 'Инвагинация уретры после травматической катетеризации у кота',
      en: 'Urethral Intussusception Following Traumatic Urethral Catheterization in a Cat',
    },
    authors: ['А. К. Фаттахов'],
    year: 2021,
    venue: 'Студенты — науке и практике АПК: материалы 106-й Международной научно-практической конференции студентов и магистрантов',
    location: { ru: 'Витебск', en: 'Vitebsk' },
    eventDate: { ru: '20–21 мая 2021 года', en: '20–21 May 2021' },
    publisher: 'Учреждение образования "Витебская ордена "Знак Почета" государственная академия ветеринарной медицины"',
    pages: '98–99',
    edn: 'QXPJAW',
    notes: { ru: 'Клинический случай с одним автором.', en: 'A single-author clinical case.' },
    abstract: {
      ru: 'Публикация представляет клинический случай инвагинации уретры после травматической катетеризации у кота. Расширенная аннотация в предоставленной записи отсутствует.',
      en: 'This conference publication presents a clinical case of urethral intussusception following traumatic urethral catheterization in a cat. The supplied record does not include an extended abstract.',
    },
    keywords: { ru: ['инвагинация уретры', 'катетеризация', 'клинический случай', 'кот'], en: ['urethral intussusception', 'catheterization', 'clinical case', 'cat'] },
    researchArea: { ru: 'Клиническая ветеринарная медицина и урология кошек.', en: 'Clinical veterinary medicine and feline urology.' },
    methods: { ru: 'Описание клинического случая с одним автором; дополнительные сведения о методах в записи не приведены.', en: 'A single-author clinical case report; the record does not provide further methodological details.' },
    keyFindings: unavailable.findings,
    practicalSignificance: unavailable.significance,
    arturAuthorIndex: 0,
  },
  {
    slug: 'xray-morphometric-laminitis-cattle-patent',
    type: 'patent',
    title: {
      ru: 'Способ рентгеноморфометрической диагностики ламинита у крупного рогатого скота',
      en: 'Method for X-ray Morphometric Diagnosis of Laminitis in Cattle',
    },
    authors: ['В. В. Белогуров', 'С. В. Позябин', 'М. Д. Качалин', 'А. К. Фаттахов'],
    year: 2025,
    venue: 'RU 2851956',
    patentNumber: 'RU 2851956',
    applicationNumber: '2024137638',
    patentHolder: 'ФГБОУ ВО МГАВМиБ — МВА имени К. И. Скрябина',
    priorityDate: '2024-12-13',
    registrationDate: '2025-12-01',
    expirationDate: '2044-12-13',
    abstract: {
      ru: 'Патент относится к способу рентгеноморфометрической диагностики ламинита у крупного рогатого скота. Дополнительное описание формулы и результатов в предоставленной записи отсутствует.',
      en: 'The patent concerns a method for X-ray morphometric diagnosis of laminitis in cattle. The supplied record does not include further claims or results.',
    },
    keywords: { ru: ['патент', 'рентгеноморфометрия', 'ламинит', 'крупный рогатый скот'], en: ['patent', 'X-ray morphometry', 'laminitis', 'cattle'] },
    researchArea: { ru: 'Рентгенографическая диагностика и заболевания копытец крупного рогатого скота.', en: 'Radiographic diagnostics and hoof disease in cattle.' },
    methods: { ru: 'Способ рентгеноморфометрической диагностики ламинита у крупного рогатого скота.', en: 'A method for X-ray morphometric diagnosis of laminitis in cattle.' },
    keyFindings: { ru: 'Зарегистрирован патент RU 2851956. Дополнительное резюме результатов в записи не приведено.', en: 'Patent RU 2851956 is registered. The record does not provide a further findings summary.' },
    practicalSignificance: unavailable.significance,
    arturAuthorIndex: 3,
  },
];

export function getPublicationRecord(slug: string): PublicationRecord | undefined {
  return publicationRecords.find((record) => record.slug === slug);
}

export function publicationPath(lang: Language, slug: string): string {
  return `/${lang}/publications/${slug}/`;
}

function identifierValues(record: PublicationRecord) {
  return [
    record.doi && { '@type': 'PropertyValue', propertyID: 'DOI', value: record.doi },
    record.edn && { '@type': 'PropertyValue', propertyID: 'EDN', value: record.edn },
    record.patentNumber && { '@type': 'PropertyValue', propertyID: 'Patent number', value: record.patentNumber },
    record.applicationNumber && { '@type': 'PropertyValue', propertyID: 'Application number', value: record.applicationNumber },
  ].filter((identifier) => identifier !== undefined);
}

function authorValues(record: PublicationRecord) {
  return record.authors.map((name, index) => index === record.arturAuthorIndex
    ? { '@id': schemaIds.person }
    : { '@type': 'Person', name });
}

export function createPublicationJsonLd(record: PublicationRecord, lang: Language, siteUrl: string) {
  const url = `${siteUrl}${publicationPath(lang, record.slug)}`;
  const pageId = webpageId(publicationPath(lang, record.slug));
  const publicationId = `${url}#publication`;
  const common = {
    '@id': publicationId,
    name: record.title[lang],
    description: record.abstract[lang],
    abstract: record.abstract[lang],
    url,
    inLanguage: lang,
    author: authorValues(record),
    identifier: identifierValues(record),
    datePublished: record.type === 'patent' ? record.registrationDate : String(record.year),
    about: record.researchArea[lang],
    keywords: record.keywords[lang],
    mainEntityOfPage: { '@id': pageId },
  };

  const publication = record.type === 'patent'
    ? {
      ...common,
      '@type': 'Patent',
    }
    : {
      ...common,
      '@type': 'ScholarlyArticle',
      headline: record.title[lang],
      pagination: record.pages,
      volumeNumber: record.volume,
      issueNumber: record.issue,
      isPartOf: {
        '@type': 'CreativeWork',
        name: record.venue,
      },
      sameAs: record.doi ? `https://doi.org/${record.doi}` : undefined,
    };

  return {
    '@context': 'https://schema.org',
    '@graph': [
      publication,
      {
        '@type': 'WebPage',
        '@id': pageId,
        url,
        name: record.title[lang],
        description: record.abstract[lang],
        inLanguage: lang,
        isPartOf: { '@id': schemaIds.website },
        about: { '@id': publicationId },
        mainEntity: { '@id': publicationId },
        breadcrumb: { '@id': breadcrumbId(publicationPath(lang, record.slug)) },
      },
    ],
  };
}

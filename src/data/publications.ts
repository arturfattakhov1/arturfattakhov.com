import type { Language } from '../i18n/config';
import type { PublicationType } from './publication-records';

interface PublicationsPageCopy {
  hero: string;
  opening: {
    title: string;
    lead: string;
    context: string;
    researchLink: string;
  };
  featured: {
    title: string;
    intro: string;
    records: Record<string, string>;
  };
  archive: {
    title: string;
    intro: string;
    filtersTitle: string;
  };
  filtersTitle: string;
  filterLabel: string;
  filters: Record<'all' | PublicationType | '2021' | '2024' | '2025', string>;
  groups: Record<PublicationType, string>;
  typeLabels: Record<PublicationType, string>;
  readRecord: string;
  viewRecord: string;
  showingAll: string;
  showingFiltered: string;
  identifiersTitle: string;
  identifiersIntro: string;
  profileLinkLabel: string;
  externalLinkLabel: string;
  relatedLinks: { research: string; profiles: string; about: string };
}

interface PublicationDetailCopy {
  backToPublications: string;
  recordOpening: string;
  subjectAndRelevance: string;
  formalRecord: string;
  verification: string;
  relatedContext: string;
  bibliographicRecord: string;
  abstract: string;
  keywords: string;
  researchArea: string;
  methods: string;
  keyFindings: string;
  practicalSignificance: string;
  authors: string;
  type: string;
  venue: string;
  year: string;
  volume: string;
  issue: string;
  pages: string;
  location: string;
  eventDate: string;
  publisher: string;
  notes: string;
  patentNumber: string;
  applicationNumber: string;
  patentHolder: string;
  priorityDate: string;
  registrationDate: string;
  expirationDate: string;
  relatedPages: string;
  researchLink: string;
  publicationsLink: string;
  knowledgeLink: string;
  externalDoi: string;
  externalOrcid: string;
  noExternalIdentifier: string;
}

export const publicationsPageCopy: Record<Language, PublicationsPageCopy> = {
  ru: {
    hero: 'Портфолио содержит девять проверенных записей: две журнальные статьи, шесть публикаций в материалах конференций и один патент. Библиографические сведения воспроизведены без добавления неподтверждённых идентификаторов, цитирований или результатов.',
    opening: {
      title: 'Публикации и патент',
      lead: 'Этот раздел собирает проверенные научные и патентные записи, связанные с исследовательской работой Артура Фаттахова.',
      context: 'Материалы связаны с ветеринарной диагностикой, визуальными методами исследования, сравнительной анатомией и рентгеноморфометрическим подходом. Полные библиографические сведения хранятся в отдельных карточках записей.',
      researchLink: 'Связать с исследовательским направлением',
    },
    featured: {
      title: 'Избранные научные записи',
      intro: 'В начале раздела выделены журнальные статьи и патентная запись, которые наиболее прямо отражают исследовательскую линию по диагностике и морфометрии.',
      records: {
        'comparative-xray-morphometry-moose-cattle': 'Сравнительная рентгеноморфометрия дистального отдела конечностей у лося и крупного рогатого скота.',
        'hoof-capsule-cattle-moose': 'Микроморфологическое описание копытец крупного рогатого скота и лося.',
        'xray-morphometric-laminitis-cattle-patent': 'Патентная запись по рентгеноморфометрической диагностике ламинита у крупного рогатого скота.',
      },
    },
    archive: {
      title: 'Полный проверенный список',
      intro: 'Ниже приведены все девять записей. Фильтры помогают просмотреть список по типу записи или году, но не меняют состав проверенного архива.',
      filtersTitle: 'Фильтр архива',
    },
    filtersTitle: 'Фильтры публикаций',
    filterLabel: 'Фильтровать публикации',
    filters: {
      all: 'Все',
      journal: 'Журнальные статьи',
      conference: 'Материалы конференций',
      patent: 'Патент',
      '2021': '2021',
      '2024': '2024',
      '2025': '2025',
    },
    groups: {
      journal: 'Журнальные статьи',
      conference: 'Материалы конференций',
      patent: 'Патент',
    },
    typeLabels: {
      journal: 'Журнальная статья',
      conference: 'Публикация конференции',
      patent: 'Патент',
    },
    readRecord: 'Открыть запись',
    viewRecord: 'Смотреть запись',
    showingAll: 'Показаны все публикации.',
    showingFiltered: 'Применён фильтр',
    identifiersTitle: 'Академические профили и идентификаторы',
    identifiersIntro: 'Внешние профили помогают сверить авторскую идентичность и связать записи с проверенными научными идентификаторами.',
    profileLinkLabel: 'Открыть профиль',
    externalLinkLabel: 'откроется в новой вкладке',
    relatedLinks: { research: 'Исследовательские направления', profiles: 'Все официальные профили', about: 'Об авторе' },
  },
  en: {
    hero: 'The portfolio contains nine verified records: two journal articles, six conference publications, and one patent. Bibliographic details are presented without adding unverified identifiers, citations, or findings.',
    opening: {
      title: 'Publications and patent',
      lead: 'This section collects verified scholarly and patent records connected with the research work of Artur Fattakhov.',
      context: 'The records relate to veterinary diagnostics, diagnostic imaging, comparative anatomy and radiographic morphometry. Full bibliographic information is kept on the individual record pages.',
      researchLink: 'Connect with the research direction',
    },
    featured: {
      title: 'Selected scholarly records',
      intro: 'The opening selection highlights journal articles and the patent record that most directly represent the diagnostic and morphometric research line.',
      records: {
        'comparative-xray-morphometry-moose-cattle': 'Comparative radiographic morphometry of distal limb structures in moose and cattle.',
        'hoof-capsule-cattle-moose': 'Micromorphological description of hoof capsules in cattle and moose.',
        'xray-morphometric-laminitis-cattle-patent': 'Patent record for radiographic morphometric diagnosis of laminitis in cattle.',
      },
    },
    archive: {
      title: 'Complete verified record',
      intro: 'All nine verified records are listed below. Filters help review the archive by record type or year without changing the verified record set.',
      filtersTitle: 'Archive filter',
    },
    filtersTitle: 'Publication filters',
    filterLabel: 'Filter publications',
    filters: {
      all: 'All',
      journal: 'Journal Articles',
      conference: 'Conference Papers',
      patent: 'Patent',
      '2021': '2021',
      '2024': '2024',
      '2025': '2025',
    },
    groups: {
      journal: 'Journal Articles',
      conference: 'Conference Papers',
      patent: 'Patent',
    },
    typeLabels: {
      journal: 'Journal article',
      conference: 'Conference paper',
      patent: 'Patent',
    },
    readRecord: 'Open record',
    viewRecord: 'View record',
    showingAll: 'Showing all publications.',
    showingFiltered: 'Filter applied',
    identifiersTitle: 'Academic profiles and identifiers',
    identifiersIntro: 'External profiles help verify author identity and connect the records with established research identifiers.',
    profileLinkLabel: 'Open profile',
    externalLinkLabel: 'opens in a new tab',
    relatedLinks: { research: 'Research directions', profiles: 'All official profiles', about: 'About the author' },
  },
};

export const publicationDetailCopy: Record<Language, PublicationDetailCopy> = {
  ru: {
    backToPublications: 'Все публикации',
    recordOpening: 'Проверенная запись',
    subjectAndRelevance: 'Предмет и контекст',
    formalRecord: 'Формальная библиографическая запись',
    verification: 'Проверка и внешние идентификаторы',
    relatedContext: 'Связанный контекст',
    bibliographicRecord: 'Библиографическая запись',
    abstract: 'Аннотация',
    keywords: 'Ключевые слова',
    researchArea: 'Область исследования',
    methods: 'Методы',
    keyFindings: 'Ключевые результаты',
    practicalSignificance: 'Практическая значимость',
    authors: 'Авторы',
    type: 'Тип публикации',
    venue: 'Источник',
    year: 'Год',
    volume: 'Том',
    issue: 'Выпуск',
    pages: 'Страницы',
    location: 'Место проведения',
    eventDate: 'Дата конференции',
    publisher: 'Издатель',
    notes: 'Примечание',
    patentNumber: 'Номер патента',
    applicationNumber: 'Номер заявки',
    patentHolder: 'Патентообладатель',
    priorityDate: 'Дата приоритета',
    registrationDate: 'Дата регистрации',
    expirationDate: 'Дата окончания действия',
    relatedPages: 'Связанные разделы',
    researchLink: 'Перейти к исследованиям',
    publicationsLink: 'Вернуться к списку публикаций',
    knowledgeLink: 'База знаний',
    externalDoi: 'Открыть DOI',
    externalOrcid: 'Открыть ORCID',
    noExternalIdentifier: 'Для этой записи внешний DOI или постоянная ссылка в данных сайта не указаны.',
  },
  en: {
    backToPublications: 'All publications',
    recordOpening: 'Verified record',
    subjectAndRelevance: 'Subject and context',
    formalRecord: 'Formal bibliographic record',
    verification: 'Verification and external identifiers',
    relatedContext: 'Related context',
    bibliographicRecord: 'Bibliographic record',
    abstract: 'Abstract',
    keywords: 'Keywords',
    researchArea: 'Research area',
    methods: 'Methods',
    keyFindings: 'Key findings',
    practicalSignificance: 'Practical significance',
    authors: 'Authors',
    type: 'Publication type',
    venue: 'Venue',
    year: 'Year',
    volume: 'Volume',
    issue: 'Issue',
    pages: 'Pages',
    location: 'Location',
    eventDate: 'Conference date',
    publisher: 'Publisher',
    notes: 'Note',
    patentNumber: 'Patent number',
    applicationNumber: 'Application number',
    patentHolder: 'Patent holder',
    priorityDate: 'Priority date',
    registrationDate: 'Registration date',
    expirationDate: 'Expiration date',
    relatedPages: 'Related sections',
    researchLink: 'Go to Research',
    publicationsLink: 'Back to Publications',
    knowledgeLink: 'Knowledge Hub',
    externalDoi: 'Open DOI',
    externalOrcid: 'Open ORCID',
    noExternalIdentifier: 'No external DOI or persistent source link is listed for this record in the site data.',
  },
};

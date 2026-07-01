import type { Language } from '../i18n/config';
import type { PublicationType } from './publication-records';

interface PublicationsPageCopy {
  hero: string;
  filtersTitle: string;
  filterLabel: string;
  filters: Record<'all' | PublicationType | '2021' | '2024' | '2025', string>;
  groups: Record<PublicationType, string>;
  typeLabels: Record<PublicationType, string>;
  readRecord: string;
  showingAll: string;
  showingFiltered: string;
  identifiersTitle: string;
  profileLinkLabel: string;
  externalLinkLabel: string;
  relatedLinks: { research: string; profiles: string };
}

interface PublicationDetailCopy {
  backToPublications: string;
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
}

export const publicationsPageCopy: Record<Language, PublicationsPageCopy> = {
  ru: {
    hero: 'Портфолио содержит девять проверенных записей: две журнальные статьи, шесть публикаций в материалах конференций и один патент. Библиографические сведения воспроизведены без добавления неподтверждённых идентификаторов, цитирований или результатов.',
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
    showingAll: 'Показаны все публикации.',
    showingFiltered: 'Применён фильтр',
    identifiersTitle: 'Академические профили и идентификаторы',
    profileLinkLabel: 'Открыть профиль',
    externalLinkLabel: 'откроется в новой вкладке',
    relatedLinks: { research: 'Исследовательские направления', profiles: 'Все официальные профили' },
  },
  en: {
    hero: 'The portfolio contains nine verified records: two journal articles, six conference publications, and one patent. Bibliographic details are presented without adding unverified identifiers, citations, or findings.',
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
    showingAll: 'Showing all publications.',
    showingFiltered: 'Filter applied',
    identifiersTitle: 'Academic profiles and identifiers',
    profileLinkLabel: 'Open profile',
    externalLinkLabel: 'opens in a new tab',
    relatedLinks: { research: 'Research directions', profiles: 'All official profiles' },
  },
};

export const publicationDetailCopy: Record<Language, PublicationDetailCopy> = {
  ru: {
    backToPublications: 'Все публикации',
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
  },
  en: {
    backToPublications: 'All publications',
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
  },
};

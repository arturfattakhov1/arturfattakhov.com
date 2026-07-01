import type { Language } from '../i18n/config';

interface PublicationsPageCopy {
  hero: string;
  scientificPublications: {
    title: string;
    description: string;
  };
  professionalArticles: {
    title: string;
    description: string;
  };
  futureStructure: Array<{ title: string; description: string }>;
  profileLinkLabel: string;
  externalLinkLabel: string;
  relatedLinks: { research: string; profiles: string };
  statusLabels: Record<'published' | 'working-paper' | 'in-preparation', string>;
}

export const publicationsPageCopy: Record<Language, PublicationsPageCopy> = {
  ru: {
    hero: 'Раздел предназначен для проверенных научных публикаций и профессиональных статей Артура Фаттахова. Каждая запись будет добавляться только после сверки авторства, названия, даты, источника и постоянных идентификаторов.',
    scientificPublications: {
      title: 'Научные публикации проходят библиографическую проверку',
      description: 'Будущие записи будут содержать полное название, список авторов, год, источник, DOI или другую постоянную ссылку, а также краткое описание темы. Непроверенные записи и показатели цитирования не публикуются.',
    },
    professionalArticles: {
      title: 'Профессиональные и обзорные материалы',
      description: 'Здесь будут размещаться авторские материалы о ветеринарной медицине, диагностике, исследованиях и технологиях. Для каждой статьи будут указаны дата, язык, статус обновления и использованные источники.',
    },
    futureStructure: [
      { title: 'Отдельная страница', description: 'Каждая проверенная публикация получит собственный постоянный адрес и полную библиографическую запись.' },
      { title: 'Проверяемые идентификаторы', description: 'DOI, URL первоисточника и авторские идентификаторы будут указываться только при наличии.' },
      { title: 'Связь с авторским профилем', description: 'Записи будут сопоставляться с ORCID и академическими профилями без переноса непроверенных метрик.' },
      { title: 'Машиночитаемое описание', description: 'Структурированные данные будут добавляться на уровне публикации после заполнения обязательных проверенных полей.' },
    ],
    profileLinkLabel: 'Открыть профиль',
    externalLinkLabel: 'откроется в новой вкладке',
    relatedLinks: { research: 'Исследовательские направления', profiles: 'Все официальные профили' },
    statusLabels: {
      published: 'Опубликовано',
      'working-paper': 'Рабочий материал',
      'in-preparation': 'Готовится',
    },
  },
  en: {
    hero: 'This section is intended for verified scientific publications and professional articles by Artur Fattakhov. Each record will be added only after authorship, title, date, source, and persistent identifiers have been checked.',
    scientificPublications: {
      title: 'Scientific publications are undergoing bibliographic review',
      description: 'Future records will include the full title, author list, year, source, DOI or another persistent link, and a concise description of the subject. Unverified records and citation metrics will not be published.',
    },
    professionalArticles: {
      title: 'Professional and review material',
      description: 'This area will contain original material on veterinary medicine, diagnostics, research, and technology. Each article will state its date, language, update status, and supporting sources.',
    },
    futureStructure: [
      { title: 'Dedicated page', description: 'Each verified publication will have a permanent URL and a complete bibliographic record.' },
      { title: 'Verifiable identifiers', description: 'DOIs, original source URLs, and author identifiers will be included only when available.' },
      { title: 'Author-profile connection', description: 'Records will be reconciled with ORCID and academic profiles without importing unverified metrics.' },
      { title: 'Machine-readable description', description: 'Publication-level structured data will be added after all required verified fields are available.' },
    ],
    profileLinkLabel: 'Open profile',
    externalLinkLabel: 'opens in a new tab',
    relatedLinks: { research: 'Research directions', profiles: 'All official profiles' },
    statusLabels: {
      published: 'Published',
      'working-paper': 'Working paper',
      'in-preparation': 'In preparation',
    },
  },
};

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
  futureStructure: string[];
  profileLinkLabel: string;
  externalLinkLabel: string;
  statusLabels: Record<'published' | 'working-paper' | 'in-preparation', string>;
}

export const publicationsPageCopy: Record<Language, PublicationsPageCopy> = {
  ru: {
    hero: 'Научные и профессиональные публикации будут добавляться после проверки библиографических данных.',
    scientificPublications: {
      title: 'Научные публикации пока не добавлены',
      description: 'Научные публикации будут добавляться с указанием названия, авторов, года, журнала, DOI или ссылки на источник при наличии.',
    },
    professionalArticles: {
      title: 'Профессиональные статьи пока не добавлены',
      description: 'Раздел подготовлен для будущих профессиональных статей.',
    },
    futureStructure: [
      'Отдельная страница для каждой публикации',
      'Библиографические метатеги для Google Scholar',
      'Schema.org ScholarlyArticle',
      'Связь с ORCID и авторским профилем',
    ],
    profileLinkLabel: 'Открыть профиль',
    externalLinkLabel: 'откроется в новой вкладке',
    statusLabels: {
      published: 'Опубликовано',
      'working-paper': 'Рабочий материал',
      'in-preparation': 'Готовится',
    },
  },
  en: {
    hero: 'Scientific and professional publications will be added after bibliographic data verification.',
    scientificPublications: {
      title: 'No scientific publications added yet',
      description: 'Scientific publications will be added with title, authors, year, journal, DOI or source link when available.',
    },
    professionalArticles: {
      title: 'No professional articles added yet',
      description: 'This section is prepared for future professional articles.',
    },
    futureStructure: [
      'Dedicated page for each publication',
      'Bibliographic meta tags for Google Scholar',
      'Schema.org ScholarlyArticle',
      'ORCID and author profile connection',
    ],
    profileLinkLabel: 'Open profile',
    externalLinkLabel: 'opens in a new tab',
    statusLabels: {
      published: 'Published',
      'working-paper': 'Working paper',
      'in-preparation': 'In preparation',
    },
  },
};

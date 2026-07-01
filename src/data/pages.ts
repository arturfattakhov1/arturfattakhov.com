import type { Language } from '../i18n/config';
import { identity } from './identity';

export type StandardPageSlug =
  | 'about'
  | 'research'
  | 'media'
  | 'contact'
  | 'cv'
  | 'profiles'
  | 'uses'
  | 'now';

export interface PageContent {
  title: string;
  description: string;
}

export const homeContent: Record<Language, PageContent> = {
  ru: { title: identity.name.ru, description: 'Официальный сайт Артура Фаттахова — ветеринарного врача, исследователя и предпринимателя.' },
  en: { title: identity.name.en, description: 'Official website of Artur Fattakhov, veterinarian, researcher, and entrepreneur.' },
};

export const pageContent: Record<Language, Record<StandardPageSlug, PageContent>> = {
  ru: {
    about: { title: 'Обо мне', description: 'Профессиональный профиль Артура Фаттахова: ветеринарная медицина, исследования и предпринимательство.' },
    research: { title: 'Исследования', description: 'Исследовательские направления Артура Фаттахова в ветеринарной медицине, клинической диагностике и применении искусственного интеллекта.' },
    media: { title: 'Медиа', description: 'Раздел для проверенных интервью, статей, видео и подкастов с участием Артура Фаттахова.' },
    contact: { title: 'Контакты', description: 'Официальные способы связи с Артуром Фаттаховым для профессиональных, исследовательских и медиа-запросов.' },
    cv: { title: 'CV', description: 'Профессиональное резюме Артура Фаттахова с проверенными сведениями и научными идентификаторами.' },
    profiles: { title: 'Профили', description: 'Официальные научные, профессиональные и публичные профили Артура Фаттахова.' },
    uses: { title: 'Инструменты', description: 'Раздел для проверенного списка рабочих инструментов, программного обеспечения и клинических процессов.' },
    now: { title: 'Сейчас', description: 'Текущие направления работы и профессионального внимания Артура Фаттахова.' },
  },
  en: {
    about: { title: 'About', description: 'Professional profile of Artur Fattakhov across veterinary medicine, research, and entrepreneurship.' },
    research: { title: 'Research', description: 'Research directions of Artur Fattakhov in veterinary medicine, clinical diagnostics, and artificial intelligence.' },
    media: { title: 'Media', description: 'A section for verified interviews, articles, videos, and podcasts featuring Artur Fattakhov.' },
    contact: { title: 'Contact', description: 'Official ways to contact Artur Fattakhov for professional, research, and media inquiries.' },
    cv: { title: 'CV', description: 'Professional CV of Artur Fattakhov with verified information and research identifiers.' },
    profiles: { title: 'Profiles', description: 'Official research, professional, and public profiles of Artur Fattakhov.' },
    uses: { title: 'Uses', description: 'A section for a verified list of working tools, software, and clinical workflows.' },
    now: { title: 'Now', description: 'Current areas of work and professional focus for Artur Fattakhov.' },
  },
};

export const collectionPageContent = {
  blog: {
    ru: { title: 'Блог', description: 'Профессиональные материалы Артура Фаттахова о ветеринарной медицине, исследованиях и технологиях.' },
    en: { title: 'Blog', description: 'Professional material by Artur Fattakhov on veterinary medicine, research, and technology.' },
  },
  publications: {
    ru: { title: 'Публикации', description: 'Научные и профессиональные публикации Артура Фаттахова с проверенными библиографическими данными.' },
    en: { title: 'Publications', description: 'Scientific and professional publications by Artur Fattakhov with verified bibliographic data.' },
  },
  projects: {
    ru: { title: 'Проекты', description: 'Проверенные проекты и профессиональные направления Артура Фаттахова.' },
    en: { title: 'Projects', description: 'Verified projects and professional directions of Artur Fattakhov.' },
  },
} as const;

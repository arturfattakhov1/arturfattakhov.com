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

const descriptions: Record<Language, string> = {
  ru: `Официальный сайт: ${identity.name.ru}.`,
  en: `Official website of ${identity.name.en}.`,
};

export const homeContent: Record<Language, PageContent> = {
  ru: { title: identity.name.ru, description: descriptions.ru },
  en: { title: identity.name.en, description: descriptions.en },
};

export const pageContent: Record<Language, Record<StandardPageSlug, PageContent>> = {
  ru: {
    about: { title: 'Обо мне', description: descriptions.ru },
    research: { title: 'Исследования', description: descriptions.ru },
    media: { title: 'Медиа', description: descriptions.ru },
    contact: { title: 'Контакты', description: descriptions.ru },
    cv: { title: 'CV', description: descriptions.ru },
    profiles: { title: 'Профили', description: descriptions.ru },
    uses: { title: 'Инструменты', description: descriptions.ru },
    now: { title: 'Сейчас', description: descriptions.ru },
  },
  en: {
    about: { title: 'About', description: descriptions.en },
    research: { title: 'Research', description: descriptions.en },
    media: { title: 'Media', description: descriptions.en },
    contact: { title: 'Contact', description: descriptions.en },
    cv: { title: 'CV', description: descriptions.en },
    profiles: { title: 'Profiles', description: descriptions.en },
    uses: { title: 'Uses', description: descriptions.en },
    now: { title: 'Now', description: descriptions.en },
  },
};

export const collectionPageContent = {
  blog: {
    ru: { title: 'Блог', description: descriptions.ru },
    en: { title: 'Blog', description: descriptions.en },
  },
  publications: {
    ru: { title: 'Публикации', description: descriptions.ru },
    en: { title: 'Publications', description: descriptions.en },
  },
  projects: {
    ru: { title: 'Проекты', description: descriptions.ru },
    en: { title: 'Projects', description: descriptions.en },
  },
} as const;

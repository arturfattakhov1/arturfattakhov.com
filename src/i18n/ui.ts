import type { Language } from './config';
import { identity } from '../data/identity';

export const ui = {
  ru: {
    siteName: identity.name.ru,
    home: 'Главная',
    skipToContent: 'Перейти к содержанию',
    languageLabel: 'Выбор языка',
    primaryNavigation: 'Основная навигация',
    footerNavigation: 'Дополнительная навигация',
    readMore: 'Читать далее',
    published: 'Опубликовано',
    updated: 'Обновлено',
    allPosts: 'Все материалы',
  },
  en: {
    siteName: identity.name.en,
    home: 'Home',
    skipToContent: 'Skip to content',
    languageLabel: 'Language selection',
    primaryNavigation: 'Primary navigation',
    footerNavigation: 'Secondary navigation',
    readMore: 'Read more',
    published: 'Published',
    updated: 'Updated',
    allPosts: 'All posts',
  },
} as const satisfies Record<Language, Record<string, string>>;

export const primaryNavigation = [
  { slug: 'about', label: { ru: 'Обо мне', en: 'About' } },
  { slug: 'research', label: { ru: 'Исследования', en: 'Research' } },
  { slug: 'publications', label: { ru: 'Публикации', en: 'Publications' } },
  { slug: 'projects', label: { ru: 'Проекты', en: 'Projects' } },
  { slug: 'media', label: { ru: 'Медиа', en: 'Media' } },
  { slug: 'blog', label: { ru: 'Блог', en: 'Blog' } },
] as const;

export const secondaryNavigation = [
  { slug: 'contact', label: { ru: 'Контакты', en: 'Contact' } },
  { slug: 'cv', label: { ru: 'CV', en: 'CV' } },
  { slug: 'profiles', label: { ru: 'Профили', en: 'Profiles' } },
  { slug: 'uses', label: { ru: 'Инструменты', en: 'Uses' } },
  { slug: 'now', label: { ru: 'Сейчас', en: 'Now' } },
] as const;

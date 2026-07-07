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
    footerRole: 'Ветеринарный врач, исследователь и предприниматель.',
    footerCore: 'Основные разделы',
    footerVerification: 'Подтверждённые профили',
    footerReference: 'Справочная информация',
    footerLanguage: 'Язык',
    externalLinkLabel: 'откроется в новой вкладке',
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
    footerRole: 'Veterinarian, researcher and entrepreneur.',
    footerCore: 'Core sections',
    footerVerification: 'Verified profiles',
    footerReference: 'Reference',
    footerLanguage: 'Language',
    externalLinkLabel: 'opens in a new tab',
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
  { slug: 'contact', label: { ru: 'Контакты', en: 'Contact' } },
] as const;

export const footerCoreNavigation = [
  ...primaryNavigation,
  { slug: 'cv', label: { ru: 'CV', en: 'CV' } },
] as const;

export const footerReferenceNavigation = [
  { slug: 'blog', label: { ru: 'Блог', en: 'Blog' } },
  { slug: 'privacy', label: { ru: 'Конфиденциальность', en: 'Privacy' } },
  { slug: 'terms', label: { ru: 'Условия', en: 'Terms' } },
  { slug: 'disclaimer', label: { ru: 'Отказ от ответственности', en: 'Disclaimer' } },
] as const;

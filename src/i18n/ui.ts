import type { Language } from './config';
import { identity } from '../data/identity';

export const ui = {
  ru: {
    siteName: identity.name.ru,
    home: 'Главная',
    skipToContent: 'Перейти к содержанию',
    languageLabel: 'Выбор языка',
    primaryNavigation: 'Основная навигация',
    menu: 'Меню',
    closeMenu: 'Закрыть меню',
    search: 'Поиск',
    consultation: 'Связаться',
    menuPrimary: 'Основное',
    menuResources: 'Материалы и профили',
    footerNavigation: 'Дополнительная навигация',
    footerRole: 'Ветеринарный врач и специалист визуальной диагностики.',
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
    menu: 'Menu',
    closeMenu: 'Close menu',
    search: 'Search',
    consultation: 'Contact',
    menuPrimary: 'Main',
    menuResources: 'Resources and profiles',
    footerNavigation: 'Secondary navigation',
    footerRole: 'Veterinary Doctor and Diagnostic Imaging Specialist.',
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

export const desktopNavigation = [
  { slug: 'about', label: { ru: 'Обо мне', en: 'About' } },
  { slug: 'publications', label: { ru: 'Публикации', en: 'Publications' } },
] as const;

export const primaryNavigation = [
  ...desktopNavigation,
  { slug: 'media', label: { ru: 'Медиа', en: 'Media' } },
  { slug: 'contact', label: { ru: 'Контакты', en: 'Contact' } },
] as const;

export const secondaryNavigation = [
  { slug: 'research', label: { ru: 'Исследования', en: 'Research' } },
  { slug: 'knowledge', label: { ru: 'База знаний', en: 'Knowledge' } },
  { slug: 'profiles', label: { ru: 'Профессиональные профили', en: 'Professional profiles' } },
] as const;

export const footerCoreNavigation = [
  ...primaryNavigation,
  { slug: 'knowledge', label: { ru: 'База знаний', en: 'Knowledge' } },
] as const;

export const footerLegalNavigation = [
  { slug: 'privacy', label: { ru: 'Конфиденциальность', en: 'Privacy' } },
  { slug: 'terms', label: { ru: 'Условия', en: 'Terms' } },
  { slug: 'disclaimer', label: { ru: 'Отказ от ответственности', en: 'Disclaimer' } },
] as const;

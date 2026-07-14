import type { Language } from '../i18n/config';

interface NotFoundCopy {
  documentTitle: string;
  code: string;
  title: string;
  description: string;
  homeLabel: string;
  navigationLabel: string;
  languageLabel: string;
  links: {
    about: string;
    research: string;
    publications: string;
    contact: string;
  };
}

export const notFoundCopy = {
  ru: {
    documentTitle: 'Страница не найдена — Артур Фаттахов',
    code: '404',
    title: 'Страница не найдена',
    description: 'Запрошенная страница не существует, была перемещена или её адрес указан неверно.',
    homeLabel: 'На главную',
    navigationLabel: 'Основные разделы',
    languageLabel: 'English',
    links: {
      about: 'Обо мне',
      research: 'Исследования',
      publications: 'Публикации',
      contact: 'Связаться',
    },
  },
  en: {
    documentTitle: 'Page not found — Artur Fattakhov',
    code: '404',
    title: 'Page not found',
    description: 'The requested page does not exist, may have been moved, or the address may be incorrect.',
    homeLabel: 'Back to home',
    navigationLabel: 'Main sections',
    languageLabel: 'Русский',
    links: {
      about: 'About',
      research: 'Research',
      publications: 'Publications',
      contact: 'Contact',
    },
  },
} as const satisfies Record<Language, NotFoundCopy>;

import type { Language } from '../i18n/config';

export const contactEmail = 'arturfattakhov1@gmail.com';

interface ContactPageCopy {
  hero: string;
  emailDescription: string;
  inquiryTypes: string[];
  profileLinkLabel: string;
  externalLinkLabel: string;
  responseNote: string;
}

export const contactPageCopy: Record<Language, ContactPageCopy> = {
  ru: {
    hero: 'Официальная страница для профессиональных, исследовательских и медиа-запросов.',
    emailDescription: 'Для связи используйте электронную почту.',
    inquiryTypes: [
      'Профессиональные запросы',
      'Исследовательское сотрудничество',
      'Медиа и комментарии',
      'Публичные выступления',
    ],
    profileLinkLabel: 'Открыть профиль',
    externalLinkLabel: 'откроется в новой вкладке',
    responseNote: 'Ответ зависит от загруженности и характера запроса.',
  },
  en: {
    hero: 'Official contact page for professional, research and media inquiries.',
    emailDescription: 'Use email for contact.',
    inquiryTypes: [
      'Professional inquiries',
      'Research collaboration',
      'Media and commentary',
      'Public speaking',
    ],
    profileLinkLabel: 'Open profile',
    externalLinkLabel: 'opens in a new tab',
    responseNote: 'Response time depends on workload and the nature of the request.',
  },
};

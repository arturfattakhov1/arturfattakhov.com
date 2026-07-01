import type { Language } from '../i18n/config';

interface CardContent {
  title: string;
  description?: string;
}

interface HomePageCopy {
  hero: {
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
  };
  identity: CardContent[];
  work: CardContent[];
  research: Array<{ title: string; path: string }>;
  publications: {
    title: string;
    description: string;
  };
  projects: {
    title: string;
    description: string;
  };
  media: string[];
  placeholderLabel: string;
  linkLabel: string;
  profileLinkLabel: string;
  externalLinkLabel: string;
  contact: {
    description: string;
    cta: string;
  };
}

export const homePageCopy: Record<Language, HomePageCopy> = {
  ru: {
    hero: {
      subtitle: 'Ветеринарный врач, исследователь и предприниматель. Основатель выездной ветеринарной службы для собак и кошек с применением искусственного интеллекта.',
      primaryCta: 'Обо мне',
      secondaryCta: 'Связаться',
    },
    identity: [
      { title: 'Ветеринарный врач', description: 'Ветеринарная помощь собакам и кошкам.' },
      { title: 'Исследователь', description: 'Исследования в области ветеринарной медицины и искусственного интеллекта.' },
      { title: 'Предприниматель', description: 'Технологии и сервисы для ветеринарной помощи.' },
      { title: 'ИИ в ветеринарной медицине', description: 'Применение искусственного интеллекта в ветеринарной помощи на дому.' },
    ],
    work: [
      { title: 'Ветеринарная помощь на дому', description: 'Выездная ветеринарная помощь для собак и кошек.' },
      { title: 'Искусственный интеллект', description: 'ИИ для поддержки ветеринарной помощи.' },
      { title: 'Исследования', description: 'Ветеринарная медицина и технологии.' },
      { title: 'Образование', description: 'Раздел для будущих образовательных материалов.' },
    ],
    research: [
      { title: 'Исследовательские направления', path: 'research' },
      { title: 'Публикации', path: 'publications' },
      { title: 'Академические профили', path: 'profiles' },
    ],
    publications: {
      title: 'Публикации пока не добавлены',
      description: 'Раздел подготовлен для автоматического вывода материалов из Markdown-коллекции.',
    },
    projects: {
      title: 'Проекты пока не добавлены',
      description: 'Проверенные проекты будут появляться здесь после добавления в Markdown-коллекцию.',
    },
    media: ['Интервью', 'Статьи', 'Видео', 'Подкасты'],
    placeholderLabel: 'Материалы будут добавлены позже',
    linkLabel: 'Перейти к разделу',
    profileLinkLabel: 'Открыть профиль',
    externalLinkLabel: 'откроется в новой вкладке',
    contact: {
      description: 'Для профессиональных запросов используйте страницу контактов.',
      cta: 'Перейти к контактам',
    },
  },
  en: {
    hero: {
      subtitle: 'Veterinarian, researcher and entrepreneur. Founder of an AI-enabled home veterinary care service for dogs and cats.',
      primaryCta: 'About',
      secondaryCta: 'Contact',
    },
    identity: [
      { title: 'Veterinarian', description: 'Veterinary care for dogs and cats.' },
      { title: 'Researcher', description: 'Research in veterinary medicine and artificial intelligence.' },
      { title: 'Entrepreneur', description: 'Technology and services for veterinary care.' },
      { title: 'AI in Veterinary Medicine', description: 'Artificial intelligence for veterinary care at home.' },
    ],
    work: [
      { title: 'Home Veterinary Care', description: 'Home veterinary care for dogs and cats.' },
      { title: 'Artificial Intelligence', description: 'AI supporting veterinary care.' },
      { title: 'Research', description: 'Veterinary medicine and technology.' },
      { title: 'Education', description: 'Reserved for future educational material.' },
    ],
    research: [
      { title: 'Research directions', path: 'research' },
      { title: 'Publications', path: 'publications' },
      { title: 'Academic profiles', path: 'profiles' },
    ],
    publications: {
      title: 'No publications added yet',
      description: 'This section is ready to render entries automatically from the Markdown collection.',
    },
    projects: {
      title: 'No projects added yet',
      description: 'Verified projects will appear here after they are added to the Markdown collection.',
    },
    media: ['Interviews', 'Articles', 'Videos', 'Podcasts'],
    placeholderLabel: 'Material will be added later',
    linkLabel: 'View section',
    profileLinkLabel: 'Open profile',
    externalLinkLabel: 'opens in a new tab',
    contact: {
      description: 'Use the contact page for professional enquiries.',
      cta: 'Go to contact page',
    },
  },
};

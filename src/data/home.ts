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
  research: string[];
  publications: {
    title: string;
    description: string;
  };
  projects: string[];
  media: string[];
  profiles: string[];
  placeholderLabel: string;
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
    research: ['Исследовательские интересы', 'Публикации', 'Патенты', 'Текущее PhD-исследование'],
    publications: {
      title: 'Публикации пока не добавлены',
      description: 'Раздел подготовлен для автоматического вывода материалов из Markdown-коллекции.',
    },
    projects: ['Проект 01', 'Проект 02', 'Проект 03'],
    media: ['Интервью', 'Статьи', 'Видео', 'Подкасты'],
    profiles: ['Google Scholar', 'ORCID', 'ResearchGate', 'Web of Science Researcher', 'GitHub', 'YouTube', 'Instagram', 'Threads', 'Facebook'],
    placeholderLabel: 'Материалы будут добавлены позже',
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
    research: ['Research interests', 'Publications', 'Patents', 'Current PhD research'],
    publications: {
      title: 'No publications added yet',
      description: 'This section is ready to render entries automatically from the Markdown collection.',
    },
    projects: ['Project 01', 'Project 02', 'Project 03'],
    media: ['Interviews', 'Articles', 'Videos', 'Podcasts'],
    profiles: ['Google Scholar', 'ORCID', 'ResearchGate', 'Web of Science Researcher', 'GitHub', 'YouTube', 'Instagram', 'Threads', 'Facebook'],
    placeholderLabel: 'Material will be added later',
    contact: {
      description: 'Use the contact page for professional enquiries.',
      cta: 'Go to contact page',
    },
  },
};

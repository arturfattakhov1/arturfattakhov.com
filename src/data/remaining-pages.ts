import type { Language } from '../i18n/config';

export const projectsPageCopy = {
  ru: {
    hero: 'Проекты будут добавляться только после проверки описаний и статуса.',
    focus: 'Выездная ветеринарная служба для собак и кошек с применением искусственного интеллекта.',
    placeholder: {
      title: 'Проекты пока не добавлены',
      description: 'Раздел подготовлен для будущих карточек проектов с проверенными описаниями, статусом и ссылками.',
    },
    futureStructure: ['Описание проекта', 'Статус проекта', 'Ссылки и материалы'],
    futureLabel: 'Будет заполнено после проверки данных',
    statusLabels: { active: 'Активный проект', completed: 'Завершён', paused: 'Приостановлен' },
  },
  en: {
    hero: 'Projects will be added only after their descriptions and status have been verified.',
    focus: 'AI-enabled home veterinary care service for dogs and cats.',
    placeholder: {
      title: 'No projects added yet',
      description: 'This section is prepared for future project cards with verified descriptions, status, and links.',
    },
    futureStructure: ['Project description', 'Project status', 'Links and materials'],
    futureLabel: 'To be completed after data verification',
    statusLabels: { active: 'Active project', completed: 'Completed', paused: 'Paused' },
  },
} as const satisfies Record<Language, Record<string, unknown>>;

export const mediaPageCopy = {
  ru: {
    hero: 'Проверенные медиа-материалы будут добавляться по мере публикации.',
    categories: [
      { id: 'interviews', title: 'Интервью' },
      { id: 'articles', title: 'Статьи' },
      { id: 'videos', title: 'Видео' },
      { id: 'podcasts', title: 'Подкасты' },
    ],
    placeholderTitle: 'Материалы пока не добавлены',
    placeholderDescription: 'Раздел подготовлен для будущих проверенных материалов.',
  },
  en: {
    hero: 'Verified media materials will be added as they are published.',
    categories: [
      { id: 'interviews', title: 'Interviews' },
      { id: 'articles', title: 'Articles' },
      { id: 'videos', title: 'Videos' },
      { id: 'podcasts', title: 'Podcasts' },
    ],
    placeholderTitle: 'No materials added yet',
    placeholderDescription: 'This section is prepared for future verified materials.',
  },
} as const;

export const cvPageCopy = {
  ru: {
    hero: 'Профессиональное резюме будет дополняться только проверенными сведениями.',
    professionalProfile: 'Ветеринарный врач, исследователь и предприниматель. Дополнительные профессиональные сведения будут добавлены после проверки.',
    placeholders: {
      education: 'Сведения об образовании будут добавлены после проверки.',
      research: 'Сведения об исследовательской работе будут добавлены после проверки.',
      clinicalPractice: 'Сведения о клинической практике будут добавлены после проверки.',
      entrepreneurship: 'Сведения о предпринимательской деятельности будут добавлены после проверки.',
      skills: 'Проверенные профессиональные навыки будут добавлены позже.',
    },
    profileLinkLabel: 'Открыть профиль',
    externalLinkLabel: 'откроется в новой вкладке',
  },
  en: {
    hero: 'The professional CV will be expanded only with verified information.',
    professionalProfile: 'Veterinarian, researcher, and entrepreneur. Additional professional information will be added after verification.',
    placeholders: {
      education: 'Education details will be added after verification.',
      research: 'Research details will be added after verification.',
      clinicalPractice: 'Clinical practice details will be added after verification.',
      entrepreneurship: 'Entrepreneurship details will be added after verification.',
      skills: 'Verified professional skills will be added later.',
    },
    profileLinkLabel: 'Open profile',
    externalLinkLabel: 'opens in a new tab',
  },
} as const;

export const usesPageCopy = {
  ru: {
    hero: 'Страница подготовлена для будущего списка проверенных рабочих инструментов и процессов.',
    sections: {
      tools: 'Инструменты будут добавлены после проверки.',
      software: 'Программное обеспечение будет добавлено после проверки.',
      clinicalWorkflow: 'Описание клинического рабочего процесса будет добавлено позже.',
      aiTools: 'Инструменты искусственного интеллекта будут добавлены после проверки.',
    },
  },
  en: {
    hero: 'This page is prepared for a future list of verified working tools and processes.',
    sections: {
      tools: 'Tools will be added after verification.',
      software: 'Software will be added after verification.',
      clinicalWorkflow: 'The clinical workflow description will be added later.',
      aiTools: 'Artificial intelligence tools will be added after verification.',
    },
  },
} as const;

export const nowPageCopy = {
  ru: {
    hero: 'Текущие направления работы и профессионального внимания.',
    personalWebsite: 'Развитие личного сайта как центра проверенной профессиональной информации.',
    homeVeterinaryCare: 'Выездная ветеринарная служба для собак и кошек с применением искусственного интеллекта.',
    research: 'Развитие исследовательских направлений в ветеринарной медицине.',
    ai: 'Применение искусственного интеллекта в ветеринарной медицине и поддержке принятия решений.',
  },
  en: {
    hero: 'Current areas of work and professional focus.',
    personalWebsite: 'Developing the personal website as a hub for verified professional information.',
    homeVeterinaryCare: 'AI-enabled home veterinary care service for dogs and cats.',
    research: 'Developing research directions in veterinary medicine.',
    ai: 'Applying artificial intelligence in veterinary medicine and decision support.',
  },
} as const;

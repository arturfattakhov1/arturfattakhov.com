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
      subtitle: 'Артур Фаттахов — ветеринарный врач, специалист по ультразвуковой диагностике, исследователь и предприниматель. Его работа объединяет ветеринарную помощь собакам и кошкам, диагностическую визуализацию, научные интересы и применение искусственного интеллекта в ветеринарной медицине. На этом сайте собраны проверенные сведения о профессиональной деятельности, исследованиях, публикациях и официальных профилях.',
      primaryCta: 'Обо мне',
      secondaryCta: 'Связаться',
    },
    identity: [
      { title: 'Ветеринарный врач', description: 'Клиническая ветеринарная помощь собакам и кошкам с вниманием к диагностике и обоснованному принятию решений.' },
      { title: 'Специалист по ультразвуковой диагностике', description: 'Профессиональный интерес к диагностической визуализации и ультразвуковому исследованию в ветеринарной практике.' },
      { title: 'Исследователь', description: 'Долгосрочные научные интересы в ветеринарной медицине, морфометрии, диагностике и клинической поддержке решений.' },
      { title: 'Предприниматель', description: 'Основатель выездной ветеринарной службы для собак и кошек.' },
    ],
    work: [
      { title: 'Ветеринарная помощь на дому', description: 'Развитие последовательной и понятной модели помощи собакам и кошкам в домашних условиях.' },
      { title: 'Искусственный интеллект', description: 'Изучение способов ответственного применения ИИ для поддержки ветеринарных решений и рабочих процессов.' },
      { title: 'Исследования', description: 'Ветеринарная медицина, диагностическая визуализация, морфометрия и цифровые методы.' },
      { title: 'Научная коммуникация', description: 'Подготовка сайта к публикации проверенных научных и профессиональных материалов.' },
    ],
    research: [
      { title: 'Исследовательские направления', path: 'research' },
      { title: 'Публикации', path: 'publications' },
      { title: 'Академические профили', path: 'profiles' },
    ],
    publications: {
      title: 'Проверенные библиографические записи',
      description: 'В разделе будут публиковаться научные работы и профессиональные статьи после проверки авторства, выходных данных, DOI и ссылки на первоисточник.',
    },
    projects: {
      title: 'Профессиональные инициативы',
      description: 'Отдельные страницы проектов будут добавляться только после проверки их публичного названия, цели, статуса и роли Артура Фаттахова.',
    },
    media: ['Интервью', 'Статьи', 'Видео', 'Подкасты'],
    placeholderLabel: 'Будут добавлены только проверенные материалы',
    linkLabel: 'Перейти к разделу',
    profileLinkLabel: 'Открыть профиль',
    externalLinkLabel: 'откроется в новой вкладке',
    contact: {
      description: 'Страница контактов предназначена для профессиональных, исследовательских, образовательных и медиа-запросов.',
      cta: 'Перейти к контактам',
    },
  },
  en: {
    hero: {
      subtitle: 'Artur Fattakhov is a veterinarian, veterinary ultrasound specialist, researcher, and entrepreneur. His work connects veterinary care for dogs and cats, diagnostic imaging, long-term research interests, and the responsible use of artificial intelligence in veterinary medicine. This website provides a verified reference for his professional work, research, publications, and official profiles.',
      primaryCta: 'About',
      secondaryCta: 'Contact',
    },
    identity: [
      { title: 'Veterinarian', description: 'Clinical veterinary care for dogs and cats, with attention to diagnostics and evidence-informed decision-making.' },
      { title: 'Veterinary ultrasound specialist', description: 'A professional interest in diagnostic imaging and ultrasonography in veterinary practice.' },
      { title: 'Researcher', description: 'Long-term interests in veterinary medicine, morphometry, diagnostics, and clinical decision support.' },
      { title: 'Entrepreneur', description: 'Founder of a home veterinary service for dogs and cats.' },
    ],
    work: [
      { title: 'Home veterinary care', description: 'Developing a consistent and understandable model of veterinary care for dogs and cats at home.' },
      { title: 'Artificial intelligence', description: 'Examining responsible uses of AI for veterinary decision support and professional workflows.' },
      { title: 'Research', description: 'Veterinary medicine, diagnostic imaging, morphometry, and digital methods.' },
      { title: 'Scientific communication', description: 'Preparing the website for verified research and professional material.' },
    ],
    research: [
      { title: 'Research directions', path: 'research' },
      { title: 'Publications', path: 'publications' },
      { title: 'Academic profiles', path: 'profiles' },
    ],
    publications: {
      title: 'Verified bibliographic records',
      description: 'Scientific work and professional articles will appear after authorship, publication details, DOI, and original source links have been checked.',
    },
    projects: {
      title: 'Professional initiatives',
      description: 'Dedicated project pages will be added only after the public name, purpose, status, and Artur Fattakhov’s role have been verified.',
    },
    media: ['Interviews', 'Articles', 'Videos', 'Podcasts'],
    placeholderLabel: 'Only verified material will be added',
    linkLabel: 'View section',
    profileLinkLabel: 'Open profile',
    externalLinkLabel: 'opens in a new tab',
    contact: {
      description: 'The contact page is intended for professional, research, educational, and media inquiries.',
      cta: 'Go to contact page',
    },
  },
};

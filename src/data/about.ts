import type { Language } from '../i18n/config';

interface AboutPageCopy {
  hero: string;
  biography: string[];
  expertiseIntroduction: string;
  expertise: string[];
  currentWork: string;
  research: string;
}

export const aboutPageCopy: Record<Language, AboutPageCopy> = {
  ru: {
    hero: 'Я Артур Фаттахов - ветеринарный врач, исследователь и предприниматель.',
    biography: [
      'Моя работа находится на пересечении клинической ветеринарии, научного подхода, выездной ветеринарной помощи и применения искусственного интеллекта в ветеринарной медицине.',
      'Я развиваю направление современной ветеринарной помощи на дому для собак и кошек, где важны не только удобство для владельца, но и клиническая точность, безопасность решений, стандартизация процессов и долгосрочное ведение пациента.',
    ],
    expertiseIntroduction: 'Мой профессиональный фокус:',
    expertise: [
      'ветеринарная медицина собак и кошек;',
      'ультразвуковая диагностика;',
      'клиническое мышление и поддержка принятия решений;',
      'выездная ветеринарная помощь;',
      'искусственный интеллект в ветеринарии;',
      'построение масштабируемых ветеринарных сервисов.',
    ],
    currentWork: 'Как предприниматель, я работаю над созданием современной ветеринарной службы, ориентированной на помощь собакам и кошкам на дому, стандартизацию качества и использование технологий для повышения эффективности ветеринарной помощи.',
    research: 'Как исследователь, я занимаюсь научной работой в области ветеринарной медицины и развиваю интерес к применению цифровых инструментов, данных и искусственного интеллекта в клинической практике.',
  },
  en: {
    hero: 'I am Artur Fattakhov - a veterinarian, researcher, and entrepreneur.',
    biography: [
      'My work is at the intersection of clinical veterinary medicine, research, home veterinary care, and the application of artificial intelligence in veterinary practice.',
      'I am building a modern home veterinary care service for dogs and cats, where convenience for pet owners must be combined with clinical accuracy, safe decision-making, standardized workflows, and long-term patient management.',
    ],
    expertiseIntroduction: 'My professional focus includes:',
    expertise: [
      'small animal veterinary medicine;',
      'veterinary ultrasonography;',
      'clinical reasoning and decision support;',
      'home veterinary care;',
      'artificial intelligence in veterinary medicine;',
      'building scalable veterinary services.',
    ],
    currentWork: 'As an entrepreneur, I am focused on building a modern veterinary service for dogs and cats at home, with standardized quality and technology-supported clinical processes.',
    research: 'As a researcher, I work in veterinary medicine and develop an interest in digital tools, data, and artificial intelligence in clinical practice.',
  },
};

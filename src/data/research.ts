import type { Language } from '../i18n/config';

interface ResearchPageCopy {
  hero: string;
  interests: string[];
  currentResearch: string;
  publications: {
    title: string;
    description: string;
  };
  patents: {
    title: string;
    description: string;
  };
  profiles: string[];
  profilePlaceholder: string;
  futureDirections: string;
}

export const researchPageCopy: Record<Language, ResearchPageCopy> = {
  ru: {
    hero: 'Моя исследовательская деятельность посвящена ветеринарной медицине, клинической диагностике и применению искусственного интеллекта для поддержки принятия ветеринарных решений.',
    interests: [
      'Клиническая ветеринарная медицина',
      'Ультразвуковая диагностика',
      'Выездная ветеринарная помощь',
      'Искусственный интеллект в ветеринарии',
      'Поддержка принятия врачебных решений',
      'Цифровизация ветеринарной медицины',
    ],
    currentResearch: 'Информация будет постепенно обновляться по мере развития исследовательских проектов.',
    publications: {
      title: 'Материалы пока не добавлены',
      description: 'Раздел подготовлен для автоматического вывода публикаций из Markdown-коллекции.',
    },
    patents: {
      title: 'Материалы пока не добавлены',
      description: 'Раздел подготовлен для будущих страниц патентов.',
    },
    profiles: ['ORCID', 'Google Scholar', 'ResearchGate', 'Web of Science'],
    profilePlaceholder: 'Место для ссылки на профиль',
    futureDirections: 'Будущие исследования будут сосредоточены на применении искусственного интеллекта, клинической поддержке принятия решений и цифровых технологиях в ветеринарной медицине.',
  },
  en: {
    hero: 'My research focuses on veterinary medicine, clinical diagnostics and the application of artificial intelligence for veterinary decision support.',
    interests: [
      'Clinical Veterinary Medicine',
      'Veterinary Ultrasonography',
      'Home Veterinary Care',
      'Artificial Intelligence in Veterinary Medicine',
      'Clinical Decision Support',
      'Digital Veterinary Medicine',
    ],
    currentResearch: 'This section will be updated as research projects develop.',
    publications: {
      title: 'No materials added yet',
      description: 'This section is ready to render publications automatically from the Markdown collection.',
    },
    patents: {
      title: 'No materials added yet',
      description: 'This section is prepared for future patent pages.',
    },
    profiles: ['ORCID', 'Google Scholar', 'ResearchGate', 'Web of Science'],
    profilePlaceholder: 'Reserved for a profile link',
    futureDirections: 'Future research will focus on artificial intelligence, clinical decision support and digital technologies in veterinary medicine.',
  },
};

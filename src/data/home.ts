import type { Language } from '../i18n/config';
import homeHelpContent from './cms/home-help.json';

interface HomeHelpCopy {
  title: string;
  introduction: string;
  items: Array<{ title: string; description: string }>;
  practiceCta: string;
  contactCta: string;
}

interface HomePageCopy {
  hero: {
    role: string;
    benefit: string;
    context: string;
    portraitAlt: string;
    primaryCta: string;
    secondaryCta: string;
  };
  help: HomeHelpCopy;
  profile: {
    title: string;
    introduction: string;
    items: Array<{ title: string; description: string }>;
    aboutLink: string;
  };
  materials: {
    title: string;
    introduction: string;
    recordType: { journal: string; conference: string; patent: string };
    openRecord: string;
    allRecords: string;
  };
}

const cmsHomeHelp = homeHelpContent satisfies Record<Language, HomeHelpCopy>;

export const homePageCopy: Record<Language, HomePageCopy> = {
  ru: {
    hero: {
      role: 'Ветеринарный врач · Специалист визуальной диагностики',
      benefit: 'Помогаю владельцам собак и кошек разобраться в состоянии животного, оценить имеющиеся данные и определить следующий обоснованный шаг.',
      context: 'В работе я соединяю клиническую практику, современные методы диагностики и ответственное применение технологий.',
      portraitAlt: 'Портрет ветеринарного врача Артура Фаттахова',
      primaryCta: 'Онлайн-консультация',
      secondaryCta: 'Обо мне и опыт',
    },
    help: cmsHomeHelp.ru,
    profile: {
      title: 'Профессиональный профиль',
      introduction: 'Мой профессиональный путь объединяет ветеринарное образование, практическую работу, визуальную диагностику, исследования и предпринимательский опыт.',
      items: [
        {
          title: 'Ветеринарное образование',
          description: 'Завершённая профессиональная подготовка с квалификацией «Ветеринарный врач».',
        },
        {
          title: 'Клиническая практика',
          description: 'Частная ветеринарная практика и работа с собаками и кошками.',
        },
        {
          title: 'Визуальная диагностика',
          description: 'Профильная подготовка по ветеринарной визуальной диагностике.',
        },
        {
          title: 'Предпринимательский опыт',
          description: 'Организация и развитие частной ветеринарной практики.',
        },
        {
          title: 'Исследовательская квалификация',
          description: 'Квалификация «Исследователь. Преподаватель-исследователь».',
        },
      ],
      aboutLink: 'Обо мне и опыт',
    },
    materials: {
      title: 'Новые материалы',
      introduction: 'Последние опубликованные записи из проверенного библиографического каталога.',
      recordType: { journal: 'Научная статья', conference: 'Материал конференции', patent: 'Патент' },
      openRecord: 'Открыть материал',
      allRecords: 'Все публикации',
    },
  },
  en: {
    hero: {
      role: 'Veterinary Doctor · Diagnostic Imaging Specialist',
      benefit: 'I help dog and cat owners understand their animal’s condition, make sense of the available information, and identify the next well-founded step.',
      context: 'My work brings together clinical practice, modern diagnostic methods, and the responsible use of technology.',
      portraitAlt: 'Portrait of veterinary doctor Artur Fattakhov',
      primaryCta: 'Online consultation',
      secondaryCta: 'About and experience',
    },
    help: cmsHomeHelp.en,
    profile: {
      title: 'Professional profile',
      introduction: 'My professional path combines veterinary education, clinical work, diagnostic imaging, research, and entrepreneurial experience.',
      items: [
        {
          title: 'Veterinary education',
          description: 'Completed professional education with the qualification of Veterinary Doctor.',
        },
        {
          title: 'Clinical practice',
          description: 'Private veterinary practice working with dogs and cats.',
        },
        {
          title: 'Diagnostic imaging',
          description: 'Focused professional training in veterinary diagnostic imaging.',
        },
        {
          title: 'Entrepreneurial experience',
          description: 'Building and developing a private veterinary practice.',
        },
        {
          title: 'Research qualification',
          description: 'Qualification as Researcher and Teacher-Researcher.',
        },
      ],
      aboutLink: 'About and experience',
    },
    materials: {
      title: 'New material',
      introduction: 'Recent published records from the verified bibliographic catalogue.',
      recordType: { journal: 'Journal article', conference: 'Conference paper', patent: 'Patent' },
      openRecord: 'Open material',
      allRecords: 'All publications',
    },
  },
};

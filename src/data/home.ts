import type { Language } from '../i18n/config';

interface HomeField {
  title: string;
  description: string;
  linkLabel: string;
  path: 'about' | 'research';
}

interface HomePageCopy {
  hero: {
    roles: string[];
    thesis: string;
    context: string;
    portraitAlt: string;
    primaryCta: string;
    secondaryCta: string;
  };
  proof: Array<{ title: string; description: string }>;
  fields: {
    introduction: string;
    items: HomeField[];
  };
  scholarly: {
    introduction: string;
    recordType: { journal: string; patent: string };
    openRecord: string;
    allRecords: string;
  };
  profiles: {
    introduction: string;
    openProfile: string;
    externalLinkLabel: string;
    allProfiles: string;
    referenceLabel: string;
    references: Array<{ label: string; path: 'knowledge' | 'timeline' | 'faq' }>;
  };
  position: string[];
  contact: {
    description: string;
    cta: string;
  };
}

export const homePageCopy: Record<Language, HomePageCopy> = {
  ru: {
    hero: {
      roles: [
        'Ветеринарный врач',
        'Специалист визуальной диагностики',
        'Исследователь',
        'Предприниматель',
      ],
      thesis: 'Ветеринарная медицина, визуальная диагностика и исследования, направленные на более точное понимание здоровья животных.',
      context: 'Этот сайт служит единым источником проверенной информации о профессиональной деятельности, исследовательских интересах, публикациях и официальных профилях Артура Фаттахова.',
      portraitAlt: 'Портрет Артура Фаттахова',
      primaryCta: 'Обо мне',
      secondaryCta: 'Исследования',
    },
    proof: [
      {
        title: 'Ветеринарное образование',
        description: 'Профессиональная подготовка в области ветеринарной медицины.',
      },
      {
        title: 'Визуальная диагностика',
        description: 'Специализация в диагностической визуализации и ультразвуковом исследовании.',
      },
      {
        title: 'Исследовательская подготовка',
        description: 'Завершил обучение в аспирантуре и получил диплом с квалификацией «Исследователь. Преподаватель-исследователь».',
      },
      {
        title: 'Научные результаты',
        description: 'Две научные публикации и один зарегистрированный патент представлены на сайте с проверенными библиографическими данными.',
      },
    ],
    fields: {
      introduction: 'Клиническая практика, визуальная диагностика и исследования образуют единую систему профессиональной работы.',
      items: [
        {
          title: 'Клиническая практика',
          description: 'Ветеринарная медицина собак и кошек, последовательный клинический процесс и интерпретация доступных данных при принятии решений.',
          linkLabel: 'Профессиональный профиль',
          path: 'about',
        },
        {
          title: 'Визуальная диагностика',
          description: 'Ультразвуковое исследование, качество изображений и оценка результатов вместе с анамнезом и клиническими признаками.',
          linkLabel: 'О профессиональном подходе',
          path: 'about',
        },
        {
          title: 'Исследования',
          description: 'Диагностическая визуализация, рентгенографическая анатомия, морфометрия и клиническая поддержка принятия решений.',
          linkLabel: 'Исследовательские направления',
          path: 'research',
        },
      ],
    },
    scholarly: {
      introduction: 'Выбранные записи отражают работу с рентгеноморфометрией, сравнительной анатомией и микроморфологией. На сайте приведены только проверенные библиографические сведения.',
      recordType: { journal: 'Научная публикация', patent: 'Патент' },
      openRecord: 'Открыть запись',
      allRecords: 'Все публикации',
    },
    profiles: {
      introduction: 'Официальные научные профили связывают авторские и библиографические записи с одной проверенной профессиональной идентичностью.',
      openProfile: 'Открыть профиль',
      externalLinkLabel: 'откроется в новой вкладке',
      allProfiles: 'Все официальные профили',
      referenceLabel: 'Дополнительный профессиональный контекст',
      references: [
        { label: 'База знаний', path: 'knowledge' },
        { label: 'Хронология', path: 'timeline' },
        { label: 'Вопросы и ответы', path: 'faq' },
      ],
    },
    position: [
      'Я рассматриваю диагностику как процесс, в котором результаты визуализации должны оцениваться вместе с анамнезом, клиническими признаками и другими доступными данными.',
      'Научная коммуникация для меня означает точное изложение методов и результатов без преувеличений и публикацию только проверенных сведений.',
    ],
    contact: {
      description: 'Для профессиональных, исследовательских, образовательных и медиа-запросов используйте официальную страницу контактов.',
      cta: 'Перейти к контактам',
    },
  },
  en: {
    hero: {
      roles: [
        'Veterinary Doctor',
        'Diagnostic Imaging Specialist',
        'Researcher',
        'Entrepreneur',
      ],
      thesis: 'Veterinary medicine, diagnostic imaging and research focused on a more precise understanding of animal health.',
      context: 'This website is the central source for verified information about Artur Fattakhov’s professional work, research interests, publications, and official profiles.',
      portraitAlt: 'Portrait of Artur Fattakhov',
      primaryCta: 'About',
      secondaryCta: 'Research',
    },
    proof: [
      {
        title: 'Veterinary education',
        description: 'Professional training in veterinary medicine.',
      },
      {
        title: 'Diagnostic imaging',
        description: 'Specialisation in diagnostic imaging and veterinary ultrasonography.',
      },
      {
        title: 'Research training',
        description: 'Completed postgraduate training and received a qualification in research and teaching.',
      },
      {
        title: 'Scholarly record',
        description: 'Two scientific publications and one registered patent are presented with verified bibliographic data.',
      },
    ],
    fields: {
      introduction: 'Clinical practice, diagnostic imaging, and research form one connected system of professional work.',
      items: [
        {
          title: 'Clinical practice',
          description: 'Veterinary medicine for dogs and cats, structured clinical workflows, and interpretation of available evidence in decision-making.',
          linkLabel: 'Professional profile',
          path: 'about',
        },
        {
          title: 'Diagnostic imaging',
          description: 'Ultrasonography, image quality, and interpretation of findings alongside history and clinical signs.',
          linkLabel: 'About the professional approach',
          path: 'about',
        },
        {
          title: 'Research',
          description: 'Diagnostic imaging, radiographic anatomy, morphometry, and clinical decision support.',
          linkLabel: 'Research directions',
          path: 'research',
        },
      ],
    },
    scholarly: {
      introduction: 'The selected records concern X-ray morphometry, comparative anatomy, and micromorphology. Only verified bibliographic information is presented here.',
      recordType: { journal: 'Scientific publication', patent: 'Patent' },
      openRecord: 'Open record',
      allRecords: 'All publications',
    },
    profiles: {
      introduction: 'Official research profiles connect authorship and bibliographic records with one verified professional identity.',
      openProfile: 'Open profile',
      externalLinkLabel: 'opens in a new tab',
      allProfiles: 'All official profiles',
      referenceLabel: 'Additional professional context',
      references: [
        { label: 'Knowledge Hub', path: 'knowledge' },
        { label: 'Timeline', path: 'timeline' },
        { label: 'FAQ', path: 'faq' },
      ],
    },
    position: [
      'I approach diagnostics as a process in which imaging findings should be interpreted alongside history, clinical signs, and other available evidence.',
      'For me, scientific communication means describing methods and results accurately, without exaggeration, and publishing only verified information.',
    ],
    contact: {
      description: 'Use the official contact page for professional, research, educational, and media inquiries.',
      cta: 'Go to contact page',
    },
  },
};

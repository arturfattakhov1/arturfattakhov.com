import type { Language } from '../i18n/config';

interface AboutPageCopy {
  opening: {
    name: string;
    roles: string[];
    thesis: string;
    introduction: string;
    researchLink: string;
  };
  professionalSystem: {
    introduction: string;
    areas: Array<{ title: string; description: string }>;
  };
  education: {
    introduction: string;
    records: Array<{
      institution: string;
      qualificationLabel: string;
      qualification: string;
      completionLabel: string;
      year: string;
    }>;
    conclusion: string;
    cvLink: string;
    timelineLink: string;
  };
  researchPath: {
    introduction: string;
    conclusion: string;
    articleLabel: string;
    patentLabel: string;
    recordLink: string;
    researchLink: string;
    publicationsLink: string;
  };
  principles: {
    introduction: string;
    items: Array<{ title: string; description: string }>;
  };
  direction: {
    paragraphs: string[];
    linksLabel: string;
    links: {
      research: string;
      publications: string;
      knowledge: string;
      faq: string;
      profiles: string;
      contact: string;
    };
  };
}

export const aboutPageCopy: Record<Language, AboutPageCopy> = {
  ru: {
    opening: {
      name: 'Артур Фаттахов',
      roles: ['Ветеринарный врач', 'Специалист визуальной диагностики', 'Исследователь', 'Предприниматель'],
      thesis: 'Ветеринарная медицина, визуальная диагностика и исследования, направленные на более точное понимание здоровья животных.',
      introduction: 'Профессиональная работа Артура Фаттахова объединяет клиническую ветеринарную медицину, визуальную диагностику и исследования. Эти направления дополняют друг друга в наблюдении, интерпретации данных и принятии ответственных клинических решений.',
      researchLink: 'Перейти к исследованиям',
    },
    professionalSystem: {
      introduction: 'Клиническая практика задаёт вопросы, визуальная диагностика помогает уточнять наблюдаемую картину, а исследовательская работа позволяет рассматривать методы и данные системно.',
      areas: [
        {
          title: 'Клиническая ветеринарная медицина',
          description: 'Работа с собаками и кошками требует учитывать анамнез, клинические признаки и доступные диагностические данные как единый контекст.',
        },
        {
          title: 'Визуальная диагностика',
          description: 'Результаты ультразвуковых и рентгенографических исследований рассматриваются не изолированно, а в связи с клиническим вопросом и другими сведениями о пациенте.',
        },
        {
          title: 'Исследования',
          description: 'Анатомия, морфометрия и диагностические методы формируют область, в которой клиническое наблюдение связано с проверяемыми данными и точным описанием результатов.',
        },
      ],
    },
    education: {
      introduction: 'Профессиональное образование последовательно соединило подготовку ветеринарного врача с завершённой квалификацией в области исследовательской и преподавательской работы.',
      records: [
        {
          institution: 'СПбГУВМ',
          qualificationLabel: 'Квалификация',
          qualification: '«Ветеринарный врач»',
          completionLabel: 'Год завершения',
          year: '2021',
        },
        {
          institution: 'МГАВМиБ имени К. И. Скрябина',
          qualificationLabel: 'Квалификация',
          qualification: '«Исследователь. Преподаватель-исследователь»',
          completionLabel: 'Год завершения',
          year: '2024',
        },
      ],
      conclusion: 'Подробная хронология вынесена в отдельные справочные разделы, чтобы эта страница сохраняла формат профессионального профиля.',
      cvLink: 'Открыть CV',
      timelineLink: 'Открыть хронологию',
    },
    researchPath: {
      introduction: 'Исследовательский путь представлен работами по сравнительной анатомии, микроморфологии и рентгеноморфометрии дистального отдела конечностей крупного рогатого скота и лося. Проверяемыми результатами этого направления служат две научные публикации и зарегистрированный патент.',
      conclusion: 'Полные библиографические сведения, авторский состав и идентификаторы доступны на отдельных страницах записей.',
      articleLabel: 'Научная публикация',
      patentLabel: 'Патент',
      recordLink: 'Открыть запись',
      researchLink: 'Исследовательские направления',
      publicationsLink: 'Все публикации',
    },
    principles: {
      introduction: 'Связь практики и исследований выражается в требованиях к тому, как формулируются вопросы, оцениваются данные и сообщаются результаты.',
      items: [
        {
          title: 'Диагностический контекст',
          description: 'Данные визуализации оцениваются вместе с анамнезом, клиническими признаками и другими доступными сведениями.',
        },
        {
          title: 'Проверяемость',
          description: 'Профессиональные выводы должны опираться на доступные данные, а границы этих данных — оставаться явными.',
        },
        {
          title: 'Точная коммуникация',
          description: 'Методы и результаты требуют ясного описания без преувеличений и подмены фактов предположениями.',
        },
      ],
    },
    direction: {
      paragraphs: [
        'Текущее профессиональное направление сохраняет связь клинической ветеринарной практики, визуальной диагностики и исследовательской работы.',
        'Этот сайт собирает проверенные сведения о публикациях, исследовательских интересах и официальном профессиональном присутствии, а также служит прямой точкой контакта.',
      ],
      linksLabel: 'Связанные разделы',
      links: {
        research: 'Исследования',
        publications: 'Публикации',
        knowledge: 'База знаний',
        faq: 'Вопросы и ответы',
        profiles: 'Официальные профили',
        contact: 'Контакты',
      },
    },
  },
  en: {
    opening: {
      name: 'Artur Fattakhov',
      roles: ['Veterinary Doctor', 'Diagnostic Imaging Specialist', 'Researcher', 'Entrepreneur'],
      thesis: 'Veterinary medicine, diagnostic imaging and research focused on a more precise understanding of animal health.',
      introduction: 'Artur Fattakhov’s professional work connects clinical veterinary medicine, diagnostic imaging, and research. These areas complement one another in observation, interpretation of evidence, and responsible clinical decision-making.',
      researchLink: 'Explore the research',
    },
    professionalSystem: {
      introduction: 'Clinical practice defines the questions, diagnostic imaging helps clarify what is observed, and research provides a systematic way to examine methods and evidence.',
      areas: [
        {
          title: 'Clinical veterinary medicine',
          description: 'Work with dogs and cats requires history, clinical signs, and available diagnostic evidence to be considered as one context.',
        },
        {
          title: 'Diagnostic imaging',
          description: 'Ultrasonographic and radiographic findings are interpreted in relation to the clinical question and the other information available about the patient.',
        },
        {
          title: 'Research',
          description: 'Anatomy, morphometry, and diagnostic methods form an area where clinical observation is connected with verifiable evidence and precise reporting.',
        },
      ],
    },
    education: {
      introduction: 'Professional education progressed from veterinary medical training to a completed qualification in research and teaching.',
      records: [
        {
          institution: 'Saint Petersburg State University of Veterinary Medicine',
          qualificationLabel: 'Qualification',
          qualification: 'Veterinary Doctor',
          completionLabel: 'Graduated',
          year: '2021',
        },
        {
          institution: 'Moscow State Academy of Veterinary Medicine and Biotechnology named after K. I. Skryabin',
          qualificationLabel: 'Qualification',
          qualification: 'Qualification in research and teaching',
          completionLabel: 'Completed',
          year: '2024',
        },
      ],
      conclusion: 'Detailed chronology is kept in separate reference sections so this page can remain a focused professional profile.',
      cvLink: 'View CV',
      timelineLink: 'View timeline',
    },
    researchPath: {
      introduction: 'The research path is represented by work in comparative anatomy, micromorphology, and X-ray morphometry of distal limb structures in cattle and moose. Two scientific publications and a registered patent provide the verified record of this direction.',
      conclusion: 'Full bibliographic details, authorship, and identifiers are available on the individual record pages.',
      articleLabel: 'Scientific publication',
      patentLabel: 'Patent',
      recordLink: 'Open record',
      researchLink: 'Research directions',
      publicationsLink: 'All publications',
    },
    principles: {
      introduction: 'The connection between practice and research is reflected in how questions are framed, evidence is assessed, and results are communicated.',
      items: [
        {
          title: 'Diagnostic context',
          description: 'Imaging findings are considered alongside history, clinical signs, and other available evidence.',
        },
        {
          title: 'Verifiability',
          description: 'Professional conclusions should be grounded in available evidence, with the limits of that evidence kept explicit.',
        },
        {
          title: 'Precise communication',
          description: 'Methods and results require clear reporting without exaggeration or the substitution of assumptions for facts.',
        },
      ],
    },
    direction: {
      paragraphs: [
        'The current professional direction maintains the connection between clinical veterinary practice, diagnostic imaging, and research.',
        'This website brings together verified publications, research interests, and official professional profiles, while providing a direct contact route.',
      ],
      linksLabel: 'Related sections',
      links: {
        research: 'Research',
        publications: 'Publications',
        knowledge: 'Knowledge',
        faq: 'FAQ',
        profiles: 'Official profiles',
        contact: 'Contact',
      },
    },
  },
};

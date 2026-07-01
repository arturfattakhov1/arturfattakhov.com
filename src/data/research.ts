import type { Language } from '../i18n/config';

interface ResearchPageCopy {
  hero: string[];
  interests: Array<{ title: string; description: string }>;
  currentResearch: string[];
  publications: {
    title: string;
    description: string;
  };
  patents: {
    title: string;
    description: string;
  };
  profileLinkLabel: string;
  externalLinkLabel: string;
  relatedLinks: { publications: string; profiles: string };
  futureDirections: string[];
}

export const researchPageCopy: Record<Language, ResearchPageCopy> = {
  ru: {
    hero: [
      'Мои исследовательские интересы связаны с ветеринарной медициной, диагностической визуализацией и методами, которые помогают описывать клинические данные точнее.',
      'Особое внимание я уделяю ультразвуковой диагностике, рентгенографической анатомии, морфометрии, клинической поддержке принятия решений и ответственному применению искусственного интеллекта.',
    ],
    interests: [
      { title: 'Ветеринарная медицина', description: 'Клинические вопросы, диагностика и последовательная интерпретация данных при работе с собаками и кошками.' },
      { title: 'Диагностическая визуализация', description: 'Использование визуальных методов для описания анатомии, выявления изменений и уточнения клинических вопросов.' },
      { title: 'Ультразвуковая диагностика', description: 'Методика исследования, качество изображений и интерпретация результатов в клиническом контексте.' },
      { title: 'Рентгенографическая анатомия', description: 'Системное описание анатомических структур и вариантов их визуализации на рентгенограммах.' },
      { title: 'Морфометрия', description: 'Количественное описание формы, размеров и анатомических соотношений с воспроизводимыми методами измерения.' },
      { title: 'Клиническая поддержка решений', description: 'Структурирование данных и аргументов, помогающих врачу оценивать варианты без подмены профессионального суждения.' },
      { title: 'Искусственный интеллект', description: 'Возможности, ограничения и проверка цифровых инструментов для задач ветеринарной медицины.' },
    ],
    currentResearch: [
      'На этой странице будут описываться только те исследовательские вопросы и проекты, чей статус можно сформулировать точно и проверить.',
      'До публикации конкретных записей раздел фиксирует направления интереса, но не заявляет о завершённых исследованиях, результатах или сотрудничестве.',
    ],
    publications: {
      title: 'Проверенные публикации по исследовательским темам',
      description: 'Связанные научные работы появятся здесь после проверки библиографических данных и добавления в коллекцию публикаций.',
    },
    patents: {
      title: 'Проверенные патентные записи',
      description: 'Патентные материалы будут добавляться только при наличии проверяемой записи и первичного источника. Сейчас записи не опубликованы.',
    },
    profileLinkLabel: 'Открыть профиль',
    externalLinkLabel: 'откроется в новой вкладке',
    relatedLinks: { publications: 'Перейти к публикациям', profiles: 'Все научные профили' },
    futureDirections: [
      'Долгосрочный интерес связан с объединением диагностической визуализации, количественных анатомических данных и клинической поддержки принятия решений.',
      'Для искусственного интеллекта ключевыми остаются качество данных, воспроизводимость, объяснимость ограничений и проверка пользы в реальной ветеринарной практике.',
      'Международное взаимодействие представляет интерес для задач, где исследовательский вопрос, методы и вклад участников могут быть заранее определены и прозрачно описаны.',
    ],
  },
  en: {
    hero: [
      'My research interests concern veterinary medicine, diagnostic imaging, and methods that make clinical data more precise and interpretable.',
      'I am particularly interested in ultrasonography, radiographic anatomy, morphometry, clinical decision support, and the responsible application of artificial intelligence.',
    ],
    interests: [
      { title: 'Veterinary medicine', description: 'Clinical questions, diagnostics, and structured interpretation of data in the care of dogs and cats.' },
      { title: 'Diagnostic imaging', description: 'The use of visual methods to describe anatomy, identify changes, and refine clinical questions.' },
      { title: 'Veterinary ultrasonography', description: 'Examination technique, image quality, and interpretation of findings in clinical context.' },
      { title: 'Radiographic anatomy', description: 'Systematic description of anatomical structures and variation in radiographic images.' },
      { title: 'Morphometry', description: 'Quantitative description of form, dimensions, and anatomical relationships using reproducible measurements.' },
      { title: 'Clinical decision support', description: 'Structuring data and reasoning to help clinicians assess options without replacing professional judgement.' },
      { title: 'Artificial intelligence', description: 'Capabilities, limitations, and validation of digital tools for veterinary tasks.' },
    ],
    currentResearch: [
      'This page will describe only research questions and projects whose status can be stated accurately and verified.',
      'Until specific records are published, this section identifies areas of interest without implying completed studies, results, or collaborations.',
    ],
    publications: {
      title: 'Verified publications related to these themes',
      description: 'Relevant scientific work will appear here after its bibliographic data has been checked and added to the publications collection.',
    },
    patents: {
      title: 'Verified patent records',
      description: 'Patent material will be added only when a verifiable record and primary source are available. No records are currently published.',
    },
    profileLinkLabel: 'Open profile',
    externalLinkLabel: 'opens in a new tab',
    relatedLinks: { publications: 'View publications', profiles: 'All research profiles' },
    futureDirections: [
      'The long-term direction is to connect diagnostic imaging, quantitative anatomical data, and clinical decision support.',
      'For artificial intelligence, the central questions remain data quality, reproducibility, transparent limitations, and evidence of usefulness in veterinary practice.',
      'International collaboration is of interest where the research question, methods, and individual contributions can be defined in advance and described transparently.',
    ],
  },
};

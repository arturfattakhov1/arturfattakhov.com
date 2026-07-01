import type { Language } from '../i18n/config';

export const projectsPageCopy = {
  ru: {
    hero: 'Раздел описывает текущую профессиональную работу, будущие инициативы и долгосрочные направления развития. Здесь не публикуются названия или результаты проектов без подтверждённых данных.',
    focus: 'Текущая предпринимательская работа связана с развитием выездной ветеринарной службы для собак и кошек. В центре внимания находятся организация помощи на дому, понятные клинические процессы, последовательность решений и ответственное использование цифровых инструментов.',
    placeholder: {
      title: 'Будущие инициативы будут описываться отдельно',
      description: 'Карточка появится только после проверки публичного названия, цели, статуса, роли Артура Фаттахова и доступных первичных ссылок. Идеи и направления не будут представлены как действующие проекты.',
    },
    futureStructure: [
      { title: 'Непрерывность ветеринарной помощи', description: 'Долгосрочный ориентир — более последовательный путь пациента от первичного обращения до наблюдения и повторной оценки.' },
      { title: 'Качество клинических процессов', description: 'Развитие понятных и воспроизводимых рабочих подходов без подмены профессионального суждения.' },
      { title: 'Ответственное применение технологий', description: 'Использование цифровых инструментов и искусственного интеллекта только там, где их роль и ограничения можно объяснить и проверить.' },
    ],
    statusLabels: { active: 'Активный проект', completed: 'Завершён', paused: 'Приостановлен' },
  },
  en: {
    hero: 'This section describes current professional work, future initiatives, and long-term directions. Project names or outcomes are not published without verified supporting information.',
    focus: 'Current entrepreneurial work concerns the development of a home veterinary service for dogs and cats. The focus is on the organisation of care at home, clear clinical workflows, consistent decision-making, and responsible use of digital tools.',
    placeholder: {
      title: 'Future initiatives will be documented separately',
      description: 'A project card will appear only after its public name, purpose, status, Artur Fattakhov’s role, and available primary links have been verified. Ideas and directions will not be presented as active projects.',
    },
    futureStructure: [
      { title: 'Continuity of veterinary care', description: 'The long-term direction is a more consistent patient pathway from initial contact to follow-up and reassessment.' },
      { title: 'Quality of clinical processes', description: 'Developing clear and reproducible working approaches without replacing professional judgement.' },
      { title: 'Responsible use of technology', description: 'Using digital tools and artificial intelligence only where their role and limitations can be explained and evaluated.' },
    ],
    statusLabels: { active: 'Active project', completed: 'Completed', paused: 'Paused' },
  },
} as const satisfies Record<Language, Record<string, unknown>>;

export const mediaPageCopy = {
  ru: {
    hero: 'Здесь будут собраны проверенные интервью, лекции, статьи, видеоматериалы, подкасты и другие публичные выступления Артура Фаттахова. Каждая запись будет вести к исходной публикации и содержать точные сведения о формате, дате и площадке.',
    categories: [
      { id: 'interviews', title: 'Интервью' },
      { id: 'articles', title: 'Статьи' },
      { id: 'videos', title: 'Видео' },
      { id: 'podcasts', title: 'Подкасты' },
    ],
    placeholders: {
      interviews: { title: 'Проверенные интервью', description: 'Будут добавляться разговоры и комментарии, для которых доступны исходная публикация, дата и редакционная площадка.' },
      articles: { title: 'Статьи и экспертные комментарии', description: 'Будут добавляться только материалы с подтверждённым авторством или участием и ссылкой на издателя.' },
      videos: { title: 'Лекции и видеоматериалы', description: 'Будут добавляться записи с проверенными названием, датой, площадкой и описанием темы.' },
      podcasts: { title: 'Подкасты и аудиобеседы', description: 'Будут добавляться выпуски с исходной ссылкой и точным указанием формата участия.' },
    },
    contactCta: 'Направить медиа-запрос',
  },
  en: {
    hero: 'This page will collect verified interviews, lectures, articles, videos, podcasts, and other public appearances by Artur Fattakhov. Every record will link to the original publication and state the format, date, and publisher accurately.',
    categories: [
      { id: 'interviews', title: 'Interviews' },
      { id: 'articles', title: 'Articles' },
      { id: 'videos', title: 'Videos' },
      { id: 'podcasts', title: 'Podcasts' },
    ],
    placeholders: {
      interviews: { title: 'Verified interviews', description: 'Conversations and comments will be added when an original publication, date, and editorial source are available.' },
      articles: { title: 'Articles and expert commentary', description: 'Only material with confirmed authorship or participation and a publisher link will be included.' },
      videos: { title: 'Lectures and video material', description: 'Recordings will be added with a verified title, date, platform, and description of the subject.' },
      podcasts: { title: 'Podcasts and audio conversations', description: 'Episodes will be added with an original link and an accurate description of the form of participation.' },
    },
    contactCta: 'Send a media inquiry',
  },
} as const;

export const cvPageCopy = {
  ru: {
    hero: 'Профессиональное резюме объединяет подтверждённые сведения о клинической, исследовательской и предпринимательской работе. Хронология и документы будут добавляться только после проверки.',
    professionalProfile: 'Артур Фаттахов — ветеринарный врач, специалист по ультразвуковой диагностике, исследователь и предприниматель. Его профессиональные интересы включают ветеринарную медицину собак и кошек, диагностическую визуализацию, клиническую поддержку решений и искусственный интеллект.',
    placeholders: {
      education: 'Сведения об образовании будут добавлены после проверки.',
      research: 'Темы, статус и результаты исследовательской работы будут указываться только по проверяемым источникам.',
      clinicalPractice: 'Описание клинической практики будет добавлено без публикации неподтверждённых работодателей, должностей или показателей.',
      entrepreneurship: 'Подтверждённые сведения о предпринимательской работе будут отделены от планов и будущих инициатив.',
      skills: 'Профессиональные навыки будут описываться конкретно и только в пределах подтверждённого опыта.',
    },
    profileLinkLabel: 'Открыть профиль',
    externalLinkLabel: 'откроется в новой вкладке',
  },
  en: {
    hero: 'This professional CV brings together verified information about clinical, research, and entrepreneurial work. Chronology and supporting records will be added only after review.',
    professionalProfile: 'Artur Fattakhov is a veterinarian, veterinary ultrasound specialist, researcher, and entrepreneur. His professional interests include veterinary medicine for dogs and cats, diagnostic imaging, clinical decision support, and artificial intelligence.',
    placeholders: {
      education: 'Education details will be added after verification.',
      research: 'Research themes, status, and outcomes will be stated only where verifiable sources are available.',
      clinicalPractice: 'Clinical-practice information will be added without publishing unverified employers, positions, or metrics.',
      entrepreneurship: 'Verified entrepreneurial work will be distinguished clearly from plans and future initiatives.',
      skills: 'Professional skills will be described specifically and only within the limits of verified experience.',
    },
    profileLinkLabel: 'Open profile',
    externalLinkLabel: 'opens in a new tab',
  },
} as const;

export const usesPageCopy = {
  ru: {
    hero: 'Эта страница будет документировать инструменты, программы и технологии, которые регулярно используются в профессиональной работе. Список будет практическим: для каждого пункта важно объяснить задачу, контекст применения и ограничения.',
    sections: {
      tools: { title: 'Клинические и рабочие инструменты', description: 'Будут перечислены регулярно используемые инструменты с кратким объяснением их роли. Непроверенные рекомендации и рекламные формулировки не публикуются.' },
      software: { title: 'Программное обеспечение', description: 'В список войдут программы, которые используются для организации работы, анализа данных, подготовки материалов или коммуникации.' },
      clinicalWorkflow: { title: 'Клинический рабочий процесс', description: 'Раздел опишет, как инструменты поддерживают сбор информации, диагностику, документирование и последующее наблюдение, не заменяя клиническое решение.' },
      aiTools: { title: 'Инструменты искусственного интеллекта', description: 'Будут описаны только реально используемые инструменты с указанием задачи, способа проверки результата и известных ограничений.' },
    },
  },
  en: {
    hero: 'This page will document tools, software, and technologies used regularly in professional work. The list will be practical: every entry should explain its purpose, context of use, and limitations.',
    sections: {
      tools: { title: 'Clinical and working tools', description: 'Regularly used tools will be listed with a concise explanation of their role. Unverified recommendations and promotional claims will not be included.' },
      software: { title: 'Software', description: 'This list will cover software used to organise work, analyse data, prepare material, or communicate.' },
      clinicalWorkflow: { title: 'Clinical workflow', description: 'This section will explain how tools support information gathering, diagnostics, documentation, and follow-up without replacing clinical decisions.' },
      aiTools: { title: 'Artificial intelligence tools', description: 'Only tools used in practice will be documented, together with the task, the method used to review outputs, and known limitations.' },
    },
  },
} as const;

export const nowPageCopy = {
  ru: {
    hero: 'Страница фиксирует устойчивые профессиональные приоритеты без привязки к краткосрочным планам и датам. Она будет обновляться, когда направления работы действительно меняются.',
    personalWebsite: 'Развитие arturfattakhov.com как основного источника проверенной информации: профессионального профиля, исследовательских интересов, публикаций, проектов и официальных ссылок.',
    homeVeterinaryCare: 'Работа над выездной ветеринарной службой для собак и кошек, включая организацию клинических процессов, диагностику, документирование и последовательное наблюдение.',
    research: 'Формирование долгосрочных исследовательских направлений в области ветеринарной медицины, диагностической визуализации, рентгенографической анатомии, морфометрии и клинической поддержки решений.',
    ai: 'Изучение практического применения искусственного интеллекта с вниманием к качеству данных, проверке результатов, ограничениям инструментов и ответственности ветеринарного врача.',
  },
  en: {
    hero: 'This page records stable professional priorities rather than short-term plans or date-dependent updates. It will change when the underlying areas of work change materially.',
    personalWebsite: 'Developing arturfattakhov.com as the primary source for verified information: professional profile, research interests, publications, projects, and official links.',
    homeVeterinaryCare: 'Working on a home veterinary service for dogs and cats, including the organisation of clinical workflows, diagnostics, documentation, and continuity of follow-up.',
    research: 'Developing a long-term research agenda in veterinary medicine, diagnostic imaging, radiographic anatomy, morphometry, and clinical decision support.',
    ai: 'Examining practical uses of artificial intelligence with attention to data quality, review of outputs, tool limitations, and the veterinarian’s responsibility.',
  },
} as const;

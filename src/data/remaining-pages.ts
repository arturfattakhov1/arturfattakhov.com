import type { Language } from '../i18n/config';

export const projectsPageCopy = {
  ru: {
    opening: {
      eyebrow: 'Проекты',
      lead: 'На этой странице представлен один проект в разработке, связанный с ветеринарной помощью на дому для кошек и собак.',
      context: 'Раздел фиксирует только проверенное направление работы. Проект пока не имеет публичного названия, находится на ранней стадии и описывается здесь без коммерческих обещаний, сроков перехода к публичной работе или операционных заявлений.',
    },
    project: {
      label: 'Проект в разработке',
      subject: 'Ветеринарная служба на дому для кошек и собак',
      statusLabel: 'Статус',
      status: 'Ранняя стадия разработки',
      roleLabel: 'Роль',
      role: 'Основатель',
      description: 'Ветеринарная служба на дому для кошек и собак, разрабатываемая по модели controlled marketplace. Проект находится на ранней стадии: формируются базовые подходы к медицинской документации, сбору анамнеза и структуре клинического осмотра.',
      modelTitle: 'Предполагаемая модель',
      model: 'Controlled marketplace рассматривается как проектируемая система, в которой помощь может быть организована через стандартизированные процессы, единые ожидания к качеству, понятные рабочие документы и контролируемую структуру взаимодействия с ветеринарными специалистами.',
    },
    development: {
      lead: 'Сейчас существуют только ранние рабочие материалы. Они не являются финальными формами, утверждёнными стандартами или внедрёнными процессами.',
      items: [
        { title: 'Сбор анамнеза', description: 'Подготавливается предварительная структура вопросов и данных, которые могут быть важны перед домашним ветеринарным визитом.' },
        { title: 'Клинический осмотр', description: 'Формируется ранняя структура описания осмотра, чтобы будущая документация была последовательной и понятной.' },
        { title: 'Медицинская документация', description: 'Разрабатываются черновые подходы к записи клинической информации без утверждения финального формата.' },
        { title: 'Принципы стандартизации', description: 'Определяются базовые принципы, которые в дальнейшем могут поддерживать согласованность процессов помощи.' },
      ],
    },
    principles: {
      lead: 'Планируемое направление строится вокруг осторожного развития процессов, а не вокруг заявления о публичной доступности.',
      items: [
        { title: 'Помощь на дому', description: 'Предмет проекта — ветеринарная помощь кошкам и собакам в домашних условиях.' },
        { title: 'Документирование', description: 'В центре подготовки находятся анамнез, осмотр и структура медицинской записи.' },
        { title: 'Клиническая ответственность', description: 'Клиническое решение остаётся ответственностью ветеринарного врача.' },
        { title: 'Цифровые процессы', description: 'В дальнейшем могут рассматриваться цифровые инструменты и ИИ для поддержки административных и документальных процессов.' },
      ],
    },
    currentPosition: {
      lead: 'Проект остаётся направлением в разработке. На этой странице не предлагаются заявка на обслуживание, форма записи, дата начала работы или описание состава специалистов.',
      routesLabel: 'Связанные разделы',
      routes: {
        about: 'Профессиональный профиль',
        contact: 'Контактная страница',
        research: 'Исследовательский контекст',
      },
    },
  },
  en: {
    opening: {
      eyebrow: 'Projects',
      lead: 'This page presents one project in development connected with veterinary house-call care for cats and dogs.',
      context: 'The section records only the verified direction of work. The project does not yet have a public name, remains at an early development stage, and is described here without commercial promises, dates for public availability, or operational claims.',
    },
    project: {
      label: 'Project in development',
      subject: 'Veterinary house-call service for cats and dogs',
      statusLabel: 'Status',
      status: 'Early development stage',
      roleLabel: 'Role',
      role: 'Founder',
      description: 'A veterinary house-call service for cats and dogs being developed around a controlled marketplace model. The project is at an early stage, with foundational work focused on medical documentation, anamnesis structure, and clinical examination structure.',
      modelTitle: 'Intended model',
      model: 'Controlled marketplace is considered as a planned system in which care may be organized through standardized processes, shared quality expectations, clear working documents, and a controlled structure for collaboration with veterinary professionals.',
    },
    development: {
      lead: 'Only early working materials currently exist. They are not final forms, approved standards, or implemented workflows.',
      items: [
        { title: 'Anamnesis collection', description: 'A preliminary structure is being prepared for questions and data that may be relevant before a veterinary house call.' },
        { title: 'Clinical examination', description: 'An early examination structure is being shaped so future documentation can remain consistent and readable.' },
        { title: 'Medical documentation', description: 'Draft approaches to recording clinical information are being developed without presenting a final format.' },
        { title: 'Standardization principles', description: 'Foundational principles are being defined to later support consistency of care processes.' },
      ],
    },
    principles: {
      lead: 'The development direction is built around cautious process design, not around a claim of public availability.',
      items: [
        { title: 'House-call care', description: 'The subject of the project is veterinary care for cats and dogs at home.' },
        { title: 'Documentation', description: 'Preparation is focused on anamnesis, examination, and medical record structure.' },
        { title: 'Clinical responsibility', description: 'Veterinary clinical judgment remains the responsibility of the veterinarian.' },
        { title: 'Digital processes', description: 'Digital tools and AI may later be considered to support administrative and documentation processes.' },
      ],
    },
    currentPosition: {
      lead: 'The project remains a development direction. This page does not offer a service request, booking form, date for public availability, or description of the professionals involved.',
      routesLabel: 'Related sections',
      routes: {
        about: 'Professional profile',
        contact: 'Contact page',
        research: 'Research context',
      },
    },
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

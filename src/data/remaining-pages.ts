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
    opening: {
      eyebrow: 'Медиа',
      lead: 'Эта страница объединяет проверенные интервью, внешнее освещение научной работы и авторские медиа Артура Фаттахова.',
      context: 'Материалы сгруппированы по типу участия: прямое экспертное интервью, публикации о научном проекте, где профессиональная роль требует отдельного уточнения, и официальные каналы для авторских ветеринарных материалов.',
      contactCta: 'Направить медиа-запрос',
    },
    featuredInterview: {
      type: 'Текстовое интервью',
      title: 'Последний жест любви',
      url: 'https://vk.ru/@875007413-poslednii-zhest-lubvi',
      meta: [
        { label: 'Площадка', value: 'TO “WAY”' },
        { label: 'Дата', value: '10 мая 2026' },
        { label: 'Роль', value: 'Эксперт' },
        { label: 'Формат', value: 'Онлайн-текст' },
      ],
      description: 'Интервью посвящено теме эвтаназии животных и сложному решению, с которым может столкнуться владелец животного. На этой странице материал представлен как внешний экспертный комментарий без пересказа цитат.',
      linkLabel: 'Открыть исходное интервью',
    },
    scientificCoverage: {
      introduction: 'Следующие материалы относятся к публичному освещению экспериментальной имплантации тканеинженерного биоэквивалента мочеточника свинье. Это освещение научного проекта, а не интервью с Артуром Фаттаховым.',
      role: 'Артур Фаттахов участвовал в ветеринарном сопровождении экспериментальной работы в качестве анестезиолога, реаниматолога и врача интенсивной терапии.',
      primary: {
        type: 'Основной материал',
        title: 'Выйти в дренаж: ученые впервые пересадили искусственный мочеточник свинье',
        subtitle: 'Когда новую хирургическую технологию испытают на людях',
        url: 'https://iz.ru/1823909/maria-neduk/vyiti-v-drenaz-ucenye-vpervye-peresadili-iskusstvennyi-mocetocnik-svine',
        meta: [
          { label: 'Издание', value: 'Известия' },
          { label: 'Автор', value: 'Мария Недюк' },
          { label: 'Дата', value: '20 января 2025, 00:01' },
          { label: 'Фото', value: 'Сеченовский университет' },
        ],
        description: 'Длинный материал «Известий» описывает разработку и экспериментальную имплантацию биоэквивалента мочеточника. Роль Артура Фаттахова на этой странице ограничена ветеринарным сопровождением экспериментальной работы.',
        linkLabel: 'Открыть материал',
      },
      relatedTitle: 'Связанное освещение',
      related: [
        {
          type: 'Короткая новость',
          title: 'В России впервые пересадили биоинженерный мочеточник свинье',
          url: 'https://iz.ru/1824936/2025-01-20/v-rossii-vpervye-peresadili-bioinzenernyi-mocetocnik-svine',
          meta: [
            { label: 'Издание', value: 'Известия' },
            { label: 'Автор', value: 'Мария Недюк' },
            { label: 'Дата', value: '20 января 2025, 00:40' },
          ],
          description: 'Короткая новостная версия по той же теме. Она представлена как связанное освещение, а не как отдельное достижение.',
          linkLabel: 'Открыть новость',
        },
        {
          type: 'Научная новость',
          title: 'Российские ученые разработали и имплантировали свинье биоэквивалент мочеточника',
          url: 'https://naked-science.ru/article/column/svine-bioekvivalent-moche',
          meta: [
            { label: 'Площадка', value: 'Naked Science' },
            { label: 'Источник', value: 'Сеченовский Университет' },
            { label: 'Дата', value: '20 января 2025, 13:11' },
          ],
          description: 'Материал Naked Science относится к той же экспериментальной работе и включён как внешнее научное освещение проекта.',
          linkLabel: 'Открыть материал',
        },
      ],
    },
    ownedMedia: {
      introduction: 'Авторские медиа отделены от внешних публикаций. Они используются для профессиональной ветеринарной коммуникации и образовательных материалов для владельцев животных.',
      openChannel: 'Открыть канал',
      youtube: {
        platform: 'YouTube',
        title: 'Официальный YouTube-канал',
        description: 'Канал для ветеринарных образовательных материалов о симптомах, диагностике, профилактике и ситуациях, когда животному требуется внимание ветеринарного врача.',
      },
      dzen: {
        platform: 'Яндекс Дзен',
        title: 'Артур Фаттахов',
        url: 'https://dzen.ru/arturfattakhov',
        description: 'Авторский канал для ветеринарных образовательных материалов и профессионального объяснения тем, связанных со здоровьем животных.',
      },
    },
    context: {
      lead: 'Медиа-материалы дополняют профессиональный профиль, но не заменяют сведения об образовании, исследованиях, публикациях и клинической квалификации.',
      linksLabel: 'Связанные разделы',
      links: {
        about: 'О профессиональном пути',
        research: 'Исследования',
        publications: 'Публикации',
        contact: 'Контакты',
      },
    },
  },
  en: {
    opening: {
      eyebrow: 'Media',
      lead: 'This page brings together verified interviews, external coverage of scientific work, and owned media by Artur Fattakhov.',
      context: 'Records are grouped by form of participation: a direct expert interview, reporting on a scientific project where the professional role requires careful context, and official channels for authored veterinary material.',
      contactCta: 'Send a media inquiry',
    },
    featuredInterview: {
      type: 'Text interview',
      title: 'Последний жест любви',
      url: 'https://vk.ru/@875007413-poslednii-zhest-lubvi',
      meta: [
        { label: 'Outlet', value: 'TO “WAY”' },
        { label: 'Date', value: '10 May 2026' },
        { label: 'Role', value: 'Expert' },
        { label: 'Format', value: 'Online text' },
      ],
      description: 'The interview concerns animal euthanasia and the difficult decision a pet owner may face. It is presented here as an external expert interview without reproducing quotations.',
      linkLabel: 'Open original interview',
    },
    scientificCoverage: {
      introduction: 'The following materials cover the experimental implantation of a tissue-engineered ureter bioequivalent in a pig. They are coverage of a scientific project, not interviews with Artur Fattakhov.',
      role: 'Artur Fattakhov contributed to the veterinary support of the experimental work in anesthesiology, resuscitation, and intensive care.',
      primary: {
        type: 'Primary article',
        title: 'Выйти в дренаж: ученые впервые пересадили искусственный мочеточник свинье',
        subtitle: 'When the new surgical technology will be tested in humans',
        url: 'https://iz.ru/1823909/maria-neduk/vyiti-v-drenaz-ucenye-vpervye-peresadili-iskusstvennyi-mocetocnik-svine',
        meta: [
          { label: 'Outlet', value: 'Izvestia' },
          { label: 'Author', value: 'Maria Nedyuk' },
          { label: 'Date', value: '20 January 2025, 00:01' },
          { label: 'Photo credit', value: 'Sechenov University' },
        ],
        description: 'The long-form Izvestia article reports on the development and experimental implantation of the ureter bioequivalent. On this page, Artur Fattakhov’s role is limited to veterinary support of the experimental work.',
        linkLabel: 'Open article',
      },
      relatedTitle: 'Related coverage',
      related: [
        {
          type: 'Short news item',
          title: 'В России впервые пересадили биоинженерный мочеточник свинье',
          url: 'https://iz.ru/1824936/2025-01-20/v-rossii-vpervye-peresadili-bioinzenernyi-mocetocnik-svine',
          meta: [
            { label: 'Outlet', value: 'Izvestia' },
            { label: 'Author', value: 'Maria Nedyuk' },
            { label: 'Date', value: '20 January 2025, 00:40' },
          ],
          description: 'A shorter news version of the same topic. It is grouped as related coverage rather than presented as a separate achievement.',
          linkLabel: 'Open news item',
        },
        {
          type: 'Scientific news coverage',
          title: 'Российские ученые разработали и имплантировали свинье биоэквивалент мочеточника',
          url: 'https://naked-science.ru/article/column/svine-bioekvivalent-moche',
          meta: [
            { label: 'Outlet', value: 'Naked Science' },
            { label: 'Source', value: 'Sechenov University' },
            { label: 'Date', value: '20 January 2025, 13:11' },
          ],
          description: 'The Naked Science material concerns the same experimental work and is included as external scientific coverage of the project.',
          linkLabel: 'Open material',
        },
      ],
    },
    ownedMedia: {
      introduction: 'Owned media are separated from external publications. They are used for professional veterinary communication and educational material for pet owners.',
      openChannel: 'Open channel',
      youtube: {
        platform: 'YouTube',
        title: 'Official YouTube channel',
        description: 'A channel for veterinary educational material about symptoms, diagnostics, prevention, and situations when an animal needs veterinary attention.',
      },
      dzen: {
        platform: 'Yandex Zen',
        title: 'Artur Fattakhov',
        url: 'https://dzen.ru/arturfattakhov',
        description: 'An authored channel for veterinary educational materials and professional explanations of topics related to animal health.',
      },
    },
    context: {
      lead: 'Media materials support the professional profile, but they do not replace education, research, publications, or clinical qualifications.',
      linksLabel: 'Related sections',
      links: {
        about: 'Professional profile',
        research: 'Research',
        publications: 'Publications',
        contact: 'Contact',
      },
    },
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

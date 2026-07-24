import type { Language } from '../i18n/config';

export const bsavaCaseSlug = 'bsava-manual-ultrasonography';
export const bsavaCasePublishedDate = '2026-07-24';

interface CaseStudyCopy {
  label: string;
  h1: string;
  seoTitle: string;
  description: string;
  lead: string;
  result: {
    title: string;
    introduction: string;
    metrics: Array<{ value: string; label: string }>;
  };
  access: {
    title: string;
    paragraphs: string[];
  };
  problem: {
    title: string;
    paragraphs: string[];
  };
  diagnosis: {
    title: string;
    introduction: string;
    environmentLabel: string;
    environment: string[];
    findingsLabel: string;
    findings: string[];
  };
  restoration: {
    title: string;
    introduction: string;
    items: string[];
    screenshotAlt: string;
    screenshotCaption: string;
  };
  diagram: {
    title: string;
    introduction: string;
    steps: string[];
  };
  validation: {
    title: string;
    paragraphs: string[];
  };
  ai: {
    title: string;
    paragraphs: string[];
  };
  relevance: {
    title: string;
    paragraphs: string[];
    considerations: string[];
  };
  faq: {
    title: string;
    items: Array<{ question: string; answer: string }>;
  };
  collaboration: {
    title: string;
    paragraphs: string[];
    button: string;
  };
  ip: {
    title: string;
    paragraphs: string[];
  };
}

export const bsavaCaseStudyCopy: Record<Language, CaseStudyCopy> = {
  ru: {
    label: 'Независимый технический кейс',
    h1: 'Восстановление BSAVA Manual of Canine and Feline Ultrasonography для Apple Silicon и Windows 11',
    seoTitle: 'BSAVA Manual of Canine and Feline Ultrasonography: M1 и Windows 11',
    description: 'Независимый кейс восстановления BSAVA Manual of Canine and Feline Ultrasonography: MacBook M1, Windows 11 ARM, Flash/JW Player/FLV → HTML5 и 120 восстановленных видеофрагментов.',
    lead: 'Как сохранить знакомый интерфейс профессионального ветеринарного издания, заменить устаревший слой воспроизведения и собрать повторяемый локальный workflow без изменения исходных HTML-файлов.',
    result: {
      title: 'Результат',
      introduction: 'Исходное приложение продолжило работать в виртуализированной среде, а устаревший Flash/JW Player playback layer был заменён локальным HTML5-механизмом.',
      metrics: [
        { value: '120', label: 'обнаруженных и извлечённых FLV-видеофрагментов' },
        { value: '120', label: 'локальных MP4/H.264-файлов после конвертации' },
        { value: '1 действие', label: 'для повторного запуска рабочего окружения' },
      ],
    },
    access: {
      title: 'Ищете оригинальные видео BSAVA?',
      paragraphs: [
        'После завершения этого проекта в BSAVA сообщили мне, что видеоматериалы этого издания доступны через BSAVA Library. Владельцы старой копии книги, которые больше не могут использовать DVD, могут обратиться непосредственно в BSAVA по вопросу доступа.',
        'Эта страница не предоставляет и не распространяет материалы BSAVA.',
      ],
    },
    problem: {
      title: 'Исходная проблема',
      paragraphs: [
        'Legacy-версия BSAVA Manual of Canine and Feline Ultrasonography запускалась с подключённого ISO через D:\\BSAVA.exe в Windows 11 ARM внутри UTM на MacBook M1.',
        'Локальное приложение и его web interface продолжали работать. Неисправность находилась во встроенном воспроизведении: современная среда больше не поддерживала старую цепочку Flash, JW Player 5.3 и FLV.',
        'Цель состояла не в переносе материалов на новый сайт, а в восстановлении локального рабочего сценария с сохранением исходной структуры приложения.',
      ],
    },
    diagnosis: {
      title: 'Среда и техническая диагностика',
      introduction: 'Диагностика разделила работоспособный интерфейс и устаревший video playback layer. Это позволило ограничить изменение только слоем совместимости.',
      environmentLabel: 'Исходная среда',
      environment: ['MacBook M1', 'UTM', 'Windows 11 ARM', 'подключённый BSAVA ISO', 'D:\\BSAVA.exe'],
      findingsLabel: 'Установлено',
      findings: [
        'приложение использовало локальный web interface;',
        'видеоблок зависел от Flash, JW Player 5.3 и FLV;',
        'в составе были обнаружены 120 отдельных видеофрагментов;',
        'основной интерфейс не требовал полной замены.',
      ],
    },
    restoration: {
      title: 'Что было восстановлено',
      introduction: 'Решение сохранило исходный интерфейс BSAVA и добавило локальный compatibility layer для современного воспроизведения.',
      items: [
        'Все 120 обнаруженных FLV-файлов были извлечены и конвертированы в отдельный набор MP4/H.264.',
        'Локальное unpacked-расширение для Edge заменяет старый Flash/JW Player block стандартным HTML5 video и сопоставляет его с нужным локальным MP4.',
        'MP4-файлы обслуживаются локальным HTTP-сервисом; оригинальные HTML-файлы BSAVA напрямую не переписывались.',
        'Ярлык BSAVA Study запускает PowerShell launcher, который проверяет локальный HTTP-сервис и BSAVA.exe, запускает недостающие компоненты и ожидает готовность интерфейса.',
      ],
      screenshotAlt: 'Работающий HTML5-плеер внутри восстановленного интерфейса BSAVA Manual of Canine and Feline Ultrasonography',
      screenshotCaption: 'Рабочий HTML5-плеер внутри исходного локального интерфейса. Screenshot приведён только как контекстное подтверждение результата; материалы BSAVA через эту страницу не распространяются.',
    },
    diagram: {
      title: 'Слой совместимости',
      introduction: 'Архитектура отделяет виртуализированную legacy-среду от локального механизма современного воспроизведения.',
      steps: [
        'MacBook M1 / Apple Silicon',
        'UTM',
        'Windows 11 ARM',
        'Legacy BSAVA interface',
        'Browser extension',
        'HTML5 video',
        'Local MP4/H.264',
        'Local HTTP service',
      ],
    },
    validation: {
      title: 'Результат и проверка',
      paragraphs: [
        'Были извлечены и конвертированы все 120 обнаруженных видеофрагментов; работа восстановленного механизма воспроизведения была проверена в нескольких разделах и после повторного запуска системы.',
        'После перезагрузки Windows запуск ярлыком снова приводил к рабочему интерфейсу и воспроизведению видео. Это проверяет повторяемость workflow, но не означает, что каждый из 120 роликов был полностью просмотрен вручную.',
      ],
    },
    ai: {
      title: 'Роль ChatGPT и AI-assisted workflow',
      paragraphs: [
        'ChatGPT использовался как AI-assisted technical copilot для пошаговой диагностики legacy-системы, подготовки команд и скриптов, работы с FFmpeg, разработки browser extension, анализа ошибок и автоматизации запуска.',
        'Постановка задачи и критериев результата, выполнение действий, проверка системы и принятие решений оставались за автором проекта. Это практический пример того, как ветеринарный врач может использовать современные AI- и digital-инструменты для решения профессиональной технической задачи.',
      ],
    },
    relevance: {
      title: 'Применимость к другим legacy-системам',
      paragraphs: [
        'Похожий подход может быть полезен, когда профессиональный интерфейс ещё работает, а отдельный устаревший компонент — воспроизведение, runtime или интеграционный слой — перестал поддерживаться.',
      ],
      considerations: [
        'сначала необходимо проверить права на исходные материалы и допустимые способы использования;',
        'нужно отделить работающие части системы от несовместимого слоя;',
        'решение должно оставаться локальным и минимальным, если перенос данных не требуется;',
        'функциональная проверка должна соответствовать реальному пользовательскому сценарию.',
      ],
    },
    faq: {
      title: 'Краткие ответы',
      items: [
        {
          question: 'Работает ли BSAVA Manual of Canine and Feline Ultrasonography в Windows 11?',
          answer: 'В этом кейсе была восстановлена конкретная локальная конфигурация в Windows 11 ARM. Это не заявление об официальной поддержке со стороны BSAVA.',
        },
        {
          question: 'Можно ли запустить его на Mac с Apple Silicon?',
          answer: 'Здесь использовалась Windows 11 ARM внутри UTM на MacBook M1, а не нативное приложение для macOS.',
        },
        {
          question: 'Почему исходные видео перестали воспроизводиться?',
          answer: 'Встроенный playback layer зависел от устаревшей цепочки Flash, JW Player 5.3 и FLV, которая перестала нормально работать в современной среде.',
        },
        {
          question: 'Доступны ли оригинальные видео сейчас?',
          answer: 'BSAVA сообщила автору, что владельцы старой копии, которые больше не могут использовать DVD, могут обратиться непосредственно в BSAVA по вопросу доступа через BSAVA Library. Доступ не гарантируется этой страницей.',
        },
        {
          question: 'Можно ли скачать видео BSAVA здесь?',
          answer: 'Нет. Эта страница не размещает и не распространяет видео или другие материалы BSAVA.',
        },
        {
          question: 'Подойдёт ли этот подход для другого legacy veterinary software?',
          answer: 'Потенциально — после проверки прав, исходной системы и технических ограничений. Универсального решения или гарантии нет.',
        },
        {
          question: 'Можно ли связаться с Артуром по digital/AI-проекту или выступлению?',
          answer: 'Да. Для этого используется существующая страница контактов.',
        },
      ],
    },
    collaboration: {
      title: 'Есть похожая задача?',
      paragraphs: [
        'Если у вас есть legacy veterinary software, несовместимость профессионального ПО, AI/workflow-задача или образовательный digital-проект, опишите исходную систему, проблему и желаемый результат. Я оценю, имеет ли смысл техническое исследование или другой формат сотрудничества.',
        'Также можно обсудить лекцию, вебинар или разбор практического кейса об использовании AI и digital-инструментов в ветеринарии.',
      ],
      button: 'Обсудить сотрудничество',
    },
    ip: {
      title: 'Независимость и интеллектуальная собственность',
      paragraphs: [
        'Название BSAVA используется исключительно для идентификации исходного образовательного продукта. Это независимый технический кейс и не является официальным материалом, продуктом или проектом BSAVA и не подразумевает аффилированность или рекомендацию со стороны BSAVA. Материалы BSAVA через эту страницу не распространяются.',
        'В BSAVA подтвердили, что не возражают против публикации независимого технического case study на описанных условиях.',
      ],
    },
  },
  en: {
    label: 'Independent technical case study',
    h1: 'Restoring BSAVA Manual of Canine and Feline Ultrasonography for Apple Silicon and Windows 11',
    seoTitle: 'BSAVA Manual of Canine and Feline Ultrasonography: Apple Silicon and Windows 11',
    description: 'Independent case study restoring BSAVA Manual of Canine and Feline Ultrasonography on Apple Silicon and Windows 11 ARM: Flash/JW Player/FLV → HTML5 and 120 restored video clips.',
    lead: 'How a familiar professional veterinary interface was retained, its obsolete playback layer replaced, and a repeatable local workflow created without rewriting the original HTML files.',
    result: {
      title: 'Result',
      introduction: 'The original application continued to run in a virtualised environment while its obsolete Flash/JW Player playback layer was replaced with a local HTML5 mechanism.',
      metrics: [
        { value: '120', label: 'FLV video clips identified and extracted' },
        { value: '120', label: 'local MP4/H.264 files after conversion' },
        { value: 'One action', label: 'to restart the working environment' },
      ],
    },
    access: {
      title: 'Looking for the original BSAVA videos?',
      paragraphs: [
        'After this project was completed, BSAVA informed me that the video materials from this edition are available through the BSAVA Library. Owners of an older copy who can no longer use the DVD can contact BSAVA directly regarding access.',
        'This page does not provide or distribute BSAVA materials.',
      ],
    },
    problem: {
      title: 'The original problem',
      paragraphs: [
        'The legacy edition of BSAVA Manual of Canine and Feline Ultrasonography was launched from a mounted ISO through D:\\BSAVA.exe in Windows 11 ARM running in UTM on a MacBook M1.',
        'The local application and its web interface continued to work. The failure was confined to embedded video playback: the modern environment no longer supported the old Flash, JW Player 5.3, and FLV chain.',
        'The objective was not to republish the material on a new website, but to restore a local working scenario while retaining the original application structure.',
      ],
    },
    diagnosis: {
      title: 'Environment and technical diagnosis',
      introduction: 'The diagnosis separated the working interface from the obsolete video playback layer. This kept the intervention limited to a compatibility layer.',
      environmentLabel: 'Original environment',
      environment: ['MacBook M1', 'UTM', 'Windows 11 ARM', 'mounted BSAVA ISO', 'D:\\BSAVA.exe'],
      findingsLabel: 'Findings',
      findings: [
        'the application used a local web interface;',
        'the video block depended on Flash, JW Player 5.3, and FLV;',
        '120 separate video clips were identified;',
        'the main interface did not require wholesale replacement.',
      ],
    },
    restoration: {
      title: 'What was restored',
      introduction: 'The solution retained the original BSAVA interface and added a local compatibility layer for modern playback.',
      items: [
        'All 120 identified FLV files were extracted and converted into a separate MP4/H.264 set.',
        'A local unpacked Edge extension replaces the old Flash/JW Player block with a standard HTML5 video element and maps it to the corresponding local MP4.',
        'The MP4 files are served through a local HTTP service; the original BSAVA HTML files were not rewritten directly.',
        'A BSAVA Study desktop shortcut runs a PowerShell launcher that checks the local HTTP service and BSAVA.exe, starts missing components, and waits for the interface.',
      ],
      screenshotAlt: 'Working HTML5 player inside the restored BSAVA Manual of Canine and Feline Ultrasonography interface',
      screenshotCaption: 'The working HTML5 player inside the original local interface. This owner-provided screenshot is shown only as contextual evidence; BSAVA materials are not distributed through this page.',
    },
    diagram: {
      title: 'Compatibility layer',
      introduction: 'The architecture separates the virtualised legacy environment from the local modern playback mechanism.',
      steps: [
        'MacBook M1 / Apple Silicon',
        'UTM',
        'Windows 11 ARM',
        'Legacy BSAVA interface',
        'Browser extension',
        'HTML5 video',
        'Local MP4/H.264',
        'Local HTTP service',
      ],
    },
    validation: {
      title: 'Result and validation',
      paragraphs: [
        'All 120 identified video clips were extracted and converted; the restored playback workflow was tested across multiple sections and after restarting the system.',
        'After a Windows reboot, launching the shortcut again produced a working interface and video playback. This validates the repeatable workflow; it does not mean that all 120 clips were watched manually in full.',
      ],
    },
    ai: {
      title: 'The role of ChatGPT and the AI-assisted workflow',
      paragraphs: [
        'ChatGPT was used as an AI-assisted technical copilot for step-by-step diagnosis of the legacy system, preparing commands and scripts, working with FFmpeg, developing the browser extension, analysing errors, and automating startup.',
        'Defining the problem and acceptance criteria, carrying out the actions, testing the system, and making decisions remained the project author’s responsibility. This is a practical example of a veterinary doctor using modern AI and digital tools to solve a professional technical problem.',
      ],
    },
    relevance: {
      title: 'Relevance to other legacy systems',
      paragraphs: [
        'A similar approach may help when a professional interface still works but one obsolete component — playback, a runtime, or an integration layer — is no longer supported.',
      ],
      considerations: [
        'rights to the original material and permitted uses must be reviewed first;',
        'working parts should be separated from the incompatible layer;',
        'the solution should remain local and minimal when data migration is unnecessary;',
        'functional validation should reflect the real user workflow.',
      ],
    },
    faq: {
      title: 'Concise answers',
      items: [
        {
          question: 'Does BSAVA Manual of Canine and Feline Ultrasonography work on Windows 11?',
          answer: 'This case restored one specific local configuration in Windows 11 ARM. It is not a statement of official BSAVA support.',
        },
        {
          question: 'Can it run on an Apple Silicon Mac?',
          answer: 'This case used Windows 11 ARM inside UTM on a MacBook M1 rather than native macOS compatibility.',
        },
        {
          question: 'Why did the original videos stop playing?',
          answer: 'The embedded playback layer depended on the obsolete Flash, JW Player 5.3, and FLV chain, which no longer worked normally in the modern environment.',
        },
        {
          question: 'Are the original videos still available?',
          answer: 'BSAVA informed the author that owners of an older copy who can no longer use the DVD can contact BSAVA directly regarding access through the BSAVA Library. This page does not guarantee access.',
        },
        {
          question: 'Can I download the BSAVA videos here?',
          answer: 'No. This page does not host or distribute BSAVA videos or other BSAVA materials.',
        },
        {
          question: 'Could a similar approach work for other legacy veterinary software?',
          answer: 'Potentially, after reviewing the rights, the original system, and its technical constraints. There is no universal solution or guarantee.',
        },
        {
          question: 'Can I contact Artur about a digital/AI project or speaking engagement?',
          answer: 'Yes. Use the existing Contact page.',
        },
      ],
    },
    collaboration: {
      title: 'Have a similar problem or project?',
      paragraphs: [
        'If you are dealing with legacy veterinary software, professional-software compatibility, an AI-assisted workflow or an educational digital project, describe the original system, the problem and the intended outcome. I can assess whether a technical investigation or another form of collaboration makes sense.',
        'The same case can also be discussed as a guest lecture, webinar, workshop or professional case-study session.',
      ],
      button: 'Discuss collaboration',
    },
    ip: {
      title: 'Independence and intellectual property',
      paragraphs: [
        'BSAVA is referenced solely to identify the original educational product. This is an independent technical case study and is not affiliated with or endorsed by BSAVA. BSAVA educational materials are not distributed through this page.',
        'BSAVA confirmed that it did not object to publication of this independent technical case study on the described terms.',
      ],
    },
  },
};

import type { Language } from '../i18n/config';

interface ResearchPageCopy {
  opening: {
    statement: string;
    introduction: string;
    publicationsLink: string;
  };
  question: {
    introduction: string;
    paragraphs: string[];
  };
  focus: {
    introduction: string;
    items: Array<{ title: string; description: string }>;
  };
  approach: {
    introduction: string;
    items: Array<{ label: string; description: string }>;
  };
  outputs: {
    introduction: string;
    articleLabel: string;
    patentLabel: string;
    recordLink: string;
    relevance: Record<string, string>;
  };
  practice: {
    paragraphs: string[];
  };
  profiles: {
    introduction: string;
    linksLabel: string;
    allProfiles: string;
    related: {
      publications: string;
      about: string;
      knowledge: string;
      timeline: string;
      faq: string;
      contact: string;
    };
  };
  profileLinkLabel: string;
  externalLinkLabel: string;
}

export const researchPageCopy: Record<Language, ResearchPageCopy> = {
  ru: {
    opening: {
      statement: 'Исследовательская работа связана со сравнительной анатомией, ветеринарной морфологией и рентгеноморфометрией дистального отдела конечностей.',
      introduction: 'Главный смысл этой страницы — показать, как анатомическое наблюдение, визуальное представление и измерение структур помогают формулировать более точные диагностические вопросы в ветеринарной медицине.',
      publicationsLink: 'Открыть публикации',
    },
    question: {
      introduction: 'Центральный исследовательский вопрос расположен между строением тканей, рентгенографическим изображением и диагностической интерпретацией.',
      paragraphs: [
        'Дистальный отдел конечностей крупного рогатого скота и лося позволяет рассматривать, как сходные функциональные области могут отличаться по анатомическим и морфометрическим характеристикам.',
        'Рентгеноморфометрия в этом контексте используется как способ описывать измеримые признаки, а не как самостоятельная замена клиническому заключению.',
      ],
    },
    focus: {
      introduction: 'Направление не разделяется на независимые темы. Сравнительная анатомия, морфометрия и диагностическое изображение здесь работают как связанные уровни описания.',
      items: [
        {
          title: 'Сравнительная анатомия',
          description: 'Сопоставление структур дистального отдела конечностей у крупного рогатого скота и лося.',
        },
        {
          title: 'Ветеринарная морфология',
          description: 'Описание копытец, пальцевых структур и микроморфологических характеристик в пределах проверенных публикаций.',
        },
        {
          title: 'Рентгеноморфометрия',
          description: 'Измеримое описание рентгенографически представленных структур и их связи с диагностической оценкой.',
        },
        {
          title: 'Диагностическая интерпретация',
          description: 'Аккуратное связывание структурных измерений с ветеринарным диагностическим контекстом без расширения выводов за пределы записи.',
        },
      ],
    },
    approach: {
      introduction: 'Доступные проверенные записи позволяют говорить только о методологических элементах, прямо связанных с опубликованными названиями, аннотациями и описаниями.',
      items: [
        {
          label: 'Материал',
          description: 'Дистальные структуры конечностей, копытца и сравнительный материал крупного рогатого скота и лося.',
        },
        {
          label: 'Представление',
          description: 'Рентгенографическое описание и визуальная оценка структур, где это указано в записях.',
        },
        {
          label: 'Измерение',
          description: 'Морфометрическое описание формы, размеров и анатомических соотношений без указания неподтверждённых протоколов.',
        },
        {
          label: 'Интерпретация',
          description: 'Сопоставление анатомического описания и диагностической задачи с явными границами доступных данных.',
        },
      ],
    },
    outputs: {
      introduction: 'Проверенный результат этого направления представлен двумя журнальными статьями и зарегистрированным патентом. Полные библиографические данные находятся на отдельных страницах записей.',
      articleLabel: 'Журнальная статья',
      patentLabel: 'Патент',
      recordLink: 'Открыть полную запись',
      relevance: {
        'comparative-xray-morphometry-moose-cattle': 'Связывает сравнительную анатомию с рентгеноморфометрическим описанием дистального отдела конечностей лося и крупного рогатого скота.',
        'hoof-capsule-cattle-moose': 'Фокусируется на микроморфологических характеристиках копытец крупного рогатого скота и лося.',
        'xray-morphometric-laminitis-cattle-patent': 'Фиксирует зарегистрированный способ рентгеноморфометрической диагностики ламинита у крупного рогатого скота.',
      },
    },
    practice: {
      paragraphs: [
        'Исследовательская работа поддерживает профессиональную привычку формулировать диагностические выводы через наблюдаемые признаки, контекст и проверяемые данные.',
        'Для клинической ветеринарной практики такой подход важен не как готовый протокол, а как дисциплина точного описания, осторожной интерпретации и ясной коммуникации ограничений.',
      ],
    },
    profiles: {
      introduction: 'Академические профили используются как внешние точки проверки авторства, идентификаторов и библиографических записей. Они не представлены как награды или внешнее признание.',
      linksLabel: 'Связанные маршруты',
      allProfiles: 'Все официальные профили',
      related: {
        publications: 'Все публикации',
        about: 'Профессиональный профиль',
        knowledge: 'База знаний',
        timeline: 'Хронология',
        faq: 'Вопросы и ответы',
        contact: 'Контакты',
      },
    },
    profileLinkLabel: 'Открыть профиль',
    externalLinkLabel: 'откроется в новой вкладке',
  },
  en: {
    opening: {
      statement: 'The research work is connected with comparative anatomy, veterinary morphology, and radiographic morphometry of distal limb structures.',
      introduction: 'The purpose of this page is to show how anatomical observation, visual representation, and structural measurement can support more precise diagnostic questions in veterinary medicine.',
      publicationsLink: 'Open publications',
    },
    question: {
      introduction: 'The central research question sits between tissue structure, radiographic image, and diagnostic interpretation.',
      paragraphs: [
        'Distal limb structures in cattle and moose provide verified comparative material for describing how related functional regions may differ in anatomical and morphometric characteristics.',
        'Radiographic morphometry is presented here as a way to describe measurable features, not as a substitute for clinical judgement.',
      ],
    },
    focus: {
      introduction: 'The subject is not treated as a set of separate interests. Comparative anatomy, morphometry, and diagnostic imaging function as connected levels of description.',
      items: [
        {
          title: 'Comparative anatomy',
          description: 'Comparison of distal limb structures in cattle and moose.',
        },
        {
          title: 'Veterinary morphology',
          description: 'Description of hoof capsules, digit structures, and micromorphological characteristics within the verified publications.',
        },
        {
          title: 'Radiographic morphometry',
          description: 'Measurable description of radiographically represented structures and their relationship to diagnostic assessment.',
        },
        {
          title: 'Diagnostic interpretation',
          description: 'Careful connection of structural measurement with veterinary diagnostic context without extending conclusions beyond the record.',
        },
      ],
    },
    approach: {
      introduction: 'The verified records support only methodological language directly connected to the published titles, abstracts, and descriptions.',
      items: [
        {
          label: 'Material',
          description: 'Distal limb structures, hoof capsules, and comparative material involving cattle and moose.',
        },
        {
          label: 'Representation',
          description: 'Radiographic description and visual assessment of structures where stated in the records.',
        },
        {
          label: 'Measurement',
          description: 'Morphometric description of form, dimensions, and anatomical relationships without adding unsupported protocols.',
        },
        {
          label: 'Interpretation',
          description: 'Connection between anatomical description and diagnostic question with the limits of available data kept explicit.',
        },
      ],
    },
    outputs: {
      introduction: 'The verified output of this direction is represented by two journal articles and one registered patent. Complete bibliographic data is kept on the individual record pages.',
      articleLabel: 'Journal article',
      patentLabel: 'Patent',
      recordLink: 'Open full record',
      relevance: {
        'comparative-xray-morphometry-moose-cattle': 'Connects comparative anatomy with radiographic morphometric description of distal extremities in moose and cattle.',
        'hoof-capsule-cattle-moose': 'Focuses on micromorphological characteristics of the hoof capsule in cattle and moose.',
        'xray-morphometric-laminitis-cattle-patent': 'Records a registered method for X-ray morphometric diagnosis of laminitis in cattle.',
      },
    },
    practice: {
      paragraphs: [
        'The research work supports a professional habit of framing diagnostic conclusions through observable signs, context, and verifiable evidence.',
        'For clinical veterinary practice, this matters not as a ready-made protocol, but as a discipline of precise description, careful interpretation, and clear communication of limits.',
      ],
    },
    profiles: {
      introduction: 'Academic profiles are used as external routes for verifying authorship, identifiers, and bibliographic records. They are not presented as awards or endorsements.',
      linksLabel: 'Related routes',
      allProfiles: 'All official profiles',
      related: {
        publications: 'All publications',
        about: 'Professional profile',
        knowledge: 'Knowledge',
        timeline: 'Timeline',
        faq: 'FAQ',
        contact: 'Contact',
      },
    },
    profileLinkLabel: 'Open profile',
    externalLinkLabel: 'opens in a new tab',
  },
};

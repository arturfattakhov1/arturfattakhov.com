import type { Language } from '../i18n/config';
import { publicationRecords } from './publication-records';

type ProfileKey = 'orcid' | 'googleScholar' | 'researchGate' | 'webOfScience' | 'github' | 'youtube';

interface LabelValue {
  label: string;
  value: string;
}

export type EducationRecordId = 'research-teaching' | 'veterinary-doctor';
export type ExperienceRecordId = 'private-practice' | 'sechenov-analyst' | 'aspect-research-regulatory';
export type PrimaryTrainingRecordId = 'diagnostic-imaging-course' | 'veterinary-pharma' | 'veterinary-diagnostics' | 'glp' | 'molecular-genetics';

interface EducationRecord {
  id: EducationRecordId;
  year: string;
  organization: string;
  shortOrganization?: string;
  qualification: string;
  note?: string;
}

interface ExperienceRecord {
  id: ExperienceRecordId;
  period: string;
  role: string;
  organization: string;
  secondaryOrganization?: string;
  location?: string;
  department?: string;
  laboratory?: string;
  description: string;
  responsibilities: readonly string[];
  result?: string;
}

interface TrainingRecord {
  title: string;
  organization?: string;
  period: string;
  certificate?: string;
}

interface PrimaryTrainingRecord extends TrainingRecord {
  id: PrimaryTrainingRecordId;
}

interface CompetencyGroup {
  title: string;
  items: readonly string[];
}

export interface CvPageCopy {
  opening: {
    eyebrow: string;
    lead: string;
    context: string;
    linksLabel: string;
    links: {
      publications: string;
      profiles: string;
    };
  };
  education: {
    introduction: string;
    records: readonly EducationRecord[];
  };
  experience: {
    introduction: string;
    records: readonly ExperienceRecord[];
  };
  research: {
    introduction: string;
    topics: readonly string[];
    linksLabel: string;
    links: {
      research: string;
      publications: string;
    };
  };
  qualifications: {
    introduction: string;
    primary: readonly PrimaryTrainingRecord[];
    additionalTitle: string;
    additional: readonly TrainingRecord[];
  };
  output: {
    introduction: string;
    labels: {
      journal: string;
      conference: string;
      patent: string;
    };
    linksLabel: string;
    links: {
      publications: string;
      research: string;
    };
  };
  competencies: {
    introduction: string;
    groups: readonly CompetencyGroup[];
  };
  languages: {
    records: readonly LabelValue[];
  };
  profiles: {
    introduction: string;
    keys: readonly ProfileKey[];
    openLabel: string;
    externalLabel: string;
  };
}

export const cvPageCopy: Record<Language, CvPageCopy> = {
  ru: {
    opening: {
      eyebrow: 'CV',
      lead: 'Формальная профессиональная хронология Артура Фаттахова: образование, клиническая практика, исследовательская работа, квалификации и профессиональные компетенции.',
      context: 'CV дополняет раздел «Обо мне»: здесь собраны проверяемые сведения о ролях, организациях, датах, квалификациях, научных результатах и официальных профилях без расширения фактов за пределы подтверждённых данных.',
      linksLabel: 'Полные записи',
      links: {
        publications: 'Публикации',
        profiles: 'Профили',
      },
    },
    education: {
      introduction: 'Образование представлено как завершённая профессиональная подготовка. Записи не создают текущий академический статус.',
      records: [
        {
          id: 'research-teaching',
          year: '2024',
          organization: 'Московская государственная академия ветеринарной медицины и биотехнологии имени К. И. Скрябина',
          shortOrganization: 'МГАВМиБ - МВА имени К. И. Скрябина',
          qualification: 'Исследователь. Преподаватель-исследователь',
          note: 'Подготовка завершена в 2024 году; диплом о квалификации выдан в 2026 году.',
        },
        {
          id: 'veterinary-doctor',
          year: '2021',
          organization: 'Санкт-Петербургский государственный университет ветеринарной медицины',
          shortOrganization: 'СПбГУВМ',
          qualification: 'Ветеринарный врач',
        },
      ],
    },
    experience: {
      introduction: 'Профессиональный опыт указан в обратном хронологическом порядке. Официальные должности и фактические функции разделены там, где это важно для точности.',
      records: [
        {
          id: 'private-practice',
          period: 'Июль 2025 - настоящее время',
          role: 'Основатель и ветеринарный врач',
          organization: 'Частная ветеринарная практика',
          location: 'Приозерск, Ленинградская область',
          description: 'Частная практика в сфере выездной ветеринарной помощи кошкам и собакам.',
          responsibilities: [
            'выездная ветеринарная помощь кошкам и собакам',
            'сбор анамнеза и клинический осмотр',
            'визуальная диагностика',
            'ведение медицинской документации',
            'коммуникация с владельцами животных',
            'разработка стандартов клинического визита',
            'организация и развитие частной ветеринарной практики',
            'совершенствование рабочих процессов и документации',
          ],
        },
        {
          id: 'sechenov-analyst',
          period: 'Июнь 2024 - декабрь 2024',
          role: 'Аналитик',
          organization: 'Первый Московский государственный медицинский университет имени И. М. Сеченова Министерства здравоохранения Российской Федерации',
          secondaryOrganization: 'Сеченовский Университет',
          department: 'Институт регенеративной медицины',
          laboratory: 'Лаборатория регенеративной ветеринарии',
          location: 'Москва',
          description: 'Официальная должность — аналитик. Фактические функции были связаны с ветеринарным сопровождением экспериментальных исследований.',
          responsibilities: [
            'ветеринарное сопровождение экспериментальной работы',
            'анестезиологическое обеспечение',
            'реанимация и интенсивная терапия в рамках экспериментальной работы',
            'периоперационный мониторинг',
            'послеоперационное наблюдение и уход',
            'участие в подготовке экспериментальных исследований',
            'участие в разработке дизайна отдельных этапов экспериментов',
            'наложение швов и базовые хирургические манипуляции в пределах фактически выполнявшихся функций',
            'участие в подготовке материалов и отчётности по грантовым проектам',
            'работа в междисциплинарной команде',
            'практические демонстрации и мастер-классы для магистрантов',
          ],
        },
        {
          id: 'aspect-research-regulatory',
          period: 'Июль 2022 - январь 2023',
          role: 'Ветеринарный специалист по научно-исследовательской и регуляторной работе',
          organization: 'АГ «Аспект»',
          secondaryOrganization: 'Астрафарм',
          description: 'Работа с научной, регуляторной и регистрационной документацией для лекарственных препаратов ветеринарного применения.',
          responsibilities: [
            'подготовка документов для регистрации лекарственных препаратов ветеринарного применения',
            'участие в формировании регистрационных досье',
            'обзор научной литературы',
            'подготовка научных текстов и статей',
            'работа с документацией',
            'командная работа',
            'отбор биологических образцов у лабораторных животных',
            'участие в научно-исследовательских процедурах',
          ],
          result: 'Участие в формировании регистрационного досье лекарственного препарата ветеринарного применения для подачи в уполномоченные государственные органы.',
        },
      ],
    },
    research: {
      introduction: 'Исследовательский опыт связан с ветеринарной морфологией, сравнительной анатомией, рентгеноморфометрией и ветеринарным сопровождением экспериментальных работ.',
      topics: [
        'сравнительная анатомия',
        'ветеринарная морфология',
        'рентгеноморфометрия',
        'морфология дистального отдела конечностей',
        'копытце',
        'крупный рогатый скот',
        'лось',
        'экспериментальная регенеративная медицина',
        'ветеринарное сопровождение доклинических и экспериментальных работ',
      ],
      linksLabel: 'Связанные разделы',
      links: {
        research: 'Исследования',
        publications: 'Публикации',
      },
    },
    qualifications: {
      introduction: 'В разделе указаны профильные квалификации, дополнительное обучение и подтверждённое участие в профессиональных образовательных форматах.',
      primary: [
        {
          id: 'diagnostic-imaging-course',
          title: 'Профильный курс «Ветеринарный врач визуальной диагностики»',
          organization: 'ВЕТ ВОРКШОП',
          period: '24 ноября 2025 - 10 марта 2026',
          certificate: '№ 407',
        },
        {
          id: 'veterinary-pharma',
          title: 'Специалист в сфере обращения лекарственных средств ветеринарного применения (фармацевтическая деятельность)',
          organization: 'СПбГУВМ',
          period: '30 апреля 2021',
        },
        {
          id: 'veterinary-diagnostics',
          title: 'Ветеринарная диагностика',
          organization: 'СПбГУВМ',
          period: '12-16 апреля 2021',
          certificate: '№ 19',
        },
        {
          id: 'glp',
          title: 'Организация и проведение неклинических (доклинических) исследований по международному стандарту надлежащей лабораторной практики (GLP)',
          period: '7 марта 2024',
        },
        {
          id: 'molecular-genetics',
          title: 'Молекулярно-генетические технологии в диагностике и профилактике инфекционных болезней животных',
          organization: 'ФГБУ «ВНИИЗЖ»',
          period: '17-18 ноября 2022',
        },
      ],
      additionalTitle: 'Дополнительное обучение и участие',
      additional: [
        { title: 'Национальная ветеринарная конференция', organization: 'NVC', period: '19-21 октября 2022' },
        { title: 'XV Международная научно-практическая конференция «Балтийский форум ветеринарной медицины и продовольственной безопасности 2018»', period: '19-21 сентября 2018' },
        { title: 'Управление проектами в медицинской организации', organization: 'Сеченовский Университет', period: '8 ноября 2025' },
        { title: 'Машинное обучение', organization: 'Омский государственный технический университет', period: '9 ноября 2025' },
        { title: 'Биотех: ИИ в медицине', organization: 'Финансовый университет при Правительстве Российской Федерации', period: '8 ноября 2025' },
      ],
    },
    output: {
      introduction: 'Научные результаты представлены кратко. Полные библиографические записи, идентификаторы и страницы отдельных материалов находятся в разделе публикаций.',
      labels: {
        journal: 'журнальные статьи',
        conference: 'конференционные тезисы',
        patent: 'патент Российской Федерации',
      },
      linksLabel: 'Полные записи',
      links: {
        publications: 'Открыть публикации',
        research: 'Исследовательский контекст',
      },
    },
    competencies: {
      introduction: 'Компетенции сгруппированы по областям профессиональной работы без рейтингов, шкал и неподтверждённых уровней.',
      groups: [
        {
          title: 'Клиническая практика',
          items: [
            'ветеринарная медицина мелких домашних животных',
            'сбор анамнеза и клинический осмотр',
            'визуальная диагностика',
            'выездная ветеринарная помощь',
            'ведение медицинской документации',
            'базовые хирургические манипуляции',
            'анестезиологическое обеспечение',
            'периоперационный мониторинг',
            'послеоперационное наблюдение и уход',
          ],
        },
        {
          title: 'Исследования',
          items: [
            'сравнительная анатомия',
            'ветеринарная морфология',
            'рентгеноморфометрия',
            'обзор научной литературы',
            'научное письмо',
            'подготовка материалов к публикации',
            'работа с лабораторными животными',
            'участие в экспериментальной работе',
            'выступления на научных конференциях',
            'практическое обучение и демонстрации',
          ],
        },
        {
          title: 'Регуляторная и организационная работа',
          items: [
            'документация для лекарственных препаратов ветеринарного применения',
            'участие в подготовке регистрационных досье',
            'стандартизация клинической документации',
            'разработка рабочих процессов',
            'развитие частной ветеринарной практики',
            'ветеринарное предпринимательство',
          ],
        },
        {
          title: 'Прикладное использование ИИ',
          items: [
            'Прикладное и ответственное использование ИИ для поддержки клинических решений, работы с медицинской документацией, научных задач, создания программных прототипов и автоматизации рабочих процессов.',
          ],
        },
      ],
    },
    languages: {
      records: [
        { label: 'Русский', value: 'родной' },
        { label: 'Английский', value: 'B2, самостоятельная оценка' },
      ],
    },
    profiles: {
      introduction: 'Официальные профили помогают связать CV с научными идентификаторами, библиографическими записями и публичными профессиональными каналами.',
      keys: ['orcid', 'googleScholar', 'researchGate', 'webOfScience', 'github', 'youtube'],
      openLabel: 'Открыть профиль',
      externalLabel: 'откроется в новой вкладке',
    },
  },
  en: {
    opening: {
      eyebrow: 'CV',
      lead: 'A formal professional chronology for Artur Fattakhov: education, clinical practice, research work, qualifications, and professional competencies.',
      context: 'The CV complements the About page by collecting verifiable information about roles, organizations, dates, qualifications, research output, and official profiles without expanding beyond confirmed facts.',
      linksLabel: 'Full records',
      links: {
        publications: 'Publications',
        profiles: 'Profiles',
      },
    },
    education: {
      introduction: 'Education is presented as completed professional training. These records do not create a current academic status.',
      records: [
        {
          id: 'research-teaching',
          year: '2024',
          organization: 'Moscow State Academy of Veterinary Medicine and Biotechnology named after K. I. Skryabin',
          qualification: 'Researcher. Teacher-Researcher',
          note: 'Postgraduate research training completed in 2024; diploma issued in 2026.',
        },
        {
          id: 'veterinary-doctor',
          year: '2021',
          organization: 'Saint Petersburg State University of Veterinary Medicine',
          qualification: 'Veterinary Doctor',
        },
      ],
    },
    experience: {
      introduction: 'Professional experience is listed in reverse chronological order. Official roles and factual functions are separated where accuracy requires it.',
      records: [
        {
          id: 'private-practice',
          period: 'July 2025 - Present',
          role: 'Founder and Veterinary Doctor',
          organization: 'Private Veterinary Practice',
          location: 'Priozersk, Leningrad Region, Russia',
          description: 'Private practice in house-call veterinary care for cats and dogs.',
          responsibilities: [
            'house-call veterinary care for cats and dogs',
            'history taking and clinical examination',
            'diagnostic imaging',
            'veterinary medical documentation',
            'communication with animal owners',
            'development of standardized clinical visit workflows',
            'organization and development of a private veterinary practice',
            'improvement of clinical workflows and documentation',
          ],
        },
        {
          id: 'sechenov-analyst',
          period: 'June 2024 - December 2024',
          role: 'Analyst',
          organization: 'I.M. Sechenov First Moscow State Medical University',
          secondaryOrganization: 'Sechenov University',
          department: 'Institute for Regenerative Medicine',
          laboratory: 'Laboratory of Regenerative Veterinary Medicine',
          location: 'Moscow, Russia',
          description: 'Official role: Analyst. Factual functions were connected with veterinary support for experimental research.',
          responsibilities: [
            'veterinary support for experimental research',
            'anesthesiology support',
            'resuscitation and intensive care within experimental work',
            'perioperative monitoring',
            'postoperative observation and care',
            'preparation of experimental studies',
            'contribution to the design of selected experimental stages',
            'suturing and basic surgical procedures within the assigned role',
            'contribution to grant-related materials and reporting',
            'multidisciplinary collaboration',
            "practical demonstrations and workshops for master's students",
          ],
        },
        {
          id: 'aspect-research-regulatory',
          period: 'July 2022 - January 2023',
          role: 'Veterinary Research Specialist',
          organization: 'Aspect Group',
          secondaryOrganization: 'Astrafarm',
          description: 'Work with scientific, regulatory, and registration documentation for veterinary medicinal products.',
          responsibilities: [
            'preparation of documentation for registration of veterinary medicinal products',
            'contribution to regulatory dossiers',
            'scientific literature review',
            'scientific writing and article preparation',
            'documentation work',
            'multidisciplinary collaboration',
            'biological sample collection from laboratory animals',
            'participation in research procedures',
          ],
          result: 'Contributed to the preparation of a regulatory dossier for a veterinary medicinal product for submission to the competent authorities.',
        },
      ],
    },
    research: {
      introduction: 'Research experience is connected with veterinary morphology, comparative anatomy, radiomorphometry, and veterinary support for experimental work.',
      topics: [
        'comparative anatomy',
        'veterinary morphology',
        'radiomorphometry',
        'distal limb morphology',
        'digits and hooves',
        'cattle',
        'moose',
        'experimental regenerative medicine',
        'veterinary support for preclinical and experimental research',
      ],
      linksLabel: 'Related sections',
      links: {
        research: 'Research',
        publications: 'Publications',
      },
    },
    qualifications: {
      introduction: 'This section lists professional qualifications, continuing education, and verified participation in professional educational formats.',
      primary: [
        {
          id: 'diagnostic-imaging-course',
          title: 'Professional Course: Veterinary Diagnostic Imaging',
          organization: 'Vet Workshop',
          period: '24 November 2025 - 10 March 2026',
          certificate: 'No. 407',
        },
        {
          id: 'veterinary-pharma',
          title: 'Specialist in the Circulation of Veterinary Medicinal Products (Pharmaceutical Activities)',
          organization: 'Saint Petersburg State University of Veterinary Medicine',
          period: '30 April 2021',
        },
        {
          id: 'veterinary-diagnostics',
          title: 'Veterinary Diagnostics',
          organization: 'Saint Petersburg State University of Veterinary Medicine',
          period: '12-16 April 2021',
          certificate: 'No. 19',
        },
        {
          id: 'glp',
          title: 'Organization and Conduct of Nonclinical (Preclinical) Studies under Good Laboratory Practice (GLP)',
          period: '7 March 2024',
        },
        {
          id: 'molecular-genetics',
          title: 'Molecular Genetic Technologies in the Diagnosis and Prevention of Infectious Animal Diseases',
          organization: 'FGBI ARRIAH',
          period: '17-18 November 2022',
        },
      ],
      additionalTitle: 'Additional education and participation',
      additional: [
        { title: 'National Veterinary Conference', organization: 'NVC', period: '19-21 October 2022' },
        { title: 'XV International Scientific and Practical Conference “Baltic Forum of Veterinary Medicine and Food Safety 2018”', period: '19-21 September 2018' },
        { title: 'Project Management in a Medical Organization', organization: 'Sechenov University', period: '8 November 2025' },
        { title: 'Machine Learning', organization: 'Omsk State Technical University', period: '9 November 2025' },
        { title: 'Biotech: AI in Medicine', organization: 'Financial University under the Government of the Russian Federation', period: '8 November 2025' },
      ],
    },
    output: {
      introduction: 'Research output is summarized compactly. Full bibliographic records, identifiers, and individual pages are available in Publications.',
      labels: {
        journal: 'journal articles',
        conference: 'conference abstracts',
        patent: 'Russian patent',
      },
      linksLabel: 'Full records',
      links: {
        publications: 'Open publications',
        research: 'Research context',
      },
    },
    competencies: {
      introduction: 'Competencies are grouped by area of professional work without ratings, scales, or unverified proficiency levels.',
      groups: [
        {
          title: 'Clinical practice',
          items: [
            'companion animal medicine',
            'history taking and clinical examination',
            'diagnostic imaging',
            'house-call veterinary care',
            'veterinary medical documentation',
            'basic surgical procedures',
            'anesthesiology support',
            'perioperative monitoring',
            'postoperative observation and care',
          ],
        },
        {
          title: 'Research',
          items: [
            'comparative anatomy',
            'veterinary morphology',
            'radiomorphometry',
            'scientific literature review',
            'scientific writing',
            'preparation of publication materials',
            'laboratory animal procedures',
            'participation in experimental research',
            'conference presentations',
            'practical teaching and demonstrations',
          ],
        },
        {
          title: 'Regulatory and organizational work',
          items: [
            'veterinary medicinal product documentation',
            'contribution to regulatory dossiers',
            'standardization of clinical documentation',
            'workflow development',
            'development of a private veterinary practice',
            'veterinary entrepreneurship',
          ],
        },
        {
          title: 'Applied AI',
          items: [
            'Responsible application of AI for clinical decision support, medical documentation, research tasks, software prototyping, and workflow automation.',
          ],
        },
      ],
    },
    languages: {
      records: [
        { label: 'Russian', value: 'Native' },
        { label: 'English', value: 'B2, self-assessed' },
      ],
    },
    profiles: {
      introduction: 'Official profiles connect this CV with research identifiers, bibliographic records, and public professional channels.',
      keys: ['orcid', 'googleScholar', 'researchGate', 'webOfScience', 'github', 'youtube'],
      openLabel: 'Open profile',
      externalLabel: 'opens in a new tab',
    },
  },
};

export function getResearchOutputSummary(lang: Language) {
  const journal = publicationRecords.filter((record) => record.type === 'journal').length;
  const conference = publicationRecords.filter((record) => record.type === 'conference').length;
  const patent = publicationRecords.filter((record) => record.type === 'patent').length;
  const labels = cvPageCopy[lang].output.labels;

  return [
    { value: journal, label: labels.journal },
    { value: conference, label: labels.conference },
    { value: patent, label: labels.patent },
  ] as const;
}

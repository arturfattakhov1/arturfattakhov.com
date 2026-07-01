import type { Language } from '../i18n/config';

interface TimelineMilestone {
  title: string;
  description: string;
}

interface TimelinePageCopy {
  hero: string;
  sectionTitle: string;
  verifiedTitle: string;
  verifiedIntro: string;
  yearHeadings: Record<'2021' | '2024' | '2025', string>;
  publicationsCta: string;
  milestones: TimelineMilestone[];
  closing: string;
}

export const timelinePageCopy: Record<Language, TimelinePageCopy> = {
  ru: {
    hero: 'Профессиональная хронология будет объединять только проверенные этапы образования, клинической работы, исследований, публикаций и проектов. Даты не указываются до подтверждения первичными документами или официальными источниками.',
    sectionTitle: 'Структура профессиональной хронологии',
    verifiedTitle: 'Проверенные публикационные этапы',
    verifiedIntro: 'Ниже указаны только годы, подтверждённые библиографическими и патентными записями.',
    yearHeadings: {
      '2021': '2021 — публикации конференций',
      '2024': '2024 — публикации конференций',
      '2025': '2025 — журнальные статьи и патент',
    },
    publicationsCta: 'Все публикации и патент',
    milestones: [
      { title: 'Образование', description: 'Подтверждённые образовательные этапы будут добавлены с точными названиями, датами и доступными документами.' },
      { title: 'Клиническая практика', description: 'Проверенные этапы ветеринарной практики будут описаны без неподтверждённых работодателей, должностей или показателей.' },
      { title: 'Исследования', description: 'Исследовательские этапы будут появляться после уточнения темы, статуса, периода и проверяемого результата.' },
      { title: 'Публикации', description: 'Публикационные события будут связаны с полной библиографической записью и первоисточником.' },
      { title: 'Патенты', description: 'Патентные этапы будут добавляться только при наличии официальной записи и проверяемого идентификатора.' },
      { title: 'Сертификаты', description: 'Сертификаты будут указываться после проверки названия, выдавшей стороны и даты.' },
      { title: 'Проекты', description: 'Этапы проектов будут отражать подтверждённую роль, статус и публично доступные сведения.' },
      { title: 'Будущие этапы', description: 'Новые достижения будут добавляться по мере их появления и только после проверки фактических данных.' },
    ],
    closing: 'Хронология будет расширяться постепенно. Порядок и даты станут окончательными только после проверки каждого этапа.',
  },
  en: {
    hero: 'The professional timeline will contain only verified milestones in education, clinical work, research, publications, and projects. Dates will not be stated until they are supported by primary documents or official sources.',
    sectionTitle: 'Professional timeline framework',
    verifiedTitle: 'Verified publication milestones',
    verifiedIntro: 'Only years supported by bibliographic and patent records are listed below.',
    yearHeadings: {
      '2021': '2021 — conference publications',
      '2024': '2024 — conference publications',
      '2025': '2025 — journal articles and patent',
    },
    publicationsCta: 'All publications and patent',
    milestones: [
      { title: 'Education', description: 'Verified education milestones will be added with accurate names, dates, and available supporting records.' },
      { title: 'Clinical Practice', description: 'Verified stages of veterinary practice will be described without unconfirmed employers, positions, or metrics.' },
      { title: 'Research', description: 'Research milestones will appear after the subject, status, period, and verifiable outcome have been established.' },
      { title: 'Publications', description: 'Publication milestones will link to a complete bibliographic record and the original source.' },
      { title: 'Patents', description: 'Patent milestones will be added only when an official record and verifiable identifier are available.' },
      { title: 'Certificates', description: 'Certificates will be listed after the title, issuing body, and date have been checked.' },
      { title: 'Projects', description: 'Project milestones will reflect a verified role, status, and publicly available information.' },
      { title: 'Future Milestones', description: 'New achievements will be added as they occur and only after the relevant facts have been verified.' },
    ],
    closing: 'The timeline will expand gradually. Its order and dates will become final only after each milestone has been reviewed.',
  },
};

import type { Language } from '../i18n/config';
import { localizedPath } from '../i18n/config';
import {
  cvPageCopy,
  type EducationRecordId,
  type ExperienceRecordId,
  type PrimaryTrainingRecordId,
} from './cv';
import { publicationPath, publicationRecords } from './publication-records';

export type TimelineCategory = 'education' | 'practice' | 'researchExperience' | 'researchOutput' | 'qualification';

export type TimelineEntryId =
  | 'diagnostic-imaging-qualification'
  | 'private-practice'
  | 'patent-2025'
  | 'journal-publications-2025'
  | 'research-teaching-qualification'
  | 'sechenov-analyst'
  | 'conference-publications-2024'
  | 'aspect-research-regulatory'
  | 'veterinary-education'
  | 'conference-publications-2021';

interface TimelineLink {
  readonly href: string;
  readonly label: string;
}

export interface TimelineEntry {
  readonly id: TimelineEntryId;
  readonly period: string;
  readonly datetime: string;
  readonly category: TimelineCategory;
  readonly title: string;
  readonly summary: string;
  readonly source: string;
  readonly link?: TimelineLink;
  readonly current?: boolean;
}

interface TimelineContextLink {
  readonly href: string;
  readonly title: string;
  readonly description: string;
}

interface TimelinePageCopy {
  readonly opening: {
    readonly eyebrow: string;
    readonly lead: string;
    readonly context: string;
  };
  readonly chronologyTitle: string;
  readonly categories: Record<TimelineCategory, string>;
  readonly contextTitle: string;
  readonly contextIntro: string;
  readonly contextLabel: string;
  readonly contextLinks: readonly Omit<TimelineContextLink, 'href'>[];
  readonly certificateLabel: string;
  readonly output: {
    readonly journalsTitle: string;
    readonly journalsSummary: (count: number, year: number) => string;
    readonly conferencesTitle: string;
    readonly conferencesSummary: (count: number, year: number) => string;
    readonly patentSummary: (number: string) => string;
  };
  readonly entryLinks: {
    readonly qualification: string;
    readonly journal: string;
    readonly patent: string;
    readonly research: string;
  };
}

export const timelinePageCopy: Record<Language, TimelinePageCopy> = {
  ru: {
    opening: {
      eyebrow: 'Профессиональная хронология',
      lead: 'Хронология объединяет выбранные подтверждённые этапы образования, профессиональной практики, исследовательской работы и научных результатов Артура Фаттахова.',
      context: 'Это выборочная последовательность существенных этапов. Полные сведения об опыте и квалификациях находятся в CV, а библиографические записи — в разделе публикаций.',
    },
    chronologyTitle: 'Выбранные этапы',
    categories: {
      education: 'Образование',
      practice: 'Профессиональная практика',
      researchExperience: 'Исследовательский опыт',
      researchOutput: 'Научный результат',
      qualification: 'Квалификация',
    },
    contextTitle: 'Связанные полные записи',
    contextIntro: 'Подробности разделены между профильными страницами, чтобы хронология оставалась компактной и не дублировала CV или архив публикаций.',
    contextLabel: 'Подробные сведения по хронологии',
    contextLinks: [
      { title: 'CV', description: 'Образование, профессиональный опыт и квалификации.' },
      { title: 'Исследования', description: 'Исследовательские вопросы, методы и направления работы.' },
      { title: 'Публикации', description: 'Полные проверенные библиографические и патентные записи.' },
    ],
    certificateLabel: 'документ',
    output: {
      journalsTitle: 'Журнальные статьи',
      journalsSummary: (count, year) => `В централизованном архиве подтверждены журнальные статьи за ${year} год: ${count}.`,
      conferencesTitle: 'Материалы конференций',
      conferencesSummary: (count, year) => `В централизованном архиве подтверждены публикации в материалах конференций за ${year} год: ${count}.`,
      patentSummary: (number) => `Зарегистрированный патент Российской Федерации ${number}.`,
    },
    entryLinks: {
      qualification: 'Открыть квалификации в CV',
      journal: 'Открыть публикации 2025 года',
      patent: 'Открыть запись патента',
      research: 'Открыть исследовательский контекст',
    },
  },
  en: {
    opening: {
      eyebrow: 'Professional timeline',
      lead: "The timeline brings together selected verified milestones in Artur Fattakhov's education, professional practice, research work, and scholarly output.",
      context: 'This is a selective sequence of material milestones. Full experience and qualification records are kept in the CV, while complete bibliographic records are available in Publications.',
    },
    chronologyTitle: 'Selected milestones',
    categories: {
      education: 'Education',
      practice: 'Professional practice',
      researchExperience: 'Research experience',
      researchOutput: 'Research output',
      qualification: 'Qualification',
    },
    contextTitle: 'Related full records',
    contextIntro: 'Details are separated across the relevant pages so the timeline remains compact and does not duplicate the CV or publication archive.',
    contextLabel: 'Detailed timeline records',
    contextLinks: [
      { title: 'CV', description: 'Education, professional experience, and qualifications.' },
      { title: 'Research', description: 'Research questions, methods, and areas of work.' },
      { title: 'Publications', description: 'Complete verified bibliographic and patent records.' },
    ],
    certificateLabel: 'certificate',
    output: {
      journalsTitle: 'Journal articles',
      journalsSummary: (count, year) => `${count} journal articles from ${year} are verified in the centralized archive.`,
      conferencesTitle: 'Conference publications',
      conferencesSummary: (count, year) => `${count} conference publications from ${year} are verified in the centralized archive.`,
      patentSummary: (number) => `Registered Russian Federation patent ${number}.`,
    },
    entryLinks: {
      qualification: 'Open qualifications in the CV',
      journal: 'Open 2025 publications',
      patent: 'Open the patent record',
      research: 'Open the research context',
    },
  },
};

function requireRecord<T extends { id: string }>(records: readonly T[], id: T['id'], source: string): T {
  const record = records.find((candidate) => candidate.id === id);
  if (!record) throw new Error(`Missing verified Timeline source: ${source}:${String(id)}`);
  return record;
}

function firstYear(value: string): string {
  return value.match(/\b20\d{2}\b/)?.[0] ?? value;
}

function sourceSummary(parts: readonly (string | undefined)[]): string {
  return parts.filter((part): part is string => Boolean(part)).join(' · ');
}

export function getTimelineEntries(lang: Language): readonly TimelineEntry[] {
  const copy = timelinePageCopy[lang];
  const cv = cvPageCopy[lang];
  const researchEducation = requireRecord(cv.education.records, 'research-teaching' satisfies EducationRecordId, 'cv:education');
  const veterinaryEducation = requireRecord(cv.education.records, 'veterinary-doctor' satisfies EducationRecordId, 'cv:education');
  const privatePractice = requireRecord(cv.experience.records, 'private-practice' satisfies ExperienceRecordId, 'cv:experience');
  const sechenovAnalyst = requireRecord(cv.experience.records, 'sechenov-analyst' satisfies ExperienceRecordId, 'cv:experience');
  const aspectExperience = requireRecord(cv.experience.records, 'aspect-research-regulatory' satisfies ExperienceRecordId, 'cv:experience');
  const imagingQualification = requireRecord(cv.qualifications.primary, 'diagnostic-imaging-course' satisfies PrimaryTrainingRecordId, 'cv:qualification');
  const journal2025 = publicationRecords.filter((record) => record.type === 'journal' && record.year === 2025);
  const conference2024 = publicationRecords.filter((record) => record.type === 'conference' && record.year === 2024);
  const conference2021 = publicationRecords.filter((record) => record.type === 'conference' && record.year === 2021);
  const patent2025 = publicationRecords.find((record) => record.type === 'patent' && record.year === 2025);

  if (journal2025.length === 0 || conference2024.length === 0 || conference2021.length === 0 || !patent2025?.patentNumber) {
    throw new Error('Timeline requires verified publication records for 2021, 2024, and 2025.');
  }

  return [
    {
      id: 'diagnostic-imaging-qualification',
      period: imagingQualification.period,
      datetime: '2026',
      category: 'qualification',
      title: imagingQualification.title,
      summary: sourceSummary([imagingQualification.organization, `${copy.certificateLabel}: ${imagingQualification.certificate}`]),
      source: `cv:qualification:${imagingQualification.id}`,
      link: { href: localizedPath(lang, 'cv'), label: copy.entryLinks.qualification },
    },
    {
      id: 'private-practice',
      period: privatePractice.period,
      datetime: firstYear(privatePractice.period),
      category: 'practice',
      title: privatePractice.role,
      summary: sourceSummary([privatePractice.organization, privatePractice.description]),
      source: `cv:experience:${privatePractice.id}`,
      current: true,
    },
    {
      id: 'patent-2025',
      period: String(patent2025.year),
      datetime: String(patent2025.year),
      category: 'researchOutput',
      title: patent2025.title[lang],
      summary: copy.output.patentSummary(patent2025.patentNumber),
      source: `publication:${patent2025.slug}`,
      link: { href: publicationPath(lang, patent2025.slug), label: copy.entryLinks.patent },
    },
    {
      id: 'journal-publications-2025',
      period: '2025',
      datetime: '2025',
      category: 'researchOutput',
      title: copy.output.journalsTitle,
      summary: copy.output.journalsSummary(journal2025.length, 2025),
      source: 'publications:journal:2025',
      link: { href: localizedPath(lang, 'publications'), label: copy.entryLinks.journal },
    },
    {
      id: 'research-teaching-qualification',
      period: researchEducation.year,
      datetime: researchEducation.year,
      category: 'education',
      title: researchEducation.qualification,
      summary: sourceSummary([researchEducation.organization, researchEducation.note]),
      source: `cv:education:${researchEducation.id}`,
    },
    {
      id: 'sechenov-analyst',
      period: sechenovAnalyst.period,
      datetime: firstYear(sechenovAnalyst.period),
      category: 'researchExperience',
      title: sechenovAnalyst.role,
      summary: sourceSummary([sechenovAnalyst.organization, sechenovAnalyst.secondaryOrganization, sechenovAnalyst.description]),
      source: `cv:experience:${sechenovAnalyst.id}`,
      link: { href: localizedPath(lang, 'research'), label: copy.entryLinks.research },
    },
    {
      id: 'conference-publications-2024',
      period: '2024',
      datetime: '2024',
      category: 'researchOutput',
      title: copy.output.conferencesTitle,
      summary: copy.output.conferencesSummary(conference2024.length, 2024),
      source: 'publications:conference:2024',
    },
    {
      id: 'aspect-research-regulatory',
      period: aspectExperience.period,
      datetime: firstYear(aspectExperience.period),
      category: 'researchExperience',
      title: aspectExperience.role,
      summary: sourceSummary([aspectExperience.organization, aspectExperience.secondaryOrganization, aspectExperience.description]),
      source: `cv:experience:${aspectExperience.id}`,
    },
    {
      id: 'veterinary-education',
      period: veterinaryEducation.year,
      datetime: veterinaryEducation.year,
      category: 'education',
      title: veterinaryEducation.qualification,
      summary: sourceSummary([veterinaryEducation.organization, veterinaryEducation.shortOrganization]),
      source: `cv:education:${veterinaryEducation.id}`,
    },
    {
      id: 'conference-publications-2021',
      period: '2021',
      datetime: '2021',
      category: 'researchOutput',
      title: copy.output.conferencesTitle,
      summary: copy.output.conferencesSummary(conference2021.length, 2021),
      source: 'publications:conference:2021',
    },
  ];
}

export function getTimelineContextLinks(lang: Language): readonly TimelineContextLink[] {
  const routes = ['cv', 'research', 'publications'] as const;
  return timelinePageCopy[lang].contextLinks.map((link, index) => ({
    ...link,
    href: localizedPath(lang, routes[index]),
  }));
}

export function getTimelineSchemaItems(lang: Language) {
  const timelinePath = localizedPath(lang, 'timeline');
  return getTimelineEntries(lang).map((entry) => ({
    name: `${entry.period}: ${entry.title}`,
    url: `${timelinePath}#timeline-${entry.id}`,
  }));
}

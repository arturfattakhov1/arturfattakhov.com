import type { Language } from '../i18n/config';
import { localizedPath } from '../i18n/config';
import { aboutPageCopy } from './about';
import { contactPageCopy } from './contact';
import { cvPageCopy } from './cv';
import { identity, schemaIds } from './identity';
import { collectionPageContent, pageContent } from './pages';
import { publicationPath, publicationRecords } from './publication-records';
import { researchPageCopy } from './research';
import { breadcrumbId, webpageId } from './structured-data';

type LocalizedText = Readonly<Record<Language, string>>;

export type FaqGroupId =
  | 'professional-profile'
  | 'veterinary-practice'
  | 'research-publications'
  | 'site-contact';

export type FaqQuestionId =
  | 'who-is-artur'
  | 'professional-system'
  | 'education'
  | 'professional-experience'
  | 'veterinary-patients'
  | 'diagnostic-imaging-qualification'
  | 'imaging-context'
  | 'medical-information'
  | 'research-focus'
  | 'publication-record'
  | 'patent-record'
  | 'research-profiles'
  | 'website-sections'
  | 'timeline-purpose'
  | 'professional-contact';

export type FaqSource =
  | 'about:identity'
  | 'about:professional-system'
  | 'about:diagnostic-context'
  | 'contact:form'
  | 'cv:education'
  | 'cv:experience'
  | 'cv:qualification'
  | 'identity:profiles'
  | 'legal:disclaimer'
  | 'pages:routes'
  | 'publications:records'
  | 'publications:patent'
  | 'research:focus'
  | 'timeline:records';

interface FaqLink {
  href: string;
  label: string;
}

export interface FaqItem {
  id: FaqQuestionId;
  question: string;
  answer: string;
  sources: readonly FaqSource[];
  link?: FaqLink;
  defaultOpen?: boolean;
}

export interface FaqGroup {
  id: FaqGroupId;
  title: string;
  introduction: string;
  items: readonly FaqItem[];
}

interface FaqItemDefinition {
  id: FaqQuestionId;
  question: LocalizedText;
  answer: (lang: Language) => string;
  sources: readonly FaqSource[];
  link?: (lang: Language) => FaqLink;
  defaultOpen?: boolean;
}

interface FaqGroupDefinition {
  id: FaqGroupId;
  title: LocalizedText;
  introduction: LocalizedText;
  items: readonly FaqItemDefinition[];
}

interface FaqPageCopy {
  opening: {
    eyebrow: string;
    lead: string;
    context: string;
  };
  topicsLabel: string;
  groups: readonly FaqGroup[];
  related: {
    title: string;
    introduction: string;
    label: string;
    links: readonly FaqLink[];
  };
}

function requireRecord<T extends { id: string }>(records: readonly T[], id: T['id'], source: string): T {
  const record = records.find((candidate) => candidate.id === id);
  if (!record) throw new Error(`Missing verified FAQ source: ${source}:${String(id)}`);
  return record;
}

const patentCandidate = publicationRecords.find((record) => record.type === 'patent');
if (!patentCandidate?.patentNumber) throw new Error('FAQ requires one verified patent record with a patent number.');
const patentRecord = patentCandidate;

const publicationCounts = {
  journal: publicationRecords.filter((record) => record.type === 'journal').length,
  conference: publicationRecords.filter((record) => record.type === 'conference').length,
  patent: publicationRecords.filter((record) => record.type === 'patent').length,
} as const;

function pageLink(route: string, labels: LocalizedText): (lang: Language) => FaqLink {
  return (lang) => ({ href: localizedPath(lang, route), label: labels[lang] });
}

function educationAnswer(lang: Language): string {
  const records = cvPageCopy[lang].education.records;
  const veterinary = requireRecord(records, 'veterinary-doctor', 'cv:education');
  const research = requireRecord(records, 'research-teaching', 'cv:education');

  return lang === 'ru'
    ? `${veterinary.organization}: квалификация «${veterinary.qualification}», завершение в ${veterinary.year} году. ${research.organization}: квалификация «${research.qualification}». ${research.note} Это завершённая квалификация, а не учёная степень.`
    : `${veterinary.organization}: ${veterinary.qualification}, completed in ${veterinary.year}. ${research.organization}: ${research.qualification}. ${research.note} It is recorded as a completed qualification, not a scientific degree.`;
}

function experienceAnswer(lang: Language): string {
  const records = cvPageCopy[lang].experience.records;
  const practice = requireRecord(records, 'private-practice', 'cv:experience');
  const analyst = requireRecord(records, 'sechenov-analyst', 'cv:experience');
  const regulatory = requireRecord(records, 'aspect-research-regulatory', 'cv:experience');

  return lang === 'ru'
    ? `В CV представлены три типа опыта: «${practice.organization}»; официальная должность «${analyst.role}» — «${analyst.secondaryOrganization}»; исследовательская и регуляторная работа — «${regulatory.organization} / ${regulatory.secondaryOrganization}». Полные периоды и функции приведены в CV.`
    : `Verified records include ${practice.organization}, the official role of ${analyst.role} at ${analyst.secondaryOrganization}, and research and regulatory experience at ${regulatory.organization} / ${regulatory.secondaryOrganization}. Full periods and functions are listed in the CV.`;
}

function practiceAnswer(lang: Language): string {
  const practice = requireRecord(cvPageCopy[lang].experience.records, 'private-practice', 'cv:experience');
  const responsibilities = practice.responsibilities.slice(0, 4).join(lang === 'ru' ? ', ' : ', ');

  return lang === 'ru'
    ? `${practice.description} В записи указаны следующие профессиональные функции: ${responsibilities}.`
    : `${practice.description} Professional functions include ${responsibilities}.`;
}

function qualificationAnswer(lang: Language): string {
  const qualification = requireRecord(cvPageCopy[lang].qualifications.primary, 'diagnostic-imaging-course', 'cv:qualification');
  const certificate = qualification.certificate
    ? lang === 'ru' ? ` Документ: ${qualification.certificate}.` : ` Certificate: ${qualification.certificate}.`
    : '';

  return lang === 'ru'
    ? `${qualification.title} пройден в период ${qualification.period}. Организация: ${qualification.organization}.${certificate}`
    : `${qualification.title} was completed during ${qualification.period}. Provider: ${qualification.organization}.${certificate}`;
}

function publicationsAnswer(lang: Language): string {
  return lang === 'ru'
    ? `Проверенный архив уже содержит ${publicationCounts.journal} журнальные статьи и ${publicationCounts.conference} конференционных публикаций или тезисов. Для каждой записи доступны библиографические сведения и ссылка на источник, если она подтверждена.`
    : `The verified archive already contains ${publicationCounts.journal} journal articles and ${publicationCounts.conference} conference publications or abstracts. Each record provides bibliographic details and a source link when one has been verified.`;
}

function patentAnswer(lang: Language): string {
  return lang === 'ru'
    ? `В ${patentRecord.year} году зарегистрирован патент Российской Федерации ${patentRecord.patentNumber} «${patentRecord.title.ru}». Запись не заявляет внедрение, коммерциализацию или международную патентную защиту.`
    : `Russian Federation patent ${patentRecord.patentNumber}, “${patentRecord.title.en},” was registered in ${patentRecord.year}. The record does not claim implementation, commercialization, or international patent protection.`;
}

function profileAnswer(lang: Language): string {
  const researchProfileKeys = new Set(['orcid', 'googleScholar', 'researchGate', 'webOfScience']);
  const profiles = identity.profiles
    .filter((profile) => researchProfileKeys.has(profile.key))
    .map((profile) => profile.name)
    .join(', ');

  return lang === 'ru'
    ? `Авторство и библиографические записи представлены в разделе «Публикации». На странице «Профессиональные профили» собраны подтверждённые исследовательские идентификаторы и профили: ${profiles}.`
    : `Authorship and bibliographic records are presented in Publications. Professional Profiles collects the verified research identifiers and profiles: ${profiles}.`;
}

function websiteSectionsAnswer(lang: Language): string {
  const standard = pageContent[lang];
  const sections = [
    standard.about.title,
    standard.research.title,
    collectionPageContent.publications[lang].title,
    standard.media.title,
    standard.cv.title,
    standard.contact.title,
    standard.profiles.title,
    standard.timeline.title,
    standard.faq.title,
  ].join(', ');

  return lang === 'ru'
    ? `Сайт уже содержит разделы: ${sections}. Они доступны сейчас и отвечают за разные типы подтверждённой информации.`
    : `The website already contains these sections: ${sections}. They are currently available and present distinct types of verified information.`;
}

const faqGroupDefinitions: readonly FaqGroupDefinition[] = [
  {
    id: 'professional-profile',
    title: { ru: 'Профессиональный профиль', en: 'Professional profile' },
    introduction: {
      ru: 'Роли, образование и подтверждённый опыт.',
      en: 'Roles, education, and verified experience.',
    },
    items: [
      {
        id: 'who-is-artur',
        question: { ru: 'Кто такой Артур Фаттахов?', en: 'Who is Artur Fattakhov?' },
        answer: (lang) => {
          const roles = aboutPageCopy[lang].opening.roles.map((role) => lang === 'ru' ? `${role[0].toLowerCase()}${role.slice(1)}` : role);
          return `${aboutPageCopy[lang].opening.name} — ${roles.join(', ')}.`;
        },
        sources: ['about:identity'],
        link: pageLink('about', { ru: 'Открыть профессиональный профиль', en: 'Open the professional profile' }),
      },
      {
        id: 'professional-system',
        question: {
          ru: 'Как связаны клиническая практика, визуальная диагностика и исследования?',
          en: 'How are clinical practice, diagnostic imaging, and research connected?',
        },
        answer: (lang) => aboutPageCopy[lang].professionalSystem.introduction,
        sources: ['about:professional-system'],
        link: pageLink('research', { ru: 'Перейти к исследованиям', en: 'Open Research' }),
      },
      {
        id: 'education',
        question: { ru: 'Какое образование подтверждено?', en: 'What education is verified?' },
        answer: educationAnswer,
        sources: ['cv:education'],
        link: pageLink('cv', { ru: 'Открыть образование в CV', en: 'Open education in the CV' }),
      },
      {
        id: 'professional-experience',
        question: { ru: 'Какой профессиональный опыт представлен на сайте?', en: 'What professional experience is presented on the website?' },
        answer: experienceAnswer,
        sources: ['cv:experience'],
        link: pageLink('cv', { ru: 'Открыть полный опыт в CV', en: 'Open the full experience record' }),
      },
    ],
  },
  {
    id: 'veterinary-practice',
    title: { ru: 'Практика и диагностика', en: 'Practice and diagnostics' },
    introduction: {
      ru: 'Работа с ветеринарными пациентами и границы визуальной диагностики.',
      en: 'Veterinary patient work and the limits of diagnostic imaging.',
    },
    items: [
      {
        id: 'veterinary-patients',
        question: { ru: 'С какими ветеринарными пациентами связана частная практика?', en: 'Which veterinary patients are covered by the private practice?' },
        answer: practiceAnswer,
        sources: ['cv:experience'],
        link: pageLink('cv', { ru: 'Открыть запись практики в CV', en: 'Open the practice record in the CV' }),
      },
      {
        id: 'diagnostic-imaging-qualification',
        question: { ru: 'Какая квалификация по визуальной диагностике подтверждена?', en: 'What diagnostic imaging qualification is verified?' },
        answer: qualificationAnswer,
        sources: ['cv:qualification'],
        link: pageLink('cv', { ru: 'Открыть квалификации в CV', en: 'Open qualifications in the CV' }),
      },
      {
        id: 'imaging-context',
        question: { ru: 'Как интерпретируются результаты визуальной диагностики?', en: 'How are diagnostic imaging findings interpreted?' },
        answer: (lang) => aboutPageCopy[lang].professionalSystem.areas[1].description,
        sources: ['about:diagnostic-context'],
        link: pageLink('about', { ru: 'Открыть профессиональные принципы', en: 'Open the professional principles' }),
      },
      {
        id: 'medical-information',
        question: { ru: 'Заменяет ли информация на сайте ветеринарную консультацию?', en: 'Does information on this website replace a veterinary consultation?' },
        answer: (lang) => lang === 'ru'
          ? 'Нет. Материалы сайта носят общий информационный характер и не предназначены для постановки диагноза или выбора лечения конкретного животного.'
          : 'No. Website material is general information and is not intended to diagnose or select treatment for an individual animal.',
        sources: ['legal:disclaimer'],
      },
    ],
  },
  {
    id: 'research-publications',
    title: { ru: 'Исследования и публикации', en: 'Research and publications' },
    introduction: {
      ru: 'Область исследований, состав архива и внешние профили.',
      en: 'Research scope, archive composition, and external profiles.',
    },
    items: [
      {
        id: 'research-focus',
        question: { ru: 'На чём сосредоточена исследовательская работа?', en: 'What is the focus of the research work?' },
        answer: (lang) => `${researchPageCopy[lang].opening.statement} ${researchPageCopy[lang].question.paragraphs[0]}`,
        sources: ['research:focus'],
        link: pageLink('research', { ru: 'Открыть исследовательский профиль', en: 'Open the research profile' }),
      },
      {
        id: 'publication-record',
        question: { ru: 'Какие публикации уже представлены на сайте?', en: 'What publications are already available on the website?' },
        answer: publicationsAnswer,
        sources: ['publications:records'],
        link: pageLink('publications', { ru: 'Открыть архив публикаций', en: 'Open the publication archive' }),
      },
      {
        id: 'patent-record',
        question: { ru: 'Какой патент представлен в архиве?', en: 'What patent is included in the archive?' },
        answer: patentAnswer,
        sources: ['publications:patent'],
        link: (lang) => ({
          href: publicationPath(lang, patentRecord.slug),
          label: lang === 'ru' ? 'Открыть запись патента' : 'Open the patent record',
        }),
      },
      {
        id: 'research-profiles',
        question: { ru: 'Где проверить авторство и исследовательские профили?', en: 'Where can authorship and research profiles be checked?' },
        answer: profileAnswer,
        sources: ['publications:records', 'identity:profiles'],
        link: pageLink('profiles', { ru: 'Открыть профессиональные профили', en: 'Open Professional Profiles' }),
      },
    ],
  },
  {
    id: 'site-contact',
    title: { ru: 'Сайт и связь', en: 'Website and contact' },
    introduction: {
      ru: 'Доступные разделы сайта и профессиональная связь.',
      en: 'Available website sections and professional contact.',
    },
    items: [
      {
        id: 'website-sections',
        question: { ru: 'Какие основные разделы уже доступны?', en: 'Which main sections are already available?' },
        answer: websiteSectionsAnswer,
        sources: ['pages:routes'],
      },
      {
        id: 'timeline-purpose',
        question: { ru: 'Что показывает профессиональная хронология?', en: 'What does the professional timeline show?' },
        answer: (lang) => lang === 'ru'
          ? 'Хронология объединяет выбранные подтверждённые этапы образования, профессиональной практики, исследовательской работы и научных результатов. Она дополняет CV и архив публикаций, не дублируя их полностью.'
          : 'The timeline brings together selected verified milestones in education, professional practice, research work, and scholarly output. It complements the CV and publication archive without reproducing them in full.',
        sources: ['timeline:records'],
        link: pageLink('timeline', { ru: 'Открыть хронологию', en: 'Open the timeline' }),
      },
      {
        id: 'professional-contact',
        question: { ru: 'Как направить профессиональное или исследовательское обращение?', en: 'How can a professional or research inquiry be sent?' },
        answer: (lang) => `${contactPageCopy[lang].introduction} ${lang === 'ru' ? 'Укажите тему и достаточный контекст для рассмотрения обращения.' : 'Include the subject and enough context for the inquiry to be reviewed.'}`,
        sources: ['contact:form'],
        link: pageLink('contact', { ru: 'Перейти к форме обращения', en: 'Open the contact form' }),
      },
    ],
  },
] as const satisfies readonly FaqGroupDefinition[];

const pageCopy = {
  ru: {
    opening: {
      eyebrow: 'Справочная страница',
      lead: 'Краткие ответы о профессиональном профиле, ветеринарной практике, визуальной диагностике, исследованиях и публикациях Артура Фаттахова.',
      context: 'Полные подтверждённые записи находятся в профильных разделах сайта. FAQ помогает быстро найти нужный контекст, не заменяя About, CV, Research или Publications.',
    },
    topicsLabel: 'Темы частых вопросов',
    related: {
      title: 'Полные записи',
      introduction: 'Подробности представлены в основных разделах сайта.',
      label: 'Связанные основные страницы',
      links: [
        { route: 'about', label: 'Профессиональный профиль' },
        { route: 'cv', label: 'CV' },
        { route: 'publications', label: 'Публикации' },
        { route: 'contact', label: 'Форма обращения' },
      ],
    },
  },
  en: {
    opening: {
      eyebrow: 'Reference page',
      lead: 'Concise answers about Artur Fattakhov’s professional profile, veterinary practice, diagnostic imaging, research, and publications.',
      context: 'Complete verified records are kept on the relevant pages. The FAQ provides a quick route to context without replacing About, the CV, Research, or Publications.',
    },
    topicsLabel: 'Frequently asked question topics',
    related: {
      title: 'Full records',
      introduction: 'Full details are available on the primary pages.',
      label: 'Related primary pages',
      links: [
        { route: 'about', label: 'Professional profile' },
        { route: 'cv', label: 'CV' },
        { route: 'publications', label: 'Publications' },
        { route: 'contact', label: 'Contact form' },
      ],
    },
  },
} as const;

export function getFaqPage(lang: Language): FaqPageCopy {
  const copy = pageCopy[lang];

  return {
    opening: copy.opening,
    topicsLabel: copy.topicsLabel,
    groups: faqGroupDefinitions.map((group) => ({
      id: group.id,
      title: group.title[lang],
      introduction: group.introduction[lang],
      items: group.items.map((item) => ({
        id: item.id,
        question: item.question[lang],
        answer: item.answer(lang),
        sources: item.sources,
        link: item.link?.(lang),
        defaultOpen: item.defaultOpen,
      })),
    })),
    related: {
      title: copy.related.title,
      introduction: copy.related.introduction,
      label: copy.related.label,
      links: copy.related.links.map((link) => ({
        href: localizedPath(lang, link.route),
        label: link.label,
      })),
    },
  };
}

export function createFaqPageJsonLd(lang: Language, title: string, description: string) {
  const canonicalPath = localizedPath(lang, 'faq');
  const url = new URL(canonicalPath, identity.url).href;
  const questions = getFaqPage(lang).groups.flatMap((group) => group.items);

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': webpageId(canonicalPath),
    url,
    name: title,
    description,
    inLanguage: identity.languages[lang].code,
    isPartOf: { '@id': schemaIds.website },
    about: { '@id': schemaIds.person },
    breadcrumb: { '@id': breadcrumbId(canonicalPath) },
    mainEntity: questions.map((item) => ({
      '@type': 'Question',
      '@id': `${url}#faq-${item.id}`,
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  } as const;
}

export const faqStableIds = {
  groups: faqGroupDefinitions.map((group) => group.id),
  questions: faqGroupDefinitions.flatMap((group) => group.items.map((item) => item.id)),
} as const;

export const faqPublicationSummary = {
  ...publicationCounts,
  patentNumber: patentRecord.patentNumber,
} as const;

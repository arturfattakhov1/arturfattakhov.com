import { localizedPath, type Language } from '../i18n/config';
import {
  publicationPath,
  publicationRecords,
  type PublicationRecord,
  type PublicationType,
} from './publication-records';
import type { SchemaListItem } from './structured-data';

type LocalizedText = Readonly<Record<Language, string>>;

export type KnowledgeThemeId =
  | 'comparative-morphology-morphometry'
  | 'diagnostic-imaging-distal-limb-cattle'
  | 'digital-technologies-cattle-farming'
  | 'clinical-veterinary-medicine-cats';

type KnowledgePublicationSlug =
  | 'comparative-xray-morphometry-moose-cattle'
  | 'hoof-capsule-cattle-moose'
  | 'diagnostic-imaging-distal-limb-cattle'
  | 'distal-limb-disorders-cattle'
  | 'digitalization-cattle-farming'
  | 'ovariectomy-ovariohysterectomy-cats'
  | 'feline-calicivirus-saint-petersburg'
  | 'urethral-intussusception-cat'
  | 'xray-morphometric-laminitis-cattle-patent';

interface KnowledgeThemeDefinition {
  id: KnowledgeThemeId;
  title: LocalizedText;
  description: LocalizedText;
  publicationSlugs: readonly KnowledgePublicationSlug[];
}

export interface KnowledgeRecord {
  slug: KnowledgePublicationSlug;
  type: PublicationType;
  typeLabel: string;
  title: string;
  year: PublicationRecord['year'];
  href: string;
}

export interface KnowledgeTheme {
  id: KnowledgeThemeId;
  title: string;
  description: string;
  countLabel: string;
  recordsLabel: string;
  records: readonly KnowledgeRecord[];
}

interface KnowledgePageCopy {
  opening: {
    eyebrow: string;
    lead: string;
    context: string;
  };
  topicsLabel: string;
  themes: readonly KnowledgeTheme[];
  scope: {
    title: string;
    introduction: string;
    evidence: string;
    linkLabel: string;
    linkHref: string;
  };
  related: {
    title: string;
    introduction: string;
    label: string;
    links: readonly { label: string; href: string }[];
  };
}

const knowledgeThemeDefinitions = [
  {
    id: 'comparative-morphology-morphometry',
    title: {
      ru: 'Сравнительная морфология и морфометрия',
      en: 'Comparative morphology and morphometry',
    },
    description: {
      ru: 'Тема объединяет записи о сравнительной рентгеноморфометрии дистального отдела конечностей и микроморфологии копытец крупного рогатого скота и лося.',
      en: 'This theme brings together records on comparative X-ray morphometry of the distal extremities and hoof-capsule micromorphology in cattle and moose.',
    },
    publicationSlugs: [
      'comparative-xray-morphometry-moose-cattle',
      'hoof-capsule-cattle-moose',
    ],
  },
  {
    id: 'diagnostic-imaging-distal-limb-cattle',
    title: {
      ru: 'Лучевая диагностика и патологии конечностей КРС',
      en: 'Diagnostic imaging and distal limb disorders in cattle',
    },
    description: {
      ru: 'Тема связывает материалы о лучевой диагностике, патологиях дистального отдела конечностей и патентную запись о рентгеноморфометрической диагностике ламинита у крупного рогатого скота.',
      en: 'This theme connects material on diagnostic imaging, distal limb disorders, and the patent record for X-ray morphometric diagnosis of laminitis in cattle.',
    },
    publicationSlugs: [
      'diagnostic-imaging-distal-limb-cattle',
      'distal-limb-disorders-cattle',
      'xray-morphometric-laminitis-cattle-patent',
    ],
  },
  {
    id: 'digital-technologies-cattle-farming',
    title: {
      ru: 'Цифровые технологии в скотоводстве',
      en: 'Digital technologies in cattle farming',
    },
    description: {
      ru: 'В теме представлена конференционная публикация о цифровых технологиях в скотоводстве. Запись показана в пределах доступных библиографических данных и не описывает действующую цифровую систему.',
      en: 'This theme contains a conference publication on digital technologies in cattle farming. The record is presented within the available bibliographic data and does not describe an operating digital system.',
    },
    publicationSlugs: ['digitalization-cattle-farming'],
  },
  {
    id: 'clinical-veterinary-medicine-cats',
    title: {
      ru: 'Клиническая ветеринарная медицина кошек',
      en: 'Clinical veterinary medicine in cats',
    },
    description: {
      ru: 'Тема объединяет клинические и эпидемиологические записи о кошках: послеоперационном периоде, распространённости FCV и отдельном клиническом случае.',
      en: 'This theme brings together clinical and epidemiological records concerning cats: the postoperative period, FCV prevalence, and an individual clinical case.',
    },
    publicationSlugs: [
      'ovariectomy-ovariohysterectomy-cats',
      'feline-calicivirus-saint-petersburg',
      'urethral-intussusception-cat',
    ],
  },
] as const satisfies readonly KnowledgeThemeDefinition[];

const typeLabels = {
  ru: {
    journal: 'Журнальная статья',
    conference: 'Конференционная публикация',
    patent: 'Патент',
  },
  en: {
    journal: 'Journal article',
    conference: 'Conference publication',
    patent: 'Patent',
  },
} as const satisfies Readonly<Record<Language, Readonly<Record<PublicationType, string>>>>;

const pageCopy = {
  ru: {
    opening: {
      eyebrow: 'Тематический индекс',
      lead: 'Проверенные материалы, организованные по предметным направлениям.',
      context: 'База знаний связывает доступные исследовательские записи, публикации и справочные разделы. Это тематическая карта, а не полный учебник или замена библиографического архива и индивидуальной ветеринарной консультации.',
    },
    topicsLabel: 'Темы базы знаний',
    scope: {
      title: 'Границы материалов',
      introduction: 'Информация на сайте носит общий характер и не заменяет индивидуальную ветеринарную консультацию, диагностику или выбор лечения для конкретного животного.',
      evidence: 'Тематические описания ограничены доступными проверенными записями. Отсутствие расширенного резюме в источнике не компенсируется предположениями.',
      linkLabel: 'Открыть отказ от ответственности',
    },
    related: {
      title: 'Связанные разделы',
      introduction: 'Используйте профильные страницы для исследовательского контекста, полных библиографических записей и кратких профессиональных ответов.',
      label: 'Связанные страницы базы знаний',
      links: [
        { route: 'research', label: 'Исследования' },
        { route: 'publications', label: 'Публикации' },
        { route: 'faq', label: 'Частые вопросы' },
      ],
    },
  },
  en: {
    opening: {
      eyebrow: 'Thematic index',
      lead: 'Verified material organized by subject.',
      context: 'The Knowledge Hub connects the available research records, publications, and reference pages. It is a thematic map, not a complete textbook or a replacement for the bibliographic archive or individual veterinary consultation.',
    },
    topicsLabel: 'Knowledge Hub themes',
    scope: {
      title: 'Scope and boundaries',
      introduction: 'Information on this website is general and does not replace individual veterinary consultation, diagnosis, or treatment decisions for a specific animal.',
      evidence: 'Thematic descriptions are limited to the available verified records. Missing extended summaries are not replaced with assumptions.',
      linkLabel: 'Open the disclaimer',
    },
    related: {
      title: 'Related sections',
      introduction: 'Use the relevant pages for research context, full bibliographic records, and concise answers to professional questions.',
      label: 'Related Knowledge Hub pages',
      links: [
        { route: 'research', label: 'Research' },
        { route: 'publications', label: 'Publications' },
        { route: 'faq', label: 'Frequently Asked Questions' },
      ],
    },
  },
} as const;

const recordsBySlug = new Map(publicationRecords.map((record) => [record.slug, record]));
const assignedSlugs = knowledgeThemeDefinitions.flatMap((theme) => [...theme.publicationSlugs]);
const archiveSlugs = publicationRecords.map((record) => record.slug);

if (
  new Set(assignedSlugs).size !== assignedSlugs.length
  || assignedSlugs.length !== archiveSlugs.length
  || archiveSlugs.some((slug) => !assignedSlugs.includes(slug as KnowledgePublicationSlug))
) {
  throw new Error('Knowledge theme mapping must cover every publication record exactly once.');
}

function getRecord(slug: KnowledgePublicationSlug): PublicationRecord {
  const record = recordsBySlug.get(slug);
  if (!record) throw new Error(`Unknown publication record in Knowledge theme mapping: ${slug}`);
  return record;
}

function countLabel(lang: Language, count: number): string {
  if (lang === 'en') return `${count} ${count === 1 ? 'record' : 'records'}`;
  const remainder10 = count % 10;
  const remainder100 = count % 100;
  const noun = remainder10 === 1 && remainder100 !== 11
    ? 'запись'
    : remainder10 >= 2 && remainder10 <= 4 && (remainder100 < 12 || remainder100 > 14)
      ? 'записи'
      : 'записей';
  return `${count} ${noun}`;
}

export function getKnowledgePage(lang: Language): KnowledgePageCopy {
  const copy = pageCopy[lang];

  return {
    opening: copy.opening,
    topicsLabel: copy.topicsLabel,
    themes: knowledgeThemeDefinitions.map((theme) => ({
      id: theme.id,
      title: theme.title[lang],
      description: theme.description[lang],
      countLabel: countLabel(lang, theme.publicationSlugs.length),
      recordsLabel: lang === 'ru' ? `Записи по теме «${theme.title.ru}»` : `Records for ${theme.title.en}`,
      records: theme.publicationSlugs.map((slug) => {
        const record = getRecord(slug);
        return {
          slug,
          type: record.type,
          typeLabel: typeLabels[lang][record.type],
          title: record.title[lang],
          year: record.year,
          href: publicationPath(lang, record.slug),
        };
      }),
    })),
    scope: {
      ...copy.scope,
      linkHref: localizedPath(lang, 'disclaimer'),
    },
    related: {
      title: copy.related.title,
      introduction: copy.related.introduction,
      label: copy.related.label,
      links: copy.related.links.map((link) => ({
        label: link.label,
        href: localizedPath(lang, link.route),
      })),
    },
  };
}

export function getKnowledgeSchemaItems(lang: Language): SchemaListItem[] {
  return knowledgeThemeDefinitions.map((theme) => ({
    name: theme.title[lang],
    url: `${localizedPath(lang, 'knowledge')}#${theme.id}`,
  }));
}

export const knowledgeThemeIds = knowledgeThemeDefinitions.map((theme) => theme.id);
export const knowledgePublicationSlugs = assignedSlugs;
export const knowledgeRecordCount = assignedSlugs.length;

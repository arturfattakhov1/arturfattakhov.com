import type { Language } from '../i18n/config';
import mediaContent from './cms/media.json';

export const mediaTypes = ['interview', 'project', 'video', 'article', 'podcast'] as const;
export type MediaType = (typeof mediaTypes)[number];
export type MediaStatus = 'draft' | 'published';

interface LocalizedText {
  ru: string;
  en: string;
}

export interface MediaRecord {
  id: string;
  type: MediaType;
  status: MediaStatus;
  order: number;
  title: LocalizedText;
  summary: LocalizedText;
  role?: LocalizedText;
  externalLinks: Array<{
    source: LocalizedText;
    url: string;
  }>;
}

export const mediaRecords = (mediaContent.records as MediaRecord[])
  .filter((record) => record.status === 'published')
  .toSorted((a, b) => a.order - b.order);

export const mediaPageCopy: Record<Language, {
  opening: string;
  inquiry: string;
  sections: { interviews: string; projects: string; authored: string };
  typeLabels: Record<MediaType, string>;
  actions: Record<MediaType, string>;
  projectLinksLabel: string;
}> = {
  ru: {
    opening: 'Здесь собраны проверенные интервью и экспертные комментарии, междисциплинарные проекты и авторские профессиональные каналы.',
    inquiry: 'Направить медиа-запрос',
    sections: {
      interviews: 'Интервью и экспертные комментарии',
      projects: 'Междисциплинарные и научные проекты',
      authored: 'Авторские материалы и подкаст',
    },
    typeLabels: {
      interview: 'Экспертное интервью',
      project: 'Междисциплинарный проект',
      video: 'YouTube',
      article: 'Яндекс Дзен',
      podcast: 'Spotify podcast',
    },
    actions: {
      interview: 'Открыть интервью',
      project: 'Открыть материал',
      video: 'Открыть YouTube',
      article: 'Открыть Дзен',
      podcast: 'Открыть Spotify',
    },
    projectLinksLabel: 'Материалы о проекте',
  },
  en: {
    opening: 'This page collects verified interviews and expert comments, interdisciplinary projects, and authored professional channels.',
    inquiry: 'Send a media inquiry',
    sections: {
      interviews: 'Interviews and expert comments',
      projects: 'Interdisciplinary and scientific projects',
      authored: 'Authored material and podcast',
    },
    typeLabels: {
      interview: 'Expert interview',
      project: 'Interdisciplinary project',
      video: 'YouTube',
      article: 'Yandex Zen',
      podcast: 'Spotify podcast',
    },
    actions: {
      interview: 'Open interview',
      project: 'Open material',
      video: 'Open YouTube',
      article: 'Open Zen',
      podcast: 'Open Spotify',
    },
    projectLinksLabel: 'Project coverage',
  },
};

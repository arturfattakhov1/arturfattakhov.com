import { identity } from './identity';
import type { Language } from '../i18n/config';

type IdentityProfile = (typeof identity.profiles)[number];
export type ProfileKey = IdentityProfile['key'];
export type ProfileGroupKey = 'scientific' | 'media' | 'social' | 'technical';

export const profileGroups = {
  scientific: ['orcid', 'googleScholar', 'webOfScience', 'researchGate'],
  media: ['youtube', 'dzen', 'spotify'],
  social: ['instagram', 'threads', 'facebook'],
  technical: ['github'],
} as const satisfies Record<ProfileGroupKey, readonly ProfileKey[]>;

export const profilesPageCopy: Record<Language, {
  opening: string;
  groups: Record<ProfileGroupKey, { title: string; description: string }>;
  openLabel: string;
  externalLabel: string;
}> = {
  ru: {
    opening: 'Подтверждённые внешние профили сгруппированы по назначению. Основным источником биографических и библиографических данных остаётся этот сайт.',
    groups: {
      scientific: { title: 'Научные профили', description: 'Идентификаторы и авторские записи для сопоставления имени с научными публикациями.' },
      media: { title: 'Медиа', description: 'Авторские видео, материалы и страница подкаста.' },
      social: { title: 'Социальные профили', description: 'Публичные точки профессиональной идентичности.' },
      technical: { title: 'Технический профиль', description: 'Вторичный профиль с публичными репозиториями и техническими материалами.' },
    },
    openLabel: 'Открыть профиль', externalLabel: 'внешняя ссылка, откроется в новой вкладке',
  },
  en: {
    opening: 'Verified external profiles are grouped by purpose. This website remains the primary source for biographical and bibliographic information.',
    groups: {
      scientific: { title: 'Scientific profiles', description: 'Identifiers and author records that connect the name with scholarly publications.' },
      media: { title: 'Media', description: 'Authored videos, articles, and the podcast page.' },
      social: { title: 'Social profiles', description: 'Public endpoints for professional identity.' },
      technical: { title: 'Technical profile', description: 'A secondary profile containing public repositories and technical material.' },
    },
    openLabel: 'Open profile', externalLabel: 'external link, opens in a new tab',
  },
};

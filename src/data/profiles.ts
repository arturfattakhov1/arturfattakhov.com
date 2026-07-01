import { identity } from './identity';
import type { Language } from '../i18n/config';

interface ProfilesPageCopy {
  hero: string;
  linkLabel: string;
  externalLinkLabel: string;
  futureProfiles: string;
}

export const profilesPageCopy: Record<Language, ProfilesPageCopy> = {
  ru: {
    hero: 'Эта страница объединяет официальные научные, профессиональные и публичные профили Артура Фаттахова.',
    linkLabel: 'Открыть профиль',
    externalLinkLabel: 'откроется в новой вкладке',
    futureProfiles: 'Новые официальные профили будут добавляться только после подтверждения и унификации.',
  },
  en: {
    hero: `This page connects the official research, professional and public profiles of ${identity.name.en}.`,
    linkLabel: 'Open profile',
    externalLinkLabel: 'opens in a new tab',
    futureProfiles: 'New official profiles will be added only after verification and identity alignment.',
  },
};

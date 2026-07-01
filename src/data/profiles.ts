import { identity } from './identity';
import type { Language } from '../i18n/config';

interface ProfilesPageCopy {
  hero: string;
  linkLabel: string;
  externalLinkLabel: string;
  aboutCta: string;
  futureProfiles: string;
  profileDescriptions: Record<string, string>;
}

export const profilesPageCopy: Record<Language, ProfilesPageCopy> = {
  ru: {
    hero: 'Это единый каталог официальных научных, профессиональных и публичных профилей Артура Фаттахова. Он помогает сопоставить записи об одном человеке на разных платформах и отличить подтверждённые ссылки от совпадений по имени.',
    linkLabel: 'Открыть профиль',
    externalLinkLabel: 'откроется в новой вкладке',
    aboutCta: 'О профессиональном профиле',
    futureProfiles: 'Новые ссылки будут добавляться только после подтверждения принадлежности профиля и согласования имени, описания и адреса основного сайта. Биографические сведения следует сверять со страницей «Обо мне», а публикации — с разделом «Публикации».',
    profileDescriptions: {
      orcid: 'Постоянный идентификатор исследователя для точного сопоставления авторства и научных записей.',
      googleScholar: 'Авторский профиль для обнаружения научных работ, проиндексированных Google Scholar.',
      researchGate: 'Официальная исследовательская идентичность Артура Фаттахова на платформе ResearchGate.',
      webOfScience: 'Авторская запись Web of Science для сопоставления исследователя с индексируемыми научными материалами.',
      github: 'Официальная идентичность на GitHub для исходного кода, технических материалов и репозиториев, когда они публикуются.',
      youtube: 'Официальный канал, связывающий видеоматериалы с этой профессиональной идентичностью.',
      instagram: 'Официальный публичный профиль, связанный с этой профессиональной идентичностью.',
      threads: 'Официальный публичный профиль, связанный с этой профессиональной идентичностью.',
      facebook: 'Официальный публичный профиль в Facebook.',
    },
  },
  en: {
    hero: `This is the central directory of official research, professional, and public profiles belonging to ${identity.name.en}. It helps connect records about the same person across platforms and distinguish verified links from name matches.`,
    linkLabel: 'Open profile',
    externalLinkLabel: 'opens in a new tab',
    aboutCta: 'About the professional profile',
    futureProfiles: 'New links will be added only after ownership has been verified and the name, description, and canonical website address have been aligned. Biographical information should be checked against the About page, and publication records against the Publications section.',
    profileDescriptions: {
      orcid: 'A persistent researcher identifier for accurate attribution and connection of scholarly records.',
      googleScholar: 'An author profile for discovering scientific work indexed by Google Scholar.',
      researchGate: 'Artur Fattakhov’s official research identity on the ResearchGate platform.',
      webOfScience: 'A Web of Science author record connecting the researcher with indexed scholarly material.',
      github: 'The official GitHub identity for source code, technical material, and repositories when published.',
      youtube: 'The official channel connecting video material with this professional identity.',
      instagram: 'The official public profile connected with this professional identity.',
      threads: 'The official public profile connected with this professional identity.',
      facebook: 'The official public profile on Facebook.',
    },
  },
};

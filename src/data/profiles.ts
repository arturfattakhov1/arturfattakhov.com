import { identity } from './identity';
import type { Language } from '../i18n/config';

type IdentityProfile = (typeof identity.profiles)[number];
export type ProfileKey = IdentityProfile['key'];
export type ProfileGroupKey = 'research' | 'professional' | 'publishing';

interface ProfilePresentation {
  role: string;
  description: string;
}

interface ProfilesPageCopy {
  opening: {
    eyebrow: string;
    lead: string;
    context: string;
    aboutLink: string;
  };
  groups: Record<ProfileGroupKey, {
    title: string;
    introduction: string;
  }>;
  profiles: Record<ProfileKey, ProfilePresentation>;
  openLabel: string;
  externalLinkLabel: string;
  identifierLabel: string;
  verification: {
    title: string;
    explanation: string;
    sourceNote: string;
    primaryLinksLabel: string;
    referenceLinksLabel: string;
    links: {
      about: string;
      publications: string;
      media: string;
      contact: string;
      knowledge: string;
      timeline: string;
      faq: string;
    };
  };
}

export const profileGroups = {
  research: ['orcid', 'googleScholar', 'webOfScience', 'researchGate'],
  professional: ['github'],
  publishing: ['youtube', 'instagram', 'threads', 'facebook'],
} as const satisfies Record<ProfileGroupKey, readonly ProfileKey[]>;

export const profilesPageCopy: Record<Language, ProfilesPageCopy> = {
  ru: {
    opening: {
      eyebrow: 'Профессиональная идентичность',
      lead: 'Внешние профили связывают научные записи, техническую работу и авторские материалы с профессиональным профилем Артура Фаттахова.',
      context: 'На этой странице научные идентификаторы отделены от профессиональных ресурсов и публичных каналов. Ссылки ведут на внешние платформы; основным источником биографической и библиографической информации остаётся этот сайт.',
      aboutLink: 'О профессиональном пути',
    },
    groups: {
      research: {
        title: 'Научная идентичность',
        introduction: 'Постоянные идентификаторы и авторские профили помогают сопоставлять имя исследователя с библиографическими записями на внешних платформах.',
      },
      professional: {
        title: 'Профессиональная и техническая работа',
        introduction: 'Профессиональные ресурсы показывают публичную техническую работу и материалы, опубликованные вне основного сайта.',
      },
      publishing: {
        title: 'Авторские и публичные каналы',
        introduction: 'Эти каналы связывают опубликованные материалы и публичные профили с той же профессиональной идентичностью. Интервью и внешнее медиапокрытие собраны отдельно на странице «Медиа».',
      },
    },
    profiles: {
      orcid: {
        role: 'Постоянный идентификатор исследователя',
        description: 'ORCID iD помогает однозначно связать автора с научными записями независимо от вариантов написания имени.',
      },
      googleScholar: {
        role: 'Публикационный профиль',
        description: 'Авторский профиль для поиска работ, которые Google Scholar связывает с Артуром Фаттаховым. Состав записи определяется индексированием платформы.',
      },
      researchGate: {
        role: 'Исследовательский профиль',
        description: 'Профиль исследователя на ResearchGate с материалами и сведениями, размещёнными на этой платформе.',
      },
      webOfScience: {
        role: 'Авторский профиль',
        description: 'Авторская запись Web of Science для сопоставления имени исследователя с индексируемыми материалами платформы.',
      },
      github: {
        role: 'Публичная техническая работа',
        description: 'Публичные репозитории, исходный код и технические материалы, когда они опубликованы.',
      },
      youtube: {
        role: 'Авторский видеоканал',
        description: 'Канал с опубликованными профессиональными и образовательными видеоматериалами о ветеринарной медицине.',
      },
      instagram: {
        role: 'Публичный профиль',
        description: 'Публичная точка идентичности, связанная с профессиональным профилем Артура Фаттахова.',
      },
      threads: {
        role: 'Публичный профиль',
        description: 'Публичная точка идентичности Артура Фаттахова на платформе Threads.',
      },
      facebook: {
        role: 'Публичный профиль',
        description: 'Публичная точка идентичности Артура Фаттахова на платформе Facebook.',
      },
    },
    openLabel: 'Открыть',
    externalLinkLabel: 'внешняя ссылка, откроется в новой вкладке',
    identifierLabel: 'ORCID iD',
    verification: {
      title: 'Принцип верификации',
      explanation: 'Ссылка включается в каталог только после проверки принадлежности профиля и согласования имени с основным сайтом. Это подтверждает связь профиля с Артуром Фаттаховым, но не означает платформенную отметку верификации или полноту данных внешнего сервиса.',
      sourceNote: 'Биографические сведения и библиографические записи следует сверять с соответствующими разделами этого сайта.',
      primaryLinksLabel: 'Основная информация',
      referenceLinksLabel: 'Справочные разделы',
      links: {
        about: 'Обо мне',
        publications: 'Публикации',
        media: 'Медиа',
        contact: 'Контакты',
        knowledge: 'База знаний',
        timeline: 'Хронология',
        faq: 'Вопросы и ответы',
      },
    },
  },
  en: {
    opening: {
      eyebrow: 'Professional identity',
      lead: 'External profiles connect research records, technical work, and authored material with the professional profile of Artur Fattakhov.',
      context: 'This page separates research identifiers from professional resources and public channels. The links lead to external platforms; this website remains the primary source for biographical and bibliographic information.',
      aboutLink: 'About the professional background',
    },
    groups: {
      research: {
        title: 'Research identity',
        introduction: 'Persistent identifiers and author profiles help connect the researcher’s name with bibliographic records held by external platforms.',
      },
      professional: {
        title: 'Professional and technical work',
        introduction: 'Professional resources provide access to public technical work and material published outside the main website.',
      },
      publishing: {
        title: 'Publishing and public channels',
        introduction: 'These channels connect published material and public profiles with the same professional identity. Interviews and external coverage are documented separately on the Media page.',
      },
    },
    profiles: {
      orcid: {
        role: 'Persistent researcher identifier',
        description: 'An ORCID iD connects the author with research records independently of variations in how the name is written.',
      },
      googleScholar: {
        role: 'Publication profile',
        description: 'An author profile for finding work that Google Scholar associates with Artur Fattakhov. Its contents depend on the platform’s indexing.',
      },
      researchGate: {
        role: 'Research profile',
        description: 'A researcher profile on ResearchGate containing material and information held by that platform.',
      },
      webOfScience: {
        role: 'Author profile',
        description: 'A Web of Science author record connecting the researcher’s name with material indexed by the platform.',
      },
      github: {
        role: 'Public technical work',
        description: 'Public repositories, source code, and technical material when they are published.',
      },
      youtube: {
        role: 'Authored video channel',
        description: 'A channel containing published professional and educational video material on veterinary medicine.',
      },
      instagram: {
        role: 'Public profile',
        description: 'A public identity endpoint connected with the professional profile of Artur Fattakhov.',
      },
      threads: {
        role: 'Public profile',
        description: 'Artur Fattakhov’s public identity endpoint on Threads.',
      },
      facebook: {
        role: 'Public profile',
        description: 'Artur Fattakhov’s public identity endpoint on Facebook.',
      },
    },
    openLabel: 'Open',
    externalLinkLabel: 'external link, opens in a new tab',
    identifierLabel: 'ORCID iD',
    verification: {
      title: 'Verification principle',
      explanation: 'A link is included only after profile ownership and alignment with the canonical website name have been checked. This confirms its connection with Artur Fattakhov; it does not imply a platform verification badge or completeness of the external service’s data.',
      sourceNote: 'Biographical information and bibliographic records should be checked against the relevant sections of this website.',
      primaryLinksLabel: 'Primary information',
      referenceLinksLabel: 'Reference sections',
      links: {
        about: 'About',
        publications: 'Publications',
        media: 'Media',
        contact: 'Contact',
        knowledge: 'Knowledge Hub',
        timeline: 'Timeline',
        faq: 'FAQ',
      },
    },
  },
};

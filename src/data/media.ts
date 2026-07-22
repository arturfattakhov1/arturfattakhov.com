import type { Language } from '../i18n/config';

export const mediaLinks = {
  youtube: 'https://www.youtube.com/@dr.arturfattakhov',
  dzen: 'https://dzen.ru/arturfattakhov',
  spotify: 'https://open.spotify.com/show/033OTXXuHSVlHqyxOQTUdm',
} as const;

export const mediaPageCopy: Record<Language, {
  opening: string;
  inquiry: string;
  sections: { interviews: string; projects: string; authored: string };
  interview: { label: string; title: string; description: string; action: string };
  project: { label: string; title: string; description: string; role: string; linksLabel: string; links: string[] };
  channels: Array<{ key: keyof typeof mediaLinks; label: string; title: string; description: string; action: string }>;
}> = {
  ru: {
    opening: 'Здесь собраны проверенные интервью и экспертные комментарии, междисциплинарные проекты и авторские профессиональные каналы.',
    inquiry: 'Направить медиа-запрос',
    sections: { interviews: 'Интервью и экспертные комментарии', projects: 'Междисциплинарные и научные проекты', authored: 'Авторские материалы и подкаст' },
    interview: { label: 'Экспертное интервью', title: 'Последний жест любви', description: 'Интервью о теме эвтаназии животных и сложном решении, с которым может столкнуться владелец.', action: 'Открыть интервью' },
    project: {
      label: 'Междисциплинарный проект', title: 'Биоэквивалент мочеточника: экспериментальная имплантация',
      description: 'Три внешних материала освещают один проект и поэтому объединены в одну запись.',
      role: 'В проекте я отвечал за анестезиологическое сопровождение и совместно с командой формировал план предоперационного и послеоперационного ведения животного.',
      linksLabel: 'Материалы о проекте', links: ['Основной материал «Известий»', 'Короткая новость «Известий»', 'Материал Naked Science'],
    },
    channels: [
      { key: 'youtube', label: 'YouTube', title: 'Авторские видео', description: 'Профессиональные и образовательные видеоматериалы о ветеринарной медицине без неподтверждённых показателей аудитории.', action: 'Открыть YouTube' },
      { key: 'dzen', label: 'Яндекс Дзен', title: 'Авторские материалы', description: 'Профессиональные объяснения тем, связанных со здоровьем животных и ветеринарной практикой.', action: 'Открыть Дзен' },
      { key: 'spotify', label: 'Spotify podcast', title: 'Подкаст', description: 'Страница подкаста в Spotify. Отдельные эпизоды будут показаны только после их подтверждённой публикации.', action: 'Открыть Spotify' },
    ],
  },
  en: {
    opening: 'This page collects verified interviews and expert comments, interdisciplinary projects, and authored professional channels.',
    inquiry: 'Send a media inquiry',
    sections: { interviews: 'Interviews and expert comments', projects: 'Interdisciplinary and scientific projects', authored: 'Authored material and podcast' },
    interview: { label: 'Expert interview', title: 'Последний жест любви', description: 'An interview about animal euthanasia and the difficult decision an animal owner may face.', action: 'Open interview' },
    project: {
      label: 'Interdisciplinary project', title: 'Ureter bioequivalent: experimental implantation',
      description: 'Three external reports cover the same project and are therefore grouped into one record.',
      role: 'In the project, I was responsible for anaesthetic support and worked with the team to develop the animal’s preoperative and postoperative management plan.',
      linksLabel: 'Project coverage', links: ['Primary Izvestia article', 'Short Izvestia news item', 'Naked Science article'],
    },
    channels: [
      { key: 'youtube', label: 'YouTube', title: 'Authored videos', description: 'Professional and educational video material on veterinary medicine, without unverified audience figures.', action: 'Open YouTube' },
      { key: 'dzen', label: 'Yandex Zen', title: 'Authored material', description: 'Professional explanations of topics related to animal health and veterinary practice.', action: 'Open Zen' },
      { key: 'spotify', label: 'Spotify podcast', title: 'Podcast', description: 'The podcast page on Spotify. Individual episodes will only appear after verified publication.', action: 'Open Spotify' },
    ],
  },
};

export const mediaRecords = {
  interview: 'https://vk.ru/@875007413-poslednii-zhest-lubvi',
  project: [
    'https://iz.ru/1823909/maria-neduk/vyiti-v-drenaz-ucenye-vpervye-peresadili-iskusstvennyi-mocetocnik-svine',
    'https://iz.ru/1824936/2025-01-20/v-rossii-vpervye-peresadili-bioinzenernyi-mocetocnik-svine',
    'https://naked-science.ru/article/column/svine-bioekvivalent-moche',
  ],
} as const;

import type { Language } from '../i18n/config';

export const blogPageCopy = {
  ru: {
    intro: 'Здесь будут публиковаться проверенные профессиональные материалы о ветеринарной медицине, исследованиях и технологиях.',
    sectionTitle: 'Материалы',
    placeholderTitle: 'Материалы пока не добавлены',
    placeholderDescription: 'Статьи появятся здесь после добавления и проверки Markdown-записей.',
  },
  en: {
    intro: 'Verified professional material on veterinary medicine, research, and technology will be published here.',
    sectionTitle: 'Articles',
    placeholderTitle: 'No articles added yet',
    placeholderDescription: 'Articles will appear here after Markdown entries are added and verified.',
  },
} as const satisfies Record<Language, Record<string, string>>;

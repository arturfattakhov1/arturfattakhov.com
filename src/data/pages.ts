import type { Language } from '../i18n/config';
import { identity } from './identity';
import type { LegalPageSlug } from './legal';

export type StandardPageSlug = LegalPageSlug
  | 'about'
  | 'practice'
  | 'research'
  | 'media'
  | 'contact'
  | 'profiles'
  | 'knowledge'
  | 'search';

export interface PageContent {
  title: string;
  description: string;
}

export const homeContent: Record<Language, PageContent> = {
  ru: { title: identity.name.ru, description: 'Ветеринарный врач и специалист визуальной диагностики Артур Фаттахов: помощь владельцам собак и кошек, практика и проверенные материалы.' },
  en: { title: identity.name.en, description: 'Veterinary Doctor and Diagnostic Imaging Specialist Artur Fattakhov: support for dog and cat owners, practice, and verified material.' },
};

export const pageContent: Record<Language, Record<StandardPageSlug, PageContent>> = {
  ru: {
    about: { title: 'Обо мне', description: 'Профессиональный профиль Артура Фаттахова: клиническая ветеринарная медицина, визуальная диагностика, предпринимательский опыт и исследовательская квалификация.' },
    practice: { title: 'Практика', description: 'Частная ветеринарная практика Артура Фаттахова: форматы помощи собакам и кошкам, принципы работы и ограничения дистанционного обсуждения.' },
    research: { title: 'Исследования', description: 'Темы, методы, проверенные результаты и публикации Артура Фаттахова по сравнительной анатомии, ветеринарной морфологии и рентгеноморфометрии.' },
    media: { title: 'Медиа', description: 'Проверенные интервью, экспертные комментарии, междисциплинарные проекты и авторские каналы Артура Фаттахова.' },
    contact: { title: 'Связаться', description: 'Форма для ветеринарных вопросов, медиа-запросов, лекций, профессиональных проектов и партнёрств.' },
    profiles: { title: 'Профессиональные профили', description: 'Подтверждённые научные, медиа, социальные и технические профили Артура Фаттахова.' },
    knowledge: { title: 'База знаний', description: 'Проверенные материалы Артура Фаттахова для владельцев животных о ветеринарной помощи и диагностическом контексте.' },
    search: { title: 'Поиск', description: 'Поиск по профессиональным материалам, публикациям и страницам Артура Фаттахова.' },
    privacy: { title: 'Политика конфиденциальности', description: 'Политика конфиденциальности arturfattakhov.com: технические данные, cookie, внешние ссылки, обращения и права пользователей.' },
    terms: { title: 'Условия использования', description: 'Краткие условия использования информационных и профессиональных материалов сайта arturfattakhov.com.' },
    disclaimer: { title: 'Отказ от ответственности', description: 'Границы использования ветеринарной, медицинской и научной информации на сайте arturfattakhov.com.' },
  },
  en: {
    about: { title: 'About', description: 'Professional profile of Artur Fattakhov across clinical veterinary medicine, diagnostic imaging, entrepreneurship, and research training.' },
    practice: { title: 'Practice', description: 'Artur Fattakhov’s private veterinary practice: formats for helping dogs and cats, professional principles, and the limits of remote discussion.' },
    research: { title: 'Research', description: 'Topics, methods, verified outputs, and publications by Artur Fattakhov in comparative anatomy, veterinary morphology, and radiomorphometry.' },
    media: { title: 'Media', description: 'Verified interviews, expert comments, interdisciplinary projects, and authored channels by Artur Fattakhov.' },
    contact: { title: 'Contact', description: 'A form for veterinary questions, media inquiries, lectures, professional projects, and partnerships.' },
    profiles: { title: 'Professional profiles', description: 'Verified scientific, media, social, and technical profiles of Artur Fattakhov.' },
    knowledge: { title: 'Knowledge Base', description: "Reviewed material by Artur Fattakhov for animal owners on veterinary care and diagnostic context." },
    search: { title: 'Search', description: "Search Artur Fattakhov's professional material, publications, and profile pages." },
    privacy: { title: 'Privacy Policy', description: 'Privacy policy for arturfattakhov.com covering technical data, cookies, external links, contact, and individual rights.' },
    terms: { title: 'Terms of Use', description: 'Concise terms governing use of informational and professional material on arturfattakhov.com.' },
    disclaimer: { title: 'Disclaimer', description: 'Limits on the use of veterinary, medical, and scientific information provided by arturfattakhov.com.' },
  },
};

export const collectionPageContent = {
  publications: {
    ru: { title: 'Публикации', description: 'Научные и профессиональные публикации Артура Фаттахова с проверенными библиографическими данными.' },
    en: { title: 'Publications', description: 'Scientific and professional publications by Artur Fattakhov with verified bibliographic data.' },
  },
} as const;

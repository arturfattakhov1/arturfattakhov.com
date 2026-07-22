import type { Language } from '../i18n/config';
import { identity } from './identity';
import type { LegalPageSlug } from './legal';

export type StandardPageSlug = LegalPageSlug
  | 'about'
  | 'research'
  | 'media'
  | 'contact'
  | 'cv'
  | 'profiles'
  | 'uses'
  | 'knowledge'
  | 'timeline'
  | 'faq'
  | 'search';

export interface PageContent {
  title: string;
  description: string;
}

export const homeContent: Record<Language, PageContent> = {
  ru: { title: identity.name.ru, description: 'Официальный сайт Артура Фаттахова — ветеринарного врача и специалиста визуальной диагностики.' },
  en: { title: identity.name.en, description: 'Official website of Artur Fattakhov, Veterinary Doctor and Diagnostic Imaging Specialist.' },
};

export const pageContent: Record<Language, Record<StandardPageSlug, PageContent>> = {
  ru: {
    about: { title: 'Обо мне', description: 'Профессиональный профиль Артура Фаттахова: ветеринарная медицина, визуальная диагностика и исследования.' },
    research: { title: 'Исследования', description: 'Исследовательские направления Артура Фаттахова в ветеринарной медицине, клинической диагностике и применении искусственного интеллекта.' },
    media: { title: 'Медиа', description: 'Раздел для проверенных интервью, статей, видео и подкастов с участием Артура Фаттахова.' },
    contact: { title: 'Связаться', description: 'Форма для профессиональных обращений, предложений о сотрудничестве и других профильных вопросов Артуру Фаттахову.' },
    cv: { title: 'CV', description: 'Образование, профессиональный и исследовательский опыт, квалификации и профессиональные компетенции ветеринарного врача Артура Фаттахова.' },
    profiles: { title: 'Профессиональные профили', description: 'Научные, профессиональные и авторские профили ветеринарного врача и исследователя Артура Фаттахова.' },
    uses: { title: 'Инструменты', description: 'Раздел для проверенного списка рабочих инструментов, программного обеспечения и клинических процессов.' },
    knowledge: { title: 'База знаний', description: 'Тематическая карта проверенных материалов Артура Фаттахова по ветеринарной медицине, диагностике, морфологии и исследованиям.' },
    timeline: { title: 'Хронология', description: 'Выбранные этапы образования, профессиональной практики, исследовательской работы и научных результатов Артура Фаттахова.' },
    faq: { title: 'Частые вопросы', description: 'Ответы на частые вопросы о профессиональной деятельности, ветеринарной практике, исследованиях и публикациях Артура Фаттахова.' },
    search: { title: 'Поиск', description: 'Поиск по профессиональным материалам, публикациям и страницам Артура Фаттахова.' },
    privacy: { title: 'Политика конфиденциальности', description: 'Политика конфиденциальности arturfattakhov.com: технические данные, cookie, внешние ссылки, обращения и права пользователей.' },
    terms: { title: 'Условия использования', description: 'Краткие условия использования информационных и профессиональных материалов сайта arturfattakhov.com.' },
    disclaimer: { title: 'Отказ от ответственности', description: 'Границы использования ветеринарной, медицинской и научной информации на сайте arturfattakhov.com.' },
  },
  en: {
    about: { title: 'About', description: 'Professional profile of Artur Fattakhov across veterinary medicine, diagnostic imaging, and research.' },
    research: { title: 'Research', description: 'Research directions of Artur Fattakhov in veterinary medicine, clinical diagnostics, and artificial intelligence.' },
    media: { title: 'Media', description: 'A section for verified interviews, articles, videos, and podcasts featuring Artur Fattakhov.' },
    contact: { title: 'Contact', description: 'A contact form for professional inquiries, collaboration proposals, and other relevant messages to Artur Fattakhov.' },
    cv: { title: 'CV', description: 'Education, professional and research experience, qualifications, and professional competencies of veterinary doctor Artur Fattakhov.' },
    profiles: { title: 'Professional profiles', description: 'Research, professional, and publishing profiles of veterinary doctor and researcher Artur Fattakhov.' },
    uses: { title: 'Uses', description: 'A section for a verified list of working tools, software, and clinical workflows.' },
    knowledge: { title: 'Knowledge Hub', description: "A thematic map of Artur Fattakhov's verified material on veterinary medicine, diagnostic imaging, morphology, and research." },
    timeline: { title: 'Timeline', description: "Selected milestones in Artur Fattakhov's education, professional practice, research work, and scholarly output." },
    faq: { title: 'Frequently Asked Questions', description: "Answers to common questions about Artur Fattakhov's professional work, veterinary practice, research, and publications." },
    search: { title: 'Search', description: "Search Artur Fattakhov's professional material, publications, and profile pages." },
    privacy: { title: 'Privacy Policy', description: 'Privacy policy for arturfattakhov.com covering technical data, cookies, external links, contact, and individual rights.' },
    terms: { title: 'Terms of Use', description: 'Concise terms governing use of informational and professional material on arturfattakhov.com.' },
    disclaimer: { title: 'Disclaimer', description: 'Limits on the use of veterinary, medical, and scientific information provided by arturfattakhov.com.' },
  },
};

export const collectionPageContent = {
  blog: {
    ru: { title: 'Блог', description: 'Профессиональные материалы Артура Фаттахова о ветеринарной медицине, исследованиях и технологиях.' },
    en: { title: 'Blog', description: 'Professional material by Artur Fattakhov on veterinary medicine, research, and technology.' },
  },
  publications: {
    ru: { title: 'Публикации', description: 'Научные и профессиональные публикации Артура Фаттахова с проверенными библиографическими данными.' },
    en: { title: 'Publications', description: 'Scientific and professional publications by Artur Fattakhov with verified bibliographic data.' },
  },
} as const;

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
  | 'now'
  | 'knowledge'
  | 'timeline'
  | 'faq';

export interface PageContent {
  title: string;
  description: string;
}

export const homeContent: Record<Language, PageContent> = {
  ru: { title: identity.name.ru, description: 'Официальный сайт Артура Фаттахова — ветеринарного врача, исследователя и предпринимателя.' },
  en: { title: identity.name.en, description: 'Official website of Artur Fattakhov, veterinarian, researcher, and entrepreneur.' },
};

export const pageContent: Record<Language, Record<StandardPageSlug, PageContent>> = {
  ru: {
    about: { title: 'Обо мне', description: 'Профессиональный профиль Артура Фаттахова: ветеринарная медицина, исследования и предпринимательство.' },
    research: { title: 'Исследования', description: 'Исследовательские направления Артура Фаттахова в ветеринарной медицине, клинической диагностике и применении искусственного интеллекта.' },
    media: { title: 'Медиа', description: 'Раздел для проверенных интервью, статей, видео и подкастов с участием Артура Фаттахова.' },
    contact: { title: 'Связаться', description: 'Форма для профессиональных обращений, предложений о сотрудничестве и других профильных вопросов Артуру Фаттахову.' },
    cv: { title: 'CV', description: 'Образование, профессиональный и исследовательский опыт, квалификации и профессиональные компетенции ветеринарного врача Артура Фаттахова.' },
    profiles: { title: 'Профили', description: 'Официальные научные, профессиональные и публичные профили Артура Фаттахова.' },
    uses: { title: 'Инструменты', description: 'Раздел для проверенного списка рабочих инструментов, программного обеспечения и клинических процессов.' },
    now: { title: 'Сейчас', description: 'Текущие направления работы и профессионального внимания Артура Фаттахова.' },
    knowledge: { title: 'База знаний', description: 'Профессиональная база знаний Артура Фаттахова о ветеринарной медицине, диагностике, исследованиях и технологиях.' },
    timeline: { title: 'Хронология', description: 'Проверяемая профессиональная хронология Артура Фаттахова: образование, клиническая практика, исследования, публикации и проекты.' },
    faq: { title: 'Вопросы и ответы', description: 'Ответы на основные вопросы о профессиональной деятельности, исследованиях, публикациях и официальных профилях Артура Фаттахова.' },
    privacy: { title: 'Политика конфиденциальности', description: 'Политика конфиденциальности arturfattakhov.com: технические данные, cookie, внешние ссылки, обращения и права пользователей.' },
    terms: { title: 'Условия использования', description: 'Краткие условия использования информационных и профессиональных материалов сайта arturfattakhov.com.' },
    disclaimer: { title: 'Отказ от ответственности', description: 'Границы использования ветеринарной, медицинской и научной информации на сайте arturfattakhov.com.' },
  },
  en: {
    about: { title: 'About', description: 'Professional profile of Artur Fattakhov across veterinary medicine, research, and entrepreneurship.' },
    research: { title: 'Research', description: 'Research directions of Artur Fattakhov in veterinary medicine, clinical diagnostics, and artificial intelligence.' },
    media: { title: 'Media', description: 'A section for verified interviews, articles, videos, and podcasts featuring Artur Fattakhov.' },
    contact: { title: 'Contact', description: 'A contact form for professional inquiries, collaboration proposals, and other relevant messages to Artur Fattakhov.' },
    cv: { title: 'CV', description: 'Education, professional and research experience, qualifications, and professional competencies of veterinary doctor Artur Fattakhov.' },
    profiles: { title: 'Profiles', description: 'Official research, professional, and public profiles of Artur Fattakhov.' },
    uses: { title: 'Uses', description: 'A section for a verified list of working tools, software, and clinical workflows.' },
    now: { title: 'Now', description: 'Current areas of work and professional focus for Artur Fattakhov.' },
    knowledge: { title: 'Knowledge Hub', description: 'Artur Fattakhov’s professional knowledge base on veterinary medicine, diagnostics, research, and technology.' },
    timeline: { title: 'Timeline', description: 'A verifiable professional timeline for Artur Fattakhov covering education, clinical practice, research, publications, and projects.' },
    faq: { title: 'FAQ', description: 'Answers to common questions about Artur Fattakhov’s professional work, research, publications, and official profiles.' },
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
  projects: {
    ru: { title: 'Проекты', description: 'Проверенные проекты и профессиональные направления Артура Фаттахова.' },
    en: { title: 'Projects', description: 'Verified projects and professional directions of Artur Fattakhov.' },
  },
} as const;

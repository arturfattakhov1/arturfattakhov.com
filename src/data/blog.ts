import type { Language } from '../i18n/config';

export const blogPageCopy = {
  ru: {
    intro: 'Блог предназначен для авторских материалов о ветеринарной медицине, диагностике, клиническом мышлении, исследованиях и ответственном применении технологий. Тексты будут отделять подтверждённые данные от профессиональной интерпретации и содержать ссылки на источники, когда они необходимы.',
    sectionTitle: 'Материалы',
    placeholderTitle: 'Проверенные статьи готовятся к публикации',
    placeholderDescription: 'Каждый материал будет опубликован с указанием автора, даты, языка, статуса обновления и использованных источников. Непроверенные медицинские рекомендации размещаться не будут.',
  },
  en: {
    intro: 'The blog is intended for original material on veterinary medicine, diagnostics, clinical reasoning, research, and the responsible use of technology. Articles will distinguish sourced evidence from professional interpretation and provide references where needed.',
    sectionTitle: 'Articles',
    placeholderTitle: 'Verified articles are being prepared',
    placeholderDescription: 'Each article will state its author, date, language, update status, and supporting sources. Unverified medical recommendations will not be published.',
  },
} as const satisfies Record<Language, Record<string, string>>;

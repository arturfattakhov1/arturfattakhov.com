import type { Language } from '../i18n/config';

export const contactEmail = 'arturfattakhov1@gmail.com';

interface ContactPageCopy {
  hero: string;
  emailDescription: string;
  inquiryTypes: Array<{ title: string; description: string }>;
  profileLinkLabel: string;
  externalLinkLabel: string;
  profilesCta: string;
  responseNote: string;
}

export const contactPageCopy: Record<Language, ContactPageCopy> = {
  ru: {
    hero: 'Эта страница предназначена для содержательных профессиональных обращений к Артуру Фаттахову. По электронной почте можно направить исследовательское предложение, запрос на комментарий, приглашение к образовательному формату или вопрос, связанный с ветеринарной медициной и диагностикой.',
    emailDescription: 'Для первого обращения используйте электронную почту. Укажите тему, контекст, ожидаемый формат участия и желаемый срок ответа.',
    inquiryTypes: [
      { title: 'Профессиональные запросы', description: 'Обращения по ветеринарной медицине, диагностической визуализации, клиническим процессам и профессиональной экспертизе.' },
      { title: 'Исследовательское взаимодействие', description: 'Предложения с ясно сформулированным вопросом, методами, предполагаемым вкладом участников и ожидаемым результатом.' },
      { title: 'Медиа и комментарии', description: 'Запросы редакций с указанием темы, формата, площадки, срока и способа использования комментария.' },
      { title: 'Лекции и образовательные форматы', description: 'Приглашения с описанием аудитории, темы, формата, языка и организационных условий.' },
    ],
    profileLinkLabel: 'Открыть профиль',
    externalLinkLabel: 'откроется в новой вкладке',
    profilesCta: 'Все официальные профили',
    responseNote: 'Время ответа зависит от текущей нагрузки, полноты информации и характера запроса. Отправка письма не означает автоматического согласия на сотрудничество, публикацию комментария или участие в мероприятии.',
  },
  en: {
    hero: 'This page is for substantive professional inquiries to Artur Fattakhov. Email may be used for a research proposal, a request for commentary, an invitation to an educational format, or a question concerning veterinary medicine and diagnostics.',
    emailDescription: 'Use email for initial contact. Include the subject, relevant context, expected form of participation, and preferred response deadline.',
    inquiryTypes: [
      { title: 'Professional inquiries', description: 'Questions concerning veterinary medicine, diagnostic imaging, clinical workflows, and professional expertise.' },
      { title: 'Research collaboration', description: 'Proposals with a clearly defined question, methods, expected contributions, and intended outcome.' },
      { title: 'Media and commentary', description: 'Editorial requests stating the topic, format, outlet, deadline, and intended use of the contribution.' },
      { title: 'Lectures and educational formats', description: 'Invitations describing the audience, subject, format, language, and organisational conditions.' },
    ],
    profileLinkLabel: 'Open profile',
    externalLinkLabel: 'opens in a new tab',
    profilesCta: 'All official profiles',
    responseNote: 'Response time depends on current workload, the completeness of the information, and the nature of the inquiry. Sending an email does not constitute agreement to collaborate, provide a publishable comment, or participate in an event.',
  },
};

import type { Language } from '../i18n/config';

export const contactFormEndpoint = 'https://formspree.io/f/xgogvvao';

export const contactPageCopy: Record<Language, {
  introduction: string; formTitle: string;
  fields: { name: string; email: string; topic: string; message: string; messagePlaceholder: string };
  topics: Array<{ value: string; label: string }>;
  submit: string; submitting: string; success: string; error: string; requiredError: string; emailError: string;
  privacy: { before: string; link: string; after: string }; honeypot: string;
}> = {
  ru: {
    introduction: 'Используйте форму для ветеринарного вопроса, медиа-запроса, предложения о лекции, профессиональном проекте или партнёрстве. Форма не предназначена для экстренной помощи.',
    formTitle: 'Форма обращения',
    fields: { name: 'Имя', email: 'Email', topic: 'Тема обращения', message: 'Сообщение', messagePlaceholder: 'Кратко опишите контекст и ожидаемый результат' },
    topics: [
      { value: 'veterinary-question', label: 'Ветеринарный вопрос' }, { value: 'media', label: 'СМИ' },
      { value: 'lectures-workshops', label: 'Лекции и мастер-классы' }, { value: 'professional-projects', label: 'Профессиональные проекты' },
      { value: 'partnership', label: 'Партнёрство' }, { value: 'other', label: 'Другое' },
    ],
    submit: 'Отправить', submitting: 'Отправка…',
    success: 'Обращение принято. Если ответ требуется, я свяжусь с вами по указанному email.',
    error: 'Сообщение не отправлено из-за технической ошибки. Данные сохранены в форме — попробуйте отправить ещё раз позже.',
    requiredError: 'Заполните это поле.', emailError: 'Введите корректный адрес электронной почты.',
    privacy: { before: 'Форма передаётся через Formspree. Отправляя её, вы соглашаетесь на ', link: 'обработку указанных данных', after: ' для рассмотрения и ответа на обращение. Не прикладывайте медицинские файлы и не указывайте чувствительные данные.' }, honeypot: 'Не заполняйте это поле',
  },
  en: {
    introduction: 'Use the form for a veterinary question, media inquiry, lecture or workshop, professional project, or partnership. The form is not an emergency service.',
    formTitle: 'Contact form',
    fields: { name: 'Name', email: 'Email', topic: 'Topic', message: 'Message', messagePlaceholder: 'Briefly describe the context and expected outcome' },
    topics: [
      { value: 'veterinary-question', label: 'Veterinary question' }, { value: 'media', label: 'Media' },
      { value: 'lectures-workshops', label: 'Lectures and workshops' }, { value: 'professional-projects', label: 'Professional projects' },
      { value: 'partnership', label: 'Partnership' }, { value: 'other', label: 'Other' },
    ],
    submit: 'Send message', submitting: 'Sending…',
    success: 'Your inquiry has been received. If a response is required, I will contact you at the email provided.',
    error: 'The message was not sent because of a technical error. Your input remains in the form; please try again later.',
    requiredError: 'Complete this field.', emailError: 'Enter a valid email address.',
    privacy: { before: 'This form is transmitted through Formspree. By submitting it, you consent to the ', link: 'processing of the information provided', after: ' for inquiry review and response. Do not include medical files or sensitive information.' }, honeypot: 'Leave this field empty',
  },
};

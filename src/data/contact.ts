import type { Language } from '../i18n/config';

export const contactFormEndpoint = 'https://formspree.io/f/xgogvvao';

interface ContactFieldCopy {
  label: string;
  placeholder?: string;
}

interface ContactPageCopy {
  introduction: string;
  formTitle: string;
  fields: {
    firstName: ContactFieldCopy;
    lastName: ContactFieldCopy;
    email: ContactFieldCopy;
    message: ContactFieldCopy;
  };
  submit: string;
  submitting: string;
  success: string;
  error: string;
  requiredError: string;
  emailError: string;
  privacy: {
    beforeLink: string;
    link: string;
    afterLink: string;
  };
  honeypotLabel: string;
}

export const contactPageCopy = {
  ru: {
    introduction: 'Используйте форму, чтобы направить профессиональное обращение, предложение о сотрудничестве или другой профильный вопрос.',
    formTitle: 'Форма обращения',
    fields: {
      firstName: { label: 'Имя' },
      lastName: { label: 'Фамилия' },
      email: { label: 'Email' },
      message: { label: 'Сообщение', placeholder: 'Опишите ваш вопрос или предложение' },
    },
    submit: 'Отправить',
    submitting: 'Отправка...',
    success: 'Сообщение отправлено. Спасибо за обращение.',
    error: 'Не удалось отправить сообщение. Проверьте введённые данные и попробуйте ещё раз.',
    requiredError: 'Заполните это поле.',
    emailError: 'Введите корректный адрес электронной почты.',
    privacy: {
      beforeLink: 'Отправляя форму, вы соглашаетесь на ',
      link: 'обработку указанных данных',
      afterLink: ' для ответа на обращение.',
    },
    honeypotLabel: 'Не заполняйте это поле',
  },
  en: {
    introduction: 'Use this form to send a professional inquiry, collaboration proposal, or another relevant message.',
    formTitle: 'Contact form',
    fields: {
      firstName: { label: 'First name' },
      lastName: { label: 'Last name' },
      email: { label: 'Email' },
      message: { label: 'Message', placeholder: 'Describe your inquiry or proposal' },
    },
    submit: 'Send message',
    submitting: 'Sending...',
    success: 'Your message has been sent. Thank you for getting in touch.',
    error: 'The message could not be sent. Check the information and try again.',
    requiredError: 'Complete this field.',
    emailError: 'Enter a valid email address.',
    privacy: {
      beforeLink: 'By submitting this form, you consent to the ',
      link: 'processing of the provided information',
      afterLink: ' for the purpose of responding to your inquiry.',
    },
    honeypotLabel: 'Leave this field empty',
  },
} as const satisfies Record<Language, ContactPageCopy>;

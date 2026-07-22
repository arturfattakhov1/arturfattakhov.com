import type { Language } from '../i18n/config';

interface ConsultationPageCopy {
  opening: { eyebrow: string; lead: string; responseTime: string };
  suitable: { title: string; introduction: string; items: string[]; geography: string };
  limits: { title: string; paragraphs: string[] };
  process: { title: string; items: Array<{ title: string; description: string }> };
  formats: { title: string; introduction: string; items: string[] };
  cost: { title: string; paragraphs: string[] };
  urgent: { title: string; text: string; note: string };
  application: {
    title: string;
    introduction: string;
    fields: {
      name: string;
      email: string;
      countryOrRegion: string;
      animalSpecies: string;
      animalAge: string;
      preferredLanguage: string;
      preferredFormat: string;
      inquirySummary: string;
      inquiryPlaceholder: string;
      nonEmergencyConfirmation: string;
      privacyConsentBefore: string;
      privacyConsentLink: string;
      privacyConsentAfter: string;
    };
    species: Array<{ value: string; label: string }>;
    languages: Array<{ value: string; label: string }>;
    formats: Array<{ value: string; label: string }>;
    selectPlaceholder: string;
    submit: string;
    submitting: string;
    success: string;
    error: string;
    requiredError: string;
    emailError: string;
    honeypot: string;
  };
  legal: { title: string; text: string; links: { privacy: string; terms: string; disclaimer: string } };
}

export const consultationPageCopy: Record<Language, ConsultationPageCopy> = {
  ru: {
    opening: {
      eyebrow: 'Заявка на дистанционный формат',
      lead: 'Онлайн-консультация начинается с заявки и предварительной оценки. Отправка формы не означает автоматического принятия случая или подтверждения консультации.',
      responseTime: 'Первый ответ обычно предоставляется в течение 24 часов. Это ориентир, а не гарантированный срок ответа.',
    },
    suitable: {
      title: 'Для каких вопросов подходит формат',
      introduction: 'Дистанционный формат может быть полезен, когда нужно структурировать уже имеющуюся информацию и определить обоснованный следующий шаг.',
      items: [
        'обсудить состояние животного и доступные данные;',
        'разобрать имеющиеся заключения и результаты исследований;',
        'получить второе мнение или расширенный письменный разбор;',
        'обсудить заключения УЗИ и рентгенографии;',
        'согласовать последующее сопровождение по конкретному вопросу.',
      ],
      geography: 'Основной формат предназначен для владельцев в России и русскоязычных владельцев за рубежом. Работа на английском языке возможна только после индивидуального подтверждения доступности, правовых и платёжных условий.',
    },
    limits: {
      title: 'Что дистанционный формат не заменяет',
      paragraphs: [
        'Дистанционное обсуждение не заменяет физикальный осмотр, очную ветеринарную помощь и необходимые диагностические процедуры.',
        'Без достаточных клинических данных дистанционно нельзя ставить окончательный диагноз. По итогам предварительной оценки может быть рекомендовано очное обращение вместо онлайн-формата.',
      ],
    },
    process: {
      title: 'Как проходит взаимодействие',
      items: [
        { title: 'Заявка', description: 'Вы кратко описываете вопрос и имеющиеся данные без отправки медицинского архива.' },
        { title: 'Предварительная оценка', description: 'Я оцениваю вопрос и доступную информацию, чтобы понять, подходит ли дистанционный формат.' },
        { title: 'Согласование', description: 'До начала работы мы индивидуально согласуем подходящий формат и стоимость.' },
        { title: 'Оплата', description: 'После согласования производится полная оплата согласованным способом. Оплаты и checkout на сайте нет.' },
        { title: 'Консультация', description: 'Взаимодействие проходит в согласованном формате и в обозначенных заранее границах.' },
      ],
    },
    formats: {
      title: 'Возможные форматы',
      introduction: 'Конкретный вариант зависит от вопроса и подтверждается индивидуально. Возможны:',
      items: [
        'первичное дистанционное обсуждение;',
        'разбор имеющихся документов;',
        'второе мнение;',
        'обсуждение заключений УЗИ и рентгенографии;',
        'расширенный письменный разбор;',
        'аудио- или видеовзаимодействие;',
        'последующее сопровождение по согласованному вопросу.',
      ],
    },
    cost: {
      title: 'Стоимость и оплата',
      paragraphs: [
        'Универсальная цена не публикуется: объём работы зависит от вопроса, доступных данных и выбранного формата. Формат и стоимость сообщаются индивидуально до оплаты.',
        'На сайте нет автоматического бронирования и оплаты. После согласования требуется полная оплата согласованным способом до консультации.',
      ],
    },
    urgent: {
      title: 'Срочные состояния',
      text: 'При затруднённом дыхании, потере сознания, судорогах, сильном кровотечении, невозможности мочеиспускания или резком ухудшении необходимо немедленно обратиться в ближайшую доступную ветеринарную клинику, предпочтительно круглосуточную.',
      note: 'Онлайн-заявка не предназначена для экстренной помощи.',
    },
    application: {
      title: 'Заявка',
      introduction: 'Укажите только сведения, необходимые для предварительной оценки. Не вставляйте полный медицинский архив и не указывайте платёжные, паспортные или страховые данные.',
      fields: {
        name: 'Имя',
        email: 'Email',
        countryOrRegion: 'Страна или регион (необязательно)',
        animalSpecies: 'Вид животного',
        animalAge: 'Возраст животного (необязательно)',
        preferredLanguage: 'Предпочтительный язык (необязательно)',
        preferredFormat: 'Предпочтительный формат (необязательно)',
        inquirySummary: 'Краткое описание вопроса и имеющихся данных',
        inquiryPlaceholder: 'Кратко опишите вопрос, состояние животного и какие заключения или результаты уже есть. Не вставляйте полный медицинский архив.',
        nonEmergencyConfirmation: 'Подтверждаю, что заявка не касается экстренного состояния и не заменяет срочное обращение в клинику.',
        privacyConsentBefore: 'Соглашаюсь на ',
        privacyConsentLink: 'обработку указанных данных',
        privacyConsentAfter: ' через Formspree для рассмотрения заявки и ответа на неё.',
      },
      species: [
        { value: 'dog', label: 'Собака' },
        { value: 'cat', label: 'Кошка' },
        { value: 'other', label: 'Другое животное' },
      ],
      languages: [
        { value: 'ru', label: 'Русский' },
        { value: 'en', label: 'Английский — после подтверждения доступности' },
      ],
      formats: [
        { value: 'written', label: 'Письменный разбор' },
        { value: 'audio-video', label: 'Аудио- или видеовзаимодействие' },
        { value: 'no-preference', label: 'Нет предпочтений' },
      ],
      selectPlaceholder: 'Выберите вариант',
      submit: 'Отправить заявку',
      submitting: 'Отправка…',
      success: 'Заявка принята. Я предварительно оценю вопрос и свяжусь с вами по указанному email, чтобы сообщить, подходит ли дистанционный формат и какие следующие шаги возможны.',
      error: 'Заявка не отправлена из-за технической ошибки. Данные сохранены в форме — попробуйте ещё раз позже или отправьте форму обычным способом.',
      requiredError: 'Заполните это поле или подтвердите согласие.',
      emailError: 'Введите корректный адрес электронной почты.',
      honeypot: 'Не заполняйте это поле',
    },
    legal: {
      title: 'Конфиденциальность и условия',
      text: 'Заявка используется только для предварительной оценки и ответа. Медицинские файлы не загружаются, заявка не создаёт автоматического бронирования или оплаты и сама по себе не означает принятия случая.',
      links: { privacy: 'Конфиденциальность', terms: 'Условия', disclaimer: 'Отказ от ответственности' },
    },
  },
  en: {
    opening: {
      eyebrow: 'Application for a remote format',
      lead: 'An online consultation starts with an application and preliminary review. Submitting the form does not mean that the case has been accepted or the consultation confirmed.',
      responseTime: 'A first response is usually provided within 24 hours. This is a guideline, not a guaranteed service level.',
    },
    suitable: {
      title: 'Questions suited to this format',
      introduction: 'A remote format may be useful when the aim is to structure existing information and identify a well-founded next step.',
      items: [
        'discuss the animal’s condition and available information;',
        'review existing reports and test results;',
        'seek a second opinion or an extended written review;',
        'discuss ultrasound and radiography reports;',
        'agree follow-up support for a defined question.',
      ],
      geography: 'The main format is intended for people in Russia and Russian-speaking owners abroad. An English-language format is available only after individual confirmation of availability, legal conditions, and payment arrangements.',
    },
    limits: {
      title: 'What a remote format cannot replace',
      paragraphs: [
        'A remote discussion does not replace a physical examination, in-person veterinary care, or necessary diagnostic procedures.',
        'A definitive diagnosis cannot be made remotely without sufficient clinical evidence. Preliminary review may result in a recommendation to seek in-person care instead.',
      ],
    },
    process: {
      title: 'How the process works',
      items: [
        { title: 'Application', description: 'You briefly describe the question and available information without submitting a medical archive.' },
        { title: 'Preliminary review', description: 'I review the question and available information to decide whether a remote format is appropriate.' },
        { title: 'Agreement', description: 'Before any work begins, we agree the appropriate format and price individually.' },
        { title: 'Payment', description: 'Full payment is made by an agreed method after confirmation. There is no payment or checkout on this website.' },
        { title: 'Consultation', description: 'The consultation takes place in the agreed format and within the boundaries confirmed in advance.' },
      ],
    },
    formats: {
      title: 'Possible formats',
      introduction: 'The specific option depends on the inquiry and is confirmed individually. Possible formats include:',
      items: [
        'an initial remote discussion;',
        'review of existing documents;',
        'a second opinion;',
        'discussion of ultrasound and radiography reports;',
        'an extended written review;',
        'audio or video interaction;',
        'follow-up support for the agreed question.',
      ],
    },
    cost: {
      title: 'Price and payment',
      paragraphs: [
        'There is no universal published price: the scope depends on the inquiry, available information, and chosen format. The format and price are communicated individually before payment.',
        'There is no automatic booking or payment on this website. Full payment by an agreed method is required after confirmation and before the consultation.',
      ],
    },
    urgent: {
      title: 'Urgent conditions',
      text: 'If there is difficulty breathing, loss of consciousness, seizures, severe bleeding, inability to urinate, or sudden deterioration, seek immediate care at the nearest available veterinary clinic, preferably one open around the clock.',
      note: 'The online application is not intended for emergency care.',
    },
    application: {
      title: 'Application',
      introduction: 'Provide only the information needed for preliminary review. Do not paste a complete medical archive or include payment, passport, or insurance details.',
      fields: {
        name: 'Name',
        email: 'Email',
        countryOrRegion: 'Country or region (optional)',
        animalSpecies: 'Animal species',
        animalAge: 'Animal age (optional)',
        preferredLanguage: 'Preferred language (optional)',
        preferredFormat: 'Preferred format (optional)',
        inquirySummary: 'Brief summary of the inquiry and available information',
        inquiryPlaceholder: 'Briefly describe the question, the animal’s condition, and which reports or results are available. Do not paste a complete medical archive.',
        nonEmergencyConfirmation: 'I confirm that this is not an emergency and that the application does not replace urgent in-person care.',
        privacyConsentBefore: 'I consent to the ',
        privacyConsentLink: 'processing of the information provided',
        privacyConsentAfter: ' through Formspree for application review and response.',
      },
      species: [
        { value: 'dog', label: 'Dog' },
        { value: 'cat', label: 'Cat' },
        { value: 'other', label: 'Other animal' },
      ],
      languages: [
        { value: 'ru', label: 'Russian' },
        { value: 'en', label: 'English — subject to availability confirmation' },
      ],
      formats: [
        { value: 'written', label: 'Written review' },
        { value: 'audio-video', label: 'Audio or video interaction' },
        { value: 'no-preference', label: 'No preference' },
      ],
      selectPlaceholder: 'Select an option',
      submit: 'Submit application',
      submitting: 'Submitting…',
      success: 'Your application has been received. I will review the inquiry and contact you at the email provided to confirm whether a remote format is appropriate and what the next steps may be.',
      error: 'The application was not sent because of a technical error. Your input remains in the form; please try again later or use the native form submission.',
      requiredError: 'Complete this field or confirm your consent.',
      emailError: 'Enter a valid email address.',
      honeypot: 'Leave this field empty',
    },
    legal: {
      title: 'Privacy and terms',
      text: 'The application is used only for preliminary review and response. Medical files are not uploaded, no automatic booking or payment is created, and the application itself does not mean that the case has been accepted.',
      links: { privacy: 'Privacy', terms: 'Terms', disclaimer: 'Disclaimer' },
    },
  },
};

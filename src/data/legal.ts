import type { Language } from '../i18n/config';

export type LegalPageSlug = 'privacy' | 'terms' | 'disclaimer';

interface LegalSection {
  id: string;
  title: string;
  paragraphs: string[];
}

interface LegalPageCopy {
  introduction: string;
  sections: LegalSection[];
}

export const legalPageCopy: Record<Language, Record<LegalPageSlug, LegalPageCopy>> = {
  ru: {
    privacy: {
      introduction: 'Эта политика объясняет, какие данные могут обрабатываться при использовании arturfattakhov.com и как можно реализовать свои права.',
      sections: [
        {
          id: 'data-and-analytics',
          title: 'Данные и аналитика',
          paragraphs: [
            'Сайт не требует регистрации. При загрузке страниц хостинг-провайдер может обрабатывать технические сведения, включая IP-адрес, тип устройства, время запроса и запрошенный URL. Такие данные используются для доставки сайта, обеспечения безопасности и анализа общей посещаемости.',
            'На сайте не используется рекламное профилирование. Если в дальнейшем будет подключена отдельная аналитика, она должна использовать минимально необходимые данные; для технологий, требующих согласия, оно будет запрошено заранее.',
          ],
        },
        {
          id: 'cookies',
          title: 'Файлы cookie',
          paragraphs: [
            'Сайт не устанавливает рекламные или аналитические cookie собственным кодом. Технические cookie могут использоваться инфраструктурой хостинга только в объёме, необходимом для безопасности и работы сервиса. Внешние сайты применяют собственные правила после перехода по ссылке.',
          ],
        },
        {
          id: 'contact',
          title: 'Контактная форма и заявка на консультацию',
          paragraphs: [
            'При отправке контактной формы или заявки на консультацию обрабатываются имя, email и сведения, которые отправитель указывает в полях формы. Эти данные используются для рассмотрения обращения, ответа на него и ведения связанной переписки.',
            'Техническая передача и обработка обеих форм выполняется через Formspree. Загрузка медицинских файлов отсутствует. Не следует указывать в формах медицинские архивы, платёжные, паспортные, страховые или другие чувствительные данные. Данные форм не используются для рассылки без отдельного согласия.',
          ],
        },
        {
          id: 'external-links',
          title: 'Внешние ссылки',
          paragraphs: [
            'Сайт содержит ссылки на научные, профессиональные и публичные профили. После перехода обработка данных регулируется политикой соответствующего внешнего сервиса.',
          ],
        },
        {
          id: 'legal-basis-and-retention',
          title: 'Основания и сроки хранения',
          paragraphs: [
            'Технические данные обрабатываются в законных интересах безопасной и стабильной работы сайта. Переписка обрабатывается для ответа на запрос и, когда применимо, для принятия мер по инициативе отправителя. Данные хранятся не дольше, чем это необходимо для указанной цели, безопасности или выполнения правовых обязанностей.',
          ],
        },
        {
          id: 'rights',
          title: 'Права пользователя',
          paragraphs: [
            'В пределах применимого законодательства можно запросить доступ, исправление или удаление персональных данных, ограничение обработки, переносимость данных либо возразить против обработки. Если обработка основана на согласии, его можно отозвать. Также можно обратиться в компетентный надзорный орган.',
            'Запросы по вопросам конфиденциальности можно направить через контактную форму сайта. Для защиты данных может потребоваться разумное подтверждение личности.',
          ],
        },
      ],
    },
    terms: {
      introduction: 'Эти условия регулируют использование arturfattakhov.com как персонального профессионального и информационного сайта Артура Фаттахова.',
      sections: [
        {
          id: 'informational-purpose',
          title: 'Информационная цель',
          paragraphs: [
            'Материалы сайта предназначены для знакомства с профессиональной деятельностью, исследованиями, публикациями и связанными образовательными темами. Они не создают договорных отношений и не заменяют профессиональную консультацию.',
          ],
        },
        {
          id: 'copyright',
          title: 'Авторские права',
          paragraphs: [
            'Если не указано иное, тексты и оригинальная структура материалов сайта принадлежат Артуру Фаттахову. Допускаются ссылки и краткое цитирование с указанием источника. Полное воспроизведение, коммерческое распространение или изменение материалов требует предварительного разрешения, если закон не предусматривает иное.',
          ],
        },
        {
          id: 'consultation-applications',
          title: 'Заявки на консультацию',
          paragraphs: [
            'Отправка заявки не означает принятия случая, автоматического бронирования или возникновения платёжного обязательства. Возможность дистанционного формата, его объём и стоимость согласуются индивидуально до оплаты; оплата на сайте отсутствует.',
          ],
        },
        {
          id: 'acceptable-use',
          title: 'Допустимое использование',
          paragraphs: [
            'Запрещается использовать сайт для нарушения закона, вмешательства в его работу, обхода мер безопасности, автоматизированного сбора данных с чрезмерной нагрузкой либо ложного представления об авторстве или одобрении.',
          ],
        },
        {
          id: 'external-resources',
          title: 'Внешние ресурсы',
          paragraphs: [
            'Ссылки на внешние ресурсы предоставляются для удобства и подтверждения источников. Их содержание, доступность и условия использования контролируются соответствующими владельцами.',
          ],
        },
        {
          id: 'liability',
          title: 'Ограничение ответственности',
          paragraphs: [
            'Материалы предоставляются в информационных целях и могут обновляться. В пределах, допускаемых законом, владелец сайта не отвечает за решения, принятые исключительно на основании материалов сайта, временную недоступность или содержание внешних ресурсов.',
          ],
        },
      ],
    },
    disclaimer: {
      introduction: 'Этот отказ от ответственности определяет границы использования ветеринарных, медицинских и научных материалов сайта.',
      sections: [
        {
          id: 'veterinary-information',
          title: 'Ветеринарная информация',
          paragraphs: [
            'Информация о здоровье животных предназначена только для общего ознакомления. Она не является диагнозом, назначением лечения или индивидуальной ветеринарной консультацией и не учитывает состояние конкретного животного.',
            'Согласованный дистанционный формат не заменяет физикальный осмотр и без необходимых клинических данных не предназначен для постановки окончательного диагноза. Заявка служит только для предварительной оценки и сама по себе не означает принятия случая.',
            'При затруднённом дыхании, потере сознания, судорогах, сильном кровотечении, невозможности мочеиспускания или резком ухудшении необходимо немедленно обратиться в ближайшую доступную ветеринарную клинику, предпочтительно круглосуточную. Онлайн-заявка не предназначена для экстренной помощи.',
          ],
        },
        {
          id: 'scientific-work',
          title: 'Научные материалы',
          paragraphs: [
            'Раздел публикаций отражает научную работу и проверенные библиографические сведения. Отдельные публикации следует оценивать в контексте их методов, ограничений, даты и полного текста источника.',
          ],
        },
        {
          id: 'no-guarantees',
          title: 'Отсутствие гарантий',
          paragraphs: [
            'Предпринимаются разумные меры для точности и актуальности сайта, однако не даются гарантии полноты, постоянной доступности или применимости материалов к конкретной ситуации. Сайт не содержит обещаний определённого клинического, научного или профессионального результата.',
          ],
        },
        {
          id: 'external-content',
          title: 'Внешние материалы',
          paragraphs: [
            'Ссылки на сторонние сайты не означают принятия ответственности за их содержание, рекомендации, политику конфиденциальности или доступность.',
          ],
        },
      ],
    },
  },
  en: {
    privacy: {
      introduction: 'This policy explains what data may be processed when using arturfattakhov.com and how individuals can exercise their rights.',
      sections: [
        {
          id: 'data-and-analytics',
          title: 'Data and analytics',
          paragraphs: [
            'The website does not require registration. When pages are requested, the hosting provider may process technical information such as IP address, device type, request time, and requested URL. This information is used to deliver the website, maintain security, and understand aggregate traffic.',
            'The website does not use advertising profiling. If a dedicated analytics service is introduced in the future, it must use the minimum data necessary; consent will be requested in advance where a technology requires it.',
          ],
        },
        {
          id: 'cookies',
          title: 'Cookies',
          paragraphs: [
            'The website code does not set advertising or analytics cookies. The hosting infrastructure may use strictly necessary technical cookies for security and service operation. External websites apply their own rules after a visitor follows a link.',
          ],
        },
        {
          id: 'contact',
          title: 'Contact and consultation forms',
          paragraphs: [
            'When the contact form or consultation application is submitted, the name, email address, and information entered by the sender are processed. This information is used to review and respond to the inquiry and to manage related correspondence.',
            'Both forms are technically transmitted and processed through Formspree. Medical file upload is not available. Medical archives, payment, passport, insurance, or other sensitive information should not be entered in the forms. Form data is not used for mailing lists without separate consent.',
          ],
        },
        {
          id: 'external-links',
          title: 'External links',
          paragraphs: [
            'The website links to research, professional, and public profiles. Once a visitor follows a link, data processing is governed by the relevant external service’s privacy policy.',
          ],
        },
        {
          id: 'legal-basis-and-retention',
          title: 'Legal basis and retention',
          paragraphs: [
            'Technical data is processed on the basis of legitimate interests in operating a secure and reliable website. Correspondence is processed to answer an inquiry and, where applicable, to take steps requested by the sender. Data is retained only for as long as necessary for its stated purpose, security, or legal obligations.',
          ],
        },
        {
          id: 'rights',
          title: 'Individual rights',
          paragraphs: [
            'Subject to applicable law, individuals may request access, correction, deletion, restriction, or portability of their personal data, or object to its processing. Where processing relies on consent, consent may be withdrawn. Individuals may also complain to a competent supervisory authority.',
            'Privacy requests can be submitted through the website contact form. Reasonable identity verification may be required to protect personal data.',
          ],
        },
      ],
    },
    terms: {
      introduction: 'These terms govern use of arturfattakhov.com as the personal professional and informational website of Artur Fattakhov.',
      sections: [
        {
          id: 'informational-purpose',
          title: 'Informational purpose',
          paragraphs: [
            'Website materials describe professional work, research, publications, and related educational topics. They do not create a contractual relationship and do not replace professional advice.',
          ],
        },
        {
          id: 'copyright',
          title: 'Copyright',
          paragraphs: [
            'Unless stated otherwise, the text and original organization of website materials belong to Artur Fattakhov. Linking and brief quotation with attribution are permitted. Full reproduction, commercial distribution, or modification requires prior permission unless otherwise allowed by law.',
          ],
        },
        {
          id: 'consultation-applications',
          title: 'Consultation applications',
          paragraphs: [
            'Submitting an application does not mean that the case has been accepted, create an automatic booking, or create a payment obligation. The suitability, scope, and price of a remote format are agreed individually before payment; no payment is taken on this website.',
          ],
        },
        {
          id: 'acceptable-use',
          title: 'Acceptable use',
          paragraphs: [
            'The website must not be used to break the law, interfere with its operation, bypass security measures, perform automated extraction that creates excessive load, or falsely imply authorship or endorsement.',
          ],
        },
        {
          id: 'external-resources',
          title: 'External resources',
          paragraphs: [
            'Links to external resources are provided for convenience and source verification. Their content, availability, and terms are controlled by their respective owners.',
          ],
        },
        {
          id: 'liability',
          title: 'Limitation of liability',
          paragraphs: [
            'Materials are provided for informational purposes and may be updated. To the extent permitted by law, the website owner is not responsible for decisions based solely on website materials, temporary unavailability, or external content.',
          ],
        },
      ],
    },
    disclaimer: {
      introduction: 'This disclaimer defines the limits of veterinary, medical, and scientific information provided on the website.',
      sections: [
        {
          id: 'veterinary-information',
          title: 'Veterinary information',
          paragraphs: [
            'Animal-health information is provided for general informational purposes only. It is not a diagnosis, treatment plan, or individual veterinary consultation and does not account for the condition of a particular animal.',
            'An agreed remote format does not replace a physical examination and is not intended to provide a definitive diagnosis without the necessary clinical evidence. An application is for preliminary review only and does not itself mean that the case has been accepted.',
            'If there is difficulty breathing, loss of consciousness, seizures, severe bleeding, inability to urinate, or sudden deterioration, seek immediate care at the nearest available veterinary clinic, preferably one open around the clock. The online application is not intended for emergency care.',
          ],
        },
        {
          id: 'scientific-work',
          title: 'Scientific work',
          paragraphs: [
            'The publications section reflects scientific work and verified bibliographic information. Individual publications should be assessed in the context of their methods, limitations, date, and complete source text.',
          ],
        },
        {
          id: 'no-guarantees',
          title: 'No guarantees',
          paragraphs: [
            'Reasonable care is taken to keep the website accurate and current, but no guarantee is made regarding completeness, continuous availability, or suitability for a particular situation. The website makes no promise of a specific clinical, scientific, or professional outcome.',
          ],
        },
        {
          id: 'external-content',
          title: 'External content',
          paragraphs: [
            'Links to third-party websites do not imply responsibility for their content, recommendations, privacy practices, or availability.',
          ],
        },
      ],
    },
  },
};

import type { Language } from '../i18n/config';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqGroup {
  id: string;
  title: string;
  items: FaqItem[];
}

interface FaqPageCopy {
  hero: string;
  groups: FaqGroup[];
}

export const faqPageCopy: Record<Language, FaqPageCopy> = {
  ru: {
    hero: 'Ответы ниже кратко объясняют профессиональный профиль Артура Фаттахова, тематику сайта, принципы публикации информации и способы связи. Они основаны только на проверенных сведениях, доступных на этом сайте.',
    groups: [
      {
        id: 'identity-and-work',
        title: 'Профессиональный профиль',
        items: [
          { question: 'Кто такой Артур Фаттахов?', answer: 'Артур Фаттахов — ветеринарный врач, специалист по ультразвуковой диагностике, исследователь и предприниматель.' },
          { question: 'В каких областях он работает?', answer: 'Основные области — ветеринарная медицина собак и кошек, диагностическая визуализация, ультразвуковая диагностика, исследования, помощь на дому и применение цифровых инструментов.' },
          { question: 'С какими животными связана его ветеринарная работа?', answer: 'Профессиональный профиль этого сайта относится к ветеринарной помощи собакам и кошкам.' },
          { question: 'Какую роль играет ультразвуковая диагностика?', answer: 'Ультразвуковая диагностика является одним из основных профессиональных и исследовательских интересов Артура Фаттахова.' },
          { question: 'Какое предпринимательское направление представлено на сайте?', answer: 'Артур Фаттахов является основателем выездной ветеринарной службы для собак и кошек. Непроверенные названия, показатели и результаты здесь не публикуются.' },
        ],
      },
      {
        id: 'research-and-publications',
        title: 'Исследования и публикации',
        items: [
          { question: 'Каковы его исследовательские интересы?', answer: 'К ним относятся ветеринарная медицина, диагностическая визуализация, ультразвуковое исследование, рентгенографическая анатомия, морфометрия, клиническая поддержка решений и искусственный интеллект.' },
          { question: 'Где будут доступны публикации?', answer: 'Проверенные библиографические записи будут размещаться в разделе «Публикации». Официальные академические профили собраны на странице «Профили».' },
          { question: 'Почему на сайте нет списка неподтверждённых работ?', answer: 'Публикация добавляется только после проверки авторства, выходных данных, DOI или другой устойчивой ссылки на первоисточник.' },
          { question: 'Публикуются ли здесь показатели цитирования?', answer: 'Непроверенные и быстро меняющиеся показатели цитирования на сайте не публикуются.' },
          { question: 'Как исследователям предложить сотрудничество?', answer: 'Следует использовать страницу «Контакты» и описать исследовательский вопрос, методы, предполагаемый вклад участников и ожидаемый результат.' },
        ],
      },
      {
        id: 'knowledge-and-technology',
        title: 'База знаний и технологии',
        items: [
          { question: 'Какие темы охватывает этот сайт?', answer: 'Сайт охватывает профессиональный профиль, ветеринарную медицину, диагностическую визуализацию, исследования, публикации, проекты, технологии и официальные внешние профили.' },
          { question: 'Для чего создан раздел «База знаний»?', answer: 'Он предназначен для кратких проверенных вводных материалов и будущих ссылок на более подробный профессиональный контент.' },
          { question: 'Как рассматривается искусственный интеллект в ветеринарной медицине?', answer: 'Как инструмент, возможная польза которого должна оцениваться вместе с качеством данных, проверкой результата, известными ограничениями и ответственностью ветеринарного врача.' },
          { question: 'Что означает доказательная ветеринарная медицина?', answer: 'Это использование лучших доступных научных данных вместе с клинической оценкой, обстоятельствами конкретного пациента и честным учётом неопределённости.' },
          { question: 'Заменяет ли информация на сайте консультацию ветеринарного врача?', answer: 'Нет. Материалы общего характера не предназначены для постановки диагноза или выбора лечения конкретного животного.' },
        ],
      },
      {
        id: 'website-and-contact',
        title: 'Сайт, профили и связь',
        items: [
          { question: 'Зачем нужна профессиональная хронология?', answer: 'Она позволит связать проверенные этапы образования, клинической практики, исследований, публикаций и проектов без неподтверждённых дат.' },
          { question: 'Где находятся официальные профили?', answer: 'Подтверждённые научные, профессиональные и публичные ссылки собраны на странице «Профили» и берутся из единого источника данных сайта.' },
          { question: 'Как медиа могут связаться с Артуром Фаттаховым?', answer: 'На странице «Контакты» доступна форма для профессиональных и медиа-запросов.' },
          { question: 'Как поддерживается актуальность сайта?', answer: 'Новые сведения добавляются после проверки, а страницы обновляются, когда появляются подтверждённые изменения или первичные источники.' },
          { question: 'На каких языках доступен сайт?', answer: 'Основные страницы доступны на русском и английском языках с отдельными каноническими адресами для каждой версии.' },
        ],
      },
    ],
  },
  en: {
    hero: 'The answers below provide a concise explanation of Artur Fattakhov’s professional profile, the scope of this website, its publication principles, and official contact routes. They rely only on verified information available on this site.',
    groups: [
      {
        id: 'identity-and-work',
        title: 'Professional profile',
        items: [
          { question: 'Who is Artur Fattakhov?', answer: 'Artur Fattakhov is a veterinarian, veterinary ultrasound specialist, researcher, and entrepreneur.' },
          { question: 'What fields does he work in?', answer: 'His main fields are veterinary medicine for dogs and cats, diagnostic imaging, ultrasonography, research, home veterinary care, and the use of digital tools.' },
          { question: 'Which animals are covered by his veterinary work?', answer: 'The professional profile presented on this website concerns veterinary care for dogs and cats.' },
          { question: 'What role does veterinary ultrasonography have in his work?', answer: 'Veterinary ultrasonography is one of Artur Fattakhov’s principal professional and research interests.' },
          { question: 'What entrepreneurial work is described on the website?', answer: 'Artur Fattakhov is the founder of a home veterinary service for dogs and cats. Unverified names, metrics, and outcomes are not published here.' },
        ],
      },
      {
        id: 'research-and-publications',
        title: 'Research and publications',
        items: [
          { question: 'What are his research interests?', answer: 'They include veterinary medicine, diagnostic imaging, ultrasonography, radiographic anatomy, morphometry, clinical decision support, and artificial intelligence.' },
          { question: 'Where will publications be available?', answer: 'Verified bibliographic records will appear in the Publications section. Official academic profiles are collected on the Profiles page.' },
          { question: 'Why are unverified works not listed?', answer: 'A publication is added only after authorship, publication details, DOI, or another persistent original-source link has been checked.' },
          { question: 'Are citation metrics published here?', answer: 'Unverified and rapidly changing citation metrics are not published on this website.' },
          { question: 'How can researchers propose collaboration?', answer: 'Use the Contact page and describe the research question, methods, expected contributions, and intended outcome.' },
        ],
      },
      {
        id: 'knowledge-and-technology',
        title: 'Knowledge and technology',
        items: [
          { question: 'What topics does this website cover?', answer: 'The website covers the professional profile, veterinary medicine, diagnostic imaging, research, publications, projects, technology, and verified external profiles.' },
          { question: 'What is the purpose of the Knowledge Hub?', answer: 'It is intended for concise, verified introductions and future links to more detailed professional material.' },
          { question: 'How is artificial intelligence considered in veterinary medicine?', answer: 'As a tool whose possible value must be assessed together with data quality, output review, known limitations, and veterinarian responsibility.' },
          { question: 'What does evidence-based veterinary medicine mean?', answer: 'It combines the best available research evidence with clinical assessment, the circumstances of an individual patient, and transparent consideration of uncertainty.' },
          { question: 'Does this website replace consultation with a veterinarian?', answer: 'No. General material on this website is not intended to diagnose or select treatment for an individual animal.' },
        ],
      },
      {
        id: 'website-and-contact',
        title: 'Website, profiles, and contact',
        items: [
          { question: 'Why is there a professional timeline?', answer: 'It will connect verified milestones in education, clinical practice, research, publications, and projects without using unconfirmed dates.' },
          { question: 'Where are the official profiles?', answer: 'Verified research, professional, and public links are collected on the Profiles page and drawn from the website’s single identity-data source.' },
          { question: 'How can media contact Artur Fattakhov?', answer: 'The Contact page provides a form for professional and media inquiries.' },
          { question: 'How is this website maintained?', answer: 'New information is added after review, and pages are updated when verified changes or primary sources become available.' },
          { question: 'Which languages are available?', answer: 'The main pages are available in Russian and English, with separate canonical URLs for each language version.' },
        ],
      },
    ],
  },
};

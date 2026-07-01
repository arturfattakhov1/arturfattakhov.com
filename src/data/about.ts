import type { Language } from '../i18n/config';

interface AboutPageCopy {
  hero: string;
  biography: string[];
  expertiseIntroduction: string;
  expertise: string[];
  currentWork: string[];
  research: string[];
  placeholders: {
    projects: { title: string; description: string };
    education: { title: string; description: string };
    publications: { title: string; description: string };
    media: { title: string; description: string };
  };
  profileLinkLabel: string;
  externalLinkLabel: string;
  profileHubCta: string;
  contact: { description: string; cta: string };
}

export const aboutPageCopy: Record<Language, AboutPageCopy> = {
  ru: {
    hero: 'Я Артур Фаттахов — ветеринарный врач, специалист по ультразвуковой диагностике, исследователь и предприниматель.',
    biography: [
      'Моя профессиональная работа связана с ветеринарной медициной собак и кошек. В клинической практике меня особенно интересуют диагностическая визуализация, ультразвуковое исследование и последовательное клиническое мышление.',
      'Я рассматриваю диагностику как процесс, в котором результаты визуализации должны оцениваться вместе с анамнезом, клиническими признаками и другими доступными данными. Такой подход помогает формулировать вопросы точнее и принимать более обоснованные решения.',
      'Как исследователь, я изучаю направления на пересечении ветеринарной медицины, анатомии, морфометрии, диагностических методов и цифровых технологий. Как предприниматель, я являюсь основателем выездной ветеринарной службы для собак и кошек.',
      'Этот сайт служит единым источником проверенной информации о моей профессиональной деятельности, исследовательских интересах, публикациях и официальных профилях.',
    ],
    expertiseIntroduction: 'Мой профессиональный фокус:',
    expertise: [
      'ветеринарная медицина собак и кошек и организация последовательного клинического процесса;',
      'ультразвуковая диагностика и интерпретация результатов в клиническом контексте;',
      'диагностическая визуализация, рентгенографическая анатомия и морфометрия;',
      'доказательная ветеринарная медицина и критическая оценка источников;',
      'клиническое мышление и поддержка принятия врачебных решений;',
      'ветеринарная помощь на дому и стандартизация рабочих процессов;',
      'искусственный интеллект и цифровые инструменты в ветеринарной медицине.',
    ],
    currentWork: [
      'Моя текущая работа объединяет клиническую ветеринарную практику, ультразвуковую диагностику, развитие помощи на дому и исследовательские задачи.',
      'В предпринимательской работе я сосредоточен на выездной ветеринарной службе для собак и кошек. Основное внимание уделяю понятным рабочим процессам, качеству клинических решений и ответственному применению технологий.',
    ],
    research: [
      'Мои долгосрочные исследовательские интересы включают ветеринарную медицину, диагностическую визуализацию, ультразвуковое исследование, рентгенографическую анатомию, морфометрию и клиническую поддержку принятия решений.',
      'Отдельное направление интереса — применение искусственного интеллекта в ветеринарной медицине: качество исходных данных, проверяемость результатов, ограничения моделей и роль врача в окончательном решении.',
      'Я открыт к международному научному взаимодействию по темам, где цели, методы и вклад участников могут быть определены прозрачно. Научная коммуникация для меня означает точное изложение методов и результатов без преувеличений и публикацию только проверенных сведений.',
    ],
    placeholders: {
      projects: { title: 'Проверенные проектные записи', description: 'Проектные страницы будут добавляться после подтверждения публичного названия, цели, статуса и моей роли.' },
      education: { title: 'Проверенные сведения об образовании', description: 'Данные об образовании будут опубликованы после сверки с первичными документами.' },
      publications: { title: 'Проверенные библиографические записи', description: 'Публикации будут добавляться после проверки авторства, выходных данных и ссылки на первоисточник.' },
      media: { title: 'Проверенные медиа-материалы', description: 'Интервью, лекции и другие материалы будут добавляться только со ссылкой на исходную публикацию.' },
    },
    profileLinkLabel: 'Открыть профиль',
    externalLinkLabel: 'откроется в новой вкладке',
    profileHubCta: 'Все официальные профили',
    contact: { description: 'Для профессиональных, исследовательских, образовательных и медиа-запросов используйте официальную страницу контактов.', cta: 'Перейти к контактам' },
  },
  en: {
    hero: 'I am Artur Fattakhov — a veterinarian, veterinary ultrasound specialist, researcher, and entrepreneur.',
    biography: [
      'My professional work is centred on veterinary medicine for dogs and cats. Within clinical practice, I have a particular interest in diagnostic imaging, ultrasonography, and structured clinical reasoning.',
      'I approach diagnostics as a process in which imaging findings should be interpreted alongside history, clinical signs, and other available evidence. This helps define clinical questions more precisely and supports better-reasoned decisions.',
      'As a researcher, I explore areas connecting veterinary medicine, anatomy, morphometry, diagnostic methods, and digital technologies. As an entrepreneur, I am the founder of a home veterinary service for dogs and cats.',
      'This website is the central source for verified information about my professional work, research interests, publications, and official profiles.',
    ],
    expertiseIntroduction: 'My professional focus includes:',
    expertise: [
      'veterinary medicine for dogs and cats and structured clinical workflows;',
      'veterinary ultrasonography and interpretation in clinical context;',
      'diagnostic imaging, radiographic anatomy, and morphometry;',
      'evidence-based veterinary medicine and critical appraisal of sources;',
      'clinical reasoning and decision support;',
      'home veterinary care and workflow standardisation;',
      'artificial intelligence and digital tools in veterinary medicine.',
    ],
    currentWork: [
      'My current work connects clinical veterinary practice, ultrasonography, the development of home veterinary care, and research questions.',
      'In my entrepreneurial work, I focus on a home veterinary service for dogs and cats. The priorities are clear workflows, the quality of clinical decisions, and the responsible use of technology.',
    ],
    research: [
      'My long-term research interests include veterinary medicine, diagnostic imaging, ultrasonography, radiographic anatomy, morphometry, and clinical decision support.',
      'A separate area of interest is artificial intelligence in veterinary medicine, including input-data quality, result validation, model limitations, and the veterinarian’s role in final decisions.',
      'I am open to international scientific collaboration where aims, methods, and individual contributions can be defined transparently. For me, scientific communication means describing methods and results accurately, without exaggeration, and publishing only verified information.',
    ],
    placeholders: {
      projects: { title: 'Verified project records', description: 'Project pages will be added after the public name, purpose, status, and my role have been confirmed.' },
      education: { title: 'Verified education records', description: 'Education details will be published after they have been checked against primary documents.' },
      publications: { title: 'Verified bibliographic records', description: 'Publications will be added after authorship, publication details, and the original source link have been checked.' },
      media: { title: 'Verified media material', description: 'Interviews, lectures, and other material will be added only with a link to the original publication.' },
    },
    profileLinkLabel: 'Open profile',
    externalLinkLabel: 'opens in a new tab',
    profileHubCta: 'All official profiles',
    contact: { description: 'Use the official contact page for professional, research, educational, and media inquiries.', cta: 'Go to contact page' },
  },
};

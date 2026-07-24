import type { Language } from '../i18n/config';

interface AboutPageCopy {
  introduction: { roles: string[]; lead: string; body: string };
  motivation: { body: string };
  practice: { body: string; details: string[] };
  imaging: { body: string; details: string[] };
  entrepreneurship: { body: string };
  qualification: { body: string; details: string[] };
  vision: { body: string; principles: string[] };
  timeline: { introduction: string; sourceLabel: string };
  links: { practice: string; research: string; publications: string; caseStudy: string; contact: string };
}

export const aboutPageCopy: Record<Language, AboutPageCopy> = {
  ru: {
    introduction: {
      roles: ['Ветеринарный врач', 'Специалист визуальной диагностики', 'Предприниматель'],
      lead: 'Я работаю на пересечении клинической ветеринарной медицины, визуальной диагностики и профессиональных проектов.',
      body: 'Моя задача — собирать клинический контекст, точно интерпретировать доступные данные и ясно объяснять владельцу животного границы выводов и следующий практический шаг.',
    },
    motivation: {
      body: 'В ветеринарной медицине решение редко строится на одном симптоме или одном исследовании. Мне близка работа, в которой наблюдение, данные диагностики и ответственность перед животным и его владельцем соединяются в единый процесс.',
    },
    practice: {
      body: 'В клинической практике я работаю с собаками и кошками. Рассматриваю анамнез, осмотр и результаты исследований вместе, а не как отдельные фрагменты.',
      details: ['сбор анамнеза и клинический осмотр', 'ведение медицинской документации', 'коммуникация с владельцами животных'],
    },
    imaging: {
      body: 'Визуальная диагностика помогает уточнять клинический вопрос. Я использую результаты ультразвуковых и рентгенографических исследований в связи с анамнезом, клиническими признаками и другими доступными данными.',
      details: ['ультразвуковые исследования', 'рентгенографическая анатомия', 'диагностическая интерпретация в клиническом контексте'],
    },
    entrepreneurship: {
      body: 'Предпринимательский опыт помогает мне проектировать понятный путь обращения, стандартизировать документацию и оценивать качество не только отдельного визита, но и всего сервиса. В публичном профиле я описываю этот опыт без раскрытия внутренних проектов и планов.',
    },
    qualification: {
      body: 'В 2024 году я завершил подготовку с квалификацией «Исследователь. Преподаватель-исследователь». Она дополняет клиническую работу навыками постановки вопросов, анализа методов и точного представления результатов.',
      details: ['сравнительная анатомия', 'ветеринарная морфология', 'рентгеноморфометрия'],
    },
    vision: {
      body: 'Выездная помощь, клиника, стационар и телемедицина решают разные задачи. Я считаю, что эти форматы должны дополнять друг друга и направлять пациента туда, где конкретная ситуация может быть решена безопаснее и точнее.',
      principles: ['Технологии и ИИ могут помогать врачу работать с данными и процессами.', 'Они не заменяют клиническое мышление, осмотр и профессиональную ответственность.'],
    },
    timeline: {
      introduction: 'Ключевые подтверждённые этапы собраны здесь как ориентир, а не как полный CV.',
      sourceLabel: 'Проверенный этап',
    },
    links: {
      practice: 'Практика',
      research: 'Исследования',
      publications: 'Публикации',
      caseStudy: 'Практический digital-кейс: восстановление legacy veterinary software',
      contact: 'Связаться',
    },
  },
  en: {
    introduction: {
      roles: ['Veterinary Doctor', 'Diagnostic Imaging Specialist', 'Entrepreneur'],
      lead: 'I work at the intersection of clinical veterinary medicine, diagnostic imaging, and professional projects.',
      body: 'My task is to assemble the clinical context, interpret the available evidence precisely, and explain the limits of each conclusion and the next practical step clearly to the animal owner.',
    },
    motivation: {
      body: 'In veterinary medicine, a decision rarely rests on one symptom or one investigation. I value work that brings observation, diagnostic evidence, and responsibility to the animal and its owner into one process.',
    },
    practice: {
      body: 'In clinical practice, I work with dogs and cats. I consider history, examination, and investigation results together rather than as separate fragments.',
      details: ['history taking and clinical examination', 'medical documentation', 'communication with animal owners'],
    },
    imaging: {
      body: 'Diagnostic imaging helps refine the clinical question. I interpret ultrasonographic and radiographic findings in relation to history, clinical signs, and the other evidence available.',
      details: ['ultrasonography', 'radiographic anatomy', 'diagnostic interpretation in clinical context'],
    },
    entrepreneurship: {
      body: 'My entrepreneurial experience helps me design a clear inquiry pathway, standardise documentation, and assess the quality of the whole service rather than a single visit. This public profile describes that experience without disclosing internal projects or plans.',
    },
    qualification: {
      body: 'In 2024, I completed the qualification “Researcher. Research Teacher”. It complements clinical work with skills in framing questions, analysing methods, and reporting results precisely.',
      details: ['comparative anatomy', 'veterinary morphology', 'radiomorphometry'],
    },
    vision: {
      body: 'Mobile care, clinics, hospitals, and telemedicine solve different problems. I believe these formats should complement one another and direct each patient to the setting where the specific situation can be managed more safely and precisely.',
      principles: ['Technology and AI can help a clinician work with evidence and processes.', 'They do not replace clinical reasoning, examination, or professional responsibility.'],
    },
    timeline: {
      introduction: 'Selected verified milestones are shown here as orientation rather than as a full CV.',
      sourceLabel: 'Verified milestone',
    },
    links: {
      practice: 'Practice',
      research: 'Research',
      publications: 'Publications',
      caseStudy: 'Practical digital case: restoring legacy veterinary software',
      contact: 'Contact',
    },
  },
};

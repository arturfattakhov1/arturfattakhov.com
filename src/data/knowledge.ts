import type { Language } from '../i18n/config';

interface KnowledgeTopic {
  id: string;
  title: string;
  description: string;
  relatedPublicationSlugs?: string[];
}

interface KnowledgePageCopy {
  hero: string;
  topics: KnowledgeTopic[];
}

export const knowledgePageCopy: Record<Language, KnowledgePageCopy> = {
  ru: {
    hero: 'Этот раздел формирует долгосрочную профессиональную базу знаний Артура Фаттахова. Здесь будут появляться краткие обзоры, объяснения понятий и ссылки на проверенные материалы по ветеринарной медицине, диагностике, исследованиям и технологиям.',
    topics: [
      {
        id: 'veterinary-medicine',
        title: 'Ветеринарная медицина',
        description: 'Раздел будет объединять материалы о ветеринарной помощи собакам и кошкам, клиническом мышлении, диагностике и последовательном ведении пациента. Информация общего характера не заменяет индивидуальную консультацию ветеринарного врача.',
        relatedPublicationSlugs: ['distal-limb-disorders-cattle', 'ovariectomy-ovariohysterectomy-cats', 'feline-calicivirus-saint-petersburg', 'urethral-intussusception-cat'],
      },
      {
        id: 'diagnostic-imaging',
        title: 'Диагностическая визуализация',
        description: 'Будущие материалы будут объяснять роль визуальных методов в изучении анатомии и оценке клинических изменений. Особое внимание будет уделяться связи изображения с анамнезом, осмотром и другими данными.',
        relatedPublicationSlugs: ['comparative-xray-morphometry-moose-cattle', 'diagnostic-imaging-distal-limb-cattle', 'xray-morphometric-laminitis-cattle-patent'],
      },
      {
        id: 'veterinary-ultrasonography',
        title: 'Ветеринарная ультразвуковая диагностика',
        description: 'Раздел будет посвящён принципам ультразвукового исследования, качеству получения изображений и интерпретации результатов в клиническом контексте. Конкретные материалы будут добавляться после профессиональной проверки.',
      },
      {
        id: 'research',
        title: 'Исследования',
        description: 'Здесь будут собраны вводные материалы о постановке исследовательского вопроса, методах, морфометрии, рентгенографической анатомии и воспроизводимом описании результатов.',
        relatedPublicationSlugs: ['comparative-xray-morphometry-moose-cattle', 'hoof-capsule-cattle-moose'],
      },
      {
        id: 'artificial-intelligence',
        title: 'Искусственный интеллект',
        description: 'Раздел будет рассматривать возможные применения ИИ в ветеринарной медицине вместе с требованиями к качеству данных, проверке результатов, прозрачности ограничений и ответственности врача.',
      },
      {
        id: 'evidence-based-veterinary-medicine',
        title: 'Доказательная ветеринарная медицина',
        description: 'Будущие материалы будут посвящены поиску и критической оценке источников, применимости научных данных к клиническому вопросу и честному описанию неопределённости.',
      },
      {
        id: 'scientific-communication',
        title: 'Научная коммуникация',
        description: 'Раздел будет объяснять, как точно представлять методы, результаты и ограничения исследований для профессиональной и широкой аудитории без упрощений, искажающих смысл.',
      },
    ],
  },
  en: {
    hero: 'This section establishes Artur Fattakhov’s long-term professional knowledge base. It will contain concise overviews, explanations of key concepts, and links to verified material on veterinary medicine, diagnostics, research, and technology.',
    topics: [
      {
        id: 'veterinary-medicine',
        title: 'Veterinary Medicine',
        description: 'This area will connect material on veterinary care for dogs and cats, clinical reasoning, diagnostics, and continuity of patient management. General information does not replace individual consultation with a veterinarian.',
        relatedPublicationSlugs: ['distal-limb-disorders-cattle', 'ovariectomy-ovariohysterectomy-cats', 'feline-calicivirus-saint-petersburg', 'urethral-intussusception-cat'],
      },
      {
        id: 'diagnostic-imaging',
        title: 'Diagnostic Imaging',
        description: 'Future material will explain the role of imaging methods in the study of anatomy and assessment of clinical changes. Particular attention will be paid to interpreting images alongside history, examination, and other data.',
        relatedPublicationSlugs: ['comparative-xray-morphometry-moose-cattle', 'diagnostic-imaging-distal-limb-cattle', 'xray-morphometric-laminitis-cattle-patent'],
      },
      {
        id: 'veterinary-ultrasonography',
        title: 'Veterinary Ultrasonography',
        description: 'This area will cover principles of ultrasound examination, image-acquisition quality, and interpretation of findings in clinical context. Specific material will be added after professional review.',
      },
      {
        id: 'research',
        title: 'Research',
        description: 'This area will provide introductions to research questions, methods, morphometry, radiographic anatomy, and reproducible reporting of results.',
        relatedPublicationSlugs: ['comparative-xray-morphometry-moose-cattle', 'hoof-capsule-cattle-moose'],
      },
      {
        id: 'artificial-intelligence',
        title: 'Artificial Intelligence',
        description: 'This area will examine possible uses of AI in veterinary medicine together with requirements for data quality, output review, transparent limitations, and clinician responsibility.',
      },
      {
        id: 'evidence-based-veterinary-medicine',
        title: 'Evidence-Based Veterinary Medicine',
        description: 'Future material will address literature search, critical appraisal, application of research evidence to clinical questions, and accurate communication of uncertainty.',
      },
      {
        id: 'scientific-communication',
        title: 'Scientific Communication',
        description: 'This area will explain how to present research methods, results, and limitations accurately to professional and wider audiences without oversimplifying the meaning.',
      },
    ],
  },
};

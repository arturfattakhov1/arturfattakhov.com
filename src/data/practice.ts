import type { Language } from '../i18n/config';

interface PracticePageCopy {
  opening: { eyebrow: string; lead: string; context: string };
  formats: { title: string; introduction: string; items: Array<{ title: string; description: string }> };
  process: { title: string; items: Array<{ title: string; description: string }> };
  principles: { title: string; items: Array<{ title: string; description: string }> };
  limits: { title: string; paragraphs: string[]; urgentTitle: string; urgentText: string };
  contact: { title: string; description: string; primaryCta: string; secondaryCta: string };
}

export const practicePageCopy: Record<Language, PracticePageCopy> = {
  ru: {
    opening: {
      eyebrow: 'Частная ветеринарная практика',
      lead: 'Я работаю как практикующий ветеринарный врач с владельцами собак и кошек в Санкт-Петербурге и Ленинградской области.',
      context: 'Формат взаимодействия зависит от состояния животного, доступных данных и того, можно ли безопасно решить вопрос без очного осмотра.',
    },
    formats: {
      title: 'С какими форматами можно обратиться',
      introduction: 'До начала работы мы согласуем задачу и подходящий формат.',
      items: [
        { title: 'Выездная ветеринарная помощь', description: 'Помощь собакам и кошкам в Санкт-Петербурге и Ленинградской области по предварительному согласованию.' },
        { title: 'Очное взаимодействие', description: 'Очный формат возможен по предварительному согласованию в зависимости от задачи и местоположения.' },
        { title: 'Дистанционное обсуждение', description: 'Можно обсудить уже имеющуюся медицинскую информацию и дальнейшие обоснованные действия.' },
        { title: 'Визуальная диагностика', description: 'Использую её как инструмент клинической оценки в связи с анамнезом, осмотром и другими данными.' },
      ],
    },
    process: {
      title: 'Как проходит взаимодействие',
      items: [
        { title: 'Контекст', description: 'Вы описываете вопрос, состояние животного и доступные данные через заявку на онлайн-консультацию или страницу контактов.' },
        { title: 'Формат', description: 'Я оцениваю, какой формат уместен. Заявка не означает принятия случая; стоимость и дальнейшее взаимодействие согласуются отдельно.' },
        { title: 'Следующий шаг', description: 'После обсуждения или осмотра формулирую границы оценки и следующий обоснованный шаг.' },
      ],
    },
    principles: {
      title: 'Профессиональные принципы',
      items: [
        { title: 'Клинический контекст', description: 'Оцениваю данные в связи с анамнезом, состоянием животного и клиническим вопросом.' },
        { title: 'Ясные границы', description: 'Отделяю подтверждённые сведения от предположений и прямо обозначаю ограничения доступной информации.' },
        { title: 'Ответственные технологии', description: 'Технологии помогают врачу работать с данными, но не заменяют клиническое мышление.' },
      ],
    },
    limits: {
      title: 'Ограничения дистанционного формата',
      paragraphs: [
        'Дистанционное обсуждение не заменяет физикальный осмотр и не предназначено для постановки окончательного диагноза без необходимых клинических данных.',
        'Окончательное решение может требовать очного обращения, осмотра и дополнительной диагностики. Дистанционный формат не подходит для экстренных состояний.',
      ],
      urgentTitle: 'Если состояние ухудшается',
      urgentText: 'При затруднённом дыхании, потере сознания, судорогах, сильном кровотечении, невозможности мочеиспускания или резком ухудшении немедленно обратитесь в ближайшую доступную ветеринарную клинику, предпочтительно круглосуточную.',
    },
    contact: {
      title: 'Следующий шаг',
      description: 'Для дистанционного вопроса отправьте заявку на предварительную оценку. Для медиа, лекций, проектов и других обращений используйте общую форму контактов.',
      primaryCta: 'Онлайн-консультация',
      secondaryCta: 'Связаться',
    },
  },
  en: {
    opening: {
      eyebrow: 'Private veterinary practice',
      lead: 'I work as a practising veterinary doctor with dog and cat owners in Saint Petersburg and the Leningrad Region.',
      context: 'The appropriate format depends on the animal’s condition, the information available, and whether the question can be handled safely without an in-person examination.',
    },
    formats: {
      title: 'Ways to work with me',
      introduction: 'We clarify the question and agree on an appropriate format before proceeding.',
      items: [
        { title: 'Mobile veterinary care', description: 'Care for dogs and cats in Saint Petersburg and the Leningrad Region by prior arrangement.' },
        { title: 'In-person interaction', description: 'An in-person format may be arranged in advance depending on the question and location.' },
        { title: 'Remote discussion', description: 'We can discuss existing medical information and the next well-founded actions.' },
        { title: 'Diagnostic imaging', description: 'I use it as a clinical assessment tool alongside history, examination, and other available evidence.' },
      ],
    },
    process: {
      title: 'How the process works',
      items: [
        { title: 'Context', description: 'You describe the question, the animal’s condition, and the available information through the online consultation application or contact page.' },
        { title: 'Format', description: 'I consider which format is appropriate. An application does not mean the case has been accepted; price and next steps are agreed separately.' },
        { title: 'Next step', description: 'After a discussion or examination, I explain the limits of the assessment and the next well-founded step.' },
      ],
    },
    principles: {
      title: 'Professional principles',
      items: [
        { title: 'Clinical context', description: 'I interpret information in relation to history, the animal’s condition, and the clinical question.' },
        { title: 'Clear boundaries', description: 'I separate verified information from assumptions and state the limits of the available evidence.' },
        { title: 'Responsible technology', description: 'Technology can support a doctor’s work with information, but it does not replace clinical reasoning.' },
      ],
    },
    limits: {
      title: 'Limits of remote discussion',
      paragraphs: [
        'A remote discussion does not replace a physical examination and is not intended to provide a definitive diagnosis without the necessary clinical information.',
        'A final decision may require an in-person visit, examination, and further diagnostics. Remote discussion is not suitable for emergencies.',
      ],
      urgentTitle: 'If the condition deteriorates',
      urgentText: 'If there is difficulty breathing, loss of consciousness, seizures, severe bleeding, inability to urinate, or sudden deterioration, seek immediate care at the nearest available veterinary clinic, preferably one open around the clock.',
    },
    contact: {
      title: 'Next step',
      description: 'For a remote veterinary question, submit an application for preliminary review. Use the general contact form for media, lectures, projects, and other inquiries.',
      primaryCta: 'Online consultation',
      secondaryCta: 'Contact',
    },
  },
};

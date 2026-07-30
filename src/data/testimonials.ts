import type { Language } from '../i18n/config';

export type TestimonialId =
  | 'testimonial-1'
  | 'testimonial-2'
  | 'testimonial-3'
  | 'testimonial-4'
  | 'testimonial-5';

interface LocalizedTestimonial {
  text: string;
  attribution: string;
}

export interface PracticeTestimonial {
  id: TestimonialId;
  ru: LocalizedTestimonial;
  en: LocalizedTestimonial;
}

export const testimonialSectionCopy: Record<Language, { title: string; translationNote?: string }> = {
  ru: {
    title: 'Отзывы владельцев',
  },
  en: {
    title: 'Client feedback',
    translationNote: 'Translated from the original Russian reviews.',
  },
};

export const practiceTestimonials: readonly PracticeTestimonial[] = [
  {
    id: 'testimonial-1',
    ru: {
      text: 'Спасибо Артуру за профессиональную консультацию. Он быстро и грамотно ответил на все мои вопросы и дал понятные рекомендации по дальнейшим действиям.',
      attribution: 'Владелец кота',
    },
    en: {
      text: 'Thank you to Artur for a professional consultation. He answered all my questions clearly and promptly and provided understandable recommendations for the next steps.',
      attribution: 'Cat owner',
    },
  },
  {
    id: 'testimonial-2',
    ru: {
      text: 'Когда из-за перекрытой дороги не было возможности попасть к ветеринарному врачу очно, консультация помогла определить дальнейшие действия по состоянию собаки. Спасибо за профессиональный подход.',
      attribution: 'Владелец собаки',
    },
    en: {
      text: 'When a road closure made an in-person veterinary visit impossible, the consultation helped us understand the next steps for our dog. Thank you for the professional approach.',
      attribution: 'Dog owner',
    },
  },
  {
    id: 'testimonial-3',
    ru: {
      text: 'Артур внимательно собрал анамнез, провёл осмотр и подробно объяснял каждое действие. Он составил понятный и последовательный план лечения, ответил на все вопросы и после визита оставался на связи, интересуясь состоянием кота.',
      attribution: 'Владелец кота',
    },
    en: {
      text: 'Artur took a careful history, examined the cat, and explained each step in detail. He provided a clear and structured treatment plan, answered every question, and remained available after the visit to check on the cat’s condition.',
      attribution: 'Cat owner',
    },
  },
  {
    id: 'testimonial-4',
    ru: {
      text: 'Доктор приехал в назначенное время, провёл УЗИ, взял анализы крови, осмотрел кошку и ответил на все вопросы. Очень внимательный и чуткий специалист, который уделил питомцу достаточно времени.',
      attribution: 'Владелец кошки',
    },
    en: {
      text: 'The doctor arrived at the agreed time, performed an ultrasound examination, collected blood samples, examined the cat, and answered all our questions. He was attentive, considerate, and gave the pet the time she needed.',
      attribution: 'Cat owner',
    },
  },
  {
    id: 'testimonial-5',
    ru: {
      text: 'Артур внимательно изучил результаты предыдущих анализов, провёл всесторонний осмотр и рекомендовал необходимый минимум дополнительных исследований. Дальнейшее лечение планировалось определить после получения результатов.',
      attribution: 'Владелец кота',
    },
    en: {
      text: 'Artur carefully reviewed the previous test results, performed a thorough examination, and recommended only the necessary additional tests. The next treatment steps were to be determined after the results became available.',
      attribution: 'Cat owner',
    },
  },
];

import type { ImageMetadata } from 'astro';
import glpNationalInternationalProgrammes from '../assets/images/credentials/glp-national-international-programmes.webp';
import glpQualityAssurance from '../assets/images/credentials/glp-quality-assurance.webp';
import productManagementCourse from '../assets/images/credentials/product-management-course.webp';
import type { Language } from '../i18n/config';

interface ProfessionalCredential {
  id: string;
  image: ImageMetadata;
  title: string;
  organization: string;
  date: string;
  documentLanguage: string;
  alt: string;
}

const credentials: Record<Language, ProfessionalCredential[]> = {
  ru: [
    {
      id: 'glp-national-international-programmes',
      image: glpNationalInternationalProgrammes,
      title: 'Международная и национальные GLP-программы',
      organization: 'РНИМУ им. Н. И. Пирогова, Институт фармации и медицинской химии',
      date: '29 февраля 2024',
      documentLanguage: 'Документ на русском языке',
      alt: 'Сертификат Артура Фаттахова о вебинаре по международной и национальным GLP-программам',
    },
    {
      id: 'glp-quality-assurance',
      image: glpQualityAssurance,
      title: 'Программа обеспечения качества GLP-исследований',
      organization: 'РНИМУ им. Н. И. Пирогова, Институт фармации и медицинской химии',
      date: '21 марта 2024',
      documentLanguage: 'Документ на русском языке',
      alt: 'Сертификат Артура Фаттахова о программе обеспечения качества GLP-исследований',
    },
    {
      id: 'product-management-course',
      image: productManagementCourse,
      title: 'Управление продуктом — 16 академических часов',
      organization: 'WINbd Академия управления',
      date: '18–19 ноября 2024',
      documentLanguage: 'Документ на русском языке',
      alt: 'Сертификат Артура Фаттахова о тренинге по управлению продуктом',
    },
  ],
  en: [
    {
      id: 'glp-national-international-programmes',
      image: glpNationalInternationalProgrammes,
      title: 'International and national GLP programmes',
      organization: 'Pirogov Russian National Research Medical University, Institute of Pharmacy and Medicinal Chemistry',
      date: '29 February 2024',
      documentLanguage: 'Document in Russian',
      alt: 'Certificate awarded to Artur Fattakhov for a webinar on international and national GLP programmes',
    },
    {
      id: 'glp-quality-assurance',
      image: glpQualityAssurance,
      title: 'Quality assurance programme for GLP studies',
      organization: 'Pirogov Russian National Research Medical University, Institute of Pharmacy and Medicinal Chemistry',
      date: '21 March 2024',
      documentLanguage: 'Document in Russian',
      alt: 'Certificate awarded to Artur Fattakhov for a quality assurance programme for GLP studies',
    },
    {
      id: 'product-management-course',
      image: productManagementCourse,
      title: 'Product management — 16 academic hours',
      organization: 'WINbd Academy of Management',
      date: '18–19 November 2024',
      documentLanguage: 'Document in Russian',
      alt: 'Certificate awarded to Artur Fattakhov for product management training',
    },
  ],
};

export function getProfessionalCredentials(lang: Language): ProfessionalCredential[] {
  return credentials[lang];
}

export const languages = ['ru', 'en'] as const;

export type Language = (typeof languages)[number];

export const defaultLanguage: Language = 'ru';

export function isLanguage(value: string | undefined): value is Language {
  return languages.includes(value as Language);
}

export function localizedPath(language: Language, path = ''): string {
  const normalized = path.replace(/^\/+|\/+$/g, '');
  return normalized ? `/${language}/${normalized}/` : `/${language}/`;
}

export function swapLanguage(pathname: string, language: Language): string {
  const parts = pathname.split('/').filter(Boolean);
  if (isLanguage(parts[0])) parts.shift();
  return localizedPath(language, parts.join('/'));
}

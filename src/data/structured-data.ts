import { identity, schemaIds } from './identity';
import type { Language } from '../i18n/config';

export type PageSchemaType = 'WebPage' | 'CollectionPage' | 'AboutPage' | 'ContactPage';

export interface SchemaListItem {
  name: string;
  url: string;
}

interface PageSchemaInput {
  type: PageSchemaType;
  lang: Language;
  canonicalPath: string;
  title: string;
  description: string;
  items?: SchemaListItem[];
}

interface BreadcrumbItemInput {
  label: string;
  href?: string;
}

function absoluteUrl(path: string): string {
  return new URL(path, identity.url).href;
}

export function webpageId(path: string): string {
  return `${absoluteUrl(path)}#webpage`;
}

export function breadcrumbId(path: string): string {
  return `${absoluteUrl(path)}#breadcrumb`;
}

export function createPageJsonLd({
  type,
  lang,
  canonicalPath,
  title,
  description,
  items = [],
}: PageSchemaInput) {
  const url = absoluteUrl(canonicalPath);
  const pageId = webpageId(canonicalPath);
  const itemListId = `${url}#item-list`;
  const graph: Array<Record<string, unknown>> = [{
    '@type': type,
    '@id': pageId,
    url,
    name: title,
    description,
    inLanguage: identity.languages[lang].code,
    isPartOf: { '@id': schemaIds.website },
    about: { '@id': schemaIds.person },
    breadcrumb: { '@id': breadcrumbId(canonicalPath) },
    mainEntity: items.length > 0 ? { '@id': itemListId } : { '@id': schemaIds.person },
  }];

  if (items.length > 0) {
    graph.push({
      '@type': 'ItemList',
      '@id': itemListId,
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        url: absoluteUrl(item.url),
      })),
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  } as const;
}

export function createBreadcrumbJsonLd(
  lang: Language,
  canonicalPath: string,
  items: BreadcrumbItemInput[],
) {
  const home = { label: lang === 'ru' ? 'Главная' : 'Home', href: `/${lang}/` };
  const entries = [home, ...items];

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': breadcrumbId(canonicalPath),
    itemListElement: entries.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.href ?? canonicalPath),
    })),
  } as const;
}

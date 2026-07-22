import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Collections are intentionally empty until verified content is added manually.
const language = z.enum(['ru', 'en']);

const relatedResource = z.object({
  title: z.string(),
  url: z.url(),
});

const knowledge = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/knowledge' }),
  schema: z.object({
    routeSlug: z.string(),
    lang: language,
    translationKey: z.string(),
    title: z.string(),
    excerpt: z.string(),
    category: z.string(),
    date: z.coerce.date(),
    seoTitle: z.string(),
    metaDescription: z.string(),
    status: z.enum(['draft', 'published']),
    featured: z.boolean().default(false),
    relatedMedia: z.array(relatedResource).default([]),
    relatedVideo: z.array(relatedResource).default([]),
    relatedPodcast: z.array(relatedResource).default([]),
  }),
});

const publications = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/publications' }),
  schema: z.object({
    routeSlug: z.string(),
    lang: language,
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    authors: z.array(z.string()),
    status: z.enum(['published', 'working-paper', 'in-preparation']),
    externalUrl: z.url().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    routeSlug: z.string(),
    lang: language,
    title: z.string(),
    description: z.string(),
    status: z.enum(['active', 'completed', 'paused']),
    startYear: z.number().int(),
    url: z.url().optional(),
  }),
});

export const collections = { knowledge, publications, projects };

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Collections are intentionally empty until verified content is added manually.
const language = z.enum(['ru', 'en']);

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    routeSlug: z.string(),
    lang: language,
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
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

export const collections = { blog, publications, projects };

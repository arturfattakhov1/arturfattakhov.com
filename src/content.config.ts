import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { externalHttpsUrlSchema, routeSlugSchema } from './data/content-validation';

// Collections are intentionally empty until verified content is added manually.
const language = z.enum(['ru', 'en']);

const relatedResource = z.object({
  title: z.string(),
  url: externalHttpsUrlSchema,
});

const knowledgeAudio = z.object({
  title: z.string(),
  description: z.string(),
  fileUrl: z.string().regex(/^\/audio\/podcast\/[a-z0-9]+(?:-[a-z0-9]+)*\.m4a$/),
  mimeType: z.literal('audio/mp4'),
  language,
  duration: z.string().regex(/^PT(?=.+)(?:\d+H)?(?:[0-5]?\dM)?(?:[0-5]?\d(?:\.\d+)?S)?$/),
  durationLabel: z.string(),
  spotifyUrl: externalHttpsUrlSchema.refine((url) => new URL(url).hostname === 'open.spotify.com', 'Spotify URL must use the Spotify platform host'),
});

const knowledge = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/knowledge' }),
  schema: z.object({
    routeSlug: routeSlugSchema,
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
    audio: knowledgeAudio.optional(),
  }),
});

const publications = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/publications' }),
  schema: z.object({
    routeSlug: routeSlugSchema,
    lang: language,
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    authors: z.array(z.string()),
    status: z.enum(['published', 'working-paper', 'in-preparation']),
    externalUrl: externalHttpsUrlSchema.optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    routeSlug: routeSlugSchema,
    lang: language,
    title: z.string(),
    description: z.string(),
    status: z.enum(['active', 'completed', 'paused']),
    startYear: z.number().int(),
    url: externalHttpsUrlSchema.optional(),
  }),
});

export const collections = { knowledge, publications, projects };

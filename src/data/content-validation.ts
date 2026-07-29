import { z } from 'astro/zod';

const controlCharacters = /[\u0000-\u001f\u007f-\u009f]/;

export const routeSlugSchema = z.string().regex(
  /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  'must contain only lowercase ASCII letters or digits separated by single hyphens',
);

export const externalHttpsUrlSchema = z.string().superRefine((value, context) => {
  if (controlCharacters.test(value)) {
    context.addIssue({ code: 'custom', message: 'must not contain control characters' });
    return;
  }

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    context.addIssue({ code: 'custom', message: 'must be a valid absolute URL' });
    return;
  }

  if (url.protocol !== 'https:') {
    context.addIssue({ code: 'custom', message: 'must use HTTPS' });
  }
  if (url.username || url.password) {
    context.addIssue({ code: 'custom', message: 'must not include credentials' });
  }
});

const localizedTextSchema = z.object({ ru: z.string(), en: z.string() }).strict();

export const mediaContentSchema = z.object({
  records: z.array(z.object({
    id: z.uuid(),
    type: z.enum(['interview', 'project', 'video', 'article', 'podcast']),
    status: z.enum(['draft', 'published']),
    order: z.number().int(),
    title: localizedTextSchema,
    summary: localizedTextSchema,
    role: localizedTextSchema.optional(),
    externalLinks: z.array(z.object({
      source: localizedTextSchema,
      url: externalHttpsUrlSchema,
    }).strict()),
  }).strict()),
}).strict();

export const profileHosts = {
  orcid: 'orcid.org',
  googleScholar: 'scholar.google.com',
  researchGate: 'www.researchgate.net',
  webOfScience: 'www.webofscience.com',
  github: 'github.com',
  instagram: 'www.instagram.com',
  threads: 'www.threads.com',
  youtube: 'www.youtube.com',
  dzen: 'dzen.ru',
  spotify: 'open.spotify.com',
  facebook: 'www.facebook.com',
} as const;

export const profileKeys = Object.keys(profileHosts) as Array<keyof typeof profileHosts>;

export const profilesContentSchema = z.object({
  profiles: z.array(z.object({
    key: z.enum(profileKeys),
    name: z.string(),
    url: externalHttpsUrlSchema,
    order: z.number().int(),
    active: z.boolean(),
  }).strict().superRefine((profile, context) => {
    let hostname: string;
    try {
      hostname = new URL(profile.url).hostname;
    } catch {
      return;
    }

    if (hostname !== profileHosts[profile.key]) {
      context.addIssue({ code: 'custom', path: ['url'], message: `must use the ${profile.key} platform host` });
    }
  })),
}).strict();

export const homepageMaterialsSchema = z.object({
  featuredPublicationSlugs: z.array(routeSlugSchema),
}).strict();

export function parseCmsContent<T>(schema: z.ZodType<T>, value: unknown, collection: string): T {
  const result = schema.safeParse(value);
  if (!result.success) {
    const locations = result.error.issues.map((issue) => issue.path.join('.') || 'root').join(', ');
    throw new Error(`Invalid CMS content in ${collection} at: ${locations}`);
  }
  return result.data;
}

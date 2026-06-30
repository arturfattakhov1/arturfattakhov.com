import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://arturfattakhov.com',
  output: 'static',
  trailingSlash: 'always',
  redirects: {
    '/': '/ru/',
  },
  integrations: [sitemap()],
});

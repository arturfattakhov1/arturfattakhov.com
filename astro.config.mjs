import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://arturfattakhov.com',
  output: 'static',
  trailingSlash: 'always',

  redirects: {
    '/': '/ru/',
  },

  integrations: [sitemap()],
  adapter: cloudflare(),
});
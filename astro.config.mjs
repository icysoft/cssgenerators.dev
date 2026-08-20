// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://cssgenerators.dev',
  trailingSlash: 'never',
  // 'file' emits about.html rather than about/index.html. Cloudflare Pages
  // serves the former at /about and the latter at /about/ — with the default
  // 'directory' format it 308-redirected every canonical URL (declared without
  // a trailing slash, here and in the sitemap) to its slashed counterpart.
  build: { format: 'file' },
  integrations: [react(), sitemap()],
});

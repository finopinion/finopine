import { defineConfig } from 'astro/config';
import site from './site.config.json' with { type: 'json' };

// site.config.json is the single source of truth for the canonical URL.
// src/data/site.ts reads the same file. Change it in one place.
export default defineConfig({
  site: site.url,
  output: 'static',
  build: { format: 'directory' },
  markdown: { shikiConfig: { theme: 'github-light' } }
});

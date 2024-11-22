// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import react from '@astrojs/react';

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  },
  output: 'server',
  adapter: netlify()
});
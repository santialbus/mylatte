import { defineConfig } from 'astro/config';

export default defineConfig({
  middleware: ['src/middleware/auth.ts'],
});

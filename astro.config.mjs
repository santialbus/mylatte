import { defineConfig } from 'astro/config';

export default defineConfig({
  middleware: {
    '/admin': './src/middleware/auth.ts',
    '/privado': './src/middleware/auth.ts',
  }
});

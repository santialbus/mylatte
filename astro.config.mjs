// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  middleware: ['src/middleware/auth.ts'], // aquí registras el middleware
});

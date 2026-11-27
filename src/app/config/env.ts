import { z } from 'zod';

const envSchema = z.object({
  VITE_APP_URL: z.url().default('http://localhost:5000'),
  VITE_API_BASE_URL: z.url().default('http://localhost:8000/api'),
});

const parsedEnv = envSchema.safeParse({
  VITE_APP_URL: import.meta.env['VITE_APP_URL'] || undefined,
  VITE_API_BASE_URL: import.meta.env['VITE_API_BASE_URL'] || undefined,
});

if (!parsedEnv.success) {
  console.error('Invalid environment variables:', z.treeifyError(parsedEnv.error));
  throw new Error('Environment validation failed. Check your .env configuration.');
}

export const env = parsedEnv.data;

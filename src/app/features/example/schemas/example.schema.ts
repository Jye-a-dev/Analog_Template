import { z } from 'zod';

export const healthStatusSchema = z.object({
  status: z.enum(['ok', 'degraded']),
  timestamp: z.string(),
});

export const createExampleItemSchema = z.object({
  title: z.string().trim().min(2, 'Title must be at least 2 characters').max(80),
  description: z.string().trim().max(240).default(''),
});

export type CreateExampleItemInput = z.infer<typeof createExampleItemSchema>;

import * as z from 'zod';

export const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  dueDate: z.date().optional(),
  assignee: z.string().optional(),
  status: z.string().optional(),
  project: z.string().optional(),
  priority: z.string().optional(),
  organisation: z.string().optional(),
});

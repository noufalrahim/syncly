import * as z from 'zod';

export const taskFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  priority: z.string().min(1, 'Priority is required'),
  columnId: z.string().min(1, 'Status is required'),
  projectId: z.string().min(1, 'Project is required'),
});

import * as z from 'zod';

export const projectFormSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
});

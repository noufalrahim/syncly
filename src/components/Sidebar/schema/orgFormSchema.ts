import * as z from 'zod';

export const orgFormSchema = z.object({
  name: z.string().min(1, 'Organisation name is required'),
});

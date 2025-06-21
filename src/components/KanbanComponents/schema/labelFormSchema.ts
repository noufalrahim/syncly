import * as z from 'zod';

export const labelFormSchema = z.object({
  title: z.string().min(1, 'Label name is required'),
});

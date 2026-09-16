import { z } from 'zod';

export const inviteCaregiverSchema = z.object({
  name: z.string().min(1, 'Enter their name'),
});

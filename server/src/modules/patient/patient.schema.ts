import { z } from 'zod'

export const createPatientSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  address: z.string().min(1, 'Address is required'),
  conditions: z.array(z.string()),
  allergies: z.array(z.string()),
})
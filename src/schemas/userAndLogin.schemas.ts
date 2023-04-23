import { z } from 'zod';

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  admin: z.boolean().optional(),
  active: z.boolean(),
});

export const userResponseSchema = userSchema.omit({
  password: true,
});

export const userRequestSchema = userSchema.omit({
  id: true,
});

export const userBodyRequestSchema = userRequestSchema.omit({
  active: true,
});

export const userBodyUpdateSchema = userBodyRequestSchema.omit({
  admin: true,
});

export const updateUserSchema = userBodyRequestSchema.partial();

export const loginRequestSchema = z.object({
  email: z.string(),
  password: z.string(),
});

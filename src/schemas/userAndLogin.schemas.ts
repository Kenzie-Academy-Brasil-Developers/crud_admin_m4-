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

export const userResponseAllUserSchema = z.array(userResponseSchema);

export const userRequestSchema = userSchema.omit({
  id: true,
});

export const userBodyRequestSchema = userRequestSchema.omit({
  active: true,
});

export const userLoginSchema = userBodyRequestSchema.omit({
  admin: true,
  name: true,
});

export const userBodyUpdateSchema = userBodyRequestSchema.omit({
  admin: true,
});

export const updateUserSchema = userBodyRequestSchema.partial();

export const loginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const tokenSchema = z.object({
  token: z.string(),
});

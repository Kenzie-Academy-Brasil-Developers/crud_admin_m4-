import { z } from 'zod';
import {
  tokenSchema,
  userBodyRequestSchema,
  userBodyUpdateSchema,
  userLoginSchema,
  userRequestSchema,
  userResponseSchema,
  userSchema,
} from '../schemas/userAndLogin.schemas';

export type IUser = z.infer<typeof userSchema>;

export type TUserResponse = z.infer<typeof userResponseSchema>;

export type TUserRequest = z.infer<typeof userRequestSchema>;

export type TUserBodyRequest = z.infer<typeof userBodyRequestSchema>;

export type TUserBodyUpdateSchema = z.infer<typeof userBodyUpdateSchema>;

export type TUserLogin = z.infer<typeof userLoginSchema>;

export type IToken = z.infer<typeof tokenSchema>;

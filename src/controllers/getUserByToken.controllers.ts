import { Request, Response } from 'express';
import { getUserByTokenServices } from '../services/getUserByToken.services';

export const getUserByIdControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = res.locals.userId;

  const user = await getUserByTokenServices(id);

  return res.status(200).json(user);
};

import { Request, Response } from 'express';
import { activeUserService } from '../services/activeUser.services';
import { AppError } from '../error';

export const activeUserControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = Number(req.params.id);
  const isAdm: boolean = res.locals.isAdmin;
  const tokenId: number = res.locals.userId;

  console.log(tokenId);

  /*  if (active) throw new AppError('User already active', 400); */

  const activeUser = await activeUserService(id);

  return res.status(200).json(activeUser);
};

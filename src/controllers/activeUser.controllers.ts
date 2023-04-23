import { Request, Response } from 'express';
import { activeUserService } from '../services/activeUser.services';

export const activeUserControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = res.locals.userId;
  const isAdm: boolean = res.locals.isAdmin;
  const active: boolean = res.locals.active;
  const tokenId: number = res.locals.userId;

  const activeUser = await activeUserService(id, isAdm, active, tokenId);

  return res.status(200).json(activeUser);
};

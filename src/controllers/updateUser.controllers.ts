import { Request, Response } from 'express';
import { updateUserService } from '../services/updateUser.services';
import { TUserBodyUpdateSchema } from '../interfaces/types';

export const updateUserControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const body: TUserBodyUpdateSchema = req.body;
  const id: number = Number(req.params.id);
  const tokenId: number = res.locals.userId;
  const isAdm: boolean = res.locals.isAdmin;

  const updateResult = await updateUserService(body, id, tokenId, isAdm);

  return res.status(200).json(updateResult);
};

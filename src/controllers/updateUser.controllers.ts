import { Request, Response } from 'express';
import { updateUserService } from '../services/updateUser.services';
import { TUserBodyRequest } from '../interfaces/types';

export const updateUserControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const bodyRequest: Partial<TUserBodyRequest> = req.body;
  const id: number = Number(req.params.id);
  const tokenId: number = res.locals.userId;
  const isAdm: boolean = res.locals.isAdmin;

  const updateResult = await updateUserService(bodyRequest, id, tokenId, isAdm);

  return res.status(200).json(updateResult);
};

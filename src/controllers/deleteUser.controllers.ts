import { Request, Response } from 'express';
import { deleteUserServices } from '../services/deleteUser.services';
import { AppError } from '../error';

export const deleteUserControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = Number(req.params.id);
  const idToken: number = res.locals.userId;
  const isAdm: boolean = res.locals.isAdmin;

  if (id !== idToken && !isAdm)
    throw new AppError('Insufficient Permission', 403);

  deleteUserServices(id);

  return res.status(204).send();
};

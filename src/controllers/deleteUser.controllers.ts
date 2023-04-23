import { Request, Response } from 'express';
import { deleteUserServices } from '../services/deleteUser.services';

export const deleteUserControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = Number(req.params.id);
  const idToken: number = res.locals.userId;
  const isAdm: boolean = res.locals.isAdmin;

  deleteUserServices(id, idToken, isAdm);

  return res.status(204).send();
};

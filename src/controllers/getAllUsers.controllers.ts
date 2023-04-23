import { Request, Response } from 'express';
import { getAllUsersServices } from '../services/getAllUsers.services';

export const getAllUsersControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const isAdm: boolean = res.locals.isAdmin;

  const users = await getAllUsersServices(isAdm);

  return res.status(200).json(users);
};

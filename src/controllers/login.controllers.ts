import { Request, Response } from 'express';
import { loginServices } from '../services/login.services';

export const loginControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userLoginBody = req.body;

  const login = await loginServices(userLoginBody);

  return res.status(200).json(login);
};

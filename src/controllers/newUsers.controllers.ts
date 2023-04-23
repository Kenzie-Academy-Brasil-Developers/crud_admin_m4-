import { Request, Response } from 'express';
import { TUserRequest } from '../interfaces/types';
import { newUserServise } from '../services/newUser.services';

export const newUserControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userRequest: TUserRequest = req.body;

  const newUser = await newUserServise(userRequest);

  return res.status(201).json(newUser);
};

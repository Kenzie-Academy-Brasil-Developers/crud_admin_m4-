import { Response, Request, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import 'dotenv/config';
import { AppError } from '../error';

export const validationTokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const token: string | undefined = req.headers.authorization?.split(' ')[1];

  if (token === undefined) throw new AppError('Missing Bearer Token', 401);

  verify(token, process.env.SECRET_KEY!, (err: any, d: any) => {
    if (err) throw new AppError(err.message, 401);

    res.locals.email = d.email; // undefined
    res.locals.name = d.name; // undefined
    res.locals.isAdmin = d.admin;
    res.locals.userId = Number(d.sub);
    res.locals.active = d.active; // undefined
  });

  next();
};

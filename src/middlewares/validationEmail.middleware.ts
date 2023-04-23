import { Response, Request, NextFunction } from 'express';
import { QueryResult } from 'pg';
import { client } from '../database';
import { AppError } from '../error';

export const validationEmailExist = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const emailRequest: string = req.body.email;

  const stringGetEmails: string = `
    SELECT * FROM users
    WHERE email = $1;
  `;

  const queryResult: QueryResult = await client.query(stringGetEmails, [
    emailRequest,
  ]);

  if (queryResult.rowCount !== 0)
    throw new AppError('E-mail already registered', 409);

  next();
};

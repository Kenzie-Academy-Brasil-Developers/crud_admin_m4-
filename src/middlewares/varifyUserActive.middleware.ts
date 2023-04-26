import { Request, Response, NextFunction } from 'express';
import { QueryConfig, QueryResult } from 'pg';
import { IUser } from '../interfaces/types';
import { client } from '../database';
import { AppError } from '../error';

export const verifyUserActive = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const queryStringVerifyUserActive: string = `
    SELECT * FROM users
    WHERE id = $1;
`;

  const queryConfigVerifyUserActive: QueryConfig = {
    text: queryStringVerifyUserActive,
    values: [req.params.id],
  };

  const queryResultVerifyUserActive: QueryResult<IUser> = await client.query(
    queryConfigVerifyUserActive
  );

  if (queryResultVerifyUserActive.rows[0].active)
    throw new AppError('User already active', 400);

  next();
};

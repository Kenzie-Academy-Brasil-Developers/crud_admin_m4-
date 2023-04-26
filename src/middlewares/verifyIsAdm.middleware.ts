import { Request, Response, NextFunction } from 'express';
import { QueryConfig, QueryResult } from 'pg';
import { client } from '../database';
import { IUser } from '../interfaces/types';
import { AppError } from '../error';

export const verifyIsAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  let id: number = res.locals.userId;

  const queryString: string = `
    SELECT * FROM users
    WHERE id = $1;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: QueryResult<IUser> = await client.query(queryConfig);

  console.log(queryResult.rows[0]);

  if (!queryResult.rows[0].admin)
    throw new AppError('Insufficient Permission', 403);

  next();
};

import { Request, Response, NextFunction } from 'express';
import { QueryConfig, QueryResult } from 'pg';
import { client } from '../database';
import { IUser } from '../interfaces/types';
import { AppError } from '../error';

export const verifyActiveUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const id: number = Number(req.params.id);

  const queryString: string = `
    SELECT * FROM users
    WHERE id = $1;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: QueryResult<IUser> = await client.query(queryConfig);

  res.locals.active = queryResult.rows[0].active;

  if (req.route.path !== '/:id/recover' && !queryResult.rows[0].active)
    throw new AppError('Wrong email/password', 401);

  next();
};

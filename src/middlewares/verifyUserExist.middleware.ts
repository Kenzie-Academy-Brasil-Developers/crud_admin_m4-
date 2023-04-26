import { Request, Response, NextFunction } from 'express';
import { QueryConfig, QueryResult } from 'pg';
import { client } from '../database';
import { AppError } from '../error';

export const verifyUserExist = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  let id = req.params.id ? req.params.id : res.locals.userId;

  const queryString: string = `
    SELECT * FROM users
    WHERE id = $1;`;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: QueryResult = await client.query(queryConfig);

  if (queryResult.rowCount === 0) throw new AppError('User not found', 404);

  next();
};

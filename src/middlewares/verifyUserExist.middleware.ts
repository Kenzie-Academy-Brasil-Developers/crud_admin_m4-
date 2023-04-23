import { Request, Response, NextFunction } from 'express';
import { QueryConfig, QueryResult } from 'pg';
import { client } from '../database';
import { AppError } from '../error';

export const verifyUserExist = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const queryString: string = `
    SELECT * FROM users
    WHERE id = $1;`;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [req.params.id],
  };

  const queryResult: QueryResult = await client.query(queryConfig);

  if (queryResult.rowCount === 0) throw new AppError('User not found', 404);

  next();
};

import { QueryResult } from 'pg';
import { AppError } from '../error';
import { client } from '../database';

export const getAllUsersServices = async (isAdm: boolean): Promise<any> => {
  if (!isAdm) throw new AppError('Insufficient Permission', 401);

  const queryString: string = 'SELECT * FROM users;';

  const queryResult: QueryResult = await client.query(queryString);

  return queryResult.rows;
};

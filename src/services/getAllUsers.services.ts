import { QueryResult } from 'pg';
import { AppError } from '../error';
import { client } from '../database';
import { userResponseAllUserSchema } from '../schemas/userAndLogin.schemas';

export const getAllUsersServices = async (isAdm: boolean): Promise<any> => {
  const queryString: string = 'SELECT * FROM users;';

  const queryResult: QueryResult = await client.query(queryString);

  return userResponseAllUserSchema.parse(queryResult.rows);
};

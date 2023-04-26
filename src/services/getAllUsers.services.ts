import { QueryResult } from 'pg';
import { client } from '../database';
import { userResponseAllUserSchema } from '../schemas/userAndLogin.schemas';
import { TUserResponseAllUser } from '../interfaces/types';

export const getAllUsersServices = async (
  isAdm: boolean
): Promise<TUserResponseAllUser> => {
  const queryString: string = 'SELECT * FROM users;';

  const queryResult: QueryResult = await client.query(queryString);

  return userResponseAllUserSchema.parse(queryResult.rows);
};

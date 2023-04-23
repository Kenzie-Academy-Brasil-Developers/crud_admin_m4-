import { QueryConfig, QueryResult } from 'pg';
import { AppError } from '../error';
import { client } from '../database';
import { userResponseSchema } from '../schemas/userAndLogin.schemas';
import { IUser } from '../interfaces/types';

export const activeUserService = async (
  id: number,
  isAdm: boolean,
  active: boolean,
  tokenId: number
): Promise<any> => {
  if (id !== tokenId && !isAdm)
    throw new AppError('Insufficient Permission', 401);

  if (active) throw new AppError('User already active', 400);

  const queryString: string = `
    UPDATE users 
      SET ("active") =
      ROW ('true')
    WHERE id = $1
    RETURNING *;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: QueryResult<IUser> = await client.query(queryConfig);

  return userResponseSchema.parse(queryResult.rows[0]);
};

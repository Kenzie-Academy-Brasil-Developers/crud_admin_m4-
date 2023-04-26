import { QueryConfig, QueryResult } from 'pg';
import { client } from '../database';
import { userResponseSchema } from '../schemas/userAndLogin.schemas';
import { IUser, TUserResponse } from '../interfaces/types';
import { AppError } from '../error';

export const activeUserService = async (id: number): Promise<TUserResponse> => {
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

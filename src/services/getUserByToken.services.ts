import { QueryConfig, QueryResult } from 'pg';
import { TUserResponse } from '../interfaces/types';
import { client } from '../database';
import { userResponseSchema } from '../schemas/userAndLogin.schemas';
import { AppError } from '../error';

export const getUserByTokenServices = async (id: number): Promise<any> => {
  const queryString: string = `
    SELECT * FROM users
    WHERE id = $1;  
   `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: QueryResult<TUserResponse> = await client.query(
    queryConfig
  );

  return userResponseSchema.parse(queryResult.rows[0]);
};

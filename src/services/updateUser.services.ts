import format from 'pg-format';
import { TUserBodyRequest, TUserResponse } from '../interfaces/types';
import { QueryConfig, QueryResult } from 'pg';
import { client } from '../database';
import {
  updateUserSchema,
  userResponseSchema,
} from '../schemas/userAndLogin.schemas';
import { AppError } from '../error';

export const updateUserService = async (
  newUpdateUser: Partial<TUserBodyRequest>,
  id: number,
  tokenId: number,
  isAdm: boolean
): Promise<TUserResponse> => {
  updateUserSchema.parse(newUpdateUser);

  if (id !== tokenId && !isAdm)
    throw new AppError('Insufficient Permission', 403);

  const queryString: string = format(
    `
      UPDATE users 
        SET (%I) =
        ROW (%L)
      WHERE id = $1
      RETURNING *;
`,
    Object.keys(newUpdateUser),
    Object.values(newUpdateUser)
  );

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: QueryResult = await client.query(queryConfig);

  return userResponseSchema.parse(queryResult.rows[0]);
};

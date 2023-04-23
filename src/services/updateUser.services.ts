import format from 'pg-format';
import { TUserBodyUpdateSchema } from '../interfaces/types';
import { QueryConfig, QueryResult } from 'pg';
import { client } from '../database';
import { userResponseSchema } from '../schemas/userAndLogin.schemas';
import { AppError } from '../error';

export const updateUserService = async (
  newUpdateUser: TUserBodyUpdateSchema,
  id: number,
  tokenId: number,
  isAdm: boolean
): Promise<any> => {
  if (id !== tokenId && !isAdm)
    throw new AppError('Insufficient Permission', 401);

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

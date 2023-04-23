import { QueryConfig } from 'pg';
import { client } from '../database';
import { AppError } from '../error';

export const deleteUserServices = async (
  id: number,
  tokenId: number,
  isAdm: boolean
): Promise<any> => {
  if (id !== tokenId && !isAdm)
    throw new AppError('Insufficient Permission', 401);

  const queryString: string = `
    DELETE FROM users 
    WHERE id = $1;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  await client.query(queryConfig);
};

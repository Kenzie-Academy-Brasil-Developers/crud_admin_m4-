import { QueryConfig } from 'pg';
import { client } from '../database';

export const deleteUserServices = async (id: number): Promise<any> => {
  const queryString: string = `
    UPDATE users 
      SET ("active") =
      ROW (false)
    WHERE id = $1
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  await client.query(queryConfig);
};

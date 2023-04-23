import format from 'pg-format';
import { hash } from 'bcryptjs';
import { QueryResult } from 'pg';
import { TUserBodyRequest } from '../interfaces/types';
import { client } from '../database';
import { TUserRequest } from '../interfaces/types';
import {
  userBodyRequestSchema,
  userResponseSchema,
} from '../schemas/userAndLogin.schemas';

export const newUserServise = async (
  userRequest: TUserRequest
): Promise<any> => {
  userBodyRequestSchema.parse(userRequest);

  const newUser: TUserRequest = {
    ...userRequest,
    active: true,
    password: await hash(userRequest.password, 10),
  };

  userBodyRequestSchema.parse(userRequest);

  const queryString: string = format(
    `
      INSERT INTO users 
        (%I)
      VALUES
        (%L)
      RETURNING *;
  `,
    Object.keys(newUser),
    Object.values(newUser)
  );

  const queryResult: QueryResult<TUserBodyRequest> = await client.query(
    queryString
  );

  return userResponseSchema.parse(queryResult.rows[0]);
};

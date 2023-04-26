import format from 'pg-format';
import { compareSync } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import 'dotenv/config';
import { QueryConfig, QueryResult } from 'pg';
import { IToken, IUser, TUserLogin } from '../interfaces/types';
import { client } from '../database';
import { AppError } from '../error';
import { loginRequestSchema } from '../schemas/userAndLogin.schemas';

export const loginServices = async (
  userRequest: TUserLogin
): Promise<IToken> => {
  loginRequestSchema.parse(userRequest);

  const queryString = `
    SELECT * FROM users
    WHERE email = $1;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userRequest.email],
  };

  const queryResult: QueryResult<IUser> = await client.query(queryConfig);

  const user = queryResult.rows[0];

  if (
    queryResult.rowCount === 0 ||
    !user.active ||
    !compareSync(userRequest.password, user.password)
  )
    throw new AppError('Wrong email/password', 401);

  const token = sign(
    {
      isAdmin: user.admin,
      name: user.name,
      email: user.email,
      active: user.active,
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: process.env.EXPIRES_IN,
      subject: String(user.id),
    }
  );

  return { token };
};

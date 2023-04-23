export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  admin?: boolean | null | undefined;
  active: boolean;
}

export type TUserResponse = Omit<IUser, 'password'>;

export type TUserRequest = Omit<IUser, 'id'>;

export type TUserBodyRequest = Omit<TUserRequest, 'active'>;

export type TUserBodyUpdateSchema = Omit<TUserBodyRequest, 'admin'>;

export type TUserLogin = Omit<TUserBodyRequest, 'admin' | 'name'>;

export interface IToken {
  token: string;
}

import { IUser } from "./user";

export interface IRegisterUserProps {
  name: string;
  email: string;
  password: string;
}

export interface ILoginUserProps {
  email: string;
  password: string;
}

export interface ILoginUserResponse {
  accessToken: string;
  user: Omit<IUser, "password">;
}

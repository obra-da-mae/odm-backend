import { type User } from "@prisma/client";

export interface IUser extends User {}

export interface IUserSecureResponse extends Omit<IUser, "password"> {}

export interface IUserCreate {
  name: string;
  email: string;
  password: string;
}

export interface IUserUpdate {
  id: string;
  name?: string;
  paymentMethod?: string;
}

export interface IUserUpdatePassword {
  id: string;
  email: string;
  password: string;
}

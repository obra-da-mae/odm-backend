import {
  IUser,
  IUserCreate,
  IUserUpdate,
  IUserUpdatePassword,
} from "../../interfaces/user";

export abstract class IUserRepository {
  abstract findById(id: string): Promise<IUser | null>;
  abstract findByEmail(email: string): Promise<IUser | null>;
  abstract create(data: IUserCreate): Promise<IUser>;
  abstract update(data: IUserUpdate): Promise<IUser | null>;
  abstract updatePassword(data: IUserUpdatePassword): Promise<IUser | null>;
}

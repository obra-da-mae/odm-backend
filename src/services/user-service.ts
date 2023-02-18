import * as bcrypt from "bcrypt";
import { IUserRepository } from "../repositories";
import { IUserUpdate, IUser, IUserUpdatePassword } from "../interfaces/user";
import { AppError } from "../utils/app-error";

export class UserService {
  constructor(private readonly userRepository: IUserRepository) {}

  /**
   * Method to get user data by user id
   */
  async getUserById(id: string): Promise<IUser> {
    if (!id) {
      throw new AppError("User id not provided");
    }

    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new AppError("User not found");
    }

    return user;
  }

  /**
   * Method to update user data
   */
  async updateUser({
    id,
    name,
    paymentMethod,
  }: IUserUpdate): Promise<IUser | null> {
    if (!id) {
      throw new AppError("User id not provided");
    }

    if (!name && !paymentMethod) {
      throw new AppError("Provide at least one data to update");
    }

    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new AppError("User not found");
    }

    const result = await this.userRepository.update({
      id,
      name,
      paymentMethod,
    });
    return result;
  }

  /**
   * Method to update user password
   */
  async updateUserPassword({
    id,
    email,
    password,
  }: IUserUpdatePassword): Promise<IUser | null> {
    if (!id || !email || !password) {
      throw new AppError("Missing required parameters");
    }

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AppError("User not found");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await this.userRepository.updatePassword({
      id,
      email,
      password: hashedPassword,
    });
    return result;
  }
}

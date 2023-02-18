import * as bcrypt from "bcrypt";
import { IUserRepository } from "../repositories";
import { IUserUpdate, IUser, IUserUpdatePassword } from "../interfaces/user";

export class UserService {
  constructor(private readonly userRepository: IUserRepository) {}

  /**
   * Method to get user data by user id
   */
  async getUserById(id: string): Promise<IUser | null> {
    return this.userRepository.findById(id);
  }

  /**
   * Method to update user data
   */
  async updateUser(data: IUserUpdate): Promise<IUser | null> {
    const user = await this.userRepository.findById(data.id);
    if (!user) {
      throw new Error("User not found");
    }

    const result = await this.userRepository.update(data);
    return result;
  }

  /**
   * Method to update user password
   */
  async updateUserPassword(data: IUserUpdatePassword): Promise<IUser | null> {
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) {
      throw new Error("User not found");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const result = await this.userRepository.updatePassword({
      id: data.id,
      email: data.email,
      password: hashedPassword,
    });
    return result;
  }
}

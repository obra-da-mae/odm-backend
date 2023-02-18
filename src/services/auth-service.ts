import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { IUserSecureResponse } from "../interfaces/user";
import { IUserRepository } from "../repositories";
import {
  ILoginUserProps,
  ILoginUserResponse,
  IRegisterUserProps,
} from "../interfaces/auth";

export class AuthService {
  constructor(private readonly userRepository: IUserRepository) {}

  async registerUser(data: IRegisterUserProps): Promise<IUserSecureResponse> {
    const userExists = await this.userRepository.findByEmail(data.email);
    if (userExists) {
      throw new Error("User with provided email already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const result = await this.userRepository.create({
      ...data,
      password: hashedPassword,
    });

    return result;
  }

  async loginUser(data: ILoginUserProps): Promise<ILoginUserResponse> {
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) {
      throw new Error("User with provided email does not exist");
    }

    const match = await bcrypt.compare(data.password, user.password);
    if (!match) {
      throw new Error("Invalid credentials");
    }

    const payload = { id: user.id };
    const expiration = { expiresIn: "7d" };
    const accessToken = jwt.sign(
      payload,
      String(process.env.TOKEN_SECRET),
      expiration
    );
    const { password: userPass, ...userToReturn } = user;

    return {
      accessToken,
      user: userToReturn,
    };
  }
}

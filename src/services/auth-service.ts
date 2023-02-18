import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { IUserSecureResponse } from "../interfaces/user";
import { IUserRepository } from "../repositories";
import {
  ILoginUserProps,
  ILoginUserResponse,
  IRegisterUserProps,
} from "../interfaces/auth";
import { AppError } from "../utils/app-error";

export class AuthService {
  constructor(private readonly userRepository: IUserRepository) {}

  async registerUser({
    name,
    email,
    password,
  }: IRegisterUserProps): Promise<IUserSecureResponse> {
    if (!name || !email || !password) {
      throw new AppError("Missing required parameters");
    }

    const userExists = await this.userRepository.findByEmail(email);
    if (userExists) {
      throw new AppError("User with provided email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return result;
  }

  async loginUser({
    email,
    password,
  }: ILoginUserProps): Promise<ILoginUserResponse> {
    if (!email || !password) {
      throw new AppError("Missing required parameters");
    }

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AppError("User with provided email does not exist");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new AppError("Invalid credentials");
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

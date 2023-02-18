import { Request, Response } from "express";
import { userRepository } from "../repositories/user-repositoy";

export class UserController {
  async getUsers(request: Request, response: Response): Promise<Response> {
    const users = await userRepository.findMany();
    return response.send({
      data: users,
    });
  }

  async createUser(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const users = await userRepository.create({
      data: {
        name,
        email,
        password,
      },
    });

    return response.send({
      data: users,
    });
  }
}

import { Request, Response } from "express";
import { UserService } from "../services/user-service";

export class UserController {
  constructor(private readonly userService: UserService) {}

  async getUser(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    try {
      const result = await this.userService.getUserById(id);
      return response.send({
        status: "success",
        data: result,
      });
    } catch (error) {
      return response.status(400).send({
        status: "error",
        data: error,
      });
    }
  }

  async updateUser(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, paymentMethod } = request.body;

    try {
      const result = await this.userService.updateUser({
        id,
        name,
        paymentMethod,
      });
      return response.send({
        status: "success",
        data: result,
      });
    } catch (error) {
      return response.status(400).send({
        status: "error",
        data: error,
      });
    }
  }

  async updateUserPassword(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id } = request.params;
    const { email, password } = request.body;

    try {
      const result = await this.userService.updateUserPassword({
        id,
        email,
        password,
      });
      return response.send({
        status: "success",
        data: result,
      });
    } catch (error) {
      return response.status(400).send({
        status: "error",
        data: error,
      });
    }
  }
}

import { Request, Response } from "express";
import { UserService } from "../services/user-service";
import {
  handleHttpErrorResponse,
  handleHttpResponse,
} from "../utils/response-handler";

export class UserController {
  constructor(private readonly userService: UserService) {}

  async getUser(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    try {
      const result = await this.userService.getUserById(id);
      return handleHttpResponse(response, 200, result);
    } catch (error: any) {
      return handleHttpErrorResponse(response, error);
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
      return handleHttpResponse(response, 200, result);
    } catch (error: any) {
      return handleHttpErrorResponse(response, error);
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
      return handleHttpResponse(response, 200, result);
    } catch (error: any) {
      return handleHttpErrorResponse(response, error);
    }
  }
}

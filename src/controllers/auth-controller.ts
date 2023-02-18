import { Request, Response } from "express";
import { AuthService } from "../services/auth-service";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async registerUser(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    try {
      const result = await this.authService.registerUser({
        name,
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

  async loginUser(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    try {
      const result = await this.authService.loginUser({
        email,
        password,
      });
      return response.send({
        status: "success",
        ...result,
      });
    } catch (error) {
      return response.status(400).send({
        status: "error",
        data: error,
      });
    }
  }
}

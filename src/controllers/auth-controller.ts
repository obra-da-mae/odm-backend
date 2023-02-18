import { Request, Response } from "express";
import { AuthService } from "../services/auth-service";
import {
  handleHttpErrorResponse,
  handleHttpResponse,
} from "../utils/response-handler";

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
      return handleHttpResponse(response, 200, result);
    } catch (error: any) {
      return handleHttpErrorResponse(response, error);
    }
  }

  async loginUser(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    try {
      const result = await this.authService.loginUser({
        email,
        password,
      });
      return handleHttpResponse(response, 200, result);
    } catch (error: any) {
      return handleHttpErrorResponse(response, error);
    }
  }
}

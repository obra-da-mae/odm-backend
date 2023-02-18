import { Request, Response, Router } from "express";
import { UserRepository } from "../repositories/implementations/user-repository";
import { AuthService } from "../services/auth-service";
import { AuthController } from "../controllers/auth-controller";

const router = Router();

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

async function registerUser(
  request: Request,
  response: Response
): Promise<Response> {
  return authController.registerUser(request, response);
}

async function loginUser(
  request: Request,
  response: Response
): Promise<Response> {
  return authController.loginUser(request, response);
}

router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);

export { router as authRoutes };

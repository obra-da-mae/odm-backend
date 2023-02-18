import { Request, Response, Router } from "express";
import { UserController } from "../controllers/user-controller";
import { UserService } from "../services/user-service";
import { UserRepository } from "../repositories/implementations/user-repository";

const router = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

async function getUser(
  request: Request,
  response: Response
): Promise<Response> {
  return userController.getUser(request, response);
}

async function updateUser(
  request: Request,
  response: Response
): Promise<Response> {
  return userController.updateUser(request, response);
}

async function updateUserPassword(
  request: Request,
  response: Response
): Promise<Response> {
  return userController.updateUserPassword(request, response);
}

router.get("/users/:id", getUser);
router.put("/users/:id", updateUser);
router.patch("/users/:id", updateUserPassword);

export { router as userRoutes };

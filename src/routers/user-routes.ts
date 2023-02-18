import { Request, Response, Router } from "express";
import { UserController } from "../controllers/user-controller";

const router = Router();

const userController = new UserController();

async function getUsers(
  request: Request,
  response: Response
): Promise<Response> {
  return userController.getUsers(request, response);
}

async function createUser(
  request: Request,
  response: Response
): Promise<Response> {
  return userController.createUser(request, response);
}

router.get("/users", getUsers);
router.post("/users", createUser);

export { router as userRoutes };

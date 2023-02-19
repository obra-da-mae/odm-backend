import { Request, Response, Router } from "express";
import { userRoutes } from "./user-routes";
import { authRoutes } from "./auth-routes";
import { addressRoutes } from "./address-routes";

const routers = Router();

function getRoot(request: Request, response: Response): Response {
  return response.status(200).json({
    message: "Hello from root!",
  });
}

function notFound(request: Request, response: Response): Response {
  return response.status(404).json({
    error: "Not Found",
  });
}

routers.get("/", getRoot);

routers.use("/api", authRoutes, userRoutes, addressRoutes);

routers.use(notFound);

export { routers };

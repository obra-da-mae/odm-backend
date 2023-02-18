import { Request, Response, Router } from "express";

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
routers.use(notFound);

export { routers };

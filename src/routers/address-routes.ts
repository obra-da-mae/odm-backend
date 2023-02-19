import { Request, Response, Router } from "express";

import { ensureAuthentication } from "../middlewares/auth-middleware";
import { AddressController } from "../controllers/address-controller";
import { AddressService } from "../services/address-service";
import { AddressRepository } from "../repositories/implementations/address-repository";
import { UserRepository } from "../repositories/implementations/user-repository";

const router = Router();

const addressRepository = new AddressRepository();
const userRepository = new UserRepository();
const addressService = new AddressService(addressRepository, userRepository);
const addressController = new AddressController(addressService);

async function createAddress(
  request: Request,
  response: Response
): Promise<Response> {
  return addressController.createAddress(request, response);
}

async function updateAddress(
  request: Request,
  response: Response
): Promise<Response> {
  return addressController.updateAddress(request, response);
}

async function deleteAddress(
  request: Request,
  response: Response
): Promise<Response> {
  return addressController.deleteAddress(request, response);
}

router.post("/users/:id/address", ensureAuthentication, createAddress);
router.put(
  "/users/:id/address/:addressId",
  ensureAuthentication,
  updateAddress
);
router.delete(
  "/users/:id/address/:addressId",
  ensureAuthentication,
  deleteAddress
);

export { router as addressRoutes };

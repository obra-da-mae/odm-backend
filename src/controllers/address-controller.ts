import { Request, Response } from "express";
import {
  handleHttpErrorResponse,
  handleHttpResponse,
} from "../utils/response-handler";
import { AddressService } from "../services/address-service";

export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  async createAddress(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { address, postalCode, city, state } = request.body;

    try {
      const result = await this.addressService.createAddress({
        userId: id,
        address,
        postalCode,
        city,
        state,
      });

      return handleHttpResponse(response, 200, result);
    } catch (error: any) {
      return handleHttpErrorResponse(response, error);
    }
  }

  async updateAddress(request: Request, response: Response): Promise<Response> {
    const { addressId } = request.params;
    const { address, postalCode, city, state } = request.body;

    try {
      const result = await this.addressService.updateAddress({
        id: addressId,
        address,
        postalCode,
        city,
        state,
      });

      return handleHttpResponse(response, 200, result);
    } catch (error: any) {
      return handleHttpErrorResponse(response, error);
    }
  }

  async deleteAddress(request: Request, response: Response): Promise<Response> {
    const { addressId } = request.params;

    try {
      const result = await this.addressService.deleteAddress(addressId);
      return handleHttpResponse(response, 200, result);
    } catch (error: any) {
      return handleHttpErrorResponse(response, error);
    }
  }
}

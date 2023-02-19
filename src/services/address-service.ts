import {
  IAddress,
  IAddressCreate,
  IAddressUpdate,
} from "../interfaces/address";
import { IAddressRepository, IUserRepository } from "../repositories";
import { AppError } from "../utils/app-error";

export class AddressService {
  constructor(
    private readonly addressRepository: IAddressRepository,
    private readonly userRepository: IUserRepository
  ) {}

  async createAddress(data: IAddressCreate): Promise<IAddress> {
    const { userId, address, postalCode, city, state } = data;
    if (!userId) {
      throw new AppError("User id not provided");
    }

    if (!address || !postalCode || !city || !state) {
      throw new AppError("Missing required parameters");
    }

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError("User not found");
    }

    const result = await this.addressRepository.create({
      userId,
      address,
      postalCode,
      city,
      state,
    });

    return result;
  }

  async updateAddress(data: IAddressUpdate): Promise<IAddress | null> {
    const { id, address, postalCode, city, state } = data;
    if (!id) {
      throw new AppError("Address id not provided");
    }

    if (!address && !postalCode && !city && !state) {
      throw new AppError("Missing required parameters");
    }

    const addressExists = await this.addressRepository.findById(id);
    if (!addressExists) {
      throw new AppError("Address record not found");
    }

    const result = await this.addressRepository.update({
      id,
      address,
      postalCode,
      city,
      state,
    });

    return result;
  }

  async deleteAddress(id: string): Promise<IAddress | null> {
    if (!id) {
      throw new AppError("Address id not provided");
    }

    const result = await this.addressRepository.remove(id);
    return result;
  }
}

import { randomUUID } from "crypto";
import {
  IAddress,
  IAddressCreate,
  IAddressUpdate,
} from "../../../src/interfaces/address";
import { IAddressRepository } from "../../../src/repositories";

export class InMemoryAddressRepository extends IAddressRepository {
  private readonly addresses: IAddress[] = [
    {
      id: "address-1",
      userId: "user-1",
      address: "user-1 street",
      postalCode: "11111111",
      city: "user-1 city",
      state: "user-1 state",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  async findById(id: string): Promise<IAddress | null> {
    const address = this.addresses.find((address) => address.id === id);
    if (!address) {
      return null;
    }

    return address;
  }

  async findByUserId(userId: string): Promise<IAddress[]> {
    return this.addresses.filter((address) => address.userId === userId);
  }

  async create(data: IAddressCreate): Promise<IAddress> {
    const address: IAddress = {
      id: randomUUID(),
      userId: data.userId,
      address: data.address,
      postalCode: data.postalCode,
      city: data.city,
      state: data.state,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.addresses.push(address);
    return address;
  }

  async update(data: IAddressUpdate): Promise<IAddress | null> {
    const address = this.addresses.find((address) => address.id === data.id);
    if (!address) {
      return null;
    }

    address.address = data.address ?? address.address;
    address.postalCode = data.postalCode ?? address.postalCode;
    address.city = data.city ?? address.city;
    address.state = data.state ?? address.city;

    return address;
  }

  async remove(id: string): Promise<IAddress | null> {
    const address = this.addresses.find((address) => address.id === id);
    if (!address) {
      return null;
    }

    const addressIndex = this.addresses.findIndex(
      (address) => address.id === id
    );

    this.addresses.splice(addressIndex, 1);
    return address;
  }
}

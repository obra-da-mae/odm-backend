import { PrismaClient } from "@prisma/client";
import {
  IAddress,
  IAddressCreate,
  IAddressUpdate,
} from "../../interfaces/address";
import { IAddressRepository } from "../interfaces/IAddressRepository";

export class AddressRepository extends IAddressRepository {
  private readonly prisma;

  constructor() {
    super();
    this.prisma = new PrismaClient();
  }

  async findById(id: string): Promise<IAddress | null> {
    return this.prisma.address.findFirst({
      where: { id },
    });
  }

  async findByUserId(userId: string): Promise<IAddress[]> {
    return this.prisma.address.findMany({
      where: { userId },
    });
  }

  async create(data: IAddressCreate): Promise<IAddress> {
    return this.prisma.address.create({
      data,
    });
  }

  async update(data: IAddressUpdate): Promise<IAddress | null> {
    return this.prisma.address.update({
      where: { id: data.id },
      data: {
        address: data.address,
        postalCode: data.postalCode,
        city: data.city,
        state: data.state,
      },
    });
  }

  async remove(id: string): Promise<IAddress | null> {
    return this.prisma.address.delete({
      where: { id },
    });
  }
}

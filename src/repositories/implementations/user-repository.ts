import { PrismaClient } from "@prisma/client";
import { IUserRepository } from "../interfaces/IUserRepository";
import {
  IUser,
  IUserCreate,
  IUserUpdate,
  IUserUpdatePassword,
} from "../../interfaces/user";

export class UserRepository extends IUserRepository {
  private readonly prisma;

  constructor() {
    super();
    this.prisma = new PrismaClient();
  }

  async findById(id: string): Promise<IUser | null> {
    return this.prisma.user.findFirst({
      where: { id },
      include: { address: true },
    });
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return this.prisma.user.findFirst({ where: { email } });
  }

  async create(data: IUserCreate): Promise<IUser> {
    return this.prisma.user.create({ data });
  }

  async update(data: IUserUpdate): Promise<IUser | null> {
    return this.prisma.user.update({
      where: { id: data.id },
      data: {
        name: data.name,
        paymentMethod: data.paymentMethod,
      },
    });
  }

  async updatePassword(data: IUserUpdatePassword): Promise<IUser | null> {
    return this.prisma.user.update({
      where: { id: data.id },
      data: {
        password: data.password,
      },
    });
  }
}

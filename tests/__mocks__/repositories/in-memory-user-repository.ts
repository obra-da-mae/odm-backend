import { randomUUID } from "crypto";
import { IUserRepository } from "../../../src/repositories/interfaces/IUserRepository";
import {
  IUser,
  IUserCreate,
  IUserUpdate,
  IUserUpdatePassword,
} from "../../../src/interfaces/user";

export class InMemoryUserRepository implements IUserRepository {
  private readonly users: IUser[] = [
    {
      id: "user-1",
      name: "john",
      email: "john@example.com",
      password: "$2b$10$9gtP7YpI6rEZKYfJn7lDquygCTQKGNHn1jzWj3TOiEB4CIWDAO/pS",
      paymentMethod: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
  ];

  async findById(id: string): Promise<IUser | null> {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      return null;
    }

    return user;
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const user = this.users.find((user) => user.email === email);
    if (!user) {
      return null;
    }

    return user;
  }

  async create(data: IUserCreate): Promise<IUser> {
    const user: IUser = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password: data.password ?? "",
      paymentMethod: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };

    this.users.push(user);
    return user;
  }

  async update(data: IUserUpdate): Promise<IUser | null> {
    const user = this.users.find((user) => user.id === data.id);
    if (!user) {
      return null;
    }

    user.name = data.name ?? user.name;
    user.paymentMethod = data.paymentMethod ?? user.paymentMethod;

    return user;
  }

  async updatePassword(data: IUserUpdatePassword): Promise<IUser | null> {
    const user = this.users.find((user) => user.id === data.id);
    if (!user) {
      return null;
    }

    user.password = data.password ?? user.password;

    return user;
  }
}

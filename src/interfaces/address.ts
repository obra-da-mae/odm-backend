import { Address } from "@prisma/client";

export interface IAddress extends Address {}

export interface IAddressCreate
  extends Omit<IAddress, "id" | "createdAt" | "updatedAt"> {}

export interface IAddressUpdate {
  id: string;
  address?: string;
  postalCode?: string;
  city?: string;
  state?: string;
}

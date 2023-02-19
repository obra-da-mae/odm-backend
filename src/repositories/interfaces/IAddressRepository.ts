import {
  IAddress,
  IAddressCreate,
  IAddressUpdate,
} from "../../interfaces/address";

export abstract class IAddressRepository {
  abstract findById(id: string): Promise<IAddress | null>;
  abstract findByUserId(userId: string): Promise<IAddress[]>;
  abstract create(data: IAddressCreate): Promise<IAddress>;
  abstract update(data: IAddressUpdate): Promise<IAddress | null>;
  abstract remove(id: string): Promise<IAddress | null>;
}

import { AddressService } from "../address-service";
import { InMemoryAddressRepository } from "../../../tests/__mocks__/repositories/in-memory-address-repository";
import { InMemoryUserRepository } from "../../../tests/__mocks__/repositories/in-memory-user-repository";

describe("Address service test suite", () => {
  let addressService: AddressService;

  beforeEach(() => {
    const inMemoryAddressRepository = new InMemoryAddressRepository();
    const inMemoryUserRepository = new InMemoryUserRepository();
    addressService = new AddressService(
      inMemoryAddressRepository,
      inMemoryUserRepository
    );
  });

  describe("Create address", () => {
    it("should throw if user id is missing", async () => {
      const result = addressService.createAddress({
        userId: "",
        address: "street",
        postalCode: "123123",
        city: "city",
        state: "state",
      });
      await expect(result).rejects.toThrow("User id not provided");
    });

    it("should throw if required parameters are missing", async () => {
      const result = addressService.createAddress({
        userId: "user-1",
        address: "",
        postalCode: "123123",
        city: "city",
        state: "state",
      });
      await expect(result).rejects.toThrow("Missing required parameters");
    });

    it("should throw if user is not found", async () => {
      const result = addressService.createAddress({
        userId: "not-exists",
        address: "street",
        postalCode: "123123",
        city: "city",
        state: "state",
      });
      await expect(result).rejects.toThrow("User not found");
    });

    it("should properly create address", async () => {
      const result = await addressService.createAddress({
        userId: "user-1",
        address: "street",
        postalCode: "123123",
        city: "city",
        state: "state",
      });
      expect(result).toHaveProperty("id");
      expect(result).toHaveProperty("createdAt");
    });
  });

  describe("Update address", () => {
    it("should throw if id is missing", async () => {
      const result = addressService.updateAddress({
        id: "",
        address: "street",
        postalCode: "123123",
        city: "city",
        state: "state",
      });
      await expect(result).rejects.toThrow("Address id not provided");
    });

    it("should throw if required parameters are missing", async () => {
      const result = addressService.updateAddress({
        id: "address-1",
        address: "",
        postalCode: "",
        city: "",
        state: "",
      });
      await expect(result).rejects.toThrow("Missing required parameters");
    });

    it("should throw if user is not found", async () => {
      const result = addressService.updateAddress({
        id: "not-exists",
        address: "street",
        postalCode: "123123",
        city: "city",
        state: "state",
      });
      await expect(result).rejects.toThrow("Address record not found");
    });

    it("should properly update address", async () => {
      const result = await addressService.updateAddress({
        id: "address-1",
        address: "new address",
        postalCode: "123123",
        city: "city",
        state: "state",
      });
      expect(result).toHaveProperty("id");
      expect(result?.address).toBe("new address");
    });
  });

  describe("Delete address", () => {
    it("should throw if id is missing", async () => {
      const result = addressService.deleteAddress("");
      await expect(result).rejects.toThrow("Address id not provided");
    });

    it("should properly update address", async () => {
      const result = await addressService.deleteAddress("address-1");
      expect(result).toHaveProperty("id");
    });
  });
});

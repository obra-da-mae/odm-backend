import { UserService } from "../user-service";
import { InMemoryUserRepository } from "../../../tests/__mocks__/repositories/in-memory-user-repository";

describe("User service test suite", () => {
  let userService: UserService;

  beforeEach(() => {
    const userRepository = new InMemoryUserRepository();
    userService = new UserService(userRepository);
  });

  describe("Get user by id", () => {
    it("should throw an error if required parameters are missing", async () => {
      const result = userService.getUserById("");
      await expect(result).rejects.toThrow("User id not provided");
    });

    it("should throw an error if user is not found", async () => {
      const result = userService.getUserById("not-exists");
      await expect(result).rejects.toThrow("User not found");
    });

    it("should return user", async () => {
      const result = await userService.getUserById("user-1");
      expect(result).not.toBeNull();
      expect(result.name).toBe("john");
    });
  });

  describe("Update user data", () => {
    it("should throw an error if user id is missing", async () => {
      const result = userService.updateUser({
        id: "",
        name: "john doe",
        paymentMethod: "pix",
      });
      await expect(result).rejects.toThrow("User id not provided");
    });

    it("should throw an error if no data to update provided", async () => {
      const result = userService.updateUser({
        id: "user-1",
        name: "",
        paymentMethod: "",
      });
      await expect(result).rejects.toThrow(
        "Provide at least one data to update"
      );
    });

    it("should throw an error if user is not found", async () => {
      const result = userService.updateUser({
        id: "not-found",
        name: "john doe",
        paymentMethod: "pix",
      });
      await expect(result).rejects.toThrow("User not found");
    });

    it("should return user", async () => {
      const result = await userService.updateUser({
        id: "user-1",
        name: "john doe",
        paymentMethod: "pix",
      });
      expect(result).not.toBeNull();
      expect(result?.paymentMethod).toBe("pix");
    });
  });

  describe("Update user password", () => {
    it("should throw an error if required parameters are missing", async () => {
      const result = userService.updateUserPassword({
        id: "",
        email: "",
        password: "",
      });
      await expect(result).rejects.toThrow("Missing required parameters");
    });

    it("should throw an error if user email not found", async () => {
      const result = userService.updateUserPassword({
        id: "user-1",
        email: "not@found.com",
        password: "test",
      });
      await expect(result).rejects.toThrow("User not found");
    });

    it("should return user", async () => {
      const result = userService.updateUserPassword({
        id: "user-1",
        email: "john@example.com",
        password: "test",
      });
      await expect(result).resolves.not.toThrow();
    });
  });
});

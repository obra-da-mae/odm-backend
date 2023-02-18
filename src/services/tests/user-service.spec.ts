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
});

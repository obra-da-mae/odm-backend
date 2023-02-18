import { AuthService } from "../auth-service";
import { InMemoryUserRepository } from "../../../tests/__mocks__/repositories/in-memory-user-repository";

describe("User service test suite", () => {
  let authService: AuthService;

  beforeEach(() => {
    const userRepository = new InMemoryUserRepository();
    authService = new AuthService(userRepository);
  });

  describe("Sign up user", () => {
    it("should throw if name is missing", async () => {
      const result = authService.registerUser({
        name: "",
        email: "jane@example.com",
        password: "pass",
      });
      await expect(result).rejects.toThrow("Missing required parameters");
    });

    it("should throw if email is missing", async () => {
      const result = authService.registerUser({
        name: "jane",
        email: "",
        password: "pass",
      });
      await expect(result).rejects.toThrow("Missing required parameters");
    });

    it("should throw if password is missing", async () => {
      const result = authService.registerUser({
        name: "jane",
        email: "jane@example.com",
        password: "",
      });
      await expect(result).rejects.toThrow("Missing required parameters");
    });

    it("should throw if user already exists", async () => {
      const result = authService.registerUser({
        name: "jane",
        email: "john@example.com",
        password: "pass",
      });
      await expect(result).rejects.toThrow(
        "User with provided email already exists"
      );
    });

    it("should properly create user", async () => {
      const result = await authService.registerUser({
        name: "jane",
        email: "jane@example.com",
        password: "pass",
      });
      expect(result).toHaveProperty("id");
      expect(result).toHaveProperty("createdAt");
    });
  });

  describe("Sign in user", () => {
    it("should throw if email is missing", async () => {
      const result = authService.loginUser({
        email: "",
        password: "pass",
      });
      await expect(result).rejects.toThrow("Missing required parameters");
    });

    it("should throw if password is missing", async () => {
      const result = authService.loginUser({
        email: "jane@example.com",
        password: "",
      });
      await expect(result).rejects.toThrow("Missing required parameters");
    });

    it("should throw if user is not registered", async () => {
      const result = authService.loginUser({
        email: "jane@example.com",
        password: "pass",
      });
      await expect(result).rejects.toThrow(
        "User with provided email does not exist"
      );
    });

    it("should throw if password does not match", async () => {
      const result = authService.loginUser({
        email: "john@example.com",
        password: "pass",
      });
      await expect(result).rejects.toThrow("Invalid credentials");
    });

    it("should properly sign in user", async () => {
      const result = await authService.loginUser({
        email: "john@example.com",
        password: "password",
      });
      expect(result).toHaveProperty("accessToken");
      expect(result).toHaveProperty("user");
    });
  });
});

import { defineEventHandler, readBody } from "h3";
import type { LoginCredentials } from "~/types/auth";

export default defineEventHandler(async (event) => {
  const body = await readBody<LoginCredentials>(event);

  // Mock login logic - replace with actual implementation
  if (body.email === "test@example.com" && body.password === "password") {
    return {
      id: "1",
      email: body.email,
      name: "Test User",
      role: "customer",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  throw createError({
    statusCode: 401,
    message: "Invalid credentials",
  });
});

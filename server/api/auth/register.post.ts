import { defineEventHandler, readBody } from "h3";
import type { RegisterData } from "~/types/auth";

export default defineEventHandler(async (event) => {
  const body = await readBody<RegisterData>(event);

  // Mock registration logic - replace with actual implementation
  return {
    id: "1",
    email: body.email,
    name: body.name,
    role: body.role,
    phone: body.phone,
    description: body.description,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
});

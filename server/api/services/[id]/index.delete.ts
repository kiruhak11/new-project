import { defineEventHandler } from "h3";

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;

  if (!id) {
    throw createError({
      statusCode: 400,
      message: "Service ID is required",
    });
  }

  // Mock service deletion - replace with actual implementation
  return { success: true };
});

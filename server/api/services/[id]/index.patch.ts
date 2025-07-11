import { defineEventHandler, readBody, createError } from "h3";
import type { ServiceFormData, Service } from "~/types/services";

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;

  if (!id) {
    throw createError({
      statusCode: 400,
      message: "Service ID is required",
    });
  }

  const body = await readBody(event);

  // В реальном приложении здесь будет обновление в базе данных
  return {
    id,
    ...body,
    status: "active",
    image: "/images/service.jpg",
    gallery: ["/images/1.jpg", "/images/2.jpg"],
    rating: 4.5,
    reviewsCount: 10,
    reviews: [
      {
        id: "review1",
        userId: "user456",
        rating: 5,
        comment: "Great service!",
        createdAt: new Date(),
        avatar: "/images/avatar.jpg",
        name: "John Doe",
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    provider: {
      id: "provider123",
      name: "Provider Name",
      avatar: "/images/provider.jpg",
      rating: 4.8,
      description: "Provider description",
      completedJobs: 50,
      responseTime: "1 hour",
    },
  };
});

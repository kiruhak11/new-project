import { defineEventHandler, readBody } from "h3";
import type { ServiceFormData, Service } from "~/types/services";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // В реальном приложении здесь будет сохранение в базу данных
  return {
    id: "service1",
    ...body,
    userId: "user123",
    status: "active",
    image: "/images/service.jpg",
    gallery: ["/images/1.jpg", "/images/2.jpg"],
    rating: 4.5,
    reviewsCount: 0,
    reviews: [],
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

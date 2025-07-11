import { defineEventHandler, getQuery } from "h3";
import type { Service } from "~/types/services";

export default defineEventHandler(async () => {
  // В реальном приложении здесь будет запрос к базе данных
  return [
    {
      id: "service1",
      title: "Service Title 1",
      description: "Service Description 1",
      price: 1000,
      userId: "user123",
      status: "active",
      image: "/images/service1.jpg",
      gallery: ["/images/1.jpg", "/images/2.jpg"],
      category: "development",
      tags: ["web", "frontend"],
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
    },
  ];
});

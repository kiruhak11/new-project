export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface Review {
  id: string;
  rating: number;
  content: string;
  date: string;
  user: User;
}

export interface Provider {
  id: string;
  name: string;
  avatar: string;
  description: string;
  completedJobs: number;
  rating: number;
  responseTime: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  reviewsCount: number;
  category: string;
  image: string;
  gallery?: string[];
  tags: string[];
  provider: Provider;
  reviews?: Review[];
  createdAt: string;
}

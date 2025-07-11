export interface Review {
  id: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: Date;
  avatar: string;
  name: string;
}

export interface ServiceProvider {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  description: string;
  completedJobs: number;
  responseTime: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  userId: string;
  status: "active" | "inactive";
  image: string;
  gallery?: string[];
  category: string;
  tags: string[];
  reviews: Review[];
  rating: number;
  reviewsCount: number;
  createdAt: Date;
  updatedAt: Date;
  provider: ServiceProvider;
}

export interface ServiceFormData {
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  tags: string[];
}

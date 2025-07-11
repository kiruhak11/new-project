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
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export interface ServiceFormData {
  title: string;
  description: string;
  price: number;
}

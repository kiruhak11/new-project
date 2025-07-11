export type UserRole = "customer" | "provider" | "admin";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  description?: string;
  avatar?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  phone?: string;
  description?: string;
}

export interface ServiceSubmission {
  id: string;
  providerId: string;
  categoryId: number;
  title: string;
  description: string;
  price: number;
  priceType: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  serviceId: string;
  content: string;
  createdAt: string;
  read: boolean;
}

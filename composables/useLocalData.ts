import initialData from "~/server/data.json";

interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: string;
  createdAt: string;
}

interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  userId: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

interface LocalData {
  users: User[];
  services: Service[];
}

interface RawService {
  id: string;
  title: string;
  description: string;
  price: number;
  userId: string;
  status: string;
  createdAt: string;
}

interface RawData {
  users: User[];
  services: RawService[];
}

export const useLocalData = () => {
  const data = useState<LocalData>("localData", () => ({
    users: [],
    services: [],
  }));

  const fetchData = async () => {
    try {
      const response = await fetch("/api/data");
      const result = (await response.json()) as RawData;

      // Convert raw services to typed services
      const services = result.services.map((service) => ({
        ...service,
        status: (service.status === "active"
          ? "approved"
          : service.status) as Service["status"],
      }));

      data.value = {
        users: result.users,
        services,
      };
    } catch (error) {
      console.error("Error fetching data:", error);
      data.value = initialData as LocalData;
    }
  };

  const saveData = async () => {
    try {
      await fetch("/api/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data.value),
      });
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const addUser = async (user: User) => {
    data.value.users.push(user);
    await saveData();
  };

  const addService = async (service: Service) => {
    data.value.services.push(service);
    await saveData();
  };

  const updateService = async (
    serviceId: string,
    updates: Partial<Service>
  ) => {
    const index = data.value.services.findIndex((s) => s.id === serviceId);
    if (index !== -1) {
      data.value.services[index] = {
        ...data.value.services[index],
        ...updates,
      };
      await saveData();
    }
  };

  const deleteService = async (serviceId: string) => {
    data.value.services = data.value.services.filter((s) => s.id !== serviceId);
    await saveData();
  };

  const findUserByEmail = (email: string): User | undefined => {
    return data.value.users.find((u) => u.email === email);
  };

  const findUserById = (id: string): User | undefined => {
    return data.value.users.find((u) => u.id === id);
  };

  const getUserServices = (userId: string): Service[] => {
    return data.value.services.filter((s) => s.userId === userId);
  };

  const getAllServices = (): Service[] => {
    return data.value.services;
  };

  const getAllUsers = (): User[] => {
    return data.value.users;
  };

  // Initialize data when the composable is first used
  if (process.client) {
    fetchData();
  }

  return {
    data,
    fetchData,
    addUser,
    addService,
    updateService,
    deleteService,
    findUserByEmail,
    findUserById,
    getUserServices,
    getAllServices,
    getAllUsers,
  };
};

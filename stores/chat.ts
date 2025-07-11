import { defineStore } from "pinia";
import type { User } from "~/types/auth";

export interface Message {
  id: string;
  text: string;
  userId: string;
  createdAt: Date;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage: Message;
  unreadCount: number;
}

export const useChatStore = defineStore("chat", {
  state: () => ({
    messages: [] as Message[],
    conversations: [] as Conversation[],
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async sendMessage(text: string, userId: string) {
      try {
        const message: Message = {
          id: Date.now().toString(),
          text,
          userId,
          createdAt: new Date(),
          read: false,
        };
        this.messages.push(message);
        return message;
      } catch (error) {
        console.error("Send message error:", error);
        throw error;
      }
    },

    async fetchMessages() {
      this.loading = true;
      try {
        const { data } = await useFetch<Message[]>("/api/chat/messages");
        if (data.value) {
          this.messages = data.value.map((message) => ({
            ...message,
            createdAt: new Date(message.createdAt),
          }));
        }
      } catch (error) {
        console.error("Fetch messages error:", error);
        this.error = "Failed to fetch messages";
      } finally {
        this.loading = false;
      }
    },

    async getConversation(userId: string) {
      try {
        const { data } = await useFetch<Conversation>(
          `/api/chat/conversations/${userId}`
        );
        if (data.value) {
          return {
            ...data.value,
            lastMessage: {
              ...data.value.lastMessage,
              createdAt: new Date(data.value.lastMessage.createdAt),
            },
          };
        }
        return null;
      } catch (error) {
        console.error("Get conversation error:", error);
        throw error;
      }
    },

    async markAsRead(messageId: string) {
      try {
        await useFetch(`/api/chat/messages/${messageId}/read`, {
          method: "POST",
        });
        const message = this.messages.find((m) => m.id === messageId);
        if (message) {
          message.read = true;
        }
      } catch (error) {
        console.error("Mark as read error:", error);
        throw error;
      }
    },
  },
});

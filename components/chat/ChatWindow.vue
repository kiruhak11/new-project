<template>
  <div class="chat-window">
    <div class="chat-window__header">
      <h3>Чат по услуге: {{ serviceName }}</h3>
    </div>

    <div class="chat-window__messages" ref="messagesContainer">
      <div
        v-for="message in messages"
        :key="message.id"
        :class="[
          'message',
          { 'message--own': message.userId === currentUserId },
        ]"
      >
        <div class="message__content">
          {{ message.text }}
        </div>
        <div class="message__time">
          {{ formatDate(message.createdAt) }}
        </div>
      </div>

      <div v-if="messages.length === 0" class="chat-window__empty">
        Нет сообщений
      </div>
    </div>

    <div class="chat-window__input">
      <textarea
        v-model="newMessage"
        @keyup.enter.prevent="handleSendMessage"
        placeholder="Введите сообщение..."
        class="chat-input"
      ></textarea>
      <button
        class="btn btn-primary"
        @click="handleSendMessage"
        :disabled="!newMessage.trim() || loading"
      >
        Отправить
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  serviceId: string;
  serviceName: string;
  recipientId: string;
}>();

const authStore = useAuthStore();
const chatStore = useChatStore();

const currentUserId = computed(() => authStore.user?.id);
const conversation = ref<Conversation | null>(null);

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
};

const messages = computed(() =>
  chatStore.messages.filter(
    (m) => m.userId === currentUserId.value || m.userId === props.recipientId
  )
);

const newMessage = ref("");
const loading = ref(false);

const handleSendMessage = async () => {
  if (!newMessage.value.trim() || !currentUserId.value) return;

  loading.value = true;
  try {
    await chatStore.sendMessage(newMessage.value.trim(), currentUserId.value);
    newMessage.value = "";
  } catch (err) {
    console.error("Error sending message:", err);
  } finally {
    loading.value = false;
  }
};
const messagesContainer = ref<HTMLElement | null>(null);

function scrollToBottom() {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
}

// Прокручиваем к последнему сообщению при монтировании
onMounted(async () => {
  await chatStore.fetchMessages();
  scrollToBottom();
});

// Помечаем сообщения как прочитанные
watch(
  messages,
  (newMessages) => {
    newMessages.forEach((message) => {
      if (message.userId === props.recipientId && !message.read) {
        chatStore.markAsRead(message.id);
      }
    });
  },
  { deep: true }
);
</script>

<style lang="scss">
.chat-window {
  display: flex;
  flex-direction: column;
  height: 500px;
  background-color: var(--background-color);
  border: 1px solid var(--gray-200);
  border-radius: 0.5rem;
  overflow: hidden;

  &__header {
    padding: 1rem;
    background-color: var(--gray-100);
    border-bottom: 1px solid var(--gray-200);

    h3 {
      margin: 0;
      font-size: 1rem;
      font-weight: 600;
    }
  }

  &__messages {
    flex: 1;
    padding: 1rem;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__empty {
    text-align: center;
    color: var(--gray-300);
    margin: auto 0;
  }

  &__input {
    padding: 1rem;
    border-top: 1px solid var(--gray-200);
    display: flex;
    gap: 1rem;
  }
}

.message {
  max-width: 70%;
  align-self: flex-start;

  &--own {
    align-self: flex-end;

    .message__content {
      background-color: var(--primary-color);
      color: white;
    }
  }

  &__content {
    background-color: var(--gray-100);
    padding: 0.75rem 1rem;
    border-radius: 1rem;
    word-break: break-word;
  }

  &__time {
    font-size: 0.75rem;
    color: var(--gray-300);
    margin-top: 0.25rem;
    text-align: right;
  }
}

.chat-input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid var(--gray-200);
  border-radius: 0.375rem;
  resize: none;
  height: 40px;
  font-family: inherit;
  font-size: 0.875rem;
  background-color: var(--background-color);
  color: var(--text-color);

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
}
</style>

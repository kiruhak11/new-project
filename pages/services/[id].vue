<template>
  <div class="service-details">
    <div class="container">
      <div v-if="loading" style="padding: 4rem 0">
        <div
          class="skeleton"
          style="height: 400px; margin-bottom: 2rem; border-radius: 1rem"
        />
        <div
          class="skeleton"
          style="height: 40px; width: 60%; margin-bottom: 1rem"
        />
        <div
          class="skeleton"
          style="height: 24px; width: 30%; margin-bottom: 2rem"
        />
        <div class="skeleton" style="height: 100px; margin-bottom: 2rem" />
      </div>

      <div v-else-if="error" style="text-align: center; padding: 4rem 0">
        <p style="color: #ef4444; font-size: 1.25rem; margin-bottom: 1rem">
          Error loading service details
        </p>
        <button @click="retryLoading" class="btn btn-primary">Try Again</button>
      </div>

      <template v-else-if="service">
        <div class="service-details__header">
          <NuxtLink
            to="/services"
            class="btn btn-outline"
            style="margin-bottom: 2rem"
          >
            ← Back to Services
          </NuxtLink>

          <div class="service-details__main">
            <div class="service-details__gallery">
              <img
                :src="service.image"
                :alt="service.title"
                class="service-details__image"
              />
              <div
                class="service-details__thumbnails"
                v-if="service.gallery?.length"
              >
                <img
                  v-for="(image, index) in service.gallery"
                  :key="index"
                  :src="image"
                  :alt="`${service.title} - image ${index + 1}`"
                  class="service-details__thumbnail"
                  @click="service.image = image"
                />
              </div>
            </div>

            <div class="service-details__content">
              <div class="service-details__header-content">
                <h1 class="service-details__title">{{ service.title }}</h1>
                <div class="service-details__meta">
                  <div class="service-details__rating">
                    <span class="stars">★★★★★</span>
                    <span class="rating-value">{{ service.rating }}</span>
                    <span class="reviews-count"
                      >({{ service.reviewsCount }} reviews)</span
                    >
                  </div>
                  <div class="service-details__category">
                    {{ service.category }}
                  </div>
                </div>
              </div>

              <div class="service-details__price-section">
                <div class="service-details__price">
                  <span class="currency">$</span>
                  <span class="amount">{{ service.price }}</span>
                </div>
                <button class="btn btn-primary" style="width: 100%">
                  Book Now
                </button>
              </div>

              <div class="service-details__description">
                <h2>About This Service</h2>
                <p>{{ service.description }}</p>
              </div>

              <div class="service-details__tags">
                <span
                  v-for="tag in service.tags"
                  :key="tag"
                  class="service-details__tag"
                >
                  {{ tag }}
                </span>
              </div>

              <div class="service-details__provider">
                <h2>About the Provider</h2>
                <div class="provider-info">
                  <img
                    :src="service.provider.avatar"
                    :alt="service.provider.name"
                    class="provider-avatar"
                  />
                  <div class="provider-details">
                    <h3>{{ service.provider.name }}</h3>
                    <p>{{ service.provider.description }}</p>
                    <div class="provider-stats">
                      <div class="stat">
                        <span class="value">{{
                          service.provider.completedJobs
                        }}</span>
                        <span class="label">Jobs Completed</span>
                      </div>
                      <div class="stat">
                        <span class="value">{{ service.provider.rating }}</span>
                        <span class="label">Rating</span>
                      </div>
                      <div class="stat">
                        <span class="value">{{
                          service.provider.responseTime
                        }}</span>
                        <span class="label">Avg. Response</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                class="service-details__reviews"
                v-if="service.reviews?.length"
              >
                <h2>Customer Reviews</h2>
                <div class="reviews-list">
                  <div
                    v-for="review in service.reviews"
                    :key="review.id"
                    class="review-item"
                  >
                    <div class="review-header">
                      <img
                        :src="review.avatar"
                        :alt="review.name"
                        class="review-avatar"
                      />
                      <div class="review-meta">
                        <h4>{{ review.name }}</h4>
                        <div class="review-rating">
                          <span class="stars">★★★★★</span>
                          <span class="rating-value">{{ review.rating }}</span>
                        </div>
                      </div>
                      <span class="review-date">{{
                        formatReviewDate(review.createdAt)
                      }}</span>
                    </div>
                    <p class="review-content">{{ review.comment }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useServicesStore } from "~/stores/services";
import type { Service, Review } from "~/types/services";

const route = useRoute();
const servicesStore = useServicesStore();

const service = ref<Service | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);

const formatReviewDate = (date: Date) => {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

const reviews = computed<Review[]>(() => service.value?.reviews || []);

onMounted(async () => {
  try {
    loading.value = true;
    error.value = null;
    const id = route.params.id as string;
    service.value = await servicesStore.fetchServiceById(id);
  } catch (err) {
    console.error("Error fetching service:", err);
    error.value = "Ошибка при загрузке услуги";
  } finally {
    loading.value = false;
  }
});

const retryLoading = async () => {
  try {
    loading.value = true;
    error.value = null;
    const id = route.params.id as string;
    service.value = await servicesStore.fetchServiceById(id);
  } catch (err) {
    console.error("Error fetching service:", err);
    error.value = "Ошибка при загрузке услуги";
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped>
.service-details {
  padding: 2rem 0;

  &__main {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;

    @media (max-width: 1024px) {
      grid-template-columns: 1fr;
    }
  }

  &__gallery {
    position: sticky;
    top: 2rem;
  }

  &__image {
    width: 100%;
    height: 400px;
    object-fit: cover;
    border-radius: 16px;
    margin-bottom: 1rem;
  }

  &__thumbnails {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
  }

  &__thumbnail {
    width: 100%;
    height: 80px;
    object-fit: cover;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }

  &__header-content {
    margin-bottom: 2rem;
  }

  &__title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }

  &__meta {
    display: flex;
    align-items: center;
    gap: 2rem;
    color: #4b5563;
  }

  &__rating {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .stars {
      color: #f59e0b;
    }
  }

  &__category {
    padding: 0.25rem 0.75rem;
    background: #f3f4f6;
    border-radius: 9999px;
    font-size: 0.875rem;
  }

  &__price-section {
    background: white;
    padding: 1.5rem;
    border-radius: 16px;
    margin-bottom: 2rem;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  }

  &__price {
    font-size: 2rem;
    font-weight: 700;
    color: #3b82f6;
    margin-bottom: 1rem;

    .currency {
      font-size: 1.5rem;
      margin-right: 0.25rem;
    }
  }

  &__description {
    margin-bottom: 2rem;

    h2 {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }

    p {
      color: #4b5563;
      line-height: 1.6;
    }
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 2rem;
  }

  &__tag {
    padding: 0.25rem 0.75rem;
    background: #f3f4f6;
    border-radius: 9999px;
    font-size: 0.875rem;
  }

  &__provider {
    background: white;
    padding: 1.5rem;
    border-radius: 16px;
    margin-bottom: 2rem;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

    h2 {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
    }
  }
}

.provider-info {
  display: flex;
  gap: 1.5rem;
}

.provider-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.provider-details {
  flex: 1;

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  p {
    color: #4b5563;
    margin-bottom: 1rem;
  }
}

.provider-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  text-align: center;
}

.stat {
  .value {
    display: block;
    font-size: 1.25rem;
    font-weight: 600;
    color: #3b82f6;
  }

  .label {
    font-size: 0.875rem;
    color: #4b5563;
  }
}

.reviews-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.review-item {
  background: white;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.review-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.review-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.review-meta {
  flex: 1;

  h4 {
    font-weight: 600;
    margin-bottom: 0.25rem;
  }
}

.review-rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .stars {
    color: #f59e0b;
  }
}

.review-date {
  color: #4b5563;
  font-size: 0.875rem;
}

.review-content {
  color: #4b5563;
  line-height: 1.6;
}
</style>

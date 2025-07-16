<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero__background">
        <div class="hero__gradient"></div>
      </div>
      <div class="container">
        <div class="hero__content">
          <div class="hero__text">
            <h1 class="hero__title">
              Найдите лучших
              <span class="hero__title-highlight">специалистов</span>
              для ваших задач
            </h1>
            <p class="hero__description">
              ServiFlex — современная платформа для поиска и предоставления услуг. 
              Соединяем заказчиков с проверенными исполнителями по всей стране.
            </p>
            <div class="hero__actions">
              <NuxtLink to="/services" class="btn btn-primary btn--lg">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                Найти услугу
              </NuxtLink>
              <NuxtLink
                v-if="!authStore.isAuthenticated"
                to="/auth/register"
                class="btn btn-outline btn--lg"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                Стать исполнителем
              </NuxtLink>
            </div>
          </div>
          <div class="hero__image">
            <div class="hero__illustration">
              <div class="hero__card hero__card--1">
                <div class="hero__card-icon">⚡</div>
                <div class="hero__card-text">Быстро</div>
              </div>
              <div class="hero__card hero__card--2">
                <div class="hero__card-icon">🛡️</div>
                <div class="hero__card-text">Надежно</div>
              </div>
              <div class="hero__card hero__card--3">
                <div class="hero__card-icon">💎</div>
                <div class="hero__card-text">Качественно</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <div class="container">
        <div class="features__header">
          <h2 class="features__title">Почему выбирают нас</h2>
          <p class="features__description">
            Мы создали платформу, которая делает поиск и предоставление услуг простым и безопасным
          </p>
        </div>
        <div class="features__grid">
          <div class="feature-card">
            <div class="feature-card__icon">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="feature-card__title">Проверенные исполнители</h3>
            <p class="feature-card__description">
              Все исполнители проходят тщательную верификацию и имеют подтвержденные отзывы
            </p>
          </div>
          <div class="feature-card">
            <div class="feature-card__icon">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <h3 class="feature-card__title">Безопасная оплата</h3>
            <p class="feature-card__description">
              Защищенная система платежей с гарантией возврата средств при невыполнении работы
            </p>
          </div>
          <div class="feature-card">
            <div class="feature-card__icon">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
              </svg>
            </div>
            <h3 class="feature-card__title">Гарантия качества</h3>
            <p class="feature-card__description">
              Система рейтингов и отзывов обеспечивает высокое качество выполнения услуг
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats">
      <div class="container">
        <div class="stats__grid">
          <div class="stat-item">
            <div class="stat-item__number">1000+</div>
            <div class="stat-item__label">Исполнителей</div>
          </div>
          <div class="stat-item">
            <div class="stat-item__number">5000+</div>
            <div class="stat-item__label">Выполненных заказов</div>
          </div>
          <div class="stat-item">
            <div class="stat-item__number">4.8</div>
            <div class="stat-item__label">Средний рейтинг</div>
          </div>
          <div class="stat-item">
            <div class="stat-item__number">24/7</div>
            <div class="stat-item__label">Поддержка</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta">
      <div class="container">
        <div class="cta__content">
          <h2 class="cta__title">Готовы начать?</h2>
          <p class="cta__description">
            Присоединяйтесь к тысячам довольных пользователей уже сегодня
          </p>
          <div class="cta__actions">
            <NuxtLink to="/auth/register" class="btn btn-primary btn--lg">
              Зарегистрироваться бесплатно
            </NuxtLink>
            <NuxtLink to="/services" class="btn btn-ghost btn--lg">
              Посмотреть услуги
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore();
</script>

<style lang="scss" scoped>
/* Hero Section */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  
  &__background {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }
  
  &__gradient {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, 
      rgba(99, 102, 241, 0.9) 0%, 
      rgba(139, 92, 246, 0.8) 50%, 
      rgba(59, 130, 246, 0.9) 100%
    );
  }
  
  &__content {
    position: relative;
    z-index: 10;
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-3xl);
    align-items: center;
    
    @media (min-width: 1024px) {
      grid-template-columns: 1fr 1fr;
    }
  }
  
  &__text {
    color: white;
    
    @media (max-width: 1023px) {
      text-align: center;
    }
  }
  
  &__title {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: var(--font-bold);
    line-height: 1.1;
    margin-bottom: var(--spacing-lg);
    
    &-highlight {
      background: linear-gradient(135deg, #fbbf24, #f59e0b);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }
  
  &__description {
    font-size: var(--text-xl);
    line-height: var(--leading-relaxed);
    margin-bottom: var(--spacing-2xl);
    opacity: 0.9;
  }
  
  &__actions {
    display: flex;
    gap: var(--spacing-md);
    flex-wrap: wrap;
    
    @media (max-width: 1023px) {
      justify-content: center;
    }
    
    .btn {
      min-width: 200px;
      
      svg {
        width: 1.25rem;
        height: 1.25rem;
      }
    }
  }
  
  &__image {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  &__illustration {
    position: relative;
    width: 300px;
    height: 300px;
    
    @media (min-width: 768px) {
      width: 400px;
      height: 400px;
    }
  }
  
  &__card {
    position: absolute;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: var(--radius-xl);
    padding: var(--spacing-lg);
    color: white;
    text-align: center;
    animation: float 6s ease-in-out infinite;
    
    &--1 {
      top: 20%;
      left: 10%;
      animation-delay: 0s;
    }
    
    &--2 {
      top: 50%;
      right: 10%;
      animation-delay: 2s;
    }
    
    &--3 {
      bottom: 20%;
      left: 20%;
      animation-delay: 4s;
    }
    
    &-icon {
      font-size: 2rem;
      margin-bottom: var(--spacing-sm);
    }
    
    &-text {
      font-weight: var(--font-medium);
    }
  }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

/* Features Section */
.features {
  padding: var(--spacing-3xl) 0;
  background: var(--color-background-alt);
  
  &__header {
    text-align: center;
    margin-bottom: var(--spacing-3xl);
  }
  
  &__title {
    font-size: var(--text-4xl);
    font-weight: var(--font-bold);
    margin-bottom: var(--spacing-lg);
    color: var(--color-text);
  }
  
  &__description {
    font-size: var(--text-lg);
    color: var(--color-text-light);
    max-width: 600px;
    margin: 0 auto;
  }
  
  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-xl);
    
    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
    
    @media (min-width: 1024px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}

.feature-card {
  background: var(--color-background);
  border-radius: var(--radius-xl);
  padding: var(--spacing-2xl);
  text-align: center;
  box-shadow: var(--shadow-lg);
  transition: all var(--transition-normal);
  border: 1px solid var(--color-border-light);
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-xl);
  }
  
  &__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 4rem;
    height: 4rem;
    background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
    border-radius: var(--radius-xl);
    color: white;
    margin-bottom: var(--spacing-lg);
    
    svg {
      width: 2rem;
      height: 2rem;
    }
  }
  
  &__title {
    font-size: var(--text-xl);
    font-weight: var(--font-semibold);
    margin-bottom: var(--spacing-md);
    color: var(--color-text);
  }
  
  &__description {
    color: var(--color-text-light);
    line-height: var(--leading-relaxed);
  }
}

/* Stats Section */
.stats {
  padding: var(--spacing-3xl) 0;
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
  color: white;
  
  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-xl);
    
    @media (min-width: 768px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}

.stat-item {
  text-align: center;
  
  &__number {
    font-size: var(--text-4xl);
    font-weight: var(--font-bold);
    margin-bottom: var(--spacing-sm);
    background: linear-gradient(135deg, #fbbf24, #f59e0b);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  &__label {
    font-size: var(--text-lg);
    opacity: 0.9;
  }
}

/* CTA Section */
.cta {
  padding: var(--spacing-3xl) 0;
  background: var(--color-background);
  
  &__content {
    text-align: center;
    max-width: 800px;
    margin: 0 auto;
  }
  
  &__title {
    font-size: var(--text-4xl);
    font-weight: var(--font-bold);
    margin-bottom: var(--spacing-lg);
    color: var(--color-text);
  }
  
  &__description {
    font-size: var(--text-lg);
    color: var(--color-text-light);
    margin-bottom: var(--spacing-2xl);
  }
  
  &__actions {
    display: flex;
    gap: var(--spacing-md);
    justify-content: center;
    flex-wrap: wrap;
    
    .btn {
      min-width: 200px;
    }
  }
}

/* Responsive Design */
@media (max-width: 767px) {
  .hero {
    &__actions {
      flex-direction: column;
      align-items: center;
      
      .btn {
        width: 100%;
        max-width: 300px;
      }
    }
  }
  
  .cta {
    &__actions {
      flex-direction: column;
      align-items: center;
      
      .btn {
        width: 100%;
        max-width: 300px;
      }
    }
  }
}
</style>

<template>
  <div class="about-page">
    <div class="about-content">
      <h1>О сервисе ServiFlex</h1>
      <p class="description">
        ServiFlex - это современная платформа для поиска и предоставления услуг.
        Мы соединяем профессионалов с клиентами, делая процесс поиска и заказа
        услуг максимально простым и удобным.
      </p>

      <div class="features">
        <h2>Наши преимущества</h2>
        <div class="features-grid">
          <div class="feature-card">
            <h3>Безопасность</h3>
            <p>Проверенные исполнители и безопасные платежи</p>
          </div>
          <div class="feature-card">
            <h3>Удобство</h3>
            <p>Простой поиск и заказ услуг</p>
          </div>
          <div class="feature-card">
            <h3>Качество</h3>
            <p>Система рейтингов и отзывов</p>
          </div>
          <div class="feature-card">
            <h3>Поддержка</h3>
            <p>Помощь на всех этапах заказа</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.about-page {
  padding: 40px 20px;
}

.about-content {
  max-width: 1200px;
  margin: 0 auto;

  h1 {
    color: var(--color-heading);
    margin-bottom: 20px;
    text-align: center;
  }

  .description {
    font-size: 1.2em;
    line-height: 1.6;
    color: var(--color-text);
    text-align: center;
    max-width: 800px;
    margin: 0 auto 60px;
  }
}

.features {
  h2 {
    color: var(--color-heading);
    margin-bottom: 40px;
    text-align: center;
  }
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.feature-card {
  padding: 30px;
  background: var(--color-background-soft);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    color: var(--color-heading);
    margin-bottom: 15px;
  }

  p {
    color: var(--color-text);
    line-height: 1.5;
  }
}
</style>

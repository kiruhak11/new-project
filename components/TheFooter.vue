<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__content">
        <!-- Logo and Description -->
        <div class="footer__brand">
          <div class="footer__logo">
            <div class="footer__logo-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <span class="footer__logo-text">ServiFlex</span>
          </div>
          <p class="footer__description">
            Современная платформа для поиска и предоставления услуг. 
            Соединяем заказчиков с проверенными исполнителями.
          </p>
          <div class="footer__social">
            <a href="#" class="footer__social-link" aria-label="Telegram">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
            </a>
            <a href="#" class="footer__social-link" aria-label="VK">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1.01-1.49-.9-1.744-.9-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.441 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.204.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z"/>
              </svg>
            </a>
            <a href="#" class="footer__social-link" aria-label="WhatsApp">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Navigation Links -->
        <div class="footer__nav">
          <div class="footer__nav-section">
            <h3 class="footer__nav-title">Платформа</h3>
            <ul class="footer__nav-list">
              <li><NuxtLink to="/services" class="footer__nav-link">Все услуги</NuxtLink></li>
              <li><NuxtLink to="/categories" class="footer__nav-link">Категории</NuxtLink></li>
              <li><NuxtLink to="/auth/register" class="footer__nav-link">Стать исполнителем</NuxtLink></li>
            </ul>
          </div>

          <div class="footer__nav-section">
            <h3 class="footer__nav-title">Компания</h3>
            <ul class="footer__nav-list">
              <li><NuxtLink to="/about" class="footer__nav-link">О нас</NuxtLink></li>
              <li><a href="#" class="footer__nav-link">Блог</a></li>
              <li><a href="#" class="footer__nav-link">Карьера</a></li>
              <li><a href="#" class="footer__nav-link">Пресс-центр</a></li>
            </ul>
          </div>

          <div class="footer__nav-section">
            <h3 class="footer__nav-title">Поддержка</h3>
            <ul class="footer__nav-list">
              <li><a href="#" class="footer__nav-link">Центр помощи</a></li>
              <li><a href="#" class="footer__nav-link">Связаться с нами</a></li>
              <li><a href="#" class="footer__nav-link">Безопасность</a></li>
              <li><a href="#" class="footer__nav-link">Статус системы</a></li>
            </ul>
          </div>

          <div class="footer__nav-section">
            <h3 class="footer__nav-title">Правовая информация</h3>
            <ul class="footer__nav-list">
              <li><a href="#" class="footer__nav-link">Пользовательское соглашение</a></li>
              <li><a href="#" class="footer__nav-link">Политика конфиденциальности</a></li>
              <li><a href="#" class="footer__nav-link">Правила платформы</a></li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="footer__bottom">
        <div class="footer__bottom-content">
          <p class="footer__copyright">
            © {{ currentYear }} ServiFlex. Все права защищены.
          </p>
          <div class="footer__bottom-links">
            <a href="#" class="footer__bottom-link">Условия использования</a>
            <a href="#" class="footer__bottom-link">Конфиденциальность</a>
            <a href="#" class="footer__bottom-link">Cookies</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<style lang="scss" scoped>
.footer {
  background: var(--color-text);
  color: white;
  margin-top: auto;

  &__content {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-3xl);
    padding: var(--spacing-3xl) 0;

    @media (min-width: 768px) {
      grid-template-columns: 1fr 2fr;
    }

    @media (min-width: 1024px) {
      gap: var(--spacing-3xl);
    }
  }

  &__brand {
    max-width: 400px;
  }

  &__logo {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-lg);

    &-icon {
      width: 2.5rem;
      height: 2.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
      border-radius: var(--radius-md);
      color: white;

      svg {
        width: 1.5rem;
        height: 1.5rem;
      }
    }

    &-text {
      font-size: var(--text-2xl);
      font-weight: var(--font-bold);
      background: linear-gradient(135deg, var(--color-primary-light), white);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }

  &__description {
    color: rgba(255, 255, 255, 0.8);
    line-height: var(--leading-relaxed);
    margin-bottom: var(--spacing-xl);
  }

  &__social {
    display: flex;
    gap: var(--spacing-md);

    &-link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2.5rem;
      height: 2.5rem;
      background: rgba(255, 255, 255, 0.1);
      border-radius: var(--radius-md);
      color: rgba(255, 255, 255, 0.8);
      transition: all var(--transition-fast);

      &:hover {
        background: var(--color-primary);
        color: white;
        transform: translateY(-2px);
      }

      svg {
        width: 1.25rem;
        height: 1.25rem;
      }
    }
  }

  &__nav {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-xl);

    @media (min-width: 640px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1024px) {
      grid-template-columns: repeat(4, 1fr);
    }

    &-section {
      min-width: 0;
    }

    &-title {
      font-size: var(--text-lg);
      font-weight: var(--font-semibold);
      margin-bottom: var(--spacing-lg);
      color: white;
    }

    &-list {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        margin-bottom: var(--spacing-sm);
      }
    }

    &-link {
      color: rgba(255, 255, 255, 0.8);
      text-decoration: none;
      font-size: var(--text-sm);
      transition: color var(--transition-fast);

      &:hover {
        color: var(--color-primary-light);
      }
    }
  }

  &__bottom {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding: var(--spacing-xl) 0;

    &-content {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md);
      align-items: center;
      text-align: center;

      @media (min-width: 768px) {
        flex-direction: row;
        justify-content: space-between;
        text-align: left;
      }
    }

    &-links {
      display: flex;
      gap: var(--spacing-lg);
      flex-wrap: wrap;
      justify-content: center;

      @media (min-width: 768px) {
        justify-content: flex-end;
      }
    }

    &-link {
      color: rgba(255, 255, 255, 0.6);
      text-decoration: none;
      font-size: var(--text-sm);
      transition: color var(--transition-fast);

      &:hover {
        color: rgba(255, 255, 255, 0.8);
      }
    }
  }

  &__copyright {
    color: rgba(255, 255, 255, 0.6);
    font-size: var(--text-sm);
    margin: 0;
  }
}

/* Responsive Design */
@media (max-width: 767px) {
  .footer {
    &__content {
      padding: var(--spacing-2xl) 0;
      gap: var(--spacing-2xl);
    }

    &__nav {
      gap: var(--spacing-lg);

      &-section {
        text-align: center;
      }
    }

    &__social {
      justify-content: center;
    }
  }
}
</style>
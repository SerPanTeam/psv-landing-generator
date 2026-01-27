/**
 * FAQ Accordion - Landing Generator
 *
 * ГЛАВНЫЙ ПРИНЦИП: Pixel-perfect по Figma
 * Простой аккордеон для FAQ секции
 */

class FAQAccordion {
  constructor(options = {}) {
    this.selectors = {
      item: '[data-faq-item]',
      toggle: '[data-faq-toggle]',
      answer: '[data-faq-answer]'
    };

    this.allowMultiple = options.allowMultiple || false;
    this.animationDuration = options.animationDuration || 300;
  }

  init() {
    this.items = document.querySelectorAll(this.selectors.item);
    if (!this.items.length) return;

    this.bindEvents();

    // Открываем первый вопрос по умолчанию
    this.openItem(this.items[0]);
  }

  bindEvents() {
    this.items.forEach(item => {
      const toggle = item.querySelector(this.selectors.toggle);
      if (toggle) {
        toggle.addEventListener('click', () => this.toggleItem(item));
      }
    });
  }

  toggleItem(item) {
    const isOpen = item.classList.contains('is-open');

    if (isOpen) {
      this.closeItem(item);
    } else {
      // Закрываем остальные, если не разрешено множественное открытие
      if (!this.allowMultiple) {
        this.items.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('is-open')) {
            this.closeItem(otherItem);
          }
        });
      }

      this.openItem(item);
    }
  }

  openItem(item) {
    const answer = item.querySelector(this.selectors.answer);
    if (!answer) return;

    // Добавляем классы
    item.classList.add('is-open');
    // faq-card-v4--expanded только для V4 карточек (с border-radius)
    if (item.classList.contains('faq-card-v4')) {
      item.classList.add('faq-card-v4--expanded');
    }

    // Анимация высоты
    answer.style.maxHeight = answer.scrollHeight + 'px';

    // Accessibility
    const toggle = item.querySelector(this.selectors.toggle);
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'true');
    }
  }

  closeItem(item) {
    const answer = item.querySelector(this.selectors.answer);
    if (!answer) return;

    // Убираем классы
    item.classList.remove('is-open');
    if (item.classList.contains('faq-card-v4')) {
      item.classList.remove('faq-card-v4--expanded');
    }

    // Анимация высоты
    answer.style.maxHeight = '0';

    // Accessibility
    const toggle = item.querySelector(this.selectors.toggle);
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'false');
    }
  }

  // Публичные методы
  openAll() {
    this.items.forEach(item => this.openItem(item));
  }

  closeAll() {
    this.items.forEach(item => this.closeItem(item));
  }
}

// Автоинициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
  const faq = new FAQAccordion({
    allowMultiple: false
  });

  faq.init();

  // Экспортируем в глобальный объект для отладки
  window.faqAccordion = faq;
});

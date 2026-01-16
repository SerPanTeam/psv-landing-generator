/**
 * Quiz Logic - Landing Generator
 *
 * ГЛАВНЫЙ ПРИНЦИП: Pixel-perfect по Figma
 * Навигация по шагам, сохранение ответов, отправка формы
 */

class Quiz {
  constructor(options = {}) {
    this.currentStep = 0;
    this.totalSteps = options.totalSteps || 4;
    this.answers = {};
    this.formEndpoint = options.formEndpoint || null;
    this.onComplete = options.onComplete || null;

    this.selectors = {
      quiz: '[data-quiz]',
      step: '[data-quiz-step]',
      option: '[data-quiz-option]',
      form: '[data-quiz-form]',
      success: '[data-quiz-success]'
    };
  }

  init() {
    this.quizElement = document.querySelector(this.selectors.quiz);
    if (!this.quizElement) return;

    this.bindEvents();
    this.loadSavedAnswers();
    this.hideAllSteps(); // Скрыть все шаги при загрузке - НЕ показываем квиз автоматически
    this.bindCTAButtons(); // CTA кнопки открывают квиз
  }

  hideAllSteps() {
    // Скрываем контейнер квиза
    if (this.quizElement) {
      this.quizElement.classList.remove('is-open');
    }

    // Скрываем все шаги квиза
    document.querySelectorAll(this.selectors.step).forEach(step => {
      step.classList.remove('is-active');
    });

    // Скрываем форму и success
    const formWrapper = document.querySelector('[data-quiz-step="form"]');
    const successWrapper = document.querySelector('[data-quiz-step="success"]');
    if (formWrapper) formWrapper.classList.remove('is-active');
    if (successWrapper) successWrapper.classList.remove('is-active');
  }

  bindCTAButtons() {
    // CTA кнопки с href="#quiz" открывают квиз
    document.querySelectorAll('a[href="#quiz"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.currentStep = 0; // Сбросить на первый шаг
        this.showStep(this.currentStep, true); // Показать с скроллом
      });
    });
  }

  bindEvents() {
    // Клик по опции квиза
    document.querySelectorAll(this.selectors.option).forEach(option => {
      option.addEventListener('click', (e) => this.selectOption(e));
    });

    // Сабмит формы
    const form = document.querySelector(this.selectors.form);
    if (form) {
      form.addEventListener('submit', (e) => this.submitForm(e));
    }
  }

  selectOption(e) {
    const option = e.currentTarget;
    const value = option.dataset.quizOption;
    const stepElement = option.closest(this.selectors.step);
    const stepIndex = stepElement ? stepElement.dataset.quizStep : this.currentStep;

    // Сохраняем ответ
    this.answers[`step_${stepIndex}`] = value;
    this.saveAnswers();

    // Визуальная обратная связь
    const siblings = stepElement.querySelectorAll(this.selectors.option);
    siblings.forEach(sib => sib.classList.remove('is-selected'));
    option.classList.add('is-selected');

    // Переход к следующему шагу с задержкой
    setTimeout(() => {
      this.nextStep();
    }, 300);
  }

  showStep(index, shouldScroll = false) {
    // Показываем контейнер квиза
    this.quizElement.classList.add('is-open');

    // Скрываем все шаги
    document.querySelectorAll(this.selectors.step).forEach(step => {
      step.classList.remove('is-active');
    });

    // Скрываем форму и success
    const formWrapper = document.querySelector('[data-quiz-step="form"]');
    const successWrapper = document.querySelector('[data-quiz-step="success"]');

    if (formWrapper) formWrapper.classList.remove('is-active');
    if (successWrapper) successWrapper.classList.remove('is-active');

    // Показываем нужный шаг
    if (index === 'form') {
      if (formWrapper) formWrapper.classList.add('is-active');
    } else if (index === 'success') {
      if (successWrapper) successWrapper.classList.add('is-active');
    } else {
      const targetStep = document.querySelector(`[data-quiz-step="${index}"]`);
      if (targetStep) {
        targetStep.classList.add('is-active');
      }
    }

    // Скролл к квизу только если явно запрошен
    if (shouldScroll) {
      this.scrollToQuiz();
    }
  }

  nextStep() {
    this.currentStep++;

    if (this.currentStep >= this.totalSteps) {
      // Показываем форму
      this.showStep('form', true);
    } else {
      this.showStep(this.currentStep, true);
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.showStep(this.currentStep, true);
    }
  }

  async submitForm(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    // Собираем данные
    const data = {
      ...this.answers,
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      availability: formData.getAll('availability'),
      privacy: formData.get('privacy') === 'on',
      timestamp: new Date().toISOString(),
      source: window.location.href
    };

    console.log('Quiz submitted:', data);

    // Отправка на сервер (если настроен endpoint)
    if (this.formEndpoint) {
      try {
        const response = await fetch(this.formEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        if (!response.ok) {
          throw new Error('Form submission failed');
        }
      } catch (error) {
        console.error('Form submission error:', error);
        // Показываем success в любом случае для demo
      }
    }

    // Показываем success
    this.showStep('success', true);

    // Очищаем сохранённые ответы
    this.clearSavedAnswers();

    // Callback
    if (typeof this.onComplete === 'function') {
      this.onComplete(data);
    }

    // Analytics event
    this.trackEvent('form_submit', {
      event_category: 'quiz',
      event_label: 'lead_capture'
    });
  }

  saveAnswers() {
    try {
      localStorage.setItem('quiz_answers', JSON.stringify(this.answers));
      localStorage.setItem('quiz_step', this.currentStep.toString());
    } catch (e) {
      console.warn('Could not save quiz answers to localStorage');
    }
  }

  loadSavedAnswers() {
    try {
      const savedAnswers = localStorage.getItem('quiz_answers');
      const savedStep = localStorage.getItem('quiz_step');

      if (savedAnswers) {
        this.answers = JSON.parse(savedAnswers);
      }

      // Не восстанавливаем шаг автоматически - всегда начинаем с начала
      // if (savedStep) {
      //   this.currentStep = parseInt(savedStep, 10);
      // }
    } catch (e) {
      console.warn('Could not load quiz answers from localStorage');
    }
  }

  clearSavedAnswers() {
    try {
      localStorage.removeItem('quiz_answers');
      localStorage.removeItem('quiz_step');
    } catch (e) {
      console.warn('Could not clear quiz answers from localStorage');
    }
  }

  scrollToQuiz() {
    const quizSection = document.querySelector('#quiz');
    if (quizSection) {
      quizSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  trackEvent(eventName, params = {}) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, params);
    }

    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
      fbq('track', eventName === 'form_submit' ? 'Lead' : 'CustomEvent', params);
    }
  }

  // Публичный метод для сброса квиза
  reset() {
    this.currentStep = 0;
    this.answers = {};
    this.clearSavedAnswers();
    this.hideAllSteps(); // Скрываем квиз вместо показа первого шага

    // Сбрасываем выбранные опции
    document.querySelectorAll(this.selectors.option).forEach(option => {
      option.classList.remove('is-selected');
    });
  }
}

// Автоинициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
  // Ищем конфиг квиза в data-атрибуте
  const quizElement = document.querySelector('[data-quiz]');
  if (!quizElement) return;

  const totalSteps = parseInt(quizElement.dataset.quizSteps, 10) || 4;
  const formEndpoint = quizElement.dataset.quizEndpoint || null;

  const quiz = new Quiz({
    totalSteps,
    formEndpoint,
    onComplete: (data) => {
      console.log('Quiz completed!', data);
    }
  });

  quiz.init();

  // Экспортируем в глобальный объект для отладки
  window.quiz = quiz;
});

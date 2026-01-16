/**
 * Gallery Slider - Landing Generator
 *
 * Простой слайдер для галереи изображений с навигацией стрелками.
 */

class GallerySlider {
  constructor(element) {
    this.wrapper = element;
    this.track = element.querySelector('.gallery-slider__track');
    this.slides = element.querySelectorAll('.gallery-slider__slide');
    this.prevBtn = element.querySelector('.gallery-slider__arrow--prev');
    this.nextBtn = element.querySelector('.gallery-slider__arrow--next');

    this.currentIndex = 0;
    this.slidesToShow = 3; // Показывать 3 слайда одновременно
    this.slideGap = 20; // Отступ между слайдами в px

    this.init();
  }

  init() {
    if (this.slides.length === 0) return;

    this.calculateSlideWidth();
    this.bindEvents();
    this.updatePosition();
    this.updateArrowsState();

    // Пересчёт при ресайзе
    window.addEventListener('resize', () => {
      this.calculateSlideWidth();
      this.updatePosition();
    });
  }

  calculateSlideWidth() {
    const viewport = this.wrapper.querySelector('.gallery-slider__viewport');
    if (!viewport) return;

    const viewportWidth = viewport.offsetWidth;
    // Ширина одного слайда = (viewport - gaps) / slidesToShow
    this.slideWidth = (viewportWidth - this.slideGap * (this.slidesToShow - 1)) / this.slidesToShow;

    // Устанавливаем ширину каждому слайду
    this.slides.forEach(slide => {
      slide.style.width = `${this.slideWidth}px`;
      slide.style.flexShrink = '0';
    });

    // Устанавливаем gap для track
    this.track.style.gap = `${this.slideGap}px`;
  }

  bindEvents() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.prev());
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.next());
    }

    // Touch/swipe support
    let startX = 0;
    let endX = 0;

    this.track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    }, { passive: true });

    this.track.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      const diff = startX - endX;

      if (Math.abs(diff) > 50) { // Минимальный свайп 50px
        if (diff > 0) {
          this.next();
        } else {
          this.prev();
        }
      }
    }, { passive: true });
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updatePosition();
      this.updateArrowsState();
    }
  }

  next() {
    const maxIndex = Math.max(0, this.slides.length - this.slidesToShow);
    if (this.currentIndex < maxIndex) {
      this.currentIndex++;
      this.updatePosition();
      this.updateArrowsState();
    }
  }

  updatePosition() {
    const offset = this.currentIndex * (this.slideWidth + this.slideGap);
    this.track.style.transform = `translateX(-${offset}px)`;
  }

  updateArrowsState() {
    const maxIndex = Math.max(0, this.slides.length - this.slidesToShow);

    if (this.prevBtn) {
      this.prevBtn.disabled = this.currentIndex === 0;
      this.prevBtn.classList.toggle('is-disabled', this.currentIndex === 0);
    }

    if (this.nextBtn) {
      this.nextBtn.disabled = this.currentIndex >= maxIndex;
      this.nextBtn.classList.toggle('is-disabled', this.currentIndex >= maxIndex);
    }
  }
}

// Автоинициализация всех слайдеров на странице
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.gallery-slider__wrapper').forEach(wrapper => {
    new GallerySlider(wrapper);
  });
});

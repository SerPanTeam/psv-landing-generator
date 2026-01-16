/**
 * Quiz Navigation - Landing Generator
 *
 * Handles multi-page quiz navigation:
 * - Saves answers to localStorage on option click
 * - Redirects to next page
 * - Handles form submission
 * - Logs all data to console (for demo purposes)
 */

(function() {
  'use strict';

  const STORAGE_KEY = 'quiz_answers';

  /**
   * Get saved answers from localStorage
   */
  function getAnswers() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      console.warn('Could not read quiz answers from localStorage');
      return {};
    }
  }

  /**
   * Save answers to localStorage
   */
  function saveAnswers(answers) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    } catch (e) {
      console.warn('Could not save quiz answers to localStorage');
    }
  }

  /**
   * Clear answers from localStorage
   */
  function clearAnswers() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn('Could not clear quiz answers from localStorage');
    }
  }

  /**
   * Handle quiz option click
   */
  function handleOptionClick(e) {
    e.preventDefault();

    const option = e.currentTarget;
    const value = option.dataset.value;
    const stepNumber = document.body.dataset.quizStep;
    const nextPage = option.getAttribute('href');

    // Save answer
    const answers = getAnswers();
    answers[`step_${stepNumber}`] = value;
    answers.lastUpdated = new Date().toISOString();
    saveAnswers(answers);

    console.log('Quiz answer saved:', {
      step: stepNumber,
      value: value,
      allAnswers: answers
    });

    // Visual feedback
    option.classList.add('is-selected');

    // Navigate to next page with small delay for visual feedback
    setTimeout(() => {
      window.location.href = nextPage;
    }, 200);
  }

  /**
   * Handle form submission
   */
  function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const successPage = form.getAttribute('action') || 'quiz-success.html';

    // Get all quiz answers
    const answers = getAnswers();

    // Add form data to answers
    const data = {
      ...answers,
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      availability: formData.get('availability'),
      privacy: formData.get('privacy') === 'on',
      submittedAt: new Date().toISOString(),
      source: window.location.href
    };

    // Log complete data
    console.log('='.repeat(50));
    console.log('QUIZ FORM SUBMITTED');
    console.log('='.repeat(50));
    console.log('All collected data:', data);
    console.log('='.repeat(50));

    // Save final data
    saveAnswers(data);

    // Track analytics event (if available)
    trackEvent('quiz_form_submit', {
      event_category: 'quiz',
      event_label: 'lead_capture'
    });

    // Navigate to success page
    window.location.href = successPage;
  }

  /**
   * Track analytics events
   */
  function trackEvent(eventName, params) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, params);
    }

    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
      fbq('track', eventName === 'quiz_form_submit' ? 'Lead' : 'CustomEvent', params);
    }
  }

  /**
   * Initialize on page load
   */
  function init() {
    // Bind quiz option clicks
    const options = document.querySelectorAll('.quiz-option');
    options.forEach(option => {
      option.addEventListener('click', handleOptionClick);
    });

    // Bind form submission
    const form = document.getElementById('quiz-form');
    if (form) {
      form.addEventListener('submit', handleFormSubmit);
    }

    // On success page, log final answers and clear storage
    const isSuccessPage = document.body.dataset.quizStep === 'success';
    if (isSuccessPage) {
      const answers = getAnswers();
      console.log('Quiz completed! Final answers:', answers);

      // Track completion
      trackEvent('quiz_complete', {
        event_category: 'quiz',
        event_label: 'completion'
      });

      // Clear answers after displaying on success page
      // Uncomment if you want to clear on success:
      // clearAnswers();
    }

    // Log current step
    const currentStep = document.body.dataset.quizStep;
    console.log(`Quiz page loaded: step ${currentStep}`);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose utility functions for debugging
  window.quizNav = {
    getAnswers,
    saveAnswers,
    clearAnswers
  };

})();

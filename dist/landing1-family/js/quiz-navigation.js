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

  /**
   * Get sublanding-specific storage key based on URL path
   * e.g., /hochzeit/ -> quiz_answers_hochzeit
   */
  function getStorageKey() {
    const path = window.location.pathname;
    const sublandingMatch = path.match(/\/(hochzeit|familie|tier|business)\//);
    if (sublandingMatch) {
      return 'quiz_answers_' + sublandingMatch[1];
    }
    return 'quiz_answers';
  }

  const STORAGE_KEY = getStorageKey();

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
   * Handle multiselect checkbox options
   */
  function handleMultiselect() {
    const checkboxes = document.querySelectorAll('.quiz-multiselect__checkbox');
    const continueBtn = document.getElementById('multiselect-continue');

    if (!checkboxes.length || !continueBtn) return;

    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', function() {
        const label = this.closest('.quiz-multiselect__option');
        if (this.checked) {
          label.classList.add('is-checked');
        } else {
          label.classList.remove('is-checked');
        }
      });
    });

    continueBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const stepNumber = document.body.dataset.quizStep;
      const selected = [];

      checkboxes.forEach(cb => {
        if (cb.checked) selected.push(cb.value);
      });

      // Save multiselect answers
      const answers = getAnswers();
      answers[`step_${stepNumber}`] = selected;
      answers.lastUpdated = new Date().toISOString();
      saveAnswers(answers);

      console.log('Multiselect saved:', { step: stepNumber, values: selected });

      // Navigate to next page
      window.location.href = this.getAttribute('href');
    });
  }

  /**
   * Handle date input
   */
  function handleDateInput() {
    const dateInput = document.getElementById('quiz-date-input');
    const continueBtn = document.getElementById('date-continue');

    if (!dateInput || !continueBtn) return;

    continueBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const stepNumber = document.body.dataset.quizStep;
      const dateValue = dateInput.value;

      // Save date answer
      const answers = getAnswers();
      answers[`step_${stepNumber}`] = dateValue;
      answers.lastUpdated = new Date().toISOString();
      saveAnswers(answers);

      console.log('Date saved:', { step: stepNumber, value: dateValue });

      // Navigate to next page
      window.location.href = this.getAttribute('href');
    });
  }

  /**
   * Handle textarea input
   */
  function handleTextarea() {
    const textarea = document.getElementById('quiz-textarea-input');
    const continueBtn = document.getElementById('textarea-continue');

    if (!textarea || !continueBtn) return;

    continueBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const stepNumber = document.body.dataset.quizStep;
      const textValue = textarea.value;

      // Save textarea answer
      const answers = getAnswers();
      answers[`step_${stepNumber}`] = textValue;
      answers.lastUpdated = new Date().toISOString();
      saveAnswers(answers);

      console.log('Textarea saved:', { step: stepNumber, value: textValue });

      // Navigate to next page
      window.location.href = this.getAttribute('href');
    });
  }

  /**
   * Handle conditional navigation for options with per-option nextPage
   * Options can have data-next-page attribute that overrides the default href
   */
  function handleConditionalNavigation(option) {
    const nextPage = option.dataset.nextPage;
    if (nextPage) {
      return nextPage;
    }
    return option.getAttribute('href');
  }

  /**
   * Handle form V5 submission (with timeslots)
   */
  function handleFormV5Submit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const successPage = form.getAttribute('action') || 'quiz-success.html';

    // Get all quiz answers
    const answers = getAnswers();

    // Collect timeslots
    const timeslots = formData.getAll('timeslot[]');

    // Add form data to answers
    const data = {
      ...answers,
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      timeslots: timeslots,
      privacy: formData.get('privacy') === 'on',
      submittedAt: new Date().toISOString(),
      source: window.location.href
    };

    console.log('='.repeat(50));
    console.log('QUIZ FORM V5 SUBMITTED');
    console.log('='.repeat(50));
    console.log('All collected data:', data);
    console.log('='.repeat(50));

    saveAnswers(data);

    trackEvent('quiz_form_submit', {
      event_category: 'quiz',
      event_label: 'lead_capture_v5'
    });

    window.location.href = successPage;
  }

  /**
   * Initialize on page load
   */
  function init() {
    // Bind quiz option clicks (standard step pages)
    const options = document.querySelectorAll('.quiz-option:not(.quiz-multiselect__option)');
    options.forEach(option => {
      option.addEventListener('click', handleOptionClick);
    });

    // Handle multiselect page
    handleMultiselect();

    // Handle date page
    handleDateInput();

    // Handle textarea page
    handleTextarea();

    // Bind form submission (standard)
    const form = document.getElementById('quiz-form');
    if (form) {
      form.addEventListener('submit', handleFormSubmit);
    }

    // Bind form V5 submission
    const formV5 = document.getElementById('quiz-form-v5');
    if (formV5) {
      formV5.addEventListener('submit', handleFormV5Submit);
    }

    // On success page, log final answers and clear storage
    const isSuccessPage = document.body.dataset.quizStep === 'success';
    if (isSuccessPage) {
      const answers = getAnswers();
      console.log('Quiz completed! Final answers:', answers);

      trackEvent('quiz_complete', {
        event_category: 'quiz',
        event_label: 'completion'
      });
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

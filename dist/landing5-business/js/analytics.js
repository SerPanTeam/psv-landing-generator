/* ============================================
   ANALYTICS - LANDING GENERATOR
   
   Заготовка для подключения аналитики.
   Раскомментируйте нужные сервисы и добавьте свои ID.
   ============================================ */

/**
 * Analytics Configuration
 * 
 * Поддерживаемые сервисы:
 * - Google Analytics 4
 * - Google Tag Manager
 * - Facebook Pixel
 * - Yandex Metrika
 */

const AnalyticsConfig = {
  // Google Analytics 4
  ga4: {
    enabled: false,
    measurementId: 'G-XXXXXXXXXX' // Замените на свой ID
  },
  
  // Google Tag Manager
  gtm: {
    enabled: false,
    containerId: 'GTM-XXXXXXX' // Замените на свой ID
  },
  
  // Facebook Pixel
  facebook: {
    enabled: false,
    pixelId: 'XXXXXXXXXXXXXXXX' // Замените на свой ID
  },
  
  // Yandex Metrika
  yandex: {
    enabled: false,
    counterId: 'XXXXXXXX' // Замените на свой ID
  }
};

/**
 * Initialize Analytics
 */
function initAnalytics() {
  // Google Analytics 4
  if (AnalyticsConfig.ga4.enabled) {
    initGA4(AnalyticsConfig.ga4.measurementId);
  }
  
  // Google Tag Manager
  if (AnalyticsConfig.gtm.enabled) {
    initGTM(AnalyticsConfig.gtm.containerId);
  }
  
  // Facebook Pixel
  if (AnalyticsConfig.facebook.enabled) {
    initFacebookPixel(AnalyticsConfig.facebook.pixelId);
  }
  
  // Yandex Metrika
  if (AnalyticsConfig.yandex.enabled) {
    initYandexMetrika(AnalyticsConfig.yandex.counterId);
  }
}

/**
 * Google Analytics 4
 */
function initGA4(measurementId) {
  // Load gtag.js
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
  
  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', measurementId);
  
  console.log('[Analytics] GA4 initialized:', measurementId);
}

/**
 * Google Tag Manager
 */
function initGTM(containerId) {
  // GTM Script
  (function(w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s),
        dl = l != 'dataLayer' ? '&l=' + l : '';
    j.async = true;
    j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
    f.parentNode.insertBefore(j, f);
  })(window, document, 'script', 'dataLayer', containerId);
  
  console.log('[Analytics] GTM initialized:', containerId);
}

/**
 * Facebook Pixel
 */
function initFacebookPixel(pixelId) {
  // Facebook Pixel Code
  !function(f,b,e,v,n,t,s) {
    if(f.fbq) return;
    n = f.fbq = function() {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if(!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  
  fbq('init', pixelId);
  fbq('track', 'PageView');
  
  console.log('[Analytics] Facebook Pixel initialized:', pixelId);
}

/**
 * Yandex Metrika
 */
function initYandexMetrika(counterId) {
  // Yandex Metrika Code
  (function(m, e, t, r, i, k, a) {
    m[i] = m[i] || function() { (m[i].a = m[i].a || []).push(arguments); };
    m[i].l = 1 * new Date();
    k = e.createElement(t);
    a = e.getElementsByTagName(t)[0];
    k.async = 1;
    k.src = r;
    a.parentNode.insertBefore(k, a);
  })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');
  
  ym(counterId, 'init', {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true
  });
  
  console.log('[Analytics] Yandex Metrika initialized:', counterId);
}

/**
 * Track Custom Events
 */
const Analytics = {
  /**
   * Track page view
   */
  pageView: function(pageName) {
    // GA4
    if (typeof gtag !== 'undefined') {
      gtag('event', 'page_view', {
        page_title: pageName,
        page_location: window.location.href
      });
    }
    
    // Facebook
    if (typeof fbq !== 'undefined') {
      fbq('track', 'PageView');
    }
    
    // Yandex
    if (typeof ym !== 'undefined') {
      ym(AnalyticsConfig.yandex.counterId, 'hit', window.location.href);
    }
  },
  
  /**
   * Track quiz step
   */
  quizStep: function(stepNumber, stepName) {
    // GA4
    if (typeof gtag !== 'undefined') {
      gtag('event', 'quiz_step', {
        event_category: 'Quiz',
        event_label: stepName,
        step_number: stepNumber
      });
    }
    
    // Facebook
    if (typeof fbq !== 'undefined') {
      fbq('trackCustom', 'QuizStep', {
        step: stepNumber,
        name: stepName
      });
    }
    
    console.log('[Analytics] Quiz step:', stepNumber, stepName);
  },
  
  /**
   * Track quiz completion
   */
  quizComplete: function(answers) {
    // GA4
    if (typeof gtag !== 'undefined') {
      gtag('event', 'quiz_complete', {
        event_category: 'Quiz',
        event_label: 'completed'
      });
    }
    
    // Facebook
    if (typeof fbq !== 'undefined') {
      fbq('track', 'CompleteRegistration');
    }
    
    console.log('[Analytics] Quiz complete:', answers);
  },
  
  /**
   * Track form submission
   */
  formSubmit: function(formName, data) {
    // GA4
    if (typeof gtag !== 'undefined') {
      gtag('event', 'form_submit', {
        event_category: 'Form',
        event_label: formName
      });
      
      // Also track as lead
      gtag('event', 'generate_lead', {
        currency: 'EUR',
        value: 0
      });
    }
    
    // Facebook
    if (typeof fbq !== 'undefined') {
      fbq('track', 'Lead');
    }
    
    console.log('[Analytics] Form submit:', formName, data);
  },
  
  /**
   * Track button click
   */
  buttonClick: function(buttonName, location) {
    // GA4
    if (typeof gtag !== 'undefined') {
      gtag('event', 'click', {
        event_category: 'Button',
        event_label: buttonName,
        button_location: location
      });
    }
    
    console.log('[Analytics] Button click:', buttonName, location);
  },
  
  /**
   * Track scroll depth
   */
  scrollDepth: function(percentage) {
    // GA4
    if (typeof gtag !== 'undefined') {
      gtag('event', 'scroll', {
        event_category: 'Scroll',
        event_label: `${percentage}%`,
        scroll_depth: percentage
      });
    }
  }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
  initAnalytics();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Analytics, AnalyticsConfig };
}

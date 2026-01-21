/**
 * Test Helpers for Landing Generator
 *
 * Utility functions for common test operations.
 */

/**
 * Standard viewport sizes for testing
 */
const VIEWPORTS = {
  MOBILE_SMALL: { width: 320, height: 568, name: 'mobile-small' },
  MOBILE: { width: 375, height: 667, name: 'mobile' },
  MOBILE_LG: { width: 576, height: 800, name: 'mobile-lg' },
  TABLET: { width: 768, height: 1024, name: 'tablet' },
  DESKTOP: { width: 992, height: 800, name: 'desktop' },
  DESKTOP_XL: { width: 1440, height: 900, name: 'desktop-xl' },
};

/**
 * Minimum touch target size according to WCAG 2.5.5
 */
const MIN_TOUCH_TARGET = 44;

/**
 * Check if page has horizontal scroll
 * @param {import('@playwright/test').Page} page
 * @returns {Promise<boolean>}
 */
async function hasHorizontalScroll(page) {
  return page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  });
}

/**
 * Get elements with touch targets smaller than minimum
 * @param {import('@playwright/test').Page} page
 * @param {string} selector
 * @param {number} minSize
 * @returns {Promise<Array<{selector: string, width: number, height: number}>>}
 */
async function getSmallTouchTargets(page, selector = 'button, a.btn, .btn', minSize = MIN_TOUCH_TARGET) {
  return page.evaluate(({ sel, min }) => {
    const elements = document.querySelectorAll(sel);
    const small = [];

    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        if (rect.height < min || rect.width < min) {
          small.push({
            selector: el.className || el.tagName,
            width: Math.round(rect.width),
            height: Math.round(rect.height),
          });
        }
      }
    });

    return small;
  }, { sel: selector, min: minSize });
}

/**
 * Wait for page to be fully loaded including lazy content
 * @param {import('@playwright/test').Page} page
 * @param {number} additionalDelay
 */
async function waitForFullLoad(page, additionalDelay = 500) {
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(additionalDelay);
}

/**
 * Get all elements that overflow the viewport horizontally
 * @param {import('@playwright/test').Page} page
 * @returns {Promise<Array<{selector: string, right: number}>>}
 */
async function getOverflowingElements(page) {
  return page.evaluate(() => {
    const viewportWidth = window.innerWidth;
    const allElements = document.querySelectorAll('*');
    const overflowing = [];

    allElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.right > viewportWidth + 1 && rect.width > 0) {
        // Get a useful selector
        let selector = el.tagName.toLowerCase();
        if (el.id) selector += `#${el.id}`;
        if (el.className && typeof el.className === 'string') {
          selector += `.${el.className.split(' ').join('.')}`;
        }

        overflowing.push({
          selector: selector.slice(0, 100),
          right: Math.round(rect.right),
          width: Math.round(rect.width),
        });
      }
    });

    return overflowing;
  });
}

module.exports = {
  VIEWPORTS,
  MIN_TOUCH_TARGET,
  hasHorizontalScroll,
  getSmallTouchTargets,
  waitForFullLoad,
  getOverflowingElements,
};

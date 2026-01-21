// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Quiz Flow Tests
 *
 * Тесты для проверки корректной работы квиза на мобильных устройствах.
 */

test.describe('Quiz Flow - Mobile', () => {
  test.beforeEach(async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
  });

  test('Quiz navigation works correctly', async ({ page }) => {
    await page.goto('/landing1-family/quiz-step1.html');
    await page.waitForLoadState('networkidle');

    // Check progress indicator is visible
    const progress = page.locator('.quiz-progress');
    await expect(progress).toBeVisible();

    // Check that question is visible
    const question = page.locator('.quiz-question');
    await expect(question).toBeVisible();

    // Check that options are present
    const options = page.locator('.quiz-option');
    await expect(options.first()).toBeVisible();
  });

  test('Quiz options have adequate touch targets', async ({ page }) => {
    await page.goto('/landing1-family/quiz-step1.html');
    await page.waitForLoadState('networkidle');

    const smallOptions = await page.evaluate(() => {
      const options = document.querySelectorAll('.quiz-option');
      const small = [];

      options.forEach(opt => {
        const rect = opt.getBoundingClientRect();
        if (rect.height < 44) {
          small.push({
            text: opt.textContent?.trim().slice(0, 30) || '',
            height: Math.round(rect.height)
          });
        }
      });

      return small;
    });

    expect(smallOptions).toHaveLength(0);
  });

  test('Quiz form inputs are usable on mobile', async ({ page }) => {
    await page.goto('/landing1-family/quiz-form.html');
    await page.waitForLoadState('networkidle');

    // Check that form inputs have adequate height
    const smallInputs = await page.evaluate(() => {
      const inputs = document.querySelectorAll('input, select, textarea');
      const small = [];

      inputs.forEach(input => {
        const rect = input.getBoundingClientRect();
        if (rect.height < 44) {
          small.push({
            type: input.tagName,
            name: input.getAttribute('name') || '',
            height: Math.round(rect.height)
          });
        }
      });

      return small;
    });

    // Log for debugging
    if (smallInputs.length > 0) {
      console.log('Small form inputs:', smallInputs);
    }

    // Should have no critically small inputs (< 40px)
    const criticalSmall = smallInputs.filter(i => i.height < 40);
    expect(criticalSmall).toHaveLength(0);
  });

  test('Quiz success page displays correctly', async ({ page }) => {
    await page.goto('/landing1-family/quiz-success.html');
    await page.waitForLoadState('networkidle');

    // Check no horizontal scroll
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });

    expect(hasHorizontalScroll).toBe(false);

    // Check success message is visible
    const successContent = page.locator('.quiz-success, .success-message, [class*="success"]');
    // If there's a success element, it should be visible
    const count = await successContent.count();
    if (count > 0) {
      await expect(successContent.first()).toBeVisible();
    }
  });
});

test.describe('Quiz Layout - Responsive Grid', () => {
  test('Quiz options stack properly on small mobile', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await page.goto('/landing1-family/quiz-step1.html');
    await page.waitForLoadState('networkidle');

    // Check that all option cards fit within viewport
    const overflowingCards = await page.evaluate(() => {
      const cards = document.querySelectorAll('.quiz-card, .quiz-option');
      const viewportWidth = window.innerWidth;
      const overflowing = [];

      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        if (rect.right > viewportWidth + 5) {
          overflowing.push({
            index,
            right: Math.round(rect.right),
            viewportWidth
          });
        }
      });

      return overflowing;
    });

    expect(overflowingCards).toHaveLength(0);
  });
});

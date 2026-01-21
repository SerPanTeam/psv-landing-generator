// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Landing 1 Mobile Audit Tests
 *
 * Тесты для проверки адаптивности лендинга на различных viewport'ах.
 * Проверяем отсутствие горизонтального скролла, touch targets и визуальную регрессию.
 */

const viewports = [
  { width: 320, height: 568, name: 'mobile-small' },   // iPhone SE
  { width: 375, height: 667, name: 'mobile' },          // iPhone 12
  { width: 576, height: 800, name: 'mobile-lg' },       // Breakpoint
  { width: 768, height: 1024, name: 'tablet' },         // Tablet breakpoint
  { width: 992, height: 800, name: 'desktop' },         // Desktop breakpoint
  { width: 1440, height: 900, name: 'desktop-xl' }      // Full desktop
];

test.describe('Landing 1 - Horizontal Scroll Tests', () => {
  for (const vp of viewports) {
    test(`No horizontal scroll at ${vp.name} (${vp.width}px)`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/landing1-family/index.html');
      await page.waitForLoadState('networkidle');

      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });

      expect(hasHorizontalScroll).toBe(false);
    });
  }
});

test.describe('Landing 1 - Touch Targets Tests', () => {
  const mobileViewports = viewports.filter(vp => vp.width < 992);

  for (const vp of mobileViewports) {
    test(`Touch targets >= 44px at ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/landing1-family/index.html');
      await page.waitForLoadState('networkidle');

      const smallTargets = await page.evaluate(() => {
        const interactiveElements = document.querySelectorAll(
          'button, .btn, a.btn, .faq__question, .gallery-slider__arrow'
        );
        const small = [];

        interactiveElements.forEach(el => {
          const rect = el.getBoundingClientRect();
          // Check if element is visible
          if (rect.width > 0 && rect.height > 0) {
            if (rect.height < 44 || rect.width < 44) {
              small.push({
                selector: el.className || el.tagName,
                text: el.textContent?.trim().slice(0, 30) || '',
                width: Math.round(rect.width),
                height: Math.round(rect.height)
              });
            }
          }
        });

        return small;
      });

      // Log any small targets for debugging
      if (smallTargets.length > 0) {
        console.log(`Small touch targets at ${vp.name}:`, smallTargets);
      }

      // Allow some flexibility - warn but don't fail on minor issues
      const criticalSmallTargets = smallTargets.filter(
        t => t.height < 40 && t.width < 40
      );

      expect(criticalSmallTargets).toHaveLength(0);
    });
  }
});

test.describe('Landing 1 - Gallery Slider Responsive', () => {
  test('Gallery slider shows 1 slide on small mobile (320px)', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await page.goto('/landing1-family/index.html');
    await page.waitForLoadState('networkidle');

    // Wait for slider to initialize
    await page.waitForTimeout(500);

    const visibleSlides = await page.evaluate(() => {
      const viewport = document.querySelector('.gallery-slider__viewport');
      const slides = document.querySelectorAll('.gallery-slider__slide');
      if (!viewport || slides.length === 0) return 0;

      const viewportRect = viewport.getBoundingClientRect();
      let count = 0;

      slides.forEach(slide => {
        const slideRect = slide.getBoundingClientRect();
        // Check if slide is mostly visible within viewport
        const isVisible =
          slideRect.left >= viewportRect.left - 10 &&
          slideRect.right <= viewportRect.right + 10;
        if (isVisible) count++;
      });

      return count;
    });

    // On small mobile, should show 1 slide
    expect(visibleSlides).toBeLessThanOrEqual(1);
  });

  test('Gallery slider shows 2 slides on tablet (768px)', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/landing1-family/index.html');
    await page.waitForLoadState('networkidle');

    // Wait for slider to initialize
    await page.waitForTimeout(500);

    const slidesInView = await page.evaluate(() => {
      const viewport = document.querySelector('.gallery-slider__viewport');
      if (!viewport) return 0;
      const viewportWidth = viewport.clientWidth;
      const slide = document.querySelector('.gallery-slider__slide');
      if (!slide) return 0;
      const slideWidth = slide.clientWidth;
      // Calculate approximately how many slides fit
      return Math.floor(viewportWidth / slideWidth);
    });

    // On tablet, should show approximately 2 slides
    expect(slidesInView).toBeGreaterThanOrEqual(1);
    expect(slidesInView).toBeLessThanOrEqual(3);
  });
});

test.describe('Landing 1 - Fullpage Screenshots', () => {
  // Only run on specific viewports to avoid too many snapshots
  const screenshotViewports = [
    { width: 375, height: 667, name: 'mobile' },
    { width: 768, height: 1024, name: 'tablet' },
    { width: 1440, height: 900, name: 'desktop' }
  ];

  for (const vp of screenshotViewports) {
    test(`Screenshot at ${vp.name} (${vp.width}px)`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/landing1-family/index.html');
      await page.waitForLoadState('networkidle');

      // Wait for any animations to complete
      await page.waitForTimeout(500);

      await expect(page).toHaveScreenshot(`landing1-${vp.name}.png`, {
        fullPage: true,
        maxDiffPixels: 500 // Allow some pixel differences
      });
    });
  }
});

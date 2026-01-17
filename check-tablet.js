const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 768, height: 1024 } });

  const htmlPath = path.join(__dirname, 'dist', 'landing1-family', 'index.html');
  await page.goto('file:///' + htmlPath.replace(/\\/g, '/'), { waitUntil: 'networkidle' });

  // Get gallery info
  const galleryInfo = await page.evaluate(() => {
    const viewport = document.querySelector('.gallery-slider__viewport');
    const slides = document.querySelectorAll('.gallery-slider__slide');
    const wrapper = document.querySelector('.gallery-slider__wrapper');

    const viewportStyle = viewport ? window.getComputedStyle(viewport) : null;
    const slideStyle = slides[0] ? window.getComputedStyle(slides[0]) : null;
    const wrapperStyle = wrapper ? window.getComputedStyle(wrapper) : null;

    return {
      viewportWidth: viewport ? viewport.getBoundingClientRect().width : 0,
      viewportOverflow: viewportStyle ? viewportStyle.overflow : 'N/A',
      slideCount: slides.length,
      slideWidth: slides[0] ? slides[0].getBoundingClientRect().width : 0,
      slideFlexBasis: slideStyle ? slideStyle.flexBasis : 'N/A',
      wrapperWidth: wrapper ? wrapper.getBoundingClientRect().width : 0,
      wrapperOverflow: wrapperStyle ? wrapperStyle.overflow : 'N/A',
      bodyScrollWidth: document.body.scrollWidth,
      windowWidth: window.innerWidth,
    };
  });

  console.log('TABLET (768px) GALLERY INFO:');
  console.log(JSON.stringify(galleryInfo, null, 2));

  // Screenshot gallery
  const gallery = await page.$('.gallery-slider');
  if (gallery) {
    await gallery.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await page.screenshot({ path: 'test-results/tablet-gallery.png', fullPage: false });
    console.log('\nScreenshot saved to test-results/tablet-gallery.png');
  }

  await browser.close();
})();

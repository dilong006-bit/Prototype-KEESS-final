
const { chromium, firefox, webkit, devices } = require('playwright');
const helpers = require('./lib/helpers');

// Extra headers from environment variables (if configured)
const __extraHeaders = helpers.getExtraHeadersFromEnv();

/**
 * Utility to merge environment headers into context options.
 * Use when creating contexts with raw Playwright API instead of helpers.createContext().
 * @param {Object} options - Context options
 * @returns {Object} Options with extraHTTPHeaders merged in
 */
function getContextOptionsWithHeaders(options = {}) {
  if (!__extraHeaders) return options;
  return {
    ...options,
    extraHTTPHeaders: {
      ...__extraHeaders,
      ...(options.extraHTTPHeaders || {})
    }
  };
}

(async () => {
  try {
    
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:3000/leadership', { waitUntil: 'networkidle' });
await page.waitForTimeout(700);
await page.locator('.ld-hero button', { hasText: '도입 문의' }).click();
await page.waitForTimeout(400);
await page.getByRole('button', { name: '문의 폼으로 이동' }).click();
await page.waitForTimeout(1600);
const inView = await page.evaluate(() => { const el = document.getElementById('inq'); const r = el.getBoundingClientRect(); return {top: Math.round(r.top), inView: r.top < window.innerHeight*0.6 && r.bottom > 0, scrollY: Math.round(window.scrollY)}; });
console.log('after 1.6s:', JSON.stringify(inView));
await browser.close();

  } catch (error) {
    console.error('❌ Automation error:', error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  }
})();

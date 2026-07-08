
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
await page.goto('http://localhost:3000/hrd', { waitUntil: 'networkidle' });
await page.waitForTimeout(600);
const href = await page.locator('.nav .menu a', { hasText: 'AX·AI 전환' }).getAttribute('href');
console.log('AX·AI link href:', href);
await page.locator('.nav .menu a', { hasText: 'AX·AI 전환' }).click();
await page.waitForURL('**/ax-ai', { timeout: 12000 }).catch(e=>console.log('waitURL err'));
console.log('final url:', page.url());
await browser.close();

  } catch (error) {
    console.error('❌ Automation error:', error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  }
})();

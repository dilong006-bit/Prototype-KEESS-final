
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
const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 }, acceptDownloads: true });
const page = await ctx.newPage();
const errs=[]; page.on('pageerror',e=>errs.push(e.message)); page.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
// P2 modal → #inq scroll
await page.goto('http://localhost:3000/leadership',{waitUntil:'networkidle'}); await page.waitForTimeout(600);
await page.locator('.ld-hero button',{hasText:'도입 문의'}).click(); await page.waitForTimeout(300);
await page.getByRole('button',{name:'문의 폼으로 이동'}).click(); await page.waitForTimeout(1500);
console.log('P2 modal→#inq inView:', await page.evaluate(()=>{const r=document.getElementById('inq').getBoundingClientRect();return r.top<window.innerHeight*0.6;}));
// P2 inq email validation
await page.locator('#inq input').nth(0).fill('a'); await page.locator('#inq input').nth(1).fill('b'); await page.locator('#inq input').nth(2).fill('c');
await page.getByRole('button',{name:'도입 문의 보내기'}).click(); await page.waitForTimeout(300);
console.log('P2 inq success (3 required filled):', await page.locator('#inq .form-done.show').count());
// P3 gov preselect + hash
await page.goto('http://localhost:3000/hrd#gov',{waitUntil:'networkidle'}); await page.waitForTimeout(900);
console.log('P3 #gov hash scroll top:', await page.evaluate(()=>Math.round(document.getElementById('gov').getBoundingClientRect().top)));
await page.locator('#gov .btn',{hasText:'지원 가능 여부 상담'}).click(); await page.waitForTimeout(900);
console.log('P3 gov preselect fArea:', await page.locator('#fArea').inputValue());
// P4 real download + email validation
await page.goto('http://localhost:3000/content',{waitUntil:'networkidle'}); await page.waitForTimeout(600);
await page.locator('#download').scrollIntoViewIfNeeded();
await page.locator('#download .btn',{hasText:'과정 리스트 다운로드'}).click(); await page.waitForTimeout(300);
await page.locator('.pv-overlay.open input').nth(0).fill('홍'); await page.locator('.pv-overlay.open input').nth(1).fill('사');
await page.locator('.pv-overlay.open input[type=email]').fill('bad-email'); // invalid
await page.locator('.pv-overlay.open').getByRole('button',{name:'리스트 다운로드'}).click(); await page.waitForTimeout(300);
console.log('P4 invalid email blocks (mail field invalid):', await page.locator('.pv-overlay.open .field.invalid').count());
await page.locator('.pv-overlay.open input[type=email]').fill('a@b.com');
const dl=page.waitForEvent('download',{timeout:6000}).catch(()=>null);
await page.locator('.pv-overlay.open').getByRole('button',{name:'리스트 다운로드'}).click();
const d=await dl; console.log('P4 real download:', d?d.suggestedFilename():'NONE');
console.log('CONSOLE ERRORS:', errs.length?JSON.stringify(errs):'NONE');
await browser.close();

  } catch (error) {
    console.error('❌ Automation error:', error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  }
})();

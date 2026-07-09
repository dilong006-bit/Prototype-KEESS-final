
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
const scanFn=()=>{const vis=el=>{const s=getComputedStyle(el);return s.display!=='none'&&s.visibility!=='hidden'&&el.offsetParent!==null;};let n=0;const bad=[];document.querySelectorAll('input:not([type=hidden]):not(.hp),select,textarea').forEach(el=>{if(!vis(el))return;const id=el.id;const lab=id&&document.querySelector('label[for="'+id+'"]');const wrap=el.closest('label');const al=el.getAttribute('aria-label')||el.getAttribute('aria-labelledby');if(!lab&&!wrap&&!al){n++;bad.push(el.id||el.tagName);}});return {n,bad};};
const rp=await browser.newPage({viewport:{width:1280,height:800}});
await rp.goto('http://localhost:3000/',{waitUntil:'networkidle'});await rp.waitForTimeout(400);
await rp.locator('#site-footer').scrollIntoViewIfNeeded();
await rp.getByRole('button',{name:'부정훈련 신고'}).click();await rp.waitForTimeout(500);
let r=await rp.evaluate(scanFn);console.log('report modal(report tab): noLabel='+r.n, JSON.stringify(r.bad));
// switch to lookup tab
await rp.getByRole('tab',{name:'신고 조회'}).click();await rp.waitForTimeout(300);
r=await rp.evaluate(scanFn);console.log('report modal(lookup tab): noLabel='+r.n, JSON.stringify(r.bad));
await browser.close();

  } catch (error) {
    console.error('❌ Automation error:', error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  }
})();

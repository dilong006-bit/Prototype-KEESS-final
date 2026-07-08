const { chromium } = require('playwright');
const BASE = 'http://localhost:3000';
const PAGES = [
  { path: '/', current: null, name: '홈' },
  { path: '/ax-ai', current: 'AX·AI 전환', name: 'P1' },
  { path: '/leadership', current: '리더십·조직', name: 'P2' },
  { path: '/hrd', current: 'HRD 통합 솔루션', name: 'P3' },
  { path: '/content', current: '콘텐츠 솔루션', name: 'P4' },
];
const EXPECT_HREF = { 'AX·AI 전환': '/ax-ai', '리더십·조직': '/leadership', 'HRD 통합 솔루션': '/hrd', '콘텐츠 솔루션': '/content', '정부지원': '/hrd#gov' };

(async () => {
  const browser = await chromium.launch({ headless: true });
  const errorsAll = [];
  for (const P of PAGES) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    const errors = [];
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('pageerror', (e) => errors.push('PAGEERR:' + e.message));
    await page.goto(BASE + P.path, { waitUntil: 'networkidle', timeout: 40000 });
    await page.waitForTimeout(600);

    // GNB hrefs
    let gnbOk = true;
    for (const [label, href] of Object.entries(EXPECT_HREF)) {
      const h = await page.locator('.nav .menu a', { hasText: label }).first().getAttribute('href').catch(() => null);
      if (h !== href) { gnbOk = false; console.log(`  [${P.name}] GNB "${label}" href=${h} (expect ${href})`); }
    }
    // logo
    const logo = await page.locator('.nav .logo').getAttribute('href');
    // aria-current
    const cur = await page.locator('.nav .menu a[aria-current="page"]').innerText().catch(() => '(none)');
    // footer report modal v26 (3 tabs)
    await page.locator('#site-footer').scrollIntoViewIfNeeded();
    await page.getByRole('button', { name: '부정훈련 신고' }).click();
    await page.waitForTimeout(400);
    const modalOpen = await page.locator('#prevent-modal.open').count();
    const tabCount = await page.locator('#prevent-modal .pv-tab').count();
    const modalTitle = await page.locator('#pv-modal-title').innerText().catch(() => '');
    await page.keyboard.press('Escape');
    await page.waitForTimeout(200);

    console.log(`[${P.name} ${P.path}] GNB:${gnbOk ? 'OK' : 'FAIL'} logo:${logo} aria-current:${cur} reportModal:${modalOpen} tabs:${tabCount} title:${JSON.stringify(modalTitle)}`);

    // mobile: no horizontal overflow
    await ctx.close();
    const mctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const mp = await mctx.newPage();
    await mp.goto(BASE + P.path, { waitUntil: 'networkidle' });
    await mp.waitForTimeout(500);
    const overflow = await mp.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    // hamburger menu opens
    await mp.locator('#hamb').click();
    await mp.waitForTimeout(300);
    const mmenuOpen = await mp.locator('.mmenu.open').count();
    console.log(`   mobile: horizOverflowPx:${overflow} hamburgerMenu:${mmenuOpen}`);
    await mctx.close();

    if (errors.length) errorsAll.push(`${P.name}: ${JSON.stringify(errors)}`);
  }

  // reduced-motion: home reveal elements visible
  const rmctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const rmp = await rmctx.newPage();
  await rmp.goto(BASE + '/ax-ai', { waitUntil: 'networkidle' });
  await rmp.waitForTimeout(800);
  const hiddenReveal = await rmp.evaluate(() => {
    const els = document.querySelectorAll('.r, .stagger');
    let hidden = 0; els.forEach(e => { if (getComputedStyle(e).opacity === '0') hidden++; });
    return { total: els.length, hidden };
  });
  console.log(`[reduced-motion /ax-ai] reveal els:${hiddenReveal.total} still-hidden(opacity0):${hiddenReveal.hidden}`);
  await rmctx.close();

  console.log('CONSOLE ERRORS ALL:', errorsAll.length ? JSON.stringify(errorsAll) : 'NONE');
  await browser.close();
})();

const { chromium } = require('playwright');
const OUT = 'C:/Users/NT-0127/AppData/Local/Temp/claude/c-----------workspace-KEESS-B-Type/1d3dfd61-5663-40f3-a522-853b2539db9a/scratchpad';
const URL = 'http://localhost:3000/content';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, acceptDownloads: true });
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message));

  await page.goto(URL, { waitUntil: 'networkidle', timeout: 40000 });
  await page.waitForTimeout(1000);
  await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 80)); } window.scrollTo(0, 0); });
  await page.waitForTimeout(800);
  await page.screenshot({ path: OUT + '/p4-01-full.png', fullPage: true });
  await page.screenshot({ path: OUT + '/p4-02-hero.png' });
  console.log('shots');

  // Explorer (F11): open, tab, search, detail
  await page.getByRole('button', { name: '대표 과정 찾기' }).first().click();
  await page.waitForTimeout(500);
  const total = await page.locator('.exp-grid .ccard').count();
  console.log('explorer opened, cards:', total);
  // tab filter
  await page.locator('.exp-tab', { hasText: '데이터·의사결정' }).click(); await page.waitForTimeout(300);
  const afterTab = await page.locator('.exp-grid .ccard').count();
  console.log('after data tab cards:', afterTab);
  // search
  await page.locator('.exp-tab', { hasText: '전체' }).click(); await page.waitForTimeout(200);
  await page.locator('.toolbar input[type="search"]').fill('데이터'); await page.waitForTimeout(300);
  const afterSearch = await page.locator('.exp-grid .ccard').count();
  const countLabel = await page.locator('.toolbar .count').innerText();
  console.log('after search "리더십" cards:', afterSearch, '| count:', countLabel.replace(/\\s+/g,' '));
  await page.screenshot({ path: OUT + '/p4-03-explorer.png' });
  // reset + open detail
  await page.locator('.reset').click(); await page.waitForTimeout(200);
  await page.locator('.exp-grid .ccard').first().click(); await page.waitForTimeout(400);
  const detailTitle = await page.locator('.cdetail-head h3').innerText().catch(()=>'');
  const hasCurriculum = await page.locator('.mblock ol li').count();
  console.log('detail opened:', JSON.stringify(detailTitle.slice(0,20)), '| curriculum items:', hasCurriculum);
  await page.screenshot({ path: OUT + '/p4-04-detail.png' });
  // detail → 이 과정 도입 문의 → consult modal preselect ctx
  await page.getByRole('button', { name: '이 과정 도입 문의' }).click(); await page.waitForTimeout(400);
  const ctxText = await page.locator('.ctx').first().innerText().catch(()=>'');
  console.log('consult ctx:', JSON.stringify(ctxText.slice(0,30)));
  await page.keyboard.press('Escape'); await page.waitForTimeout(300); // close consult
  await page.keyboard.press('Escape'); await page.waitForTimeout(300); // close explorer beneath
  await page.evaluate(() => document.querySelectorAll('.pv-overlay.open').forEach(o=>o.classList.remove('open')));
  await page.waitForTimeout(200);

  // Download gate (F9) + REAL download
  await page.locator('#download').scrollIntoViewIfNeeded(); await page.waitForTimeout(300);
  await page.screenshot({ path: OUT + '/p4-05-download.png' });
  await page.locator('#download .btn', { hasText: '과정 리스트 다운로드' }).click(); await page.waitForTimeout(400);
  console.log('download gate open:', await page.locator('.pv-overlay.open').count());
  // empty submit validation
  await page.locator('.pv-overlay.open').getByRole('button', { name: '리스트 다운로드' }).click(); await page.waitForTimeout(300);
  console.log('gate invalid empty:', await page.locator('.pv-overlay.open .field.invalid').count());
  // fill + submit → capture download
  await page.locator('.pv-overlay.open input').nth(0).fill('홍길동');
  await page.locator('.pv-overlay.open input').nth(1).fill('테스트기업');
  await page.locator('.pv-overlay.open input[type="email"]').fill('t@company.com');
  const dlPromise = page.waitForEvent('download', { timeout: 8000 }).catch(() => null);
  await page.locator('.pv-overlay.open').getByRole('button', { name: '리스트 다운로드' }).click();
  const download = await dlPromise;
  console.log('REAL download triggered:', download ? download.suggestedFilename() : 'NONE');
  const okShown = await page.locator('.pv-overlay.open .okmsg').count();
  console.log('download success msg:', okShown);
  await page.keyboard.press('Escape'); await page.waitForTimeout(300);

  // cross-link href
  const crossHref = await page.locator('#download .dl-cross').getAttribute('href');
  console.log('download cross-link href:', crossHref);

  // axis scrollspy: click axisnav ax5
  await page.locator('.subnav a', { hasText: '05 법정' }).click(); await page.waitForTimeout(700);
  const ax5Top = await page.evaluate(() => Math.round(document.getElementById('ax5').getBoundingClientRect().top));
  console.log('axisnav ax5 scroll top:', ax5Top);

  // GNB + aria-current
  await page.evaluate(() => window.scrollTo(0,0)); await page.waitForTimeout(300);
  const cur = await page.locator('.nav .menu a[aria-current="page"]').innerText().catch(()=>'');
  console.log('aria-current:', cur);
  const gnbHref = await page.locator('.nav .menu a', { hasText: '정부지원' }).getAttribute('href');
  console.log('GNB 정부지원 href:', gnbHref);

  // footer v26 report modal
  await page.locator('#site-footer').scrollIntoViewIfNeeded(); await page.waitForTimeout(300);
  await page.getByRole('button', { name: '부정훈련 신고' }).click(); await page.waitForTimeout(400);
  console.log('footer v26 modal on content:', await page.locator('#prevent-modal.open').count());

  console.log('CONSOLE ERRORS:', JSON.stringify(errors));
  await browser.close();
})();

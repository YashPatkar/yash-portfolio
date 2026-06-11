/* Drives installed Chrome against the /aria landing page:
   captures console errors and full-journey screenshots at
   desktop + mobile viewports. Run: node scripts/aria-verify.mjs */
import puppeteer from 'puppeteer-core';
import { mkdirSync } from 'node:fs';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const URL = process.env.ARIA_URL ?? 'http://localhost:5173/aria';
const OUT = 'scripts/aria-shots';
mkdirSync(OUT, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const run = async (label, viewport, isMobile) => {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    args: ['--no-first-run', '--hide-scrollbars', '--mute-audio'],
  });
  const page = await browser.newPage();
  await page.setViewport({ ...viewport, isMobile, hasTouch: isMobile, deviceScaleFactor: 1 });

  const issues = [];
  page.on('console', (msg) => {
    if (['error', 'warning'].includes(msg.type())) issues.push(`[${msg.type()}] ${msg.text()}`);
  });
  page.on('pageerror', (err) => issues.push(`[pageerror] ${err.message}`));
  page.on('requestfailed', (req) =>
    issues.push(`[requestfailed] ${req.url()} — ${req.failure()?.errorText}`)
  );

  // Warm-up pass: a cold Vite dev server optimizes deps on first hit and
  // force-reloads the page, which would corrupt the capture run.
  await page.goto(URL, { waitUntil: 'networkidle2', timeout: 30000 });
  await page.waitForSelector('.aria-root', { timeout: 30000 });
  await sleep(2500);

  await page.goto(URL, { waitUntil: 'networkidle2', timeout: 30000 });
  await page.waitForSelector('.aria-hero-name', { timeout: 30000 });

  // preloader runs ~3s
  await sleep(800);
  await page.screenshot({ path: `${OUT}/${label}-0-preloader.png` });
  await sleep(3200);
  await page.screenshot({ path: `${OUT}/${label}-1-hero.png` });

  // hover a work row on desktop to capture the floating preview
  const scrollStops = [
    ['2-works', '#aria-work'],
    ['3-about', '#aria-about'],
    ['4-contact', '#aria-contact'],
  ];
  for (const [name, sel] of scrollStops) {
    await page.evaluate((s) => {
      document.querySelector(s)?.scrollIntoView({ behavior: 'instant', block: 'start' });
      window.scrollBy(0, -10);
    }, sel);
    await sleep(1400); // let reveal animations settle
    if (name === '2-works' && !isMobile) {
      const row = await page.$('.aria-work');
      if (row) {
        const box = await row.boundingBox();
        if (box) await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await sleep(700);
      }
    }
    await page.screenshot({ path: `${OUT}/${label}-${name}.png` });
  }

  // bottom of page
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await sleep(1200);
  await page.screenshot({ path: `${OUT}/${label}-5-footer.png` });

  const metrics = await page.evaluate(() => ({
    scrollHeight: document.body.scrollHeight,
    hasHorizontalOverflow: document.documentElement.scrollWidth > window.innerWidth,
    docScrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
  }));

  await browser.close();
  return { label, issues, metrics };
};

const results = [];
results.push(await run('desktop', { width: 1440, height: 900 }, false));
results.push(await run('mobile', { width: 390, height: 844 }, true));

for (const r of results) {
  console.log(`\n=== ${r.label} ===`);
  console.log('metrics:', JSON.stringify(r.metrics));
  console.log(r.issues.length ? r.issues.join('\n') : 'no console errors/warnings');
}

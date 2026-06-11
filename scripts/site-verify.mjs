/* Drives installed Chrome through every main-site route at desktop + mobile,
   capturing console errors and screenshots. Run: node scripts/site-verify.mjs */
import puppeteer from 'puppeteer-core';
import { mkdirSync } from 'node:fs';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE = process.env.SITE_URL ?? 'http://localhost:5174';
const OUT = 'scripts/site-shots';
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

  // warm-up (cold Vite optimizes deps and force-reloads)
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2500);

  // fresh visit: preloader plays once per session
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle2', timeout: 30000 });
  await page.waitForSelector('.aria-hero-name', { timeout: 30000 });
  await sleep(4000); // preloader + hero intro
  await page.screenshot({ path: `${OUT}/${label}-home-hero.png` });

  const stops = [
    ['home-works', '#work'],
    ['home-about', '#about'],
    ['home-contact', '#contact'],
  ];
  for (const [name, sel] of stops) {
    await page.evaluate((s) => {
      document.querySelector(s)?.scrollIntoView({ behavior: 'instant', block: 'start' });
    }, sel);
    await sleep(1400);
    if (name === 'home-works' && !isMobile) {
      const row = await page.$('.aria-work');
      if (row) {
        const box = await row.boundingBox();
        if (box) await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await sleep(700);
      }
    }
    await page.screenshot({ path: `${OUT}/${label}-${name}.png` });
  }

  // sub-pages (same session — preloader skipped)
  for (const route of ['works', 'about', 'contact']) {
    await page.goto(`${BASE}/${route}`, { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(2200);
    await page.screenshot({ path: `${OUT}/${label}-page-${route}.png` });
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
    await sleep(1400);
    await page.screenshot({ path: `${OUT}/${label}-page-${route}-mid.png` });
  }

  const metrics = await page.evaluate(() => ({
    hasHorizontalOverflow: document.documentElement.scrollWidth > window.innerWidth,
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

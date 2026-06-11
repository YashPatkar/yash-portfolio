/* Verifies the horizontal-projects section releases into the next section
   without a blank gap, at mobile and desktop widths. */
import puppeteer from 'puppeteer-core';
import { mkdirSync } from 'node:fs';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const URL = process.env.SITE_URL ?? 'http://localhost:5174/';
mkdirSync('scripts/aria-shots', { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const run = async (label, viewport, isMobile) => {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ ...viewport, isMobile, hasTouch: isMobile });
  await page.goto(URL, { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(7000); // intro sequence + ScrollTrigger refresh

  const info = await page.evaluate(() => {
    const wrap = document.querySelector('.h-scroll-wrap');
    if (!wrap) return { error: 'no .h-scroll-wrap found' };
    // GSAP wraps the pinned element in a pin-spacer; that spacer is what
    // occupies layout space.
    const spacer = wrap.parentElement?.classList.contains('pin-spacer')
      ? wrap.parentElement
      : wrap;
    const r = spacer.getBoundingClientRect();
    const top = r.top + window.scrollY;
    const bottom = top + r.height;
    // first visible element that starts after the spacer
    let nextTop = Infinity;
    for (const el of document.querySelectorAll('main section, main > div')) {
      if (el === wrap || spacer.contains(el) || el.contains(spacer)) continue;
      const er = el.getBoundingClientRect();
      const eTop = er.top + window.scrollY;
      if (er.height > 10 && eTop >= bottom - 5 && eTop < nextTop) nextTop = eTop;
    }
    return {
      wrapInlineHeight: wrap.style.height || '(none)',
      spacerHeight: Math.round(r.height),
      gapToNext: nextTop === Infinity ? 'n/a' : Math.round(nextTop - bottom),
      viewportH: window.innerHeight,
    };
  });
  console.log(label, JSON.stringify(info));

  // visual check right at the handoff point
  await page.evaluate(() => {
    const wrap = document.querySelector('.h-scroll-wrap');
    const spacer = wrap.parentElement?.classList.contains('pin-spacer')
      ? wrap.parentElement
      : wrap;
    const r = spacer.getBoundingClientRect();
    window.scrollTo(0, r.top + window.scrollY + r.height - window.innerHeight / 2);
  });
  await sleep(1500);
  await page.screenshot({ path: `scripts/aria-shots/hscroll-${label}-handoff.png` });
  await browser.close();
};

await run('mobile', { width: 414, height: 896 }, true);
await run('desktop', { width: 1440, height: 900 }, false);

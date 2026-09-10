const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.type(), msg.text()));
  page.on('pageerror', error => console.log('BROWSER ERROR:', error.message));

  try {
    await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    console.log('Page loaded DOM. Waiting 5s...');
    await new Promise(r => setTimeout(r, 5000));
  } catch (err) {
    console.error('Failed:', err);
  } finally {
    await browser.close();
  }
})();

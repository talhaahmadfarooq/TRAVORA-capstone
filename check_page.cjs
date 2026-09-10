const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.type(), msg.text()));
  page.on('pageerror', error => console.log('BROWSER ERROR:', error.message));
  page.on('requestfailed', request => {
    console.log('REQUEST FAILED:', request.url(), request.failure()?.errorText);
  });

  try {
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0', timeout: 30000 });
    console.log('Page loaded successfully.');
    // Check if #root is empty
    const rootHtml = await page.evaluate(() => document.getElementById('root')?.innerHTML || '');
    console.log('Root HTML length:', rootHtml.length);
    if (rootHtml.length < 50) {
      console.log('Root HTML is extremely small or empty. Rendering might have failed silently.');
      console.log('Root content:', rootHtml);
    }
  } catch (err) {
    console.error('Failed to load page:', err);
  } finally {
    await browser.close();
  }
})();

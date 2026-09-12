const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: "new"
  });
  const page = await browser.newPage();
  
  // Set viewport to a typical desktop size
  await page.setViewport({ width: 1440, height: 900 });

  // Navigate to the local dev server
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });

  // Wait a moment for the 3D scene to fully render and cinematic intro to start
  await new Promise(r => setTimeout(r, 5000));

  // Click the 3D canvas a bit to ensure it rendered
  await page.click('canvas');

  // Take a screenshot
  const screenshotPath = 'C:\\Users\\limit\\.gemini\\antigravity\\brain\\7d76daa1-5db3-47b4-bfa0-611bedf72649\\scratch\\earth_screenshot.png';
  await page.screenshot({ path: screenshotPath });

  console.log(`Screenshot saved to: ${screenshotPath}`);
  
  await browser.close();
})();

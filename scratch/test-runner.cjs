const puppeteer = require('puppeteer');

async function run() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  const consoleMessages = [];
  page.on('console', msg => consoleMessages.push(msg.type() + ': ' + msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err));

  console.log('Navigating to http://localhost:5173/ ...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2', timeout: 30000 });

  // Wait for CinematicLoader and Earth to load
  await new Promise(r => setTimeout(r, 4500));

  // Capture screenshot of hero state
  await page.screenshot({ path: 'scratch/screenshot-hero.png' });
  console.log('Saved scratch/screenshot-hero.png');

  // Check console messages
  console.log('Console messages:');
  consoleMessages.forEach(m => console.log('  ', m));

  // Find and click 'FIND MY NEXT JOURNEY' button
  const buttons = await page.$$('button');
  console.log('Found buttons:', buttons.length);
  for (const b of buttons) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text && text.includes('FIND MY NEXT JOURNEY')) {
      console.log('Clicking FIND MY NEXT JOURNEY button...');
      await b.click();
      break;
    }
  }

  // Wait for camera pullback
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: 'scratch/screenshot-journey.png' });
  console.log('Saved scratch/screenshot-journey.png');

  // Drag the canvas to test globe rotation and space parallax
  console.log('Testing mouse drag interaction on canvas...');
  await page.mouse.move(640, 400);
  await page.mouse.down();
  await page.mouse.move(800, 350, { steps: 10 });
  await page.mouse.up();
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'scratch/screenshot-drag.png' });
  console.log('Saved scratch/screenshot-drag.png');

  // Check 2D toggle button
  const toggleButtons = await page.$$('button');
  for (const b of toggleButtons) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text && text.trim() === '2D') {
      console.log('Clicking 2D button...');
      await b.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'scratch/screenshot-2d.png' });
  console.log('Saved scratch/screenshot-2d.png');

  // Toggle back to 3D
  for (const b of toggleButtons) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text && text.trim() === '3D') {
      console.log('Clicking 3D button...');
      await b.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'scratch/screenshot-back-3d.png' });
  console.log('Saved scratch/screenshot-back-3d.png');

  await browser.close();
  console.log('Verification completed successfully!');
}

run().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});

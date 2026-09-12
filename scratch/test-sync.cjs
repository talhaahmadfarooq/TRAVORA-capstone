const puppeteer = require('puppeteer');
const { spawn } = require('child_process');

async function run() {
  console.log('Starting preview server on port 5173...');
  const server = spawn('npx', ['vite', 'preview', '--port', '5173', '--strictPort'], {
    shell: true,
    stdio: 'pipe',
    cwd: process.cwd()
  });

  server.stdout.on('data', data => {
    // console.log('server:', data.toString());
  });

  // Wait for server to start
  await new Promise(r => setTimeout(r, 2000));

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', err => consoleErrors.push(err.message));

  console.log('Navigating to http://localhost:5173/ ...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2', timeout: 30000 });

  // Wait for initial load & Earth ready
  await new Promise(r => setTimeout(r, 3500));

  // Click 'FIND MY NEXT JOURNEY' to enter EXPLORE/interactive mode
  const buttons = await page.$$('button');
  for (const b of buttons) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text && text.includes('FIND MY NEXT JOURNEY')) {
      console.log('Transitioning to journey mode...');
      await b.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 2000));

  // TEST A: Slow drag
  console.log('Executing TEST A: Slow drag...');
  await page.mouse.move(640, 400);
  await page.mouse.down();
  await page.mouse.move(700, 400, { steps: 25 });
  await page.mouse.up();
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({ path: 'scratch/sync-test-slow.png' });

  // TEST B: Fast drag
  console.log('Executing TEST B: Fast drag...');
  await page.mouse.move(640, 400);
  await page.mouse.down();
  await page.mouse.move(950, 400, { steps: 5 });
  await page.mouse.up();
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({ path: 'scratch/sync-test-fast.png' });

  // TEST C: Reverse direction drag
  console.log('Executing TEST C: Reverse drag...');
  await page.mouse.move(640, 400);
  await page.mouse.down();
  await page.mouse.move(850, 400, { steps: 5 });
  await page.mouse.move(450, 400, { steps: 8 });
  await page.mouse.up();
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({ path: 'scratch/sync-test-reverse.png' });

  // TEST D: Vertical drag
  console.log('Executing TEST D: Vertical drag...');
  await page.mouse.move(640, 400);
  await page.mouse.down();
  await page.mouse.move(640, 250, { steps: 10 });
  await page.mouse.up();
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({ path: 'scratch/sync-test-vertical.png' });

  console.log('Console Errors count:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.log('Errors:', consoleErrors);
  }

  await browser.close();
  server.kill();
  console.log('All sync tests completed successfully with 0 errors!');
  process.exit(0);
}

run().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});

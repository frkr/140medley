const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const pti = require('puppeteer-to-istanbul');

const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname, req.url);
  console.log(`Serving: ${filePath}`);
  if (fs.existsSync(filePath) && fs.lstatSync(filePath).isFile()) {
    fs.createReadStream(filePath).pipe(res);
  } else {
    console.log(`File not found: ${filePath}`);
    res.writeHead(404);
    res.end();
  }
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log('Server already running');
  } else {
    throw err;
  }
}).listen(8000);

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();

  await Promise.all([
    page.coverage.startJSCoverage(),
  ]);

  let failed = false;

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.error('PAGE ERROR:', err.toString()));

  const testFiles = fs.readdirSync('tests').filter(file => file.endsWith('.html'));

  for (const file of testFiles) {
    console.log(`\nRUNNING TEST: ${file}`);
    await page.goto(`http://localhost:8000/tests/${file}`);
    try {
      await page.waitForFunction(
        () => document.querySelector('#qunit-testresult').innerText.includes('completed'),
        { timeout: 10000 }
      );
      const result = await page.$eval('#qunit-testresult', el => el.innerText);
      console.log(`RESULT: ${result}`);
      if (result.includes(' 0 failed')) {
        console.log(`PASSED: ${file}`);
      } else {
        console.error(`FAILED: ${file}`);
        const failedTests = await page.evaluate(() => {
            const failed = [];
            document.querySelectorAll('#qunit-tests > li.fail').forEach(li => {
                failed.push(li.innerText.replace(/\n/g, ' ').replace(/ +/g, ' '));
            });
            return failed;
        });
        if (failedTests.length > 0) {
            console.error(`FAILED TESTS in ${file}:`);
            failedTests.forEach(t => console.error(`- ${t}`));
        }
        failed = true;
      }
    } catch (e) {
      console.error(`TIMEOUT: ${file}`);
      failed = true;
    }
  }

  const jsCoverage = await page.coverage.stopJSCoverage();
  pti.write(jsCoverage, { includeHostname: false, storagePath: './.nyc_output' });

  await browser.close();
  server.close();

  if (failed) {
    process.exit(1);
  }
})();

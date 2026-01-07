const puppeteer = require('puppeteer');
const { readdirSync, readFileSync, writeFileSync } = require('fs');
const { resolve } = require('path');
const { fork } = require('child_process');

const testFiles = readdirSync(__dirname)
    .filter(file => file.endsWith('.html'))
    .map(file => ({
        name: file,
        url: `http://localhost:8080/tests/${file}`
    }));

(async () => {
    console.log('Starting http-server...');
    const server = fork(
        resolve(__dirname, '../node_modules/http-server/bin/http-server'),
        [resolve(__dirname, '..'), '-s'],
        { stdio: 'pipe' }
    );

    server.stdout.on('data', data => {});
    server.stderr.on('data', data => console.error(`server_stderr: ${data}`));

    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('http-server started.');

    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();

    await page.setRequestInterception(true);
    page.on('request', request => {
        if (request.url().endsWith('140medley.js')) {
            request.respond({
                status: 200,
                contentType: 'application/javascript',
                body: readFileSync(resolve(__dirname, '../instrumented/140medley.js'), 'utf8')
            });
        } else {
            request.continue();
        }
    });

    let failedTests = 0;
    let totalTests = 0;

    page.on('console', msg => {
        const text = msg.text();
        if (!text.includes('QUnit')) {
            console.log(`[Browser Console] ${text}`);
        }
    });

    page.on('pageerror', (err) => {
        console.error(`[Page Error] ${err.toString()}`);
        failedTests++;
    });

    page.on('response', (response) => {
        if (response.status() >= 400 && !response.url().endsWith('favicon.ico')) {
            console.error(`[HTTP ${response.status()}] Failed to load ${response.url()}`);
            failedTests++;
        }
    });

    for (const file of testFiles) {
        try {
            await page.goto(file.url, { waitUntil: 'networkidle0' });
            const results = await page.waitForFunction(() => {
                const qunitResult = document.getElementById('qunit-testresult');
                if (!qunitResult) {
                    return null;
                }

                const passed = qunitResult.querySelector('.passed');
                const failed = qunitResult.querySelector('.failed');

                if (!passed || !failed) {
                    return null;
                }

                return {
                    passed: parseInt(passed.innerText, 10),
                    failed: parseInt(failed.innerText, 10),
                    total: parseInt(passed.innerText, 10) + parseInt(failed.innerText, 10),
                };
            }, { timeout: 10000 });

            const testResults = await results.jsonValue();

            if (testResults.failed > 0) {
                console.error(`[FAIL] ${file.name}: ${testResults.failed} of ${testResults.total} tests failed.`);
            } else {
                console.log(`[PASS] ${file.name}: ${testResults.passed} of ${testResults.total} tests passed.`);
            }

            failedTests += testResults.failed;
            totalTests += testResults.total;
        } catch (e) {
            console.error(`Error loading ${file.name}:`, e.message);
            failedTests++;
        }
    }

    const coverage = await page.evaluate(() => window.__coverage__);
    if (coverage) {
        writeFileSync(resolve(__dirname, '../.nyc_output/out.json'), JSON.stringify(coverage));
    }

    await browser.close();
    console.log('Stopping http-server...');
    server.kill();
    console.log('http-server stopped.');

    if (failedTests > 0) {
        console.error(`\nTests failed: ${failedTests} failures out of ${totalTests} total tests.`);
        process.exit(1);
    } else {
        console.log(`\nAll tests passed: ${totalTests} assertions.`);
        process.exit(0);
    }
})();

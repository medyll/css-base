const fs = require('fs');
const path = require('path');
const { chromium } = require('C:/Users/Mydde/.copilot/skills/playwright-skill/node_modules/playwright');

const repoRoot = 'D:/boulot/dev/html/css-base';
const screenshotDir = path.join(repoRoot, 'bmad', 'artifacts', 'screenshots');
const reportPath = path.join(screenshotDir, 'demo-smoke-report.json');

const demos = [
  { slug: 'index', file: 'dist/demo/index.html' },
  { slug: 'netflix', file: 'dist/demo/netflix/index.html' },
  { slug: 'amazon', file: 'dist/demo/amazon/index.html' },
  { slug: 'whatsapp', file: 'dist/demo/whatsapp/index.html' },
  { slug: 'windows', file: 'dist/demo/windows/index.html' },
  { slug: 'macos', file: 'dist/demo/macos/index.html' },
  { slug: 'spotify', file: 'dist/demo/spotify/index.html' },
  { slug: 'slack', file: 'dist/demo/slack/index.html' },
  { slug: 'github', file: 'dist/demo/github/index.html' },
  { slug: 'dashboard', file: 'dist/demo/dashboard/index.html' },
  { slug: 'terminal', file: 'dist/demo/terminal/index.html' },
];

fs.mkdirSync(screenshotDir, { recursive: true });

function toFileUrl(relativePath) {
  const absolute = path.join(repoRoot, relativePath).replace(/\\/g, '/');
  return `file:///${absolute}`;
}

async function setTheme(page, theme) {
  await page.evaluate((nextTheme) => {
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem('theme', nextTheme);
  }, theme);
  await page.waitForTimeout(100);
}

async function inspectPage(page) {
  return page.evaluate(() => {
    const navLinks = Array.from(document.querySelectorAll('nav a[href]')).map((link) => link.getAttribute('href'));
    const rootStyle = getComputedStyle(document.documentElement);
    const bodyStyle = getComputedStyle(document.body);

    return {
      title: document.title,
      theme: document.documentElement.dataset.theme || null,
      navLinkCount: navLinks.length,
      navLinks,
      surfaceColor: rootStyle.getPropertyValue('--color-surface').trim() || bodyStyle.backgroundColor,
      textColor: rootStyle.getPropertyValue('--color-text').trim() || bodyStyle.color,
    };
  });
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const summary = [];

  for (const demo of demos) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 960 } });
    const consoleIssues = [];
    const requestIssues = [];
    const pageIssues = [];

    page.on('console', (message) => {
      if (message.type() === 'error') {
        consoleIssues.push(message.text());
      }
    });

    page.on('pageerror', (error) => {
      pageIssues.push(error.message);
    });

    page.on('requestfailed', (request) => {
      requestIssues.push(`${request.failure()?.errorText || 'REQUEST_FAILED'} ${request.url()}`);
    });

    const targetUrl = toFileUrl(demo.file);
    await page.goto(targetUrl, { waitUntil: 'load' });

    const beforeToggle = await inspectPage(page);
    const toggleButton = page.locator('button[onclick="toggleTheme()"]');
    const toggleExists = await toggleButton.count();

    if (toggleExists > 0) {
      await toggleButton.first().click();
      await page.waitForTimeout(100);
    }

    const afterToggle = await inspectPage(page);

    await setTheme(page, 'light');
    await page.screenshot({ path: path.join(screenshotDir, `${demo.slug}-light.png`), fullPage: true });

    await setTheme(page, 'dark');
    await page.screenshot({ path: path.join(screenshotDir, `${demo.slug}-dark.png`), fullPage: true });

    summary.push({
      slug: demo.slug,
      file: demo.file,
      title: beforeToggle.title,
      toggleExists: toggleExists > 0,
      themeBefore: beforeToggle.theme,
      themeAfter: afterToggle.theme,
      navLinkCount: beforeToggle.navLinkCount,
      consoleIssues,
      requestIssues,
      pageIssues,
    });

    await page.close();
  }

  fs.writeFileSync(reportPath, JSON.stringify(summary, null, 2));
  console.log(`Smoke report written to ${reportPath}`);

  const failures = summary.filter((item) => !item.toggleExists || item.pageIssues.length || item.requestIssues.length || item.consoleIssues.length);
  if (failures.length) {
    console.error(JSON.stringify(failures, null, 2));
    process.exitCode = 1;
  }

  await browser.close();
})();
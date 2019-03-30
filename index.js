const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  // Adjustments particular to this page to ensure we hit desktop breakpoint.
  page.setViewport({ width: 1000, height: 600, deviceScaleFactor: 1 });
  await page.goto(
    'https://s.weibo.com/weibo?q=%23%E6%89%87%E8%B4%9D%E5%9B%9B%E5%85%AD%E7%BA%A7%23&page=5',
    {
      waitUntil: 'networkidle2'
    }
  );

  async function itemShot(item, index) {
    await item.screenshot({ path: `${index}.png` });
  }

  async function screenshot(page) {
    const divs = await page.$$('.card-wrap');
    await Promise.all(
      divs.map(async (div, index) => {
        await itemShot(div, index);
      })
    );
  }

  await screenshot(page);

  browser.close();
})();

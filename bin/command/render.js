/**
 * render page for SEO
 */
const path = require("path");
const puppeteer = require("puppeteer");

const parseConfig = context => {
  const { cwd } = context;
  const configFile = path.join(cwd, "ynw.browser");
  const config = require(configFile);
  const { routes, common } = config;
  const defaultValue = { enable: true, handler: f => f };
  const handler = item => {
    // mixin default and common, item's priority is greater
    item = { ...defaultValue, ...common, ...item };
    item.dist = path.join(cwd, item.dist); // relative to absolute
    item.target = path.join(item.dist, item.name);
    return item;
  };
  return routes.map(handler).filter(it => it.enable);
};

const render = async (browser, context, config) => {
  const { createCleanPage, writeFile, exists, mkdir } = context;
  const { dist, url, target, handler } = config;

  // get Content from page
  const page = await createCleanPage({ browser });
  page.setViewport({ width: 1400, height: 900 });
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.waitFor(2000);
  const html = await page.evaluate(f => {
    const content = document.querySelector("html").outerHTML;
    return Promise.resolve(content);
  });

  // write Content
  if (!(await exists(dist))) {
    await mkdir(dist);
  }
  await writeFile(target, handler(html));
  console.log(`>>> render ${url} done`);
  await page.close();
};

const printLine = msg => {
  console.log(`---------------- ${msg} -----------------`);
};

module.exports = async context => {
  const configs = parseConfig(context);
  const browser = await puppeteer.launch({ headless: true });
  printLine("BEGIN");
  for (var i = 0; i < configs.length; i++) {
    const config = configs[i];
    await render(browser, context, config);
  }
  printLine("END");
  browser.close();
};

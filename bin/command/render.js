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
  return routes.map(item => {
    item = { ...common, ...item }; // mixin common setup , item's priority is greater than common
    item.dist = path.join(cwd, item.dist); // relative to absolute
    item.target = path.join(item.dist, item.name);
    return item;
  });
};

const render = async (browser, context, config) => {
  const { createCleanPage, writeFile } = context;
  const { dist, url, target } = config;
  const page = await createCleanPage({ browser });
  page.setViewport({ width: 1400, height: 900 });
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.waitFor(2000);
  const html = await page.evaluate(f => {
    const content = document.querySelector("html").outerHTML;
    return Promise.resolve(content);
  });
  await writeFile(target, html);
  console.log(`>>> render ${url} ok`);
  await page.close();
  return Promise.resolve();
};

module.exports = async context => {
  const configs = parseConfig(context);
  const browser = await puppeteer.launch({
    headless: true
  });
  const task = configs.map(config => render(browser, context, config));
  Promise.all(task, f => console.log("all done"));
  setTimeout(() => {
    browser.close();
  }, 10000);
};

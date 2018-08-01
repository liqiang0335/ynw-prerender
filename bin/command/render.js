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
  return new Promise(async resolve => {
    const { createCleanPage, writeFile, exists, mkdir } = context;
    const { url, target, handler, pipe } = config;

    // get Content from page
    const page = await createCleanPage({ browser });
    page.setViewport({ width: 1400, height: 900 });
    await page.goto(url, { waitUntil: "domcontentloaded" });
    await page.waitFor(2000);
    const html = await page.evaluate(f => {
      const content = document.querySelector("html").outerHTML;
      return Promise.resolve(content);
    });

    let contents = handler(html);
    if (typeof pipe === "function") {
      contents = pipe(contents);
    }
    await writeFile(target, contents);
    console.log(`>>> render ${url} done`);
    await page.close();
    resolve();
  });
};

const printLine = msg => {
  console.log(`---------------- ${msg} -----------------`);
};

const prrintDuration = startTime => {
  const duration = (Date.now() - startTime) / 1000;
  console.log(`------------------------`);
  console.log(`>>> [ END ] : ${duration}`);
};

module.exports = async context => {
  const { type } = context;
  const configs = parseConfig(context);
  const browser = await puppeteer.launch({ headless: true });
  const startTime = Date.now();
  printLine("BEGIN");

  if (type === "queue") {
    for (var i = 0; i < configs.length; i++) {
      const config = configs[i];
      await render(browser, context, config);
    }
    prrintDuration(startTime);
  } else {
    // multi threading
    const task = configs.map(config => render(browser, context, config));
    await Promise.all(task).then(() => prrintDuration(startTime));
  }

  browser.close();
};

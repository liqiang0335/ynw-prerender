const fs = require("fs");
const util = require("util");

/**
 * Get params from command line
 * "--dep" be equal to "dep=true"
 */
function getParams(arr) {
  const reg = /=|--/i;
  return arr.filter(it => reg.test(it)).reduce((acc, cur) => {
    cur = cur.replace(/--([^\s]+)/, "$1=true");
    const [key, value] = cur.split("=");
    acc[key] = value;
    return acc;
  }, {});
}

const exists = util.promisify(fs.exists);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const readdir = util.promisify(fs.readdir);
const mkdir = util.promisify(fs.mkdir);

/**
 * Open a page and block media assets
 * @param <Browser> browser
 * @param <Boolean> blockImage
 * @param <Regexp> block : block other
 */
const createCleanPage = ({ browser, blockImage = true, block }) =>
  new Promise(async resolve => {
    const page = await browser.newPage();
    if (blockImage) {
      await page.setRequestInterception(true);
      page.on("request", req => {
        const url = req.url();
        const reg = /png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg/;
        const fileBlocker = blockImage && reg.test(url);
        const otherBlocker = block && block.test(url);
        const prevent = fileBlocker || otherBlocker;
        prevent ? req.abort() : req.continue();
      });
    }
    resolve(page);
  });

module.exports = {
  getParams,
  exists,
  readFile,
  writeFile,
  readdir,
  mkdir,
  createCleanPage
};

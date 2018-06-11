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

module.exports = {
  getParams,
  exists,
  readFile,
  writeFile,
  readdir
};

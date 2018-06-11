#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const commands = getParams(process.argv);
const cwd = process.cwd();
const context = { cwd, ...commands };

(async function() {
  const folder = path.join(__dirname, "./command");
  const docs = await fns.readdir(folder).catch(err => console.log(err));
  const files = docs.map(doc => doc.replace(/\.[a-z]+$/, ""));
  Object.keys(commands).forEach(key => {
    if (files.indexOf(key) < 0) return;
    const command = require(`./command/${key}`);
    command(context);
  });
})();

/**
 * 获取命令行等号分隔的参数
 * --dep 等价于 dep=true
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

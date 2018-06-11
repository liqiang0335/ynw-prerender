/**
 * Add config file
 */
const path = require("path");
const folder = "./source";
const util = require("util");
const exists = util.promisify(fs.exists);
const readFile = util.promisify(fs.readFile);
const readdir = util.promisify(fs.readdir);
const writeFile = util.promisify(fs.writeFile);
const cwd = process.cwd();

const write = async name => {
  const source = path.join(__dirname, folder, name);
  const target = path.join(cwd, name);
  if (await exists(target)) {
    console.log(`>> ${name} exists`);
    return;
  }
  const content = await readFile(source, "utf-8");
  await writeFile(target, content, "utf-8");
  console.log(`>> write ${name} done`);
};

module.exports = async context => {
  const dir = path.join(__dirname, folder);
  const files = await readdir(dir, "utf-8");
  files.forEach(file => write(file));
};

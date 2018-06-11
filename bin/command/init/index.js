/**
 * Add config file
 */
const path = require("path");
const folder = "./source";

const write = async (context, name) => {
  const { cwd, exists, readdir, readFile, writeFile } = context;
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
  const { readdir } = context;
  const dir = path.join(__dirname, folder);
  const files = await readdir(dir, "utf-8");
  files.forEach(file => write(context, file));
};

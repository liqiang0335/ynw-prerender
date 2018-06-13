#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const fns = require("./fns");
const commands = fns.getParams(process.argv);
const cwd = process.cwd();
const context = { cwd, ...commands, ...fns };

/**
 * short key map
 */
const commandsMap = {
  i: "init",
  v: "version",
  h: "help",
  r: "render"
};

(async function() {
  const folder = path.join(__dirname, "./command");
  const docs = await fns.readdir(folder);
  // remove suffix for file
  const files = docs.map(doc => doc.replace(/\.[a-z]+$/, ""));
  Object.keys(commands).forEach(key => {
    key = commandsMap[key] || key;
    if (files.indexOf(key) < 0) return;
    const command = require(`./command/${key}`);
    command(context);
  });
})();

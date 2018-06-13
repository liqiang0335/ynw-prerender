const path = require("path");
module.exports = context => {
  const package = path.join(__dirname, "../../package.json");
  const config = require(package);
  console.log(`version: ${config.version}`);
};

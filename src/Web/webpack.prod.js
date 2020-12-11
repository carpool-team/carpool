const merge = require("webpack-merge");
const common = require("./webpack.common");
const DropConsoleWebpackPlugin = require("drop-console-webpack-plugin");

module.exports = merge(common, {
	mode: "production",
});

module.exports.plugins.push(new DropConsoleWebpackPlugin());

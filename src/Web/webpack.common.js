const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const devMode = process.env.NODE_ENV !== "production";
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
	entry: path.resolve(__dirname, "src/index"),

	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js",
		publicPath: '/',
	},

	resolve: {
		extensions: [".ts", ".tsx", ".js", ".scss", ".css", ".png"],
		alias: {
			scss_path: path.resolve(__dirname, "../Web/src/scss"),
			assets_path: path.resolve(__dirname, "../Web/src/assets")
		}
	},

	module: {
		rules: [
			// we use babel-loader to load our jsx and tsx files
			{
				test: /\.(ts|js)x?$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				},
			},

			// css-loader to bundle all the css files into one file and style-loader to add all the styles  inside the style tag of the document
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				loader: "url-loader",
				options: {
					name: "[path][name].[ext]",
				},
			},
			{
				test: /\.s[ac]ss$/i,

				use: [
					// Creates `style` nodes from JS strings
					devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
					// Translates CSS into CommonJS
					"css-loader",
					// Compiles Sass to CSS
					"sass-loader",
				],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html",
		}),
		new ForkTsCheckerWebpackPlugin(),
	],
};

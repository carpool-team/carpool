const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require('dotenv-webpack');

const devMode = process.env.NODE_ENV !== "production";

module.exports = {
	stats: 'errors-warnings',

	devServer: {
		historyApiFallback: true
	},

	entry: path.resolve(__dirname, "src/index.tsx"),

	output: {
		path: path.resolve(__dirname, "dist"),
		chunkFilename: '[name].bundle.js',
		filename: 'app.js',
		pathinfo: false,
		publicPath: "/"
	},

	resolve: {
		extensions: [".ts", ".tsx", ".js", ".scss", ".css", ".png"],
		alias: {
			scss_path: path.resolve(__dirname, "../Web/src/scss"),
			assets_path: path.resolve(__dirname, "../Web/src/assets"),
		},
	},

	module: {
		rules: [
			// we use babel-loader to load our ts and tsx files
			{
				test: /\.(t|j)sx?$/,
				exclude: /node_modules|__tests__|__mocks__/,
				use: [
					{
						loader: "ts-loader",
						options: {
							transpileOnly: true,
						},
					},
				],
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
					devMode ? "style-loader" : MiniCssExtractPlugin.loader,
					// Translates CSS into CommonJS
					"css-loader",
					// Compiles Sass to CSS
					"sass-loader",
				],
			},
		],
	},

	optimization: {
		splitChunks: {
			chunks: "all",
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all',
					priority: 20
				},
				common: {
					name: 'common',
					minChunks: 2,
					chunks: 'async',
					priority: 10,
					reuseExistingChunk: true,
					enforce: true
				}
			}
		},
		minimizer: [
			new TerserPlugin({
				sourceMap: devMode ? true : false,
				terserOptions: {
					compress: {
						drop_console: devMode ? false : true,
					},
				},
			}),
		],
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			favicon: "./src/assets/img/favicon.png"
		}),
		new ForkTsCheckerWebpackPlugin({
			async: false,
			typescript: {
				enabled: true,
				diagnosticOptions: {
					semantic: true,
					syntactic: true,
					declaration: true,
					global: true,
				},
				configFile: path.resolve(__dirname, "../Web/tsconfig.json"),
			},

		}),
		new MiniCssExtractPlugin({
			filename: 'bundle.css',
			chunkFilename: '[id].css'
		}),
		new Dotenv(),
	],
};

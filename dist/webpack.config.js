"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const webpack_node_externals_1 = __importDefault(require("webpack-node-externals"));
const fork_ts_checker_webpack_plugin_1 = __importDefault(require("fork-ts-checker-webpack-plugin"));
const clean_webpack_plugin_1 = require("clean-webpack-plugin");
dotenv_1.default.config();
const { NODE_ENV } = process.env;
const isDev = NODE_ENV === 'development';
const serverContext = path_1.default.resolve(__dirname, 'src');
const serverOutputPath = path_1.default.resolve(__dirname, 'bin');
const serverAppEntry = './server.ts';
module.exports = {
    mode: NODE_ENV,
    target: 'node',
    devtool: isDev ? 'source-maps' : undefined,
    watch: isDev,
    context: serverContext,
    entry: { app: serverAppEntry },
    output: { path: serverOutputPath },
    plugins: [
        new fork_ts_checker_webpack_plugin_1.default({
            typescript: {
                configFile: path_1.default.resolve(__dirname, 'tsconfig.json'),
            },
            eslint: {
                files: `${serverContext}/**`, // required - same as command `eslint ./src/**/*.{ts,tsx,js,jsx} --ext .ts,.tsx,.js,.jsx`
            },
        }),
        new clean_webpack_plugin_1.CleanWebpackPlugin(),
    ],
    resolve: { extensions: ['.mjs', '.tsx', '.ts', '.js'] },
    externals: (0, webpack_node_externals_1.default)(),
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: [/node_modules/, /tests/],
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                        },
                    },
                ],
            },
        ],
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    priority: -10,
                    test: /[\\/]node_modules[\\/]/,
                },
            },
            chunks: 'async',
            minChunks: 1,
            minSize: 30000,
            name: true,
        },
    },
};

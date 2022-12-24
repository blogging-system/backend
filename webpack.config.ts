const dotenv = require('dotenv');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

dotenv.config();

const { NODE_ENV } = process.env;
const isDev = NODE_ENV === 'development';

const serverContext = path.resolve(__dirname, 'src');
const serverOutputPath = path.resolve(__dirname, 'bin');
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
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: path.resolve(__dirname, 'tsconfig.json'),
      },
      eslint: {
        files: `${serverContext}/**`, // required - same as command `eslint ./src/**/*.{ts,tsx,js,jsx} --ext .ts,.tsx,.js,.jsx`
      },
    }),
    new CleanWebpackPlugin(),
  ],
  resolve: { extensions: ['.mjs', '.tsx', '.ts', '.js'] },
  externals: nodeExternals(),
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

const path = require('path');
const webpack = require('webpack');
let copyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const dotenv = require('dotenv');
const CompressionPlugin = require('compression-webpack-plugin');

dotenv.config();

const bundleOutputDir = './dist';

module.exports = env => {
  const isDevBuild = !(env && env.prod);

  return [
    {
      entry: './src/index.ts',
      output: {
        chunkFilename: '[name].js',
        filename: 'widget.js',
        path: path.resolve(bundleOutputDir),
      },
      devServer: {
        watchFiles: bundleOutputDir,
      },
      plugins: isDevBuild
        ? [
            new webpack.SourceMapDevToolPlugin(),
            new copyWebpackPlugin({ patterns: [{ from: 'dev/' }] }),
            new webpack.DefinePlugin({
              'process.env': JSON.stringify(process.env),
            }),
            new CompressionPlugin({
              algorithm: 'gzip',
              test: /\.(js|ts|tsx|jsx)$/,
            }),
          ]
        : env.analyze
        ? [
            new BundleAnalyzerPlugin(),
            new webpack.DefinePlugin({
              'process.env': JSON.stringify(process.env),
            }),
            new CompressionPlugin({
              algorithm: 'gzip',
              compressionOptions: {
                numiterations: 15,
              },
              test: /\.(js|ts|tsx|jsx)$/,
            }),
          ]
        : [
            new webpack.DefinePlugin({
              'process.env': JSON.stringify(process.env),
            }),
            new CompressionPlugin({
              algorithm: 'gzip',
              compressionOptions: {
                numiterations: 15,
              },
              test: /\.(js|ts|tsx|jsx)$/,
            }),
          ],
      optimization: {
        minimize: !isDevBuild,
        minimizer: [
          new CssMinimizerPlugin(),
          new TerserPlugin({
            terserOptions: {
              compress: true,
            },
            extractComments: false,
          }),
        ],
        splitChunks: {
          chunks: 'async',
          minSize: 20000,
          minChunks: 1,
          maxAsyncRequests: 30,
          maxInitialRequests: 30,
          enforceSizeThreshold: 50000,
          cacheGroups: {
            defaultVendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
              reuseExistingChunk: true,
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
            reactVendor: {
              test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom|preact)[\\/]/,
              name: 'vendor-react',
              priority: -10,
              reuseExistingChunk: true,
            },
            corejsVendor: {
              test: /[\\/]node_modules[\\/](core-js)[\\/]/,
              name: 'vendor-corejs',
              priority: -10,
              reuseExistingChunk: true,
            },
          },
        },
      },
      mode: isDevBuild ? 'development' : 'production',
      module: {
        rules: [
          // packs SVG's discovered in url() into bundle
          { test: /\.svg/, use: 'svg-url-loader' },
          {
            test: /\.(jpe?g|png|mp4|webm|gif)$/i,
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
          {
            test: /\.(jpe?g|png)$/i,
            loader: 'webp-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
          {
            test: /\.css$/i,
            use: [
              {
                loader: 'style-loader',
                options: { injectType: 'singletonStyleTag' },
              },
              {
                // allows import CSS as modules
                loader: 'css-loader',
                options: {
                  modules: {
                    // css class names format
                    localIdentName: '[name]-[local]-[hash:base64:5]',
                  },
                  sourceMap: isDevBuild,
                },
              },
            ],
          },
          // use babel-loader for TS and JS modeles,
          // starting v7 Babel babel-loader can transpile TS into JS,
          // so no need for ts-loader
          // note, that in dev we still use tsc for type checking
          {
            test: /\.(js|ts|tsx|jsx)$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  presets: [
                    [
                      '@babel/preset-env',
                      {
                        targets: {
                          browsers: ['IE 11, last 2 versions'],
                        },
                        // makes usage of @babel/polyfill because of IE11
                        // there is at least async functions and for..of
                        useBuiltIns: 'usage',
                      },
                    ],
                    [
                      // enable transpiling ts => js
                      '@babel/typescript',
                      // tell babel to compile JSX using into Preact
                      { jsxPragma: 'h' },
                    ],
                  ],
                  plugins: [
                    // syntax sugar found in React components
                    '@babel/proposal-class-properties',
                    '@babel/proposal-object-rest-spread',
                    // transpile JSX/TSX to JS
                    [
                      '@babel/plugin-transform-react-jsx',
                      {
                        // we use Preact, which has `Preact.h` instead of `React.createElement`
                        pragma: 'h',
                        pragmaFrag: 'Fragment',
                      },
                    ],
                  ],
                },
              },
              { loader: 'cache-loader' },
            ],
          },
        ],
      },
      resolve: {
        alias: {
          '@utils': path.resolve('./src/utils/index'),
        },
        extensions: ['*', '.js', '.ts', '.tsx'],
      },
    },
  ];
};

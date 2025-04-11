const path = require('path');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  mode: "development", // меняй на "production" для финальной сборки
  entry: "./js/script.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "js"),
  },
  watch: true,
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', {
              targets: {
                browsers: ['> 1%', 'not dead']
              },
              debug: true,
              corejs: 3,
              useBuiltIns: "usage"
            }]]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      `...`,
      new CssMinimizerPlugin()
    ],
  },
  plugins: [
    new Dotenv(),
    new MiniCssExtractPlugin({
      filename: "../css/style.css" // путь до css в финальной сборке
    })
  ]
};
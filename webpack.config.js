const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
    mode: "development",
    entry: "./js/script.js",
    output: {
      filename: "bundle.js",
      path: __dirname + "/js",
    },
    watch: true,
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
      }
    ]
  },
  plugins: [
    new Dotenv()
  ]
};
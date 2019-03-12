const path = require('path');

module.exports = {
  entry: path.resolve(__dirname + '/index.js'),
  output: {
    path: path.resolve(__dirname + '/build_server'),
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
};

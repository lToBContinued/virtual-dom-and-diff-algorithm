const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    publicPath: 'xvni',
  },
  devServer: {
    port: 8080,
    contentBase: 'www',
  },
}

var path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.scss?/, loader: 'style!css!sass!postcss!' },
      { test: /\.(svg|jpg|png|ttf|woff2?|eot)(\?.+)?$/, loader: 'file' }
    ]
  },
  postcss: function () {
    return [
      require('autoprefixer')
    ]
  }
}

const path = require('path')
const webpack = require('webpack')

module.exports = {
  target: 'electron-renderer',
  // devtool: 'source-map',
  entry: {
    bundle: ['./src/renderer.js']
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/'
  },
  plugins: [
    new webpack.ExternalsPlugin('commonjs', ['electron', 'fs']),
    new webpack.DefinePlugin({
      __REACT_DEVTOOLS_GLOBAL_HOOK__: '({ isDisabled: true })'
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.svg$/,
        use: 'raw-loader'
      }
    ]
  },
  externals: ['node_modules']
}

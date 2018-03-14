const path = require('path')
const webpack = require('webpack')

module.exports = {
  target: 'electron',
  devServer: {
    hot: true,
    hotOnly: false,
    inline: false
  },
  devtool: 'source-map',
  entry: {
    bundle: [
      'webpack-dev-server/client?http://localhost:3001',
      'webpack/hot/dev-server',
      './src/renderer.js'
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
    publicPath: 'http://localhost:3001'
  },
  plugins: [
    new webpack.ExternalsPlugin('commonjs', ['electron', 'fs']),
    new webpack.DefinePlugin({
      __REACT_DEVTOOLS_GLOBAL_HOOK__: '({ isDisabled: true })'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /.+\.js$/,
        use: 'babel-loader'
      }
    ]
  },
  externals: ['node_modules']
}

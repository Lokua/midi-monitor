const webpack = require(`webpack`)
const WebpackDevServer = require(`webpack-dev-server`)
const config = require(`./webpack.config`)

const [host, port] = [`0.0.0.0`, 3001]
const url = `http://${host}:${port}`

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  inline: true,
  historyApiFallback: true,
  quiet: true,
  proxy: {
    '*': url
  },
  stats: {
    colors: true
  }
}).listen(port, host, err => {
  if (err) throw err
  console.info(`devServer listening at ${url}`)
})

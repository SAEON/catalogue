const path = require('path')
const configurePlugins = require('./plugins.js')
const loadAliases = require('./load-aliases.js')
const configureDevServer = require('./dev-server')
const configureRules = require('./rules.js')
const fs = require('fs')
require('dotenv').config()

const ROOT = path.normalize(path.join(__dirname, '../'))
const { NODE_ENV: mode, DEPLOYMENT_ENV = 'local' } = process.env

const entries = Object.fromEntries(
  fs
    .readdirSync(path.join(ROOT, 'src/entry-points'))
    .filter(name => fs.lstatSync(path.join(ROOT, `src/entry-points/${name}`)).isDirectory())
    .map(name => [name, path.join(ROOT, `src/entry-points/${name}/index.jsx`)])
)

module.exports = () => {
  const output = 'dist'

  return {
    mode,
    devtool: mode === 'production' ? false : false,
    target: mode === 'production' ? ['web', 'es5'] : 'web',
    entry: entries,
    output: {
      filename: '[name].[contenthash].js',
      chunkFilename: '[name].[contenthash].js',
      path: path.join(ROOT, output),
      publicPath: '/',
      assetModuleFilename: 'assets/[hash][ext][query]'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      alias: loadAliases(ROOT, mode)
    },
    optimization: {
      minimize: ['local', 'development'].includes(DEPLOYMENT_ENV) ? false : true,
      splitChunks: { chunks: 'all' }
    },
    module: {
      rules: configureRules(mode)
    },
    plugins: configurePlugins(ROOT, output),
    devServer: configureDevServer(ROOT, output)
  }
}

const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const rimraf = require('rimraf')
const c = require('chalk')
const webpack = require('webpack')
const webpackConfig = require('../webpack.config.prod')
const electronPackager = require('electron-packager')
const pkg = require('../package.json')

const rmdir = promisify(rimraf)
const writeFile = promisify(fs.writeFile)
const copy = promisify(fs.copyFile)
const packager = promisify(electronPackager)

const paths = {
  src: path.join(__dirname, '../src'),
  build: path.join(__dirname, '../build'),
  releaseBuilds: path.join(__dirname, '../release-builds')
}

main()

async function main() {
  const start = Date.now()
  console.info(c.cyan('removing old builds'))
  await clean()

  console.info(c.cyan('running prod webpack'))
  await runWebpack()

  console.info(c.cyan('copying over needed sourcefiles'))
  await copyNeededSourceFiles()

  console.info(c.cyan('build electron app for osx'))
  await buildElectronOsx()

  console.info(c.green(`done in ${Date.now() - start}ms`))
}

function clean() {
  return Promise.all([rmdir(paths.build), rmdir(paths.releaseBuilds)])
}

async function copyNeededSourceFiles() {
  return Promise.all([
    copyPackageJson(),
    copy(path.join(paths.src, 'main.js'), path.join(paths.build, 'main.js')),
    copy(
      path.join(paths.src, 'index.html'),
      path.join(paths.build, 'index.html')
    )
  ])
}

function copyPackageJson() {
  const updated = Object.assign({}, pkg, {
    main: './main.js'
  })

  return writeFile(
    path.join(paths.build, 'package.json'),
    JSON.stringify(updated, null, 2),
    'utf-8'
  )
}

function runWebpack() {
  return new Promise((resolve, reject) => {
    webpack(webpackConfig, (err, stats) => {
      if (err || stats.hasErrors()) {
        reject(err)
      }

      resolve()
    })
  })
}

function buildElectronOsx() {
  return packager({
    dir: paths.build,
    prune: true,
    name: pkg.productName,
    arch: 'x64',
    appCategoryType: 'public.app-category.music',
    out: paths.releaseBuilds,
    icon: path.join(paths.src, 'resources/mac/midi-1024.png.icns'),
    quiet: true
  })
}

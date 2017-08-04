import {readFileSync} from 'fs'
import {join} from 'path'
import upperCamelCase from 'uppercamelcase'

const IS_PRODUCTION = process.argv.slice(2).includes('-p')

const PATHS = Object.freeze(Object.create(null, {
  DIST: {
    enumerable: true,
    value: join(__dirname, IS_PRODUCTION ? 'dist' : 'build')
  },
  SRC: {
    enumerable: true,
    value: join(__dirname, 'src')
  }
}))

const pkg = JSON.parse(readFileSync(join(__dirname, 'package.json')))

const LIBRARY_NAME = upperCamelCase(pkg.name.replace(/^@.*\//, ''))

const generalConfig = {
  entry: join(PATHS.SRC, 'index.js'),
  module: {
    rules: [
      {
        exclude: /node_modules/,
        loader: 'babel-loader',
        test: /\.js$/
      }
    ]
  },
  output: {
    filename: 'index.js',
    library: LIBRARY_NAME,
    libraryTarget: 'umd',
    path: PATHS.DIST,
    umdNamedDefine: true
  }
}

const developmentConfig = {
  devtool: 'cheap-module-inline-source-map',
  module: {
    rules: [
      {
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'eslint-loader',
        test: /\.jsx?$/
      },
      ...generalConfig.module.rules
    ]
  }
}

const productionConfig = {}

Object.defineProperty(process.env, 'BABEL_ENV', {
  enumerable: true,
  value: IS_PRODUCTION ? 'production' : 'development'
})

export default {
  ...generalConfig,
  ...IS_PRODUCTION ? productionConfig : developmentConfig
}

const path = require("path")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const argv = require('minimist')(process.argv.slice(2))
const DEBUG = !argv.release
const dist = "dist"

module.exports = {
  mode: 'development',
  entry: {
    main: [path.resolve(__dirname, 'src/js/index.tsx'), path.resolve(__dirname, 'src/css/sass/main.scss')]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, dist)
  },
  cache: DEBUG,
  devtool: DEBUG ? '#inline-source-map' : false,

  stats: {
    colors: true,
    reasons: DEBUG
  },

  devServer: {
    port: 9001,
    host: 'localhost',
    overlay: {
      errors: true
    },
    open: true,
    hot: true
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: [
          path.resolve(__dirname, './node_modules')
        ]
      },
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        exclude: [
          path.resolve(__dirname, './node_modules')
        ]
      },
      {
        test: /\.s[ac]ss$/,
        use: [{
          loader: MiniCssExtractPlugin.loader
        },
          'css-loader', 'sass-loader']
      }
    ]
  },
  optimization: {
    minimizer: DEBUG
      ? []
      : [
          new UglifyJsPlugin({
            cache: true,
            parallel: true,
            uglifyOptions: {
              compress: true,
              output: {
                comments: false
              },
              ecma: 6,
              mangle: true
            },
            extractComments: false,
            sourceMap: false
          })
        ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      inject: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(DEBUG ? 'development' : 'production'),
        isLocal: DEBUG
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ]
}
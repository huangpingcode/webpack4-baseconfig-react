const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const applyMockMiddleware = require("./applyMockMiddleware")
// console.log("process.env.NODE_ENV", process.env)

// setTimeout(() => {
//     process.exit(0)
// }, 5000);
// let fs = require("fs")
module.exports = function (env, argv) {
  let isDev = !env || !env.production || argv.mode === "development"
  let webpackBaseConfig = {
    // publicPath: '',
    devtool: isDev ? "" : "",
    entry: {
      app: './src/index'
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: './[name]-[hash:8].js',
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/, exclude: /node_modules/, use: ["babel-loader"]
        }, {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", 'postcss-loader']
        }, {
          test: /\.less$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader", 'postcss-loader']
        },
        {
          test: /\.(jpg|png)$/, use: ['url-loader?limit=8192&name=[hash:8].[ext]']
        },
        // { test: /\.(eot|svg|ttf|woff)$/, use: ['file-loader?name=lib/font/[hash:8].[ext]'] }
      ]
    },
    // optimization: {
    //     // minimizer: true,    // 压缩
    // },
    resolve: {
      extensions: ['.js', '.jsx', '.json'],        // 自动补全文件后缀
      alias: {
        "src": "./src"
      }
    },
    externals: {
      'jquery': 'window.jQuery',
      "react": 'window.React'
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new MiniCssExtractPlugin({
        filename: "[name].[chunkhash:8].css",
        chunkFilename: "[id].css"
      }),
      new HtmlWebpackPlugin({
        title: "webpack 4 基本测试",
        filename: 'index.html',
        template: './src/html/template.ejs',
        inject: 'body',
        // chunks: ['index', 'main'],
        // excludeChunks: ['devor.js'],
        // favicon: 'path/to/favicon.ico',
        minify: isDev ? null : { //压缩HTML文件
          removeComments: true, //移除HTML中的注释
          collapseWhitespace: true, //删除空白符与换行符
          minifyJS: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true
        }
      })
    ]
  }
  let webpackConfig = {}
  if ((env && env.production) || argv.mode === "production") {
    webpackConfig = Object.assign(webpackConfig, webpackBaseConfig, {

    })
  }
  else {
    webpackConfig = Object.assign(webpackConfig, webpackBaseConfig, {

      devServer: {
        host: '0.0.0.0',
        port: '3000',
        hot: true,
        // contentBase: "",
        before: function (app) {
          applyMockMiddleware(app)
        },
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      }
    })
  }

  return new Promise((resolve, reject) => {
    resolve(webpackConfig)
  })
} 
const path = require('path')
const applyMockMiddleware = require("./applyMockMiddleware")
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
// console.log("process.env.NODE_ENV", process.env)
function fds() {

}
let webpackConfig = {
    // mode: 'production', // development
    // publicPath: '',
    devtool: 'source-map',
    entry: {
        app: './src/index'
        // common: ["./src/common/util.js", "./src/common/constant.js", "./src/common/eventEmitter.js",
        //     "./src/server/chatSdk.js"
        // ]
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: './[name]-[hash:8].js',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }, {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", 'postcss-loader']
            }, {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader", 'postcss-loader']
            },
            {
                test: /\.(jpg|png)$/,
                use: ['url-loader?limit=8192&name=img/[hash:8].[ext]']
            }
            // }, {
            //     test: /\.(eot|svg|ttf|woff)$/,
            //     use: ['file-loader?name=lib/font/[hash:8].[ext]']
            // }
        ]
    },
    optimization: {
        // minimizer: true,    // 压缩
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json']        // 自动补全文件后缀
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new MiniCssExtractPlugin({
            filename: "[name].[chunkhash:8].css",
            chunkFilename: "[id].css"
        })
    ],
    devServer: {
        host: '0.0.0.0',
        port: '3000',
        hot: true,
        // contentBase: "",
        before: function (app) {
            applyMockMiddleware(app)
        }
    }
}
// setTimeout(() => {
//     process.exit(0)
// }, 5000);

module.exports = webpackConfig
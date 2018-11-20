const path = require("path")
var webpack = require("webpack")
const htmlwebpackplugin = require("html-webpack-plugin")
const extracttextwebpack = require("extract-text-webpack-plugin")
module.exports = {
  // 入口文件
  entry: {
    //   ["babel-polyfill",path.join(__dirname, './src/index.js') ],
    app: "./src/index",
    app2: "./src/index2"
  },
  // 出口文件
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
  },
  // 本地服務
  devServer: {
    contentBase: "src",
    inline: true
    // host:"0.0.0.0",
    // hot:"8080"
  },
  module: {
    //关于模块配置
    rules: [
      // js babel
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        }
      },
      // css样式loader
      {
        test: /\.css$/,
        use: extracttextwebpack.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                minimize: true
              }
            }
          ],
          publicPath: "../"
        })
      },

      // html内部可以使用img标签
      {
        test: /\.html$/,
        use: "html-withimg-loader"
      },
      //icon图标
      {
        test: /\.(woff|ttf|svg|eot|xttf|woff2)$/,
        use: "file-loader"
      },
      // css设置图片
      {
        test: /\.(jpg|png|jpeg|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]", //图片名字
              publicPath: "../dist/images/", //图片存放的路径
              outputPath: "images/" //将图片打包到dist文件下的image中
            }
          }
        ]
      }
    ]
  },
  plugins: [
    //插件
    // css
    new extracttextwebpack("./css/[name].css"),
    // html插件
    new htmlwebpackplugin({
      template: "./src/index.html",
      // filename:"index.html",重命名
      minify: {
        //去除多余的
        removeAttributeQuotes: true, //去除引号
        removeComments: true, //去除注释
        removeEmptyAttributes: true, //去除空属性
        collapseWhitespace: true //去除空格
      }
    })
  ]
};
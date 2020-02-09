const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
module.exports = {
  mode: "development", // 开发模式
  devtool: "source-map", // 开启调试
  resolve: {
    // // 别名
    // alias: {
    //   $: "./src/jquery.js"
    // },
    // 省略后缀
    extensions: [".js", ".json", ".css"]
  },
  devtool: 'cheap-module-eval-source-map',
  entry:{
    index:["@babel/polyfill", "./src/js/index.js"],
    list:["@babel/polyfill", "./src/js/list.js"],
    video:["@babel/polyfill", "./src/js/video.js"]
  } ,
  output: { filename: "js/[name].bundle.js", path: path.resolve(__dirname, "./dist"), 
           chunkFilename: "[name]-[hash:5].chunk.js", 
           publicPath:process.env.NODE_ENV === 'production'? './': '/' /* 打包和运行时根据运行环境切换路径*/
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"]
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          "css-loader",
          "postcss-loader"
        ]
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192, // 小于8k的图片自动转成base64格式，并且不会存在实体图片
              outputPath: "images/" // 图片打包后存放的目录
            }
          }
        ]
      },
      {
        test: /\.(htm|html)$/,
        use: "html-withimg-loader"
      },
      {
        test: /\.(eot|ttf|woff|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "font/" // 打包后存放的目录
            }
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: "src",
   // host: "192.168.124.11", // 默认是localhost
    open: true, // 自动打开浏览器
    port: 8000, // 本地服务器端口号
    hot: true, // 热重载
    overlay: true, // 如果代码出错，会在浏览器页面弹出“浮动层”。类似于 vue-cli 等脚手架
    proxy: {

      '/auth': {
          target: '',
          changeOrigin: true,
          pathRewrite: {
            '^/auth': '/'
          }
      },

      '/gms': {
          target: '',
          changeOrigin: true,
          pathRewrite: {
            '^/gms': '/'
          }
      },
  },
    historyApiFallback: {
      // HTML5 history模式
      //   rewrites: [{ from: /.*/, to: "/index.html" }]
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    // 打包前先清空
    new CleanWebpackPlugin("dist"),
    // 热替换，热替换不是刷新
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new UglifyJSPlugin(),
    new HtmlWebpackPlugin({
      // 用哪个html作为模板
      // 在src目录下创建一个index.html页面当做模板来用
      template: "./src/view/index.html",
      hash: true, // 会在打包好的bundle.js后面加上hash串
      filename: "./index.html",
      chunks: ["index"],
      minify:{//对html文件进行压缩
      removeAttributeQuotes:true, //去掉属性的双引号
      removeComments: true,//去掉注释
      collapseWhitespace: true,//去掉空白
    }
    }),
    new HtmlWebpackPlugin({
      // 用哪个html作为模板
      // 在src目录下创建一个index.html页面当做模板来用
      template: "./src/view/list.html",
      hash: true, // 会在打包好的bundle.js后面加上hash串
      filename: "./list.html",
      chunks: ["list"],
      minify:{//对html文件进行压缩
      removeAttributeQuotes:true, //去掉属性的双引号
      removeComments: true,//去掉注释
      collapseWhitespace: true,//去掉空白
    }
    }),
    new HtmlWebpackPlugin({
      // 用哪个html作为模板
      // 在src目录下创建一个index.html页面当做模板来用
      template: "./src/view/video.html",
      hash: true, // 会在打包好的bundle.js后面加上hash串
      filename: "./video.html",
      chunks: ["video"],
      minify:{//对html文件进行压缩
      removeAttributeQuotes:true, //去掉属性的双引号
      removeComments: true,//去掉注释
      collapseWhitespace: true,//去掉空白
    }
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[chunkhash:8].css",
      chunkFilename: "[id].css"
    })
  ]
  // 这款插件用于压缩 JS 代码，减少资源体积大小
};
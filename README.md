
1、创建
   mkdir webpack-4 && cd webpack-4 //创建项目文件并进入项目
   npm init -y //初始化文件
   npm install webpack webpack-cli --save-dev //安装webpack
   在项目下创建src/index.js文件
2、打包
执行 npm run dev 打包的是未压缩的代码，而 npm run build 是压缩后的代码。
修改 package.json 中 scripts 部分：

"scripts": {
"dev": "webpack --mode development", //生产模式：启用了 代码压缩、作用域提升（scope hoisting）、 tree-shaking，使代码最精简
"build": "webpack --mode production" // 开发模式：相较于更小体积的代码，提供的是打包速度上的优化
}
零配置打包后默认生成dist/main.js文件

webpack的诉求：
	* 
js的处理：转换 ES6 代码，解决浏览器兼容问题
	* 
css的处理：编译css，自动添加前缀，抽取css到独立文件
	* 
html的处理：复制并压缩html文件
	* 
dist的清理：打包前清理源目录文件
	* 
assets的处理：静态资源处理
	* 
server的启用：development 模式下启动服务器并实时刷新



config配置-----四个核心概念：
	* 
入口(entry)
	* 
输出(output)
	* 
loader
	* 
插件(plugins)




entry    配置入口资源
output   配置编译后的资源
module   资源处理
resolve  配置资源别名/扩展名等
plugins  插件，比loader更强大
loader     转换器
devServer  开发服务器
mode       模式（开发环境、生产环境）
---------------------
// 基于node的 遵循commonjs规范的
let path = require('path');//node的模块
module.exports = {
  entry:'./src/index.js', // 入口
  output:{
    filename:'build.js',
    // 这个路径必须是绝对路径
    path: path.resolve('./dist')
  }, // 出口
  devServer:{
    contentBase:'./dist', //配置开发服务运行时的文件根目录
    host:'localhost',//开发服务器监听的主机地址
    port:8080,//开发服务器监听的端口
    compress:true,// 服务器压缩
    open:true,// 自动打开浏览器
    // hot:true//热更新
  },// 开发服务器
  module:{}, // 模块配置
  plugins:[], // 插件的配置
  mode:'development', // 可以更改模式
  resolve:{}, // 配置解析
}

3、loader
解析图片、css、html等
css-loader style-loader html-withimg-loader(安装 npm install css-loader style-loader file-loader html-withimg-loader -s) :

module:{//关于模块配置
    rules:[
        // css样式loader
        {
            test:/\.css$/,
            use: ["style-loader","css-loader"]
        },
        // html内部可以使用img标签
        {
            test: /\.html$/,
            use:"html-withimg-loader"
        },
        / css设置图片
        {
            test:/\.(jpg|png|jpeg|svg)$/,
        use:[
                {
                 loader:"file-loader",
                 options:{
                    name:"[name].[ext]",//图片名字
                    publicPath:"../dist/images/",//图片存放的路径
                    outputPath:"images/"//将图片打包到dist文件下的image中
                 }
             }
            ]
        }
]
}

4、plugins
抽离html css
html css (npm install html-webpack-plugin extract-text-webpack-plugin@next -s)

plugins:[//插件
// css
new extracttextwebpack("./css/[name].css"),
// html插件
new htmlwebpackplugin({
template:"./src/index.html",
// filename:"index.html",重命名
minify:{//去除多余的
removeAttributeQuotes:true,//去除引号
removeComments:true,//去除注释
removeEmptyAttributes:true,//去除空属性
collapseWhitespace:true//去除空格
}
})
]


4、bable转换 ES6 代码，解决浏览器兼容问题用 babel 转换 ES6 代码
   4.1：安装babel依赖  npm install -D babel-loader @babel/core @babel/preset-env 
   -----使用 babel-polyfill 解决兼容性问题 : npm install -D @babel/plugin-transform-runtime  @babel/polyfill
   4.2: 在根目录新建一个babel配置文件 .babelrc：


                 {
                 "presets": [
                         '@babel/preset-env'
                   ],
                   "plugins": [
                          '@babel/plugin-transform-runtime'
                        ]
                 }
在config文件中
module.exports = { entry: ["@babel/polyfill", "./app/js"], };

4.3:将配置用于webpack打包中，在根目录下新建webpack.config.js配置文件
  module.exports = {
                module: {
                  rules: [
                   {
                    test: /\.js$/,
                    exclude: /node_modules/,
                     use: {
                   loader: "babel-loader"
                     }
                    }
                  ]
                 }
      }
    4.4：在package.json中配置
             "scripts": {
                    "dev": "webpack --mode development ",
                    "build": "webpack --mode production "
                   }










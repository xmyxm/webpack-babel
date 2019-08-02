// webpackruntime.js
// 执行命令 webpack --config ./webpackdemo/webpackruntime.config.js

const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');//webpack插件，用于清除目录文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');

const DEV_MODE = "development"

module.exports = {
    mode: "development",
    entry: {
        index: ['./src/page/index.js'],
        list: ['./src/page/list.js'],
        detail: ['./src/page/detail.js']
    },
    output: {
        path: path.join(__dirname, './', 'dist/'),
        filename: 'js/[name].js'
    },
    mode: DEV_MODE, //'production',
    cache: true,
    devtool: 'source-map',
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        },
        runtimeChunk: {
			// manifest文件用来引导所有模块的交互。manifest文件包含了加载和处理模块的逻辑。
			// 当webpack编译器处理和映射应用代码时，它把模块的详细的信息都记录到了manifest文件中。当模块被打包并运输到浏览器上时，
			name: 'manifest'
		}
    },
    module: {
        rules: [{
            test: /\.(es6|jsx|js)$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                //先执行完所有Plugin，再执行Preset。多个Plugin，按照声明次序顺序执行。多个Preset，按照声明次序逆序执行。
                // presets: [],
                // plugins: []
            }
        }]
    },
    plugins: [
        new webpack.BannerPlugin('点评平台研发中心'),
        new CleanWebpackPlugin({cleanOnceBeforeBuildPatterns: ['dist']}),//每次打包清理上次的打包文件
		// css文件抽离设置
		new MiniCssExtractPlugin({
			filename: 'css/[name].css'
        }),
        new DashboardPlugin(),
		new HtmlWebpackPlugin({
			template:'./src/html/index.html'
			,filename:'index.html'//可以使用hash命名
			,title:'index'
			,inject:'body'//脚本包含到body 也可以写到head里面
			,chunks:['manifest', 'common', 'index']//指定当前模板需要打入哪些js模块
			,minify:{//启用代码代码压缩
				removeComments: false,//移除注释
				collapseWhitespace: false//移除空格
			}
        }),
        new HtmlWebpackPlugin({
			template:'./src/html/list.html'
			,filename:'list.html'//可以使用hash命名
			,title:'list'
			,inject:'body'//脚本包含到body 也可以写到head里面
			,chunks:['manifest', 'common', 'list']//指定当前模板需要打入哪些js模块
			,minify:{//启用代码代码压缩
				removeComments: false,//移除注释
				collapseWhitespace: false//移除空格
			}
        }),
        new HtmlWebpackPlugin({
			template:'./src/html/detail.html'
			,filename:'detail.html'//可以使用hash命名
			,title:'detail'
			,inject:'body'//脚本包含到body 也可以写到head里面
			,chunks:['manifest', 'common', 'detail']//指定当前模板需要打入哪些js模块
			,minify:{//启用代码代码压缩
				removeComments: false,//移除注释
				collapseWhitespace: false//移除空格
			}
		}),
		// 允许你创建一个在编译时可以配置的全局常量，只能在被打包的文件中读取到这个全局变量
		new webpack.DefinePlugin({
			'env': DEV_MODE
		})
    ]
}

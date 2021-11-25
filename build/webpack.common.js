const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = {
    entry: [
        // 'webpack-hot-middleware/client?path=/__webpack_hmr&reload=true&timeout=20000',
        './src/index.js',
    ],
    context: path.resolve(__dirname, '../'),
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, "../dist"),
        clean: true,
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.scss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.less$/i,
                use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, {
                    loader: 'less-loader', // compiles Less to CSS
                    options: {
                        modifyVars: {
                            // 'primary-color': '#1DA57A',
                            // 'link-color': '#1DA57A',
                            // 'border-radius-base': '2px',
                        },
                        javascriptEnabled: true,
                    },
                }
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/, //不包含node_modules目录下的js文件
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.(png|jpg|gif)$/,
               // exclude: path.resolve(__dirname, 'src/assets/sprite'),
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024
                        }
                    }
                ]
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                  {
                    loader: 'babel-loader',
                  },
                  {
                    loader: '@svgr/webpack',
                    options: {
                      babel: false,
                      icon: true,
                    },
                  },
                ],
              }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'test',
            template: 'index.html'
        }),
    ],
}
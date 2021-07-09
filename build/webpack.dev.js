const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack')
module.exports = merge(common, {
    // devtool: 'inline-source-map',
    mode:'development',
    devServer: {
        contentBase: './',
        hot: true,
        open: false,
        historyApiFallback: true ,
        port: 9000
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': require('../config/dev.env.js')
          }),
    ]
})
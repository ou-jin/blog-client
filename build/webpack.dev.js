const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const path = require('path');
module.exports = merge(common, {
    // devtool: 'inline-source-map',
    mode:'development',
    devServer: {
        contentBase: path.resolve(__dirname, "../src"),
        publicPath: "/",
        // contentBase: './',
        hot: true,
        open: false,
        historyApiFallback: true ,
        port: 9000,
        host: "0.0.0.0",
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': require('../config/dev.env.js')
          }),
    ]
})
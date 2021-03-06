const { merge } = require('webpack-merge');
const webpack = require("webpack");
const common = require('./webpack.common.js');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = merge(common, {
    mode:'production',
    optimization: {
        moduleIds: 'deterministic',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
        usedExports: true,
        runtimeChunk: 'single',
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env': require('../config/prod.env')
          }),
    ],
})
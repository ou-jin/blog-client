const CleanWebpackPlugin = require('clean-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = merge(common, {
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
        new CleanWebpackPlugin(['dist']),
    ],
})
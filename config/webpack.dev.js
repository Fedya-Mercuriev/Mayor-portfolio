const webpack = require('webpack');
const merge = require('webpack-merge');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');

const common = require('./webpack.common');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-cheap-module-source-map',
    watch: true
});
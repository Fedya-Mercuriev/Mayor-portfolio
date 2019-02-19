const webpack = require("webpack");
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: "./src/main.js",
    output: {
        filename: "../dist/build.js"
    },
    resolve: {
        modules: [
            'node_modules',
            path.resolve(__dirname, 'src/svg')
        ],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            Root: path.resolve(__dirname, './../src/'),
            Components: path.resolve(__dirname, './../src/components/')
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    transformAssetUrls: {
                        video: ['src', 'poster'],
                        source: 'src',
                        img: 'src',
                        image: 'xlink:href'
                    }
                }
            },
            {
                test: /\.pug$/,
                oneOf: [
                    // this applies to `<template lang="pug">` in Vue components
                    {
                        resourceQuery: /^\?vue/,
                        use: ['pug-plain-loader']
                    },
                    // this applies to pug imports inside JavaScript
                    {
                        use: ['raw-loader', 'pug-plain-loader']
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loader: 'css-loader',
                options: {
                    url: true,
                }
            },
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            data:
                            `
                            @import 'src/scss/scss-assets/_variables.scss';
                            @import 'src/scss/scss-assets/_mixins.scss';
                            @import 'src/scss/scss-assets/_functions.scss';
                            @import 'src/scss/scss-assets/_config.scss';
                            `
                        }
                    }

                ]
            },
            {
                test: /\.svg$/,
                use: [{
                    loader: 'vue-svg-loader'
                }]
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
};
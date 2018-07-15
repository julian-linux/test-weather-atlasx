require("babel-polyfill");
const webpack = require('webpack');
// const merge = require('lodash/object/merge');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


const ROOT_PATH = path.resolve(__dirname);
const SRC_DIR = path.resolve(__dirname, 'src');
const ASSETS_DIR = path.resolve(SRC_DIR, 'assets');

const PROD_PATH = path.resolve(ROOT_PATH, 'dist');

const {
    baseConfig,
    baseEntry,
    basePlugins,
    baseLoaders
} = require('./webpack.base.js');


// We need to clean the build directoy
// basePlugins.unshift(new CleanWebpackPlugin(PROD_PATH));

const plugins = basePlugins.concat([
    new HtmlWebpackPlugin(
        {
            filename: 'index.html',
            template: path.resolve(ASSETS_DIR, 'main.html'),
        }
    ),
    new webpack.DefinePlugin({
        '__ENVIRONMENT__': '"PROD"',
        '__DEBUG_MODE__': false,
        '__SHOW_API_ERRORS__': false
    }),
    new ExtractTextPlugin('styles.css'),
    // new webpack.optimize.UglifyJsPlugin({minimize: true})
]);

const config = merge(baseConfig, {
    entry: {
        index: [
            'babel-polyfill',
            path.join(ROOT_PATH, 'src/index.jsx')
        ],
        ...baseEntry
    },
    output: {
        path: PROD_PATH, // This is where images AND js will go
        publicPath: '/', // This is used to generate URLs to e.g. images
        filename: 'app.[name].js'
    },
    plugins,
    module: {
        rules: [
            ...baseLoaders,
            {
                test: /\.?css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.(js|jsx)$/,
                loaders: ['babel-loader'],
                exclude: [ /node_modules/ ]
            }
        ]
    },
    devtool: 'source-map',
    mode: 'production',
});

module.exports = config;

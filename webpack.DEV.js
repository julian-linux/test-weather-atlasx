require("babel-polyfill");

const webpack = require('webpack');
const path = require('path');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const HappyPack = require('happypack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const {
    baseConfig,
    baseEntry,
    basePlugins,
    baseLoaders,
} = require('./webpack.base.js');

const ROOT_PATH = path.resolve(__dirname);
const SRC_DIR = path.resolve(__dirname, 'src');
const ASSETS_DIR = path.resolve(SRC_DIR, 'assets');

const plugins = [
    ...basePlugins,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HardSourceWebpackPlugin(),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(ASSETS_DIR, 'main.html'),
    }),
    new MiniCssExtractPlugin({
        filename: 'style.[hash].css',
    }),
    new webpack.DefinePlugin({
        __ENVIRONMENT__: '"LOCAL"',
        __DEBUG_MODE__: true,
        __SHOW_API_ERRORS__: true,
    }),
    new HappyPack({
        id: 'babel',
        loaders: ['babel-loader?cacheDirectory=true'],
        threads: 4,
    }),
    new HappyPack({
        id: 'eslint',
        loaders: ['eslint-loader'],
        threads: 4,
    }),
];

const rules = [
    ...baseLoaders,
    // {
    //     test: /\.css$/,
    //     use: [
    //         {
    //             loader: 'css-loader', // translates CSS into CommonJS
    //         },
    //     ],
    //     exclude: [/node_modules/],
    //     include: [
    //         path.resolve(ROOT_PATH, 'node_modules/bootstrap/dist/css'),
    //         // /node_modules\/bootstrap\/dist/, /src/
    //     ],
    // },
    {
        test: /\.?s*css$/,
        use: [
            {
                loader: 'style-loader', // creates style nodes from JS strings
            },
            {
                loader: 'css-loader', // translates CSS into CommonJS
            },
            {
                loader: 'sass-loader', // compiles Sass to CSS
            },
        ],
        // exclude: [/node_modules/],
        // include: [
        //     path.resolve(SRC_DIR),
        // ],
    },
    {
        test: /\.(js|jsx)$/,
        use: [
            'happypack/loader?id=babel',
            'happypack/loader?id=eslint'
        ],
        exclude: [/node_modules/]
    },
]

const config = {
    ...baseConfig,
    plugins,
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
        index: [
            'babel-polyfill',
            'react-hot-loader/patch',
            path.join(ROOT_PATH, 'src/index.jsx'),
        ],
        ...baseEntry,
    },
    module: {
        rules,
    },
    devServer: {
        contentBase: path.resolve(ROOT_PATH, 'public'),
        historyApiFallback: true,
        host: '0.0.0.0',
        hot: true,
        compress: false,
        inline: true,
        progress: true,
        port: 9000,
    },
};

module.exports = config;

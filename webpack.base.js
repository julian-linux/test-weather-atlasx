const webpack = require('webpack');
const path = require('path');
const ROOT_PATH = path.resolve(__dirname);
const SRC_PATH = path.join(ROOT_PATH, 'src');

const basePlugins = [
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
    })
];

const baseLoaders = [
    { // inline base64 URLs for <=8k images, direct URLs for the rest
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader?limit=8192',
    },
    {
        test: /\.(otf|ttf|eot)/,
        loader: 'file-loader?name=fonts/[name].[ext]',
    },
    {
        test: /\.(svg)((#[a-z0-9]+)|(\?v=[0-9]\.[0-9]\.[0-9]))$/,
        loader: 'file-loader?name=fonts/[name].[ext]',
    },
    // {
    //     test: /\.json$/,
    //     loader: 'json-loader'
    // },
    { // font-awesome-webpack loaders
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
    },
];

const baseEntry = {
    vendor: [
        'jquery',
        'lodash',
        'bootstrap',
        'reactstrap',
        'superagent',
        'prop-types',
        'react',
        'react-dom',
        'redux',
        'redux-thunk',
    ]
}

const baseConfig = {
    output: {
        path: path.join(ROOT_PATH, 'public'), // This is where images AND js will go
        publicPath: '/', // This is used to generate URLs to e.g. images
        filename: 'app.[name].[hash].js',
    },

    resolve: {
        extensions: ['.js', '.jsx', 'scss'],
        modules: ['node_modules', 'src'],
        alias: {
            jquery: 'jquery/src/jquery',
            assets: path.join(SRC_PATH, 'assets'),
            pages: path.join(SRC_PATH, 'pages'),
            components: path.join(SRC_PATH, 'components'),
            commons: path.join(path.join(SRC_PATH, 'components'), 'commons'),
            actions: path.join(SRC_PATH, 'actions'),
            reducers: path.join(SRC_PATH, 'reducers'),
            constants: path.join(SRC_PATH, 'constants'),
        },
    },
};

module.exports = {
    baseConfig,
    baseEntry,
    basePlugins,
    baseLoaders,
};

/**
 * This is to generate the umd bundle only
 */
const webpack = require('webpack');
const path = require('path');
const production = process.env.NODE_ENV === 'production';

let entry = {
    'index': './src/index.ts',
};
if (production) {
    entry = Object.assign({}, entry, {'index.min': './src/index.ts'});
}

module.exports = {
    entry,
    output: {
        path: path.resolve(__dirname, '_bundles'),
        filename: '[name].js',
        libraryTarget: 'umd',
        library: 'ZeroEx',
        umdNamedDefine: true,
    },
    resolve: {
        extensions: ['.ts', '.js', '.json'],
    },
    devtool: 'source-map',
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            sourceMap: true,
            include: /\.min\.js$/,
        }),
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                        query: {
                            declaration: false,
                        },
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.json$/,
                loader: 'json-loader',
            },
        ],
    },
};

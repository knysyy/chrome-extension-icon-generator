var webpack = require('webpack')

module.exports = {
    mode: 'development',
    target: 'node',
    entry: ['@babel/polyfill', './src/index.js'],
    output: {
        path: `${__dirname}/dist`,
        filename: 'index.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                ],
            },
        ],
    },
    plugins: [
        new webpack.BannerPlugin({
            banner: '#!/usr/bin/env node',
            raw: true,
        }),
    ],
}

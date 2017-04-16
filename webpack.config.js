const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        'vendor': './src/app/vendor.ts',
        'polyfills': './src/app/polyfills.ts',
        'app': './src/app/app.ts'
    },

    output: {
        path: path.resolve('./src/build'),
        filename: '[name].bundle.js',
        chunkFilename: '[id].chunk.js',
        sourceMapFilename: '[name].map'
    },
    resolve: {
        extensions: ['.ts', '.js'],
        modules: [
            path.resolve('./src'),
            'node_modules'
        ]
    },
    module: {
        rules: [{
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader', 'angular2-template-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader'
                }]
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor']
        })
    ]

}
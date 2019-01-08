const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = { 
    entry: [
        './src/index.js',
        './src/main.css'
    ],
    mode: 'development',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },
    devServer: {
        port: 3000,
        open: false
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './src/index.html'
        })
    ],
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,

        },
        {
            test: /\.css$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: '[name].css'
                    }
                }
            ]
        }
        ]
    }
}
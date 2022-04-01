const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const outPath = path.resolve(__dirname, 'dist')
const componentPath = path.resolve(__dirname, '../../components')

module.exports = {
    entry: __dirname + '/src/main.tsx',
    output: {
        filename: 'main.js',
        path: outPath,
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js' ],
        alias: {
            components: componentPath
        }
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}
                    }
                ]
            },
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { modules: true }
                    },
                ]
            },
            {
                test: /\.scss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { modules: true }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.tsx?$/i,
                use: 'ts-loader',
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.css',
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: __dirname + '/assets',
                    to: '.',
                },
                {
                    from: __dirname + '/src/index.html',
                    to: 'index.html',
                },
            ],
        }),
    ],
    devServer: {
        static: outPath,
        port: 8000,
        historyApiFallback: true
    },
};
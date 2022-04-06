import path from 'path'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'

import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const outPath = path.resolve(__dirname, 'dist')
const componentPath = path.resolve(__dirname, '../../components')

export default {
    entry: __dirname + '/src/main.tsx',
    output: {
        filename: 'main.js',
        path: outPath,
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
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
                        options: {
                            modules: {
                                localIdentName: '[name]_[local]_[hash]',
                                localIdentHashDigestLength: 10
                            }
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.tsx?$/i,
                use: 'ts-loader',
            },
            {
                test: /\.mdx?$/i,
                use: [
                    {
                        loader: '@mdx-js/loader',
                        /** @type {import('@mdx-js/loader').Options} */
                        options: {}
                    }
                ]
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
}

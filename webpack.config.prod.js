//webpack cant find index.js so creating an entry point
const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode:'development',
    entry:'./src/index.js',
    output: {
        path: path.resolve(__dirname,'dist'), //file where output needs to be stored
        filename:'bundle.js', //
        publicPath: '' //empty string
    },
    devtool: 'none',
    module:{
        rules:[
            {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        },
        {
            test: /\.css$/,
            exclude: /node_modules/,
            use: [
                    {loader: 'style-loader'},
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: {
                                localIdentName: '[name]__[local]__[hash:base64:5]'
                            }
                        }
                },
                {loader:'postcss-loader', options: {
                    ident:'postcss',
                    plugins: () => [autoprefixer()]
                }
            }
            ]
        },
        {
            test: /\.(png|jpe?g|gif)$/, loader:'url-loader?limit=8000&name=images/[name].[ext]'
        }
    ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: __dirname + 'src/index.html',
            inject: 'body'
        })
    ]

}
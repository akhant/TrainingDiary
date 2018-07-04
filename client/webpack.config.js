
require("react-hot-loader/patch");
const path = require('path') ;
const webpack = require('webpack')  ;
const HtmlWebpackPlugin = require('html-webpack-plugin') ;
const outputPath = path.resolve(__dirname, './dist');
const autoprefixer = require("autoprefixer");

module.exports = {
    entry: {
        app: ["whatwg-fetch",
            "react-hot-loader/patch",
            path.resolve(__dirname, './src/index.js')
        ]
    },
    output: {
        path: outputPath,
        filename: '[name].js'
    },

module: {
    rules: [
        
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: 'babel-loader'
        },
        {
            test: /\.css$/,
            exclude: /node_modules\/(?!(?:react-datepicker\/dist\/react-datepicker.css))/,
            
            use: [
                'style-loader', 
                'css-loader'
            ]
        },
        {
            test: /\.s(a|c)ss$/,
            exclude: /node_modules/,
            use: [
                'style-loader', 
                'css-loader',
                {loader: 'postcss-loader',
                    options: {
                        plugins: [
                            autoprefixer({
                                browsers:['ie >= 8', 'last 4 version']
                            })
                        ],
                        sourceMap: true
                    }
                },
                'sass-loader'
            ]
        },
        
        {
            test: /\.(gif|woff(2)?|eot|ttf|png|jpg|jpeg|svg)$/,
            exclude: /node_modules/,
            include: path.resolve(__dirname, './src/assets/'),
            use: 'url-loader?limit=10000'
        }
        ]
    },    
    resolve: {
        alias: {
            'components': path.resolve(__dirname, './src/components'),
            'containers': path.resolve(__dirname, './src/containers'),
            'reducers': path.resolve(__dirname, './src/reducers'),
            'AC': path.resolve(__dirname, './src/AC'),
            'util': path.resolve(__dirname, './src/util'),
            'store': path.resolve(__dirname, './src/store'),
            'middlewares': path.resolve(__dirname, './src/middlewares'),
            'constants': path.resolve(__dirname, './src/constants.js'),
        }
    },  
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './src/assets/index.html'),
            filename: 'index.html',
            path: outputPath
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        port: 8000,
        historyApiFallback: true,
        inline: true,
        hot: true,
        host: '127.0.0.1'
    }
}
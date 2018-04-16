const debug = process.env.NODE_ENV !== 'production'
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
    context: path.join(__dirname, 'src'),
    devtool: debug ? 'eval-source-map' : false,
    entry: './js/app.js',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['react', 'stage-1', ['env', { 'modules': false, 'targets': { 'browsers': ['last 2 versions', 'safari >= 7', '> 5%'] }, 'debug': false }]],
                            plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy', 'lodash']
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                'sourceMap': true,
                                'importLoaders': 1
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => [
                                    autoprefixer
                                ]
                            }
                        },
                        'sass-loader'
                    ]
                })
            },
            {
                test: /\.css$/,
                loader: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]'
                }
            }
        ]
    },
    output: {
        path: path.join(__dirname, 'public/dist/build'),
        filename: 'app.js'
    },
    // devServer: {
    //     contentBase: path.join(__dirname, 'public/dist'),
    //     compress: true,
    //     port: 3000,
    //     inline: true,
    //     hot: true,
    //     historyApiFallback: true,
    //     overlay: {
    //         warnings: true,
    //         errors: true
    //     }
    // },
    resolve: {
        extensions: ['.js', '.json', '.css', '.scss', '.html'],
        alias: {
            sass: path.resolve(__dirname, './src/sass')
            // helpers: path.resolve(__dirname, './src/js/middleware')
        }
    },
    plugins: debug ? [
        // new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin({
            filename: 'styles.css',
            // disable: debug
        }),
        new LodashModuleReplacementPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ] : [
        new CleanWebpackPlugin(['public/dist/build'], { verbose: true }),
        // new ExtractTextPlugin('bundle.min.css', { allChunks: true }),
        new ExtractTextPlugin({
            filename: 'styles.css',
            // disable: debug
        }),
        new LodashModuleReplacementPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false,
                beautify: false
            }
        })
    ]
}

const debug = process.env.NODE_ENV !== 'production'
// const webpack = require('webpack')
const path = require('path')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

module.exports = {
    context: path.join(__dirname, 'src'),
    devtool: debug ? 'inline-source-map' : false,
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
                            plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
                        }
                    }
                ]
            }
            // {
            //     test: /\.scss$/,
            //     use: ExtractTextPlugin.extract({
            //         fallback: 'style-loader',
            //         use: [
            //             {
            //                 loader: 'css-loader',
            //                 options: {
            //                     minimize: true,
            //                     sourceMap: true
            //                 }
            //             },
            //             {
            //                 loader: 'sass-loader',
            //                 options: {
            //                     sourceMap: true
            //                 }
            //             }
            //         ]
            //     })
            // }
        ]
    },
    output: {
        path: path.join(__dirname, 'public/dist'),
        filename: 'app.min.js'
    },
    // devServer: {
    //     contentBase: path.join(__dirname, 'dist'),
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
    // resolve: {
    //     alias: {
    //         sass: path.resolve(__dirname, './src/sass'),
    //         helpers: path.resolve(__dirname, './src/js/middleware')
    //     }
    // },
    plugins: debug ? [
        // new ExtractTextPlugin('bundle.min.css', { allChunks: true }),

        // new LodashModuleReplacementPlugin(),
        // new webpack.HotModuleReplacementPlugin()
    ] : [
        // new ExtractTextPlugin('bundle.min.css', { allChunks: true }),
        // new LodashModuleReplacementPlugin(),
        // new webpack.optimize.OccurrenceOrderPlugin(),
        // new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
    ]
}

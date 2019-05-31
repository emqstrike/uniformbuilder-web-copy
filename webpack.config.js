const path = require("path");
require('dotenv').config();

// const serve = JSON.parse(process.env.WEBPACK_SERVE || 'false');
const appEnv = process.env.APP_ENV;

module.exports = {
    entry: "./src/index.js",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        path: path.resolve(__dirname, "public/uniform-builder/dist"),
        publicPath: "/",
        filename: "app.js"
    },
    mode: appEnv === 'local' ? 'development' : 'production',
    // serve: serve
    //     ? {
    //         content: path.resolve(__dirname, "public/uniform-builder/dist"),
    //         clipboard: false,
    //         logLevel: 'warn', // defaults to 'info' and it's noisy
    //         hot: {
    //             hot: true,
    //             logLevel: 'warn', // defaults to 'info' and it's noisy
    //             reload: true
    //         }
    //     }
    //     : null

};

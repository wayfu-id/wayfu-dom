const { dirname, resolve } = require("path");
const webpack = require("webpack");
const fs = require("fs");
const TerserPlugin = require("terser-webpack-plugin");

let { name, version, author } = JSON.parse(fs.readFileSync("package.json", "utf8"));

module.exports = {
    entry: {
        "wayfu-dom": resolve(__dirname, "index.ts"),
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: [/node_modules/],
                loader: "ts-loader",
            },
        ],
    },
    resolve: { extensions: [".ts", ".js"] },
    output: {
        path: resolve(__dirname, "dist"),
        filename: "[name].min.js",
        library: {
            name: "DOM",
            type: "umd",
            export: "default",
            umdNamedDefine: true,
        },
    },
    devtool: "source-map",
    plugins: [
        new webpack.BannerPlugin({
            banner: `${name} v${version} - (c) ${author}, ISC License`,
        }),
    ],
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        keep_classnames: false,
                        keep_fnames: true,
                    },
                },
                extractComments: false,
            }),
        ],
    },
};

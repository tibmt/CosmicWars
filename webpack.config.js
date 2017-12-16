
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, './src/js/index.js'),
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.(ogg|mp3|png|jpg|gif|json|ttf|wav|eot|svg|woff(2)?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: 'file-loader?limit=10000&name=[name].[ext]?[hash]',
            },
        ]
    },
    plugins: [
        new ExtractTextPlugin('bundle.css'),
        new HtmlPlugin({
            template: path.join(__dirname, './src/template/index.html'),
            filename: 'index.html',
        }),
    ],

    watch: true,

    devtool: 'source-map'
}

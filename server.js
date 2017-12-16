const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const port = 8080;
const address = 'localhost';
const config = require('./webpack.config.js');
const towatch = true
const info = `
              Listening at http://${address}:${port} 
              watch - ${towatch}
            `;

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: false,
    historyApiFallback: true,
    compress: true,
    clientLogLevel: 'error',
    stats: {
        colors: true,
        chunks: false,
    }
}).listen(port, address, err => err ? console.log(err) : console.log(info));
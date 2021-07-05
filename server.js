const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const path = require('path');
const history = require('connect-history-api-fallback');
const app = express();
const config = require('./build/webpack.dev.js');
const compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(history());
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));
app.use(require("webpack-hot-middleware")(compiler));
 
// app.get('/*', function (req, res) {
//     res.sendFile(path.join(__dirname,  'index.html'));
//   });
 
// Serve the files on port 3000.
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});
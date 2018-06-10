const path = require('path');
var core = require('../webpack.core');
var CopyPlugin = require('copy-webpack-plugin');
const package = require('./package.json');
const version = `v${package.version}`;

module.exports = Object.assign(core, {
  entry: {
    'fuse-ui-adal': './index.ts'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(`../built/${version}`)
  },
  plugins: []
});

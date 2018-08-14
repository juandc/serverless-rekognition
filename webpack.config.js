// const path = require('path');
// const slsw = require('serverless-webpack');
// const nodeExternals = require('webpack-node-externals');

// module.exports = {
//   entry: slsw.lib.entries,
//   // entry: './src/api.js',
//   target: 'node',
//   mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
//   optimization: {
//     // We no not want to minimize our code.
//     minimize: false
//   },
//   performance: {
//     // Turn off size warnings for entry points
//     hints: false
//   },
//   devtool: 'nosources-source-map',
//   externals: [nodeExternals()],
//   output: {
//     libraryTarget: 'commonjs2',
//     path: path.join(__dirname, '.webpack/src'),
//     filename: 'api.js'
//   }
// };

const path = require('path');
const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: slsw.lib.entries,
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
  target: 'node',
  externals: [nodeExternals()],
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production'
};

/* eslint-disable */
const path = require('path');

// We use cssnano with the postcss loader, so we tell
// css-loader not to duplicate minimization.
const BASE_CSS_LOADER = 'css?sourceMap&-minimize'

module.exports = {
  entry: './app.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'memoboard.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/,
      include: __dirname
    },
    {
      test: /\.css?$/,
      loaders: [ 'style', 'raw'],
      include: __dirname
    },
    {
      test: /\.json$/,
      loaders: [ 'json' ],
      exclude: /node_modules/,
      include: __dirname
    }
    ]
  },
  
  resolve : {
    alias      : {
      node_modules: base('node_modules'),
    },
    extensions : ['', '.js', '.jsx', '.json']
  }

}


// ------------------------------------
// Utilities
// ------------------------------------
function base () {
  const args = [path.resolve(__dirname, '')].concat([].slice.call(arguments))
  return path.resolve.apply(path, args)
}



// This will make the redux-simpler-router module resolve to the
// latest src instead of using it from npm. Remove this if running
// outside of the source.
var src = path.join(__dirname, '..', '..', 'src')
var fs = require('fs')
if (fs.existsSync(src)) {
  // Use the latest src
  module.exports.resolve = { alias: { 'react-router-redux': src } }
  module.exports.module.loaders.push({
    test: /\.js$/,
    loaders: ['babel'],
    include: src
  });
}

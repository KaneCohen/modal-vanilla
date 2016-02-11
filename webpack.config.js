var path = require('path');
var webpack = require('webpack');

var config = {
  debug: false,
  entry: './src/modal',
  target: 'web',
  output: {
    path: __dirname + '/dist',
    publicPath: '',
    filename: 'modal.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        loaders: ['babel', 'eslint']
      }
    ]
  }
};

webpack(config).run(function(err, stats) {
  console.log('Generating minified bundle for production use via Webpack...');

  if (err) {
    console.log(err.bold);
    return 1;
  }

  var jsonStats = stats.toJson();

  if (jsonStats.hasErrors) return jsonStats.errors.map(error => console.log(error));

  if (jsonStats.hasWarnings) {
    console.log('Webpack generated the following warnings: ');
    jsonStats.warnings.map(warning => console.log(warning));
  }

  console.log('Webpack stats: ' + stats.toString());

  //if we got this far, the build succeeded.
  console.log('Package has been compiled into /dist.');
  return 0;
});

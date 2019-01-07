var path = require('path');
var webpack = require('webpack');

var targets = [
  {
    target: 'web',
    output: {
      path: __dirname + '/dist',
      filename: 'modal.min.js',
      libraryTarget: 'var',
      library: 'Modal'
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({minimize: true})
    ],
  },
  {
    target: 'node',
    output: {
      path: __dirname + '/dist',
      filename: 'modal.js',
      libraryTarget: 'commonjs2'
    }
  }
];

var baseConfig = {
  entry: './index.js',
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'lib'),
        loaders: ['babel-loader', 'eslint-loader']
      }
    ]
  }
};

targets.forEach(function(target) {
  var config = Object.assign({}, baseConfig, target);

  webpack(config).run(function(err, stats) {
    console.log('Generating minified bundle for production use via Webpack...');

    if (err) {
      console.log(err);
      return 1;
    }

    var jsonStats = stats.toJson();

    if (jsonStats.hasErrors) return jsonStats.errors.map(function(error) { return console.log(error); });

    if (jsonStats.hasWarnings) {
      console.log('Webpack generated the following warnings: ');
      jsonStats.warnings.map(function(warning) { return console.log(warning); });
    }

    console.log('Webpack stats: ' + stats.toString());

    //if we got this far, the build succeeded.
    console.log('Package has been compiled into /dist.');
    return 0;
  });
});

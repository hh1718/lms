var debug   = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path    = require('path');

module.exports = {
  context: path.join(__dirname, "src"),
  entry: {
      top: "./components/top/index.tsx",
      sample: "./components/sample/index.tsx"
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      exclude: /(node_modules|bower_components)/,
      use: [{
        loader: 'ts-loader',
        /*options: {
          presets: ['@babel/preset-react', '@babel/preset-env']
        }*/
      }]
    }]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  output: {
    path: __dirname + "../../public/webpack",
    filename: "[name]/index.min.js"
  },
  plugins: debug ? [] : [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ]
};
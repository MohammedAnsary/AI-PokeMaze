var webpack = require('webpack');

module.exports = {
  entry: {
      app: './app/main.ts'
  },

  output: {
    path: './',
    filename: 'bundle.js'
  },

  resolve: {
    extensions: [ '', '.js', '.ts' ]
  },

  devtool: 'source-map',

  module: {
    loaders: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin( {
      name: [ 'app' ]
    } ),
  ],

  devServer: {
    compress: true,
    historyApiFallback: { index: '/index.html' }
  }
}

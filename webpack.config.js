const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'production',
  entry: './src/index.jsx',
  output: {
    filename: 'bundle.[chunkhash].js',
    path: path.resolve(__dirname,'dist'),
  },
  resolve: {
    extensions: ['.jsx','...'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react','@babel/preset-env']
          }
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader','css-loader']
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({template: './public/index.html'}),
  ],
}
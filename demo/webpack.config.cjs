const path = require('path');

module.exports = {
  entry: {
    'demo-1': './demo/demo-1.ts',
    'demo-2': './demo/demo-2.ts',
    'demo-3': './demo/demo-3.ts',
    'demo-4': './demo/demo-4.ts'
  },
  devtool: 'inline-source-map',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
};

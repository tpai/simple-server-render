var path = require('path');

module.exports = {
  entry: path.join(process.cwd(), './src/client.js'),
  output: {
    path: path.join(process.cwd(), './output/'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
        {
            test: /\.jsx?$/,
            use:  [
               { loader: 'babel-loader' }
            ],
            exclude: /node_modules/
        }
    ]
  }
}

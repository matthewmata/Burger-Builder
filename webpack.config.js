const path = require('path');
const autoprefixer = require('autoprefixer');

const SRC_DIR = path.join(__dirname, 'client/src/index.jsx');
const DIST_DIR = path.join(__dirname, 'client/dist');

module.exports = {
  // make optimizations on debugging but does not minify bundle e.g. 'production'
  mode: 'development',
  // points to entry point where webpack starts its journey
  entry: SRC_DIR,
  output: {
    // where we store our bundle
    path: DIST_DIR,
    // name of the bundle
    filename: 'bundle.js',
    publicPath: ''
  },
  devtools: 'cheap-module-eval-source-map',
  module: {
    rules: [
      // transpiles our react
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: {
                  browsers: ["> 1%", "last 2 versions"]
                }
              }
            ],
            "@babel/preset-react"
          ],
          plugins: [
            "@babel/plugin-proposal-class-properties"
          ]
        }
      },
      // transpiles our sass modules
      {
        test: /\.(css|scss)$/,
        exclude: /node_modules/,
        use: [
          // injecting css code in html file
          { loader: 'style-loader' },
          // transpiles css imports
          {
            loader: 'css-loader',
          },
          // transpiles sass imports
          { loader: 'sass-loader'},
          // transpiles css for old browsers
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              // handles which browsers we should transpile css code for, browserslist in package.json
              plugins: () => [autoprefixer()]
            }
          }
        ]
      },
      // transpiles images
      {
        test: /\.(pdf|woff|woff2|eot|ttf|otf|png|jpe?g|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
              name: '[name].[ext]',
              outputPath: 'images/'
          }
        }]
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
};

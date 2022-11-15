// https://jasonwatmore.com/post/2019/09/04/angular-webpack-how-to-add-global-css-styles-to-angular-with-webpack
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const {TsconfigPathsPlugin} = require('tsconfig-paths-webpack-plugin'); // used for paths in ts config
// const {AngularWebpackPlugin} = require('@ngtools/webpack');
/* const CopyPlugin = require('copy-webpack-plugin'); */

/* const root = path.join.bind(path, path.resolve(__dirname, '..'));
console.log(root('src', 'style.scss'));*/

module.exports = {
  entry: {
    // vendor: './src/vendor.ts',
    polyfills: './src/polyfills.ts',
    main: './src/main.ts',
    /*styles: './src/styles.scss'*/
  },
  resolve: {
    extensions: ['.js', '.ts'],
    plugins: [
      /*new TsconfigPathsPlugin({})*/
    ]
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'), // output directory
    filename: '[name].js' // name of the generated bundle
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        /*loader: 'ts-loader',*/
        use: [
          {
            loader: 'ts-loader',
          },
          {
            loader: 'angular2-template-loader'
          } // to load component.html
        ],
        exclude: /\.(spec|e2e).ts$/,
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          esModule: false,
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['to-string-loader', 'css-loader'] // to-string-loaders works with styleUrls
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', // load main style, import css in ts file
          'css-loader',
          'sass-loader'
        ],
        include: path.join(__dirname, 'src/styles.scss')
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: './src/favicon.ico',
      inject: 'body',
      scriptLoading: 'blocking'
    }),
    /* new CopyPlugin({
      patterns: [
        {from: 'src/assets/i18n', to: 'assets/i18n'},
        { from: 'src/assets', to: 'assets' }
      ]
    }) */
    /*,
    new AngularWebpackPlugin({
      tsconfig: './tsconfig.json',
    })*/ // to load component.html
  ],
  node: {
    global: true,
    __filename: true,
    __dirname: true,
  }
};

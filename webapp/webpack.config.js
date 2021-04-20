const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const production = process.env.NODE_ENV === 'production'

module.exports = {
  mode: production ? 'production': 'development',
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/'
  },
  watchOptions: {
    poll: 1000,
    ignored: ["node_modules"]
  },
  devServer: {
    hot: true,
    https: true,
    contentBase: path.resolve(__dirname, 'build'),
    port: 3003,
    host: 'argh.local',
    publicPath: '/',
    historyApiFallback: true,
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://solar.dev.argh.team',  //'http://localhost:5000',
        secure: false
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: [path.join(__dirname, "src")],
        loader: "babel-loader",
        options: {
          plugins: [
            !production && require.resolve('react-refresh/babel'),
          ].filter(Boolean)
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.svg$/,
        use: {
          loader: 'svg-url-loader',
          options: {
            encoding: 'base64'
          }
        }
      },
      {
        test: /\.scss|css$/,
        use: [
          "style-loader",
          "css-loader",
          // "postcss-loader",
          "resolve-url-loader",
          "sass-loader?sourceMap"
        ]
        // test: /\.css$/,
        // use: [
        //   production ? MiniCssExtractPlugin.loader : 'style-loader',
        //   {
        //     loader: 'css-loader',
        //   },
        // ],
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        use: 'file-loader?name=fonts/[name].[ext]!static'
      }
    ]
  },
  plugins: [
    !production && new ReactRefreshWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.IMAGEKIT_URL': JSON.stringify(process.env.IMAGEKIT_URL || 'https://ik.imagekit.io/afill/staging'),
      'process.env.AWS_S3_URL': JSON.stringify(process.env.AWS_S3_URL || 'https://j3deiryt8k.execute-api.eu-west-2.amazonaws.com/default/s3SignedRequestStage'),
    }),
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    }),
    ...(production ? [new MiniCssExtractPlugin({
      filename: 'styles.css'
    })]:[]),
    // new BundleAnalyzerPlugin()
  ].filter(Boolean)
}

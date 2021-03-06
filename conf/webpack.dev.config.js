// let webpack = require('webpack')
//
// module.exports =  {
//   entry: [
//     './src/js/common.js',
//   ],
//   output: {
//     path: "/dist/js",
//     publicPath: "/dist/",
//     filename: "common.js",
//   },
//
//   // output:{
//   //   path:'./dist/js',
//   //   publicPath:'/dist/',
//   //   filename:'a.js',
//   // }
// };


/**
 * Created by ningfujun on 16/12/14.
 */

let webpack = require('webpack');

module.exports = {
  // entry: [
  //   './src/js/app.js',
  //   './src/js/fetch.js',
  // ],
  entry: {
    app: './src/js/app.js',
    // fetch: './src/js/fetch.js',
  },
  output: {
    // path: '/dist/js',
    // publicPath: '/dist/',
    filename: '[name].js',
  },

  watch: true,

  module: {
    loaders: [
      {
        test: /\.js$/,
        //exclude some local linked packages
        //for normal use cases only node_module is need
        exclude: /node_module|vue\/src|vue-router\//,
        loader: 'babel',
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css','postcss', 'sass',],
      },
      {
        test: /\.vue$/,
        loader: 'vue',
      },
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          'image-webpack',
          'url?digest=hex&name=img/[name].[ext]&limit=32768',
          // 'file?digest=hex&name=img/[name].[ext]',
        ]
      },
    ]
  },

  imageWebpackLoader: {
    mozjpeg: {
      quality: 65
    },
    pngquant:{
      quality: "65-90",
      speed: 4
    },
    svgo:{
      plugins: [
        {
          removeViewBox: false
        },
        {
          removeEmptyAttrs: false
        }
      ]
    }
  },

  babel: {
    presets: [
      ['env', {
        "targets": {
          "browsers": ['> 0%']
        }
      }]
    ],
    plugins: ['transform-es3-member-expression-literals', 'transform-es3-property-literals',
      // 'add-module-exports'
    ]
  },

  postcss: function () {
    return [
      // require('postcss-easysprites')({
      //   imagePath:'./temp',
      //   spritePath:'./temp',
      // })
    ];
  },

  resolve: {
    modulesDirectories: ['node_modules']
  },

  // plugins:[
  //   new webpack.optimize.UglifyJsPlugin({
  //     compress: {
  //       properties:false,
  //       warnings: false,
  //     },
  //     output: {
  //       comments: false,
  //     },
  //   }),
  // ]
};
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
  entry: {
    fetch: './src/js/fetch.js',
  },
  output: {
    filename: '[name].js',
  },

  // watch: true,

  module: {
    loaders: [
      {
        test: /\.js$/,
        //exclude some local linked packages
        //for normal use cases only node_module is need
        exclude: /node_module|vue\/src|vue-router\//,
        loaders: ['babel'],
      },
      {
        test: /fetch\/index\.js$/,
        //exclude some local linked packages
        //for normal use cases only node_module is need
        exclude: /node_module/,
        loader: 'string-replace',
        query: {
          search: '{%fetchType%}',
          replace: 'line'
        }
      },
    ]
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

  plugins:[
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
    }),
  ]
};
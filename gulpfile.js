/**
 * Created by ningfujun on 16/12/12.
 */
let key = 'animal';

let gulp = require('gulp');
let swig = require('gulp-swig');
let connect = require('gulp-connect');
let webpack = require('webpack-stream');
let conf = require('./conf/config.json');

// let replace = require('gulp-replace');
// let webpack = require('webpack');
// let gutil = require('gulp-util');

let paths = {
  html: ['./src/*.html'],
  js: {
    main: ['./src/js/app.js'],
    fetch:['./src/js/fetch.js'],
  },
  img: ['./src/img/*'],
};

gulp.task('swig-dev', function () {
  gulp.src(paths.html)
    .pipe(swig({
      defaults: {cache: false},
      data: {
        fetchPath: 'fetch.js',
      }
    }))
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload())
});

gulp.task('swig-output', function () {
  gulp.src(paths.html)
    .pipe(swig({
      defaults: {cache: false},
      data: {
        fetchPath: 'http://cdn.samyon.com/lib/per/' + key + '.js',
      }
    }))
    .pipe(gulp.dest('./output'))
    // .pipe(connect.reload())
});

// ['clean']
gulp.task('webpack-dev', function () {
  gulp.src(paths.js.main)
    .pipe(webpack(require('./conf/webpack.dev.config')))
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload())
});

gulp.task('webpack-fetch', function () {
  gulp.src(paths.js.fetch)
    .pipe(webpack(require('./conf/webpack.devFetch.config')))
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload())
});

gulp.task('webpack-output', function () {
  gulp.src(paths.js.main)
    .pipe(webpack(require('./conf/webpack.output.config')))
    .pipe(gulp.dest('output'))
    // .pipe(connect.reload())
});

gulp.task('webpack-outFetch', function () {
  gulp.src(paths.js.fetch)
    .pipe(webpack(require('./conf/webpack.outFetch.config')))
    .pipe(gulp.dest('./temp'))
    // .pipe(connect.reload())
});

gulp.task('webserver', function () {
  connect.server({
    livereload: true,
    root: 'dist',
    port: 8000,
  })
});

gulp.task('watch', function () {
  gulp.watch(paths.html.concat(['./src/tpl/**']), ['swig']);
  gulp.watch(paths.js.main, ['webpack-dev']);
  gulp.watch(paths.js.fetch, ['webpack-fetch']);
});

gulp.task('default', ['watch', 'webpack-dev', 'swig-dev', 'webserver']);
gulp.task('fetch', ['watch', 'webpack-fetch', 'swig-dev', 'webserver']);
gulp.task('output', ['webpack-output','webpack-outFetch', 'swig-output']);

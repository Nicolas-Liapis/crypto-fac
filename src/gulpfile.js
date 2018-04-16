'use strict';

var gulp = require('gulp'),
  sass   = require('gulp-sass'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  pump   = require('pump'),
  clean  = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  purify = require('gulp-purifycss');

gulp.task('scss', function() {
  return gulp.src('src/scss/style.scss')
    .pipe(rename('app.css'))
    .pipe(gulp.dest('src/css'));
  });

gulp.task('concatCss', function() {
  gulp.src([
  'src/css/normalize.css',
  'src/css/style.css'
  ])
  .pipe(concat('app.css'))
  .pipe(gulp.dest('dist/css'));
});

gulp.task('purifyCss', function() {
  return gulp.src('dist/css/app.css')
    .pipe(purify(['src/scripts/*.js', './*.html']))
    .pipe(clean())
    .pipe(rename('app.min.pure.css'))
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('compress', function (cb) {
  pump([
        gulp.src('src/scripts/*.js'),
        uglify(),
        rename('app.min.js'),
        gulp.dest('dist/js')
    ],
    cb
  );
});

gulp.task('default', ['scss', 'concatCss', 'purifyCss', 'compress']);

"use strict";

//Gulp
const { src, dest, watch, series, parallel } = require('gulp');
const rename = require('gulp-rename');

//sass
const sass = require('gulp-sass')(require('node-sass'));
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');

//HMR
const browserSync = require('browser-sync');

//other
const plumber = require('gulp-plumber');

//EJS
const ejs = require('gulp-ejs');
const replace = require('gulp-replace');

//Babel
const babel = require('gulp-babel');

const buildSass = () =>
    src('src/assets/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(plumber())
    .pipe(
      autoprefixer({
        grid: true,
        cascade: false,
      })
    )
    .pipe(sourcemaps.write('maps'))
    .pipe(dest('dist/assets/css'));

const buildEjs = () =>
    src(['src/ejs/**/*.ejs', '!' + 'src/ejs/**/_*.ejs'])
    .pipe(plumber())
    .pipe(ejs())
    .pipe(rename({extname: '.html'}))
    .pipe(replace(/[\s\S]*?(<!DOCTYPE)/, '$1'))
    .pipe(dest('dist/'));

const copyFile = () =>
  src(['src/assets/js/vendor/*.js'], { base: 'src' })
    .pipe(dest('dist'))

const buildBabel = () =>
src('src/assets/js/**/*.js')
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(dest('dist/assets/js'))


const browserLoad = () =>
  browserSync.init({
    files: ['dist/**/*'],
    port: 8000,
    server: {
      baseDir: 'dist/',
    },
  });

const watchFiles = () => {
  watch('src/assets/scss/**/*.scss', series(buildSass));
  watch('src/ejs/**/*.ejs', series(buildEjs));
  watch('src/assets/js/vendor/**/*.js', series(copyFile));
  watch('src/assets/js/**/*.js', series(buildBabel));
};

exports.default = series(
  parallel(buildSass, buildEjs, copyFile, buildBabel,),
  browserLoad,
  watchFiles
);

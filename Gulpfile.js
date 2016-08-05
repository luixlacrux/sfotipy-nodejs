'use strict'
// Gulp Dependecies
const gulp = require('gulp')
const livereload = require('gulp-livereload')
const environments = require('gulp-environments')
const buffer = require('vinyl-buffer')
const source = require('vinyl-source-stream')

// Style Dependecies
const stylus = require('gulp-stylus')
const nib = require('nib')

// Build Dependecies
const browserify = require('browserify')
const uglify = require('gulp-uglify')
const watchify = require('watchify')
const assign = require('lodash.assign')

// Dist Dependecies
const babel = require('gulp-babel')
const nodemon = require('gulp-nodemon')

// Set Environments
const development = environments.development
const production = environments.production

let opts = { entries: 'src/client/backbone/app.js', debug: true }

opts = assign({}, watchify.args, opts)

// Task's Stylus
gulp.task('styl', () => styl())
gulp.task('styl:live', () => styl().pipe(livereload({ start: true })))
gulp.task('styl:watch', ['styl'], () => {
  return gulp.watch(['./src/client/stylus/*.styl', './src/client/stylus/*/*.styl'], ['styl:live'])
})

// Task's JavaScripts
gulp.task('js', () => rebundle(browserify(opts)))
gulp.task('js:watch', ['js'], () => {
  let w = watchify(browserify(opts))

  w.on('update', () => {
    console.log('--> File modified, rebuilding...')

    let bundle = rebundle(w).pipe(livereload())
    console.log('--> Rebuild finished')
    return bundle
  })

  return rebundle(w).pipe(livereload({ start: true }))
})

// Task's Assets
gulp.task('assets', () => {
  return gulp.src('./src/client/assets/**')
    .pipe(gulp.dest('./public/assets'))
})

// Task's Dist
gulp.task('dist', () => {
  return gulp.src(['./src/server/**'])
    .pipe(babel())
    .pipe(gulp.dest('./dist/src/server'))
})

gulp.task('dist:watch', ['dist'],() => {
  return gulp.watch('./src/server/**', ['dist'])
})

gulp.task('nodemon', () => {
  return nodemon({
    script: './dist/src/server',
    watch: './src/server'
  })
})

gulp.task('default', ['build', 'dist'])
gulp.task('build', ['assets','styl', 'js'])
gulp.task('build:watch', ['styl:watch', 'js:watch'])



function rebundle (b) {
  return b
    .bundle()
    .on('error', function(err) { console.error(err); this.emit('end'); })
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(production(uglify().on('error', err => console.log(err))))
    .pipe(gulp.dest('./public'))
}

function styl () {
  return gulp.src('./src/client/stylus/app.styl')
    .pipe(stylus({ compress: true, use: nib() }))
    .pipe(gulp.dest('./public'))
}


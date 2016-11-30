'use strict';

global.$ = {
  package: require('./package.json'),
  config: require('./gulp/config'),
  path: {
    task: require('./gulp/paths/tasks.js'),
    jsFoundation: require('./gulp/paths/js.foundation.js'),
    cssFoundation: require('./gulp/paths/css.foundation.js'),
    app: require('./gulp/paths/app.js')
  },
  gulp: require('gulp'),
  rimraf: require('rimraf'),
  imagemin: require('gulp-imagemin'),
  browserify: require('browserify'),
  vinyl: require('vinyl-source-stream'),
  buffer: require('vinyl-buffer'),
  sourcemaps: require('gulp-sourcemaps'),
  merge: require('merge-stream'),
  spritesmith: require('gulp.spritesmith'),
  browserSync: require('browser-sync').create(),
  gp: require('gulp-load-plugins')()
};

$.path.task.forEach(function(taskPath) {
  require(taskPath)();
});

$.gulp.task('default', $.gulp.series(
  'clean',
  $.gulp.parallel(
    'sass',
    'pug',
    'js:foundation',
    'js:process',
    'copy:image',
    'copy:fonts',
    'copy:php',
    'sprite:img',
    'css:foundation',
    'sprite:svg'
  ),
  $.gulp.parallel(
    'watch',
    'serve'
  )
));

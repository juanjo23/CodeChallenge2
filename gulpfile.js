// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var path = require('path');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

// Lint Task
gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Lint Less
gulp.task('less', function() {
    return gulp
        .src('app/styles/*.less')
        .pipe(less())
        .pipe(gulp.dest('.tmp'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('js/*.js', ['lint', 'scripts']);
    gulp.watch('app/styles/*.less', ['less']);
});


// Create server
gulp.task('serve', function () {
    // Serve files from the root of this project
    browserSync.init({
      notify: false,
      port: 9000,
      server: {
        baseDir: ['.tmp', 'app'],
        routes: {
          '/bower_components': 'bower_components',
          '/.tmp': '.tmp'
        }
      }
    });

    // Livereload
    gulp.watch([
      'app/*.html',
      '.tmp/*.css'
    ]).on('change', reload);

});

// Default Task
gulp.task('default', ['lint', 'less', 'scripts', 'watch', 'serve']);
// Run == default
gulp.task('run', ['lint', 'less', 'scripts', 'watch', 'serve']);

// including plugins
var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    server = require('tiny-lr')(),
    less = require("gulp-less"),
    rename = require('gulp-rename'),
    minifyCSS = require('gulp-minify-css');

// translate less file, then minify it
gulp.task('less', function () {
    gulp.src('public/vendor/bootstrap/less/bootstrap-custom.less')
        .pipe(less())
        .pipe(gulp.dest('public/compiled/'))
        .pipe(minifyCSS())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('public/compiled/'))
});

gulp.task('watch-less', function () {
    gulp.watch(['public/vendor/bootstrap/less/*.less', 'public/vendor/bootstrap/less/custom/*.less'], ['less']);
    livereload.listen();
    gulp.watch('public/compiled/bootstrap-custom.min.css').on('change', livereload.changed);
});

gulp.task('default', ['watch-less']);
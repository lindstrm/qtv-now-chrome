var gulp = require('gulp');
var gutil = require('gulp-util');
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var compass = require('gulp-compass');
var sys = require('sys');
 
// Where do you store your Sass files?
var sassDir = 'sass';
 
// Which directory should Sass compile to?
var targetCSSDir = '/';

// Compile Sass, autoprefix CSS3,
// and save to target CSS directory
gulp.task('css', function () {
    return gulp.src(sassDir + '/style.scss')
        .pipe(compass({ 
            config_file: './config.rb',
            css: '/',
            style: 'compact',
            comments: false
        }).on('error', gutil.log))
        .pipe(autoprefix('last 10 version'))
        .pipe(gulp.dest(targetCSSDir))
});
 
// Keep an eye on Sass, Coffee, and PHP files for changes...
gulp.task('watch', function () {
    gulp.watch(sassDir + '/**/*.scss', ['css']);
});
 
// What tasks does running gulp trigger?
gulp.task('default', ['css', 'watch']);
const gulp = require('gulp');

const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const rev = require('gulp-rev');
const path = require('path');
const env = require('./config/environment');

gulp.task('css', function(){
    console.log('minifying css....');
    gulp.src('./assets/scss/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assets/css'));

    return gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
});
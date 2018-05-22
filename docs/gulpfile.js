
var gulp = require('gulp');
//var exec = require('gulp-exec');
var exec = require('child_process').exec;
var gls = require('gulp-live-server');
var plugins = require('gulp-load-plugins')();

gulp.task('sphinx', function (cb) {
  exec('sphinx-build -E ./source ./build/html', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('copy-css', function() {
  return gulp.src([ './source/_static/css/*.css' ])
    .pipe(gulp.dest('./build/html/_static/css'));
});

gulp.task('convert-less', function() {
  return gulp.src([ './source/_static/css/*.less' ])
    .pipe(plugins.less())
    .pipe(plugins.cssmin())
    .pipe(gulp.dest('./build/html/_static/css'));
});

gulp.task('build', ['sphinx', 'convert-less', 'copy-css']);

gulp.task('serve', function() {
    var server = gls.static('build/html', 8000);
    server.start();
  
    gulp.watch(['**/*.css', '**/*.html'], function (file) {
      server.notify.apply(server, [file]);
    });
});

gulp.task('watch', ['build', 'serve'], function() {
  gulp.watch('./source/**/*.rst', ['sphinx']);
  gulp.watch('./source/_static/css/*.less', ['convert-less']);
});

gulp.task('default', ['build']);
gulp.task('init', [])
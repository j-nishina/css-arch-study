var gulp = require('gulp');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');
var plumber = require('gulp-plumber');

// 開発用webサーバ起動タスク
gulp.task('serve', function () {
  gulp.src('dest')
    .pipe(webserver({
      host: 'localhost',
      port: 3000,
      livereload: true
    }));
});

// scssファイルのコンパイル用タスク
gulp.task('sass', () => {
  gulp.src(['./src/scss/**/*.scss', '!./src/scss/**/_*.scss'])
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('./dest/css/'));
});

// jadeファイルのコンパイル用タスク
gulp.task('jade', () => {
  gulp.src(['./src/jade/**/*.jade', '!./src/jade/**/_*.jade'])
    .pipe(plumber())
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('./dest/'));
});

// ファイル変更監視タスク
gulp.task('watch', function(){
  // ファイルが変更されたらsass/jadeコンパイルタスクを実行
  gulp.watch('./src/scss/*.scss', ['sass'])
  gulp.watch('./src/jade/*.jade', ['jade'])
});

gulp.task('default', ['watch', 'serve']);

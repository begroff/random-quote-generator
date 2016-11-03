var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var del = require('del');
var runSequence = require('run-sequence');

// SASS TASK
gulp.task('sass', function() {
  // Get .scss files in the scss directory and any child directories
  return gulp.src('scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('css'))
    // Inject changes into browserSync
    .pipe(browserSync.stream());
});

// WATCH TASK
// Run sass task and browserSync task before watch begins
gulp.task('watch', ['sass', 'browserSync'], function() {
  // Watch for changes in scss folder, when their are changes run sass task
  gulp.watch('scss/**/*.scss', ['sass']);
  // Reload the browser when html or js is changed
  gulp.watch('./*.html', browserSync.reload);
  gulp.watch('js/**/*.js', browserSync.reload);
});

// BROWSERSYNC TASK
gulp.task('browserSync', function() {
  // Initialize browser sync, can use proxy here
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

// USEREF TASK
gulp.task('useref', function() {
  return gulp.src('./*.html')
    // Gets all the stuff between the build comments
    .pipe(useref())
    // Minifies only javascript files
    .pipe(gulpIf('*.js', uglify()))
    // Minifies only css files
    .pipe(gulpIf('*.css', cssnano()))
    // Ouputs everything to the dist directory using filename from build comments. Changes script tag in html file(s) to use filename from build comments.
    .pipe(gulp.dest('dist'));
});

// CLEAN DIST FOLDER TASK
gulp.task('clean:dist', function() {
  return del.sync('dist');
})

// BUILD TASK
gulp.task('build', function(callback) {
  runSequence('clean:dist', ['sass', 'useref'], callback)
})

// DEFAULT TASK
gulp.task('default', ['watch']);

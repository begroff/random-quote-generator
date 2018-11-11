var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var del = require('del');
var fs = require('fs-extra');

var sourceFiles = {
  css: {
    sass: "src/assets/sass/style.scss",
    fontAwesome: "node_modules/@fortawesome/fontawesome-free/css/all.min.css",
    normalize: "node_modules/normalize.css/normalize.css",
    fonts: "node_modules/@fortawesome/fontawesome-free/webfonts"
  },
  js: {
    app: [
      "src/assets/js/twitter.js",
      "src/assets/js/app.js",
    ],
    jquery: "node_modules/jquery/dist/jquery.min.js"
  },
  html: "src/*.html",
  images: "src/images/*.png"
};

var distDirs = {
  dist: "dist",
  distAll: "dist/**",
  css: "dist/css",
  js: "dist/js",
  images: "dist/images"
};

var distFiles = {
  css: "style.css",
  cssMin: "style.css.min",
  js: "app.js",
};

var watchDirs = {
  css: "src/assets/sass/**/*.scss",
  js: "src/assets/js/**/*.js",
  html: "src/*.html"
}

/**
 * Copies html files.
 */
gulp.task('html', function() {
  return gulp.src(sourceFiles.html)
  .pipe(gulp.dest(distDirs.dist))
  .pipe(browserSync.reload({ stream: true}));
});

/**
 * Compiles Sass.
 */
gulp.task('sass', function() {
  return gulp.src(sourceFiles.css.sass)
    .pipe(sourcemaps.init())
    .pipe(sass( { outFile: distFiles.css }))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest(distDirs.css))
    .pipe(browserSync.reload({ stream: true }));
});

/**
 * Copies css dependencies and then compiles sass.
 */
gulp.task('css', ['sass'], function() {
  fs.copy(sourceFiles.css.fonts, distDirs.dist + "/webfonts");
  fs.copyFileSync(sourceFiles.css.fontAwesome, distDirs.css + "/fontawesome.min.css");
  fs.copyFileSync(sourceFiles.css.normalize, distDirs.css + "/normalize.css");
})

/**
 * Concatenates javascript files.
 */
gulp.task('js:concat', function() {
  return gulp.src(sourceFiles.js.app)
  .pipe(concat(distFiles.js))
  .pipe(gulp.dest(distDirs.js));
});

/**
 * Minify javascript files after they have been concatenated.
 */
gulp.task('js:compress', ['js:concat'], function() {
  return gulp.src(distDirs.js + "/" + distFiles.js)
  .pipe(uglify())
  .pipe(rename( { suffix: ".min" }))
  .pipe(gulp.dest(distDirs.js))
  .pipe(browserSync.reload({ stream: true}));
});

/**
 * Copies script dependencies and starts js build process
 */
gulp.task('js', ['js:compress'], function() {
  fs.copyFileSync(sourceFiles.js.jquery, distDirs.js + "/jquery.min.js")
});

gulp.task('images', function() {
  return gulp.src(sourceFiles.images)
  .pipe(gulp.dest(distDirs.images))
});

/**
 * Cleans the distribution directory
 */
gulp.task('clean', function () {
  return del.sync([distDirs.distAll, "!" + distDirs.dist]);
});

/**
 * Runs necessary tasks for build and then watches directories
 * for changes.
 */
gulp.task('watch', ['build', 'browserSync'], function() {
  gulp.watch(watchDirs.html, ['html']);
  gulp.watch(watchDirs.css, ['css']);
  gulp.watch(watchDirs.js, ['js']);
});

/**
 * Runs tasks required for build.
 */
gulp.task('build', ['clean', 'html', 'css', 'js']);

/**
 * Runs browser sync for automatic refresh when files change.
 */
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: distDirs.dist
    }
  });
});

gulp.task('default', ['watch']);

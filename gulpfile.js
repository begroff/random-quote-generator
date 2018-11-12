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
 * Copies html files and refreshes the browser.
 */
gulp.task('html', function copyHtmlFiles() {
  return gulp.src(sourceFiles.html)
  .pipe(gulp.dest(distDirs.dist))
  .pipe(browserSync.reload( { stream: true } ));
});

/**
 * Compiles Sass and refreshes the browser.
 */
gulp.task('sass', function compileSass() {
  return gulp.src(sourceFiles.css.sass)
    .pipe(sourcemaps.init())
    .pipe(sass( { outFile: distFiles.css }))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest(distDirs.css))
    .pipe(browserSync.reload({ stream: true }));
});

/**
 * Compiles sass and then copies css files/directories required by app.
 */
gulp.task('styles', gulp.series('sass', function copyCssDependencies(done) {
  fs.copy(sourceFiles.css.fonts, distDirs.dist + "/webfonts");
  fs.copyFileSync(sourceFiles.css.fontAwesome, distDirs.css + "/fontawesome.min.css");
  fs.copyFileSync(sourceFiles.css.normalize, distDirs.css + "/normalize.css");

  done();
}));

/**
 * Concatenates javascript files.
 */
gulp.task('js:concat', function combineJsFiles() {
  return gulp.src(sourceFiles.js.app)
  .pipe(concat(distFiles.js))
  .pipe(gulp.dest(distDirs.js));
});

/**
 * Minifies javascript files after they have been combined and refreshes the browser.
 */
gulp.task('js:compress', function minifyJs() {
  return gulp.src(distDirs.js + "/" + distFiles.js)
  .pipe(uglify())
  .pipe(rename( { suffix: ".min" }))
  .pipe(gulp.dest(distDirs.js))
  .pipe(browserSync.reload({ stream: true}));
});

/**
 * Concatenates javascript files, compresses them and then copies js files required by app.
 */
gulp.task('scripts', gulp.series(['js:concat', 'js:compress'], function copyJsDeps(done) {
  fs.copyFileSync(sourceFiles.js.jquery, distDirs.js + "/jquery.min.js");
  done();
}));

/**
 * Copies images to the distribution directory.
 */
gulp.task('images', function copyImages() {
  return gulp.src(sourceFiles.images)
  .pipe(gulp.dest(distDirs.images))
});

/**
 * Cleans the distribution directory.
 */
gulp.task('clean', function cleanDestinationDirectory(done) {
  del.sync([distDirs.distAll, "!" + distDirs.dist]);

  done();
});

/**
 * Runs browser sync for automatic refresh when files change.
 */
gulp.task('browserSync', function () {
  browserSync.init({
    server: {
      baseDir: distDirs.dist
    }
  });
});

/**
 * Runs tasks required for build.
 */
gulp.task('build', gulp.series('clean', gulp.parallel(['html', 'styles', 'scripts'])));

/**
 * Runs the build task as default task (just typing gulp on command line),
 * starts browsersync and watches html, css and js files.
 */
gulp.task('default', gulp.series('build', gulp.parallel(['browserSync', watchFiles])));

/**
 * Watches html, css and js files and runs appropriate tasks when there
 * are changes.
 */
function watchFiles() {
  gulp.watch(watchDirs.html, gulp.series('html'));
  gulp.watch(watchDirs.css, gulp.series('sass'));
  gulp.watch(watchDirs.js, gulp.series(['js:concat', 'js:compress']));
}
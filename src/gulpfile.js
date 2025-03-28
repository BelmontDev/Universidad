const gulp       = require('gulp');
const concat     = require('gulp-concat');
const minifycss  = require('gulp-minify-css')
const rename     = require("gulp-rename");
const sourcemaps = require('gulp-sourcemaps');
const sass       = require('gulp-sass');
const uglify     = require('gulp-uglify');
sass.compiler    = require('node-sass');
const pug        = require('gulp-pug');

const paths = {
  sass: {
    src  : "./scss/style.scss",
    dest : "../dist/css",
    file : "../dist/css/style.css"
  },
  pug: {
    src  : "./pug/views/*.pug",
    dest : "../dist"
  }
};

gulp.task('sass', () => {
  return gulp.src(paths.sass.src)
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.sass.dest));
});

gulp.task('cssmin', () => {
  return gulp.src(paths.sass.file)
    .pipe(minifycss({keepSpecialComments : 0}))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest(paths.sass.dest));
});

gulp.task('build', gulp.series([
  'sass',
  'cssmin'
]));

gulp.task('pug', () => {
  return gulp.src(paths.pug.src)
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest(paths.pug.dest));
})

gulp.task('pug:watch', gulp.series('pug', () => {
  gulp.watch(paths.pug.src, gulp.series('pug'));
}));
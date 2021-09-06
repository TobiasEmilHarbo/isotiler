const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const watchify = require('watchify');
const tsify = require('tsify');
const fancyLog = require('fancy-log');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

browserSync.init({
  open: false,
  server: {
    baseDir: 'dist',
  },
});
const paths = {
  pages: ['src/*.html'],
  resources: ['src/app/**/*.png'],
  json: ['src/app/**/*.json']
};
const watchedBrowserify = watchify(
  browserify({
    basedir: '.',
    debug: true,
    entries: ['src/app/main.ts'],
    cache: {},
    packageCache: {},
  }).plugin(tsify),
);
gulp.task('copy-html', () => gulp.src(paths.pages).pipe(gulp.dest('dist')));
gulp.task('copy-json', () => gulp.src(paths.json).pipe(gulp.dest('dist')));
gulp.task('copy-resources', () => gulp.src(paths.resources).pipe(gulp.dest('dist')));
function bundle() {
  return watchedBrowserify
    .plugin(tsify)
    .transform('babelify', {
      presets: ['es2015'],
      extensions: ['.ts'],
    })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({
      stream: true,
    }));
}
gulp.task('default', gulp.series(gulp.parallel('copy-html'), gulp.parallel('copy-resources'), gulp.parallel('copy-json'), bundle));
watchedBrowserify.on('update', bundle);
watchedBrowserify.on('error', bundle);
watchedBrowserify.on('log', fancyLog);

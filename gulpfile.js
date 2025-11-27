'use strict';

const gulp = require('gulp');
const del = require('del');
const browserSync = require('browser-sync').create();
const gulpLoadPlugins = require('gulp-load-plugins');
const psi = require('psi');
const sass = require('gulp-sass')(require('sass'));

const $ = gulpLoadPlugins();

// Helpers
const reload = browserSync.reload;

/* ------------------------------
 * Lint
 * ------------------------------ */
function lint() {
  return gulp.src(['app/scripts/**/*.js', '!node_modules/**'])
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
}

/* ------------------------------
 * Images
 * ------------------------------ */
function imagesDist() {
  return gulp.src(['app/images/**/*', '!app/images/**/*.html'])
    .pipe(gulp.dest('dist/images'))
    .pipe($.size({title: 'images'}));
}

/* ------------------------------
 * Copy
 * ------------------------------ */
function copyDist() {
  gulp.src([
    'app/*.*',
    'app/*.js',
    '!app/index.html',
    '!app/.htaccess'
  ], { dot: true })
    .pipe(gulp.dest('dist'))
    .pipe($.size({title: 'copy'}));

  return gulp.src(['app/plugins/*.js', 'app/plugins/*.css'], { base: 'app/plugins' })
    .pipe(gulp.dest('dist/plugins'));
}

/* ------------------------------
 * Styles
 * ------------------------------ */
function styles() {
  return gulp.src([
    'app/styles/**/*.scss',
    'app/styles/**/*.css'
  ])
    .pipe($.newer('.tmp'))
    .pipe($.sourcemaps.init())
    .pipe(sass({ precision: 10 }).on('error', sass.logError))
    .pipe(gulp.dest('.tmp'))
    .pipe($.if('*.css', $.cssnano()))
    .pipe($.size({title: 'styles'}))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('.tmp'));
}

/* ------------------------------
 * Scripts
 * ------------------------------ */
function scripts() {
  return gulp.src(['./app/scripts/*.js'])
    .pipe($.newer('.tmp/scripts'))
    .pipe($.sourcemaps.init())
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/scripts'))
    .pipe($.concat('main.min.js'))
    .pipe($.uglifyEs.default())
    .pipe($.size({title: 'scripts'}))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('.tmp/scripts'));
}

/* ------------------------------
 * SVG Sprite
 * ------------------------------ */
function svg() {
  return gulp.src('app/images/figures-svg/*.svg')
    .pipe($.svgSprite({
      mode: {
        stack: {
          dest: '.',
          sprite: 'figures-svg.svg',
          example: true
        }
      },
      svg: {
        xmlDeclaration: false,
        doctypeDeclaration: false,
        namespaceClassnames: false
      }
    }))
    .pipe(gulp.dest('.tmp'));
}

/* ------------------------------
 * Rev
 * ------------------------------ */
function rev() {
  return gulp.src([".tmp/main.css", ".tmp/scripts/main.min.js", ".tmp/figures-svg.svg"])
    .pipe($.rev())
    .pipe(gulp.dest('dist'))
    .pipe($.rev.manifest())
    .pipe(gulp.dest('dist'));
}

/* ------------------------------
 * HTML Dist
 * ------------------------------ */
function htmlDist() {
  const manifest = gulp.src("./dist/rev-manifest.json");

  return gulp.src('app/index.html')
    .pipe($.useref({
      searchPath: '{.tmp,app}',
      noAssets: true
    }))
    .pipe($.if('*.html', $.htmlmin({
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeRedundantAttributes: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      removeOptionalTags: true
    })))
    .pipe($.size({title: 'html', showFiles: true}))
    .pipe($.revReplace({manifest}))
    .pipe($.stringReplace(
      new RegExp('(href|src|srcset)="?\/[^\/\\s"]+', 'gi'),
      hrefMatched => hrefMatched.replace(/\//, '/dist/')
    ))
    .pipe(gulp.dest("./"));
}

/* ------------------------------
 * Clean
 * ------------------------------ */
function clean() {
  return del(['.tmp', 'dist/*', '!dist/.git'], { dot: true });
}

/* ------------------------------
 * Serve
 * ------------------------------ */
function serve() {
  browserSync.init({
    notify: false,
    logPrefix: 'WSK',
    scrollElementMapping: ['main', '.mdl-layout'],
    https: true,
    server: ['.tmp', 'app'],
    online: true,
    port: 3000
  });

  gulp.watch(['app/**/*.html']).on('change', reload);
  gulp.watch(['app/styles/**/*.{scss,css}'], gulp.series(styles, reload));
  gulp.watch(['app/scripts/**/*.js'], gulp.series(scripts, reload));
  gulp.watch(['app/images/**/*']).on('change', reload);
}

/* ------------------------------
 * Serve Dist
 * ------------------------------ */
function serveDist() {
  browserSync.init({
    notify: false,
    logPrefix: 'WSK',
    server: './',
    port: 3001
  });
}

/* ------------------------------
 * Dist
 * ------------------------------ */
const dist = gulp.series(
  clean,
  styles,
  gulp.parallel(scripts, imagesDist, copyDist, svg),
  rev,
  htmlDist
);

/* ------------------------------
 * Pagespeed
 * ------------------------------ */
function pagespeed(cb) {
  psi('yuricamara.com.br', { strategy: 'mobile' }, cb);
}

/* ------------------------------
 * Tasks Exposed
 * ------------------------------ */
exports.lint = lint;
exports.styles = styles;
exports.scripts = scripts;
exports.svg = svg;
exports.dist = dist;
exports.clean = clean;
exports.serve = serve;
exports['serve:dist'] = serveDist;
exports.pagespeed = pagespeed;

// Default
exports.default = serve;

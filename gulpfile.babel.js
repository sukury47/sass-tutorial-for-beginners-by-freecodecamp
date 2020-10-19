import gulp from 'gulp';
import pug from 'gulp-pug';
import del from 'del';
import ws from 'gulp-webserver';
import image from 'gulp-image';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import csso from 'gulp-csso';
import bro from 'gulp-bro';
import babelify from 'babelify';
import nodeSass from 'node-sass';

sass.compiler = nodeSass;

const routes = {
  pug: {
    watch: 'src/**/*.pug',
    src: 'src/*.pug',
    dest: 'build'
  },
  img: {
    src: 'src/img/*',
    dest: 'build/img'
  },
  scss: {
    watch: 'src/scss/**/*.scss',
    src: 'src/scss/*.scss',
    dest: 'build/css'
  },
  js: {
    watch: 'src/js/**/*.js',
    src: 'src/js/*.js',
    dest: 'build/js'
  }
};

// prepare
const clean = () => del(['build/']);

// assets
const html = () =>
  gulp
    .src(routes.pug.src, { allowEmpty: true })
    .pipe(pug())
    .pipe(gulp.dest(routes.pug.dest));

const img = () =>
  gulp
    .src(routes.img.src, { allowEmpty: true })
    .pipe(image())
    .pipe(gulp.dest(routes.img.dest));

const js = () =>
  gulp
    .src(routes.js.src, { allowEmpty: true })
    .pipe(
      bro({
        transform: [
          babelify.configure({
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  corejs: 3,
                  shippedProposals: true
                }
              ]
            ]
          }),
          ['uglifyify', { global: true }]
        ]
      })
    )
    .pipe(gulp.dest(routes.js.dest));

const styles = () =>
  gulp
    .src(routes.scss.src, { allowEmpty: true })
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(csso())
    .pipe(gulp.dest(routes.scss.dest));

const fontawesome = () =>
  gulp
    .src(
      'node_modules/@fortawesome/fontawesome-free/webfonts/*'
    )
    .pipe(gulp.dest('build/webfonts/'));

// live
const webserver = () =>
  gulp
    .src('build')
    .pipe(ws({ livereload: true, open: true }));

const watch = () => {
  gulp.watch(routes.pug.watch, html);
  gulp.watch(routes.img.src, img);
  gulp.watch(routes.scss.src, styles);
  gulp.watch(routes.js.watch, js);
};

const prepare = gulp.series([clean]);

const assets = gulp.series([
  html,
  styles,
  js,
  img,
  fontawesome
]);

const live = gulp.parallel([webserver, watch]);

const build = gulp.series([prepare, assets]);

export const run = gulp.series([build, live]);

export default html;
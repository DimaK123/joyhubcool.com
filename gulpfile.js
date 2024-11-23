const { src, dest, watch, parallel, series } = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const clean = require('gulp-clean');
const avif = require('gulp-avif');
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const fonter = require('gulp-fonter');
const ttf2woff2 = require('gulp-ttf2woff2');
const svgSprite = require('gulp-svg-sprite');
const include = require('gulp-include');
const rename = require('gulp-rename');
const gulpIf = require('gulp-if');
const debounce = require('lodash/debounce');

function pages() {
  return src('./src/pages/*.html', { allowEmpty: true })
    .pipe(include({
      includePatch: './src/components'
    }))
    .pipe(dest('src'))
    .pipe(browserSync.stream())
} // Ф-ция для компонентного подхода

function fonts() {
  return src('./src/fonts/src/*.*')
    .pipe(fonter({
      formats: ['woff', 'ttf']
    }))
    .pipe(src('./src/fonts/*.ttf'))
    .pipe(ttf2woff2())
    .pipe(dest('./src/fonts'))
}

function images() {
  return src(['./src/images/src/*.*', '!./src/images/src/*.svg'])
    .pipe(newer('./src/images'))
    .pipe(avif({ quality: 50 }))

    .pipe(src('./src/images/src/*.*'))
    .pipe(newer('./src/images'))
    .pipe(webp())

    .pipe(src('./src/images/src/*.*'))
    .pipe(newer('./src/images'))
    .pipe(imagemin())

    .pipe(dest('./src/images'))
}

function sprite() {
  return src('./src/images/icons/*.svg')
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: '../sprite.svg',
          example: true
        }
      }
    }))
    .pipe(dest('./src/images/icons'))
}

const isNotMinified = (file) => !file.basename.endsWith('.min.js');

function scripts() {
  return src('src/js/src/*.js', { allowEmpty: true }) // Находим все файлы .js в папке src/js
    .pipe(gulpIf(isNotMinified, uglify())) // Минифицируем каждый файл
    .pipe(gulpIf(isNotMinified, rename({ suffix: '.min' }))) // Добавляем суффикс .min к каждому файлу
    .pipe(dest('src/js')) // Сохраняем минифицированные файлы в той же папке
    .pipe(browserSync.stream()); // Обновляем браузер после изменений
}

function styles() {
  return src('src/styles/main.scss', { allowEmpty: true }) // путь к файлу, с которым будем работать // { allowEmpty: true } позволяет игнорировать отсутвие файла
    .pipe(concat('main.min.css')) // concat переименовывает итоговый файл, который мы получим после сборки
    .pipe(scss({ outputStyle: 'compressed' })) // компрессия итогового файла scss
    .pipe(dest('src/styles')) // указываем куда положить итоговый файл
    .pipe(browserSync.stream()) // обновление страницы после изменений
}

function watching() {
  browserSync.init({
    server: {
      baseDir: "src/"
    }
  });

  watch(['src/styles/**/*.scss'], styles);

  watch(['src/img'], images);

  watch(['src/js/src/*.js'], scripts); // Этот участок кода нужен для работы с файлами js

  watch(['src/components/*', 'src/pages/*'], pages); // Этот участок нужен при компонентном подходе верстки. Важно! Данных папок впроекте может пока не быть, поэтому закомментировано, чтобы избежать конфликтов

  watch(['src/*.html']).on('change', browserSync.reload); // данный синтаксис, /*.html, означает, что мы смотрим за всеми файлами html в папке src. Если нужно следить дополнительно за всеми подпапками, то нужно использовать синтаксис /**/*.html
}

function cleanDist() {
  return src('dist')
    .pipe(clean())
}

function building() {
  return src([
    'src/styles/main.min.css',
    'src/images/*.*', // при билдинге сразу указал рабочую папку, сейчас тестируем на img
    'src/images/icons',
    '!src/images/src',
    // '!src/images/icons/*.svg', // на случай если будем использовать спрайты вместо svg, то сами файлики .svg нам будут не нужны
    // 'src/images/icons/sprite.svg', // на случай если будем использовать спрайты вместо svg
    'src/fonts/*.*',
    '!src/fonts/src',
    'src/js/*.min.js', // Этот участок кода нужен для работы с файлами js
    '!src/js/src', // Этот участок кода нужен для работы с файлами js
    'src/**/*.html'
  ], { base: 'src', allowEmpty: true })
    .pipe(dest('dist'))
}

exports.styles = styles; // чтобы ф-ции выше работали, их надо экспортировать
exports.images = images;
exports.fonts = fonts;
exports.pages = pages;
exports.building = building;
exports.sprite = sprite;
exports.scripts = scripts;
exports.watching = watching;

exports.build = series(cleanDist, building);
exports.default = parallel(styles, scripts, watching);
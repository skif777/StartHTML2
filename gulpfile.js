"use strict";

const path                    = require('path'),
      gulp                    = require('gulp'),
      sass                    = require('gulp-sass'),
      webpack                 = require('webpack-stream'),
      jade                    = require('gulp-jade'),
      plumber                 = require('gulp-plumber'), // Перехват ошибок
      autoprefixer            = require('autoprefixer'),
      sourcemaps              = require('gulp-sourcemaps'),
      htmlmin                 = require('gulp-htmlmin'),
      browserSync             = require('browser-sync'),
      rename                  = require('gulp-rename'),
      webp                    = require('gulp-webp'), // Конвертация в Webp
      cache                   = require('gulp-cache'), // Очистка кеша
      del                     = require('del'), 
      zip                     = require('gulp-zip'),
      svgSprite               = require('gulp-svg-sprites'), // Создание SVG sprite
      svgmin                  = require('gulp-svgmin'),
      tinypng                 = require('gulp-tinypng-unlimited'),
      spritesmith             = require('gulp.spritesmith'), // CSS Sprite
      stripCssComments        = require('gulp-strip-css-comments'), // Удаление комментариев из CSS
      strip                   = require('gulp-strip-comments'), // Удаление комментриев из HTML и JS
      replace                 = require('gulp-replace'), // Удаление атрибутов
      uncss                   = require('gulp-uncss'), // Удаление не используемых классов в CSS
      csso                    = require('gulp-csso'), // Оптимизация css
      postcss                 = require('gulp-postcss');

// Режим разработки (false для сборки проекта)
let isDev = true;

// Настройка Webpack
const webpackConfig = {
  mode: isDev === true ? 'development' : 'production',
  entry: {
    scripts: './src/js/modules/main.js',
    'webfont-loaded': './src/js/modules/_scripts/_webfont-loaded.js',
    //'fontfaceobserver': './src/js/modules/_scripts/_fontfaceobserver.js'
  },
  output: {
    filename: '[name].js',
    //path: path.resolve(__dirname, 'src/js')
  },
  //devtool: isDev === true ? 'source-map' : 'none',
  devtool: 'source-map',
  module: {
    rules: [
      { 
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', {
              debug: isDev === true ? true : false,
              corejs: 3,
              useBuiltIns: 'usage'
            }]]
          }
        }
      }

    ]
  }
};

// Webpack - сборщик js модулей
gulp.task('webpack', function() {
  return gulp.src('./src/js/modules/main.js')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(isDev === true ? './src/js' : './dist/js'));
});

// Jade - Компиляция в HTML
gulp.task('jade', function() {
  return gulp.src([
      'src/blocks/page-contents/index/index.jade',
      'src/blocks/page-contents/404/404.jade'
  ])
  .pipe(plumber()) // Перехват ошибок
  .pipe(jade({
      pretty: true
      }))
  .pipe(gulp.dest('src/'))
});

// SASS - препроцессор
gulp.task('sass', function () {
  return gulp.src([
    'src/sass/style.sass',
    'src/blocks/page-contents/index/index.sass',
  ])
  .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('./src/css'));
});

// Post CSS
gulp.task('postcss', function () {
  const plugins = [
    autoprefixer(),
  ];
  return gulp.src('./src/css/*.css')
    .pipe(postcss(plugins))
    .pipe(gulp.dest('./dist/css'));
});

// Удаление неиспользуемых классов в css
gulp.task('css-min', function() {
  return gulp.src('./dist/css/*.css')
  .pipe(stripCssComments({ // Удаление комментариев
    preserve: false
  }))
  .pipe(uncss({ // Удаление лишних классов
      html: [ // Файлы в которых проверяются CSS классы на использование
      'src/*.html',
      ],
      ignore: [
      /\.webfont-loaded/, 
      /\.js-menu-open/, 
      /\.is-active/,
     ]
  }))
  .pipe(csso({ // Оптимизация css
    restructure: false,
    sourceMap: true,
    debug: true
  }))
  .pipe(rename({ // Переименование файла
    suffix: ".min",
  }))
  .pipe(gulp.dest('./dist/css'));
});

// Оптимизация изображений
gulp.task('tiny', function() {
  return gulp.src([
    './src/images/**/*.@(png|jpg|jpeg)',
    '!./src/images/Sprite/**/*.@(png|jpg|jpeg)',
  ])
  .pipe(plumber()) 
  .pipe(tinypng())
  .pipe(gulp.dest('./dist/images'));
});

// livereload task
gulp.task('browser-sync' , function() { 
  browserSync({
      server: {
          baseDir: 'src'
      },
      browser: 'Firefox',
      notify: false
  });
});

// Минификация html
gulp.task('htmlmin', function() {
  return gulp.src([
    'src/*.html',
    '!src/404.html'
    ])
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(strip()) // Удаление комментариев
    // .pipe(rename({  // Переименование файла
    //         suffix: ".min",
    //      }))
    .pipe(gulp.dest('dist'));
});

// Конвертация в Webp
gulp.task('webp', () =>
  gulp.src([
    'src/img/*.jpg',
    'src/img/*.png'
  ])
  .pipe(webp({
    // quality: 80,
    // preset: 'photo',
    // method: 6,
    lossless: true // Сжатие без потерь
  }))
  .pipe(gulp.dest('src/img'))
);

// Архивирование в zip
gulp.task('zip', () =>
    gulp.src('dist/**')
      .pipe(zip('ready.zip'))
      .pipe(gulp.dest(''))
);

// CSS Sprite
gulp.task('sprite', function () {
  var spriteData = gulp.src([
    'src/img/Icons/*.jpg',
    'src/img/Icons/*.png'
  ]).pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.sass',
    imgPath: '../img/Sprite/png/sprite.png',
    algorithm: 'left-right'
  }));
  return spriteData.pipe(gulp.dest('src/img/Sprite/png'));
});

// SVG Sprite
gulp.task('svg', function () {
  return gulp.src('src/img/SVG/*.svg')
    .pipe(svgmin()) // Минификация SVG
    // .pipe(cheerio(function ($) {
    //     $('svg').attr('style',  'display:none');
    // }))
    .pipe(svgSprite({mode: "symbols"}))
    .pipe(gulp.dest("src/img/Sprite"));
});

// Очистка кэша
gulp.task('cache', function() {
  return cache.clearAll();
});

// Удаление
gulp.task("clean", clean);
function clean() {
  return del(["./dist"]);
}

// Наблюдение
gulp.task('watch', function() {
  // Наблюдение
  gulp.watch('src/sass/**/*.sass', gulp.parallel('sass')); 
  gulp.watch('src/blocks/**/*.sass', gulp.parallel('sass')); 
  gulp.watch('src/blocks/**/*.jade', gulp.parallel('jade')); 
  gulp.watch('src/js/**/*.js', gulp.parallel('webpack'));
  // Обновление страницы
  gulp.watch('src/css/style.css').on('change', browserSync.reload); // reload css
  gulp.watch('src/*.html').on('change', browserSync.reload); // reload html
  gulp.watch('src/js/settings/settings.js').on('change', browserSync.reload); // reload js
});

// Команды по умолчанию
gulp.task('default', gulp.parallel('watch', 'webpack', 'jade', 'sass', 'webp', 'browser-sync'));

/**
 * Сборка проекта
 * 
 * =====================================================
 */
gulp.task('move-general', function() {
  return gulp.src(
    [
      'src/*.@(html|json|txt|js)',
      'src/fonts/*',
      'src/php/*',
      'src/css/*.@(css|css.map)',
      'src/js/fontfaceobserver.js',
    ], 
    {
      base: './src/'
    }
  )
  .pipe(gulp.dest('./dist'))
});

gulp.task('move-htaccess', function() {
  return gulp.src('src/ht.access')
  .pipe(rename({
    basename: "",
    extname: ".htaccess"
  }))
  .pipe(gulp.dest('./dist'))
});

// Сборка
gulp.task('build', gulp.series(
  'clean',
  'sass',
  'jade',
  'move-general',
  'move-htaccess',
  'tiny',
  'postcss',
  'css-min',
  'webpack'
));




const { src, dest, watch, series, parallel } = require("gulp");
const sass = require('gulp-sass'); //Sassコンパイル
const plumber = require('gulp-plumber'); //エラー時の強制終了を防止
const postcss = require('gulp-postcss'); //autoprefixerとセット
const autoprefixer = require('autoprefixer'); //ベンダープレフィックス付与
const cssdeclsort = require('css-declaration-sorter'); //css並べ替え
const sassGlob = require('gulp-sass-glob'); //@importの記述を簡潔にする
const browserSync = require('browser-sync'); //ブラウザ反映
const gcmq = require('gulp-group-css-media-queries'); // media queryを纏める
const notify = require('gulp-notify'); //エラー発生時にデスクトップ通知する
const pug = require("gulp-pug");
const mode = require('gulp-mode')({
    modes: ['production', 'development'], // 本番実装時は 'gulp --production'
    default: 'development',
    verbose: false,
  });
const webpack = require("webpack");
const webpackStream = require("webpack-stream"); // gulpでwebpackを使うために必要なプラグイン

// webpackの設定ファイルの読み込み
const webpackConfig = require("./webpack.config");

// scssのコンパイル
const compileSass = done => {
    const postcssPlugins = [
      autoprefixer({
      // browserlistはpackage.jsonに記載[推奨]
      cascade: false,
      // grid: 'autoplace' // IE11のgrid対応('-ms-')
      }),
      cssdeclsort({ order: 'alphabetically' /* smacss, concentric-css */ })
    ]
  
    src("./src/scss/**/*.scss", { sourcemaps: true  /* init */})
    .pipe(plumber(({ errorHandler: notify.onError("Error: <%= error.message %>") })))
    .pipe(sassGlob())
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(postcss(postcssPlugins))
    .pipe(mode.production(gcmq()))
    .pipe(dest("./dist/assets/css", { sourcemaps: './sourcemaps' /* write */ }));
    done(); // 終了宣言
  }

// pugのコンパイル
const compilePug = done => {
    src(['./src/pug/**/*.pug', '!' + './src/pug/**/_*.pug'])
    .pipe(plumber(({ errorHandler: notify.onError("Error: <%= error.message %>") })))
    .pipe(pug({
        pretty: true
    }))
    .pipe(dest('./dist/'));
    done(); // 終了宣言
}

// ローカルサーバ起動
const buildServer = done => {
  browserSync.init({
    //port: 8080,
    notify: false,
　　// 静的サイト
    server: {
      baseDir: './dist/',
    },
    // 動的サイト
    // files: ['./**/*.php'],
    // proxy: 'http://localsite.wp/',
  })
  done()
}

// ブラウザ自動リロード
const browserReload = done => {
  browserSync.reload()
  done()
}

// webpack
const bundleJs = () => {
  // webpackStreamの第2引数にwebpackを渡す
  return webpackStream(webpackConfig, webpack)
    .pipe(dest("./dist/assets/js"));
};

// ファイル監視
const watchFiles = () => {
  //watch('./**/*.html', browserReload)
  watch('./src/pug/**/*.pug', series(compilePug, browserReload))
  watch('./src/scss/**/*.scss', series(compileSass, browserReload))
  watch('./src/js/**/*.js', series(bundleJs, browserReload))
}

exports.pug = compilePug;
exports.sass = compileSass;
exports.default = parallel(buildServer, watchFiles);



// // 監視
// gulp.task('watch', function (done) {
//     gulp.watch('./src/scss/**/*.scss', gulp.task('sass'));
//     gulp.watch('./src/pug/**/*.pug', gulp.task('pug'));
//     gulp.watch('./src/js/*.js', gulp.task('js-minify'));
//     done();
// });

// // default
// gulp.task('default', gulp.series(gulp.parallel('watch')));


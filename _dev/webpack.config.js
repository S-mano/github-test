const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');

const dir = {
  src: path.join(__dirname, `${__dirname}/src`),
  public: `${__dirname}/../common/`,
};
const mode = 'production'; //development:開発, production:本番
const enabledSourceMap = mode === 'development'; // ソースマップの利用有無(productionのときはソースマップを利用しない)

//---------------------------------------------------------------------------------
// sass
//---------------------------------------------------------------------------------
const scssConfig = {
  mode: mode,
	entry: {
		'common': ['./src/sass/common.scss'],
	},
  output: {
    // filename: 'css/[name].min.css',
    publicPath: '/',
    path: dir['public'],
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          // CSSファイルを書き出すオプションを有効にする
          {
            loader: MiniCssExtractPlugin.loader,
          },
          // CSSをバンドルするための機能
          {
            loader: 'css-loader',
            options: {
              // オプションでCSS内のurl()メソッドの取り込みを禁止する
              url: false,
              // ソースマップの利用有無
              sourceMap: enabledSourceMap,
              importLoaders: 2,
            },
          },
          // PostCSSのための設定
          {
            loader: 'postcss-loader',
            options: {
              // PostCSS側でもソースマップを有効にする
              // sourceMap: true,
              postcssOptions: {
                plugins: [
                  // Autoprefixerを有効化
                  // ベンダープレフィックスを自動付与する
                  ['autoprefixer', { grid: true }],
                  ['tailwindcss', {}],
                  [
                    //PostCSS Sort Media Queries（mobile-first でソート）
                    'postcss-sort-media-queries',
                    {
                      sort: 'mobile-first',
                    },
                  ],
                ],
              },
            },
          },
          // Sassをバンドルするための機能
          {
            loader: 'sass-loader',
            options: {
              // ソースマップの利用有無
              sourceMap: enabledSourceMap,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // CSSファイルを外だしにするプラグイン
    new MiniCssExtractPlugin({
      // ファイル名を設定します
      filename: 'css/[name].min.css',
    }),
    //出力された不要なjsファイルを削除
    new RemoveEmptyScriptsPlugin(),
  ],
  performance: { hints: false }, // パフォーマンスに関する警告を無効化
};

//---------------------------------------------------------------------------------
// js
//---------------------------------------------------------------------------------
const jsConfig = {
  mode: mode,
	entry: {
		'js/common': ['./src/js/common.js'],
		'js/tinymce-picture': ['./src/js/tinymce-picture.js'],
		'js/pages/top': ['./src/js/page/top.js'],
	},
  output: {
    filename: '[name].min.js',
    publicPath: '/',
    path: dir['public'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            // 利用するローダー
            loader: 'babel-loader',
            // ローダーのオプション
            // 今回はbabel-loaderを利用しているため
            // babelのオプションを指定しているという認識で問題ない
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    modules: false,
                    targets: {
                      ie: '11',
                    },
                    corejs: 3,
                    useBuiltIns: 'usage',
                  },
                ],
              ],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      Promise: 'es6-promise-promise',
    }),
  ],
};

//---------------------------------------------------------------------------------
// 各設定の読み込み
//---------------------------------------------------------------------------------
module.exports = [scssConfig,jsConfig];

# github-test

こちらは個人的に github の操作についてあれこれテストするためのリポジトリです。

# mock 制作について

mock ページでの実装にあたり、環境構築方法や注意事項をまとめました。<br>
下記をご確認いただいた上で、ご対応のほどよろしくお願いいたします。

## 環境構築方法

### 動作環境

1. エディター： VSCode
2. 拡張機能(Linter 系)

   - EditorConfig：https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig
   - Prettier：https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
   - ESLint：https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
   - StyleLint：https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint

3. Node.js v18.15.0

### ページの表示

正常に mock ページを表示させるために<br>
Node.js と npm を使用して簡易的な web サーバーを立てています。

1. プロジェクトディレクトリで`npm install`を実行
2. プロジェクトディレクトリで`npm run dev`を実行

上記コマンド実行で mock ページが表示されます。

### css(sass)・javascript のコンパイル、ミニファイ

ページで読み込んでいる css は webpack を使い、scss ファイルを css ファイルにコンパイル・ミニファイしたものを使用しています。<br>
また、javascript も同様にミニファイしたものを使用しています。

1. \_dev ディレクトリで`npm install`を実行
2. \_dev ディレクトリで`npm run watch`を実行

上記コマンドで自動 watch が行われ、scss・js ファイルを上書きすると自動的にコンパイル、ミニファイが実行されます。<br>

- scss の場合： \_dev/src/sass/pages/\_top.scss などの scss ファイルを上書き保存する<br>
  (トップページで css を追加したい場合は、クラス名の接頭語に「.l-top-」を追加してください)
- javascript の場合：\_dev/src/js/page/top.js などの js ファイルを上書き保存する<br>
  (js ファイルを追加した場合、\_dev/webpack.config.js の 98 行目付近に entry プロパティがあるので、そちらにミニファイさせたい js ファイルのパスを追加してください)

もし css や javascript ファイルを直接追加したい場合や、js ライブラリなどの追加をしたい場合は下記の「ファイルの格納場所」項目を参考に追加をお願いいたします。

### Tailwindcss について

Tailwindcss を使ってスタイルを追加することも可能です。<br>
上記の自動 watch が動いている状態で、mock/front-page/index.html から Tailwindcss のクラスを追加し上書き保存すると、<br>
common.min.css にそのクラスが追加されます。<br>
また、Tailwindcss クラスを使用する場合は、クラス名の接頭語に「tw-」を追加してください。

## ファイルの格納場所

ご対応いただけるにあたり、各種ファイルは指定のディレクトリへ格納するようにお願いいたします。

- css<br>
  common/css ディレクトリに保存。

- javascript<br>
  common/js ディレクトリに保存。<br>

  ライブラリを使用する場合（必ずライセンスを確認する）<br>
  common/lib ディレクトリに保存。

  例：「swiper」を使用したい場合<br>
  「common/lib/swiper」フォルダを追加してその配下に関連ファイルを保存

- 画像<br>
  画像に合わせて、common/images 配下の各種ディレクトリへ保存<br>
  common/images/mock：ダミー画像など、後で正式な画像に置き換えるための画像はこちらへ保存<br>
  common/images/pages/[ページ名]：トップページ・下層ページに格納する画像を保存<br>
  common/images/share：アイコンやヘッダー・フッターで使用する画像など、他のページでも使用する画像はこちらへ保存

## 開発環境への反映手順

開発環境への反映については、こちらのリポジトリで実装を確認後、<br>
フロントエンド担当メンバーから本案件のリポジトリへ反映するようにいたします。

1. feature/kv-animation ブランチでモックを制作
2. feature/kv-animation ブランチでコミット・プッシュ後、main ブランチへのプルリクを作成
3. コードレビュー後、問題なければ main ブランチへマージ

(以降はフロントエンド担当メンバーの作業になります)<br>

4. こちらのリポジトリの内容を、本案件のリポジトリへ統合させる
5. 開発環境へ反映後、問題なく実装されているか確認

**【開発環境】**

```

https://symba_v2.ryukyu-i-dev.com/

id: symba_v2
pass: ryukyu

```

## 事前準備
使用したnodeのバージョン

node: 16.6.2
yarn

## パッケージインストール
```
$ cd ${project_home}
$ yarn install
```

必要なライブラリ一式がダウンロードされます。

## 起動
```
$ cd ${project_home}
$ yarn start
```

* dest配下にbuild済の資材を配置します
* http://localhost:8000 でbrowser-syncを起動します
* フォアグラウンドで実行され続けますが、そのまま起動して貰えればsrc配下のコードを修正したタイミングで自動build＆reloadが実行されます

## ディレクトリ構成
* dist
  * build済の資材の置き場所
  * babelを通しており、自動でIE11への対応などを行っています、このため少しbuild後のソースは読みづらくなっています
* src
  * 開発者が修正する資材
  * htmlはheaderなどの資材を汎用化して使い回すためejsを利用していますが、基本的にはHTMLと同様に読めるはずです
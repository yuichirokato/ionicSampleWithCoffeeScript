Ionic Sample With CoffeeScript
===

coffeescriptを使ったIonicのアプリのサンプルです

プロジェクトの動かし方
---

以下のコマンドでプロジェクトを初期化します

```
npm install
```

iOSとAndroidのプラットフォームを追加します

```
ionic platform add ios
ionic platform add android
```

必要なプラグインを追加します

```
ionic plugin add org.apache.cordova.inappbrowser
ionic plugin add org.apache.cordova.splashscreen
```

AndroidでブラウザのレンダリングエンジンをCrosswalkに変更します

```
ionic browser add crosswalk@10.39.235.15
```

iOSは実行前に以下のコマンドをインストールします

`sudo npm install -g ios-sim`

Androidは事前にAndroidSdkを入れておいて下さい

それぞれ実機をつなげた状態で以下のコマンドで実行します

iOS

`ionic run ios`

Android

`ionic run android`

エミュレータの場合は以下のようになります

iOS

`ionic emulate ios`

Android

`ionic emulate android`

Base Project
---

CoffeeScript Ionic Starter

https://github.com/StephenGrider/CoffeeScript-Ionic-Starter




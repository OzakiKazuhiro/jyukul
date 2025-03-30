#!/bin/bash
# シンレンタルサーバーでのComposer実行スクリプト

# 作業ディレクトリに移動
cd /oz006.com/public_html/Jyukul/my-app

# PHPのバージョンを確認
php -v

# Composerの更新
curl -sS https://getcomposer.org/installer | php
mv composer.phar composer

# Composer依存関係のインストール
php composer install --no-dev --optimize-autoloader

echo "Composer依存関係のインストールが完了しました！" 
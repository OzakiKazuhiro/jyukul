# シンレンタルサーバーへの自動デプロイ設定

このプロジェクトは GitHub Actions を使用して、シンレンタルサーバーに自動デプロイする設定が可能です。以下の手順に従って設定を完了してください。

## 1. GitHub の Secrets を設定する

リポジトリの Settings > Secrets and variables > Actions に移動し、以下の Secret を追加してください：

- `FTP_SERVER`: FTP サーバーのホスト名（例: `ftp.example.com`）
- `FTP_USERNAME`: FTP ユーザー名
- `FTP_PASSWORD`: FTP パスワード

## 2. 環境設定ファイルの準備

`.env.production`ファイルを編集して、シンレンタルサーバーに合わせた設定を行ってください：

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=[データベース名]
DB_USERNAME=[データベースユーザー名]
DB_PASSWORD=[データベースパスワード]
```

メール設定なども適切に設定してください。

## 3. 初回デプロイ後の設定

初回デプロイ後、SSH でサーバーに接続し、以下のコマンドを実行してください：

```bash
cd /oz006.com/public_html/Jyukul/my-app
php artisan migrate
php artisan storage:link
php artisan config:cache
php artisan route:cache
php artisan view:cache
chmod -R 775 storage bootstrap/cache
```

## 4. 自動デプロイの動作確認

`main`ブランチに変更をプッシュするか、GitHub Actions のワークフローを手動で実行して、デプロイが正常に完了することを確認してください。

## 5. デプロイ設定のカスタマイズ

必要に応じて`.github/workflows/deploy.yml`ファイルを編集し、デプロイワークフローをカスタマイズできます。

## 注意事項

- デプロイ時には`.env`ファイルは上書きされません
- データベースのマイグレーションは手動で実行する必要があります
- 大きなファイルのアップロードには時間がかかる場合があります

<?php
// シンレンタルサーバー環境チェックスクリプト

echo "=== サーバー環境チェック ===\n";

// PHPバージョン
echo "PHP バージョン: " . phpversion() . "\n";

// 必要な拡張機能
$required_extensions = [
    'openssl',
    'pdo',
    'mbstring',
    'tokenizer',
    'xml',
    'ctype',
    'json',
    'fileinfo',
    'curl',
    'zip',
    'gd',
];

echo "\n必要な拡張機能:\n";
foreach ($required_extensions as $ext) {
    echo $ext . ": " . (extension_loaded($ext) ? "OK" : "未インストール") . "\n";
}

// ディレクトリの書き込み権限
$writable_dirs = [
    'storage/app',
    'storage/framework',
    'storage/logs',
    'bootstrap/cache',
];

echo "\nディレクトリの書き込み権限:\n";
foreach ($writable_dirs as $dir) {
    echo $dir . ": " . (is_writable($dir) ? "書き込み可能" : "書き込み不可") . "\n";
}

// .envファイルの確認
echo "\n.envファイル: " . (file_exists('.env') ? "存在します" : "存在しません") . "\n";

// 現在の作業ディレクトリ
echo "\n現在の作業ディレクトリ: " . getcwd() . "\n";

// メモリ制限
echo "メモリ制限: " . ini_get('memory_limit') . "\n";

// アップロード最大サイズ
echo "アップロード最大サイズ: " . ini_get('upload_max_filesize') . "\n";
echo "POST最大サイズ: " . ini_get('post_max_size') . "\n";

echo "\n=== チェック完了 ===\n"; 
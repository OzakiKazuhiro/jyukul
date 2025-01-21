<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
             // アバター画像のパスとURL用のカラムを追加
             $table->string('avatar_path')->nullable()->after('email');
             $table->string('avatar_url')->nullable()->after('avatar_path');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
             // ロールバック時のカラム削除
             $table->dropColumn(['avatar_path', 'avatar_url']);
        });
    }
};
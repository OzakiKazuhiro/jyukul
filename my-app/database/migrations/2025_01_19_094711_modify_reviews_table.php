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
        Schema::table('reviews', function (Blueprint $table) {
              // 既存のratingカラムを削除
              $table->dropColumn('rating');

              // 新しい評価カラムを追加
              $table->integer('teaching_rating')->comment('講師の教え方の評価');
              $table->integer('study_rating')->comment('定期テスト対策・受験対策の充実度');
              $table->integer('facility_rating')->comment('自習室の環境');
              $table->integer('cost_rating')->comment('料金対効果');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('reviews', function (Blueprint $table) {
            // 追加したカラムを削除
            $table->dropColumn([
                'teaching_rating',
                'study_rating',
                'facility_rating',
                'cost_rating',
            ]);

            // ratingカラムを戻す
            $table->integer('rating');
        });
    }
};
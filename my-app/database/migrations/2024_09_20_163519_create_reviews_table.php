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
        Schema::create('reviews', function (Blueprint $table) {
            // $table->id();
            // $table->foreignId('shop_id')->constrained();
            // $table->foreignId('user_id')->constrained();
            // $table->integer('rating');//1-5の評価
            // $table->text('comment')->nullable();
            // $table->timestamps();
            $table->id();
            $table->foreignId('shop_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->integer('teaching_rating')->comment('講師の教え方の評価');
            $table->integer('study_rating')->comment('定期テスト対策・受験対策の充実度');
            $table->integer('facility_rating')->comment('自習室の環境');
            $table->integer('cost_rating')->comment('料金対効果');
            $table->text('comment')->nullable();
            $table->string('created_by');
            $table->string('updated_by');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
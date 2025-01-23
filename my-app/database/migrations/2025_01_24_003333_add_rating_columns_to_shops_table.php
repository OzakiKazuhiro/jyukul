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
        Schema::table('shops', function (Blueprint $table) {
            $table->decimal('average_teaching_rating', 3, 2)->nullable()->after('average_rating');
            $table->decimal('average_study_rating', 3, 2)->nullable()->after('average_teaching_rating');
            $table->decimal('average_facility_rating', 3, 2)->nullable()->after('average_study_rating');
            $table->decimal('average_cost_rating', 3, 2)->nullable()->after('average_facility_rating');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('shops', function (Blueprint $table) {
            $table->dropColumn('average_teaching_rating');
            $table->dropColumn('average_study_rating');
            $table->dropColumn('average_facility_rating');
            $table->dropColumn('average_cost_rating');
        });
    }
};
<?php

namespace App\Observers;

use App\Models\Review;
use App\Models\Shop;
use Illuminate\Support\Facades\Log;

class ReviewObserver
{
    /**
     * Handle the Review "created" event.
     */
    public function created(Review $review): void
    {
        $this->updateShopRating($review->shop);
    }

    /**
     * Handle the Review "updated" event.
     */
    public function updated(Review $review): void
    {
        $this->updateShopRating($review->shop);
    }

    /**
     * Handle the Review "deleted" event.
     */
    public function deleted(Review $review): void
    {
        $this->updateShopRating($review->shop);
    }

    protected function updateShopRating(Shop $shop)
{
    // 各評価カラムの平均値を計算
    $teachingAvg = $shop->reviews()->avg('teaching_rating') ?? 0;
    $studyAvg = $shop->reviews()->avg('study_rating') ?? 0;
    $facilityAvg = $shop->reviews()->avg('facility_rating') ?? 0;
    $costAvg = $shop->reviews()->avg('cost_rating') ?? 0;

    // 全体の平均評価を計算（各評価の平均値をさらに平均）
    $averageRating = ($teachingAvg + $studyAvg + $facilityAvg + $costAvg) / 4;

    // レビュー数を計算
    $reviewsCount = $shop->reviews()->count();

    Log::info('Updating shop rating:', [
        'shop_id' => $shop->id,
        'average_rating' => $averageRating,
        'reviews_count' => $reviewsCount,
        'average_teaching_rating' => $teachingAvg,
        'average_study_rating' => $studyAvg,
        'average_facility_rating' => $facilityAvg,
        'average_cost_rating' => $costAvg,
    ]);

    // ショップの評価とレビュー数を更新
    $shop->update([
        'average_rating' => $averageRating,
        'reviews_count' => $reviewsCount,
        'average_teaching_rating' => $teachingAvg,
        'average_study_rating' => $studyAvg,
        'average_facility_rating' => $facilityAvg,
        'average_cost_rating' => $costAvg,
    ]);
}

    /**
     * Handle the Review "restored" event.
     */
    public function restored(Review $review): void
    {
        //
    }

    /**
     * Handle the Review "force deleted" event.
     */
    public function forceDeleted(Review $review): void
    {
        //
    }
}
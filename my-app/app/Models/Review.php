<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        'shop_id',
        'user_id',
        // 'rating',
        'teaching_rating',   // 講師の教え方の評価（1-5）
        'study_rating',      // 定期テスト対策・受験対策の充実度（1-5）
        'facility_rating',   // 自習室の環境（1-5）
        'cost_rating',       // 料金対効果（1-5）
        'comment',
        'anonymous',
    ];

// app/Models/Review.php

public function getAverageRatingAttribute()
{
    $ratings = [
        $this->teaching_rating,
        $this->study_rating,
        $this->facility_rating,
        $this->cost_rating
    ];
    
    // nullを除外して平均を計算
    $validRatings = array_filter($ratings, function($rating) {
        return !is_null($rating);
    });
    
    if (empty($validRatings)) {
        return null;
    }
    
    // return round(array_sum($validRatings) / count($validRatings), 1);
    $averageRating = array_sum($validRatings) / count($validRatings);
    return number_format($averageRating, 1); // 小数点第1位まで表示
}

    // shopsテーブルとのリレーション
    public function shop()
    {
        return $this->belongsTo(Shop::class);
    }

    // usersテーブルとのリレーション
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function saveReview($data)
    {
        $this->shop_id = $data['shop_id'];
        $this->user_id = $data['user_id'];
        $this->teaching_rating = $data['teaching_rating'];
        // $this->rating = $data['rating'];
        $this->study_rating = $data['study_rating'];
        $this->facility_rating = $data['facility_rating'];
        $this->cost_rating = $data['cost_rating'];
        $this->comment = $data['comment'];
        $this->anonymous = $data['anonymous']; // この行を追加
        $this->save();

        return $this;
    }

    public function updateReview($request)
    {
           // レビューIDからレビューを取得
    $review = $this->find($request->review_id);
        // 評価とコメントを更新
    $review->teaching_rating = $request->teaching_rating;
    $review->study_rating = $request->study_rating;
    $review->facility_rating = $request->facility_rating;
    $review->cost_rating = $request->cost_rating;
    $review->comment = $request->comment;

    // レビューを保存
    $review->save();

    return $review;
    }
}
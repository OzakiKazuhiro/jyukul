<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shop extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'location',
        'description',
        'created_by',
        'updated_by',
    ];

    // reviewsテーブルとのリレーション
    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    // reviewsテーブルの中のuser_idとusersテーブルのidを紐づける
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // shop_imagesテーブルとのリレーション
    public function shopImages()
    {
        return $this->hasMany(ShopImage::class);
    }


    public function updateShop($data)
    {
        // ショップIDからショップを取得
        $shop = Shop::find($data['id']);
        $shop->name = $data['name'];
        $shop->location = $data['location'];
        $shop->description = $data['description'];
        $shop->updated_by = $data['updated_by'];

        $shop->save();

        return $shop;
    }


    public function getAverageRatingAttribute()
    {
        // reviewsリレーションを取得（必要なカラムのみ選択）
        $reviews = $this->reviews()->get(['teaching_rating', 'study_rating', 'facility_rating', 'cost_rating']);
    
        if ($reviews->isEmpty()) {
            return null;
        }
    
        $totalRating = 0;
        $count = 0;
    
        foreach ($reviews as $review) {
            $average = $review->getAverageRatingAttribute();
            if ($average !== null) {
                $totalRating += $average;
                $count++;
            }
        }
    
        if ($count === 0) {
            return null;
        }
    
        $averageRating = $totalRating / $count;
        return number_format($averageRating, 1); // 小数点第1位まで表示
    }


}
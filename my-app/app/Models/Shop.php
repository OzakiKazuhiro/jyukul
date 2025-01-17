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

    // 平均評価を小数点第一位まで取得
    public function getReviewsAvgRatingAttribute()
    {
        return round($this->reviews()->avg('rating'), 1);
    }

    public function saveShop($data)
    {
        $this->name = $data['name'];
        $this->location = $data['location'];
        $this->description = $data['description'];
        $this->created_by = $data['created_by'];
        $this->updated_by = $data['updated_by'];

        $this->save();

        return $this;
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
}

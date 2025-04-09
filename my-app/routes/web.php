<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\GoogleLoginController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Googleアカウントによるログイン処理
Route::get('/external/auth/google', [GoogleLoginController::class, 'redirectToGoogle'])->name('google.login');
Route::get('/external/auth/google/callback', [GoogleLoginController::class, 'handleGoogleCallback'])->name('google.callback');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
// ファイルアップロードの制限：（アバター機能で学習）
// HTMLのform要素は、ファイルアップロードを含む場合、実際には常にPOSTメソッドを使用します
// PUTやPATCHメソッドでは、multipart/form-dataを直接扱えないという技術的制限があります
//     ↓↓
    Route::match(['patch', 'post'], 'profile', [ProfileController::class, 'update'])->name('profile.update');
    // Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::get('/',[ShopController::class, 'index'])->name('shop.index');

// Shop
Route::middleware('auth')->group(
    function () {
        Route::get('/shop/create',[ShopController::class, 'create'])->name('shop.create');
        Route::post('/shop/store',[ShopController::class, 'store'])->name('shop.store');
        Route::get('/shop/edit/{id}',[ShopController::class, 'edit'])->name('shop.edit');
        Route::post('/shop/update',[ShopController::class, 'update'])->name('shop.update');
        Route::delete('/shop/delete/{id}',[ShopController::class, 'destroy'])->name('shop.destroy');
    }
);
Route::get('/shop/{id}', [ShopController::class, 'detail'])->name('shop.detail');
Route::get('/shop/user/{userId}', [ShopController::class, 'indexByUser'])->name('shop.indexByUser');


Route::middleware('auth')->group(
    function () {
        Route::get('/review/create/shop/{id}',[ReviewController::class, 'create'])->name('review.create');
        Route::post('/review/store',[ReviewController::class, 'store'])->name('review.store');
        Route::get('/review/edit/{id}',[ReviewController::class, 'edit'])->name('review.edit');
        Route::post('/review/update',[ReviewController::class, 'update'])->name('review.update');
        Route::delete('/review/delete/{id}',[ReviewController::class, 'destroy'])->name('review.destroy');
    }
);
Route::get('/review/user/{userId}', [ReviewController::class, 'indexByUser'])->name('review.indexByUser');




require __DIR__.'/auth.php';
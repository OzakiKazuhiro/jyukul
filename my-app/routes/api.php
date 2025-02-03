<?php

use App\Http\Controllers\GeocodeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


// 地図実装
Route::get('/geocode', [GeocodeController::class, 'forwardGeocode']);
<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class GeocodeController extends Controller
{
    public function forwardGeocode(Request $request)
{
    // アドレスが提供されているか検証
    $request->validate(['address' => 'required|string']);

    try {
        // 国土地理院の住所検索APIにリクエストを送信
        $response = Http::get('https://msearch.gsi.go.jp/address-search/AddressSearch', [
            'q' => $request->address
        ]);
        // dd($response->json());
        // APIからのレスポンスをそのまま返却
        // return $response->json();

         // APIのレスポンスをそのまま返す
         return response()->json($response->json());
        
    } catch (\Exception $e) {
        // エラーをログに記録
        Log::error('Geocoding error: ' . $e->getMessage());
        
        // エラーレスポンスを返却
        return response()->json(['error' => 'ジオコーディングに失敗しました'], 500);
    }
}
}
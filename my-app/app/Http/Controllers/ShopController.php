<?php

namespace App\Http\Controllers;

use App\Models\Shop;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Review;
use App\Models\ShopImage;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Nette\Utils\Random;

class ShopController extends Controller
{
    public function index(Request $request)
    {
        // クエリパラメーターからステータスを取得
        $status = request('status');

        // 店舗の全件を取得
        $query = Shop::with('reviews', 'shopImages')
        ->withCount('reviews')
        ->withAvg('reviews', 'rating');

        //検索条件がある場合
        if($request->has('search')){
            $search = $request->search;
            $query->with('reviews', 'shopImages')->where('name', 'like', '%' . $search . '%')
                ->orWhere('location', 'like', '%' . $search . '%')
                ->orWhere('description', 'like', '%' . $search . '%');
        }
        $shops = $query->paginate(10);
        
        //新着のレビューを5件取得
        $newReviews = Review::with('shop', 'user')
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get();

        return Inertia::render('Home', [
            'shops' => $shops,
            'newReviews' => $newReviews,
            'status' => $status,
        ]); 
    }

    public function indexByUser($userId)
    {
        $user = User::find($userId);
        $shops = Shop::with("shopImages")
        ->where('created_by', $userId)
        ->orWhere('updated_by',$userId)->get();
        return Inertia::render('Shop/IndexByUser', [
            'shops' => $shops,
            'user' => $user,
        ]);
    }
    
    public function detail($id)
    {

        $shop = Shop::with('shopImages')->find($id);
        // クエリパラメーターからステータスを取得
        $status = request('status');

        // 作成者と更新者のユーザーデータを取得
        $createdUser = User::find($shop->created_by);
        $updatedUser = User::find($shop->updated_by);
        // レビューを取得
        $reviews = Review::with('user')
            ->where('shop_id', $id)
            ->orderBy('created_at', 'desc')
            ->get();
        // dd($reviews);
        return Inertia::render('Shop/Detail', [
            'shop' => $shop,
            'createdUser' => $createdUser,
            'updatedUser' => $updatedUser,
            'reviews' => $reviews,
            'status' => $status,
        ]);
    }
    public function create()
    {
        return Inertia::render('Shop/Create');
    }
    // 店舗の保存
    public function store (Request $request)
    {
        $user = Auth::user(); // ログインユーザーを取得
        // ユーザーがログインしていない場合はリダイレクト
        if(!$user){
            return redirect()->route('login');
        }
        $status = "error";
        // バリデーション
        $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'required|string',
            'description' => 'required|string',
        ]);
        //トランザクションを開始
        DB::beginTransaction();
        try{
            //処理を書く

            // 店舗の保存
            $shopModel = new Shop();

            $shop = $shopModel->saveShop([
                'name' => $request->name,
                'location' => $request->location,
                'description' => $request->description,
                'created_by' => $user->id,
                'updated_by' => $user->id,
            ]);
            // 店舗の画像を保存
            if($request->file('images')){
                $images = $request->file('images');
                
                foreach($images as $image){
                    //画像の拡張子を取得
                    $extension = $image->getClientOriginalExtension();
                    //　乱数を作成
                    $random = Random::generate(16);
                    // 画像の名前を生成
                    $fileName = $shop->id . '_' .$random . '.' . $extension;
                    $shopImageModel = new ShopImage();
                    $shopImageModel->saveImage([
                        'shop_id' => $shop->id,
                        'file_name' => $fileName,
                        'file_path' => 'storage/shop_images/' . $fileName,
                        'file_type' => $image->getClientMimeType(),
                        'file_size' => $image->getSize(),
                        'file_extension' => $extension,
                        'file_mime' => $image->getClientMimeType(),
                        'file_original_name' => $image->getClientOriginalName(),
                        'file_original_path' => $image->getPathname(),
                    ]);

                    // 画像の保存
                    $image->storeAs('public/shop_images/', $fileName);
                }
            }
            // コミット
            DB::commit();
            
            $status = 'shop-created';
        }catch(\Exception $e){
            $message = $e->getMessage();
            Log::error($message);
            DB::rollBack();
            throw $e;
        }
        
        
        
        return redirect()->route('shop.index', [
            'status' => $status,
        ]);
    }

    public function edit($id)
    {
        $shop = Shop::with('shopImages')->find($id);
        return Inertia::render('Shop/Edit', [
            'shop' => $shop,
        ]);
    }

    // 店舗の更新
    public function update(Request $request)
    {
        $status = "error";
        $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'required|string',
            'description' => 'required|string',
        ]);

        //トランザクションを開始
        DB::beginTransaction();
        try {
            // 全体の処理
            $ShopModel = new Shop();
            $shop = $ShopModel->updateShop([
                'id' => $request->id,
                'name' => $request->name,
                'location' => $request->location,
                'description' => $request->description,
                'updated_by' => Auth::id(),
            ]);

            //既存の画像の削除
            if($request->existingImages)
            {
                $existingImages = $request->existingImages;
                // 画像のIDのみを取得
                $existingImageIds = array_column($existingImages, 'id');
                
                $arrayShopImageIds = DB::table('shop_images')->where('shop_id', $shop->id)->get(['id'])->toArray();
                $shopImageIds = array_column($arrayShopImageIds, 'id');
                // IDを比較します
                $deleteImageIds = array_diff($shopImageIds, $existingImageIds);

                if (count($deleteImageIds) > 0) {
                    // 削除する画像のIDを指定して削除
                    DB::table('shop_images')->whereIn('id', $deleteImageIds)->delete();
                }
            }
            
            // 新規画像の保存
            if($request->file("images"))
            {
                $images = $request->file("images");
                foreach($images as $image)
                {
                    // 画像の拡張子を取得
                    $extension = $image->getClientOriginalExtension();
                    // 乱数を作成
                    $random = Random::generate(16);
                    // 画像の名前を生成
                    $fileName = $shop->id . '_' . $random . '.' . $extension;
                    $shopImageModel = new ShopImage();
                    $shopImageModel->saveImage([
                        'shop_id' => $shop->id,
                        'file_name' => $fileName,
                        'file_path' => 'storage/shop_images/' . $fileName,
                        'file_type' => $image->getClientMimeType(),
                        'file_size' => $image->getSize(),
                        'file_extension' => $extension,
                        'file_mime' => $image->getClientMimeType(),
                        'file_original_name' => $image->getClientOriginalName(),
                        'file_original_path' => $image->getPathname(),
                    ]);
                    // 画像の保存
                    $image->storeAs('public/shop_images/', $fileName);
                }
            }

            // コミット
            DB::commit();
            $status = 'shop-updated';
            
        }catch(Exception $e){
            //失敗した時の処理
            $message = $e->getMessage();
            Log::error($message);
            DB::rollBack();
            throw $e;
        }
        return redirect()->route('shop.detail', [
            'id' => $shop->id, //店舗ID
            'status' => $status,
        ]);
    }

    // 店舗の削除
    public function destroy($id)
    {
        $status = "error";
        $shop = Shop::find($id);
        //トランザクションを開始
        DB::beginTransaction();
        try{
            //店舗の削除
            $shop->delete();

            // 店舗の画像を削除
            // 店舗画像のIDのみを取得
            $shopImageIds = ShopImage::where('shop_id', $id)->get(['id']);
            if($shopImageIds->count() > 0){
                $shopImageIds = $shopImageIds->toArray();
                // $shopImageIds = array_column($shopImageIds, 'id');
                dd($shopImageIds);
                DB::whereIn($shopImageIds)->delete();
            }
            
            // コミット
            DB::commit();
            $status = 'shop-deleted';
        }catch(Exception $e){
            //失敗した時の処理
            $message = $e->getMessage();
            Log::error($message);
            DB::rollBack();
            throw $e;
        }
        return redirect()->route('shop.index', [
            'status' => $status,
        ]);
    }
}
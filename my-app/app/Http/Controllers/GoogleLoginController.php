<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Stringable;

class GoogleLoginController extends Controller
{
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback()
    {
    try {
    $googleUser = Socialite::driver('google')->user();
    // データベースでユーザーを検索または作成
    $user = User::firstOrCreate(
    ['email' => $googleUser->getEmail()],
    [
    'gtoken' => $googleUser->token,
    'name' => $googleUser->getName(),
    'email_verified_at' => now(),
    // メール認証済みとしてマーク
    'password' => bcrypt(Str::random(16))
    // ランダムなパスワードを設定
    ]
    );
    Auth::login($user);
    return redirect()->intended('dashboard');
    } catch (Exception $e) {
        session()->flash('error', 'ログインに失敗しました。もう一度お試しください。');
        return redirect()->route('login');
        }
    }
}
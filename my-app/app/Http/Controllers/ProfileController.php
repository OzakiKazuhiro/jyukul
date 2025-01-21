<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $user = $request->user();
        
        // 基本情報の更新
        $user->fill($validated);
    
        // メールアドレスが変更された場合の処理
        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }
    
        // アバター画像の処理
        if ($request->hasFile('avatar')) {  // hasFile()を使用して確認
            // 既存の画像があれば削除
            if ($user->avatar_path) {
                Storage::disk('public')->delete($user->avatar_path);
            }
            
            // 新しいアバター画像の保存
            $avatar = $request->file('avatar');
            $directory = 'avatars';
            $filename = sprintf(
                '%s_%s.%s',
                date('Ymd_His'),
                $user->id,
                $avatar->getClientOriginalExtension()
            );
            
            // ファイルを保存
            $path = $avatar->storeAs($directory, $filename, 'public');
            
            // 完全なパスとURLを保存
            $user->avatar_path = $path;  // ディレクトリを含めたパスを保存
            $user->avatar_url = Storage::disk('public')->url($path);  // 完全なURLを生成
        }
    
        $user->save();
    
        return Redirect::route('dashboard')->with('status', 'profile-updated');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validateWithBag('userDeletion', [
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        // アバター画像の削除
        if ($user->avatar_path) {
            Storage::disk('public')->delete($user->avatar_path);
        }

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
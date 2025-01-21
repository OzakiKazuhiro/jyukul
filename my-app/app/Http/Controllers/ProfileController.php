<?php

// namespace App\Http\Controllers;

// use App\Http\Requests\ProfileUpdateRequest;
// use Illuminate\Contracts\Auth\MustVerifyEmail;
// use Illuminate\Http\RedirectResponse;
// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Auth;
// use Illuminate\Support\Facades\Redirect;
// use Inertia\Inertia;
// use Inertia\Response;

// class ProfileController extends Controller
// {
//     public function edit(Request $request): Response
//     {
//         return Inertia::render('Profile/Edit', [
//             'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
//             'status' => session('status'),
//         ]);
//     }

//     public function update(ProfileUpdateRequest $request): RedirectResponse
//     {
//         $request->user()->fill($request->validated());

//         if ($request->user()->isDirty('email')) {
//             $request->user()->email_verified_at = null;
//         }

//         $request->user()->save();

//         return Redirect::route('profile.edit');
//     }

//     public function destroy(Request $request): RedirectResponse
//     {
//         $request->validate([
//             'password' => ['required', 'current_password'],
//         ]);

//         $user = $request->user();

//         Auth::logout();

//         $user->delete();

//         $request->session()->invalidate();
//         $request->session()->regenerateToken();

//         return Redirect::to('/');
//     }
// }



// namespace App\Http\Controllers;

// use App\Http\Requests\ProfileUpdateRequest;
// use Illuminate\Contracts\Auth\MustVerifyEmail;
// use Illuminate\Http\RedirectResponse;
// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Auth;
// use Illuminate\Support\Facades\Redirect;
// use Illuminate\Support\Facades\Storage;
// use Inertia\Inertia;
// use Inertia\Response;

// class ProfileController extends Controller
// {
//     /**
//      * Display the user's profile form.
//      */
//     public function edit(Request $request): Response
//     {
//         return Inertia::render('Profile/Edit', [
//             'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
//             'status' => session('status'),
//         ]);
//     }

//     /**
//      * Update the user's profile information.
//      */
//     public function update(Request $request): RedirectResponse
//     {
//         $validated = $request->validate([
//             'username' => ['required', 'string', 'max:255'],
//             'avatar' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif', 'max:2048'],
//         ]);
    
//         $user = $request->user();
//         $user->name = $validated['username'];
    
//         if ($request->hasFile('avatar')) {
//             // 既存のアバター画像があれば削除
//             if ($user->avatar_path) {
//                 Storage::disk('public')->delete($user->avatar_path);
//             }
    
//             $file = $request->file('avatar');
            
//             // オリジナルのファイル名から拡張子を取得
//             $extension = $file->getClientOriginalExtension();
            
//             // ユニークなファイル名を生成
//             // 例: avatars/1234567890-user123.jpg
//             $filename = sprintf(
//                 'avatars/%s-%s.%s',
//                 time(),                    // UNIXタイムスタンプ
//                 $user->id,                 // ユーザーID
//                 $extension                 // ファイル拡張子
//             );
            
//             // 指定したファイル名で保存
//             $avatarPath = Storage::disk('public')->putFileAs(
//                 '',                        // ルートパス
//                 $file,                     // アップロードされたファイル
//                 $filename                  // 生成したファイル名
//             );
            
//             $user->avatar_path = $filename;
//             $user->avatar_url = Storage::disk('public')->url($filename);
//         }
    
//         $user->save();
    
//         return Redirect::back()->with('message', 'プロフィールを更新しました。');
//     }

//     /**
//      * Delete the user's account.
//      */
//     public function destroy(Request $request): RedirectResponse
//     {
//         $request->validate([
//             'password' => ['required', 'current_password'],
//         ]);

//         $user = $request->user();

//         // ユーザーのアバター画像を削除
//         if ($user->avatar_path) {
//             Storage::disk('public')->delete($user->avatar_path);
//         }

//         Auth::logout();

//         $user->delete();

//         $request->session()->invalidate();
//         $request->session()->regenerateToken();

//         return Redirect::to('/');
//     }
// }



// namespace App\Http\Controllers;

// use App\Http\Requests\ProfileUpdateRequest;
// use Illuminate\Contracts\Auth\MustVerifyEmail;
// use Illuminate\Http\RedirectResponse;
// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Auth;
// use Illuminate\Support\Facades\Redirect;
// use Illuminate\Support\Facades\Storage;
// use Inertia\Inertia;
// use Inertia\Response;
// use App\Models\User;

// class ProfileController extends Controller
// {
//     /**
//      * Display the user's profile form.
//      */
//     public function edit(Request $request): Response
//     {
//         return Inertia::render('Profile/Edit', [
//             'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
//             'status' => session('status'),
//         ]);
//     }

//     /**
//      * Update the user's profile information.
//      */
//     public function update(ProfileUpdateRequest $request): RedirectResponse
//     {
//         $request->user()->fill($request->validated());

//         // メールアドレスが変更された場合の処理
//         if ($request->user()->isDirty('email')) {
//             $request->user()->email_verified_at = null;
//         }

//         // アバター画像の処理
//         if ($request->validated('avatar')) {
//             $user = User::find(auth()->user()->id);
            
//             // デフォルト画像以外の場合、既存の画像を削除
//             if ($user->avatar !== 'user_default.jpg') {
//                 Storage::disk('public')->delete('avatar/'.$user->avatar);
//             }
            
//             // 新しいアバター画像の保存
//             $avatar = $request->file('avatar');
//             $filename = date('Ymd_His').'_'.$avatar->getClientOriginalName();
//             $avatar->storeAs('avatar', $filename, 'public');
//             $request->user()->avatar = $filename;
//         }

//         $request->user()->save();

//         return Redirect::route('profile.edit')->with('status', 'profile-updated');
//     }

//     /**
//      * Delete the user's account.
//      */
//     public function destroy(Request $request): RedirectResponse
//     {
//         $request->validateWithBag('userDeletion', [
//             'password' => ['required', 'current_password'],
//         ]);

//         $user = $request->user();

//         Auth::logout();

//         $user->delete();

//         $request->session()->invalidate();
//         $request->session()->regenerateToken();

//         return Redirect::to('/');
//     }
// }



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
        dd($request);
        $request->user()->fill($request->validated());

        // メールアドレスが変更された場合の処理
        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        // アバター画像の処理
        if ($request->validated('avatar')) {
            $user = $request->user();
            
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
            
            // ディレクトリとファイル名を明示的に指定
            $avatar->storeAs($directory, $filename, 'public');
            
            // パスとURLを保存
            $user->avatar_path = $filename;
            $user->avatar_url = Storage::disk('public')->url($filename);
        }

        $request->user()->save();

        return Redirect::route('profile.edit')->with('status', 'profile-updated');
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
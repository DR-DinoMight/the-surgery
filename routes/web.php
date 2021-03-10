<?php

use App\Http\Controllers\SpriteController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});



Route::middleware(['auth:sanctum', 'verified'])->get('/dashboard', function () {
    return view('dashboard');
})->name('dashboard');

Route::middleware(['auth:sanctum', 'verified'])->prefix('dashboard')->group(function () {
    Route::resource('sprites', SpriteController::class);
});



Route::get('sprite-customiser', function () {
    return view ('sprite-customiser');
});


Route::prefix('stream-overlays')->group(function () {
    Route::get('sprites',function () {

        $sprites = array_column(App\Models\Sprite::all()->toArray(), null, 'twitch_username');

        return view('stream_overlays.sprites', ['sprites' => $sprites]);
    });
});

Route::prefix('xhr')->group(function() {
    Route::get('sprite-config', [ SpriteController::class, 'sprite_config'])->name('xhr.sprite_config');
});

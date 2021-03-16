<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateSpriteRequest;
use App\Http\Requests\UpdateSpriteRequest;
use App\Models\Sprite;
use Illuminate\Http\Request;

class SpriteController extends Controller
{
    public function index() {
        $sprites = Sprite::all();

        return view('sprites.index', ['sprites' => $sprites]);
        //See all sprites generated
    }

    public function create() {
        return view('sprites.create');
    }

    public function store(CreateSpriteRequest $request) {
        $validated =  $request->validated();
        $sprite = new Sprite($validated);
        $sprite->twitch_avatar = "https://avatar.glue-bot.xyz/twitch/{$validated['twitch_username']}";
        $sprite->last_fetched_data_at = now();
        if ($sprite->save()){
            return redirect()->route('sprites.index');
        }

        return back()->withErrors(['Unable to Save Please Try Again'])->withInput();
    }

    public function edit(Sprite $sprite) {
        if (is_null($sprite) || empty($sprite)) return back()->withErrors(['Unable to find Sprite']);

        return view('sprites.edit',
            [
                'sprite' => $sprite
            ]);
    }

    public function update(UpdateSpriteRequest $request, Sprite $sprite) {

        if (!is_null($sprite) && empty($sprite)) return back()->withInput()->withErrors(['Unable to find sprite']);

        $validated =  $request->validated();

        $sprite->twitch_username = $validated['twitch_username'];
        $sprite->twitch_avatar = $validated['twitch_avatar'];
        $sprite->sprite_data = $validated['sprite_data'];
        $sprite->last_fetched_data_at = now();

        $sprite->save();

        return redirect()
            ->action([SpriteController::class, 'index'])
            ->with('success', 'Update Profile');
    }

    public function destroy($sprite, $request) {
        // delete the sprite
    }

    public function sprite_config() {
         $sprites = array_column(Sprite::all()->toArray(), null, 'twitch_username');

         return response()->json($sprites, 200);
    }
}


<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateSpriteRequest;
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
        $sprite->last_fetched_data_at = now();
        $sprite->save();
    }

    public function destroy($sprite, $request) {
        // delete the sprite
    }
}


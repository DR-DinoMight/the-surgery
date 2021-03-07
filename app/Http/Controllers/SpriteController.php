<?php

namespace App\Http\Controllers;

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

    public function store($request) {
        // store the sprite
    }

    public function destroy($sprite, $request) {
        // delete the sprite
    }
}


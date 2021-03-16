<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sprite extends Model
{
    use HasFactory;

    protected $fillable = [
        'twitch_username',
        'twitch_avatar',
        'last_fetched_data_at',
        'sprite_data'
    ];
}

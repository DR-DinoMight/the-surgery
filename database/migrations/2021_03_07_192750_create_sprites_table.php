<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSpritesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sprites', function (Blueprint $table) {
            $table->id();
            $table->string('twitch_username');
            $table->string('twitch_avatar');
            $table->text('sprite_data');
            $table->timestamp('last_fetched_data_at');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sprites');
    }
}

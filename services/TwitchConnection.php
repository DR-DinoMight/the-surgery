<?php

use App\Models\TwitchChatMessage;
use Illuminate\Console\Concerns\InteractsWithIO;
use Illuminate\Support\Str;
use Ratchet\Client\WebSocket;

class TwitchConnection {

    private $connection;

    public function __construct(WebSocket $connection) {
        $this->connection = $connection;
        echo("Setting up Twitch Connection....");
        $this->connection->on('message', function ($msg) {
            $this->processmsg($msg);
        });
    }
}

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

    public function connect(string $authToken, string $botUserName, string $channel) : void{
        $this->send("PASS {$authToken}");
        $this->send("NICK {$botUserName}");
        $this->send("JOIN #{$channel}");
        echo('Connected! to Twitch');
    }

    public function processmsg($msg): void {
        switch ($msg) {
            case Str::startsWith('PING', $msg):
                # code...
                $this->ping($msg);
                break;
            case Str::startsWith('PRIVMSG', $msg):
                //:USERNAME!dr_dinomight@dr_dinomight.tmi.twitch.tv PRIVMSG #CHANNEL :msg
                $this->msgReceived($msg);
                break;
            case Str::startsWith('JOIN', $msg):
                //:USERNAME!the_surgery@the_surgery.tmi.twitch.tv JOIN #CHANNEL
                break;
            default:
                # code...
                break;
        }
    }



    protected function ping(string $msg): bool {
        $sent = $this->send('PONG :tmi.twitch.tv');
        echo 'PING PONG done \r\n';
        return $sent;
    }

    protected function msgReceived(string $msg): bool {
        $model = TwitchChatMessage::parseIRCMessage($msg);

        if (is_null($model)) return false;

        echo "{$model->username}: {$model->msg}";

        // eventually check for custom messages and send event
        return true;
    }

    protected function send(string $msg): bool {
        return $this->connection->send($msg);
    }
}

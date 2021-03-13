<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TwitchChatMessage extends Model
{
    use HasFactory;

    public $username;
    public $msg;

    public function __construct(string $username, string $msg)
    {
        $this->username = $username;
        $this->msg = $msg;
    }

    public static function parseIRCMessage(string $msg): ?TwitchChatMessage
    {
        try {
            preg_match("/:(.*)\!.*#(.*) :(.*)/", $msg, $matches);

            return new TwitchChatMessage($matches[1], $matches[3]);
        } catch (\Exception $exception) {
            echo $exception->getMessage();
        }

        return null;
    }
}

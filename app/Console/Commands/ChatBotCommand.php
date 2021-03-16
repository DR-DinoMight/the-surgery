<?php

namespace App\Console\Commands;

use App\Models\TwitchChatMessage;
use Exception;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Ratchet\Client\WebSocket;
use TwitchConnection;

class ChatBotCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'surgery:bot';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';


    protected $onnection;

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        try{
            \Ratchet\Client\connect('wss://irc-ws.chat.twitch.tv:443')
                ->then(function ($conn) {
                    $this->connection = $conn;
                    $this->connection->on('close', function ($code = null, $reason = null) {
                        echo "Connection closed ({$code} - {$reason})";
                    });

                    $this->connection->on('message', function ($message) {
                        // check if auth failed
                        if (strpos($message, ':tmi.twitch.tv NOTICE * :Login authentication failed') !== false) {
                            $this->output->writeln( 'FAILED LOGIN');
                            return;
                        }
                        $this->processmsg($message);
                        //
                    });

                    $pass = env('TWITCH_OAUTH');
                    $username = Str::lower(env('TWITCH_BOT_NAME'));
                    $channel = Str::lower(env('TWITCH_CHANNEL'));

                    $this->output->writeln("Connecting.... ${username} to ${channel}");

                    $this->output->writeln( "Calling Twitch...");
                    $this->connect($pass,$username,$channel);
                    $this->output->writeln('Connected!');



            }, function ($e) {
                $this->output->writeln("Could not connect: {$e->getMessage()}");
            });
        } catch (Exception $e) {
            Log::error($e->getMessage());
        }
    }


    public function connect(string $authToken, string $botUserName, string $channel) : void{
        $this->send("PASS {$authToken}");
        $this->send("NICK {$botUserName}");
        $this->send("JOIN #{$channel}");
        $this->output->writeln('Connected! to Twitch');
    }

    public function processMsg($msg): void {
        switch ($msg) {
            case str_contains($msg ,'PING'):
                # code...
                $this->ping($msg);
                break;
            case str_contains($msg, '.tmi.twitch.tv PRIVMSG'):
                //:USERNAME!dr_dinomight@dr_dinomight.tmi.twitch.tv PRIVMSG #CHANNEL :msg
                $this->msgReceived($msg);
                break;
            case str_contains($msg, '.tmi.twitch.tv JOIN'):
                //:USERNAME!the_surgery@the_surgery.tmi.twitch.tv JOIN #CHANNEL
                break;
            default:
                $this->output->writeln($msg);
                # code...
                break;
        }
    }

    public function ping(string $msg): bool {
        $sent = $this->send('PONG :tmi.twitch.tv');
        // $this->output->writeln('PING PONG done');
        return $sent;
    }

    public function msgReceived(string $msg): bool {
        $model = TwitchChatMessage::parseIRCMessage($msg);

        if (is_null($model)) return false;

        $this->output->writeln("{$model->username}: {$model->msg}");

        if (Str::startsWith($model->msg, '!paging')) {
            $this->send('PRIVMSG #dr_dinomight :Paging the doctor to chat! Paging @DR_DinoMight to Chat!');
        }

        // eventually check for custom messages and send event
        return true;
    }

    protected function send(string $msg): bool {
        return $this->connection->send($msg);
    }

}

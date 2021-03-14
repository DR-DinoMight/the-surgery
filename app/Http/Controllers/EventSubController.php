<?php

namespace App\Http\Controllers;

use romanzipp\Twitch\Http\Controllers\EventSubController as BaseController;
use Symfony\Component\HttpFoundation\Response;

class EventSubController extends BaseController
{
    protected function handleNotification(array $payload): Response
    {
        log($payload);
        return $this->successMethod(); // handle all other incoming notifications...
    }

    protected function handleRevocation(array $payload): Response
    {
        return $this->successMethod(); // handle the subscription revocation...
    }
}

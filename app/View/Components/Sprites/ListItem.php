<?php

namespace App\View\Components\Sprites;

use App\Models\Sprite;
use Illuminate\View\Component;

class ListItem extends Component
{

    public Sprite $sprite;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct(Sprite $sprite)
    {
        $this->sprite = $sprite;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.sprites.list-item');
    }
}

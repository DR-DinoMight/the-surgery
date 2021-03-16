<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateSpriteRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'twitch_username' => ['required',  Rule::unique('sprites', 'twitch_username')->ignore($this->id), 'string', 'min:2', 'max:100'],
            'twitch_avatar' => ['required', 'string'],
            'sprite_data' => ['required']
        ];
    }
}

<div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
    <div>
      <div>
        <h3 class="text-lg font-medium leading-6 text-gray-900">
          Sprite Profile
        </h3>
      </div>

      <div class="mt-6 space-y-6 sm:mt-5 sm:space-y-5">
        <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
          <label for="twitch_username" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
            Username
          </label>
          <div class="mt-1 sm:mt-0 sm:col-span-2">
            <div class="flex max-w-lg rounded-md shadow-sm">
              <span class="inline-flex items-center px-3 text-gray-500 border border-r-0 border-gray-300 rounded-l-md bg-gray-50 sm:text-sm">
                twitch.tv/
              </span>
              <input type="text" name="twitch_username" id="twitch_username" value="{{ old('twitch_username', isset($sprite) ? $sprite->twitch_username : '')}}" class="flex-1 block w-full min-w-0 border-gray-300 rounded-none focus:ring-indigo-500 focus:border-indigo-500 rounded-r-md sm:text-sm">
            </div>
          </div>
        </div>

        <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
          <label for="sprite_data" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
            Sprite Data
          </label>
          <div class="mt-1 sm:mt-0 sm:col-span-2">
            <textarea id="sprite_data" name="sprite_data" rows="6" class="block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">{{ old('sprite_data', isset($sprite) ? $sprite->sprite_data : '')}}</textarea>
          </div>
        </div>

        @if(Route::is('sprites.edit') )
            <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:pt-5">
                <label for="photo" class="block text-sm font-medium text-gray-700">
                    Avatar
                </label>
                <div class="mt-1 sm:mt-0 sm:col-span-2">
                    <div class="flex items-center">
                        @isset($sprite)
                            <span class="w-12 h-12 mr-4 overflow-hidden bg-gray-100 rounded-full">
                                <img src="{{isset($sprite) ? $sprite->twitch_avatar : ''}}" />
                            </span>
                        @endisset
                        <div class="mt-1">
                            <input type="url" name="twitch_avatar" id="twitch_avatar" value="{{old('twitch_avater', isset($sprite) ? $sprite->twitch_avatar : '')}}" class="flex-1 block w-full min-w-0 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        </div>
                    </div>
                </div>
            </div>
        @endif
      </div>
    </div>
  </div>

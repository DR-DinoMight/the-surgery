<li>
    <a href="{{route('sprites.edit', [$sprite])}}" class="block hover:bg-gray-50">
    <div class="flex items-center px-4 py-4 sm:px-6">
        <div class="flex items-center flex-1 min-w-0">
        <div class="flex-shrink-0">
            <img class="w-12 h-12 rounded-full" src="{{$sprite->twitch_avatar}}" alt="{{$sprite->twitch_username}}">
        </div>
        <div class="flex-1 min-w-0 px-4 md:grid md:grid-cols-2 md:gap-4">
            <div>
                <p class="text-sm font-medium text-indigo-600 truncate">{{ "@{$sprite->twitch_username}" }}</p>
                <p class="flex items-center mt-2 text-sm text-gray-500">
                   Last Updated on <time class="pl-2 font-bold" datetime="{{$sprite->last_fetched_data_at}}">{{ \Carbon\Carbon::parse($sprite->last_fetched_data_at)->toFormattedDateString() }}</time>
                </p>
            </div>
            <div class="hidden md:block">
            <div>
                SPRITE WILL DISPLAY HERE
            </div>
            </div>
        </div>
        </div>
        <div>
        <!-- Heroicon name: solid/chevron-right -->
        <svg class="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
        </svg>
        </div>
    </div>
    </a>
</li>

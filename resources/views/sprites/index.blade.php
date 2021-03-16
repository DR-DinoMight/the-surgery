<x-app-layout>
    <x-slot name="header">
        <h2 class="text-xl font-semibold leading-tight text-gray-800">
            {{ __('Sprites') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div class="overflow-hidden bg-white shadow sm:rounded-md">
                    <a href="{{route('sprites.create')}}" class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        New
                    </a>
                    <ul class="divide-y divide-gray-200">
                        @foreach ($sprites as $sprite)
                            <x-sprites.list-item :sprite="$sprite" />
                        @endforeach
                    </ul>
                </div>
        </div>
    </div>
</x-app-layout>
